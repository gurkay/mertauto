import { ParcaIscilikFormData } from "@/types/MyZodForm.d";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FiX } from "react-icons/fi";
import IsEmriDetayStokList from "@/components/isEmirleri/IsEmriDetayStokList";
import { birimler } from "@/constants/StatusConsts";
import { IsEmriContent } from "@/types/MyTypes.d";

interface IProps {
    setIsModalOpen: (isModalOpen: boolean) => void;
    handleSubmitParcaIscilik: (e: React.FormEvent<HTMLFormElement>) => void;
    registerParcaIscilik: UseFormRegister<ParcaIscilikFormData>;
    errorsParcaIscilik: FieldErrors<ParcaIscilikFormData>;
    isEmri: IsEmriContent;
}

export default function ModalParcaIscilik(props: IProps) {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Parça & İşçilik Ekle</h2>
                        <button
                            onClick={() => props.setIsModalOpen(false)}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <FiX size={24} />
                        </button>
                    </div>

                    <IsEmriDetayStokList isEmri={props.isEmri} />

                    <form onSubmit={props.handleSubmitParcaIscilik} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="yapilanIslemAdi" className="block text-sm font-medium text-gray-700">
                                    Yapılan İşlem Adı
                                </label>
                                <input
                                    type="text"
                                    id="yapilanIslemAdi"
                                    {...props.registerParcaIscilik("yapilanIslemAdi")}
                                    className={`text-black w-full px-3 py-2 border rounded-md ${props.errorsParcaIscilik.yapilanIslemAdi ? "border-red-500" : "border-gray-300"
                                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                {props.errorsParcaIscilik.yapilanIslemAdi && (
                                    <p className="text-red-500 text-xs">{props.errorsParcaIscilik.yapilanIslemAdi.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="birimFiyat" className="block text-sm font-medium text-gray-700">
                                    Birim Fiyat*
                                </label>
                                <input
                                    type="number"
                                    id="birimFiyat"
                                    step="0.01"
                                    min="0"
                                    {...props.registerParcaIscilik("birimFiyati", { valueAsNumber: true })}
                                    className={`text-black w-full px-3 py-2 border rounded-md ${props.errorsParcaIscilik.birimFiyati ? "border-red-500" : "border-gray-300"
                                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                {props.errorsParcaIscilik.birimFiyati && (
                                    <p className="text-red-500 text-xs">{props.errorsParcaIscilik.birimFiyati.message}</p>
                                )}
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="birim" className="block text-sm font-medium text-gray-700">
                                    Birim
                                </label>
                                <select
                                    id="birim"
                                    {...props.registerParcaIscilik("birim")}
                                    className={`text-black w-full px-3 py-2 border rounded-md ${props.errorsParcaIscilik.birim ? "border-red-500" : "border-gray-300"
                                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                >
                                    <option value="">Seçiniz</option>
                                    {birimler.map((birim) => (
                                        <option key={birim.name} value={birim.name}>
                                            {birim.name}
                                        </option>
                                    ))}
                                </select>
                                {props.errorsParcaIscilik.birim && (
                                    <p className="text-red-500 text-xs">{props.errorsParcaIscilik.birim.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="miktar" className="block text-sm font-medium text-gray-700">
                                    Miktar*
                                </label>
                                <input
                                    type="number"
                                    id="miktar"
                                    min="1"
                                    {...props.registerParcaIscilik("miktar", { valueAsNumber: true })}
                                    className={`text-black w-full px-3 py-2 border rounded-md ${props.errorsParcaIscilik.miktar ? "border-red-500" : "border-gray-300"
                                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                {props.errorsParcaIscilik.miktar && (
                                    <p className="text-red-500 text-xs">{props.errorsParcaIscilik.miktar.message}</p>
                                )}
                            </div>

                            <div className="flex justify-end space-x-4 pt-4 border-t">
                                <button
                                    type="button"
                                    onClick={() => props.setIsModalOpen(false)}
                                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    İptal
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Ekle
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}