import { PayloadAction, } from '@reduxjs/toolkit';

export interface IUserLogIn {
    avatar: string;
    username: string;
};

export type IUserLoginPayload = PayloadAction<IUserLogIn>;

export interface IMeInitialState {
    value: {
        isAuth: boolean;
        username: string;
        isLoading: boolean;
        avatar: string;
    };
};
