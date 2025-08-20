
import AraclarService from "@/services/AraclarService";
import StoklarService from "@/services/StoklarService";
import { AracContent, StokContent } from "@/types/MyTypes.d";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface IFindByParams {
  pageNum: number;
  sortField: string;
  sortDir: string;
  keyword: string;
}

export const getStoklar = createAsyncThunk('getStoklar', async ({ pageNum, sortField, sortDir, keyword }: IFindByParams) => {
    const response = await StoklarService.getStoklar(pageNum, sortField, sortDir, keyword);
    return response;
  }
);

export const stokEkle = createAsyncThunk('stokEkle', async (stok: StokContent) => {
    const response = await StoklarService.stokEkle(stok);
    return response;
  }
);

export const stokGuncelle = createAsyncThunk('stokGuncelle', async (stok: StokContent) => {
    const response = await StoklarService.stokGuncelle(stok);
    return response;
  }
);

export const stokSil = createAsyncThunk('stokSil', async (id: number) => {
    const response = await StoklarService.stokSil(id);
    return response;
  }
);

export const stokGetir = createAsyncThunk('stokGetir', async (id: number) => {
    const response = await StoklarService.stokGetir(id);
    return response;
  }
);
