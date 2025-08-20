import { RootState } from "@/app/lib/features/store";
import { StatusConsts } from "@/constants/StatusConsts";
import { IsEmriContent } from "@/types/MyTypes.d";
import Link from "next/link";
import { useSelector } from "react-redux";


export default function IsEmriTable() {
    const { isEmirleri, loading, status, responseMessage, mySearchText } = useSelector((state: RootState) => state.isEmirleriReducer);

    if (loading) {
        return (
            <div className="bg-gray-50 min-h-screen py-8">
                <div className="container mx-auto max-w-7xl px-4 py-16 sm:py-24">
                    <div className="p-8 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600">İş emirleri yükleniyor...</p>
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
                        <p className="text-red-600">İş emirleri yüklenirken bir hata oluştu.</p>
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
                                İş Emir No
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Müşteri Adı
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Arac
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Teknisyen
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                İşlemler
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {isEmirleri?.content.map((isEmri: IsEmriContent) => (
                            <tr key={isEmri.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{isEmri.isEmirNo}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{isEmri.arac?.musteriAdSoyad}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500">{isEmri.arac?.model?.marka?.adi} {isEmri.arac?.model?.adi}</span>
                                    </div>
                                </td>   
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{isEmri.teknisyen?.name} {isEmri.teknisyen?.surname}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                                    <Link href={`/dashboard/is-emirleri/is-emri-crud/detail/${isEmri.id}/${isEmri.arac?.id}`} className="text-blue-600 hover:text-blue-900 mr-3">
                                        Detay
                                    </Link>
                                    <Link href={`/dashboard/is-emirleri/is-emri-crud/edit/${isEmri.id}/${isEmri.arac?.id}`} className="text-gray-600 hover:text-gray-900 mr-3">
                                        Düzenle
                                    </Link>
                                    <Link href={`/dashboard/is-emirleri/is-emri-crud/delete/${isEmri.id}`} className="text-red-600 hover:text-red-700">
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
                    {isEmirleri?.content.map((isEmri) => (
                        <li key={isEmri.id} className="p-4 hover:bg-gray-50">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-medium text-gray-900">{isEmri.isEmirNo}</h3>
                                <div className="flex space-x-2">
                                    <a
                                        href={`/dashboard/is-emirleri/is-emri-crud/detail/${isEmri.id}`}
                                        className="text-sm text-blue-600 hover:text-blue-900"
                                    >
                                        Detay
                                    </a>
                                    <a
                                        href={`/dashboard/is-emirleri/is-emri-crud/edit/${isEmri.id}`}
                                        className="text-sm text-gray-600 hover:text-gray-900"
                                    >
                                        Düzenle
                                    </a>
                                    <a
                                        href={`/dashboard/is-emirleri/is-emri-crud/delete/${isEmri.id}`}
                                        className="text-sm text-gray-600 hover:text-gray-900"
                                    >
                                        Sil
                                    </a>
                                </div>
                            </div>
                            <div className="text-sm text-gray-500 mb-1">
                                <span className="font-medium text-gray-900">{isEmri.arac?.musteriAdSoyad}</span>
                            </div>
                            <div className="text-sm text-gray-500 mb-1">
                                {isEmri.arac?.model?.marka?.adi} {isEmri.arac?.model?.adi}
                            </div>
                            <div className="text-sm text-gray-500">
                                <span className="font-medium">Teknisyen:</span> {isEmri.teknisyen?.id} {isEmri.teknisyen?.email}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}