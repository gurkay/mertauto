"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AracContent, AracDurumu, IsEmriContent, IsEmriDetayContent, YapilanIslem } from "@/types/MyTypes.d";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/lib/features/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isEmriDetayEkle, isEmriDetayGetir, isEmriDetaySil, isEmriEkle, isEmriGetir, isEmriGuncelle } from "@/app/lib/features/isEmirleri/isEmirleriCreateAsyncThunk";
import { isEmriDetayMapper, isEmriMapper } from "@/mapper/isEmri/isEmriMapper";
import { IUserDto } from "@/interfaces/dtos/user/IUserDto";
import { IsEmriFormData, isEmriSchema, parcaIscilikSchema, ParcaIscilikFormData } from "@/types/MyZodForm.d";
import { generateOrderNumber } from "@/utils/generateOrderNumber";
import { setIsEmriDetaylar } from "@/app/lib/features/isEmirleri/isEmirleriSlice";
import ReportsPage from "../reports/ReportsPage";
import IsEmriForm from "./IsEmriForm";

interface IProps {
    isEmri?: IsEmriContent | null;
    dataTeknisyenler: IUserDto[];
    dataDanismanlar: IUserDto[];
    dataAracDurumlar: AracDurumu[];
    dataYapilanIslemler: YapilanIslem[];
    action?: string;
    id?: string;
    title?: string;
    arac?: AracContent;
}

