import axios from "axios";
import Cookies from 'js-cookie';
const baseURL = `${process.env.NEXT_PUBLIC_API}/api/agents`;
const token = Cookies.get('token');
const header = { headers: { 'Authorization': `Bearer ${token}`, }};

export const updatePayment = async () =>
{
    try
    {
        const { data } = await axios.post(`${baseURL}/updatePayment`, { status: '' }, header);
        return data;
    } catch (error)
    {
        return error.response;
    }
};

export const printSOA = async (id) =>
{
    try
    {        
        return await axios.post(`${baseURL}/printSOA`, { id }, header).then((response) => {
                console.log(response.data);
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'file.pdf'); //or any other extension
                document.body.appendChild(link);
                link.click(); 
             }
        );
    } catch (error)
    {
        return error.response;
    }
};

export const getAgent = async (rid) =>
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

export const getAgentPayments = async (id) =>
{
    try
    {
        const { data } = await axios.post(`${baseURL}/payments`, { id }, header);
        return data;
    } catch (error)
    {
        return error.response;
    }
};

export const getAgentInfo = async (id) =>
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

export const getAgents = async (token) =>
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

export const addPayment = async (values) =>
{
    try
    {
        const { data } = await axios.post(`${baseURL}/payment`, values, header);
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
        const { data } = await axios.post(`${baseURL}/create`, values, header);
        return data;
    } catch (error)
    {
        return error.response;
    }
};

export const updateAgent = async (values) =>
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

export const deleteAgent = async (id) =>
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

export const deleteAgentPayment = async (id) =>
{
    try
    {
        const { data } = await axios.post(`${baseURL}/payment/destroy`, { id }, header);
        return data;
    } catch (error)
    {
        return error.response;
    }
};
