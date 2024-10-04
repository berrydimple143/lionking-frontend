import React, { useState, useEffect, useRef } from "react";
import * as cookie from 'cookie';
import { useRouter } from 'next/router';
import { message, Form } from 'antd';
import { useReactToPrint } from 'react-to-print';
import AdminLayout from '../../../components/layouts/AdminLayout';
import ReportsTable from '../../../components/tables/report';
import ExpensesForm from '../../../components/forms/expenses';
import MainModal from '../../../components/modals/MainModal';
import DeleteModal from '../../../components/modals/DeleteModal';
import ReportsTab from '@/components/tabs/ReportsTab';
import PrintReport from '@/components/modals/PrintReport';
import { getExpenses, addExpense, updateExpense, getExpense, deleteExpense, getExpensesByDate, getReports } from '@/services/report';
import { formatDate, formatCurrency } from '@/services/helpers';

export async function getServerSideProps({ req }) {
  const cookieData = cookie.parse(req.headers.cookie || '');
  const { expenses } = await getExpenses(cookieData.token);

  return {
    props: { info: cookieData, expenses },
  }
}

export default function Payment({info, expenses })
{
    const [selectedExpenseDate, setSelectedExpenseDate] = useState(null);
    const [transactionDate, setTransactionDate] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('Add Expense');
    const [selectedItemForDelete, setSelectedItemForDelete] = useState(null);
    const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
    const [showPrintModal, setShowPrintModal] = useState(false);
    const [mode, setMode] = useState('add');
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    const [form] = Form.useForm();
    const componentRef = useRef();
    const [dailyExpenses, setDailyExpenses] = useState([]);
    const [dailyPayments, setDailyPayments] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [agentPayment, setAgentPayment] = useState([]);

    const printStatement = useReactToPrint({
        content: () => componentRef.current,
        onBeforeGetContent: () => {

        },
        onAfterPrint: () => {

        },
    });

    const onFinish = async (values) => {
      setShowModal(false);

      if(mode == "add") {            
            const { expense } = await addExpense(values);                    
            if(expense) {
                message.success("Expense added successfully.");
                router.push("/admin/expenses");
            } else {
                message.error("Failed adding an expense.");
            }
        } else {
            values.id = selectedItemForEdit;
            const { expense } = await updateExpense(values);
            if(expense == 1) {
                message.success("Expense updated successfully.");
                router.push("/admin/expenses");
            } else {
                message.error("Expense failed during the update.");
            }
        }
        resetInput();
    }

    const handleAdd = (dt) => {        
        setTransactionDate(dt);
        setModalTitle('Add Expense');
        setMode('add');
        setShowModal(true);
    }   

    const handlePrint = async (dt) => {
        setSelectedDate(dt);
        const { expenses, payments, expense } = await getReports(dt);    
        setDailyExpenses(expenses);   
        setAgentPayment(expense); 
        setDailyPayments(payments);
        setShowPrintModal(true);
    }   

    const closePrint = () =>
    {
        setShowPrintModal(false);
    }

    const resetInput = () => {
        form.setFieldsValue({
            transaction_date: null,
            description: null,
            amount: null,
            percentage: null,
        });
        setSelectedItemForEdit(null);
        setSelectedItemForDelete(null);
        setMode(null);
        setModalTitle('Add Expense');
    }

    const handleEdit = (id) => {
        setModalTitle('Edit Expense');
        setSelectedItemForEdit(id);
        setMode('edit');
        setShowModal(true);
    }

    const handleOkDelete = async () => {
        const { expense } = await deleteExpense(selectedItemForDelete);
        setShowDeleteModal(false);
        if(expense == 1) {
            message.success("Expense deleted successfully.");
            window.location.href = "/admin/expenses"; 
        } else {
            message.error("Expense delete failed.");
            setShowDeleteModal(false);
        }
    };

    const handleDelete = (id) => {
        setSelectedItemForDelete(id);
        setShowDeleteModal(true);
    };

    const handleCancelDelete = () => {
        resetInput();
        setShowDeleteModal(false);
    };

    const handleCancel = () => {
        resetInput();
        setShowModal(false);
    }

    const handleDeleteExpense = (id) => {
        setSelectedItemForDelete(id);
        setShowDeleteModal(true);
    }

    useEffect(() => {
        
    }, []);

    return (
        <AdminLayout title="Lion King Realty Administration Panel - Reports Page" chosenMenu="9">
              <DeleteModal
                    title="Delete Expense"
                    showDeleteModal={showDeleteModal}
                    handleOkDelete={handleOkDelete}
                    okButtonColor="red"
                    okText="Delete Now"
                    handleCancelDelete={handleCancelDelete}
                >
                    <p>Are you sure you want to delete this report?</p>
              </DeleteModal>
              <MainModal
                  title={modalTitle}
                  okText="Add Now"
                  mode={mode}
                  showModal={showModal}
                  okButtonColor="green"
                  handleCancel={handleCancel}
                  maskClosable={false}
                  destroyOnClose={true}
                  mWidth="500px"
              >
                  <ExpensesForm
                      onFinish={onFinish}
                      mode={mode}                  
                      transactionDate={transactionDate}
                      handleCancel={handleCancel}
                      form={form}
                      selectedItemForEdit={selectedItemForEdit}
                      getExpense={getExpense}
                  />
            </MainModal>
            <PrintReport
                showPrintModal={showPrintModal}
                closePrint={closePrint}
                printStatement={printStatement}
                componentRef={componentRef}                
                dailyExpenses={dailyExpenses}  
                dailyPayments={dailyPayments}      
                agentPayment={agentPayment}
                selectedDate={selectedDate}
                formatCurrency={formatCurrency}
                formatDate={formatDate}
                mtitle="Print Report"
            />
            <ReportsTable
                title="Payments Table"                
                tableData={expenses}
                setSelectedExpenseDate={setSelectedExpenseDate}
                setShowModal={setShowModal}
                handleAdd={handleAdd}
                handlePrint={handlePrint}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                setShowDeleteModal={setShowDeleteModal}
                setSelectedItemForDelete={setSelectedItemForDelete}
                setSelectedItemForEdit={setSelectedItemForEdit}
                setModalTitle={setModalTitle}
                setMode={setMode}
                formatDate={formatDate}
                formatCurrency={formatCurrency}
                page="expense"
            />
            { selectedExpenseDate !== null && (
                <ReportsTab 
                    selectedExpenseDate={selectedExpenseDate}                    
                    getExpensesByDate={getExpensesByDate}      
                    handleDeleteExpense={handleDeleteExpense}    
                    setSelectedItemForDelete={setSelectedItemForDelete}          
                    formatDate={formatDate}
                    formatCurrency={formatCurrency}                
                />
            )} 
        </AdminLayout>
    );
}
