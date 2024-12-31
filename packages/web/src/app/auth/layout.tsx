import { PropsWithChildren } from 'react';
import Layout from '@/components/Layout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'ONIS | Authorization',
    description: '',
};

const AuthLayout = ({ children }: Readonly<PropsWithChildren>) => {
    return (
        <Layout
            redirect={'LOGGED'}
            path={'/my-collections'}
            bgClr={'primary'}
            hideNav>
            {children}
        </Layout>
    );
};

export default AuthLayout;
