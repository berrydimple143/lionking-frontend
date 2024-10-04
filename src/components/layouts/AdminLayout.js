import { Layout, Menu, theme, Dropdown, Space, Button } from 'antd';
import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import Head from 'next/head';
import { sidebarmenu } from '../../data/sidebar-menu';
import { staffmenu } from '../../data/staff-menu';
import { guestmenu } from '../../data/guest-menu';
const { Header, Content, Footer, Sider } = Layout;
import { DownOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import ModalLoading from '../modals/ModalLoading';

const AdminLayout = ({ children, title, chosenMenu }) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(null);  
  const [collapsed, setCollapsed] = useState(false);
  const [role, setRole] = useState('');
  const [sidebarMenu, setSidebarMenu] = useState(sidebarmenu);
  const router = useRouter();

  useEffect(() => {
      const urole = Cookies.get('role');
      setUsername(Cookies.get('username'));
      setRole(urole);
      
      setLoading(true);
      setTimeout(() => {
          setLoading(false);
      }, 1000);

      if(urole == "staff") {
          setSidebarMenu(staffmenu);
      } else if(urole == "guest") {
          setSidebarMenu(guestmenu);
      } else {
          setSidebarMenu(sidebarmenu);
      }
  }, []);

  return (
    <>
      {(loading) && (
          <ModalLoading
              message="Loading, please wait ..."
              pcolor="bg-green-300"
          />
      )}
      <Head>
            <title>{ title }</title>
      </Head>
      
      <Layout className="w-100 h-screen">
        <Sider
          theme='dark'          
          breakpoint="lg"
          collapsedWidth="0"
          className='h-[130%]'
          onBreakpoint={(broken) => {
            // console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            // console.log(collapsed, type);
          }}
        >
          <div className="flex items-center justify-center text-white px-2 text-lg pb-3 mt-2">
            <img className="w-full h-20" src="/images/logo.png" alt="logo" />
          </div>
          <Menu            
            mode="inline"            
            theme='dark'
            defaultSelectedKeys={[chosenMenu]}
            onClick={({key}) => {
              if(key == 1) { router.push("/admin"); }
              if(key == 2) { router.push("/admin/users"); }
              if(key == 3) { router.push("/admin/clients"); }
              if(key == 4) { router.push("/admin/agents"); }
              if(key == 5) { router.push("/admin/managers"); }              
              if(key == 6) { router.push("/logout"); }
              if(key == 7) { router.push("/admin/areas"); }
              if(key == 8) { router.push("/admin/expenses"); }
              if(key == 9) { router.push("/admin/payments"); }
            }}
            items={sidebarMenu}
          />
        </Sider>        
        <Layout>
        <Header
          className='flex w-full items-center justify-end p-0 border-b border-gray-300 bg-gray-200'  
          style={{
            padding: 0,
            background: 'none'
          }}
        >
          <h1 className='mr-5'>Welcome, { username }</h1>
        </Header>
          <Content
            style={{
              margin: '10px 10px 0',
            }}
          >
            { !loading && (
              <div
                style={{
                  padding: 10,
                  minHeight: 500,
                }}
              >              
                  { children }              
              </div>
            )}
          </Content>
          {/* <Footer
            style={{
              textAlign: 'center',
              padding: '5px'
            }}
          >
            &copy; 2024 Lion King Realty. All rights reserved.
          </Footer>           */}
        </Layout>
      </Layout>
      
    </>
  );
};
export default AdminLayout;
