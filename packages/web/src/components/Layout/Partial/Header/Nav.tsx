import { IoExtensionPuzzle } from 'react-icons/io5';
import { MdSpaceDashboard } from 'react-icons/md';
import { usePathname, } from 'next/navigation';
import { PiNoteFill, } from 'react-icons/pi';
import { HiUsers, } from 'react-icons/hi';
import { ReactNode, } from 'react';
import Link from 'next/link';

import styles from '../../styles.module.scss';

interface IPageData {
    label: string;
    icon: ReactNode;
    href: string;
};

const pages: IPageData[] = [
    {
        icon: <MdSpaceDashboard />,
        label: 'Дашборд',
        href: '/dashboard'
    },
    {
        icon: <HiUsers />,
        label: 'Публічні колекції',
        href: '/collections',
    },
    {
        icon: <PiNoteFill />,
        label: 'Мої колекції',
        href: '/my-collections',
    },
    {
        icon: <IoExtensionPuzzle />,
        label: 'Інтеграції API',
        href: '/api-info',
    },
];

const Nav = () => {
    const pathName = usePathname();
    return (
        <div
            className={styles['main-block']}
        >
            {
                pages.map(({ href, icon, label, }) => (
                    <Link
                        key={href}
                        href={href}
                        className={`${styles['nav-item']} ${`/${pathName.split('/')[1]}` === href ? styles['item-active'] : ''}`}
                    >
                        {icon}
                        <span>{label}</span>
                    </Link>
                ))
            }
        </div>
    );
};

export default Nav;
