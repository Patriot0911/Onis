import { PropsWithChildren } from 'react';

import styles from './styles.module.scss';

interface ICardWrapperProps extends PropsWithChildren {
    handle: () => void;
}

const CardWrapper = ({ children, handle }: ICardWrapperProps) => {
    return (
        <div onClick={handle} className={styles['card-wrapper']}>
            {children}
        </div>
    );
};

export default CardWrapper;
