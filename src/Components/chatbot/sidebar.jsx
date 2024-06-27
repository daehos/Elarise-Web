import { useState, useEffect } from "react";
import axios from "axios";
import { FaBars, FaPlus } from "react-icons/fa";
import { CiChat1 } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { IoMdExit } from "react-icons/io";

import DeleteButton from "../DeleteButton";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://elarise-api-mqvmjbdy5a-et.a.run.app/api/get-all-chatroom-grammar",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Ensure the response data is an array
        if (Array.isArray(response.data.data)) {
          setChats(response.data.data);
        } else {
          console.error("Unexpected response format:", response.data.data);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const addChat = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://elarise-api-mqvmjbdy5a-et.a.run.app/api/chatroom-grammar",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        const newChat = {
          id: response.data.data.chatRoomId,
          name: response.data.data.chatRoomName,
          color: "#3FCB80",
        };
        setChats([newChat, ...chats]);
      } else {
        console.error("Failed to create new chat room:", response.data.message);
      }
    } catch (error) {
      console.error("Error creating new chat room:", error);
    }
  };

  const handleChatClick = (chatId) => {
    navigate(`/grammar/${chatId}`);
  };
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div
      className={`h-screen rounded-r-3xl ${
        isOpen ? "w-80" : "w-20"
      } bg-black  text-white font-nunito flex flex-col transition-width duration-300 relative z-50 `}
    >
      <div className="flex flex-col items-start justify-center p-4 mt-5 ">
        <button onClick={toggleSidebar} className="text-3xl mb-4">
          <FaBars />
        </button>

        {/* button untuk new chat start */}
        <button
          onClick={addChat}
          className={`${
            isOpen ? "w-60" : "w-14"
          } mt-4 flex text-lg items-center justify-center border-[3px] border-white h-15 bg-[#3FCB80] text-black px-3 py-1 rounded-xl`}
        >
          <FaPlus className={`${isOpen ? "mr-2" : "mr-0"}`} />
          {isOpen && (
            <span className="font-nunito font-bold drop-shadow">New Chat</span>
          )}
        </button>
      </div>
      {/* button untuk new chat end */}

      {/* chat history start */}
      {isOpen && (
        <div className="py-2 mx-auto text-lg font-normal ">Chat History</div>
      )}
      <div className="mx-2 flex-1 overflow-y-auto  scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        {Array.isArray(chats) ? (
          chats.map((chat, index) => (
            <>
            <div className={isOpen ? "flex flex-row justify-between items-center mr-5" : ""} key={chat.id}>
              <div
                key={chat.id}
                onClick={() => handleChatClick(chat.id)}
                className={isOpen ? "flex items-center bg-white font-semibold drop-shadow text-black py-2 px-8 my-2 border-[4px] rounded-2xl hover:bg-gray-200 cursor-pointer" : "flex items-center bg-white font-semibold drop-shadow text-black p-2 my-2 border-[4px] rounded-2xl hover:bg-gray-200 cursor-pointer"}
      
                style={{ borderColor: index % 2 === 0 ? '#EFB4D4' : '#F8C807' }}
              >
                <span className="mr-5 drop-shadow">
                  <CiChat1 className="text-3xl" />
                </span>
                {isOpen && chat.chatRoomName}
              </div>
              {isOpen && <DeleteButton chatRoomId={chat.id} setChats={setChats} chats={chats}/>}
            </div>
            </>
          ))
        ) : (
          <div className="text-center text-gray-500">No chats available</div>
        )}
      </div>
      {/* chat history end */}
      {/* button untuk logout start */}
      <div className="flex justify-center mb-10">

      <button
          onClick={logout}
          className={`${
            isOpen ? "w-52" : "w-14"
          } flex text-lg items-center justify-center border-2 border-white h-12 bg-red-600 text-black px-3 py-1 rounded-xl`}
          >
          <IoMdExit className={`${isOpen ? "mr-2" : "mr-0"} scale-150`} />
          {isOpen && (
            <span className="font-nunito font-bold drop-shadow">LOGOUT</span>
          )}
        </button>
    
          </div>
      {/* button untuk logut end */}
    </div>
  );
};

export default Sidebar;
