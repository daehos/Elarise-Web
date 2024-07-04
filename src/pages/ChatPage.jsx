import { useState, useEffect } from 'react';
import BaseVoiceScreen from '../Components/chatbot/BaseVoiceScreen';
import ChatRoomGrammar from '../Components/chatbot/grammar/ChatRoomGrammar';
import SidebarGrammar from '../Components/chatbot/grammar/sidebar_grammar';
import { Textarea } from '../Components/textarea';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import postGrammarChatroom from '../Service/chatService';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const { chatRoomId } = useParams(); // Use destructuring to get chatRoomId
  // const [refreshKey, setRefreshKey] = useState(0); // State to trigger re-renders
  const [state] = useState(true);
  const [message, setMessage] = useState('');

  // console.log(messages);

  function makeid(length) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  const handleMessage = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        ...messages,
        message,
        isUserMessage: true,
        isAIMessage: false,
        isPlaceholder: false,
        idMessage: makeid(5),
      },
    ]);

    setMessage(''); // Clear the message input


    postGrammarChatroom(token, chatRoomId, message)
      .then((response) => {
        console.log('Message sent:', response);
        setMessages((prev) => [...prev, response]);
      })
      .catch((error) => {
        console.error('There was an error sending the message!', error);
      });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `https://elarise-api-mqvmjbdy5a-et.a.run.app/api/chatroom/${chatRoomId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status === 'success') {
          setMessages(response.data.data);
        } else {
          console.error('Failed to fetch messages:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [chatRoomId]);

  return (
    <>
      <div className="flex h-screen overflow-hidden ">
        <SidebarGrammar />
        <div className="flex-1 overflow-hidden">
          {state === true ? <BaseVoiceScreen /> : <></>}
          {/* Room Chat */}
          {/* <ChatRoomGrammar key={refreshKey} /> */}
          <ChatRoomGrammar messages={messages} />
          {/* Room Chat End */}
          {/* greeting text */}
          {/* <div className="flex flex-col h-full text-4xl md:text-6xl lg:text-8xl  items-center font-nunito ">
            <h1 className=" font-semibold mt-52">
                Hello,<span className="text-[#C15891]">Mingyu</span>{" "}
            </h1>
            <p className="mt-5 ">How Can I Help You?</p>
            </div> */}
          {/* greeting text  end*/}
          {/* area input chat */}
          <div className=" relative bottom-28 flex flex-row w-full items-center justify-center z-10">
            <Textarea
              className=" w-[60%] text-lg ml-7 mb-4 h-14"
              type="input"
              id="chatbot"
              placeholder="Lets discuss!"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button
              className="relative bg-[#FFCF00] flex justify-center items-center rounded-full w-20 h-20 ml-5"
              onClick={handleMessage}
            >
              {' '}
              <img src="/R_1.png" alt="" className="scale-50 w-full h-full" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
