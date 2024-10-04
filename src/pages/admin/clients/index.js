import React, { useState, useEffect, useRef } from "react";
import * as cookie from 'cookie';
import { useRouter } from 'next/router';
import { message, Form } from 'antd';
import { useReactToPrint } from 'react-to-print';
import AdminLayout from '../../../components/layouts/AdminLayout';
import ClientTable from '../../../components/tables/client';
import ClientForm from '../../../components/forms/client';
import PaymentForm from '../../../components/forms/payment';
import MainModal from '../../../components/modals/MainModal';
import PaymentModal from '../../../components/modals/PaymentModal';
import DeleteModal from '../../../components/modals/DeleteModal';
import DeletePaymentModal from '../../../components/modals/DeletePaymentModal';
import { getClients, getClientInfo, 
    getClientPayments, addClient, 
    updateClient, getClient, printSOA,
    deleteClient, addPayment, deleteClientPayment } from '../../../services/client';
import { getAreas } from '@/services/area';
import { formatDate, formatCurrency, computeBalance, sumOfValues } from '@/services/helpers';
import MainTab from "@/components/tabs/MainTab";
import PrintModal from "@/components/modals/PrintModal";
import PrintCanvas from "@/components/canvas/PrintCanvas";

export async function getServerSideProps({ req }) {
  const cookieData = cookie.parse(req.headers.cookie || '');
  const { clients } = await getClients(cookieData.token);
  const { areas } = await getAreas(cookieData.token);

  return {
    props: { info: cookieData, clients, areas },
  }
}

const methods = [
    { id: 1, name: 'Cash' },
    { id: 2, name: 'Bank Transfer' },
    { id: 3, name: 'Bank Transfer referred as Cash' },
];

