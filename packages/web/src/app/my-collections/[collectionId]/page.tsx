'use client';
import InnerHeader from '@/components/InnerHeader';
import InnerLayout from '@/components/InnerLayout';
import MyCollection from '@/components/MyCollection';
import CollectionsService from '@/services/collections';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

const MyCollectionsPage = () => {
    const params = useParams();
    // const [collection, setCollection] = useState<any | undefined>(undefined);

    useEffect(() => {
        const { collectionId } = params;
        if (!collectionId || typeof collectionId != 'string') return;
        (async () => {
            const res = await CollectionsService.getById(collectionId);
            console.log({ res });
        })();
    }, []);

    return (
        true && (
            <InnerLayout>
                <InnerHeader />
                <MyCollection collectionId={'collectionId'} />
            </InnerLayout>
        )
    );
};

export default MyCollectionsPage;
