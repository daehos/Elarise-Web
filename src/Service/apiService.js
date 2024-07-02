import axios from "axios";

const API_URL = "backend-hq3lexjwcq-et.a.run.app";

const signUp = async (userData) => {
  const response = await axios.post(`${API_URL}/api/users`, userData);
  return response.data;
};

const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/api/auth`, credentials);
  return response.data;
};

const createChatroom = async (token, chatroomData) => {
  const response = await axios.post(
    `${API_URL}/api/chatroom-grammar`,
    chatroomData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
const getAllChatrooms = async (token) => {
  const response = await axios.get(`${API_URL}/api/get-all-chatroom-grammar`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default {
  signUp,
  login,
  createChatroom,
  getAllChatrooms,
};
