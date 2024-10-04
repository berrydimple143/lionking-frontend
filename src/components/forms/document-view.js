import { Space, Form, Select, DatePicker } from 'antd';
import React, { useState, useEffect } from "react";

export default function DocumentView({
    children,
    selectedItemForView,
    getDocument,
    formatDate
}) {
    const [documentName, setDocumentName] = useState('');
    const [documentNumber, setDocumentNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [issueDate, setIssueDate] = useState('');
    const [dateCreated, setDateCreated] = useState('');
    const [crew, setCrew] = useState('');
    const [inCharge, setInCharge] = useState('');
    const [code, setCode] = useState('');

    const initComponents = async () => {
        const { crew_document } = await getDocument(selectedItemForView);
        const issue = formatDate(crew_document.issue_date, "MMM DD, YYYY");
        const expiry = formatDate(crew_document.expiry_date, "MMM DD, YYYY");
        const created = formatDate(crew_document.created_at, "MMM DD, YYYY");
        setDocumentName(crew_document.document_name);
        setDocumentNumber(crew_document.document_number);
        setCode(crew_document.code);
        setInCharge(crew_document.user.name);
        setCrew(`${crew_document.crew.first_name} ${crew_document.crew.last_name}`);
        setExpiryDate(expiry.toString());
        setIssueDate(issue.toString());
        setDateCreated(created.toString());
    }

    useEffect(() => {
        initComponents();
    }, []);

    return (
        <>
            <div className="row align-items-start">
                <div className="col">
                  <Space><p className="h6">Code:</p> {code}</Space>
                </div>
            </div>
            <div className="row align-items-start">
                <div className="col">
                  <Space><p className="h6">Document Name:</p> {documentName}</Space>
                </div>
                <div className="col">
                  <Space><p className="h6">Document Number:</p> {documentNumber}</Space>
                </div>
            </div>

            <div className="row align-items-start">
                <div className="col">
                  <Space><p className="h6">Date Issued:</p> {issueDate}</Space>
                </div>
                <div className="col">
                  <Space><p className="h6">Expiry Date:</p> {expiryDate}</Space>
                </div>
            </div>

            <div className="row align-items-start">
                <div className="col">
                  <Space><p className="h6">Person in Charge:</p> {inCharge}</Space>
                </div>
                <div className="col">
                  <Space><p className="h6">Date Uploaded:</p> {dateCreated}</Space>
                </div>
            </div>
        </>
    );
}
