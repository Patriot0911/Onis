import { ReactNode } from "react";

interface DialogHeaderProps {
    children: ReactNode;
}

const DialogHeader = ({ children }: DialogHeaderProps) => {
    return (
        <div className="p-4 text-lg font-semibold text-gray-800 flex items-center justify-center">
            {children}
        </div>
    );
};

export default DialogHeader;