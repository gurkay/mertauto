import { StatusConsts } from "@/constants/StatusConsts";
import { StoklarRootObject, TStoklarInitialState } from "@/types/MyTypes.d";
import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { stokEkle, stokGetir, stokGuncelle, stokSil, getStoklar } from "./stoklarCreateAsyncThunk";

export const stoklarExtraReducers = {
    builderGetStoklar: function(builder: ActionReducerMapBuilder<TStoklarInitialState>) {

        builder.addCase(getStoklar.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;

        });
    
        builder.addCase(getStoklar.fulfilled, (state, action: PayloadAction<StoklarRootObject>) => {
            state.loading = false;
            state.stoklar = action.payload;
            state.status = StatusConsts.SUCCESS;
        });
    
        builder.addCase(getStoklar.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    },

    builderStokEkle: function(builder: ActionReducerMapBuilder<TStoklarInitialState>) {
        builder.addCase(stokEkle.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;
        });

        builder.addCase(stokEkle.fulfilled, (state, action: PayloadAction<TStoklarInitialState>) => {
            state.loading = false;
            state.stok = action.payload.stok;
            state.status = StatusConsts.SUCCESS;
        });

        builder.addCase(stokEkle.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    },

    builderStokGuncelle: function(builder: ActionReducerMapBuilder<TStoklarInitialState>) {
        builder.addCase(stokGuncelle.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;
        });

        builder.addCase(stokGuncelle.fulfilled, (state, action: PayloadAction<TStoklarInitialState>) => {
            state.loading = false;
            state.stok = action.payload.stok;
            state.status = StatusConsts.SUCCESS;
        });

        builder.addCase(stokGuncelle.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    },

    builderStokSil: function(builder: ActionReducerMapBuilder<TStoklarInitialState>) {
        builder.addCase(stokSil.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;
        });

        builder.addCase(stokSil.fulfilled, (state, action: PayloadAction<TStoklarInitialState>) => {
            state.loading = false;
            state.stok = action.payload.stok;
            state.status = StatusConsts.SUCCESS;
        });

        builder.addCase(stokSil.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    },

    builderStokGetir: function(builder: ActionReducerMapBuilder<TStoklarInitialState>) {
        builder.addCase(stokGetir.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;
        });
        
        builder.addCase(stokGetir.fulfilled, (state, action: PayloadAction<TStoklarInitialState>) => {
            state.loading = false;
            state.stok = action.payload.stok;
            state.status = StatusConsts.SUCCESS;
        });
        
        builder.addCase(stokGetir.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    }
}