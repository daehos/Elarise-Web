import { Button } from "../Components/Auth/Button";
import { Input } from "../Components/Auth/Input";
import { FcGoogle } from "react-icons/fc";

const SignupPage = () => {
  return (
    <>
      <main className="bg-[#F7CB46] flex h-screen items-center justify-center p-20 lg:px-36 ">
        <div className=" hidden   w-full md:block md:w-2/3  h-full   bg-[#F7CB46] rounded-l-xl  shadow-inner drop-shadow-xl  ">
          <img
            src="./risewith.png"
            alt=""
            className="md:w-52 lg:w-96 mt-24 mx-auto h-fit"
          />
          <img src="./takeoff.png" alt="" className="absolute -left-24 top-20 w-[75%]  h-fit " />
        </div>
        <div className="bg-white flex w-full md:w-1/3 h-full items-center rounded-xl  md:rounded-l-none justify-center flex-col drop-shadow-xl  ">
          <h1 className="my-4 font-medium text-xl font-nunito text-[#333333] drop-shadow-lg text-center">
            Enter Your Email Down Below to{" "}
            <span className="font-semibold text-xl">Create an Account</span>
          </h1>
          <form className="flex flex-col justify-center w-full px-6">
            <Input
              className="mt-2 mb-4 h-14"
              type="email"
              id="email"
              placeholder="name@example.com"
            ></Input>

            <Button
              type="submit"
              className="flex items-center h-11  border-black hover:bg-slate-200 gap-1 px-12 bg-[#F196E5] drop-shadow-xl shadow-lg"
              variant="outline"
            >
              <span className="font-bold text-lg shadow-inner">
                Sign in With Email
              </span>
            </Button>

            <h1 className="my-2 font-semibold md:text-sm lg:text-lg  text-[#333333] drop-shadow-lg text-center">
              OR CONTINUE WITH
            </h1>

            <Button
              className="flex items-center h-11  border-slate-400 hover:bg-slate-200 gap-1 px-12 bg-transparent drop-shadow-xl shadow-lg"
              variant="outline"
            >
              <FcGoogle size={40} />
              <span className="font-bold text-lg shadow-inner">Google</span>
            </Button>
          </form>
        </div>
      </main>
    </>
  );
};

export default SignupPage;
