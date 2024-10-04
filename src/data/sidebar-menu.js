import React from 'react';
import {
    DashboardOutlined,
    AreaChartOutlined,
    LogoutOutlined,
    UsergroupAddOutlined,
    UserOutlined,
    BookOutlined,
    BarsOutlined,
    BankOutlined,
    UserSwitchOutlined,
    UserAddOutlined,
    EnvironmentOutlined,
    EuroOutlined,
    FundOutlined
} from '@ant-design/icons';

export const sidebarmenu = [
        {
          key: 1,
          icon: React.createElement(DashboardOutlined),
          label: 'Dashboard'
        },
        // {
        //   key: 2,
        //   icon: React.createElement(UserOutlined),
        //   label: 'Users'
        // },
        {
          key: 3,
          icon: React.createElement(UsergroupAddOutlined),
          label: 'Clients'
        },
        {
          key: 4,
          icon: React.createElement(UserSwitchOutlined),
          label: 'Agents'
        },
        {
          key: 5,
          icon: React.createElement(UserAddOutlined),
          label: 'Unit Managers'
        },
        {
            key: 7,
            icon: React.createElement(EnvironmentOutlined),
            label: 'Areas'
        },
        {
            key: 8,
            icon: React.createElement(FundOutlined),
            label: 'Expenses'
        },
        {
            key: 9,
            icon: React.createElement(EuroOutlined),
            label: 'Payments'
        },
        {
          key: 6,
          icon: React.createElement(LogoutOutlined),
          label: 'Logout'
        },
];
