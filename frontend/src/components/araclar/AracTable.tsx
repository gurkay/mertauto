import { getAraclar } from "@/app/lib/features/araclar/araclarCreateAsyncThunk";
import { AppDispatch, RootState } from "@/app/lib/features/store";
import { StatusConsts } from "@/constants/StatusConsts";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


function AracTable() {
    const dispatch = useDispatch<AppDispatch>();
    const { araclar, loading, status, responseMessage, mySearchText } = useSelector((state: RootState) => state.araclarReducer);


    if (loading) {
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

    if (status === StatusConsts.ERROR) {
        return (
            <div className="bg-gray-50 min-h-screen py-8">
                <div className="container mx-auto max-w-7xl px-4 py-16 sm:py-24">
                    <div className="p-8 text-center">
                        <p className="text-red-600">Araçlar yüklenirken bir hata oluştu.</p>
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
                                Plaka
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Marka / Model
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Motor / Yakıt / Şanzıman
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Müşteri
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                İşlemler
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {araclar?.content.map((vehicle) => (
                            <tr key={vehicle.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{vehicle.plaka}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{vehicle.model?.marka?.adi}</div>
                                    <div className="text-sm text-gray-500">{vehicle.model?.adi}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-900">{vehicle.motorHacmi?.adi} - {vehicle.yakitTuru?.adi}</span>
                                        <span className="text-sm text-gray-500">{vehicle.sanziman?.adi}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{vehicle.musteriAdSoyad}</div>
                                    <div className="text-sm text-gray-500">{vehicle.musteriTelefon}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link href={`/dashboard/arac-islemleri/arac-detay/${vehicle.id}`} className="text-blue-600 hover:text-blue-900 mr-3">
                                        Detay
                                    </Link>
                                    <Link href={`/dashboard/arac-islemleri/arac-ekle/${vehicle.id}`} className="text-gray-600 hover:text-gray-900 mr-3">
                                        Düzenle
                                    </Link>
                                    <Link href={`/dashboard/is-emirleri/is-emri-crud/new/0/${vehicle.id}`} className="text-gray-600 hover:text-gray-900">
                                        İş Emri
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
                    {araclar?.content.map((vehicle) => (
                        <li key={vehicle.id} className="p-4 hover:bg-gray-50">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-medium text-gray-900">{vehicle.plaka}</h3>
                                <div className="flex space-x-2">
                                    <a
                                        href={`/dashboard/arac-islemleri/arac-detay/${vehicle.id}`}
                                        className="text-sm text-blue-600 hover:text-blue-900"
                                    >
                                        Detay
                                    </a>
                                    <a
                                        href={`/dashboard/arac-islemleri/arac-ekle/${vehicle.id}`}
                                        className="text-sm text-gray-600 hover:text-gray-900"
                                    >
                                        Düzenle
                                    </a>
                                    <Link href={`/dashboard/is-emirleri/is-emri-crud/new/0/${vehicle.id}`} className="text-gray-600 hover:text-gray-900">
                                        İş Emri
                                    </Link>
                                </div>
                            </div>
                            <div className="text-sm text-gray-500 mb-1">
                                <span className="font-medium text-gray-900">{vehicle.model?.marka?.adi} {vehicle.model?.adi}</span>
                            </div>
                            <div className="text-sm text-gray-500 mb-1">
                                {vehicle.motorHacmi?.adi} - {vehicle.yakitTuru?.adi} - {vehicle.sanziman?.adi}
                            </div>
                            <div className="text-sm text-gray-500">
                                <span className="font-medium">Müşteri:</span> {vehicle.musteriAdSoyad} ({vehicle.musteriTelefon})
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default AracTable;