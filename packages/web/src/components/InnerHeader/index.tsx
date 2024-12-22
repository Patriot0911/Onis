'use client';

import { PropsWithChildren, useEffect, useState, } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { usePathname, } from 'next/navigation';
import Link from 'next/link';

import styles from './styles.module.scss';

const pathNames = {
    'my-collections': 'Мої колекції',
};

const InnerHeader = ({ children, }: PropsWithChildren) => {
    const path = usePathname();
    const [pathState, setPathState] = useState<string[]>([]);
    useEffect(
        () => {
            const parts = path.split('/')
                .filter(Boolean)
                .map(
                    (item: string) =>
                        Object.keys(pathNames).includes(item) ? pathNames[item as keyof typeof pathNames] : item
                );
            setPathState(parts);
        }, []
    );
    return (
        <div
            className={styles['inner-header-wrapper']}
        >
            <div
                className={styles['path-container']}
            >
                {
                    pathState.map(
                        (item, index) => (
                            <div
                                key={`${item}-${index}`}
                                className={styles['path-item']}
                            >
                                <Link
                                    href={`/${pathState.slice(0, index+1).join('/')}`}
                                    className={
                                        (index === pathState.length-1 ? styles['last'] : '') + ` ${styles['path-name']}`
                                    }
                                >{item}</Link>
                                {
                                    index !== pathState.length-1 && (
                                        <MdKeyboardArrowRight />
                                    )
                                }
                            </div>
                        )
                    )
                }
            </div>
            <div
                className={styles['side-content']}
            >
                {children}
            </div>
        </div>
    );
};

export default InnerHeader;
