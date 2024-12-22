import { geistMono, geistSans } from '@/libs/fonts';
import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';

import './styles/global.css';

export const metadata: Metadata = {
    title: 'ONIS',
    description: '',
};

const RootLayout = ({ children }: Readonly<PropsWithChildren>) => {
    return (
        <html lang={'en'}>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
};

export default RootLayout;
