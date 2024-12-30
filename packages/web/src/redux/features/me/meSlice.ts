import { IMeInitialState, IUserLoginPayload } from '@/interfaces/redux';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IMeInitialState = {
    value: {
        avatar: '',
        username: '',
        isAuth: false,
        isLoading: true,
    },
};

const authDataRefresh = process.env.NEXT_PUBLIC_AUTH_REFRESH_REQ;

export const meSlice = createSlice({
    name: 'me',
    initialState,
    reducers: {
        logIn: (_: unknown, { payload }: IUserLoginPayload) => {
            if (!payload.username) return;
            const baseState = {
                isAuth: true,
                avatar: payload.avatar,
                username: payload.username,
            };
            localStorage.setItem(
                'authState',
                JSON.stringify({
                    ...baseState,
                    expires: new Date().getTime() + parseInt(authDataRefresh),
                }),
            );
            return {
                value: {
                    ...baseState,
                    isLoading: false,
                },
            };
        },
        logOut: () => {
            localStorage.setItem(
                'authState',
                JSON.stringify({
                    isAuth: false,
                    expires: new Date().getTime() + parseInt(authDataRefresh),
                }),
            );
            return {
                value: {
                    ...initialState.value,
                    isLoading: false,
                },
            };
        },
    },
});

export const { logIn, logOut } = meSlice.actions;
export default meSlice.reducer;
