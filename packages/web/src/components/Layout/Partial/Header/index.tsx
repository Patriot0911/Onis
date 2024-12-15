'use client';

import { useAppSelector, } from '@/hooks/redux/useAppSelector';
import { logIn, } from '@/redux/features/me/meSlice';
import AuthClientService from '@/services/auth';
import { ILayout, } from '@/interfaces/layout';
import { useRouter, } from 'next/navigation';
import { useDispatch, } from 'react-redux';
import { IoMdExit } from 'react-icons/io';
import { useEffect, useRef, } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from '../../styles.module.scss';
import Nav from './Nav';

const Header = ({ redirect, path, }: ILayout.IHeaderProps) => {
    const { push, } = useRouter();
    const dispatch = useDispatch();
    const { value: { isAuth, isLoading, ...value }, } = useAppSelector(({ me }, ) => me);
    const redirectOnCondition = (isLogged: boolean) => {
        if(redirect === 'LOGGED' && isLogged)
            return push(path ?? '/');
        if(redirect === 'NOT_LOGGED' && !isLogged)
            return push(path ?? '/');
    };
    useEffect(
        () => {
            (async function() {
                const res = await AuthClientService.me();
                if(res) {
                    const { id, username: userName, avatar, } = res;
                    dispatch(logIn({ avatar, id, userName, }));
                };
                redirectOnCondition(!!res);
            })();
        }, []
    );
    useEffect(
        () => {
            if(isLoading)
                return;
            redirectOnCondition(isAuth);
        }, [isAuth]
    );
    return (
        <header>
            <div
                className={styles['heading-block']}
            >
                <Link
                    href={'home'}
                    className={styles['link-wrapper']}
                >
                    <Image
                        src={'/static/home-logo.svg'}
                        alt={'home-logo'}
                        width={30}
                        height={30}
                    /> <span>Onis</span>
                </Link>
            </div>
            <Nav />
            <div
                className={styles['footer-block']}
            >
                <div
                    className={styles['exit-action-wrapper']}
                >
                    <IoMdExit />
                    <span> Вийти </span>
                </div>
            </div>
        </header>
    );
};

export default Header;
