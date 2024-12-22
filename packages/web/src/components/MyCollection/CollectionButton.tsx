interface CollectionButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'outline';
}

const CollectionButtonWrapper = ({
    children,
    variant = 'outline',
}: CollectionButtonProps) => {
    return (
        <button
            className={`flex items-center justify-center gap-4 w-full p-6 rounded-lg max-h-24 text-primary hover:bg-secondary transition-colors duration-200 ${
                variant === 'primary'
                    ? 'bg-primary text-white'
                    : 'bg-white border-2 border-primary'
            }`}>
            {children}
        </button>
    );
};

export default CollectionButtonWrapper;
