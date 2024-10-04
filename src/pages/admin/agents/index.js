import React, { useState, useRef } from "react";
import * as cookie from 'cookie';
import { useRouter } from 'next/router';
import { message, Form } from 'antd';
import { useReactToPrint } from 'react-to-print';
import AdminLayout from '../../../components/layouts/AdminLayout';
import AgentTable from '../../../components/tables/agent';
import AgentForm from '../../../components/forms/agent';
import AgentPaymentForm from '../../../components/forms/AgentPaymentForm';
import MainModal from '../../../components/modals/MainModal';
import PaymentModal from '../../../components/modals/PaymentModal';
import DeleteModal from '../../../components/modals/DeleteModal';
import DeletePaymentModal from '../../../components/modals/DeletePaymentModal';
import { getAgents, getAgentInfo, 
    getAgentPayments, addAgent, 
    updateAgent, getAgent, 
    deleteAgent, addPayment, deleteAgentPayment } from '../../../services/agent';
import { getAreas } from '@/services/area';
import { formatDate, formatCurrency, computeBalance, sumOfValues } from '@/services/helpers';
import AgentTab from "@/components/tabs/AgentTab";
import PrintModal from "@/components/modals/PrintModal";

export async function getServerSideProps({ req }) {
  const cookieData = cookie.parse(req.headers.cookie || '');
  const { agents } = await getAgents(cookieData.token);
  const { areas } = await getAreas(cookieData.token);

  return {
    props: { info: cookieData, agents, areas },
  }
}

const methods = [
    { id: 1, name: 'Cash' },
    { id: 2, name: 'Bank Transfer' },
    { id: 3, name: 'Bank Transfer referred as Cash' },
];

export default function Agent({info, agents, areas })
{    
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDeletePaymentModal, setShowDeletePaymentModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('Add Agent');
    const [selectedItemForDelete, setSelectedItemForDelete] = useState(null);
    const [selectedItemForPayment, setSelectedItemForPayment] = useState(null);
    const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
    const [mode, setMode] = useState('add');
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const router = useRouter();
    const [form] = Form.useForm();
    const componentRef = useRef();
    const [showCanvas, setShowCanvas] = useState(false);
    const [chosenAgent, setChosenAgent] = useState(null);
    const [allPayments, setAllPayments] = useState([]);
    const [sumOfPayments, setSumOfPayments] = useState([]);
    const [showPrintModal, setShowPrintModal] = useState(false);

    const printStatement = useReactToPrint({
        content: () => componentRef.current,
        onBeforeGetContent: () => {
            setShowCanvas(true);
        },
    });

    const onFinish = async (values) => {
      setShowModal(false);
      if(mode == "add") {
            const { agent } = await addAgent(values);
            resetInput();
            if(agent) {
                message.success("Agent added successfully.");
                router.push("/admin/agents");
            } else {
                message.error("Agent addition failed.");
            }
            setShowModal(false);
        } else if(mode == 'edit') {
            values.id = selectedItemForEdit;
            const { agent } = await updateAgent(values);
            resetInput();
            if(agent == 1) {
                message.success("Agent updated successfully.");
                window.location.href = "/admin/agents";
            } else {
                message.error("Agent failed during the update.");
            }
            setShowModal(false);
        } else if(mode == 'payment') {
            values.id = selectedItemForPayment;              
            const { payment } = await addPayment(values);
            resetInput();
            if(payment == 'paid') {
                message.error("This agent is already paid.");
            } else if(payment == 'exceeded') {
                message.error("Payment exceeds to the total commission.");
            } else if(payment) {
                message.success("Payment added successfully.");       
                window.location.href = "/admin/agents";            
            } else {
                message.error("Payment addition failed.");
            }
            setShowPaymentModal(false);
        }                
    }

    const selectAgent = (id) => {        
        setSelectedAgent(id);        
    }

    const handleDeletePayment = (id) => {        
        setSelectedItemForDelete(id);
        setShowDeletePaymentModal(true);
    }

    const handlePaymentOkDelete = async () => {
        const { payment } = await deleteAgentPayment(selectedItemForDelete);
        setShowDeletePaymentModal(false);
        resetInput();
        if(payment == 1) {
            message.success("Agent's payment deleted successfully.");
            window.location.href = "/admin/agents"; 
        } else {
            message.error("Agent's payment delete failed.");
            setShowDeletePaymentModal(false);
        }        
    };

    const handleOkDelete = async () => {        
        const { agent } = await deleteAgent(selectedItemForDelete);
        resetInput();
        setShowDeleteModal(false);        
        if(agent == 1) {
            message.success("Agent deleted successfully.");
            window.location.href = "/admin/agents";
        } else {
            message.error("Agent delete failed.");
            setShowDeleteModal(false);
        }        
    };

    const handleAdd = () => {
        setModalTitle('Add Agent');
        setMode('add');
        setShowModal(true);
    }

    const handleEdit = (id) => {    
        setModalTitle('Edit Agent');
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
        <AdminLayout title="Lion King Realty Administration Panel - Agents Page" chosenMenu="4">
              <DeleteModal
                    title="Delete Agent"
                    showDeleteModal={showDeleteModal}
                    handleOkDelete={handleOkDelete}
                    okButtonColor="red"
                    okText="Delete Now"
                    handleCancelDelete={handleCancelDelete}
                >
                    <p>Are you sure you want to delete this agent?</p>
              </DeleteModal>
              <DeletePaymentModal
                    title="Delete Agent's Payment"
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
                  <AgentForm
                      onFinish={onFinish}
                      mode={mode}
                      handleCancel={handleCancel}
                      areas={areas}
                      form={form}
                      selectedItemForEdit={selectedItemForEdit}
                      getAgent={getAgent}
                  />
            </MainModal>            
            <PrintModal
                showPrintModal={showPrintModal}
                closePrint={closePrint}
                printStatement={printStatement}
                componentRef={componentRef}
                allPayments={allPayments} 
                sumOfPayments={sumOfPayments}
                chosenAgent={chosenAgent} 
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
                  <AgentPaymentForm
                      onFinish={onFinish}
                      mode={mode}
                      handleCancelPayment={handleCancelPayment}
                      methods={methods}
                      form={form}
                      selectedItemForPayment={selectedItemForPayment}                      
                  />
            </PaymentModal>
            <AgentTable
                title="Agents Table"
                tableData={agents}
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
                selectAgent={selectAgent}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                page="agent"
            />
            { selectedAgent !== null && (
                <AgentTab 
                    selectedAgent={selectedAgent}
                    getAgentInfo={getAgentInfo}
                    getAgentPayments={getAgentPayments}
                    handleDeletePayment={handleDeletePayment}
                    setSelectedItemForDelete={setSelectedItemForDelete}
                    formatDate={formatDate}
                    formatCurrency={formatCurrency}
                    computeBalance={computeBalance}
                    printStatement={printStatement}
                    componentRef={componentRef}
                    showCanvas={showCanvas}
                    setChosenAgent={setChosenAgent}
                    setSumOfPayments={setSumOfPayments}
                    setAllPayments={setAllPayments}
                    setShowPrintModal={setShowPrintModal}
                    chosenAgent={chosenAgent}
                    sumOfPayments={sumOfPayments}
                    allPayments={allPayments}
                />
            )}            
        </AdminLayout>
    );
}
