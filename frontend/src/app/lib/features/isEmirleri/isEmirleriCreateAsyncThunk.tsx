
import IsEmirleriService from "@/services/IsEmirleriService";
import { IsEmriContent, IsEmriDetayContent } from "@/types/MyTypes.d";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface IFindByParams {
  pageNum: number;
  sortField: string;
  sortDir: string;
  keyword: string;
}

export const getIsEmirleri = createAsyncThunk('getIsEmirleri', async ({ pageNum, sortField, sortDir, keyword }: IFindByParams) => {
    const response = await IsEmirleriService.getIsEmirleri(pageNum, sortField, sortDir, keyword);
    return response;
  }
);

export const isEmriEkle = createAsyncThunk('isEmriEkle', async (isEmri: IsEmriContent) => {
    const response = await IsEmirleriService.isEmriEkle(isEmri);
    return response;
  }
);

export const isEmriGuncelle = createAsyncThunk('isEmriGuncelle', async (isEmri: IsEmriContent) => {
    const response = await IsEmirleriService.isEmriGuncelle(isEmri);
    return response;
  }
);

export const isEmriSil = createAsyncThunk('isEmriSil', async (id: number) => {
    const response = await IsEmirleriService.isEmriSil(id);
    return response;
  }
);

export const isEmriGetir = createAsyncThunk('isEmriGetir', async (id: number) => {
    const response = await IsEmirleriService.isEmriGetir(id);
    return response;
  }
);

export const isEmriDetayEkle = createAsyncThunk('isEmriDetayEkle', async (isEmriDetay: IsEmriDetayContent) => {
    const response = await IsEmirleriService.isEmriDetayEkle(isEmriDetay);
    return response;
  }
);

export const isEmriDetaySil = createAsyncThunk('isEmriDetaySil', async (id: number) => {
    const response = await IsEmirleriService.isEmriDetaySil(id);
    return response;
  }
);

export const isEmriDetayGetir = createAsyncThunk('isEmriDetayGetir', async (isEmriId: number) => {
    const response = await IsEmirleriService.isEmriDetayGetir(isEmriId);
    return response;
  }
);
