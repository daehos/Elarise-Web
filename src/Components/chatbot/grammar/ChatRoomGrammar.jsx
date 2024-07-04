import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import EditMessageModal from './EditMessageGrammar';
import { FolderPen, Trash2 } from 'lucide-react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const ChatRoomGrammar = ({ messages, setMessages }) => {
  const { chatRoomId } = useParams();
  const messagesEndRef = useRef(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [messageToEdit, setMessageToEdit] = useState({ id: null, text: '' });

  const navigate = useNavigate();
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const handleLeaveRoom = () => {
    navigate('/');
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

   const handleEditMessage = async (idMessage, newText) => {
    try {
      console.log('Editing message:', idMessage, newText);
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `https://backend-hq3lexjwcq-et.a.run.app/api/chatroom/${chatRoomId}/edit-text/${idMessage}`,
        { messageText: newText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 'success') {
        const { userMessage, idMessage, message } = response.data;

        setMessages((prevMessages) => {
          const newMessages = [...prevMessages];
          const indexToEdit = newMessages.findIndex((msg) => msg.idMessage === idMessage && !msg.isUserMessage);

          if (indexToEdit !== -1) {
            newMessages[indexToEdit] = { ...newMessages[indexToEdit], message: message };

            if (indexToEdit > 0 && newMessages[indexToEdit - 1].isUserMessage) {
              newMessages[indexToEdit - 1] = { ...newMessages[indexToEdit - 1], message: userMessage };
            }

            return newMessages;
          } else {
            console.error('Message not found');
            return prevMessages;
          }
        });
      }
    } catch (error) {
      console.error('Error editing message:', error);
    }
  };


  const handleDeleteMessage = async (idMessage) => {
    try {
      console.log('Deleting message:', idMessage);
      const token = localStorage.getItem('token');
      await axios.delete(
        `https://backend-hq3lexjwcq-et.a.run.app/api/chatroom/${chatRoomId}/chat/${idMessage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Remove message from state
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.idMessage !== idMessage)
      );
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <>
      <div className="flex flex-col h-full py-36 px-10 font-nunito ">
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
            messages.map((msg, index) => (
              <div
                key={`${msg.idMessage}-${index}`}
                className={`max-w-lg w-auto my-2 ${
                  msg.isUserMessage ? 'self-end' : 'self-start'
                }`}
              >
                <div
                  className={`px-4 py-1 ${
                    msg.isUserMessage
                      ? 'bg-[#3FCB80] rounded-l-2xl rounded-tr-2xl'
                      : 'bg-[#FFCF00] rounded-tl-2xl rounded-r-2xl'
                  }`}
                >
                  <p className="text-black break-words">{msg.message}</p>
                </div>
                {msg.isUserMessage && (
                  <div className="mt-2 flex justify-end">
                    <button
                      onClick={() => {
                        setMessageToEdit({
                          id: msg.idMessage,
                          text: msg.message,
                        });
                        setIsEditModalOpen(true);
                      }}
                      className="text-xs text-gray-500 hover:text-gray-800"
                    >
                      <FolderPen />
                    </button>
                    <Popup
                      trigger={
                        <button className="text-xs ml-2 text-gray-500 hover:text-red-500">
                          <Trash2 />
                        </button>
                      }
                      modal
                      nested
                      contentStyle={{
                        width: '300px',
                        padding: '20px',
                        borderRadius: '25px',
                        backgroundColor: '#f8f8f8',
                      }}
                      overlayStyle={{
                        backgroundColor: 'rgba(0,0,0,0.5)',
                      }}
                    >
                      {(close) => (
                        <div className="modal  flex flex-col ">
                          <div className="header font-bold ">
                            {' '}
                            Delete Confirmation{' '}
                          </div>
                          <div className="content ">
                            {' '}
                            Are you sure you want to delete this message?
                          </div>
                          <div className="actions font-bold flex justify-end mt-10 ">
                            <button
                              className="bg-red-600 text-black font-bold px-4 py-2 rounded border-[3px] border-black hover:opacity-90"
                              onClick={() => {
                                handleDeleteMessage(msg.idMessage);
                                close();
                              }}
                            >
                              Yes, delete it!
                            </button>
                            <button
                              className="bg-gray-500 text-white px-4 py-2 rounded ml-2 border-[3px] border-black hover:opacity-90"
                              onClick={() => {
                                close();
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </Popup>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center font-nunito text-gray-500">
              No chat history available
              <h1 className="font-semibold text-black mt-52 text-4xl md:text-6xl lg:text-8xl">
                Hello,<span className="text-[#C15891]">Mingyu</span>
              </h1>
              <p className="mt-5 text-black">How Can I Help You?</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <EditMessageModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        messageId={messageToEdit.id}
        initialText={messageToEdit.text}
        onEdit={handleEditMessage}
      />
    </>
  );
};

export default ChatRoomGrammar;
