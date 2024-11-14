import { IMeInitialState, IUserLoginPayload } from '@/interfaces/redux';
import { createSlice, } from '@reduxjs/toolkit';

const initialState: IMeInitialState = {
    value: {
        isAuth: false,
        userName: '',
        email: '',
    },
};

export const meSlice = createSlice({
    name: 'me',
    initialState,
    reducers: {
        logIn: (state: any, { payload, type, }: IUserLoginPayload) => {
            if(!payload.email || !payload.userName)
                return;
            state.value.isAuth = true;
            state.value.userName = payload.userName;
            state.value.email = payload.userName;
        },
        logOut: (state) => {
            state = initialState;
        },
    },
});

export const { logIn, logOut, } = meSlice.actions

export default meSlice.reducer;
