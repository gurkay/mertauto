import { KasaContent } from "@/types/MyTypes.d"

export const kasaMapper = (data: any) => {

    const kasa: KasaContent = {
        id: data.id ? parseInt(data.id) : null,
        kasaIslemTuru: data.kasaIslemTuru,
        kasaKategorileri: data.kasaKategorileri,
        kasaOdemeSekli: data.kasaOdemeSekli,
        aciklama: data.aciklama,
        tarih: data.tarih,
        tutar: data.tutar,
    }

    return kasa;
}
