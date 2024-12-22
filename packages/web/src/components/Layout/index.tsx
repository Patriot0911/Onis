import StoreProvider from '@/redux/StoreProvider';
import { ILayout } from '@/interfaces/layout';
import { Header, Main } from './Partial';

import styles from './styles.module.scss';
import '@/app/styles/global.css';

const Layout = ({ children, bgClr, ...props }: ILayout.IProps) => {
    return (
        <StoreProvider>
            <div className={styles['global-wrapper']}>
                <Header {...props} />
                <Main bgClr={bgClr}>{children}</Main>
            </div>
        </StoreProvider>
    );
};

export default Layout;
