import { StatusConsts } from "@/constants/StatusConsts";
import { AraclarRootObject, TAraclarInitialState } from "@/types/MyTypes.d";
import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { aracEkle, aracGetir, aracGuncelle, aracSil, getAraclar } from "./araclarCreateAsyncThunk";



export const araclarExtraReducers = {
    builderGetAraclar: function(builder: ActionReducerMapBuilder<TAraclarInitialState>) {

        builder.addCase(getAraclar.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;

        });
    
        builder.addCase(getAraclar.fulfilled, (state, action: PayloadAction<AraclarRootObject>) => {
            state.loading = false;
            state.araclar = action.payload;
            state.status = StatusConsts.SUCCESS;
        });
    
        builder.addCase(getAraclar.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    },

    builderAracEkle: function(builder: ActionReducerMapBuilder<TAraclarInitialState>) {
        builder.addCase(aracEkle.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;
        });

        builder.addCase(aracEkle.fulfilled, (state, action: PayloadAction<TAraclarInitialState>) => {
            state.loading = false;
            state.arac = action.payload.arac;
            state.status = StatusConsts.SUCCESS;
        });

        builder.addCase(aracEkle.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    },

    builderAracGuncelle: function(builder: ActionReducerMapBuilder<TAraclarInitialState>) {
        builder.addCase(aracGuncelle.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;
        });

        builder.addCase(aracGuncelle.fulfilled, (state, action: PayloadAction<TAraclarInitialState>) => {
            state.loading = false;
            state.arac = action.payload.arac;
            state.status = StatusConsts.SUCCESS;
        });

        builder.addCase(aracGuncelle.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    },

    builderAracSil: function(builder: ActionReducerMapBuilder<TAraclarInitialState>) {
        builder.addCase(aracSil.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;
        });

        builder.addCase(aracSil.fulfilled, (state, action: PayloadAction<TAraclarInitialState>) => {
            state.loading = false;
            state.arac = action.payload.arac;
            state.status = StatusConsts.SUCCESS;
        });

        builder.addCase(aracSil.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    },

    builderAracGetir: function(builder: ActionReducerMapBuilder<TAraclarInitialState>) {
        builder.addCase(aracGetir.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;
        });
        
        builder.addCase(aracGetir.fulfilled, (state, action: PayloadAction<TAraclarInitialState>) => {
            state.loading = false;
            state.arac = action.payload.arac;
            state.status = StatusConsts.SUCCESS;
        });
        
        builder.addCase(aracGetir.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    }
}