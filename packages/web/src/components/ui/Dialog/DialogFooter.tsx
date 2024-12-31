import { ReactNode } from 'react';

interface DialogFooterProps {
    children: ReactNode;
    className?: string;
}

const DialogFooter = ({ children, className }: DialogFooterProps) => {
    return (
        <div className={`p-4 flex justify-end gap-2 ${className}`}>
            {children}
        </div>
    );
};

export default DialogFooter;
