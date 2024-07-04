import { Button } from "../Components/Auth/Button";
import { Input } from "../Components/Auth/Input";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SignupPage = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    rePassword: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.rePassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("https://backend-hq3lexjwcq-et.a.run.app/api/signup", {
        email: credentials.email,
        password: credentials.password,
      });
      setMessage("Signup Successful");
      navigate("/login");
    } catch (error) {
      setMessage("Signup failed: " + (error.response?.data?.message || error.message));
    }
  };

  const handleLoginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save the token to localStorage (optional)
      const idToken = await user.getIdToken();
      localStorage.setItem("token", idToken);

      setMessage("Google signup successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error during Google signup", error);
      setMessage("Google signup failed: " + error.message);
    }
  };


  return (
    <main className="bg-[#F7CB46] flex h-screen items-center justify-center p-20 lg:px-36">
      <div className="hidden w-full md:block md:w-2/3 h-full bg-[#F7CB46] rounded-l-xl shadow-inner drop-shadow-xl">
        <img src="./risewith.png" alt="" className="md:w-52 lg:w-96 mt-24 mx-auto h-fit" />
        <img src="./takeoff.png" alt="" className="absolute -left-24 top-20 w-[75%] h-fit" />
      </div>
      <div className="bg-white flex w-full md:w-1/3 h-full items-center rounded-xl md:rounded-l-none justify-center flex-col drop-shadow-xl">
        <h1 className="my-4 font-medium text-xl font-nunito text-[#333333] drop-shadow-lg text-center">
          Enter Your Email Down Below to{" "}
          <span className="font-semibold text-xl">Create an Account</span>
        </h1>
        <form className="flex flex-col justify-center w-full px-6" onSubmit={handleSubmit}>
          <Input
            className="mt-2 mb-2 h-14"
            type="email"
            id="email"
            placeholder="name@example.com"
            value={credentials.email}
            onChange={handleChange}
          />
          <h1 className="text-center font-semibold">Create password</h1>
          <Input
            className="mt-2 mb-4 h-14"
            type="password"
            id="password"
            placeholder="Create your password"
            value={credentials.password}
            onChange={handleChange}
          />
          <Input
            className="mt-2 mb-4 h-14"
            type="password"
            id="rePassword"
            placeholder="Re-enter your password"
            value={credentials.rePassword}
            onChange={handleChange}
          />
          <Button
            type="submit"
            className="flex items-center h-11 border-black hover:bg-slate-200 gap-1 px-12 bg-[#F196E5] drop-shadow-xl shadow-lg"
            variant="outline"
          >
            <span className="font-bold text-lg shadow-inner">
              Sign up With Email
            </span>
          </Button>
          <h1 className="my-2 font-semibold md:text-sm lg:text-lg text-[#333333] drop-shadow-lg text-center">
            OR CONTINUE WITH
          </h1>
          <Button
            className="flex items-center h-11 border-slate-400 hover:bg-slate-200 gap-1 px-12 bg-transparent drop-shadow-xl shadow-lg"
            variant="outline"
            onClick={handleLoginGoogle}
          >
            <FcGoogle size={40} />
            <span className="font-bold text-lg shadow-inner">Google</span>
          </Button>
        </form>
        {message && <p className="text-center mt-4 text-red-500">{message}</p>}
      </div>
    </main>
  );
};

export default SignupPage;
