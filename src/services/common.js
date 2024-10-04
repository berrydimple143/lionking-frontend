import axios from "axios";
import Cookies from 'js-cookie';
const baseURL = `${process.env.NEXT_PUBLIC_API}/api/common`;
const token = Cookies.get('token');
const header = { headers: { 'Authorization': `Bearer ${token}`, }};

export const getMonthlyExpenses = async (year) =>
{
    try
    {
        const { data } = await axios.post(`${baseURL}/monthly-expenses`, { year }, header);
        return data;
    } catch (error)
    {
        return error.response;
    }
};

export const getMonthlyPayments = async (year) =>
{
    try
    {
        const { data } = await axios.post(`${baseURL}/monthly-payments`, { year }, header);
        return data;
    } catch (error)
    {
        return error.response;
    }
};
