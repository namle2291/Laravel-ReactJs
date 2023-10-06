import axios from "axios";

const httpRequest = axios.create({
    baseURL: "http://localhost:8000/api",
});

httpRequest.interceptors.request.use((config) => {
    const token = localStorage.getItem("_token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export { httpRequest };
