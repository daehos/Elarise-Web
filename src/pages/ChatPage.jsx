import { useState, useEffect, useCallback, useRef } from 'react';
import BaseVoiceScreen from '../Components/chatbot/BaseVoiceScreen';
import ChatRoomGrammar from '../Components/chatbot/grammar/ChatRoomGrammar';
import SidebarGrammar from '../Components/chatbot/grammar/sidebar_grammar';
import { Textarea } from '../Components/textarea';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import postGrammarChatroom from '../Service/chatService';
import { IoMdMic, IoMdMicOff } from 'react-icons/io';
import useSpeechToText from '../hooks/useSpeechToText';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const { chatRoomId } = useParams(); // Use destructuring to get chatRoomId
  // const [refreshKey, setRefreshKey] = useState(0); // State to trigger re-renders
  const [state] = useState(true);
  const [message, setMessage] = useState('');

  const { isListening, transcript, startListening, stopListening } =
    useSpeechToText();

  const transcriptRef = useRef(transcript);
  const speechTimeoutRef = useRef(null);

  // function makeid(length) {
  //   let result = '';
  //   const characters =
  //     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   const charactersLength = characters.length;
  //   let counter = 0;
  //   while (counter < length) {
  //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //     counter += 1;
  //   }
  //   return result;
  // }

  const handleMessage = useCallback(async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    // Add user message to the state
    const userMessage = {
      message,
      isUserMessage: true,
      isAIMessage: false,
      isPlaceholder: false,
      idMessage: null, // Placeholder for now, will be updated with response ID
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage(''); // Clear the message input

    try {
      const response = await postGrammarChatroom(token, chatRoomId, message);
      console.log('Message sent:', response);

      // Update user message with idMessage from response
      setMessages((prev) =>
        prev.map((msg) =>
          msg === userMessage ? { ...msg, idMessage: response.idMessage } : msg
        )
      );

      // Add placeholder for AI response
      const placeholderResponse = {
        message: '',
        isUserMessage: false,
        isAIMessage: true,
        isPlaceholder: true,
      };

      setMessages((prev) => [...prev, placeholderResponse]);

      // Update the state with the actual AI response
      setMessages((prev) =>
        prev.map((msg, index) =>
          msg.isPlaceholder && index === prev.length - 1
            ? { ...response, isPlaceholder: false }
            : msg
        )
      );
    } catch (error) {
      console.error('There was an error sending the message!', error);
      // Remove user message on error
      setMessages((prev) => prev.filter((msg) => msg !== userMessage));
    }

  }, [chatRoomId, message]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `https://backend-hq3lexjwcq-et.a.run.app/api/chatroom/${chatRoomId}`,
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

  useEffect(() => {
    if (transcript !== '') {
      setMessage(transcript);
    }
    transcriptRef.current = transcript; // Update the ref with the current transcript
  }, [transcript]);

  useEffect(() => {
    const handleSpeechTimeout = () => {
      console.log('User stopped speaking.');
      stopListening();
      handleMessage();
    };

    if (transcript !== '') {
      clearTimeout(speechTimeoutRef.current);
      speechTimeoutRef.current = setTimeout(handleSpeechTimeout, 3000);
    }

    return () => clearTimeout(speechTimeoutRef.current);
  }, [transcript, stopListening, handleMessage]);

  useEffect(() => {
    const silenceTimeout = setTimeout(() => {
      if (transcriptRef.current === '') {
        console.log('User has been silent for 5 seconds.');
        stopListening();
      }
    }, 3000); // 5 seconds

    return () => clearTimeout(silenceTimeout);
  }, [transcript, stopListening]);

  useEffect(() => {
    return () => {
      clearTimeout(speechTimeoutRef.current);
    };
  }, []);

  console.log('Current transcript:', transcript);

  return (
    <>
      <div className="flex h-screen overflow-hidden ">
        <SidebarGrammar />
        <div className="flex-1 overflow-hidden">
          {state === true ? <BaseVoiceScreen /> : <></>}
          {/* Room Chat */}
          {/* <ChatRoomGrammar key={refreshKey} /> */}
          <ChatRoomGrammar messages={messages} setMessages={setMessages} />
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

          <div className=" absolute bottom-4 mb-32 flex flex-col w-full items-center justify-center">
            {/* <h1 className="ml-5 font-nunito text-4xl mb-3 font-semibold">
            Tell Elara
          </h1> */}

            <button
              className="bg-[#EFB4D4] flex justify-center items-center rounded-full w-20 h-20 z-10 active:ring-4 active:ring-[#3FCB80] focus-visible:ring-offset-2 "
              onClick={isListening ? stopListening : startListening}
            >
              {' '}
              {isListening ? (
                <IoMdMic className="h-3/4 w-1/2" />
              ) : (
                <IoMdMicOff className="h-3/4 w-1/2" />
              )}
            </button>
          </div>

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
