// RenameModal.js
import React, { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@radix-ui/react-alert-dialog"; // Ganti dengan import sesuai library yang kamu gunakan

const RenameModal = ({ isOpen, onClose, chatRoomId, onRename }) => {
  const [newName, setNewName] = useState("");

  useEffect(() => {
    if (isOpen) {
      setNewName("");
    }
  }, [isOpen]);

  const handleRename = () => {
    onRename(chatRoomId, newName);
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogTitle>Rename Chatroom</AlertDialogTitle>
        <AlertDialogDescription>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter new chatroom name"
            className="w-full px-3 py-2 border-[#FFCF00] border-[2px] bg-black rounded-md"
          />
        </AlertDialogDescription>
        <div className="flex justify-end mt-4 font-bold text-black ">
          <AlertDialogCancel asChild>
            <button
              className="bg-gray-300 px-4 py-2 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <button
              className="bg-[#3FCB80]   px-4 py-2 rounded"
              onClick={handleRename}
            >
              Rename
            </button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RenameModal;
