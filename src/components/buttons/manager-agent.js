import { Tooltip, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const ManagerAgentButton = ({
    text,
    handleDeleteAgent
}) =>
{
    return (
        <div key={`${text}`}>                      
            <Space>                
                <Tooltip title="Delete this agent" placement="top">
                    <button
                        onClick={() => {
                            handleDeleteAgent(text);
                        }}
                        type="button"
                        className="delete-btn"
                    >
                        <Space><DeleteOutlined />Delete</Space>
                    </button>   
                </Tooltip>  
            </Space>                    
        </div>
    );
}

export default ManagerAgentButton;
