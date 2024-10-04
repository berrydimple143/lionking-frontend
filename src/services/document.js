import axios from "axios";
import Cookies from 'js-cookie';
const baseURL = `${process.env.NEXT_PUBLIC_API}/api`;
const token = Cookies.get('token');
const header = { headers: { 'Authorization': `Bearer ${token}`, }};

export const getDocument = async (rid) =>
{
    try
    {
        const { data } = await axios.post(`${baseURL}/documents/edit`, { rid }, header);
        return data;
    } catch (error)
    {
        return error.response;
    }
};

export const getDocuments = async (token) =>
{
    try
    {
        const header = { headers: { 'Authorization': `Bearer ${token}`, }};
        const { data } = await axios.get(`${baseURL}/documents/list`, header);
        return data;
    } catch (error)
    {
        return error.response;
    }
};

export const addDocument = async (values) =>
{
    try
    {
        const { data } = await axios.post(`${baseURL}/documents/create`, values, header);
        return data;
    } catch (error)
    {
        return error.response;
    }
};

export const updateDocument = async (values) =>
{
    try
    {
        const { data } = await axios.post(`${baseURL}/documents/update`, values, header);
        return data;
    } catch (error)
    {
        return error.response;
    }
};

export const deleteDocument = async (id) =>
{
    try
    {
        const { data } = await axios.post(`${baseURL}/documents/destroy`, { id }, header);
        return data;
    } catch (error)
    {
        return error.response;
    }
};
