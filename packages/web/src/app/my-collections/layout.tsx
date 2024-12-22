import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';

import Layout from '@/components/Layout';

export const metadata: Metadata = {
    title: 'ONIS',
    description: '',
};

const RootLayout = ({ children }: Readonly<PropsWithChildren>) => {
    return (
        <Layout redirect={'NOT_LOGGED'} path={'auth'}>
            {children}
        </Layout>
    );
};

export default RootLayout;
