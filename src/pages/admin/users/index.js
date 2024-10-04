import React, { useState } from "react";
import * as cookie from 'cookie';
import { useRouter } from 'next/router';
import { message, Form } from 'antd';
import AdminLayout from '../../../components/layouts/AdminLayout';
import UserTable from '../../../components/tables/user';
import UserForm from '../../../components/forms/user';
import MainModal from '../../../components/modals/MainModal';
import DeleteModal from '../../../components/modals/DeleteModal';
import { getUsers, addUser, updateUser, getUser, deleteUser } from '../../../services/user';

export async function getServerSideProps({ req }) {
  const cookieData = cookie.parse(req.headers.cookie || '');
  const { users } = await getUsers(cookieData.token);
  
  return {
    props: { info: cookieData, users },
  }
}

export default function User({ info, users })
{
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('Add User');
    const [selectedItemForDelete, setSelectedItemForDelete] = useState(null);
    const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
    const [mode, setMode] = useState('add');
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
      setShowModal(false);

      if(mode == "add") {
            const { user } = await addUser(values);
            if(user) {
                message.success("User added successfully.");
                router.push("/admin/users");
            } else {
                message.error("User addition failed.");
            }
        } else {
            values.id = selectedItemForEdit;
            const { user } = await updateUser(values);
            if(user == 1) {
                message.success("User updated successfully.");
                router.push("/admin/users");
            } else {
                message.error("User failed during the update.");
            }
        }
    }

    const handleOkDelete = async () => {
        const { user } = await deleteUser(selectedItemForDelete);
        setShowDeleteModal(false);
        console.log(user);
        if(user == 1) {
            message.success("User deleted successfully.");
            router.push("/admin/users");
        } else {
            message.error("User delete failed.");
            setShowDeleteModal(false);
        }
    };

    const handleDelete = (id) => {
        setSelectedItemForDelete(id);
        setShowDeleteModal(true);
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setSelectedItemForDelete(null);
    };

    const handleCancel = () => {
        setSelectedItemForEdit(null);
        setSelectedItemForDelete(null);
        setModalTitle('');
        setShowModal(false);
    }

    return (
        <AdminLayout title="Crew Management Administration Panel - Users Page" chosenMenu="2">
              <DeleteModal
                    title="Delete User"
                    showDeleteModal={showDeleteModal}
                    handleOkDelete={handleOkDelete}
                    okButtonColor="red"
                    okText="Delete Now"
                    handleCancelDelete={handleCancelDelete}
                >
                    <p>Are you sure you want to delete this user?</p>
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
                  <UserForm
                      onFinish={onFinish}
                      mode={mode}
                      handleCancel={handleCancel}
                      form={form}
                      selectedItemForEdit={selectedItemForEdit}
                      getUser={getUser}
                  />
            </MainModal>
            <UserTable
                title="Users Table"
                tableData={users}
                setShowModal={setShowModal}
                handleDelete={handleDelete}
                setShowDeleteModal={setShowDeleteModal}
                setSelectedItemForDelete={setSelectedItemForDelete}
                setSelectedItemForEdit={setSelectedItemForEdit}
                setModalTitle={setModalTitle}
                setMode={setMode}
                setPage="user"
            />
        </AdminLayout>
    );
}
