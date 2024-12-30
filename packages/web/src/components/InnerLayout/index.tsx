import { MdOutlineSearch } from 'react-icons/md';
import { PropsWithChildren } from 'react';
import { UserInfo } from './Partial';

import styles from './styles.module.scss';

const InnerLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className={styles['layout-wrapper']}>
            <div className={styles['header']}>
                <div className={styles['search-wrapper']}>
                    <input
                        className={styles['search']}
                        name={'search'}
                        placeholder={'Пошук'}
                        maxLength={14}
                    />
                    <MdOutlineSearch className={styles['search-icon']} />
                </div>
                <UserInfo />
            </div>
            <div className={styles['body']}>{children}</div>
        </div>
    );
};

export default InnerLayout;
