import { KasaContent, StokContent } from "@/types/MyTypes.d";
import HttpService from "./HttpService";

const KasaService = {
    getKasalar: async (pageNum: number, sortField: string, sortDir: string, keyword: string) => {
        console.log('pageNum::', pageNum);
        console.log('sortField::', sortField);
        console.log('sortDir::', sortDir);
        console.log('keyword::', keyword);
        const response = await HttpService.getAxiosInstance().get(`/api/kasa/page/${pageNum + 1}?sortField=${sortField}&sortDir=${sortDir}&keyword=${keyword}`);
        return response.data;
    },

    kasaEkle: async (kasa: KasaContent) => {
        const response = await HttpService.getAxiosInstance().post('/api/kasa', kasa);
        return response.data;
    },

    kasaGuncelle: async (kasa: KasaContent) => {
        const response = await HttpService.getAxiosInstance().put(`/api/kasa/${kasa.id}`, kasa);
        return response.data;
    },

    kasaSil: async (id: number) => {
        const response = await HttpService.getAxiosInstance().delete(`/api/kasa/${id}`);
        return response.data;
    },

    kasaGetir: async (id: number) => {
        const response = await HttpService.getAxiosInstance().get(`/api/kasa/${id}`);
        return response.data;
    }
}

export default KasaService;