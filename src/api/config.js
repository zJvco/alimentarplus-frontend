import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
})

export default api;