import { StatusConsts } from "@/constants/StatusConsts";
import { AraclarRootObject, TAraclarInitialState, AracContent } from "@/types/MyTypes.d";
import { ServiceResult } from "@/interfaces/IRedux";
import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { aracEkle, aracGetir, aracGuncelle, aracSil, getAraclar } from "./araclarCreateAsyncThunk";



export const araclarExtraReducers = {
    builderGetAraclar: function(builder: ActionReducerMapBuilder<TAraclarInitialState>) {

        builder.addCase(getAraclar.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;

        });
    
        builder.addCase(getAraclar.fulfilled, (state, action: PayloadAction<ServiceResult<AraclarRootObject>>) => {
            state.loading = false;
            if (action.payload.success && action.payload.data) {
                state.araclar = action.payload.data;
                state.status = StatusConsts.SUCCESS;
            } else {
                state.status = StatusConsts.ERROR;
                state.responseMessage = action.payload.error?.message || 'Araçlar yüklenirken hata oluştu';
            }
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

        builder.addCase(aracEkle.fulfilled, (state, action: PayloadAction<ServiceResult<AracContent>>) => {
            state.loading = false;
            if (action.payload.success && action.payload.data) {
                state.arac = action.payload.data;
                state.status = StatusConsts.SUCCESS;
                state.responseMessage = 'Araç başarıyla eklendi';
            } else {
                state.status = StatusConsts.ERROR;
                state.responseMessage = action.payload.error?.message || 'Araç eklenirken hata oluştu';
            }
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

        builder.addCase(aracGuncelle.fulfilled, (state, action: PayloadAction<ServiceResult<AracContent>>) => {
            state.loading = false;
            if (action.payload.success && action.payload.data) {
                state.arac = action.payload.data;
                state.status = StatusConsts.SUCCESS;
                state.responseMessage = 'Araç başarıyla güncellendi';
            } else {
                state.status = StatusConsts.ERROR;
                state.responseMessage = action.payload.error?.message || 'Araç güncellenirken hata oluştu';
            }
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

        builder.addCase(aracSil.fulfilled, (state, action: PayloadAction<ServiceResult<void>>) => {
            state.loading = false;
            if (action.payload.success) {
                state.arac = null;
                state.status = StatusConsts.SUCCESS;
                state.responseMessage = 'Araç başarıyla silindi';
            } else {
                state.status = StatusConsts.ERROR;
                state.responseMessage = action.payload.error?.message || 'Araç silinirken hata oluştu';
            }
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
        
        builder.addCase(aracGetir.fulfilled, (state, action: PayloadAction<ServiceResult<AracContent>>) => {
            state.loading = false;
            if (action.payload.success && action.payload.data) {
                state.arac = action.payload.data;
                state.status = StatusConsts.SUCCESS;
            } else {
                state.status = StatusConsts.ERROR;
                state.responseMessage = action.payload.error?.message || 'Araç bilgileri alınırken hata oluştu';
            }
        });
        
        builder.addCase(aracGetir.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    }
}