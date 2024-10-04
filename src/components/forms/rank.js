import { Space, Form } from 'antd';
import React, { useState, useEffect } from "react";

export default function RankForm({
    children,
    mode,
    onFinish,
    handleCancel,
    form,
    selectedItemForEdit,
    getRank
}) {
    const [buttonText, setButtonText] = useState('Add Now');

    const initComponents = async () => {
        setButtonText('Save Changes');
        const { rank } = await getRank(selectedItemForEdit);
        form.setFieldsValue({
            name: rank.name,
            code: rank.code,
            alias: rank.alias,
        });
    }

    useEffect(() => {
        if(mode == 'edit') {
            initComponents();
        }
    }, []);

    return (
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item label={<label style={{ color: "black" }}>Code</label>} name="code" rules={[{ required: true, message: 'Code is required.'}]}>
                <input type="text" className="form-control" id="code" placeholder="Type rank code here..." />
          </Form.Item>

          <Form.Item label={<label style={{ color: "black" }}>Rank Name</label>} name="name" rules={[{ required: true, message: 'Rank name is required.'}]}>
                <input type="text" className="form-control" id="name" placeholder="Type rank name here..." />
          </Form.Item>

          <Form.Item label={<label style={{ color: "black" }}>Alias</label>} name="alias" rules={[{ required: true, message: 'Alias is required.'}]}>
                <input type="text" className="form-control" id="alias" placeholder="Type rank alias here..." />
          </Form.Item>

          <Form.Item>
            <Space>
            <button type="submit" className="btn btn-success">{buttonText}</button>
            <button type="button" onClick={handleCancel} className="btn btn-warning">Cancel</button>
            </Space>
          </Form.Item>
        </Form>
    );
}
