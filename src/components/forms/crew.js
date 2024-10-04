import { Space, Form, Select, DatePicker } from 'antd';
import React, { useState, useEffect } from "react";

export default function CrewForm({
    children,
    mode,
    onFinish,
    handleCancel,
    form,
    selectedItemForEdit,
    getCrew,
    ranks,
    formatToDatePicker,
    formatDate,
    birthDateChange,
    setBirthDate,
    setAge
}) {
    const [buttonText, setButtonText] = useState('Add Now');

    const initComponents = async () => {
        setButtonText('Save Changes');
        const { crew } = await getCrew(selectedItemForEdit);
        const bday = formatToDatePicker(crew.birth_date, "YYYY-MM-DD");
        const bday2 = formatDate(crew.birth_date, "YYYY-MM-DD");
        setBirthDate(bday2);
        setAge(crew.age);
        form.setFieldsValue({
            rank_id: crew.rank_id,
            first_name: crew.first_name,
            last_name: crew.last_name,
            middle_name: crew.middle_name,
            email: crew.email,
            address: crew.address,
            height: crew.height,
            weight: crew.weight,
            birth_date: bday,
        });
    }

    useEffect(() => {
        if(mode == 'edit') {
            initComponents();
        }
    }, []);

    return (
        <Form layout="vertical" onFinish={onFinish} form={form}>
            <div className="row align-items-start">
                <div className="col">
                  <Form.Item label={<label style={{ color: "black" }}>Rank</label>} name="rank_id" rules={[{ required: true, message: 'Rank is required.'}]}>
                       <Select
                        className="form-control"
                        id="rank_id"
                        placeholder="Select a rank here ...">
                        {" "}
                        {ranks && ranks.map((item, index) => <Select.Option value={item.id} key={index}>{item.name}</Select.Option>)}
                      </Select>
                  </Form.Item>
                </div>
                <div className="col">
                  <Form.Item label={<label style={{ color: "black" }}>Birth Date</label>} name="birth_date" rules={[{ required: true, message: 'Birth Date is required.' }]}>
                        <DatePicker
                            className="form-control"
                            id="birth_date"
                            popupStyle={{ position: 'absolute', top: '100px', left: '1000px' }}
                            placeholder="Select birth date here"
                            onChange={birthDateChange}
                        />
                  </Form.Item>
                </div>
            </div>
            <div className="row align-items-start">
                <div className="col">
                  <Form.Item label={<label style={{ color: "black" }}>First Name</label>} name="first_name" rules={[{ required: true, message: 'First Name is required.'}]}>
                        <input type="text" className="form-control" id="first_name" placeholder="Type first name here..." />
                  </Form.Item>
                </div>
                <div className="col">
                    <Form.Item label={<label style={{ color: "black" }}>Last Name</label>} name="last_name" rules={[{ required: true, message: 'Last Name is required.'}]}>
                        <input type="text" className="form-control" id="last_name" placeholder="Type last name here..." />
                    </Form.Item>
                </div>
              </div>
              <div className="row align-items-start">
                <div className="col">
                  <Form.Item label={<label style={{ color: "black" }}>Middle Name</label>} name="middle_name" rules={[{ required: false }]}>
                        <input type="text" className="form-control" id="middle_name" placeholder="Type middle name here..." />
                  </Form.Item>
                </div>
                <div className="col">
                    <Form.Item label={<label style={{ color: "black" }}>Email</label>} name="email" rules={[{ required: true, message: 'Email is required.'}, { type: 'email', message: 'Invalid email address.' }]}>
                        <input type="email" className="form-control" id="email" placeholder="Type email here..." />
                    </Form.Item>
                </div>
              </div>
              <div className="row align-items-start">
                <div className="col">
                  <Form.Item label={<label style={{ color: "black" }}>Address</label>} name="address" rules={[{ required: false }]}>
                        <input type="text" className="form-control" id="address" placeholder="Type address here..." />
                  </Form.Item>
                </div>
              </div>
              <div className="row align-items-start">
                <div className="col">
                  <Form.Item label={<label style={{ color: "black" }}>Height (in centimeter)</label>} name="height" rules={[{ required: false }]}>
                        <input type="text" className="form-control" id="height" placeholder="Type height here..." />
                  </Form.Item>
                </div>
                <div className="col">
                    <Form.Item label={<label style={{ color: "black" }}>Weight (in kilogram)</label>} name="weight" rules={[{ required: false }]}>
                        <input type="text" className="form-control" id="weight" placeholder="Type weight here..." />
                    </Form.Item>
                </div>
              </div>
              <Form.Item>
                <Space>
                <button type="submit" className="btn btn-success">{buttonText}</button>
                <button type="button" onClick={handleCancel} className="btn btn-warning">Cancel</button>
                </Space>
              </Form.Item>
        </Form>
    );
}
