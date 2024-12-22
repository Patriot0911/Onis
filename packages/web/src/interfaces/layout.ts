import { PropsWithChildren } from 'react';

export declare namespace ILayout {
    /*
     * if redirect = 'LOGGED'
     *      redirect user if he is logged in
     *
     * if redirect = 'NOT_LOGGED'
     *      redirect user if he is not logged in
     *
     **/
    export type TRedirectOptions = 'NONE' | 'NOT_LOGGED' | 'LOGGED';

    export interface IHeaderProps {
        redirect: TRedirectOptions;
        hideNav?: boolean;
        path?: string;
    }

    export interface IMainProps extends PropsWithChildren {
        bgClr?: 'secondary' | 'primary';
    }

    export interface IProps extends IMainProps, IHeaderProps {}
}
