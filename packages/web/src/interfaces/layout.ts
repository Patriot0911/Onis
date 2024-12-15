import { PropsWithChildren, } from 'react';

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
        path?: string;
    }

    export interface IProps extends PropsWithChildren, IHeaderProps {}
};
