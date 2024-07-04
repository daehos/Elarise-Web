import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,

  AlertDialogTitle,
} from "@radix-ui/react-alert-dialog"

const DeleteButton = ({ chatRoomId, setChats, chats, isOpen, onClose }) => {

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const updatedChats = chats.filter((chat) => chat.id !== chatRoomId);
      setChats(updatedChats);
      const response = await axios.delete(
        `https://backend-hq3lexjwcq-et.a.run.app/api/chatroom/${chatRoomId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setChats(chats.filter(chat => chat.id !== chatRoomId));
      onclose();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
       <AlertDialog open={isOpen} onOpenChange={onClose}>
      
        <AlertDialogContent>
          <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this chat? This action cannot be undone.
          </AlertDialogDescription>
          <div className="flex justify-end mt-4 text-black font-bold">
            <AlertDialogCancel asChild>
              <button
                className="bg-gray-300 px-4 py-2 rounded-xl mr-2  border-white"
                onClick={onClose}
              >
                Cancel
              </button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <button
                className="bg-red-600  px-4 py-2 rounded-xl"
                onClick={handleDelete}
              >
                Delete
              </button>
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteButton;
