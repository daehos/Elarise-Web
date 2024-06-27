// src/Service/authService.js

import axios from "axios";

const API_URL = "https://elarise-api-mqvmjbdy5a-et.a.run.app/api";

const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data.successResponse;
};

const isUser = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export default {
  login,
  isUser,
};
