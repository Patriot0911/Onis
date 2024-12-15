import { ILayout, } from '@/interfaces/layout';
import { Header, } from './Partial';

import styles from './styles.module.scss';
import '@/app/styles/global.css';
import StoreProvider from '@/redux/StoreProvider';

const Layout = ({ children, ...props }: ILayout.IProps) => {
    return (
        <div
            className={styles['global-wrapper']}
        >
            <StoreProvider>
                <Header {...props} />
                <main className={'bg-bg-primary'}>{children}</main>
            </StoreProvider>
        </div>
    );
};

export default Layout;
