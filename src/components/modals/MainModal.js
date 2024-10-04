import { Modal } from 'antd';

const MainModal = ({
    children,
    title,
    okText,
    showModal,
    okButtonColor,
    handleCancel,
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
          open={showModal}
          maskClosable={maskClosable}
          destroyOnClose={destroyOnClose}
          onCancel={handleCancel}>
            {children}
        </Modal>
    );
}

export default MainModal;
