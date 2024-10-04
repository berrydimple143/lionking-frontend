import { Space, Form, Select, DatePicker } from 'antd';
import React, { useState, useEffect } from "react";
import moment from 'moment';
import { SaveOutlined, StopOutlined } from '@ant-design/icons';

export default function ManagerForm({
    children,
    mode,
    onFinish,
    handleCancel,
    form,
    selectedItemForEdit,
    areas,
    getManager
}) {
    const [buttonText, setButtonText] = useState('Save Now');

    const initComponents = async () => {
        setButtonText('Save Changes');
        const { manager } = await getManager(selectedItemForEdit);        
        form.setFieldsValue({
            first_name: manager.first_name,
            last_name: manager.last_name,
            middle_name: manager.middle_name,
            extension_name: manager.extension_name,
            address: manager.contact.address,
            mobile: manager.contact.mobile,            
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

            
                <div className="w-full sm:w-6/12 px-10 py-0">
                    <Form.Item label={<label style={{ color: "black" }}>First Name</label>} name="first_name" rules={[{ required: true, message: 'First name is required.' }]}>
                        <input type="text" className="main-input" style={{ width: '270px' }} id="first_name" placeholder="Type firstname here..." />
                    </Form.Item>
                </div>
                <div className="w-full sm:w-6/12 px-10 py-0">
                    <Form.Item label={<label style={{ color: "black" }}>Last Name</label>} name="last_name" rules={[{ required: true, message: 'Last name is required.' }]}>
                        <input type="text" className="main-input" style={{ width: '270px' }} id="last_name" placeholder="Type lastname here..." />
                    </Form.Item>   
                </div>  
                <div className="w-full sm:w-6/12 px-10 py-0">
                    <Form.Item label={<label style={{ color: "black" }}>Middle Name</label>} name="middle_name" rules={[{ required: false }]}>
                        <input type="text" className="main-input" style={{ width: '270px' }} id="middle_name" placeholder="Type middlename here..." />
                    </Form.Item>    
                </div>
                <div className="w-full sm:w-6/12 px-10 py-0">
                    <Form.Item label={<label style={{ color: "black" }}>Extension Name (Sr./Jr.)</label>} name="extension_name" rules={[{ required: false }]}>
                        <input type="text" className="main-input" style={{ width: '270px' }} id="extension_name" placeholder="Type extension name here if available ..." />
                    </Form.Item>   
                </div>
                <div className="w-full sm:w-6/12 px-10 py-0">
                    <Form.Item label={<label style={{ color: "black" }}>Address</label>} name="address" rules={[{ required: true, message: 'Address is required.' }]}>
                        <input type="text" className="main-input" style={{ width: '270px' }} id="address" placeholder="Type address here..." />
                    </Form.Item>  
                </div>
                <div className="w-full sm:w-6/12 px-10 py-0">
                    <Form.Item label={<label className='text-gray-800'>Contact Number</label>} name="mobile" rules={[{ required: false }]}>
                        <input type="text" className="main-input" style={{ width: '270px' }} id="mobile" placeholder="Type client's contact number here..." />
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
