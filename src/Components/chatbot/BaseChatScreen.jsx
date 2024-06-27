import { Textarea } from "../textarea";
const BaseChatScreen = () => {
  return (
    <div className="flex">

      <div className="flex-1  relative">
        {/* Background elements */}
        {/* Matahari */}
        <img src="./sun_bg.png" alt="" className=" absolute top-0 left-0  " />
        <img
          src="./logo.png"
          alt=""
          className=" absolute top-7 right-0  "
        />

        {/* Roket */}
        <img
          src="./roket_bg.png"
          alt=""
          className="absolute -bottom-10 -right-10 scale-75 "
        />

        <div className="flex flex-col h-full text-4xl md:text-6xl lg:text-8xl  items-center font-nunito ">
          <h1 className=" font-semibold mt-52">
            Hello,<span className="text-[#C15891]">Mingyu</span>{" "}
          </h1>
          <p className="mt-5 ">How Can I Help You?</p>
        </div>

        {/* area input chat  */}
        <div className=" absolute bottom-4 flex flex-row w-full items-center justify-center">
            <Textarea
              className=" w-[60%]  ml-7 mb-4 h-14"
              type="email"
              id="chatbot"
              placeholder="Lets discuss!"
            />
          
          <button className="bg-[#FFCF00] flex justify-center items-center rounded-full w-12 h-fit ml-5">
            {" "}
            <img src="./R_1.png" alt="" className="scale-50" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default BaseChatScreen;
