import { IsEmriContent, IsEmriDetayContent } from "@/types/MyTypes.d"

export const isEmriMapper = (data: any) => {

    const isEmri: IsEmriContent = {
        id: data.id ? parseInt(data.id) : null,
        isEmirNo: data.isEmirNo,
        aracKm: data.aracKm,
        arac: {
            id: parseInt(data.arac_id)
        },
        teknisyen: {
            id: parseInt(data.teknisyen_id),
        },
        danisman: {
            id: parseInt(data.danisman_id),
        },
        aracDurumu: {
            id: parseInt(data.aracDurumu_id),
        },
        yapilanIslem: {
            id: parseInt(data.yapilanIslem_id),
        },
        iskonto: data.iskonto,
        musteriTalep: data.musteriTalep,
        servisIslemOnNotlari: data.servisIslemOnNotlari,
        servisIslemBitisNotlari: data.servisIslemBitisNotlari,
        servisIslemGizliNotlari: data.servisIslemGizliNotlari,
    }
    return isEmri;
}

export const  isEmriDetayMapper = (data: any) => {
    console.log('data', data);
    const isEmriDetay: IsEmriDetayContent = {
        id: data.id ? parseInt(data.id) : null,
        isEmri: {
            id: parseInt(data.isEmri.id),
        },
        stok: data.stok ? {id: parseInt(data.stok.id)} : null,
        yapilanIslemAdi: data.yapilanIslemAdi,
        birimFiyati: data.birimFiyati,
        miktar: data.miktar,
        birim: data.birim,
    }
    return isEmriDetay;
}