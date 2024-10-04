import { Modal } from 'antd';

const PaymentModal = ({
    children,
    title,
    okText,
    showPaymentModal,
    okButtonColor,
    handleCancelPayment,
    maskClosable,
    destroyOnClose,
    mWidth
}) =>
{
    return (
        <Modal
          title={title}
          okText={okText}
          width={mWidth}          
          okButtonProps={{ style: { backgroundColor: okButtonColor, display: 'none' } }}
          cancelButtonProps={{ style: { display: 'none' } }}
          open={showPaymentModal}
          maskClosable={maskClosable}
          destroyOnClose={destroyOnClose}
          onCancel={handleCancelPayment}>
            {children}
        </Modal>
    );
}

export default PaymentModal;
