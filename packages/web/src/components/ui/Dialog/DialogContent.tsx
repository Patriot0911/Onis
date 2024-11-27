import { useDialog } from "@/hooks/useDialog";
import { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";

interface DialogContentProps {
    children: ReactNode;
}

const DialogContent = ({ children }: DialogContentProps) => {
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

export default DialogContent;