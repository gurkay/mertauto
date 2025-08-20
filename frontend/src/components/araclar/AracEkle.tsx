"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Marka, Model, MotorHacmi, YakitTuru, Sanziman, AracContent } from "@/types/MyTypes.d";
import { useDispatch } from "react-redux";
import { aracEkle, aracGuncelle } from "@/app/lib/features/araclar/araclarCreateAsyncThunk";
import { AppDispatch } from "@/app/lib/features/store";
import { useRouter } from "next/navigation";
import { aracMapper } from "@/mapper/arac/aracMapper";

import { FiArrowLeft, FiChevronLeft } from "react-icons/fi";

// Form validation schema
const aracSchema = z.object({
    id: z.string().optional(),
    plaka_no: z.string().min(1, "Plaka no zorunlu").max(15),
    sase_no: z.string().min(1, "Şase no zorunlu"),
    motor_no: z.string().min(1, "Motor no zorunlu"),
    model_yili: z.string().min(1, "Model yılı zorunlu").refine((val) => /^\d{4}$/.test(val), "Model yılı 4 haneli sayısal olmalıdır"),
    yakit_turu_id: z.string().min(1, "Yakıt türü seçiniz"),
    marka_id: z.string().min(1, "Marka seçiniz"),
    model_id: z.string().min(1, "Model seçiniz"),
    motor_hacmi_id: z.string().min(1, "Motor hacmi seçiniz"),
    sansiman_id: z.string().min(1, "Şanzıman seçiniz"),
    musteri_tc: z.string().min(11, "TC no 11 haneli olmalıdır").max(11),
    musteri_ad_soyad: z.string().min(1, "Müşteri adı soyadı zorunlu"),
    musteri_telefon: z.string().min(10, "Telefon numarası geçerli değil"),
    musteri_adresi: z.string().min(1, "Müşteri adresi zorunlu"),
    araci_teslim_eden_tc: z.string().optional(),
    araci_teslim_eden_ad_soyad: z.string().optional(),
    araci_teslim_eden_telefon: z.string().optional(),
    vergi_dairesi: z.string().optional(),
    email_adresi: z.string().email("Geçerli bir email adresi giriniz").optional(),
});

type AracFormData = z.infer<typeof aracSchema>;

interface IProps {
    dataSanzimanlar: Sanziman[];
    dataMarkalar: Marka[];
    dataModeller: Model[];
    dataMotorHacimleri: MotorHacmi[];
    dataYakitTurleri: YakitTuru[];
    arac?: AracContent | null;
    slug?: string;
    title?: string;
}

