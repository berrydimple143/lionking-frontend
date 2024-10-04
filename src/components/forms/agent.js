import { Space, Form, DatePicker } from 'antd';
import React, { useState, useEffect } from "react";
import moment from 'moment';
import { SaveOutlined, StopOutlined } from '@ant-design/icons';

export default function AgentForm({
    mode,
    onFinish,
    handleCancel,
    form,
    selectedItemForEdit,
    getAgent
}) {
    const [buttonText, setButtonText] = useState('Save Now');

    const initComponents = async () => {
        setButtonText('Save Changes');
        const { agent } = await getAgent(selectedItemForEdit);
        let db = agent.contact.date_bought;
        if(db) {
            db = moment(db, 'YYYY-MM-DD');
        } else {
            db = null;
        }
        form.setFieldsValue({
            first_name: agent.first_name,
            last_name: agent.last_name,
            middle_name: agent.middle_name,
            extension_name: agent.extension_name,
            address: agent.contact.address,
            mobile: agent.contact.mobile,    
            price: agent.contact.price,       
            date_bought: db,
        });
    }

    useEffect(() => {
        if(mode == 'edit') {
            initComponents();
        }
    }, []);

    return (
     <Form layout="vertical" onFinish={onFinish} form={form} className='border border-gray-300 shadow-lg pt-3 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-red-300 via-red-50 to-red-300'> 
        <div className="flex flex-wrap justify-start items-center mt-5 uppercase w-full">
            <div className="flex-col sm:flex px-10 py-0">
                <Form.Item label={<label style={{ color: "black" }}>First Name</label>} name="first_name" rules={[{ required: true, message: 'First name is required.' }]}>
                    <input type="text" className="main-input" style={{ width: '270px' }} id="first_name" placeholder="Type firstname here..." />
                </Form.Item>
                <Form.Item label={<label style={{ color: "black" }}>Extension Name (Sr./Jr.)</label>} name="extension_name" rules={[{ required: false }]}>
                    <input type="text" className="main-input" style={{ width: '270px' }} id="extension_name" placeholder="Type extension name here if available ..." />
                </Form.Item>                 
            </div>
            <div className="flex-col sm:flex px-10 py-0">                
                <Form.Item label={<label style={{ color: "black" }}>Middle Name</label>} name="middle_name" rules={[{ required: false }]}>
                    <input type="text" className="main-input" style={{ width: '270px' }} id="middle_name" placeholder="Type middlename here..." />
                </Form.Item>    
                <Form.Item label={<label style={{ color: "black" }}>Address</label>} name="address" rules={[{ required: true, message: 'Address is required.' }]}>
                    <input type="text" className="main-input" style={{ width: '270px' }} id="address" placeholder="Type address here..." />
                </Form.Item>  
            </div>
            <div className="flex-col sm:flex px-10 py-0">
                <Form.Item label={<label style={{ color: "black" }}>Last Name</label>} name="last_name" rules={[{ required: true, message: 'Last name is required.' }]}>
                    <input type="text" className="main-input" style={{ width: '270px' }} id="last_name" placeholder="Type lastname here..." />
                </Form.Item>                
                <Form.Item label={<label className='text-gray-800'>Contact Number</label>} name="mobile" rules={[{ required: false }]}>
                    <input type="text" className="main-input" style={{ width: '270px' }} id="mobile" placeholder="Type agent's contact number here..." />
                </Form.Item>
            </div>
            <div className="flex-col sm:flex px-10 py-0">
                <Form.Item label={<label className='text-gray-800'>Commission</label>} name="price" rules={[{ required: true, message: "Agent's commission is required." }]}>
                    <input type="text" className="main-input" style={{ width: '270px' }} id="price" placeholder="Type agent's commission here..." />
                </Form.Item>
                <Form.Item label="Date of Registration" name="date_bought" rules={[{ required: true, message: 'Date of Registration is required.' }]}>
                    <DatePicker
                    id="date_bought" 
                    style={{ width: '270px' }} 
                    format='YYYY-MM-DD' 
                    className="main-input"
                    placeholder="Pick a registration date here ..." />
                </Form.Item>                
            </div>
            <div className="w-full px-10 py-0">
                <Form.Item>
                    <Space>
                        <button type="submit" className="main-btn"><Space><SaveOutlined />{buttonText}</Space></button>
                        <button type="button" onClick={handleCancel} className="cancel-btn"><Space><StopOutlined />Cancel</Space></button>
                    </Space>
                </Form.Item>
            </div>     

        </div>
                                 
    </Form>
  );
}
