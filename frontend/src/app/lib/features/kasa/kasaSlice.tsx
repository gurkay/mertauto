
import { createSlice } from "@reduxjs/toolkit";

import { TKasaInitialState } from "@/types/MyTypes.d";
import { kasalarExtraReducers } from "./kasaExtraReducers";
const initState: TKasaInitialState = {
    kasalar: null,
    kasa: null,
    mySearchText: "",
    loading: false,
    status: "IDLE",
    responseMessage: ""
}

export const kasaSlice = createSlice({
    name: "kasaSlice",
    initialState: initState,
    reducers: {
        setMySearchText: (state, action) => {
            state.mySearchText = action.payload;
        }
    },
    extraReducers: (builder) => {
        kasalarExtraReducers.builderGetKasalar(builder);
        kasalarExtraReducers.builderKasaEkle(builder);
        kasalarExtraReducers.builderKasaGuncelle(builder);
        kasalarExtraReducers.builderKasaSil(builder);
        kasalarExtraReducers.builderKasaGetir(builder);
    }
});

export const { setMySearchText } = kasaSlice.actions;
export default kasaSlice.reducer;