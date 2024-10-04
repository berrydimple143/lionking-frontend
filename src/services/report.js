import axios from "axios";
import Cookies from 'js-cookie';
const baseURL = `${process.env.NEXT_PUBLIC_API}/api/reports`;
const token = Cookies.get('token');
const header = { headers: { 'Authorization': `Bearer ${token}`, }};

export const getExpense = async (rid) =>
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

export const getReports = async (dt) =>
{
    try
    {
        const { data } = await axios.post(`${baseURL}/reports`, { dt }, header);
        return data;
    } catch (error)
    {
        return error.response;
    }
};

export const getExpenses = async (token) =>
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

export const getExpensesByDate = async (dt) =>
{
    try
    {
        const { data } = await axios.post(`${baseURL}/byDate`, { dt }, header);
        return data;
    } catch (error)
    {
        return error.response;
    }
};

export const addExpense = async (values) =>
{
    try
    {
        const { data } = await axios.post(`${baseURL}/create`, values, header);
        console.log(data);
        return data;
    } catch (error)
    {
        return error.response;
    }
};

export const updateExpense = async (values) =>
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

export const deleteExpense = async (id) =>
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
