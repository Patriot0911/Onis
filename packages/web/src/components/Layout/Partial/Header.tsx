'use client';

import { useAppSelector, } from '@/hooks/redux/useAppSelector';
import { logIn, } from '@/redux/features/me/meSlice';
import AuthClientService from '@/services/auth';
import { ILayout, } from '@/interfaces/layout';
import { useRouter, } from 'next/navigation';
import { useDispatch, } from 'react-redux';
import { useEffect, } from 'react';

const Header = ({ redirect, path, }: ILayout.IHeaderProps) => {
    const { push, } = useRouter();
    const dispatch = useDispatch();
    const { value: { isAuth, isLoading, } } = useAppSelector(({ me }, ) => me);
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
                    const { id, userName, avatar, } = res;
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
        <header></header>
    );
};

export default Header;
