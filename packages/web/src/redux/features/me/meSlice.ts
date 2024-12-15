import { IMeInitialState, IUserLoginPayload } from '@/interfaces/redux';
import { createSlice, } from '@reduxjs/toolkit';

const initialState: IMeInitialState = {
    value: {
        id: '',
        avatar: '',
        userName: '',
        isAuth: false,
        isLoading: true,
    },
};

export const meSlice = createSlice({
    name: 'me',
    initialState,
    reducers: {
        logIn: (_: any, { payload, }: IUserLoginPayload) => {
            if(!payload.id || !payload.userName)
                return;
            return {
                value: {
                    isAuth: true,
                    id: payload.id,
                    isLoading: false,
                    avatar: payload.avatar,
                    userName: payload.userName,
                }
            };
        },
        logOut: (_) => {
            return initialState;
        },
    },
});

export const { logIn, logOut, } = meSlice.actions

export default meSlice.reducer;
