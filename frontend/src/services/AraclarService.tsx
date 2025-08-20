import HttpService from "./HttpService";
import { AracContent } from "@/types/MyTypes.d";
const AraclarService = {
    getAraclar: async (pageNum: number, sortField: string, sortDir: string, keyword: string) => {
        const response = await HttpService.getAxiosInstance().get(`/api/araclar/page/${pageNum + 1}?sortField=${sortField}&sortDir=${sortDir}&keyword=${keyword}`);
        return response.data;
    },

    aracEkle: async (arac: AracContent) => {
        const response = await HttpService.getAxiosInstance().post('/api/araclar', arac);
        return response.data;
    },

    aracGuncelle: async (arac: AracContent) => {
        const response = await HttpService.getAxiosInstance().put(`/api/araclar/${arac.id}`, arac);
        return response.data;
    },

    aracSil: async (id: number) => { 
        const response = await HttpService.getAxiosInstance().delete(`/api/araclar/${id}`);
        return response.data;
    },

    aracGetir: async (id: number) => {
        const response = await HttpService.getAxiosInstance().get(`/api/araclar/${id}`);
        return response.data;
    }
}

export default AraclarService;
