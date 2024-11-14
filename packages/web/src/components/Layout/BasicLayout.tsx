import { PropsWithChildren, } from 'react';

import styles from './styles.module.scss';

interface IBasicLayoutProps extends PropsWithChildren {
    redirectOnLogged?: boolean;
};

const BasicLayout = ({ children, redirectOnLogged, }: IBasicLayoutProps) => {
    // check if user is logged in and redirect
    return (
        <div
            className={styles['global-wrapper']}
        >
            <main className={'bg-bg-primary'}>{children}</main>
        </div>
    );
};

export default BasicLayout;
