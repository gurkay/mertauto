
import { createSlice } from "@reduxjs/toolkit";

import { TStoklarInitialState } from "@/types/MyTypes.d";
import { stoklarExtraReducers } from "./stoklarExtraReducers";
const initState: TStoklarInitialState = {
    stoklar: null,
    stok: null,
    mySearchText: "",
    loading: false,
    status: "IDLE",
    responseMessage: ""
}

export const stoklarSlice = createSlice({
    name: "stoklarSlice",
    initialState: initState,
    reducers: {
        setMySearchText: (state, action) => {
            state.mySearchText = action.payload;
        }
    },
    extraReducers: (builder) => {
        stoklarExtraReducers.builderGetStoklar(builder);
        stoklarExtraReducers.builderStokEkle(builder);
        stoklarExtraReducers.builderStokGuncelle(builder);
        stoklarExtraReducers.builderStokSil(builder);
        stoklarExtraReducers.builderStokGetir(builder);
    }
});

export const { setMySearchText } = stoklarSlice.actions;
export default stoklarSlice.reducer;