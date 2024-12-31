import Link from 'next/link';
import { ICollectionCard } from '../CollectionCard';

import styles from './styles.module.scss';

const CardWrapper = ({
    children,
    id,
    label,
}: ICollectionCard.ICardWrapperProps) => {
    return (
        <div className={styles['card-wrapper']}>
            <div className={styles['body']}>{children}</div>
            <Link
                href={`/my-collections/${id}`}
                className={styles['card-button']}>
                {label}
            </Link>
        </div>
    );
};

export default CardWrapper;