export default function IsEmri(props: IProps) {
    const dispatch = useDispatch<AppDispatch>();
    const { isEmri, isEmriDetaylar, loading: isEmriDetaylarLoading } = useSelector((state: RootState) => state.isEmirleriReducer);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPrintMode, setIsPrintMode] = useState(false);
    const [parcaToplamFiyat, setParcaToplamFiyat] = useState(0);
    const [iscilikToplamFiyat, setIscilikToplamFiyat] = useState(0);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IsEmriFormData>({
        resolver: zodResolver(isEmriSchema),
        defaultValues: {
            id: props.isEmri?.id?.toString() || "",
            isEmirNo: props.isEmri?.isEmirNo || "",
            aracKm: props.isEmri?.aracKm || 0,
            arac_id: props.arac?.id?.toString() || "",
            teknisyen_id: props.isEmri?.teknisyen?.id?.toString() || "",
            danisman_id: props.isEmri?.danisman?.id?.toString() || "",
            aracDurumu_id: props.isEmri?.aracDurumu?.id?.toString() || "",
            yapilanIslem_id: props.isEmri?.yapilanIslem?.id?.toString() || "",
            iskonto: props.isEmri?.iskonto || 0,
            musteriTalep: props.isEmri?.musteriTalep || "",
            servisIslemOnNotlari: props.isEmri?.servisIslemOnNotlari || "",
            servisIslemBitisNotlari: props.isEmri?.servisIslemBitisNotlari || "",
            servisIslemGizliNotlari: props.isEmri?.servisIslemGizliNotlari || "",
        },
    });

    // Form for parts and labor
    const {
        register: registerParcaIscilik,
        handleSubmit: handleSubmitParcaIscilik,
        reset: resetParcaIscilik,
        formState: { errors: errorsParcaIscilik },
    } = useForm<ParcaIscilikFormData>({
        resolver: zodResolver(parcaIscilikSchema),
        defaultValues: {
            yapilanIslemAdi: "",
            birimFiyati: 0,
            birim: "",
            miktar: 0,
        },
    });

    const init = async () => {
        if (props.isEmri?.id) {
            await dispatch(isEmriDetayGetir(props.isEmri.id!));
        }
    }

    useEffect(() => {
        init();
    }, [dispatch]);

    useEffect(() => {
        console.log('useEffect:::props.isEmri.id:::', isEmri?.id);

        if (isEmriDetaylar !== null && isEmriDetaylar !== undefined) {
            console.log('isEmriDetaylar:::', isEmriDetaylar);
            let parcaToplamCalculated = 0;
            let iscilikToplamCalculated = 0;

            isEmriDetaylar.forEach(item => {
                if (item.stok) {
                    parcaToplamCalculated += (item.stok?.birimFiyati ?? 0) * (item.miktar ?? 0);
                } else {
                    iscilikToplamCalculated += (item.birimFiyati ?? 0) * (item.miktar ?? 0);
                }
            });

            setParcaToplamFiyat(parcaToplamCalculated);
            setIscilikToplamFiyat(iscilikToplamCalculated);

        }

    }, [isEmriDetaylar]);

    useEffect(() => {

        console.log('props.isEmri', props.isEmri);
        if (props.isEmri) {
            dispatch(isEmriDetayGetir(props.isEmri.id!));
        }
    }, [props.isEmri]);

    useEffect(() => {
        // Set the page title
        document.title = "İş Emirleri Raporu";
        
        if (isPrintMode) {
            // Hide header with CSS
            const header = document.querySelector('header');
            if (header) header.style.display = 'none';
            
            // Optionally auto-print
            setTimeout(() => {
                window.print();
            }, 500);
            
            // Restore header when component unmounts
            return () => {
                const header = document.querySelector('header');
                if (header) header.style.display = '';
            };
        }
    }, [isPrintMode]);

    const handleDelete = (id: number) => {
        if (id >= 1) {
            dispatch(isEmriDetaySil(id));
        }
        const newIsEmriDetaylar = isEmriDetaylar?.filter(item => item.id !== id);
        dispatch(setIsEmriDetaylar(newIsEmriDetaylar));
    }

    const onSubmit = async (data: IsEmriFormData) => {
        try {

            if (props.isEmri?.id) {
                await dispatch(isEmriGuncelle(isEmriMapper(data)));
                isEmriDetaylar?.forEach(async (isEmriDetay) => {
                    if (isEmriDetay.id && isEmriDetay.id < 1) {
                        await dispatch(isEmriDetayEkle(isEmriDetayMapper(isEmriDetay)));
                    }
                });
            } else {
                data.isEmirNo = generateOrderNumber();
                await dispatch(isEmriEkle(isEmriMapper(data)));
            }

            alert("İş emir başarıyla eklendi!");
            reset();
            router.push("/dashboard/is-emirleri");
        } catch (error) {
            console.error("Form gönderme hatası:", error);
            alert("Stok eklenirken bir hata oluştu!");
        }
    };

    const onSubmitParcaIscilik = (data: ParcaIscilikFormData) => {
        console.log("Parça & İşçilik Verileri:", data);
        const radomId = Math.random();
        // Here you would add the item to the list/table or dispatch to Redux
        const isEmirleriDetayContent: IsEmriDetayContent = {
            id: Number(radomId.toFixed(6)),
            isEmri: props.isEmri ?? null,
            stok: null,
            yapilanIslemAdi: data.yapilanIslemAdi,
            birimFiyati: data.birimFiyati,
            miktar: data.miktar,
            birim: data.birim,
        }
        const newIsEmriDetaylar = [...(isEmriDetaylar ?? []), isEmirleriDetayContent];
        dispatch(setIsEmriDetaylar(newIsEmriDetaylar));
        setIsModalOpen(false);
        resetParcaIscilik();
    };

    const handlePrint = () => {
        setIsPrintMode(true);
    };

    return (
        <>
            {
                isPrintMode
                    ? <ReportsPage
                        isEmri={props.isEmri}
                        isEmriDetaylar={isEmriDetaylar ?? []}
                        dataTeknisyenler={props.dataTeknisyenler}
                        dataDanismanlar={props.dataDanismanlar}
                        dataAracDurumlar={props.dataAracDurumlar}
                        dataYapilanIslemler={props.dataYapilanIslemler}
                        parcaToplamFiyat={parcaToplamFiyat}
                        iscilikToplamFiyat={iscilikToplamFiyat}
                        arac={props.arac}
                        router={router}
                        title="Geri Dön"
                    />
                    : <IsEmriForm 
                        isEmri={props.isEmri ?? undefined}
                        isEmriDetaylar={isEmriDetaylar ?? []}
                        dataTeknisyenler={props.dataTeknisyenler}
                        dataDanismanlar={props.dataDanismanlar}
                        dataAracDurumlar={props.dataAracDurumlar}
                        dataYapilanIslemler={props.dataYapilanIslemler}
                        router={router}
                        handleDelete={handleDelete}
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        onSubmit={onSubmit}
                        onSubmitParcaIscilik={onSubmitParcaIscilik}
                        handleSubmit={handleSubmit}
                        register={register}
                        errors={errors}
                        registerParcaIscilik={registerParcaIscilik}
                        handleSubmitParcaIscilik={handleSubmitParcaIscilik}
                        errorsParcaIscilik={errorsParcaIscilik}
                        action={props.action || ""}
                        handlePrint={handlePrint}
                        arac={props.arac}
                        parcaToplamFiyat={parcaToplamFiyat}
                        setParcaToplamFiyat={setParcaToplamFiyat}
                        iscilikToplamFiyat={iscilikToplamFiyat}
                        setIscilikToplamFiyat={setIscilikToplamFiyat}
                    />
            }
        </>
    );
}