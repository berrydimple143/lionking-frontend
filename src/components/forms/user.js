import { Space, Form, Select } from 'antd';
import React, { useState, useEffect } from "react";

export default function UserForm({
    children,
    mode,
    onFinish,
    handleCancel,
    form,
    selectedItemForEdit,
    getUser,
    roles
}) {
    const [buttonText, setButtonText] = useState('Add Now');

    const initComponents = async () => {
        setButtonText('Save Changes');
        const { user, role_id } = await getUser(selectedItemForEdit);
        form.setFieldsValue({
            name: user.name,
            email: user.email,
            username: user.username,
            role_id: role_id,
        });
    }

    useEffect(() => {
        if(mode == 'edit') {
            initComponents();
        }
    }, []);

    return (
     <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item label={<label style={{ color: "black" }}>Name</label>} name="name" rules={[{ required: true, message: 'Name is required.' }]}>
            <input type="text" className="form-control" id="name" placeholder="Type your name here..." />
        </Form.Item>
        <Form.Item label={<label style={{ color: "black" }}>Email</label>} name="email" rules={[{ required: true, message: 'Email is required.' }, { type: 'email', message: 'Invalid email address.' }]}>
          <input type="email" className="form-control" id="name" placeholder="Type your email here..." />
        </Form.Item>
        <Form.Item label={<label style={{ color: "black" }}>Username</label>} name="username" rules={[{ required: true, message: 'Username is required.' }, { max: 10, message: 'Username must be at most 10 characters long' }, {
            pattern: new RegExp(/^[a-zA-Z@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]+$/i),
            message: "This field does not accept numbers. You provide a string only."
           }]}>
          <input type="text" className="form-control" id="username" placeholder="Type username here..." />
        </Form.Item>

        { mode == 'add' && (

            <Form.Item label={<label style={{ color: "black" }}>Password</label>} name="password" rules={[{ required: true, message: 'Password is required.' }, { max: 20, message: 'Password should be up to 20 characters long only.' }, {
                    pattern: new RegExp(/^[a-zA-Z0-9]+$/i),
                    message: "This field must not contain any special characters."
                   }]}>
                <input type="password" className="form-control" id="password" placeholder="Type password here..." />
            </Form.Item>
        )}
            <Form.Item label={<label style={{ color: "black" }}>Role</label>} name="role_id" rules={[{ required: true, message: 'Role is required.' }]}>
                <Select
                    className="form-control"
                    id="role_id"
                    placeholder="Select a role here ...">
                    {" "}
                    {roles && roles.map((item, index) => <Select.Option value={item.id} key={index}>{item.name}</Select.Option>)}
                </Select>
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
