import axios from "axios";
const baseURL = `${process.env.NEXT_PUBLIC_API}/api`;

export const login = async (user) =>
{
    try
    {
        const { data } = await axios.post(`${baseURL}/login`, user);
        return data;
    } catch (error)
    {
        return error.response;
    }
};

export const register = async (user) =>
{
    try
    {
        const { data } = await axios.post(`${baseURL}/register`, user);
        return data;
    } catch (error)
    {
        return error.response;
    }
};
