'use client';

import { useAppSelector } from '@/hooks/redux/useAppSelector';
import { FaUser } from 'react-icons/fa';
import Image from 'next/image';

import styles from './styles.module.scss';

const UserInfo = () => {
    const { avatar, username, } = useAppSelector(
        selector => selector.me.value
    );
    return (
        <div
            className={styles['user-info-wrapper']}
        >
            <div
                className={styles['text-container']}
            >
                <span>{username}</span>
            </div>
            <div
                className={styles['avatar-wrapper']}
            >
                {
                    !avatar ? <FaUser /> : (
                        <Image
                            src={''}
                            alt={'user-avatar'}
                            width={256}
                            height={256}
                        />
                    )
                }
            </div>
        </div>
    );
};

export default UserInfo;
