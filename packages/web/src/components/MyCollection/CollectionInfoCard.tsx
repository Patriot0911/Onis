interface CollectionInfoCardProps {
    title: string;
    description: string;
};

const CollectionInfoCard = ({ title, description }: CollectionInfoCardProps) => {
    return (
        <div className="rounded-lg bg-white border-2 border-primary p-6 space-y-4 max-w-xs flex-grow">
            <p className="text-center">
                {title}
            </p>
            <p className="text-center text-3xl">
                {description}
            </p>
        </div>
    );
};

export default CollectionInfoCard;