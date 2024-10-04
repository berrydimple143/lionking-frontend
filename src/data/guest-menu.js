import React from 'react';
import {
    AreaChartOutlined,
    LogoutOutlined,
    UsergroupAddOutlined,
    UserOutlined,
    BookOutlined,
    BarsOutlined
} from '@ant-design/icons';

const handleLogout = () => {
    window.location.href = "/logout";
}

const homeRoute = () => {
    window.location.href = "/admin";
}

const documentRoute = () => {
    window.location.href = "/admin/documents";
}

export const guestmenu = [
        {
          key: 1,
          icon: React.createElement(AreaChartOutlined),
          label: 'Dashboard',
          onClick: homeRoute
        },
        {
          key: 4,
          icon: React.createElement(BookOutlined),
          label: 'Document',
          onClick: documentRoute
        },
        {
          key: 6,
          icon: React.createElement(LogoutOutlined),
          label: 'Logout',
          onClick: handleLogout
        },
];
