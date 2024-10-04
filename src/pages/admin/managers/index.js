import React, { useState, useEffect, useRef } from "react";
import * as cookie from 'cookie';
import { useRouter } from 'next/router';
import { message, Form } from 'antd';
import { useReactToPrint } from 'react-to-print';
import AdminLayout from '@/components/layouts/AdminLayout';
import ManagerTable from '@/components/tables/manager';
import ManagerForm from '@/components/forms/manager';
import AddAgentForm from '@/components/forms/addAgent';
import MainModal from '@/components/modals/MainModal';
import DeleteModal from '@/components/modals/DeleteModal';
import DeleteAgentModal from '@/components/modals/DeleteAgentModal';
import ManagerTab from "@/components/tabs/ManagerTab";
import PrintAreaModal from "@/components/modals/PrintAreaModal";
import { formatDate, formatCurrency, totalPayment, computeBalance } from '@/services/helpers';
import { getManagers, addManager, updateManager, getManager, deleteManager, addAgent, deleteAgent, getManagerAgents } from '@/services/manager';
import { getAgents } from '@/services/agent';

export async function getServerSideProps({ req }) { 
  const cookieData = cookie.parse(req.headers.cookie || '');
  const { managers } = await getManagers(cookieData.token);
  const { agents } = await getAgents(cookieData.token);

  return {
    props: { info: cookieData, managers, agents },
  }
}

