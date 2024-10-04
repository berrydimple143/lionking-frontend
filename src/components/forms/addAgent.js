import { Space, Form, Select } from 'antd';
import React, { useState, useEffect } from "react";
import { SaveOutlined, StopOutlined } from '@ant-design/icons';

export default function AddAgentForm({
    children,
    mode,
    onFinish,
    handleCancel,
    form,
    agents
}) {
    const [buttonText, setButtonText] = useState('Save Now');

    useEffect(() => {
        
    }, []);

    return (
     <Form layout="vertical" onFinish={onFinish} form={form}>        
        <Form.Item label="Agent" name="user_id" rules={[{ required: true, message: 'Agent is required.' }]}>
            <Select
                className="main-input" 
                id="user_id" 
                placeholder="Select agent here ...">
                {" "}
                {agents && agents.map((item, index) => <Select.Option value={item.id} key={index}>{`${item.last_name}, ${item.first_name}`}</Select.Option>)}
                </Select>
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
