import { Space, Form, Select, DatePicker } from 'antd';
import { PlusCircleOutlined, StopOutlined } from '@ant-design/icons';

export default function AgentPaymentForm({  
    onFinish,
    handleCancelPayment,
    form,
    methods
}) {

    return (
     <Form layout="vertical" onFinish={onFinish} form={form} className='border border-gray-300 shadow-lg pt-3 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-red-300 via-red-50 to-red-300'> 
        <div className="flex flex-wrap justify-start items-center mt-5 uppercase w-full">
                        
                <div className="w-full px-10 py-0">
                    <Form.Item label="Payment Method" name="method" rules={[{ required: true, message: 'Payment Method is required.' }]}>
                        <Select
                            className="main-input" 
                            id="method" 
                            style={{ width: '270px' }} 
                            placeholder="Select a mode of payment here ...">
                            {" "}
                            {methods && methods.map((item, index) => <Select.Option value={item.name} key={index}>{item.name}</Select.Option>)}
                            </Select>
                    </Form.Item>
                </div>
                <div className="w-full px-10 py-0">
                    <Form.Item label={<label className='text-gray-700'>Amount to pay</label>} name="amount" rules={[{ required: true, message: 'Amount to pay is required.' }]}>
                        <input type="text" className="main-input" style={{ width: '270px' }} id="amount" placeholder="Type amount to pay here..." />
                    </Form.Item>   
                </div>               
                <div className="w-full px-10 py-0">
                    <Form.Item label="Date Paid" name="date_paid" rules={[{ required: true, message: 'Date Paid is required.' }]}>
                        <DatePicker
                        id="date_paid" 
                        style={{ width: '270px' }} 
                        format='YYYY-MM-DD' 
                        className="main-input"
                        placeholder="Pick a date here ..." />
                    </Form.Item>
                </div>    
                <div className="w-full px-10 py-0">
                    <Form.Item label={<label className='text-gray-700'>Paid By</label>} name="received_by" rules={[{ required: false }]}>
                        <input type="text" className="main-input" style={{ width: '270px' }} id="received_by" placeholder="Type the person who received the payment here..." />
                    </Form.Item>   
                </div>                   
            
            <div className="w-full px-10 py-0">
                <Form.Item>
                    <Space>
                        <button type="submit" className="main-btn"><Space><PlusCircleOutlined />Add Payment Now</Space></button>
                        <button type="button" onClick={handleCancelPayment} className="cancel-btn"><Space><StopOutlined />Cancel</Space></button>
                    </Space>
                </Form.Item>
            </div>     

        </div>
                                 
    </Form>
  );
}
