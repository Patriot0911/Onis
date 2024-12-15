import { PayloadAction, } from '@reduxjs/toolkit';

export interface IUserLogIn {
    id: string;
    avatar: string;
    userName: string;
};

export type IUserLoginPayload = PayloadAction<IUserLogIn>;

export interface IMeInitialState {
    value: {
        id: string,
        isAuth: boolean;
        userName: string;
        isLoading: boolean;
        avatar: string;
    };
};
