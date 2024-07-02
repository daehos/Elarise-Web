import React from "react";
import { AlertDialog,AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel, } from "@radix-ui/react-alert-dialog";
import { useState, useEffect } from "react";

    const EditMessageModal = ({ isOpen, onClose, messageId, initialText, onEdit }) => {
        const [newText, setNewText] = useState("");
      
        useEffect(() => {
          if (isOpen) {
            setNewText(initialText);
          }
        }, [isOpen, initialText]);
      
        const handleEdit = () => {
          onEdit(messageId, newText);
          onClose();
        };
      
        return (
          <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
              <AlertDialogTitle>Edit Message</AlertDialogTitle>
              <AlertDialogDescription className="bg-[#F8C807]">
                <input
                  type="text"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="Enter new message text"
                  className="w-full px-3 py-2 border  rounded-md"
                />
              </AlertDialogDescription>
              <div className="flex justify-end mt-4">
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
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={handleEdit}
                  >
                    Save
                  </button>
                </AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        );
      };
      
      export default EditMessageModal;