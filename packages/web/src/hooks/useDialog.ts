import { createContext, useContext } from 'react';

interface DialogContextType {
    isOpen: boolean;
    openDialog: () => void;
    closeDialog: () => void;
}

export const DialogContext = createContext<DialogContextType | undefined>(
    undefined,
);

export const useDialog = () => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error('useDialog must be used within a Dialog component');
    }
    return context;
};
