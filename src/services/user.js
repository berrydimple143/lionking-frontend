import axios from "axios";
import Cookies from 'js-cookie';
const baseURL = `${process.env.NEXT_PUBLIC_API}/api`;
const token = Cookies.get('token');
const header = { headers: { 'Authorization': `Bearer ${token}`, }};

export const getUser = async (rid) =>
{
    try
    {
        const { data } = await axios.post(`${baseURL}/users/edit`, { rid }, header);
        return data;
    } catch (error)
    {
        return error.response;
    }
};

export const getUsers = async (token) =>
{
    try
    {
        const header = { headers: { 'Authorization': `Bearer ${token}`, }};
        const { data } = await axios.get(`${baseURL}/users/list`, header);
        return data;
    } catch (error)
    {
        return error.response;
    }
};

export const addUser = async (values) =>
{
    try
    {
        const { data } = await axios.post(`${baseURL}/users/create`, values, header);
        return data;
    } catch (error)
    {
        return error.response;
    }
};

export const updateUser = async (values) =>
{
    try
    {
        const { data } = await axios.post(`${baseURL}/users/update`, values, header);
        return data;
    } catch (error)
    {
        return error.response;
    }
};

export const deleteUser = async (id) =>
{
    try
    {
        const { data } = await axios.post(`${baseURL}/users/destroy`, { id }, header);
        return data;
    } catch (error)
    {
        return error.response;
    }
};
