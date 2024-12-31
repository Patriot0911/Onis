import { useDialog } from '@/hooks/useDialog';
import { IoMdClose } from 'react-icons/io';
import { ReactNode } from 'react';

interface DialogContentProps {
    children: ReactNode;
}

const DialogContent = ({ children }: DialogContentProps) => {
    const { isOpen, closeDialog } = useDialog();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-[50]">
            <div
                className={
                    'absolute z-[-1] bg-black/50 w-full h-full left-0 top-0'
                }
                onClick={() => closeDialog()}
            />
            <div className="bg-light rounded-lg shadow-lg w-11/12 max-w-md relative">
                <button
                    onClick={closeDialog}
                    className="absolute top-2 right-2 text-gray-700 hover:text-black"
                    aria-label="Close">
                    <IoMdClose />
                </button>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default DialogContent;
