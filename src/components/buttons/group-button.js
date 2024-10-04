import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Tooltip, Space } from 'antd';
import { PlusCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const GroupButton = ({
    text,
    handleEdit,
    handleDelete,
    handlePayment,
    handleAgent,
    page
}) =>
{
    return (
        <div key={`${text}`}>
          <Space>
          { (page === "client" || page === "agent") && (
            <Tooltip title="Add Payment" placement="top">
              <button onClick={() => {
                handlePayment(text);
              }}
              type="button"
              className="success-btn"><Space><PlusCircleOutlined />Add Payment</Space></button>
            </Tooltip>
          )}
          { page === "manager" && (
            <Tooltip title="Add Agent" placement="top">
              <button onClick={() => {
                handleAgent(text);
              }}
              type="button"
              className="success-btn"><Space><PlusCircleOutlined />Add Agent</Space></button>
            </Tooltip>
          )}
          <Tooltip title="Edit" placement="top">
            <button onClick={() => {
              handleEdit(text);
            }}
            type="button"
            className="edit-btn"><Space><EditOutlined />Edit</Space></button>
          </Tooltip>
          <Tooltip title="Delete" placement="top">
            <button
              onClick={() => {
                handleDelete(text);
              }}
              type="button"
              className="delete-btn"><Space><DeleteOutlined />Delete</Space></button>
          </Tooltip>          
          </Space>
        </div>
    );
}

export default GroupButton;
