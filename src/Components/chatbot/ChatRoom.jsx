import { useEffect, useRef } from 'react';
// import axios from "axios";
import { useNavigate } from 'react-router-dom';

const ChatRoom = ({ messages }) => {
  // const [messages, setMessages] = useState([]);
  // const { chatRoomId } = useParams();
  const navigate = useNavigate();

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleLeaveRoom = () => {
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('token');
  };

  return (
    <div className="flex flex-col h-full py-36 px-10 font-nunito relative z-10">
      <div className="flex items-center justify-between mt-5 border-b pb-2">
        <h2 className="text-base md:text-2xl ml-4 font-poetsen">
          Talk Freely With ELARA!
        </h2>
        <button onClick={handleLeaveRoom} className="text-sm text-red-500">
          Leave Room
        </button>
        <button onClick={logout}>LOGOUT COK</button>
      </div>
      <div className="flex-1 overflow-y-auto text-sm md:text-lg lg:text-xl flex flex-col gap-2">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`px-4 py-2 my-2 max-w-lg w-auto inline-block ${
                msg.isUserMessage
                  ? 'self-end bg-[#3FCB80] rounded-l-2xl rounded-tr-2xl'
                  : 'self-start bg-[#FFCF00] rounded-tl-2xl rounded-r-2xl'
              }`}
            >
              <p className="text-black break-words">{msg.message}</p>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            No chat history available
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