export default function Manager({info, managers, agents })
{
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('Add Manager');
    const [selectedItemForDelete, setSelectedItemForDelete] = useState(null);
    const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
    const [mode, setMode] = useState('add');
    const [modalWidth, setModalWidth] = useState('700px');
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    const [form] = Form.useForm();
    const [selectedManagerId, setSelectedManagerId] = useState(null);
    const [chosenAgents, setChosenAgents] = useState([]);
    const [showPrintModal, setShowPrintModal] = useState(false);
    const [showDeleteAgentModal, setShowDeleteAgentModal] = useState(false);
    const componentRef = useRef();
    
    const printStatement = useReactToPrint({
        content: () => componentRef.current,
        onBeforeGetContent: () => {
            
        },
        onAfterPrint: () => {

        },
    });

    const closePrint = () =>
    {
        setShowPrintModal(false);
    }

    const onFinish = async (values) => {
      setShowModal(false);

      if(mode == "add") {
            const { manager } = await addManager(values);            
            if(manager) {
                message.success("Manager added successfully.");
                router.push("/admin/managers");
            } else {
                message.error("Failed adding an manager.");
            }
        } else if(mode == "edit") {
            values.id = selectedItemForEdit;
            const { manager } = await updateManager(values);
            if(manager == 1) {
                message.success("Manager updated successfully.");
                router.push("/admin/managers");
            } else {
                message.error("Manager failed during the update.");
            }
        } else if(mode == "agent") {
            values.manager_id = selectedItemForEdit;
            values.agent_id = values.user_id;
            const { status } = await addAgent(values);
            if(status) {
                message.success("Agent added successfully to this manager.");
                window.location.href = "/admin/managers";
            } else {
                message.error("Failed adding an agent to this manager.");
            }
        }
        resetInput();
    }

    const handleAdd = () => {
        setModalTitle('Add Manager');
        setMode('add');
        setShowModal(true);
    }

    const resetInput = () => {
        form.setFieldsValue({
            first_name: '',
            last_name: '',
            middle_name: '',
            extension_name: '',
            address: '',
            mobile: '',
            user_id: '',
        });
        setSelectedItemForEdit(null);
        setSelectedItemForDelete(null);
        setMode(null);
        setModalTitle('Add Manager');
        setModalWidth('700px');
    }

    const handleEdit = (id) => {
        setModalTitle('Edit Manager');
        setSelectedItemForEdit(id);
        setMode('edit');
        setShowModal(true);
    }

    const handleOkDelete = async () => {
        const { manager } = await deleteManager(selectedItemForDelete);
        setShowDeleteModal(false);
        if(manager == 1) {
            message.success("Manager deleted successfully.");
            window.location.href = "/admin/managers";
        } else {
            message.error("Manager delete failed.");
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

    const selectManager = (id) => {      
        setSelectedManagerId(id);        
    }

    const handleAgent = (id) => {
        setMode('agent');
        setModalWidth('500px');
        setModalTitle('Add Agent');
        setSelectedItemForEdit(id);
        setShowModal(true);
    }

    const handleOkDeleteAgent = async () => {
        const { agent } = await deleteAgent(selectedItemForDelete);        
        setShowDeleteAgentModal(false);
        if(agent == 1) {
            message.success("Agent deleted successfully.");
            window.location.href = "/admin/managers";
        } else {
            message.error("Agent delete failed.");            
        }
    }

    const handleDeleteAgent = async (id) => {
        setSelectedItemForDelete(id);
        setShowDeleteAgentModal(true);
    }

    const handleCancelDeleteAgent = () => {
        resetInput();
        setShowDeleteAgentModal(false);
    }    

    return (
        <AdminLayout title="Lion King Realty Administration Panel - Managers Page" chosenMenu="5">
              <DeleteModal
                    title="Delete Manager"
                    showDeleteModal={showDeleteModal}
                    handleOkDelete={handleOkDelete}
                    okButtonColor="red"
                    okText="Delete Now"
                    handleCancelDelete={handleCancelDelete}
                >
                    <p>Are you sure you want to delete this manager?</p>
              </DeleteModal>
              <DeleteAgentModal
                    title="Delete Agent"
                    showDeleteAgentModal={showDeleteAgentModal}
                    handleOkDeleteAgent={handleOkDeleteAgent}
                    okButtonColor="red"
                    okText="Delete Now"
                    handleCancelDeleteAgent={handleCancelDeleteAgent}
                >
                    <p>Are you sure you want to delete agent from this manager?</p>
              </DeleteAgentModal>
              <MainModal
                  title={modalTitle}
                  okText="Add Now"
                  mode={mode}
                  showModal={showModal}
                  okButtonColor="green"
                  handleCancel={handleCancel}
                  maskClosable={false}
                  destroyOnClose={true}
                  mWidth={modalWidth}
              >
                { (mode === "add" || mode === "edit") && (
                    <ManagerForm
                        onFinish={onFinish}
                        mode={mode}
                        handleCancel={handleCancel}
                        form={form}
                        selectedItemForEdit={selectedItemForEdit}
                        getManager={getManager}
                    />
                )}          
                { mode === "agent" && (
                    <AddAgentForm 
                        onFinish={onFinish}
                        mode={mode}
                        form={form}
                        handleCancel={handleCancel}
                        agents={agents}
                    />
                )}      
            </MainModal>

            <PrintAreaModal
                showPrintModal={showPrintModal}
                closePrint={closePrint}
                printStatement={printStatement}
                componentRef={componentRef}
                totalPayment={totalPayment}
                computeBalance={computeBalance}
                formatCurrency={formatCurrency}
                formatDate={formatDate}
                mtitle="Collectibles"
            />
            <ManagerTable
                title="Unit Managers"
                tableData={managers}
                setShowModal={setShowModal}
                handleAdd={handleAdd}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleAgent={handleAgent}
                setShowDeleteModal={setShowDeleteModal}
                setSelectedItemForDelete={setSelectedItemForDelete}
                setSelectedItemForEdit={setSelectedItemForEdit}
                setModalTitle={setModalTitle}
                setMode={setMode}
                selectManager={selectManager}
                page="manager"
            />
             { selectedManagerId !== null && (
                <ManagerTab 
                    setChosenAgents={setChosenAgents}
                    chosenAgents={chosenAgents}
                    selectedManagerId={selectedManagerId} 
                    getManagerAgents={getManagerAgents} 
                    handleDeleteAgent={handleDeleteAgent}
                />
            )} 
        </AdminLayout>
    );
}
