import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  // close modal when user hits the escape button
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);

    // if the modal is open stop background user interaction

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  // return null of isOpen is false

  if (!isOpen) return null;

  return (
    <div
      data-testid="modal"
      className="fixed inset-0 z-50 flex items-center flex-row justify-center bg-black bg-opacity-50 text-black"
      onClick={onClose}
    >
      <div
        className="relative bg-white pt-8 p-4 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-4 text-gray-600 text-lg"
          onClick={onClose}
          data-testid="close-modal"
        >
          &#215;
        </button>
        {children}
      </div>
    </div>
  );
};
