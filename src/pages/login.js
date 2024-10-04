import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { message, Form, Input, Space } from 'antd';
import { UnlockOutlined } from '@ant-design/icons';
import { login } from '../services/auth';
import ModalLoading from "@/components/modals/ModalLoading";

export default function Login()
{
    const [loading, setLoading] = useState(false);
    const [inputStatus, setInputStatus] = useState("warning");
    const router = useRouter();

    const onFinish = async (values) =>
    {
        try
        {
            const { login_status, token, user, role } = await login(values);

            if(login_status == "success") {
                Cookies.set('loggedIn', true);
                Cookies.set('token', token);
                Cookies.set('role', role);
                Cookies.set('user_id', user.id);
                Cookies.set('username', user.username);
                message.success("Login successful.");
                router.push("/admin");
            } else {
                setInputStatus("error");
                message.error("Invalid username/password.");
            }
        } catch (error)
        {
            message.error("Something went wrong.");
        }
    }
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        if(Cookies.get('loggedIn')) {
            router.push("/admin");
        }        
    }, []);
    return (
        <div className="h-screen w-screen bg-cover bg-center login-bg">
            {(loading) && (
                <ModalLoading
                    message="Loading, please wait ..."
                    pcolor="bg-green-300"
                />
            )}
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">                    
                <div className="w-full bg-white text-white bg-opacity-25 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <a href="#" className="flex items-center mb-6 text-center text-2xl font-semibold text-white dark:text-white">
                            <img className="w-full h-1/4" src="/images/logo.png" alt="logo" />
                        </a>
                        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <Form className="space-y-4 md:space-y-6" layout="vertical" onFinish={onFinish}>                    
                            <div>                           
                                <Form.Item label={<label className="auth-form-label block mb-2 text-sm font-medium dark:text-white">Username</label>} name="username" rules={[{ required: true, message: 'Username is required.' }, { min: 3, message: 'Username must be at least 3 characters long' }]}>
                                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="username" placeholder="Type username here..." />
                                </Form.Item>
                            </div>
                            <div>
                                <Form.Item label={<label className="auth-form-label block mb-2 text-sm font-medium dark:text-white">Password</label>} name="password" rules={[{ required: true, message: 'Password is required.' }, { max: 50, message: 'Password should be up to 50 characters long only.' }]}>
                                    <input type="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="password" placeholder="Type password here..." />
                                </Form.Item>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    &nbsp;
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>                                  
                            <Form.Item>
                                <button type="submit" className="w-full text-white bg-red-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>

        </div>
    );
}
