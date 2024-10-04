import { Modal } from 'antd';

const ViewModal = ({
    children,
    title,
    showViewModal,
    okButtonColor,
    okText,
    handleCancelView,
    mWidth
}) =>
{
    return (
        <Modal
          title={title}
          open={showViewModal}
          onOk={handleCancelView}
          okText={okText}
          width={mWidth}
          cancelButtonProps={{ style: { display: 'none' } }}
          okButtonProps={{ style: { backgroundColor: okButtonColor } }}
          onCancel={handleCancelView}
        >
            {children}
        </Modal>
    );
}

export default ViewModal;
