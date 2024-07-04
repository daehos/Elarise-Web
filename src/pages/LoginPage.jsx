import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../Components/Auth/Button";
import { Input } from "../Components/Auth/Input";
import { FcGoogle } from "react-icons/fc";
import authService from "../Service/authService";
import { auth, provider } from "../firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const LoginPage = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (authService.isUser()) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(credentials);
      console.log('Login Response:', response); // Debugging
  
      // Pastikan response memiliki token
      if (response.successResponse && response.successResponse.token) {
        const token = response.successResponse.token.replace("Bearer ", "");
        localStorage.setItem("token", token);
        setMessage("Login successful!");
        if (onLogin) onLogin();
        navigate("/#Feature");
      } else {
        setMessage("Login failed: No token in response.");
      }
    } catch (error) {
      console.error('Login Error:', error); // Debugging
      setMessage("Login failed.");
    }
  };
  
  const handleLoginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Get the Firebase ID token
      const idToken = await user.getIdToken();

      // Save the ID token to localStorage
      localStorage.setItem("token", idToken);
      setMessage("Google login successful!");
      if (onLogin) onLogin();
      navigate("/#Feature");
      console.log("User Info:", user);
    } catch (error) {
      console.error("Error during login", error);
      setMessage("Google login failed.");
    }
  };

  // const handleGoogleLogin = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     const token = result.user.accessToken;
  //     localStorage.setItem("token", token);
  //     setMessage("Google login successful!");
  //     if (onLogin) onLogin();
  //     navigate("/#Feature");
  //   } catch (error) {
  //     setMessage(`Google login failed: ${error.message}`);
  //   }
  // };

  return (
    <main className="bg-[#F196E5] flex h-screen items-center justify-center p-20 lg:px-36">
      <div className="hidden w-full md:block md:w-2/3 h-full bg-[#F196E5] rounded-l-xl shadow-inner drop-shadow-xl">
        <div className="flex items-center mt-24">
          <img src="./sun_login.png" alt="Sun" className="w-60 h-fit" />
          <img
            src="./login_pink.png"
            alt="Login Pink"
            className="md:w-52 lg:w-96 mx-auto h-fit"
          />
        </div>
      </div>
      <div className="bg-white flex w-full md:w-1/3 h-full items-center rounded-xl md:rounded-l-none justify-center flex-col drop-shadow-xl">
        <h1 className="my-4 font-medium text-xl font-nunito text-[#333333] drop-shadow-lg text-center">
          Enter Your Email Down Below to{" "}
          <span className="font-semibold text-xl">Login</span>
        </h1>
        <form
          className="flex flex-col justify-center w-full px-6"
          onSubmit={handleLogin}
        >
          <Input
            className="mt-2 mb-4 h-14 rounded-xl"
            type="email"
            id="email"
            placeholder="name@example.com"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
          <Input
            className="mt-2 mb-4 h-14 rounded-xl"
            type="password"
            id="password"
            placeholder="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
          <Button
            type="submit"
            className="flex items-center rounded-xl h-11 border-black hover:bg-slate-200 gap-1 px-12 bg-[#F7CB46] drop-shadow-xl shadow-lg"
            variant="outline"
          >
            <span className="font-bold text-lg shadow-inner">Sign in</span>
          </Button>
          <h1 className="my-2 font-semibold rounded-xl md:text-sm lg:text-lg text-[#333333] drop-shadow-lg text-center">
            OR CONTINUE WITH
          </h1>
          <Button
            className="flex items-center rounded-xl h-11 border-slate-400 hover:bg-slate-200 gap-1 px-12 bg-transparent drop-shadow-xl shadow-lg"
            variant="outline"
            onClick={handleLoginGoogle}
          >
            <FcGoogle size={40} />
            <span className="font-bold text-lg shadow-inner">Google</span>
          </Button>
          <Link to="/signup">
            <h1 className="text-center">
              Doesn't have an account?{" "}
              <span
                className="underline cursor-pointer font-bold text-xl hover:text-blue-500"
                
              >
                {" "}
                Sign up
              </span>
            </h1>
          </Link>
        </form>
        {message && <p className="text-center mt-4 text-red-500">{message}</p>}
      </div>
    </main>
  );
};

export default LoginPage;
