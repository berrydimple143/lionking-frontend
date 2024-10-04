import { Tooltip, Space } from 'antd';
import { PrinterOutlined, PlusCircleOutlined } from '@ant-design/icons';

const ExpenseButton = ({ text, handleAdd, handlePrint, page }) =>
{
    return (
        <div key={`${text}`}>                      
            <Space>           
                <Tooltip title="Print daily report for this date" placement="top">
                    <button
                        onClick={() => {
                            handlePrint(text);
                        }}
                        type="button"
                        className="primary-btn"
                    >
                        <Space><PrinterOutlined />Print Report</Space>
                    </button>   
                </Tooltip>  
                
                { page != "reports" && (
                    <Tooltip title="Add expenses for this date" placement="top">
                        <button
                            onClick={() => {
                                handleAdd(text);
                            }}
                            type="button"
                            className="success-btn"
                        >
                            <Space><PlusCircleOutlined />Add Expense</Space>
                        </button>   
                    </Tooltip> 
                )}
            </Space>                    
        </div>
    );
}

export default ExpenseButton;
