
import { createSlice } from "@reduxjs/toolkit";

import { TIsEmriInitialState } from "@/types/MyTypes.d";
import { isEmirleriExtraReducers } from "./isEmirleriExtraReducers";
const initState: TIsEmriInitialState = {
    isEmirleri: null,
    isEmri: null,
    isEmriDetaylar: null,
    mySearchText: "",
    loading: false,
    status: "IDLE",
    responseMessage: ""
}

export const isEmirleriSlice = createSlice({
    name: "isEmirleriSlice",
    initialState: initState,
    reducers: {
        setMySearchText: (state, action) => {
            state.mySearchText = action.payload;
        },

        setIsEmriDetaylar: (state, action) => {
            state.isEmriDetaylar = action.payload;
        },

        setIsEmri: (state, action) => {
            state.isEmri = action.payload;
        },
    },
    extraReducers: (builder) => {
        isEmirleriExtraReducers.builderGetIsEmirleri(builder);
        isEmirleriExtraReducers.builderIsEmriEkle(builder);
        isEmirleriExtraReducers.builderIsEmriGuncelle(builder);
        isEmirleriExtraReducers.builderIsEmriSil(builder);
        isEmirleriExtraReducers.builderIsEmriGetir(builder);
        isEmirleriExtraReducers.builderIsEmriDetayEkle(builder);
        isEmirleriExtraReducers.builderIsEmriDetaySil(builder);
        isEmirleriExtraReducers.builderIsEmriDetayGetir(builder);
    }
});

export const { setMySearchText, setIsEmriDetaylar, setIsEmri } = isEmirleriSlice.actions;
export default isEmirleriSlice.reducer;