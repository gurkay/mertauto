
import { createSlice } from "@reduxjs/toolkit";

import { TAraclarInitialState } from "@/types/MyTypes.d";
import { araclarExtraReducers } from "./araclarExtraReducers";
const initState: TAraclarInitialState = {
    araclar: null,
    arac: null,
    mySearchText: "",
    loading: false,
    status: "IDLE",
    responseMessage: ""
}

export const araclarSlice = createSlice({
    name: "araclarSlice",
    initialState: initState,
    reducers: {
        setMySearchText: (state, action) => {
            state.mySearchText = action.payload;
        }
    },
    extraReducers: (builder) => {
        araclarExtraReducers.builderGetAraclar(builder);
        araclarExtraReducers.builderAracEkle(builder);
        araclarExtraReducers.builderAracGuncelle(builder);
        araclarExtraReducers.builderAracSil(builder);
        araclarExtraReducers.builderAracGetir(builder);
    }
});

export const { setMySearchText } = araclarSlice.actions;
export default araclarSlice.reducer;