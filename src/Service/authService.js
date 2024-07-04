import axios from "axios";
// authService.js
const login = async (credentials) => {
  const response = await axios.post('https://backend-hq3lexjwcq-et.a.run.app/api/login', credentials);
  console.log('API Response:', response.data);
  return response.data;
};

const googleLogin = async (token) => {
  try {
    const response = await fetch(
      "https://backend-hq3lexjwcq-et.a.run.app/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }
    );

    if (!response.ok) {
      throw new Error("Google login failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error during Google login:", error);
    throw error;
  }
};

const isUser = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export default { login, googleLogin, isUser };
