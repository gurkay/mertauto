"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StokContent } from "@/types/MyTypes.d";
import { useDispatch } from "react-redux";
import { stokEkle, stokGuncelle } from "@/app/lib/features/stoklar/stoklarCreateAsyncThunk";
import { AppDispatch } from "@/app/lib/features/store";
import { useRouter } from "next/navigation";

import { FiArrowLeft } from "react-icons/fi";
import { birimler } from "@/constants/StatusConsts";
import { stokMapper } from "@/mapper/stok/stokMapper";

// Form validation schema
const stokSchema = z.object({
    id: z.string().optional(),
    barkodNo: z.string().min(1, "Barkod no zorunlu"),
    stokMarkasi: z.string().min(1, "Stok markası zorunlu"),
    stokAdi: z.string().min(1, "Stok adı zorunlu"),
    miktar: z.number().min(1, "Miktar zorunlu"),
    birimFiyati: z.number().min(1, "Birim fiyatı zorunlu"),
    birim: z.string().min(1, "Birim zorunlu"),
    rafKodu: z.string().optional(),
    aciklama: z.string().optional(),
});

type StokFormData = z.infer<typeof stokSchema>;



interface IProps {
    stok?: StokContent | null;
    action?: string;
    id?: string;
    title?: string;
}

export default function Stok(props: IProps) {
    const dispatch = useDispatch<AppDispatch>();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<StokFormData>({
        resolver: zodResolver(stokSchema),
        defaultValues: {
            id: props.stok?.id?.toString() || "",
            barkodNo: props.stok?.barkodNo || "",
            stokMarkasi: props.stok?.stokMarkasi || "",
            stokAdi: props.stok?.stokAdi || "",
            miktar: props.stok?.miktar || 0,
            birimFiyati: props.stok?.birimFiyati || 0,
            birim: props.stok?.birim || "",
            rafKodu: props.stok?.rafKodu || "",
            aciklama: props.stok?.aciklama || "",
        },
    });
    const router = useRouter();

    const onSubmit = async (data: StokFormData) => {
        try {

            if (props.stok?.id) {
                await dispatch(stokGuncelle(stokMapper(data)));
            } else {
                await dispatch(stokEkle(stokMapper(data)));
            }

            alert("Stok başarıyla eklendi!");
            reset();
            router.back();
        } catch (error) {
            console.error("Form gönderme hatası:", error);
            alert("Stok eklenirken bir hata oluştu!");
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
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">Stok Bilgileri</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="space-y-1">
                                    <label htmlFor="barkodNo" className="block text-sm font-medium text-gray-700">
                                        Barkod No*
                                    </label>
                                    <input
                                        type="text"
                                        id="barkodNo"
                                        {...register("barkodNo")}
                                        className={`text-black w-full px-3 py-2 border rounded-md ${errors.barkodNo ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        disabled={props.action === "detay"}
                                    />
                                    {errors.barkodNo && (
                                        <p className="text-red-500 text-xs">{errors.barkodNo.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="stokMarkasi" className="block text-sm font-medium text-gray-700">
                                        Stok Markası*
                                    </label>
                                    <input
                                        type="text"
                                        id="stokMarkasi"
                                        {...register("stokMarkasi")}
                                        className={`text-black w-full px-3 py-2 border rounded-md ${errors.stokMarkasi ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        disabled={props.action === "detay"}
                                    />
                                    {errors.stokMarkasi && (
                                        <p className="text-red-500 text-xs">{errors.stokMarkasi.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="stokAdi" className="block text-sm font-medium text-gray-700">
                                        Stok Adı*
                                    </label>
                                    <input
                                        type="text"
                                        id="stokAdi"
                                        {...register("stokAdi")}
                                        className={`text-black w-full px-3 py-2 border rounded-md ${errors.stokAdi ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        disabled={props.action === "detay"}
                                    />
                                    {errors.stokAdi && (
                                        <p className="text-red-500 text-xs">{errors.stokAdi.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="birimFiyati" className="block text-sm font-medium text-gray-700">
                                        Birim Fiyatı*
                                    </label>
                                    <input
                                        type="number"
                                        id="birimFiyati"
                                        {...register("birimFiyati", { valueAsNumber: true })}
                                        step="0.01"
                                        className={`text-black w-full px-3 py-2 border rounded-md ${errors.birimFiyati ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        disabled={props.action === "detay"}
                                    />
                                    {errors.birimFiyati && (
                                        <p className="text-red-500 text-xs">{errors.birimFiyati.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="miktar" className="block text-sm font-medium text-gray-700">
                                        Miktar*
                                    </label>
                                    <input
                                        type="number"
                                        id="miktar"
                                        {...register("miktar", { valueAsNumber: true })}
                                        className={`text-black w-full px-3 py-2 border rounded-md ${errors.miktar ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        disabled={props.action === "detay"}
                                    />
                                    {errors.miktar && (
                                        <p className="text-red-500 text-xs">{errors.miktar.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="birim" className="block text-sm font-medium text-gray-700">
                                        Birim*
                                    </label>
                                    <select
                                        id="birim"
                                        {...register("birim")}
                                        className={`text-black w-full px-3 py-2 border rounded-md ${errors.birim ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        disabled={props.action === "detay"}
                                    >
                                        <option value="">Seçiniz</option>
                                        {birimler.map((birim) => (
                                            <option key={birim.name} value={birim.name}>
                                                {birim.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.birim && (
                                        <p className="text-red-500 text-xs">{errors.birim.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="rafKodu" className="block text-sm font-medium text-gray-700">
                                        Raf Kodu
                                    </label>
                                    <input
                                        type="text"
                                        id="rafKodu"
                                        {...register("rafKodu")}
                                        className={`text-black w-full px-3 py-2 border rounded-md ${errors.rafKodu ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="aciklama" className="block text-sm font-medium text-gray-700">
                                        Açıklama
                                    </label>
                                    <textarea
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
                                    {props.stok ? "Güncelle" : "Kaydet"}
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