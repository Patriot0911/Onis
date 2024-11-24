'use client';
import { createContext, ReactNode, useContext, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface DialogContextType {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

interface DialogProps {
  children: ReactNode;
}

export const Dialog = ({ children }: DialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <DialogContext.Provider value={{ isOpen, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
};

const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a Dialog component");
  }
  return context;
};

interface DialogTriggerProps {
  children: ReactNode;
  className?: string;
}

export const DialogTrigger = ({ children, className }: DialogTriggerProps) => {
  const { openDialog } = useDialog();

  return (
    <button
      onClick={openDialog}
      className={`px-4 py-2 text-primary bg-white rounded hover:bg-secondary ${className}`}
    >
      {children}
    </button>
  );
};

interface DialogContentProps {
  children: ReactNode;
}

export const DialogContent = ({ children }: DialogContentProps) => {
  const { isOpen, closeDialog } = useDialog();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-light rounded-lg shadow-lg w-11/12 max-w-md relative">
        <button
          onClick={closeDialog}
          className="absolute top-2 right-2 text-gray-700 hover:text-black"
          aria-label="Close"
        >
          <IoMdClose />
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

interface DialogHeaderProps {
  children: ReactNode;
}

export const DialogHeader = ({ children }: DialogHeaderProps) => {
  return (
    <div className="p-4 text-lg font-semibold text-gray-800 flex items-center justify-center">
      {children}
    </div>
  );
};

interface DialogFooterProps {
  children: ReactNode;
  className?: string;
}

export const DialogFooter = ({ children, className }: DialogFooterProps) => {
  return (
    <div className={`p-4 flex justify-end gap-2 ${className}`}>
      {children}
    </div>
  );
};
