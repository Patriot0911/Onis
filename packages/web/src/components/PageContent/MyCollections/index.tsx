import InnerHeader from '@/components/InnerHeader';

import styles from './styles.module.scss';

const MyCollections = () => {
    return (
        <div className="flex items-center flex-col flex-grow w-full gap-5">
            <InnerHeader />
            <div
                className={styles['my-collection-wrapper']}
            >
                {
                    [...new Array(100).fill('')].map(
                        () => (
                            <div
                                className={styles['card-item']}
                            >
                                <div>
                                </div>
                                <button
                                    className={styles['action-btn']}
                                >Редагувати</button>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    );
};

export default MyCollections;
