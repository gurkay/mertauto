"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { KasaContent } from "@/types/MyTypes.d";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/lib/features/store";
import { useRouter } from "next/navigation";

import { FiArrowLeft } from "react-icons/fi";
import { kasaEkle, kasaGuncelle } from "@/app/lib/features/kasa/kasaCreateAsyncThunk";
import { kasaMapper } from "@/mapper/kasa/kasaMapper";
import { kasaIslemTurleri, kasaKategorileri, kasaOdemeSekli } from "@/constants/KasaConsts";


// Form validation schema
const kasaSchema = z.object({
    id: z.string().optional(),
    kasaIslemTuru: z.string().min(1, "Kasa işlem türü zorunlu"),
    kasaKategorileri: z.string().min(1, "Kasa kategorisi zorunlu"),
    kasaOdemeSekli: z.string().min(1, "Kasa ödeme şekli zorunlu"),
    aciklama: z.string().optional(),
    tarih: z.string().min(1, "Tarih zorunlu"),
    tutar: z.number().min(1, "Tutar zorunlu"),
});

type KasaFormData = z.infer<typeof kasaSchema>;

interface IProps {
    kasa?: KasaContent | null;
    action?: string;
    id?: string;
    title?: string;
}

export default function Kasa(props: IProps) {
    const dispatch = useDispatch<AppDispatch>();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<KasaFormData>({
        resolver: zodResolver(kasaSchema),
        defaultValues: {
            id: props.kasa?.id?.toString() || "",
            kasaIslemTuru: props.kasa?.kasaIslemTuru?.adi || "",
            kasaKategorileri: props.kasa?.kasaKategorileri?.adi || "",
            kasaOdemeSekli: props.kasa?.kasaOdemeSekli?.adi || "",
            aciklama: props.kasa?.aciklama || "",
            tarih: props.kasa?.tarih || "",
            tutar: props.kasa?.tutar || 0,
        },
    });
    const router = useRouter();

    const onSubmit = async (data: KasaFormData) => {
        try {

            if (props.kasa?.id) {
                await dispatch(kasaGuncelle(kasaMapper(data)));
            } else {
                await dispatch(kasaEkle(kasaMapper(data)));
            }

            alert("Kasa başarıyla eklendi!");
            reset();
            router.back();
        } catch (error) {
            console.error("Form gönderme hatası:", error);
            alert("Kasa eklenirken bir hata oluştu!");
        }
    };

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
                        {/* Stok Bilgileri */}
                        <div className="bg-gray-50 p-4 rounded-md">
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">Kasa Bilgileri</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="space-y-1">
                                    <label htmlFor="kasaIslemTuru" className="block text-sm font-medium text-gray-700">
                                        Kasa İşlem Türü*
                                    </label>
                                    <select
                                        id="kasaIslemTuru"
                                        {...register("kasaIslemTuru")}
                                        className={`text-black w-full px-3 py-2 border rounded-md ${errors.kasaIslemTuru ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        disabled={props.action === "detay"}
                                    >
                                        <option value="">Seçiniz</option>
                                        {kasaIslemTurleri.map((kasaIslemTuru) => (
                                            <option key={kasaIslemTuru.id} value={kasaIslemTuru.adi}>
                                                {kasaIslemTuru.adi}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.kasaIslemTuru && (
                                        <p className="text-red-500 text-xs">{errors.kasaIslemTuru.message}</p>
                                    )}
                                </div>
                                
                                <div className="space-y-1">
                                    <label htmlFor="kasaKategorileri" className="block text-sm font-medium text-gray-700">
                                        Kasa Kategorisi*
                                    </label>
                                    <select
                                        id="kasaKategorileri"
                                        {...register("kasaKategorileri")}
                                        className={`text-black w-full px-3 py-2 border rounded-md ${errors.kasaKategorileri ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        disabled={props.action === "detay"}
                                    >
                                        <option value="">Seçiniz</option>
                                        {kasaKategorileri.map((kasaKategorileri) => (
                                            <option key={kasaKategorileri.id} value={kasaKategorileri.adi}>
                                                {kasaKategorileri.adi}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.kasaIslemTuru && (
                                        <p className="text-red-500 text-xs">{errors.kasaIslemTuru.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="kasaOdemeSekli" className="block text-sm font-medium text-gray-700">
                                        Kasa Ödeme Şekli*
                                    </label>
                                    <select
                                        id="kasaOdemeSekli"
                                        {...register("kasaOdemeSekli")}
                                        className={`text-black w-full px-3 py-2 border rounded-md ${errors.kasaOdemeSekli ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        disabled={props.action === "detay"}
                                    >
                                        <option value="">Seçiniz</option>
                                        {kasaOdemeSekli.map((kasaOdemeSekli) => (
                                            <option key={kasaOdemeSekli.id} value={kasaOdemeSekli.adi}>
                                                {kasaOdemeSekli.adi}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.kasaOdemeSekli && (
                                        <p className="text-red-500 text-xs">{errors.kasaOdemeSekli.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="tutar" className="block text-sm font-medium text-gray-700">
                                        Tutar*
                                    </label>
                                    <input
                                        type="number"
                                        id="tutar"
                                        {...register("tutar", { valueAsNumber: true })}
                                        step="0.01"
                                        className={`text-black w-full px-3 py-2 border rounded-md ${errors.tutar ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        disabled={props.action === "detay"}
                                    />
                                    {errors.tutar && (
                                        <p className="text-red-500 text-xs">{errors.tutar.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="tarih" className="block text-sm font-medium text-gray-700">
                                        Tarih*
                                    </label>
                                    <input
                                        type="date"
                                        id="tarih"
                                        {...register("tarih", { valueAsNumber: true })}
                                        className={`text-black w-full px-3 py-2 border rounded-md ${errors.tarih ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        disabled={props.action === "detay"}
                                    />
                                    {errors.tarih && (
                                        <p className="text-red-500 text-xs">{errors.tarih.message}</p>
                                    )}
                                </div>



                                <div className="space-y-1">
                                    <label htmlFor="aciklama" className="block text-sm font-medium text-gray-700">
                                        Açıklama
                                    </label>
                                    <input
                                        type="text"
                                        id="aciklama"
                                        {...register("aciklama")}
                                        className={`text-black w-full px-3 py-2 border rounded-md ${errors.aciklama ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    />
                                </div>

                            </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                            {
                                props.action !== "detail" &&
                                <button
                                    type="submit"
                                    className="px-6 py-2 border border-blue-300 rounded-md text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {props.kasa?.id ? "Güncelle" : "Kaydet"}
                                </button>
                            }
                            <button
                                type="button"
                                onClick={() => router.back()}
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