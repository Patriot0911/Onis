import { ExtendedLayout } from '@/components/Layout';
import { PropsWithChildren, } from 'react';
import type { Metadata, } from 'next';

import './styles/global.css';

export const metadata: Metadata = {
    title: 'Onis',
    description: '',
};

const RootLayout = ({ children, }: Readonly<PropsWithChildren>) => {
    return (
        <ExtendedLayout>
            {children}
        </ExtendedLayout>
    );
};

export default RootLayout;
