'use client';
import { DialogContext } from "@/hooks/useDialog";
import { ReactNode, useState } from "react";

interface DialogProps {
  children: ReactNode;
}

const Dialog = ({ children }: DialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <DialogContext.Provider value={{ isOpen, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
};

export default Dialog;
