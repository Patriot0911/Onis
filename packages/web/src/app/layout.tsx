import { geistMono, geistSans, } from '@/libs/fonts';
import { BasicLayout } from '@/components/Layout';
import { PropsWithChildren, } from 'react';
import type { Metadata, } from 'next';

import './styles/global.css';

export const metadata: Metadata = {
    title: 'Onis',
    description: '',
};

const RootLayout = ({ children, }: Readonly<PropsWithChildren>) => {
    return (
        <html lang={'en'}>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <BasicLayout>
                    {children}
                </BasicLayout>
            </body>
        </html>
    );
};

export default RootLayout;
