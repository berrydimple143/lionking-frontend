import axios from "axios";
import Cookies from 'js-cookie';
const baseURL = `${process.env.NEXT_PUBLIC_API}/api`;
const token = Cookies.get('token');
const header = { headers: { 'Authorization': `Bearer ${token}`, }};

export const getCrew = async (rid) =>
{
    try
    {
        const { data } = await axios.post(`${baseURL}/crews/edit`, { rid }, header);
        return data;
    } catch (error)
    {
        return error.response;
    }
};

export const getCrewsByRank = async (rid) =>
{
    try
    {
        const { data } = await axios.post(`${baseURL}/crews/byRank`, { rid }, header);
        return data;
    } catch (error)
    {
        return error.response;
    }
};

export const getCrews = async (token) =>
{
    try
    {
        const header = { headers: { 'Authorization': `Bearer ${token}`, }};
        const { data } = await axios.get(`${baseURL}/crews/list`, header);
        return data;
    } catch (error)
    {
        return error.response;
    }
};

export const addCrew = async (values) =>
{
    try
    {
        const { data } = await axios.post(`${baseURL}/crews/create`, values, header);
        return data;
    } catch (error)
    {
        return error.response;
    }
};

export const updateCrew = async (values) =>
{
    try
    {
        const { data } = await axios.post(`${baseURL}/crews/update`, values, header);
        return data;
    } catch (error)
    {
        return error.response;
    }
};

export const deleteCrew = async (id) =>
{
    try
    {
        const { data } = await axios.post(`${baseURL}/crews/destroy`, { id }, header);
        return data;
    } catch (error)
    {
        return error.response;
    }
};
