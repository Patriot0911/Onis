import { geistMono, geistSans, } from '@/libs/fonts';
import { BasicLayout } from '@/components/Layout';
import { PropsWithChildren, } from 'react';
import type { Metadata, } from 'next';

import '../styles/global.css';

export const metadata: Metadata = {
    title: 'ONIS | Welcome Page',
    description: '',
};

const WeclomeLayout = ({ children, }: Readonly<PropsWithChildren>) => {
    return (
        <BasicLayout>
            {children}
        </BasicLayout>
    );
};

export default WeclomeLayout;