function AracEkle(props: IProps) {
    const [availableModels, setAvailableModels] = useState<Model[]>([]);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<AracFormData>({
        resolver: zodResolver(aracSchema),
        defaultValues: {
            id: props.arac?.id?.toString() || "",
            plaka_no: props.arac?.plaka || "",
            sase_no: props.arac?.sasiNo || "",
            motor_no: props.arac?.motorNo || "",
            model_yili: props.arac?.modelYili?.toString() || "",
            yakit_turu_id: props.arac?.yakitTuru?.id?.toString() || "",
            marka_id: props.arac?.model?.marka?.id?.toString() || "",
            model_id: props.arac?.model?.id?.toString() || "",
            motor_hacmi_id: props.arac?.motorHacmi?.id?.toString() || "",
            sansiman_id: props.arac?.sanziman?.id?.toString() || "",
            musteri_tc: props.arac?.musteriTc || "",
            musteri_ad_soyad: props.arac?.musteriAdSoyad || "",
            musteri_telefon: props.arac?.musteriTelefon || "",
            musteri_adresi: props.arac?.musteriAdres || "",
            araci_teslim_eden_tc: props.arac?.araciTeslimEdenTc || "",
            araci_teslim_eden_ad_soyad: props.arac?.araciTeslimEdenAdSoyad || "",
            araci_teslim_eden_telefon: props.arac?.araciTeslimEdenTelefon || "",
            vergi_dairesi: props.arac?.musteriVergiDairesi || "",
            email_adresi: props.arac?.musteriEmail || "",
        },
    });

    const selectedMarka = watch("marka_id");

    useEffect(() => {

        if (selectedMarka) {
            const filteredModels = props.dataModeller.filter((model: Model) => model?.marka?.id === parseInt(selectedMarka));
            setAvailableModels(filteredModels);
        } else {
            setAvailableModels([]);
        }
    }, [selectedMarka]);

    // Add a new useEffect to initialize models when props.arac exists
    useEffect(() => {
        // Initialize models from props when an existing arac is loaded
        if (props.arac === null) {
            return;
        }
        const markaId = props.arac?.model?.marka?.id;
        const filteredModels = props.dataModeller.filter((model: Model) => model?.marka?.id === markaId);
        setAvailableModels(filteredModels);

    }, [props.arac]);

    const onSubmit = async (data: AracFormData) => {
        try {

            if (props.arac) {
                await dispatch(aracGuncelle(aracMapper(data)));
            } else {
                await dispatch(aracEkle(aracMapper(data)));
            }

            alert("Araç başarıyla eklendi!");
            reset();
            router.back();
        } catch (error) {
            console.error("Form gönderme hatası:", error);
            alert("Araç eklenirken bir hata oluştu!");
        }
    };

    if (props.arac && availableModels.length === 0) {
        return (
            <div className="bg-gray-50 min-h-screen py-8">
                <div className="container mx-auto max-w-7xl px-4 py-16 sm:py-24">
                    <div className="p-8 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Araçlar yükleniyor...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container mx-auto max-w-7xl px-4 py-16 sm:py-24">
                <div className="bg-gray-200 rounded-lg shadow-md p-6 mb-8">
                    <button
                        onClick={() => router.back()}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md font-medium transition duration-200 flex items-center"
                    >
                        <FiArrowLeft className="mr-4" />
                        {props.title}
                    </button>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        {/* Araç Bilgileri */}
                        <div className="bg-gray-50 p-4 rounded-md">
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">Araç Bilgileri</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="space-y-1">
                                    <label htmlFor="plaka_no" className="block text-sm font-medium text-gray-700">
                                        Plaka No*
                                    </label>
                                    <input
                                        type="text"
                                        id="plaka_no"
                                        {...register("plaka_no")}
                                        className={`text-black w-full px-3 py-2 border rounded-md ${errors.plaka_no ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        disabled={props.slug === "detay"}
                                    />
                                    {errors.plaka_no && (
                                        <p className="text-red-500 text-xs">{errors.plaka_no.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="sase_no" className="block text-sm font-medium text-gray-700">
                                        Şase No*
                                    </label>
                                    <input
                                        type="text"
                                        id="sase_no"
                                        {...register("sase_no")}
                                        className={`text-black w-full px-3 py-2 border rounded-md ${errors.sase_no ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        disabled={props.slug === "detay"}
                                    />
                                    {errors.sase_no && (
                                        <p className="text-red-500 text-xs">{errors.sase_no.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="motor_no" className="block text-sm font-medium text-gray-700">
                                        Motor No*
                                    </label>
                                    <input
                                        type="text"
                                        id="motor_no"
                                        {...register("motor_no")}
                                        className={`text-black w-full px-3 py-2 border rounded-md ${errors.motor_no ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        disabled={props.slug === "detay"}
                                    />
                                    {errors.motor_no && (
                                        <p className="text-red-500 text-xs">{errors.motor_no.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="model_yili" className="block text-sm font-medium text-gray-700">
                                        Model Yılı*
                                    </label>
                                    <input
                                        type="text"
                                        id="model_yili"
                                        {...register("model_yili")}
                                        className={`text-black w-full px-3 py-2 border rounded-md ${errors.model_yili ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        disabled={props.slug === "detay"}
                                    />
                                    {errors.model_yili && (
                                        <p className="text-red-500 text-xs">{errors.model_yili.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="marka_id" className="block text-sm font-medium text-gray-700">
                                        Marka*
                                    </label>
                                    <select
                                        id="marka_id"
                                        {...register("marka_id")}
                                        className={`text-black w-full px-3 py-2 border rounded-md ${errors.marka_id ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        disabled={props.slug === "detay"}
                                    >
                                        <option value="">Seçiniz</option>
                                        {props?.dataMarkalar?.map((marka: any) => (
                                            <option key={marka.id} value={marka.id}>
                                                {marka.adi}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.marka_id && (
                                        <p className="text-red-500 text-xs">{errors.marka_id.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="model_id" className="block text-sm font-medium text-gray-700">
                                        Model*
                                    </label>
                                    <select
                                        id="model_id"
                                        {...register("model_id")}
                                        className={`text-black w-full px-3 py-2 border rounded-md ${errors.model_id ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        disabled={props.slug === "detay"}
                                    >
                                        <option value="">Seçiniz</option>
                                        {
                                            availableModels?.map((model: any) => (
                                                <option key={model.id} value={model.id}>
                                                    {model.adi}
                                                </option>
                                            ))
                                        }
                                    </select>
                                    {errors.model_id && (
                                        <p className="text-red-500 text-xs">{errors.model_id.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="yakit_turu_id" className="block text-sm font-medium text-gray-700">
                                        Yakıt Türü*
                                    </label>
                                    <select
                                        id="yakit_turu_id"
                                        {...register("yakit_turu_id")}
                                        className={`text-black w-full px-3 py-2 border rounded-md ${errors.yakit_turu_id ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        disabled={props.slug === "detay"}
                                    >
                                        <option value="">Seçiniz</option>
                                        {props?.dataYakitTurleri?.map((yakit: any) => (
                                            <option key={yakit.id} value={yakit.id}>
                                                {yakit.adi}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.yakit_turu_id && (
                                        <p className="text-red-500 text-xs">{errors.yakit_turu_id.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="motor_hacmi_id" className="block text-sm font-medium text-gray-700">
                                        Motor Hacmi*
                                    </label>
                                    <select
                                        id="motor_hacmi_id"
                                        {...register("motor_hacmi_id")}
                                        className={`text-black w-full px-3 py-2 border rounded-md ${errors.motor_hacmi_id ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        disabled={props.slug === "detay"}
                                    >
                                        <option value="">Seçiniz</option>
                                        {props?.dataMotorHacimleri?.map((hacim: any) => (
                                            <option key={hacim.id} value={hacim.id}>
                                                {hacim.adi}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.motor_hacmi_id && (
                                        <p className="text-red-500 text-xs">{errors.motor_hacmi_id.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="sansiman_id" className="block text-sm font-medium text-gray-700">
                                        Şanzıman*
                                    </label>
                                    <select
                                        id="sansiman_id"
                                        {...register("sansiman_id")}
                                        className={`text-black w-full px-3 py-2 border rounded-md ${errors.sansiman_id ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        disabled={props.slug === "detay"}
                                    >
                                        <option value="">Seçiniz</option>
                                        {props?.dataSanzimanlar?.map((sanziman: any) => (
                                            <option key={sanziman.id} value={sanziman.id}>
                                                {sanziman.adi}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.sansiman_id && (
                                        <p className="text-red-500 text-xs">{errors.sansiman_id.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Müşteri Bilgileri */}
                        <div className="bg-gray-50 p-4 rounded-md">
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">Müşteri Bilgileri</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label htmlFor="musteri_tc" className="block text-sm font-medium text-gray-700">
                                        TC Kimlik No*
                                    </label>
                                    <input
                                        type="text"
                                        id="musteri_tc"
                                        {...register("musteri_tc")}
                                        className={`text-black w-full px-3 py-2 border rounded-md ${errors.musteri_tc ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        maxLength={11}
                                        disabled={props.slug === "detay"}
                                    />
                                    {errors.musteri_tc && (
                                        <p className="text-red-500 text-xs">{errors.musteri_tc.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="musteri_ad_soyad" className="block text-sm font-medium text-gray-700">
                                        Ad Soyad*
                                    </label>
                                    <input
                                        type="text"
                                        id="musteri_ad_soyad"
                                        {...register("musteri_ad_soyad")}
                                        className={`text-black w-full px-3 py-2 border rounded-md ${errors.musteri_ad_soyad ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        disabled={props.slug === "detay"}
                                    />
                                    {errors.musteri_ad_soyad && (
                                        <p className="text-red-500 text-xs">{errors.musteri_ad_soyad.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="musteri_telefon" className="block text-sm font-medium text-gray-700">
                                        Telefon*
                                    </label>
                                    <input
                                        type="text"
                                        id="musteri_telefon"
                                        {...register("musteri_telefon")}
                                        className={`text-black w-full px-3 py-2 border rounded-md ${errors.musteri_telefon ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        disabled={props.slug === "detay"}
                                    />
                                    {errors.musteri_telefon && (
                                        <p className="text-red-500 text-xs">{errors.musteri_telefon.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="email_adresi" className="block text-sm font-medium text-gray-700">
                                        E-posta
                                    </label>
                                    <input
                                        type="email"
                                        id="email_adresi"
                                        {...register("email_adresi")}
                                        className={`text-black w-full px-3 py-2 border rounded-md ${errors.email_adresi ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        disabled={props.slug === "detay"}
                                    />
                                    {errors.email_adresi && (
                                        <p className="text-red-500 text-xs">{errors.email_adresi.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1 md:col-span-2">
                                    <label htmlFor="musteri_adresi" className="block text-sm font-medium text-gray-700">
                                        Adres*
                                    </label>
                                    <textarea
                                        id="musteri_adresi"
                                        {...register("musteri_adresi")}
                                        rows={3}
                                        className={`text-black w-full px-3 py-2 border rounded-md ${errors.musteri_adresi ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        disabled={props.slug === "detay"}
                                    ></textarea>
                                    {errors.musteri_adresi && (
                                        <p className="text-red-500 text-xs">{errors.musteri_adresi.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="vergi_dairesi" className="block text-sm font-medium text-gray-700">
                                        Vergi Dairesi
                                    </label>
                                    <input
                                        type="text"
                                        id="vergi_dairesi"
                                        {...register("vergi_dairesi")}
                                        className={`text-black w-full px-3 py-2 border rounded-md ${errors.vergi_dairesi ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        disabled={props.slug === "detay"}
                                    />
                                    {errors.vergi_dairesi && (
                                        <p className="text-red-500 text-xs">{errors.vergi_dairesi.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Aracı Teslim Eden Bilgileri */}
                        <div className="bg-gray-50 p-4 rounded-md">
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">Aracı Teslim Eden Bilgileri (Opsiyonel)</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label htmlFor="araci_teslim_eden_tc" className="block text-sm font-medium text-gray-700">
                                        TC Kimlik No
                                    </label>
                                    <input
                                        type="text"
                                        id="araci_teslim_eden_tc"
                                        {...register("araci_teslim_eden_tc")}
                                        className={`text-black w-full px-3 py-2 border rounded-md ${errors.araci_teslim_eden_tc ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        maxLength={11}
                                        disabled={props.slug === "detay"}
                                    />
                                    {errors.araci_teslim_eden_tc && (
                                        <p className="text-red-500 text-xs">{errors.araci_teslim_eden_tc.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="araci_teslim_eden_ad_soyad" className="block text-sm font-medium text-gray-700">
                                        Ad Soyad
                                    </label>
                                    <input
                                        type="text"
                                        id="araci_teslim_eden_ad_soyad"
                                        {...register("araci_teslim_eden_ad_soyad")}
                                        className={`text-black w-full px-3 py-2 border rounded-md ${errors.araci_teslim_eden_ad_soyad ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        disabled={props.slug === "detay"}
                                    />
                                    {errors.araci_teslim_eden_ad_soyad && (
                                        <p className="text-red-500 text-xs">{errors.araci_teslim_eden_ad_soyad.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="araci_teslim_eden_telefon" className="block text-sm font-medium text-gray-700">
                                        Telefon
                                    </label>
                                    <input
                                        type="text"
                                        id="araci_teslim_eden_telefon"
                                        {...register("araci_teslim_eden_telefon")}
                                        className={`text-black w-full px-3 py-2 border rounded-md ${errors.araci_teslim_eden_telefon ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        disabled={props.slug === "detay"}
                                    />
                                    {errors.araci_teslim_eden_telefon && (
                                        <p className="text-red-500 text-xs">{errors.araci_teslim_eden_telefon.message}</p>
                                    )}
                                </div>

                            </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <button
                                type="submit"
                                className="px-6 py-2 border border-blue-300 rounded-md text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {props.arac?.id ? "Güncelle" : "Kaydet"}
                            </button>
                            <button
                                type="button"
                                onClick={() => router.push("/dashboard/arac-islemleri")}
                                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Kapat
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AracEkle;