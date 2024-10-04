import { Modal } from 'antd';

const DeletePaymentModal = ({
    children,
    title,
    showDeletePaymentModal,
    handlePaymentOkDelete,
    okButtonColor,
    okText,
    handlePaymentCancelDelete
}) =>
{
    return (
        <Modal
          title={title}
          open={showDeletePaymentModal}
          onOk={handlePaymentOkDelete}
          okText={okText}
          okButtonProps={{ style: { backgroundColor: okButtonColor } }}
          onCancel={handlePaymentCancelDelete}
        >
            {children}
        </Modal>
    );
}

export default DeletePaymentModal;
