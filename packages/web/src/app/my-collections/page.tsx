import MyCollections from '@/components/PageContent/MyCollections';
import InnerLayout from '@/components/InnerLayout';

const MyCollectionsPage = () => {
    return (
        <InnerLayout>
            <MyCollections />
            <div className="flex justify-center items-center">
                My collections
            </div>
        </InnerLayout>
    );
};

export default MyCollectionsPage;
