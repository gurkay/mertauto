import { IUserDto } from "@/interfaces/dtos/user/IUserDto";

export type Marka = {
    id?: number;
    adi?: string;
    resim_url?: string | null;
    created_at?: string;
};

export type Model = {
    id?: number;
    marka?: Marka;
    adi?: string;
    resim_url?: string | null;
    created_at?: string;
};

export type MotorHacmi = {
    id?: number;
    adi?: string;
    created_at?: string;
};

export type YakitTuru = {
    id?: number;
    adi?: string;
    created_at?: string;
};

export type Sanziman = {
    id?: number;
    adi?: string;
    created_at?: string;
};

export type Sort = {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
};

export type Pageable = {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
};

export type AracDurumu = {
    id?: number;
    adi?: string;
};

export type YapilanIslem = {
    id?: number;
    adi?: string;
};

export type KasaIslemTuru = {
    id?: number;
    adi?: string;
};

export type KasaKategorileri = {
    id?: number;
    adi?: string;
};

export type KasaOdemeSekli = {
    id?: number;
    adi?: string;
};



export type IsEmriContent = {
    id?: number | null;
    isEmirNo?: string;
    aracKm?: number;
    arac?: AracContent;
    teknisyen?: IUserDto;
    danisman?: IUserDto;
    aracDurumu?: AracDurumu;
    yapilanIslem?: YapilanIslem;
    iskonto?: number;
    musteriTalep?: string;
    servisIslemOnNotlari?: string;
    servisIslemBitisNotlari?: string;
    servisIslemGizliNotlari?: string;
}

export type IsEmriDetayContent = {
    id?: number | null;
    isEmri?: IsEmriContent | null;
    stok?: StokContent | null;
    yapilanIslemAdi?: string;
    birimFiyati?: number;
    birim?: string;
    miktar?: number;
}

export type IsEmirleriRootObject = {
    content: IsEmriContent[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
};

export type AraclarRootObject = {
    content: AracContent[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
};

export type AracContent = {
    id?: number | null;
    model?: Model;
    motorHacmi?: MotorHacmi;
    yakitTuru?: YakitTuru;
    sanziman?: Sanziman;
    plaka?: string;
    sasiNo?: string;
    motorNo?: string;
    modelYili?: number;
    musteriTc?: string;
    musteriAdSoyad?: string;
    musteriTelefon?: string;
    musteriEmail?: string;
    musteriAdres?: string;
    musteriVergiDairesi?: string;
    araciTeslimEdenTc?: string;
    araciTeslimEdenAdSoyad?: string;
    araciTeslimEdenTelefon?: string;
};

export type TAraclarInitialState = {
    araclar: AraclarRootObject | null;
    arac: AracContent | null;
    mySearchText: string;
    loading: boolean;
    status: string;
    responseMessage: string;
};

export type StokContent = {
    id?: number | null;
    barkodNo?: string;
    stokMarkasi?: string;
    stokAdi?: string;
    miktar?: number;
    birimFiyati?: number;
    birim?: string;
    rafKodu?: string;
    aciklama?: string;
}

export type StoklarRootObject = {
    content: StokContent[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export type TStoklarInitialState = {
    stoklar: StoklarRootObject | null;
    stok: StokContent | null;
    mySearchText: string;
    loading: boolean;
    status: string;
    responseMessage: string;
}

export type TIsEmriInitialState = {
    isEmirleri: IsEmirleriRootObject | null;
    isEmri: IsEmriContent | null;
    isEmriDetaylar: IsEmriDetayContent[] | null;
    mySearchText: string;
    loading: boolean;
    status: string;
    responseMessage: string;
}

export type KasaContent = {
    id?: number | null;
    kasaIslemTuru?: KasaIslemTuru;
    kasaKategorileri?: KasaKategorileri;
    kasaOdemeSekli?: KasaOdemeSekli;
    aciklama?: string;
    tarih?: string;
    tutar?: number;
}

export type KasaRootObject = {
    content: KasaContent[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export type TKasaInitialState = {
    kasalar: KasaRootObject | null;
    kasa: KasaContent | null;
    mySearchText: string;
    loading: boolean;
    status: string;
    responseMessage: string;
}