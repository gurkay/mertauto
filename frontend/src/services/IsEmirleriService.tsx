import { IsEmriContent, IsEmriDetayContent, StokContent } from "@/types/MyTypes.d";
import HttpService from "./HttpService";

const IsEmirleriService = {
    getIsEmirleri: async (pageNum: number, sortField: string, sortDir: string, keyword: string) => {
        const response = await HttpService.getAxiosInstance().get(`/api/isEmirleri/page/${pageNum + 1}?sortField=${sortField}&sortDir=${sortDir}&keyword=${keyword}`);
        return response.data;
    },

    isEmriEkle: async (isEmri: IsEmriContent) => {
        const response = await HttpService.getAxiosInstance().post('/api/isEmirleri', isEmri);
        return response.data;
    },

    isEmriGuncelle: async (isEmri: IsEmriContent) => {
        const response = await HttpService.getAxiosInstance().put(`/api/isEmirleri/${isEmri.id}`, isEmri);
        return response.data;
    },

    isEmriSil: async (id: number) => {
        const response = await HttpService.getAxiosInstance().delete(`/api/isEmirleri/${id}`);
        return response.data;
    },

    isEmriGetir: async (id: number) => {
        
        const response = await HttpService.getAxiosInstance().get(`/api/isEmirleri/${id}`);
        console.log("services:::isEmriGetir:::response", response.data);
        return response.data;
    },

    isEmriDetayEkle: async (isEmriDetay: IsEmriDetayContent) => {
        console.log('isEmriDetay', isEmriDetay);
        const response = await HttpService.getAxiosInstance().post('/api/isEmirleri/detay', isEmriDetay);
        console.log('response.data', response.data);
        return response.data;
    },

    isEmriDetaySil: async (id: number) => {
        const response = await HttpService.getAxiosInstance().delete(`/api/isEmirleri/detay/${id}`);
        return response.data;
    },

    isEmriDetayGetir: async (isEmriId: number) => {
        const response = await HttpService.getAxiosInstance().get(`/api/isEmirleri/detay/${isEmriId}`);
        console.log('response.data', response.data);
        return response.data;
    }
}

export default IsEmirleriService;