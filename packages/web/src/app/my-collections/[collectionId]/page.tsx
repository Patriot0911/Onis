'use client';
import InnerLayout from "@/components/InnerLayout";
import MyCollection from "@/components/MyCollection";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MyCollectionsPage = () => {
    const pathname = usePathname();
    const [collectionId, setCollectionId] = useState<string | undefined>(pathname?.split('/').pop());

    useEffect(() => {
        if (!pathname?.split('/').includes('my-collections')) return;

        setCollectionId(pathname.split('/').pop());
    }, [pathname]);

    return collectionId && (
        <InnerLayout>
            <MyCollection collectionId={collectionId} />
        </InnerLayout>
    );
};

export default MyCollectionsPage;