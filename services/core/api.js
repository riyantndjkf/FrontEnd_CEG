import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authLogin = async (nama, password) => {
  try {
    const response = await api.post("/auth/login", {
      nama,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Terjadi kesalahan pada server";
  }
};
