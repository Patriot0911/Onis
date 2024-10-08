import { geistMono, geistSans, } from '@/libs/fonts';
import { PropsWithChildren, } from 'react';
import Layout from '@/components/Layout';
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
                <Layout>
                    {children}
                </Layout>
            </body>
        </html>
    );
};

export default RootLayout;
