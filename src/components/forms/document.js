import { Space, Form, Select, DatePicker, Upload, Button } from 'antd';
import React, { useState, useEffect } from "react";
import { UploadOutlined } from '@ant-design/icons';

export default function DocumentForm({
    children,
    mode,
    onFinish,
    handleCancel,
    form,
    selectedItemForEdit,
    getDocument,
    crews,
    formatToDatePicker,
    formatDate,
    dateIssuedChange,
    expiryDateChange,
    setDateIssued,
    setExpiryDate,
    uploadProps,
    setAge
}) {
    const [buttonText, setButtonText] = useState('Add Now');

    const initComponents = async () => {
        setButtonText('Save Changes');
        const { crew_document } = await getDocument(selectedItemForEdit);
        const exp1 = formatToDatePicker(crew_document.expiry_date, "YYYY-MM-DD");
        const exp2 = formatDate(crew_document.expiry_date, "YYYY-MM-DD");
        const issued1 = formatToDatePicker(crew_document.issue_date, "YYYY-MM-DD");
        const issued2 = formatDate(crew_document.issue_date, "YYYY-MM-DD");
        setExpiryDate(exp2);
        setDateIssued(issued2);

        form.setFieldsValue({
            code: crew_document.code,
            crew_id: crew_document.crew_id,
            document_name: crew_document.document_name,
            document_number: crew_document.document_number,
            expiry_date: exp1,
            issue_date: issued1,
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
                  <Form.Item label={<label style={{ color: "black" }}>Crew</label>} name="crew_id" rules={[{ required: true, message: 'Crew is required.'}]}>
                       <Select
                        className="form-control"
                        id="crew_id"
                        placeholder="Select a crew here ...">
                        {" "}
                        {crews && crews.map((item, index) => <Select.Option value={item.id} key={index}>{item.first_name} {item.last_name}</Select.Option>)}
                      </Select>
                  </Form.Item>
                </div>
                <div className="col">
                    <Form.Item label={<label style={{ color: "black" }}>Code</label>} name="code" rules={[{ required: true, message: 'Code is required.'}]}>
                        <input type="text" className="form-control" id="code" placeholder="Type document code here..." />
                  </Form.Item>
                </div>
            </div>
            <div className="row align-items-start">
                <div className="col">
                  <Form.Item label={<label style={{ color: "black" }}>Document Name</label>} name="document_name" rules={[{ required: true, message: 'Document Name is required.'}]}>
                        <input type="text" className="form-control" id="document_name" placeholder="Type document name here..." />
                  </Form.Item>
                </div>
                <div className="col">
                    <Form.Item label={<label style={{ color: "black" }}>Document Number</label>} name="document_number" rules={[{ required: true, message: 'Document Number is required.'}]}>
                        <input type="text" className="form-control" id="document_number" placeholder="Type document number here..." />
                    </Form.Item>
                </div>
              </div>
              <div className="row align-items-start">
                <div className="col">
                  <Form.Item label={<label style={{ color: "black" }}>Date Issued</label>} name="issue_date" rules={[{ required: true, message: 'Date Issued is required.' }]}>
                        <DatePicker
                            className="form-control"
                            id="issue_date"
                            popupStyle={{ position: 'absolute', top: '100px', left: '70px' }}
                            placeholder="Select date issued here"
                            onChange={dateIssuedChange}
                        />
                  </Form.Item>
                </div>
                <div className="col">
                  <Form.Item label={<label style={{ color: "black" }}>Expiry Date</label>} name="expiry_date" rules={[{ required: true, message: 'Expiry Date is required.' }]}>
                        <DatePicker
                            className="form-control"
                            id="expiry_date"
                            popupStyle={{ position: 'absolute', top: '100px', left: '1000px' }}
                            placeholder="Select expiry date here"
                            onChange={expiryDateChange}
                        />
                  </Form.Item>
                </div>
              </div>

              { mode == "add" && (
              <div className="row align-items-start">
                    <div className="col">
                    <Form.Item name="uploaded_document" rules={[{ required: true, message: 'You must upload a document.' }]}>
                            <Space>
                                Document File:
                                <Upload {...uploadProps}>
                                    <Button
                                        className="form-control"
                                        icon={<UploadOutlined />}
                                        >Click To Upload a PDF File</Button>
                                </Upload>
                            </Space>
                        </Form.Item>
                    </div>
              </div>
              )}

              <div className="row align-items-start">&nbsp;</div>

              <Form.Item>
                <Space>
                <button type="submit" className="btn btn-success">{buttonText}</button>
                <button type="button" onClick={handleCancel} className="btn btn-warning">Cancel</button>
                </Space>
              </Form.Item>
        </Form>
    );
}
