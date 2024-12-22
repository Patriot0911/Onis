import InnerHeader from '@/components/InnerHeader';

import styles from './styles.module.scss';

const MyCollections = () => {
    return (
        <>
            <InnerHeader />
            <div className={styles['my-collection-wrapper']}>
                <div className={styles['list']}>
                    {[...new Array(100).fill('')].map((item, index) => (
                        <div key={index} className={styles['card-item']}>
                            <div>{item}</div>
                            <button className={styles['action-btn']}>
                                Редагувати
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default MyCollections;
