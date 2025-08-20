import HttpService from "./HttpService";

const ParametrelerService = {
    markalar: async () => {
        const response = await HttpService.getAxiosInstance().get('/api/parametreler/markalar');
        return response.data;
    },

    modeller: async (markaId: number) => {
        const response = await HttpService.getAxiosInstance().get(`/api/parametreler/modeller/${markaId}`);
        return response.data;
    },

    motorHacimleri: async () => {
        const response = await HttpService.getAxiosInstance().get('/api/parametreler/motor-hacimleri');
        return response.data;
    },
    
    yakitTurleri: async () => {
        const response = await HttpService.getAxiosInstance().get('/api/parametreler/yakit-turleri');
        return response.data;
    },

    sanzimanlar: async () => {
        const response = await HttpService.getAxiosInstance().get('/api/parametreler/sanzimanlar');
        return response.data;
    }
}

export default ParametrelerService;