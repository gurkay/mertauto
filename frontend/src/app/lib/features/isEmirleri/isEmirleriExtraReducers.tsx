import { StatusConsts } from "@/constants/StatusConsts";
import { IsEmirleriRootObject, IsEmriDetayContent, StoklarRootObject, TIsEmriInitialState } from "@/types/MyTypes.d";
import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { isEmriEkle, isEmriGetir, isEmriGuncelle, isEmriSil, getIsEmirleri, isEmriDetayEkle, isEmriDetaySil, isEmriDetayGetir } from "./isEmirleriCreateAsyncThunk";

export const isEmirleriExtraReducers = {
    builderGetIsEmirleri: function(builder: ActionReducerMapBuilder<TIsEmriInitialState>) {

        builder.addCase(getIsEmirleri.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;

        });
    
        builder.addCase(getIsEmirleri.fulfilled, (state, action: PayloadAction<IsEmirleriRootObject>) => {
            state.loading = false;
            state.isEmirleri = action.payload;
            state.status = StatusConsts.SUCCESS;
        });
    
        builder.addCase(getIsEmirleri.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    },

    builderIsEmriEkle: function(builder: ActionReducerMapBuilder<TIsEmriInitialState>) {
        builder.addCase(isEmriEkle.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;
        });

        builder.addCase(isEmriEkle.fulfilled, (state, action: PayloadAction<TIsEmriInitialState>) => {
            state.loading = false;
            state.isEmri = action.payload.isEmri;
            state.status = StatusConsts.SUCCESS;
        });

        builder.addCase(isEmriEkle.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    },

    builderIsEmriGuncelle: function(builder: ActionReducerMapBuilder<TIsEmriInitialState>) {
        builder.addCase(isEmriGuncelle.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;
        });

        builder.addCase(isEmriGuncelle.fulfilled, (state, action: PayloadAction<TIsEmriInitialState>) => {
            state.loading = false;
            state.isEmri = action.payload.isEmri;
            state.status = StatusConsts.SUCCESS;
        });

        builder.addCase(isEmriGuncelle.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    },

    builderIsEmriSil: function(builder: ActionReducerMapBuilder<TIsEmriInitialState>) {
        builder.addCase(isEmriSil.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;
        });

        builder.addCase(isEmriSil.fulfilled, (state, action: PayloadAction<TIsEmriInitialState>) => {
            state.loading = false;
            state.isEmri = action.payload.isEmri;
            state.status = StatusConsts.SUCCESS;
        });

        builder.addCase(isEmriSil.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    },

    builderIsEmriGetir: function(builder: ActionReducerMapBuilder<TIsEmriInitialState>) {
        builder.addCase(isEmriGetir.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;
        });
        
        builder.addCase(isEmriGetir.fulfilled, (state, action: PayloadAction<TIsEmriInitialState>) => {
            state.loading = false;
            state.isEmri = action.payload.isEmri;
            state.status = StatusConsts.SUCCESS;
        });
        
        builder.addCase(isEmriGetir.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    },

    builderIsEmriDetayEkle: function(builder: ActionReducerMapBuilder<TIsEmriInitialState>) {
        builder.addCase(isEmriDetayEkle.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;
        });

        builder.addCase(isEmriDetayEkle.fulfilled, (state, action: PayloadAction<TIsEmriInitialState>) => {
            state.loading = false;
            state.isEmriDetaylar = action.payload.isEmriDetaylar;
            state.status = StatusConsts.SUCCESS;
        });

        builder.addCase(isEmriDetayEkle.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    },

    builderIsEmriDetaySil: function(builder: ActionReducerMapBuilder<TIsEmriInitialState>) {
        builder.addCase(isEmriDetaySil.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;
        });

        builder.addCase(isEmriDetaySil.fulfilled, (state, action: PayloadAction<TIsEmriInitialState>) => {
            state.loading = false;
            state.status = StatusConsts.SUCCESS;
        });

        builder.addCase(isEmriDetaySil.rejected, (state) => {   
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    },

    builderIsEmriDetayGetir: function(builder: ActionReducerMapBuilder<TIsEmriInitialState>) {
        builder.addCase(isEmriDetayGetir.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;
        });

        builder.addCase(isEmriDetayGetir.fulfilled, (state, action: PayloadAction<IsEmriDetayContent[]>) => {
            console.log('action.payload.isEmriDetaylar', action.payload);
            state.loading = false;
            state.isEmriDetaylar = action.payload;
            state.status = StatusConsts.SUCCESS;
        });

        builder.addCase(isEmriDetayGetir.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    }
    
}