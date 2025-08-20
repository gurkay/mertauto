import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import araclarSlice from "./araclar/araclarSlice";
import stoklarSlice from "./stoklar/stoklarSlice";
import isEmirleriSlice from "./isEmirleri/isEmirleriSlice";
import kasaSlice from "./kasa/kasaSlice";
export const store = configureStore({
    reducer: {
        araclarReducer: araclarSlice,
        stoklarReducer: stoklarSlice,
        isEmirleriReducer: isEmirleriSlice,
        kasaReducer: kasaSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
export const useAppDispatch: () => AppDispatch = useDispatch;