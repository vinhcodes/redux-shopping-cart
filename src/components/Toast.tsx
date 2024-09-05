import React, { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = "info", duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the toast by adding the "show" class
    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false); // Hide the toast smoothly
    }, duration - 500); // Start hiding 500ms before the duration ends to allow animation

    const removeToastTimeout = setTimeout(() => {
      onClose(); // Remove toast after the duration
    }, duration);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeToastTimeout);
    };
  }, [duration, onClose]);

  return (
    <div className={`toast toast-${type} ${isVisible ? "show" : ""} card`}>
      {message}
    </div>
  );
};

export default Toast;
