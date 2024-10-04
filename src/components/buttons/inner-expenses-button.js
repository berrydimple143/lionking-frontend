import { Tooltip, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const InnerExpenseButton = ({
    text,
    handleDeleteExpense   
}) =>
{
    return (
        <div key={`${text}`}>                      
            <Space>                
                <Tooltip title="Delete this expense" placement="top">
                    <button
                        onClick={() => {
                            handleDeleteExpense(text);
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

export default InnerExpenseButton;
