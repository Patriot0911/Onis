'use client';
import InnerHeader from '@/components/InnerHeader';
import CreateCollection from './CreateCollection';
import CollectionCard from './CollectionCard';

import styles from './styles.module.scss';

const MyCollections = () => {
    return (
        <>
            <InnerHeader />
            <div className={styles['my-collection-wrapper']}>
                <div className={styles['list']}>
                    <CreateCollection  />
                    {[...new Array(100).fill('')].map((item, index) => (
                        <CollectionCard
                            id={''}
                            name={''}
                            key={index}
                            description={''}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default MyCollections;
