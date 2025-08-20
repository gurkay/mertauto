
import AraclarService from "@/services/AraclarService";
import { AracContent } from "@/types/MyTypes.d";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface IFindByParams {
  pageNum: number;
  sortField: string;
  sortDir: string;
  keyword: string;
}

export const getAraclar = createAsyncThunk('getAraclar', async ({ pageNum, sortField, sortDir, keyword }: IFindByParams) => {
    const response = await AraclarService.getAraclar(pageNum, sortField, sortDir, keyword);
    return response;
  }
);

export const aracEkle = createAsyncThunk('aracEkle', async (arac: AracContent) => {
    const response = await AraclarService.aracEkle(arac);
    return response;
  }
);

export const aracGuncelle = createAsyncThunk('aracGuncelle', async (arac: AracContent) => {
    const response = await AraclarService.aracGuncelle(arac);
    return response;
  }
);

export const aracSil = createAsyncThunk('aracSil', async (id: number) => {
    const response = await AraclarService.aracSil(id);
    return response;
  }
);

export const aracGetir = createAsyncThunk('aracGetir', async (id: number) => {
    const response = await AraclarService.aracGetir(id);
    return response;
  }
);
