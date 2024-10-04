import { Space, Form, Select } from 'antd';
import React, { useState, useEffect } from "react";
import { SaveOutlined, StopOutlined } from '@ant-design/icons';

export default function AreaForm({
    children,
    mode,
    onFinish,
    handleCancel,
    form,
    selectedItemForEdit,
    getArea
}) {
    const [buttonText, setButtonText] = useState('Save Now');

    const initComponents = async () => {
        setButtonText('Save Changes');
        const { area } = await getArea(selectedItemForEdit);
        form.setFieldsValue({
            name: area.name,
        });
    }

    useEffect(() => {
        if(mode == 'edit') {
            initComponents();
        }
    }, []);

    return (
     <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item label={<label style={{ color: "black" }}>Name</label>} name="name" rules={[{ required: true, message: 'Area name is required.' }]}>
            <input type="text" className="main-input" id="name" placeholder="Type area name here..." />
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
