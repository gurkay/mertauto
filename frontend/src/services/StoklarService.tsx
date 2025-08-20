import { StokContent } from "@/types/MyTypes.d";
import HttpService from "./HttpService";

const StoklarService = {
    getStoklar: async (pageNum: number, sortField: string, sortDir: string, keyword: string) => {
        console.log('pageNum::', pageNum);
        console.log('sortField::', sortField);
        console.log('sortDir::', sortDir);
        console.log('keyword::', keyword);
        const response = await HttpService.getAxiosInstance().get(`/api/stoklar/page/${pageNum + 1}?sortField=${sortField}&sortDir=${sortDir}&keyword=${keyword}`);
        return response.data;
    },

    stokEkle: async (stok: StokContent) => {
        const response = await HttpService.getAxiosInstance().post('/api/stoklar', stok);
        return response.data;
    },

    stokGuncelle: async (stok: StokContent) => {
        const response = await HttpService.getAxiosInstance().put(`/api/stoklar/${stok.id}`, stok);
        return response.data;
    },

    stokSil: async (id: number) => {
        const response = await HttpService.getAxiosInstance().delete(`/api/stoklar/${id}`);
        return response.data;
    },

    stokGetir: async (id: number) => {
        const response = await HttpService.getAxiosInstance().get(`/api/stoklar/${id}`);
        return response.data;
    }
}

export default StoklarService;