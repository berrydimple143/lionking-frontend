import React, { useState, useEffect, useRef } from "react";
import * as cookie from 'cookie';
import { useRouter } from 'next/router';
import { message, Form } from 'antd';
import { useReactToPrint } from 'react-to-print';
import AdminLayout from '../../../components/layouts/AdminLayout';
import AreaTable from '../../../components/tables/area';
import AreaForm from '../../../components/forms/area';
import MainModal from '../../../components/modals/MainModal';
import DeleteModal from '../../../components/modals/DeleteModal';
import AreaTab from "@/components/tabs/AreaTab";
import PrintAreaModal from "@/components/modals/PrintAreaModal";
import { formatDate, formatCurrency, totalPayment, computeBalance, totalCollectibles, computeBalanceNumber } from '@/services/helpers';
import { getAreas, addArea, updateArea, getArea, deleteArea, getCollectablesByArea } from '../../../services/area';

export async function getServerSideProps({ req }) {
  const cookieData = cookie.parse(req.headers.cookie || '');
  const { areas } = await getAreas(cookieData.token);

  return {
    props: { info: cookieData, areas },
  }
}

export default function Area({info, areas })
{
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('Add Area');
    const [selectedItemForDelete, setSelectedItemForDelete] = useState(null);
    const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
    const [mode, setMode] = useState('add');
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    const [form] = Form.useForm();
    const [selectedAreaId, setSelectedAreaId] = useState(null);
    const [showPrintModal, setShowPrintModal] = useState(false);
    const componentRef = useRef();
    const [selectedCollectables, setSelectedCollectables] = useState([]);
    const [selectedArea, setSelectedArea] = useState([]);

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
            const { area } = await addArea(values);            
            if(area) {
                message.success("Area added successfully.");
                router.push("/admin/areas");
            } else {
                message.error("Failed adding an area.");
            }
        } else {
            values.id = selectedItemForEdit;
            const { area } = await updateArea(values);
            if(area == 1) {
                message.success("Area updated successfully.");
                router.push("/admin/areas");
            } else {
                message.error("Area failed during the update.");
            }
        }
        resetInput();
    }

    const handleAdd = () => {
        setModalTitle('Add Area');
        setMode('add');
        setShowModal(true);
    }

    const resetInput = () => {
        form.setFieldsValue({
            name: '',
        });
        setSelectedItemForEdit(null);
        setSelectedItemForDelete(null);
        setMode(null);
        setModalTitle('Add Area');
    }

    const handleEdit = (id) => {
        setModalTitle('Edit Area');
        setSelectedItemForEdit(id);
        setMode('edit');
        setShowModal(true);
    }

    const handleOkDelete = async () => {
        const { area } = await deleteArea(selectedItemForDelete);
        setShowDeleteModal(false);
        if(area == 1) {
            message.success("Area deleted successfully.");
            router.push("/admin/areas");
        } else {
            message.error("Area delete failed.");
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

    const selectArea = (id) => {            
        setSelectedAreaId(id);        
    }

    return (
        <AdminLayout title="Lion King Realty Administration Panel - Areas Page" chosenMenu="7">
              <DeleteModal
                    title="Delete Area"
                    showDeleteModal={showDeleteModal}
                    handleOkDelete={handleOkDelete}
                    okButtonColor="red"
                    okText="Delete Now"
                    handleCancelDelete={handleCancelDelete}
                >
                    <p>Are you sure you want to delete this area?</p>
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
                  <AreaForm
                      onFinish={onFinish}
                      mode={mode}
                      handleCancel={handleCancel}
                      form={form}
                      selectedItemForEdit={selectedItemForEdit}
                      getArea={getArea}
                  />
            </MainModal>
            <PrintAreaModal
                showPrintModal={showPrintModal}
                closePrint={closePrint}
                printStatement={printStatement}
                componentRef={componentRef}
                selectedCollectables={selectedCollectables}                    
                selectedArea={selectedArea} 
                totalPayment={totalPayment}
                totalCollectibles={totalCollectibles}
                computeBalance={computeBalance}
                computeBalanceNumber={computeBalanceNumber}
                formatCurrency={formatCurrency}
                formatDate={formatDate}
                mtitle="Collectibles"
            />
            <AreaTable
                title="Areas Table"
                tableData={areas}
                setShowModal={setShowModal}
                handleAdd={handleAdd}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                setShowDeleteModal={setShowDeleteModal}
                setSelectedItemForDelete={setSelectedItemForDelete}
                setSelectedItemForEdit={setSelectedItemForEdit}
                setModalTitle={setModalTitle}
                setMode={setMode}
                selectArea={selectArea}
                setPage="area"
            />
             { selectedAreaId !== null && (
                <AreaTab 
                    selectedAreaId={selectedAreaId}                    
                    getCollectablesByArea={getCollectablesByArea}                               
                    formatDate={formatDate}
                    formatCurrency={formatCurrency}         
                    totalPayment={totalPayment}     
                    computeBalance={computeBalance}  
                    setShowPrintModal={setShowPrintModal}
                    setSelectedCollectables={setSelectedCollectables}
                    setSelectedArea={setSelectedArea}
                    selectedCollectables={selectedCollectables}                    
                    selectedArea={selectedArea}
                    totalCollectibles={totalCollectibles}
                />
            )} 
        </AdminLayout>
    );
}
