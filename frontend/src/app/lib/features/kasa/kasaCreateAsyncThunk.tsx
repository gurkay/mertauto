
import AraclarService from "@/services/AraclarService";
import KasaService from "@/services/KasaService";
import StoklarService from "@/services/StoklarService";
import { AracContent, KasaContent, StokContent } from "@/types/MyTypes.d";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface IFindByParams {
  pageNum: number;
  sortField: string;
  sortDir: string;
  keyword: string;
}

export const getKasalar = createAsyncThunk('getKasalar', async ({ pageNum, sortField, sortDir, keyword }: IFindByParams) => {
    const response = await KasaService.getKasalar(pageNum, sortField, sortDir, keyword);
    return response;
  }
);

export const kasaEkle = createAsyncThunk('kasaEkle', async (kasa: KasaContent) => {
    const response = await KasaService.kasaEkle(kasa);
    return response;
  }
);

export const kasaGuncelle = createAsyncThunk('kasaGuncelle', async (kasa: KasaContent) => {
    const response = await KasaService.kasaGuncelle(kasa);
    return response;
  }
);

export const kasaSil = createAsyncThunk('kasaSil', async (id: number) => {
    const response = await KasaService.kasaSil(id);
    return response;
  }
);

export const kasaGetir = createAsyncThunk('kasaGetir', async (id: number) => {
    const response = await KasaService.kasaGetir(id);
    return response;
  }
);
