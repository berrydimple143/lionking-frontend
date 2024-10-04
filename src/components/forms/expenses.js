import { Space, Form, DatePicker } from 'antd';
import React, { useState, useEffect } from "react";
import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import moment from 'moment';

export default function ExpensesForm({
    onFinish,
    handleCancel,
    form,
    transactionDate
}) {
    const [buttonText, setButtonText] = useState('Save Now');

    useEffect(() => {
        if(transactionDate != '') {
            const td = transactionDate.toString() + " 12:30:30";
            const tdate = moment(td, 'YYYY-MM-DD hh:mm:ss');   
            form.setFieldsValue({
                transaction_date: tdate,
            });         
        }        
    }, []);

    return (
     <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item label="Transaction Date" name="transaction_date" rules={[{ required: true, message: 'Transaction Date is required.' }]}>
            <DatePicker
            id="transaction_date" 
            format='YYYY-MM-DD' 
            className="main-input"
            placeholder="Pick a date here ..." />
        </Form.Item>
        <Form.Item label={<label style={{ color: "black" }}>Description</label>} name="description" rules={[{ required: true, message: 'Description is required.' }]}>
            <input type="text" className="main-input" id="description" placeholder="Type description here..." />
        </Form.Item>
        <Form.Item label={<label style={{ color: "black" }}>Amount</label>} name="amount" rules={[{ required: true, message: 'Amount is required.' }]}>
            <input type="text" className="main-input" id="amount" placeholder="Type amount here..." />
        </Form.Item>        
        <Form.Item>
            <Space>
                <button type="submit" className="main-btn"><Space><SaveOutlined />{buttonText}</Space></button>
                <button type="button" onClick={handleCancel} className="cancel-btn"><Space><StopOutlined />Cancel</Space></button>
            </Space>
          </Form.Item>
        </Form>
    );
}
