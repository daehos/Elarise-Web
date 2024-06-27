import React from "react";
import axios from "axios";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const DeleteButton = ({ chatRoomId, setChats, chats }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const updatedChats = chats.filter((chat) => chat.id !== chatRoomId);
      setChats(updatedChats);
      const response = await axios.delete(
        `https://elarise-api-mqvmjbdy5a-et.a.run.app/api/chatroom/${chatRoomId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="mt-3">
        <button onClick={handleDelete} className="text-red-500 text-2xl">
          <RiDeleteBin5Line />
        </button>
      </div>
    </>
  );
};

export default DeleteButton;
