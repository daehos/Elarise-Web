import React from "react";
// import { AlertDialog,AlertDialogTrigger,
//     AlertDialogContent,
//     AlertDialogTitle,
//     AlertDialogDescription,
//     AlertDialogAction,
//     AlertDialogCancel, } from "@radix-ui/react-alert-dialog";
import { useState, useEffect } from "react";
import Modal from "react-modal";

const EditMessageModal = ({
  isOpen,
  onClose,
  messageId,
  initialText,
  onEdit,
}) => {
  const [newText, setNewText] = useState("");

  useEffect(() => {
    if (initialText) {
      setNewText(initialText);
    }
  }, [initialText]);

  const handleSave = () => {
    onEdit(messageId, newText);
    onClose();
  };
  const modalStyle ={
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    }
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      style={modalStyle}
      className="custom-modal"
    >
      <div className="flex w-1/2 flex-col absolute right-96 top-96  bg-[#fbfbfa] rounded-3xl ">
        <h2 className="text-lg font-bold  ml-5 mb-2 mt-2">Edit Message</h2>
        <div className="flex justify-center">
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="w-[98%] h-24 p-2 border-[3px] border-black rounded-xl mb-2 "
          />
        </div>
        <div className="flex justify-end mb-2 mr-4">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-500 text-white font-bold rounded-xl border-[2px] border-black"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#3FCB80] text-black font-bold rounded-xl border-[2px] border-black"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditMessageModal;
