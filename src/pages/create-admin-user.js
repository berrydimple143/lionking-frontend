import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { message, Form, Input, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { register } from '../services/auth';

export default function AdminUserRegister()
{
    const [loading, setLoading] = useState(false);
    const [inputStatus, setInputStatus] = useState("warning");
    const router = useRouter();

    const onFinish = async (values) =>
    {
        try
        {
            const { admin_status } = await register(values);
            console.log(admin_status);            
            if(admin_status == "success") {
                message.success("Admin registration successful.");
                router.push("/login");
            } else {
                message.success("Registration failed.");
            }
        } catch (error)
        {
            message.error("Something went wrong.");
        }
    }

    return (
        <div className="h-screen w-screen bg-cover bg-center login-bg">                   
              <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">                    
                  <div className="w-full bg-white text-white bg-opacity-25 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                      
                      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                          
                          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-white">
                              Register Here
                          </h1>
                          <Form className="space-y-4 md:space-y-6" layout="vertical" onFinish={onFinish}>                    
                              <div>
                                  <Form.Item label={<label className="auth-form-label block mb-2 text-sm font-medium dark:text-white">First Name</label>} name="first_name" rules={[{ required: true, message: 'Firstname is required.' }]}>
                                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="first_name" placeholder="Type your first name here..." />
                                  </Form.Item>
                              </div>
                              <div>
                                  <Form.Item label={<label className="auth-form-label block mb-2 text-sm font-medium dark:text-white">Last Name</label>} name="last_name" rules={[{ required: true, message: 'Lastname is required.' }]}>
                                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="last_name" placeholder="Type your last name here..." />
                                  </Form.Item>
                              </div>

                              <Form.Item label={<label className="auth-form-label block mb-2 text-sm font-medium dark:text-white">Email</label>} name="email" rules={[{ type: 'email', message: 'Invalid email address.' }]}>
                                <input type="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="email" placeholder="Type your email here..." />
                              </Form.Item>

                              <Form.Item label={<label className="auth-form-label block mb-2 text-sm font-medium dark:text-white">Username</label>} name="username" rules={[{ required: true, message: 'Username is required.' }, { min: 3, message: 'Username must be at least 3 characters long' }]}>
                                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="username" placeholder="Type username here..." />
                              </Form.Item>

                              <Form.Item label={<label className="auth-form-label block mb-2 text-sm font-medium dark:text-white">Password</label>} name="password" rules={[{ required: true, message: 'Password is required.' }, { min: 3, message: 'Password should be at least 3 characters long.' }, { max: 50, message: 'Password should be up to 50 characters long only.' }]}>
                                  <input type="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="password" placeholder="Type password here..." />
                              </Form.Item>

                              <Form.Item>
                                <button type="submit" className="w-full text-white bg-red-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create</button>
                              </Form.Item>

                          </Form>
                      </div>
                  </div>
              </div>  
          </div>
    );
}
