import axios from "axios";
import { getItem } from "./storage";

// console.log(process.env.NEXT_PUBLIC_API_BASE, "tesst env read var");
// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://backend-prod.sdcampus.com/api/v1", // Set your API base URL from environment variables
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    let token;

    if (typeof window !== "undefined") {
      token = getItem("authToken");
    }
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50SWQiOiI2MDgxMDhjMC0xZjcxLTExZjAtYTc4Ni04OTY0NzI2ZjdhNTIiLCJpYXQiOjE3NTEwOTkwNTQsImV4cCI6MTc4MjYzNTA1NH0.7gJChn9_737lC6HkYHFDsjjBH2VK7BgyPdvq6U0M290"
    if (token) {
      // console.log("Token found in localStorage:", token);
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// console.log("Axios instance created with base URL:", axiosInstance.defaults.baseURL);
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (e.g., redirect to login page)
      console.error("Unauthorized access. Redirecting to login...");

    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
