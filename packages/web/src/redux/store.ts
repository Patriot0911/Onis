import { configureStore } from '@reduxjs/toolkit';
import meReducer from './features/me/meSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            me: meReducer,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
