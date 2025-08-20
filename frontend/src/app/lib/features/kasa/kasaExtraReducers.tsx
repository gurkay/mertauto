import { StatusConsts } from "@/constants/StatusConsts";
import { KasaRootObject, StoklarRootObject, TKasaInitialState, TStoklarInitialState } from "@/types/MyTypes.d";
import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { kasaEkle, kasaGetir, kasaGuncelle, kasaSil, getKasalar } from "./kasaCreateAsyncThunk";

export const kasalarExtraReducers = {
    builderGetKasalar: function(builder: ActionReducerMapBuilder<TKasaInitialState>) {

        builder.addCase(getKasalar.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;

        });
    
        builder.addCase(getKasalar.fulfilled, (state, action: PayloadAction<KasaRootObject>) => {
            state.loading = false;
            state.kasalar = action.payload;
            state.status = StatusConsts.SUCCESS;
        });
    
        builder.addCase(getKasalar.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    },

    builderKasaEkle: function(builder: ActionReducerMapBuilder<TKasaInitialState>) {
        builder.addCase(kasaEkle.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;
        });

        builder.addCase(kasaEkle.fulfilled, (state, action: PayloadAction<TKasaInitialState>) => {
            state.loading = false;
            state.kasa = action.payload.kasa;
            state.status = StatusConsts.SUCCESS;
        });

        builder.addCase(kasaEkle.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    },

    builderKasaGuncelle: function(builder: ActionReducerMapBuilder<TKasaInitialState>) {
        builder.addCase(kasaGuncelle.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;
        });

        builder.addCase(kasaGuncelle.fulfilled, (state, action: PayloadAction<TKasaInitialState>) => {
            state.loading = false;
            state.kasa = action.payload.kasa;
            state.status = StatusConsts.SUCCESS;
        });

        builder.addCase(kasaGuncelle.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    },

    builderKasaSil: function(builder: ActionReducerMapBuilder<TKasaInitialState>) {
        builder.addCase(kasaSil.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;
        });

        builder.addCase(kasaSil.fulfilled, (state, action: PayloadAction<TKasaInitialState>) => {
            state.loading = false;
            state.kasa = action.payload.kasa;
            state.status = StatusConsts.SUCCESS;
        });

        builder.addCase(kasaSil.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    },

    builderKasaGetir: function(builder: ActionReducerMapBuilder<TKasaInitialState>) {
        builder.addCase(kasaGetir.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;
        });
        
        builder.addCase(kasaGetir.fulfilled, (state, action: PayloadAction<TKasaInitialState>) => {
            state.loading = false;
            state.kasa = action.payload.kasa;
            state.status = StatusConsts.SUCCESS;
        });
        
        builder.addCase(kasaGetir.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    }
}