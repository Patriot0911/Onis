import { Header, Footer, } from './Partial';
import { PropsWithChildren, } from 'react';

import styles from './styles.module.scss';

const ExtendedLayout = ({ children, }: PropsWithChildren) => {
    return (
        <div
            className={styles['global-wrapper']}
        >
            <Header />
            <main className={'bg-bg-primary'}>{children}</main>
            <Footer />
        </div>
    );
};

export default ExtendedLayout;