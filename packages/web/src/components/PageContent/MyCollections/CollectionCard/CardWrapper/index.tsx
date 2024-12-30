import { ICollectionCard } from "../CollectionCard";

import styles from './styles.module.scss';

const CardWrapper = ({ children, handle, label, }: ICollectionCard.ICardWrapperProps) => {
    return (
        <div
            className={styles['card-wrapper']}
        >
            <div
                className={styles['body']}
            >
                {children}
            </div>
            <button
                className={styles['card-button']}
                onClick={handle}
            >
                {label}
            </button>
        </div>
    );
};

export default CardWrapper;
