import { createContext, useContext, useState, useCallback } from "react";
import Toaster from "../components/Notifications/Toaster";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

let idCounter = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message, type = "success") => {
      const id = idCounter++;

      const newToast = {
        id,
        message,
        type,
      };

      setToasts((prev) => {
        const updated = [...prev, newToast];
        return updated.length > 3 ? updated.slice(updated.length - 3) : updated;
      });

      setTimeout(() => {
        removeToast(id);
      }, 10000);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toaster toasts={toasts} />
    </ToastContext.Provider>
  );
};