import { useDialog } from '@/hooks/useDialog';
import { ReactNode } from 'react';

interface DialogTriggerProps {
    children: ReactNode;
    className?: string;
}

const DialogTrigger = ({ children, className }: DialogTriggerProps) => {
    const { openDialog } = useDialog();

    return (
        <button
            onClick={openDialog}
            className={`px-4 py-2 text-primary bg-white rounded hover:bg-secondary ${className}`}>
            {children}
        </button>
    );
};

export default DialogTrigger;
