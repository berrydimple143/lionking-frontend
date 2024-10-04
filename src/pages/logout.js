import React, { useEffect } from "react";
import Cookies from 'js-cookie';
import { message } from 'antd';
import { useRouter } from 'next/router';

export default function Logout()
{
    const router = useRouter();
    useEffect(() => {
        Cookies.remove('user_id');
        Cookies.remove('loggedIn');
        Cookies.remove('token');
        Cookies.remove('username');
        Cookies.remove('role');
        message.success("Logout successful.");
        router.push("/login");
    }, []);
    return (
        <>
        </>
    );
}
