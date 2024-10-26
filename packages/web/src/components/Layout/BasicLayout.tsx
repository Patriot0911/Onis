import { PropsWithChildren, } from 'react';

import styles from './styles.module.scss';

const BasicLayout = ({ children, }: PropsWithChildren) => {
    return (
        <div
            className={styles['global-wrapper']}
        >
            <main className={'bg-bg-primary'}>{children}</main>
        </div>
    );
};

export default BasicLayout;
