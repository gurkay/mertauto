import { AracContent, StokContent } from "@/types/MyTypes.d"

export const stokMapper = (data: any) => {

    const stok: StokContent = {
        id: data.id ? parseInt(data.id) : null,
        barkodNo: data.barkodNo,
        stokMarkasi: data.stokMarkasi,
        stokAdi: data.stokAdi,
        miktar: data.miktar,
        birimFiyati: data.birimFiyati,
        birim: data.birim,
        rafKodu: data.rafKodu,
        aciklama: data.aciklama,
    }

    return stok;
}
