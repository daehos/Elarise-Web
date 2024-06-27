import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ChatRoomGrammar = ({ messages }) => {
  // const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const { chatRoomId } = useParams();

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleLeaveRoom = () => {
    navigate("/");
  };

  return (
    <>
      <div className="flex flex-col h-full py-36 px-10 font-nunito relative z-10">
        <div className="flex items-center justify-between mt-5 border-b pb-2">
          <h2 className="text-base md:text-2xl ml-4 font-poetsen">
            Elara Grammar Guru!
          </h2>
          <button
            onClick={handleLeaveRoom}
            className=" font-bold text-xl text-red-500"
          >
            Leave Room
          </button>
        </div>
        <div className="flex-1 overflow-y-auto text-sm h-full md:text-lg lg:text-xl flex flex-col gap-2">
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div
                key={msg.idMessage}
                className={`px-4 py-1 my-2 max-w-lg w-auto inline-block ${
                  msg.isUserMessage
                    ? "self-end bg-[#3FCB80] rounded-l-2xl rounded-tr-2xl"
                    : "self-start bg-[#FFCF00] rounded-tl-2xl rounded-r-2xl"
                }`}
              >
                <p className="text-black break-words">{msg.message}</p>
              </div>
            ))
          ) : (
            <div className="text-center font-nunito text-gray-500">
              No chat history available
              <h1 className=" font-semibold text-black mt-52 text-4xl md:text-6xl lg:text-8xl">
                Hello,<span className="text-[#C15891]">Mingyu</span>{" "}
              </h1>
              <p className="mt-5  text-black">How Can I Help You?</p>
            </div>
            //   <div className="flex flex-col h-full text-4xl md:text-6xl lg:text-8xl  items-center font-nunito ">
            //   <h1 className=" font-semibold mt-52">
            //     Hello,<span className="text-[#C15891]">Mingyu</span>{" "}
            //   </h1>
            //   <p className="mt-5 ">How Can I Help You?</p>
            // </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </>
  );
};

export default ChatRoomGrammar;
