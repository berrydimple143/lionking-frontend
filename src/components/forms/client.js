import { Space, Form, Select, DatePicker } from 'antd';
import React, { useState, useEffect } from "react";
import moment from 'moment';
import { SaveOutlined, StopOutlined } from '@ant-design/icons';

export default function ClientForm({
    children,
    mode,
    onFinish,
    handleCancel,
    form,
    selectedItemForEdit,
    areas,
    getClient
}) {
    const [buttonText, setButtonText] = useState('Save Now');

    const initComponents = async () => {
        setButtonText('Save Changes');
        const { client } = await getClient(selectedItemForEdit);
        let db = client.contact.date_bought;
        if(db) {
            db = moment(db, 'YYYY-MM-DD');
        } else {
            db = null;
        }
        form.setFieldsValue({
            first_name: client.first_name,
            last_name: client.last_name,
            middle_name: client.middle_name,
            extension_name: client.extension_name,
            address: client.contact.address,
            mobile: client.contact.mobile,
            area_id: client.contact.area_id,
            block: client.contact.block,
            lot: client.contact.lot,
            price: client.contact.price,
            measure: client.contact.measure,
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

            <div className='border-r border-gray-300 w-1/2'>
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
            </div>
            
            <div className='w-1/2'>
                <div className="w-full sm:w-6/12 px-10 py-0">
                    <Form.Item label="Area" name="area_id" rules={[{ required: true, message: 'Area is required.' }]}>
                        <Select
                            className="main-input" 
                            id="area_id" 
                            style={{ width: '270px' }} 
                            placeholder="Select an area here ...">
                            {" "}
                            {areas && areas.map((item, index) => <Select.Option value={item.id} key={index}>{item.name}</Select.Option>)}
                            </Select>
                    </Form.Item>
                </div>
                <div className="w-full sm:w-6/12 px-10 py-0">
                    <Form.Item label={<label style={{ color: "black" }}>Block No.</label>} name="block" rules={[{ required: true, message: 'Block no. is required.' }]}>
                        <input type="text" className="main-input" style={{ width: '270px' }} id="block" placeholder="Type block no. here..." />
                    </Form.Item>   
                </div>
                <div className="w-full sm:w-6/12 px-10 py-0">
                    <Form.Item label={<label style={{ color: "black" }}>Lot No.</label>} name="lot" rules={[{ required: true, message: 'Lot no. is required.' }]}>
                        <input type="text" className="main-input" style={{ width: '270px' }} id="lot" placeholder="Type lot no. here..." />
                    </Form.Item>  
                </div>
                <div className="w-full sm:w-6/12 px-10 py-0">
                    <Form.Item label={<label style={{ color: "black" }}>Selling Price</label>} name="price" rules={[{ required: true, message: 'Selling price is required.' }]}>
                        <input type="text" className="main-input" style={{ width: '270px' }} id="price" placeholder="Type selling price here..." />
                    </Form.Item>
                </div>
                <div className="w-full sm:w-6/12 px-10 py-0">
                    <Form.Item label={<label style={{ color: "black" }}>Square Meter(s)</label>} name="measure" rules={[{ required: true, message: 'Square meter is required.' }]}>
                        <input type="text" className="main-input" style={{ width: '270px' }} id="measure" placeholder="Type square meter here..." />
                    </Form.Item>
                </div>
                <div className="w-full sm:w-6/12 px-10 py-0">
                    <Form.Item label="Date of Buying" name="date_bought" rules={[{ required: true, message: 'Date of Buying is required.' }]}>
                        <DatePicker
                        id="date_bought" 
                        style={{ width: '270px' }} 
                        format='YYYY-MM-DD' 
                        className="main-input"
                        placeholder="Pick a date here ..." />
                    </Form.Item>
                </div>                
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
