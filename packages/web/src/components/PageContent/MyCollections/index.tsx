'use client';
import InnerHeader from '@/components/InnerHeader';
import CreateCollection from './CreateCollection';
import CollectionCard from './CollectionCard';
import Dialog from '@/components/ui/Dialog';
import { useEffect, useState } from 'react';
import UsersService from '@/services/users';

import styles from './styles.module.scss';

const MyCollections = () => {
    const [collections, setCollections] = useState<any[]>([]);
    useEffect(
        () => {
            (async () => {
                const res = await UsersService.getCollections();
                if(!res)
                    return;
                const {
                    collections,
                } = res;
                setCollections(collections);
                console.log({collections});
            })();
        }, []
    );
    return (
        <>
            <InnerHeader />
            <div className={styles['my-collection-wrapper']}>
                <div className={styles['list']}>
                    <Dialog>
                        <CreateCollection  />
                    </Dialog>
                        {
                            collections.map(
                                (item) => (
                                    <CollectionCard
                                        id={item.id}
                                        key={item.id}
                                        name={item.title}
                                        description={item.description}
                                    />
                                )
                            )
                        }
                </div>
            </div>
        </>
    );
};

export default MyCollections;
