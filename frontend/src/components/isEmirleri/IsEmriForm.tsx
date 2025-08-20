import { IUserDto } from "@/interfaces/dtos/user/IUserDto";
import ModalInfo from "@/modals/ModalInfo";
import ModalParcaIscilik from "@/modals/ModalParcaIscilik";
import { AracContent, AracDurumu, IsEmriContent, YapilanIslem } from "@/types/MyTypes.d";
import { FiArrowLeft, FiPlus, FiPrinter, FiSave, FiX } from "react-icons/fi";
import IsEmriDetayTable from "./IsEmriDetayTable";
interface IProps {
    isEmri?: IsEmriContent;
    arac?: AracContent;
    dataTeknisyenler: IUserDto[];
    dataDanismanlar: IUserDto[];
    dataAracDurumlar: AracDurumu[];
    dataYapilanIslemler: YapilanIslem[];
    router: any;
    handleSubmit: any;
    onSubmit: any;
    register: any;
    errors: any;
    isPrintMode?: boolean;
    handlePrint: any;
    action: string;
    setIsModalOpen: any;
    isModalOpen: boolean;
    handleSubmitParcaIscilik: any;
    registerParcaIscilik: any;
    errorsParcaIscilik: any;
    isEmriDetaylar: any;
    parcaToplamFiyat: number;
    setParcaToplamFiyat: any;
    iscilikToplamFiyat: number;
    setIscilikToplamFiyat: any;
    handleDelete: any;
    onSubmitParcaIscilik: any;
}

