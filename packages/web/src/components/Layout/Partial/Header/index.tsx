'use client';

import { useAppSelector } from '@/hooks/redux/useAppSelector';
import { logIn } from '@/redux/features/me/meSlice';
import FullLoading from '@/components/FullLoading';
import AuthClientService from '@/services/auth';
import { useCallback, useEffect } from 'react';
import { ILayout } from '@/interfaces/layout';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import LogOutButton from './LogOutButton';
import Image from 'next/image';
import Link from 'next/link';
import Nav from './Nav';

import styles from '../../styles.module.scss';

const Header = ({ redirect, path, hideNav }: ILayout.IHeaderProps) => {
    const { push } = useRouter();
    const dispatch = useDispatch();
    const { isAuth, isLoading } = useAppSelector(({ me }) => me.value);
    const redirectOnCondition = useCallback(
        (isLogged: boolean) => {
            if (redirect === 'LOGGED' && isLogged) return push(path ?? '/');
            if (redirect === 'NOT_LOGGED' && !isLogged)
                return push(path ?? '/');
        },
        [push, path, redirect],
    );
    useEffect(() => {
        (async function () {
            const authState = AuthClientService.validateAuthStorage();
            if (authState) {
                const { avatar, username, isAuth } = authState;
                redirectOnCondition(isAuth);
                if (isAuth) dispatch(logIn({ avatar, username }));
                return;
            }
            const res = await AuthClientService.me();
            if (res) {
                const { username, avatar } = res;
                dispatch(logIn({ avatar, username }));
            } else {
                AuthClientService.logoutStorage();
            }
            redirectOnCondition(!!res);
        })();
    }, [dispatch, redirectOnCondition]);
    useEffect(() => {
        if (isLoading) return;
        redirectOnCondition(isAuth);
    }, [isLoading, isAuth, redirectOnCondition]);
    return (
        <>
            {isLoading && redirect === 'NOT_LOGGED' && <FullLoading />}
            {!hideNav && (
                <header>
                    <div className={styles['heading-block']}>
                        <Link
                            href={'/my-collections'}
                            className={styles['link-wrapper']}>
                            <Image
                                src={'/static/home-logo.svg'}
                                alt={'home-logo'}
                                width={30}
                                height={30}
                            />{' '}
                            <span>Onis</span>
                        </Link>
                    </div>
                    <Nav />
                    <div className={styles['footer-block']}>
                        <LogOutButton />
                    </div>
                </header>
            )}
        </>
    );
};

export default Header;
