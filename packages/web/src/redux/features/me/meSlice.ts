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
        logIn: (state: any, { payload, }: IUserLoginPayload) => {
            if(!payload.id || !payload.userName)
                return;
            state.value.isAuth = true;
            state.value.avatar = payload.avatar;
            state.value.id = payload.id;
            state.value.userName = payload.userName;
            state.value.isLoading = false;
        },
        logOut: (state) => {
            state = initialState;
        },
    },
});

export const { logIn, logOut, } = meSlice.actions

export default meSlice.reducer;