export default function IsEmriForm(props: IProps) {
    return (
        <div className="bg-white min-h-screen py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="bg-white rounded-lg shadow-md">
                    <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => props.router.back()}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-full transition duration-200"
                                aria-label="Geri"
                            >
                                <FiArrowLeft className="w-5 h-5" />
                            </button>
                            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
                                {props.isEmri?.isEmirNo ? `İş Emri: ${props.isEmri.isEmirNo}` : "Yeni İş Emri"}
                            </h1>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={props.handlePrint}
                                className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-md font-medium transition duration-200 flex items-center"
                            >
                                <FiPrinter className="w-5 h-5 mr-1 sm:mr-2" />
                                <span className="hidden sm:inline">Yazdır</span>
                            </button>
                        </div>
                    </div>

                    {/* Print Header - Only visible when printing */}
                    <div className="hidden print:block mb-8">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold">MertAuto Servis</h1>
                            <h2 className="text-xl font-semibold mt-2">İş Emri Raporu</h2>
                            <p className="mt-1">İş Emri No: {props.isEmri?.isEmirNo || "Yeni İş Emri"}</p>
                            <p className="mt-1">Tarih: {new Date().toLocaleDateString('tr-TR')}</p>
                        </div>
                    </div>

                    <form onSubmit={props.handleSubmit(props.onSubmit)} className="p-4 sm:p-6">
                        {/* Araç & İş Emri Bilgileri */}
                        <div className="mb-6">
                            <div className="flex items-center mb-4">
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Araç & İş Emri Bilgileri</h2>
                                <div className="ml-2 h-0.5 bg-blue-500 flex-grow rounded-full opacity-50"></div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                                <div className="space-y-1">
                                    <label htmlFor="aracPlakaNo" className="block text-sm font-medium text-gray-700">
                                        Araç Plaka No
                                    </label>
                                    <input
                                        type="text"
                                        id="aracPlakaNo"
                                        value={props.arac?.plaka}
                                        className="text-gray-800 w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        disabled={true}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="aracSasiNo" className="block text-sm font-medium text-gray-700">
                                        Araç Şase No
                                    </label>
                                    <input
                                        type="text"
                                        id="aracSasiNo"
                                        value={props.arac?.sasiNo}
                                        className="text-gray-800 w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        disabled={true}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="aracMarka" className="block text-sm font-medium text-gray-700">
                                        Araç Markası
                                    </label>
                                    <input
                                        type="text"
                                        id="aracMarka"
                                        value={props.arac?.model?.marka?.adi}
                                        className="text-gray-800 w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        disabled={true}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="aracModel" className="block text-sm font-medium text-gray-700">
                                        Araç Modeli
                                    </label>
                                    <input
                                        type="text"
                                        id="aracModel"
                                        value={props.arac?.model?.adi}
                                        className="text-gray-800 w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        disabled={true}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="aracModelYili" className="block text-sm font-medium text-gray-700">
                                        Araç Model Yılı
                                    </label>
                                    <input
                                        type="text"
                                        id="aracModelYili"
                                        value={props.arac?.modelYili}
                                        className="text-gray-800 w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        disabled={true}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="isEmirNo" className="block text-sm font-medium text-gray-700">
                                        İş Emir No
                                    </label>
                                    <input
                                        type="text"
                                        id="isEmirNo"
                                        {...props.register("isEmirNo")}
                                        className="text-gray-800 w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        disabled={true}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="aracKm" className="block text-sm font-medium text-gray-700">
                                        Araç Km
                                    </label>
                                    <input
                                        type="number"
                                        id="aracKm"
                                        {...props.register("aracKm", { valueAsNumber: true })}
                                        className={`text-gray-800 w-full px-3 py-2 bg-white border ${props.errors.aracKm ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                        disabled={props.isPrintMode || props.action === "detay"}
                                    />
                                    {props.errors.aracKm && (
                                        <p className="text-red-500 text-xs mt-1">{props.errors.aracKm.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="teknisyen_id" className="block text-sm font-medium text-gray-700">
                                        Teknisyen
                                    </label>
                                    <select
                                        id="teknisyen_id"
                                        {...props.register("teknisyen_id")}
                                        className={`text-gray-800 w-full px-3 py-2 bg-white border ${props.errors.teknisyen_id ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                        disabled={props.action === "detay"}
                                    >
                                        <option value="">Seçiniz</option>
                                        {props?.dataTeknisyenler?.map((teknisyen: any) => (
                                            <option key={teknisyen.id} value={teknisyen.id}>
                                                {teknisyen.name + " " + teknisyen.surname}
                                            </option>
                                        ))}
                                    </select>
                                    {props.errors.teknisyen_id && (
                                        <p className="text-red-500 text-xs mt-1">{props.errors.teknisyen_id.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="danisman_id" className="block text-sm font-medium text-gray-700">
                                        Danışman
                                    </label>
                                    <select
                                        id="danisman_id"
                                        {...props.register("danisman_id")}
                                        className={`text-gray-800 w-full px-3 py-2 bg-white border ${props.errors.danisman_id ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                        disabled={props.action === "detay"}
                                    >
                                        <option value="">Seçiniz</option>
                                        {props?.dataDanismanlar?.map((danisman: any) => (
                                            <option key={danisman.id} value={danisman.id}>
                                                {danisman.name + " " + danisman.surname}
                                            </option>
                                        ))}
                                    </select>
                                    {props.errors.danisman_id && (
                                        <p className="text-red-500 text-xs mt-1">{props.errors.danisman_id.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="aracDurumu_id" className="block text-sm font-medium text-gray-700">
                                        Araç Durumu
                                    </label>
                                    <select
                                        id="aracDurumu_id"
                                        {...props.register("aracDurumu_id")}
                                        className={`text-gray-800 w-full px-3 py-2 bg-white border ${props.errors.aracDurumu_id ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                        disabled={props.action === "detay"}
                                    >
                                        <option value="">Seçiniz</option>
                                        {props?.dataAracDurumlar?.map((aracDurumu: any) => (
                                            <option key={aracDurumu.id} value={aracDurumu.id}>
                                                {aracDurumu.adi}
                                            </option>
                                        ))}
                                    </select>
                                    {props.errors.aracDurumu_id && (
                                        <p className="text-red-500 text-xs mt-1">{props.errors.aracDurumu_id.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="yapilanIslem_id" className="block text-sm font-medium text-gray-700">
                                        Yapılan İşlem
                                    </label>
                                    <select
                                        id="yapilanIslem_id"
                                        {...props.register("yapilanIslem_id")}
                                        className={`text-gray-800 w-full px-3 py-2 bg-white border ${props.errors.yapilanIslem_id ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                        disabled={props.action === "detay"}
                                    >
                                        <option value="">Seçiniz</option>
                                        {props?.dataYapilanIslemler?.map((yapilanIslem: any) => (
                                            <option key={yapilanIslem.id} value={yapilanIslem.id}>
                                                {yapilanIslem.adi}
                                            </option>
                                        ))}
                                    </select>
                                    {props.errors.yapilanIslem_id && (
                                        <p className="text-red-500 text-xs mt-1">{props.errors.yapilanIslem_id.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="iskonto" className="block text-sm font-medium text-gray-700">
                                        İskonto
                                    </label>
                                    <input
                                        type="number"
                                        id="iskonto"
                                        {...props.register("iskonto", { valueAsNumber: true })}
                                        step="0.01"
                                        className={`text-gray-800 w-full px-3 py-2 bg-white border ${props.errors.iskonto ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                        disabled={props.action === "detay"}
                                    />
                                    {props.errors.iskonto && (
                                        <p className="text-red-500 text-xs mt-1">{props.errors.iskonto.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Notlar Bölümü */}
                        <div className="mb-6">
                            <div className="flex items-center mb-4">
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Notlar</h2>
                                <div className="ml-2 h-0.5 bg-blue-500 flex-grow rounded-full opacity-50"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label htmlFor="musteriTalep" className="block text-sm font-medium text-gray-700">
                                        Müşteri Talep
                                    </label>
                                    <textarea
                                        id="musteriTalep"
                                        {...props.register("musteriTalep")}
                                        rows={3}
                                        className={`text-gray-800 w-full px-3 py-2 bg-white border ${props.errors.musteriTalep ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                        disabled={props.action === "detay"}
                                    />
                                    {props.errors.musteriTalep && (
                                        <p className="text-red-500 text-xs mt-1">{props.errors.musteriTalep.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="servisIslemOnNotlari" className="block text-sm font-medium text-gray-700">
                                        Servis İşlem Ön Notları
                                    </label>
                                    <textarea
                                        id="servisIslemOnNotlari"
                                        {...props.register("servisIslemOnNotlari")}
                                        rows={3}
                                        className={`text-gray-800 w-full px-3 py-2 bg-white border ${props.errors.servisIslemOnNotlari ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                        disabled={props.action === "detay"}
                                    />
                                    {props.errors.servisIslemOnNotlari && (
                                        <p className="text-red-500 text-xs mt-1">{props.errors.servisIslemOnNotlari.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="servisIslemBitisNotlari" className="block text-sm font-medium text-gray-700">
                                        Servis İşlem Bitiş Notları
                                    </label>
                                    <textarea
                                        id="servisIslemBitisNotlari"
                                        {...props.register("servisIslemBitisNotlari")}
                                        rows={3}
                                        className={`text-gray-800 w-full px-3 py-2 bg-white border ${props.errors.servisIslemBitisNotlari ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                        disabled={props.action === "detay"}
                                    />
                                    {props.errors.servisIslemBitisNotlari && (
                                        <p className="text-red-500 text-xs mt-1">{props.errors.servisIslemBitisNotlari.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="servisIslemGizliNotlari" className="block text-sm font-medium text-gray-700">
                                        Servis İşlem Gizli Notları
                                    </label>
                                    <textarea
                                        id="servisIslemGizliNotlari"
                                        {...props.register("servisIslemGizliNotlari")}
                                        rows={3}
                                        className={`text-gray-800 w-full px-3 py-2 bg-white border ${props.errors.servisIslemGizliNotlari ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                        disabled={props.action === "detay"}
                                    />
                                    {props.errors.servisIslemGizliNotlari && (
                                        <p className="text-red-500 text-xs mt-1">{props.errors.servisIslemGizliNotlari.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* İşlemler ve Parçalar */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center flex-grow">
                                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">İşlemler ve Parçalar</h2>
                                    <div className="ml-2 h-0.5 bg-blue-500 flex-grow rounded-full opacity-50"></div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => props.setIsModalOpen(true)}
                                    className="ml-4 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-md font-medium transition duration-200 flex items-center whitespace-nowrap"
                                >
                                    <FiPlus className="w-5 h-5 mr-1 sm:mr-2" />
                                    <span className="hidden sm:inline">İşlem Ekle</span>
                                </button>
                            </div>

                            <IsEmriDetayTable
                                isEmri={props.isEmri!}
                                parcaToplamFiyat={props.parcaToplamFiyat}
                                setParcaToplamFiyat={props.setParcaToplamFiyat}
                                iscilikToplamFiyat={props.iscilikToplamFiyat}
                                setIscilikToplamFiyat={props.setIscilikToplamFiyat}
                                isEmriDetaylar={props.isEmriDetaylar ?? []}
                                handleDelete={props.handleDelete}
                            />
                        </div>

                        {/* Form actions */}
                        <div className="mt-8 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => props.router.back()}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-200 flex items-center"
                            >
                                <FiX className="w-5 h-5 mr-1.5" />
                                <span>İptal</span>
                            </button>

                            {props.action !== "detay" && (
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 flex items-center"
                                >
                                    <FiSave className="w-5 h-5 mr-1.5" />
                                    <span>{props.isEmri ? "Güncelle" : "Kaydet"}</span>
                                </button>
                            )}
                        </div>

                        {/* Print-specific signature area */}
                        <div className="hidden print:block mt-16">
                            <div className="grid grid-cols-2 gap-16">
                                <div className="border-t border-gray-400 pt-2">
                                    <p className="text-center">Müşteri Adı Soyadı / İmza</p>
                                </div>
                                <div className="border-t border-gray-400 pt-2">
                                    <p className="text-center">Servis Yetkilisi / İmza</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Parça & İşçilik Modal */}
            {props.isModalOpen && (
                (props.action === "new") ?
                    <ModalInfo
                        setIsModalOpen={props.setIsModalOpen}
                        title="Parça & İşçilik Ekle"
                        content="Parça & İşçilik eklemek için lütfen öncelikle İş Emrini kaydediniz."
                    />
                    :
                    <ModalParcaIscilik
                        setIsModalOpen={props.setIsModalOpen}
                        handleSubmitParcaIscilik={(e) => {
                            e.preventDefault();
                            props.handleSubmitParcaIscilik(props.onSubmitParcaIscilik)();
                        }}
                        registerParcaIscilik={props.registerParcaIscilik}
                        errorsParcaIscilik={props.errorsParcaIscilik}
                        isEmri={props.isEmri!}
                    />
            )}
        </div>
    );
}