import { Modal } from 'antd';

const DeleteModal = ({
    children,
    title,
    showDeleteModal,
    handleOkDelete,
    okButtonColor,
    okText,
    handleCancelDelete
}) =>
{
    return (
        <Modal
          title={title}
          open={showDeleteModal}
          onOk={handleOkDelete}
          okText={okText}
          okButtonProps={{ style: { backgroundColor: okButtonColor } }}
          onCancel={handleCancelDelete}
        >
            {children}
        </Modal>
    );
}

export default DeleteModal;
