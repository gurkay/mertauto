import { getAraclar } from "@/app/lib/features/araclar/araclarCreateAsyncThunk";
import { AppDispatch, RootState } from "@/app/lib/features/store";
import { StatusConsts } from "@/constants/StatusConsts";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function KasaTable() {
    const dispatch = useDispatch<AppDispatch>();
    const { stoklar, loading, status, responseMessage, mySearchText } = useSelector((state: RootState) => state.stoklarReducer);

    if (loading) {
        return (
            <div className="bg-gray-50 min-h-screen py-8">
                <div className="container mx-auto max-w-7xl px-4 py-16 sm:py-24">
                    <div className="p-8 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Kasalar yükleniyor...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (status === StatusConsts.ERROR) {
        return (
            <div className="bg-gray-50 min-h-screen py-8">
                <div className="container mx-auto max-w-7xl px-4 py-16 sm:py-24">
                    <div className="p-8 text-center">
                        <p className="text-red-600">Kasalar yüklenirken bir hata oluştu.</p>
                        <p className="text-red-600">{responseMessage}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Table for Desktop */}
            <div className="hidden md:block">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Barkod No
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Stok Markası / Stok Adı
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Birim Fiyatı
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Dep.Miktarı / Raf Kodu
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                İşlemler
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {stoklar?.content.map((stok) => (
                            <tr key={stok.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{stok.barkodNo}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{stok.stokMarkasi}</div>
                                    <div className="text-sm text-gray-500">{stok.stokAdi}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500">{stok.birimFiyati} TL</span>
                                    </div>
                                </td>   
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{stok.miktar} {stok.birim}</div>
                                    <div className="text-sm text-gray-500">{stok.rafKodu}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                                    <Link href={`/dashboard/stocks/stock-crud/detail/${stok.id}`} className="text-blue-600 hover:text-blue-900 mr-3">
                                        Detay
                                    </Link>
                                    <Link href={`/dashboard/stocks/stock-crud/edit/${stok.id}`} className="text-gray-600 hover:text-gray-900 mr-3">
                                        Düzenle
                                    </Link>
                                    <Link href={`/dashboard/stocks/stock-crud/delete/${stok.id}`} className="text-red-600 hover:text-red-700">
                                        Sil
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Card view for Mobile */}
            <div className="md:hidden">
                <ul className="divide-y divide-gray-200">
                    {stoklar?.content.map((stok) => (
                        <li key={stok.id} className="p-4 hover:bg-gray-50">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-medium text-gray-900">{stok.barkodNo}</h3>
                                <div className="flex space-x-2">
                                    <a
                                        href={`/dashboard/stok-islemleri/stok-detay/${stok.id}`}
                                        className="text-sm text-blue-600 hover:text-blue-900"
                                    >
                                        Detay
                                    </a>
                                    <a
                                        href={`/dashboard/stok-islemleri/stok-ekle/${stok.id}`}
                                        className="text-sm text-gray-600 hover:text-gray-900"
                                    >
                                        Düzenle
                                    </a>
                                    <a
                                        href={`/dashboard/stok-islemleri/stok-sil/${stok.id}`}
                                        className="text-sm text-gray-600 hover:text-gray-900"
                                    >
                                        Sil
                                    </a>
                                </div>
                            </div>
                            <div className="text-sm text-gray-500 mb-1">
                                <span className="font-medium text-gray-900">{stok.stokMarkasi} {stok.stokAdi}</span>
                            </div>
                            <div className="text-sm text-gray-500 mb-1">
                                {stok.birimFiyati} TL
                            </div>
                            <div className="text-sm text-gray-500">
                                <span className="font-medium">Miktar:</span> {stok.miktar}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}