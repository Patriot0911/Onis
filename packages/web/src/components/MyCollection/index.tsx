import MyCollectionBody from "./MyCollectionBody";
import MyCollectionHeader from "./MyCollectionHeader";

interface MyCollectionProps {
    collectionId: string;
};

const collection = {
    answers: ["answer1", "answer2", "answer3"],
    status: "draft",
    title: "Collection title",
    lastChange: "2021-09-01",
    access: "Admin",
};

const MyCollection = ({ collectionId }: MyCollectionProps) => {
    return (
        <div className="w-full flex flex-col h-full">
            <MyCollectionHeader collection={collection} />
            <hr className="my-6 text-secondary" />
            <MyCollectionBody />
        </div>
    )
};

export default MyCollection;