import { BasicLayout } from '@/components/Layout';
import { PropsWithChildren, } from 'react';
import type { Metadata, } from 'next';

import '../styles/global.css';

export const metadata: Metadata = {
    title: 'ONIS | Authorization',
    description: '',
};

const AuthLayout = ({ children, }: Readonly<PropsWithChildren>) => {
    return (
        <BasicLayout redirectOnLogged>
            {children}
        </BasicLayout>
    );
};

export default AuthLayout;
