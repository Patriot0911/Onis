import { PropsWithChildren } from 'react';

import styles from './styles.module.scss';

const CardWrapper = ({ children, }: PropsWithChildren) => {
    return (
        <div
            className={styles['card-wrapper']}
        >
            {children}
        </div>
    );
};

export default CardWrapper;
