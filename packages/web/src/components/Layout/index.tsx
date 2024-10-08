import { Header, Footer, } from './Partial';
import { PropsWithChildren, } from 'react';

import styles from './styles.module.scss';

const Layout = ({ children, }: PropsWithChildren) => {
    return (
        <div
            className={styles['global-wrapper']}
        >
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
