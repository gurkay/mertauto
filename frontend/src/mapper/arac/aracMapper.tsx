import { AracContent } from "@/types/MyTypes.d"

export const aracMapper = (data: any) => {

    const arac: AracContent = {
        id: data.id ? parseInt(data.id) : null,
        model: {
            id: parseInt(data.model_id),
        },
        motorHacmi: {
            id: parseInt(data.motor_hacmi_id),
        },
        yakitTuru: {
            id: parseInt(data.yakit_turu_id),
        },
        sanziman: {
            id: parseInt(data.sansiman_id),
        },
        plaka: data.plaka_no,
        sasiNo: data.sase_no,
        motorNo: data.motor_no,
        modelYili: parseInt(data.model_yili),
        musteriTc: data.musteri_tc,
        musteriAdSoyad: data.musteri_ad_soyad || "",
        musteriTelefon: data.musteri_telefon || "",
        musteriEmail: data.email_adresi || "",
        musteriAdres: data.musteri_adresi || "",
        musteriVergiDairesi: data.vergi_dairesi || "",
        araciTeslimEdenTc: data.araci_teslim_eden_tc || "",
        araciTeslimEdenAdSoyad: data.araci_teslim_eden_ad_soyad || "",
        araciTeslimEdenTelefon: data.araci_teslim_eden_telefon || "",
    }
    return arac;
}