import { IsEmriContent, IsEmriDetayContent } from "@/types/MyTypes.d";
import Link from "next/link";

interface IProps {
    isEmri: IsEmriContent;
    isEmriDetaylar: IsEmriDetayContent[];
    parcaToplamFiyat: number;
    setParcaToplamFiyat?: (value: number) => void;
    iscilikToplamFiyat: number;
    setIscilikToplamFiyat?: (value: number) => void;
    handleDelete?: (id: number) => void;
    action?: string;
}

export default function IsEmriDetayTable(props: IProps) {

    return (
        <>
            {/* Table for Desktop and Print */}
            <div className={`${props.action === 'raport' ? 'block' : 'hidden md:block'} print:block overflow-auto`}>
                <table className="min-w-full divide-y divide-gray-200 border border-gray-300 print:table print:w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider print:text-black">
                                Stok Markası / Stok Adı
                            </th>
                            <th scope="col" className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider print:text-black">
                                Miktar
                            </th>
                            <th scope="col" className="px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:text-black">
                                Birim Fiyatı
                            </th>
                            <th scope="col" className="px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:text-black">
                                İşçilik
                            </th>
                            <th scope="col" className="px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider print:text-black">
                                Toplam
                            </th>
                            {props.action !== 'raport' && (
                            <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider print:hidden">
                                İşlemler
                            </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {props.isEmriDetaylar?.map((isEmriDetay: IsEmriDetayContent) => (
                            <tr key={isEmriDetay.id} className="hover:bg-gray-50 print:hover:bg-white">
                                <td className="px-4 py-2">
                                    <div className="text-sm font-medium text-gray-900 print:text-black">{isEmriDetay.stok?.stokMarkasi} {isEmriDetay.stok?.stokAdi || isEmriDetay.yapilanIslemAdi}</div>
                                    {isEmriDetay.stok?.barkodNo && <div className="text-xs text-gray-500 print:text-black">{isEmriDetay.stok?.barkodNo}</div>}
                                </td>
                                <td className="px-2 py-2 text-center">
                                    <div className="text-sm text-gray-900 print:text-black">{isEmriDetay.miktar} {isEmriDetay.stok?.birim || isEmriDetay.birim}</div>
                                </td>
                                <td className="px-2 py-2 text-right">
                                    <div className="text-sm text-gray-900 print:text-black">
                                        {isEmriDetay.stok?.birimFiyati || isEmriDetay.birimFiyati} TL
                                    </div>
                                </td>
                                <td className="px-2 py-2 text-right">
                                    <div className="text-sm text-gray-900 print:text-black">
                                        {(isEmriDetay.birimFiyati ?? 0) * (isEmriDetay.miktar ?? 0) === 0 ? '-' : (isEmriDetay.birimFiyati ?? 0) * (isEmriDetay.miktar ?? 0) + ' TL'}
                                    </div>
                                </td>
                                <td className="px-2 py-2 text-right">
                                    <div className="text-sm text-gray-900 print:text-black">
                                        {(isEmriDetay.stok?.birimFiyati ?? 0) * (isEmriDetay.miktar ?? 0) + (isEmriDetay.birimFiyati ?? 0) * (isEmriDetay.miktar ?? 0)} TL
                                    </div>
                                </td>
                                {props.action !== 'raport' && (
                                <td className="px-2 py-2 text-left text-sm font-medium print:hidden">
                                    <button
                                        onClick={() => props.handleDelete && props.handleDelete(isEmriDetay.id ?? 0)}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        Sil
                                    </button>
                                </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                        <tr>
                            <td colSpan={3} className="px-4 py-2 text-right text-sm font-medium text-gray-900 print:text-black">Toplam Parça Ücreti:</td>
                            <td className="px-2 py-2 text-right text-sm font-medium text-gray-900 print:text-black"></td>
                            <td className="px-2 py-2 text-right text-sm font-medium text-gray-900 print:text-black">{props.parcaToplamFiyat} TL</td>
                            {props.action !== 'raport' && <td className="print:hidden"></td>}
                        </tr>
                        <tr>
                            <td colSpan={3} className="px-4 py-2 text-right text-sm font-medium text-gray-900 print:text-black">Toplam İşçilik Ücreti:</td>
                            <td className="px-2 py-2 text-right text-sm font-medium text-gray-900 print:text-black">{props.iscilikToplamFiyat} TL</td>
                            <td className="px-2 py-2 text-right text-sm font-medium text-gray-900 print:text-black"></td>
                            {props.action !== 'raport' && <td className="print:hidden"></td>}
                        </tr>
                        <tr>
                            <td colSpan={3} className="px-4 py-2 text-right text-sm font-medium text-gray-900 print:text-black">İskonto:</td>
                            <td className="px-2 py-2 text-right text-sm font-medium text-gray-900 print:text-black"></td>
                            <td className="px-2 py-2 text-right text-sm font-medium text-gray-900 print:text-black">{props.isEmri?.iskonto} TL</td>
                            {props.action !== 'raport' && <td className="print:hidden"></td>}
                        </tr>
                        <tr>
                            <td colSpan={3} className="px-4 py-2 text-right text-sm font-bold text-gray-900 print:text-black">Genel Toplam:</td>
                            <td className="px-2 py-2 text-right text-sm font-bold text-gray-900 print:text-black"></td>
                            <td className="px-2 py-2 text-right text-sm font-bold text-gray-900 print:text-black">{(props.parcaToplamFiyat + props.iscilikToplamFiyat) - (props.isEmri?.iskonto ?? 0)} TL</td>
                            {props.action !== 'raport' && <td className="print:hidden"></td>}
                        </tr>
                    </tfoot>
                </table>
            </div>

            {/* Card view for Mobile - Only show when not in report mode */}
            {props.action !== 'raport' && (
            <div className="md:hidden print:hidden">
                <ul className="divide-y divide-gray-200">
                    {props.isEmriDetaylar?.map((isEmriDetay: IsEmriDetayContent) => (
                        <li key={isEmriDetay.id} className="p-4 hover:bg-gray-50">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-medium text-gray-900">{isEmriDetay.stok?.barkodNo}</h3>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => props.handleDelete && props.handleDelete(isEmriDetay.id ?? 0)}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        Sil
                                    </button>
                                </div>
                            </div>
                            <div className="text-sm text-gray-500 mb-1">
                                <span className="font-medium text-gray-900">{isEmriDetay.stok?.stokMarkasi} {isEmriDetay.stok?.stokAdi || isEmriDetay.yapilanIslemAdi}</span>
                            </div>
                            <div className="text-sm text-gray-500 mb-1">
                                {isEmriDetay.stok?.birimFiyati || isEmriDetay.birimFiyati} TL
                            </div>
                            <div className="text-sm text-gray-500">
                                <span className="font-medium">Miktar:</span> {isEmriDetay.miktar} {isEmriDetay.stok?.birim || isEmriDetay.birim}
                            </div>
                            <div className="text-sm text-gray-900">
                                <span className="font-medium">Toplam:</span> {(isEmriDetay.stok?.birimFiyati ?? 0) * (isEmriDetay.miktar ?? 0) + (isEmriDetay.birimFiyati ?? 0) * (isEmriDetay.miktar ?? 0)} TL
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            )}

            {/* Mobile summary totals - Only show when not in report mode */}
            {props.action !== 'raport' && (
            <div className="md:hidden print:hidden bg-gray-50 min-w-full divide-y divide-white-200 p-4 rounded-lg mt-4">
                <div className="text-sm text-gray-900">
                    <span className="font-medium">Toplam Parça Ücreti:</span> {props.parcaToplamFiyat} TL
                </div>
                <div className="text-sm text-gray-900">
                    <span className="font-medium">Toplam İşçilik Ücreti:</span> {props.iscilikToplamFiyat} TL
                </div>
                <div className="text-sm text-gray-900">
                    <span className="font-medium">İskonto:</span> {props.isEmri?.iskonto} TL
                </div>
                <div className="text-sm text-gray-900">
                    <span className="font-medium">Toplam Ücret:</span> {(props.parcaToplamFiyat + props.iscilikToplamFiyat) - (props.isEmri?.iskonto ?? 0)} TL
                </div>
            </div>
            )}
        </>
    );
}