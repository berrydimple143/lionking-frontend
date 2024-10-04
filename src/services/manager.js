import axios from "axios";
import Cookies from 'js-cookie';
const baseURL = `${process.env.NEXT_PUBLIC_API}/api/managers`;
const token = Cookies.get('token');
const header = { headers: { 'Authorization': `Bearer ${token}`, }};

export const getManager = async (rid) =>
{
    try
    {
        const { data } = await axios.post(`${baseURL}/edit`, { rid }, header);
        return data;
    } catch (error)
    {
        return error.response;
    }
};

export const getManagerAgents = async (id) =>
{
    try
    {
        const { data } = await axios.post(`${baseURL}/agents`, { id }, header);
        return data;
    } catch (error)
    {
        return error.response;
    }
};

export const getManagerInfo = async (id) =>
{
    try
    {
        const { data } = await axios.post(`${baseURL}/info`, { id }, header);
        return data;
    } catch (error)
    {
        return error.response;
    }
};

export const getManagers = async (token) =>
{
    try
    {
        const header = { headers: { 'Authorization': `Bearer ${token}`, }};
        const { data } = await axios.get(`${baseURL}/list`, header);
        return data;
    } catch (error)
    {
        return error.response;
    }
};

export const addAgent = async (values) =>
{
    try
    {
        const { data } = await axios.post(`${baseURL}/add/agent`, values, header);
        return data;
    } catch (error)
    {
        return error.response;
    }
};

export const addManager = async (values) =>
{
    try
    {
        const { data } = await axios.post(`${baseURL}/create`, values, header);
        return data;
    } catch (error)
    {
        return error.response;
    }
};

export const updateManager = async (values) =>
{
    try
    {
        const { data } = await axios.post(`${baseURL}/update`, values, header);
        return data;
    } catch (error)
    {
        return error.response;
    }
};

export const deleteManager = async (id) =>
{
    try
    {
        const { data } = await axios.post(`${baseURL}/destroy`, { id }, header);
        return data;
    } catch (error)
    {
        return error.response;
    }
};

export const deleteAgent = async (id) =>
{
    try
    {
        const { data } = await axios.post(`${baseURL}/agent/destroy`, { id }, header);
        return data;
    } catch (error)
    {
        return error.response;
    }
};


