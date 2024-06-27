import BaseVoiceScreen from "../Components/chatbot/BaseVoiceScreen";
import ChatRoom from "../Components/chatbot/ChatRoom";
import Sidebar from "../Components/chatbot/sidebar";
import { IoMdMic } from "react-icons/io";
const TalkPage = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 relative overflow-hidden">
      <BaseVoiceScreen />
        {/* Room Chat  */}
        <ChatRoom />
        {/* Room Chat End */}

        {/* greeting text  */}

        {/* <div className="flex flex-col h-full text-4xl md:text-6xl lg:text-8xl  items-center font-nunito ">
          <h1 className=" font-semibold mt-52">
            Hello,<span className="text-[#C15891]">Mingyu</span>{" "}
          </h1>
          <p className="mt-5 ">How Can I Help You?</p>
        </div> */}

        {/* greeting text  end*/}

        {/* area input chat  */}
        <div className=" absolute bottom-4 flex flex-col w-full items-center justify-center">
          <h1 className="ml-5 font-nunito text-4xl mb-3 font-semibold">
            Tell Elara
          </h1>

          <button className="bg-[#EFB4D4] flex justify-center items-center rounded-full w-20 h-20 ml-5 z-10 active:ring-4 active:ring-[#3FCB80] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            {" "}
            <IoMdMic className="h-3/4 w-1/2" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default TalkPage;
