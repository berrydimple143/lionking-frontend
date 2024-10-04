import { Tooltip, Space } from 'antd';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';

const PaymentButton = ({
    text,
    handleDeletePayment,      
    handleExpense,  
    setSelectedItemForDelete,
    page
}) =>
{
    return (
        <div key={`${text}`}>                      
            <Space>                
                <Tooltip title="Delete this payment" placement="top">
                    <button
                        onClick={() => {
                            handleDeletePayment(text);
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

export default PaymentButton;
