import axios from "axios";

const API = axios.create({

  baseURL:
    `${import.meta.env.VITE_API_URL}/api/auth`,

  withCredentials: true,
});

export const loginUser =
  (data) =>
    API.post("/login", data);

export const signupUser =
  (data) =>
    API.post("/register", data);