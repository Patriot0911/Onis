import { PayloadAction, } from '@reduxjs/toolkit';

export interface IUserLogIn {
    userName: string;
    email: string;
};

export type IUserLoginPayload = PayloadAction<IUserLogIn>;

export interface IMeInitialState {
    value: {
        isAuth: boolean;
        userName: string;
        email: string;
    };
};
