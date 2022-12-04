import axios from "axios";

export const server = axios.create({
    baseURL: process.env.API_URL || "http://localhost:8000/api",
});
