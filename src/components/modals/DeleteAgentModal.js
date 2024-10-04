import { Modal } from 'antd';

const DeleteAgentModal = ({
    children,
    title,
    showDeleteAgentModal,
    handleOkDeleteAgent,
    okButtonColor,
    okText,
    handleCancelDeleteAgent
}) =>
{
    return (
        <Modal
          title={title}
          open={showDeleteAgentModal}
          onOk={handleOkDeleteAgent}
          okText={okText}
          okButtonProps={{ style: { backgroundColor: okButtonColor } }}
          onCancel={handleCancelDeleteAgent}
        >
            {children}
        </Modal>
    );
}

export default DeleteAgentModal;