export default function Client({info, clients, areas })
{    
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDeletePaymentModal, setShowDeletePaymentModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('Add Client');
    const [selectedItemForDelete, setSelectedItemForDelete] = useState(null);
    const [selectedItemForPayment, setSelectedItemForPayment] = useState(null);
    const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
    const [mode, setMode] = useState('add');
    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const router = useRouter();
    const [form] = Form.useForm();
    const componentRef = useRef();
    const [showCanvas, setShowCanvas] = useState(false);
    const [chosenClient, setChosenClient] = useState(null);
    const [allPayments, setAllPayments] = useState([]);
    const [sumOfPayments, setSumOfPayments] = useState([]);
    const [showPrintModal, setShowPrintModal] = useState(false);

    const printStatement = useReactToPrint({
        content: () => componentRef.current,
        onBeforeGetContent: () => {
            setShowCanvas(true);
        },
        onAfterPrint: () => {

        },
    });

    const onFinish = async (values) => {
      setShowModal(false);

      if(mode == "add") {
            const { client } = await addClient(values);
            resetInput();
            if(client) {
                message.success("Client added successfully.");
                router.push("/admin/clients");
            } else {
                message.error("Client addition failed.");
            }
            setShowModal(false);
        } else if(mode == 'edit') {
            values.id = selectedItemForEdit;
            const { client } = await updateClient(values);
            console.log(client);
            resetInput();
            if(client == 1) {
                message.success("Client updated successfully.");
                router.push("/admin/clients");
            } else {
                message.error("Client failed during the update.");
            }
            setShowModal(false);
        } else if(mode == 'payment') {
            values.id = selectedItemForPayment;            
            console.log(values);
            const { payment } = await addPayment(values);
            resetInput();
            if(payment == 'paid') {
                message.error("This client is already paid.");
            } else if(payment == 'exceeded') {
                message.error("Payment exceeds to the total price.");
            } else if(payment) {
                message.success("Payment added successfully.");
                //router.push("/admin/clients");                
                window.location.href = "/admin/clients";                
            } else {
                message.error("Payment addition failed.");
            }
            setShowPaymentModal(false);
        }                
    }

    const selectClient = (id) => {        
        setSelectedClient(id);        
    }

    const handleDeletePayment = (id) => {        
        setSelectedItemForDelete(id);
        setShowDeletePaymentModal(true);
    }

    const handlePaymentOkDelete = async () => {
        const { payment } = await deleteClientPayment(selectedItemForDelete);
        setShowDeletePaymentModal(false);
        resetInput();
        if(payment == 1) {
            message.success("Client's payment deleted successfully.");
            //router.push("/admin/clients");
            window.location.href = "/admin/clients"; 
        } else {
            message.error("Client's payment delete failed.");
            setShowDeletePaymentModal(false);
        }        
    };

    const handleOkDelete = async () => {
        const { client } = await deleteClient(selectedItemForDelete);
        resetInput();
        setShowDeleteModal(false);        
        if(client == 1) {
            message.success("Client deleted successfully.");
            window.location.href = "/admin/clients"; 
            //router.push("/admin/clients");
        } else {
            message.error("Client delete failed.");
            setShowDeleteModal(false);
        }        
    };

    const handleAdd = () => {
        setModalTitle('Add Client');
        setMode('add');
        setShowModal(true);
    }

    const handleEdit = (id) => {    
        setModalTitle('Edit Client');
        setMode('edit'); 
        setSelectedItemForEdit(id);           
        setShowModal(true);
    }

    const resetInput = () => {
        form.setFieldsValue({
            id_number: '',
            first_name: '',
            last_name: '',
            middle_name: '',
            extension_name: '',
            block: '',
            lot: '',
            address: '',
            price: '',
            measure: '',
            date_bought: '',
            area_id: '',
        });
        form.setFieldsValue({
            amount: '',
            method: '',
            date_paid: '',           
        });
        setSelectedItemForPayment(null);
        setSelectedItemForEdit(null);
        setSelectedItemForDelete(null);
        setMode(null);
        setModalTitle(null);
    }

    const handleDelete = (id) => {
        setSelectedItemForDelete(id);
        setShowDeleteModal(true);
    };    

    const handlePayment = (id) => {
        setMode('payment');
        setModalTitle('Add Payment');
        setSelectedItemForPayment(id);
        setShowPaymentModal(true);
    };

    const handleCancelPayment = () => {
        resetInput();
        setShowPaymentModal(false);        
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setSelectedItemForDelete(null);
    };

    const handlePaymentCancelDelete = () => {
        setShowDeletePaymentModal(false);
        setSelectedItemForDelete(null);
    };

    const handleCancel = () => {
        setSelectedItemForEdit(null);
        setSelectedItemForDelete(null);
        setModalTitle('');
        setShowModal(false);
    }

    const closePrint = () =>
    {
        setShowPrintModal(false);
    }

    return (
        <AdminLayout title="Lion King Realty Administration Panel - Clients Page" chosenMenu="3">
              <DeleteModal
                    title="Delete Client"
                    showDeleteModal={showDeleteModal}
                    handleOkDelete={handleOkDelete}
                    okButtonColor="red"
                    okText="Delete Now"
                    handleCancelDelete={handleCancelDelete}
                >
                    <p>Are you sure you want to delete this client?</p>
              </DeleteModal>
              <DeletePaymentModal
                    title="Delete Client's Payment"
                    showDeletePaymentModal={showDeletePaymentModal}
                    handlePaymentOkDelete={handlePaymentOkDelete}
                    okButtonColor="red"
                    okText="Delete Now"
                    handlePaymentCancelDelete={handlePaymentCancelDelete}
                >
                    <p>Are you sure you want to delete this payment?</p>
              </DeletePaymentModal>
              <MainModal
                  title={modalTitle}
                  okText="Add Now"
                  mode={mode}
                  showModal={showModal}
                  okButtonColor="green"
                  handleCancel={handleCancel}
                  maskClosable={false}
                  destroyOnClose={true}
                  mWidth="1100px"
              >
                  <ClientForm
                      onFinish={onFinish}
                      mode={mode}
                      handleCancel={handleCancel}
                      areas={areas}
                      form={form}
                      selectedItemForEdit={selectedItemForEdit}
                      getClient={getClient}
                  />
            </MainModal>            
            <PrintModal
                showPrintModal={showPrintModal}
                closePrint={closePrint}
                printStatement={printStatement}
                componentRef={componentRef}
                allPayments={allPayments} 
                sumOfPayments={sumOfPayments}
                chosenClient={chosenClient} 
                computeBalance={computeBalance}
                formatCurrency={formatCurrency}
                formatDate={formatDate}
                mtitle="Statement of Account"
            />
            <PaymentModal 
                  title={modalTitle}
                  okText="Add Payment Now"
                  mode={mode}
                  showPaymentModal={showPaymentModal}
                  okButtonColor="green"
                  handleCancelPayment={handleCancelPayment}
                  maskClosable={false}
                  destroyOnClose={true}
                  mWidth="500px"
              >
                  <PaymentForm
                      onFinish={onFinish}
                      mode={mode}
                      handleCancelPayment={handleCancelPayment}
                      methods={methods}
                      form={form}
                      selectedItemForPayment={selectedItemForPayment}                      
                  />
            </PaymentModal>
            <ClientTable
                title="Clients Table"
                tableData={clients}
                computeBalance={computeBalance} 
                sumOfValues={sumOfValues}
                setShowModal={setShowModal}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handlePayment={handlePayment}
                handleAdd={handleAdd}
                setShowDeleteModal={setShowDeleteModal}
                setSelectedItemForDelete={setSelectedItemForDelete}
                setSelectedItemForEdit={setSelectedItemForEdit}
                setModalTitle={setModalTitle}
                setMode={setMode}
                selectClient={selectClient}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                page="client"
            />
            { selectedClient !== null && (
                <MainTab 
                    selectedClient={selectedClient}
                    getClientInfo={getClientInfo}
                    getClientPayments={getClientPayments}
                    handleDeletePayment={handleDeletePayment}
                    setSelectedItemForDelete={setSelectedItemForDelete}
                    formatDate={formatDate}
                    formatCurrency={formatCurrency}
                    computeBalance={computeBalance}
                    printStatement={printStatement}
                    componentRef={componentRef}
                    showCanvas={showCanvas}
                    setChosenClient={setChosenClient}
                    setSumOfPayments={setSumOfPayments}
                    setAllPayments={setAllPayments}
                    setShowPrintModal={setShowPrintModal}
                    chosenClient={chosenClient}
                    sumOfPayments={sumOfPayments}
                    allPayments={allPayments}    
                    page="client"                
                />
            )}            
        </AdminLayout>
    );
}
