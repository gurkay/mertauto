"use client";

import { AracContent, AracDurumu, IsEmriContent, IsEmriDetayContent, YapilanIslem } from "@/types/MyTypes.d";
import { FiArrowLeft, FiPrinter } from "react-icons/fi";
import { IUserDto } from "@/interfaces/dtos/user/IUserDto";
import IsEmriDetayTable from "@/components/isEmirleri/IsEmriDetayTable";

interface IProps {
    isEmri?: IsEmriContent | null;
    isEmriDetaylar: IsEmriDetayContent[];
    dataTeknisyenler: IUserDto[];
    dataDanismanlar: IUserDto[];
    dataAracDurumlar: AracDurumu[];
    dataYapilanIslemler: YapilanIslem[];
    action?: string;
    id?: string;
    title?: string;
    arac?: AracContent;
    parcaToplamFiyat: number;
    iscilikToplamFiyat: number;
    router: any;
}

export default function ReportsPage(props: IProps) {
    return (
        <div className="bg-gray-50 min-h-screen py-8 print:bg-white print:py-0 print:min-h-2">
            <div className="container mx-auto max-w-7xl px-4 py-2 sm:py-12 print:p-0 print:max-w-full">
                {/* Navigation and print buttons - hidden when printing */}
                <div className="print:hidden mb-6">
                    <div className="flex justify-between items-center">
                        <button
                            onClick={() => props.router.back()}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md font-medium transition duration-200 flex items-center"
                        >
                            <FiArrowLeft className="mr-4" />
                            {props.title}
                        </button>           
                    </div>
                </div>

                <div className="bg-gray-200 rounded-lg shadow-md p-6 mb-8 print:bg-white print:shadow-none print:p-0 print:border-0">
                    {/* Print Header - Only visible when printing */}
                    <div className="hidden print:block mb-8">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold">MertAuto Servis</h1>
                            <div className="w-full max-w-xs mx-auto mt-2 border-b-2 border-gray-800 mb-2"></div>
                            <h2 className="text-xl font-semibold mt-2">İş Emri Raporu</h2>
                            <div className="flex justify-center mt-4 text-sm">
                                <div className="mx-2 flex">
                                    <span className="font-bold mr-2">İş Emri No:</span> 
                                    <span>{props.isEmri?.isEmirNo || "Yeni İş Emri"}</span>
                                </div>
                                <div className="mx-2 flex">
                                    <span className="font-bold mr-2">Tarih:</span> 
                                    <span>{new Date().toLocaleDateString('tr-TR')}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form className="space-y-8 print:space-y-6">
                        {/* Araç & İş Emri Bilgileri */}
                        <div className="bg-gray-50 p-4 rounded-md print:bg-white print:p-0 print:border-b print:border-gray-300 print:pt-0 print:pb-4">
                            <h2 className="text-lg font-semibold text-gray-700 mb-4 print:mb-3 print:text-xl print:text-center print:border-b print:border-gray-200 print:pb-2">Araç & İş Emri Bilgileri</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 print:grid-cols-2 print:gap-3">

                                <div className="space-y-1 print:flex print:flex-col">
                                    <label htmlFor="aracPlakaNo" className="block text-sm font-medium text-gray-700 print:font-bold">
                                        Araç Plaka No
                                    </label>
                                    <input
                                        type="text"
                                        id="aracPlakaNo"
                                        value={props.arac?.plaka}
                                        className={`text-black w-full px-3 py-2 border rounded-md border-gray-500 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-none print:p-0 print:bg-white`}
                                        readOnly={true}
                                    />
                                </div>

                                <div className="space-y-1 print:flex print:flex-col">
                                    <label htmlFor="aracSasiNo" className="block text-sm font-medium text-gray-700 print:font-bold">
                                        Araç Şase No
                                    </label>
                                    <input
                                        type="text"
                                        id="aracSasiNo"
                                        value={props.arac?.sasiNo}
                                        className={`text-black w-full px-3 py-2 border rounded-md border-gray-500 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-none print:p-0 print:bg-white`}
                                        readOnly={true}
                                    />
                                </div>

                                <div className="space-y-1 print:flex print:flex-col">
                                    <label htmlFor="aracMarka" className="block text-sm font-medium text-gray-700 print:font-bold">
                                        Araç Markası
                                    </label>
                                    <input
                                        type="text"
                                        id="aracMarka"
                                        value={props.arac?.model?.marka?.adi}
                                        className={`text-black w-full px-3 py-2 border rounded-md border-gray-500 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-none print:p-0 print:bg-white`}                                   
                                        readOnly={true}
                                    />
                                </div>

                                <div className="space-y-1 print:flex print:flex-col">
                                    <label htmlFor="aracModel" className="block text-sm font-medium text-gray-700 print:font-bold">
                                        Araç Modeli
                                    </label>
                                    <input
                                        type="text"
                                        id="aracModel"
                                        value={props.arac?.model?.adi}
                                        className={`text-black w-full px-3 py-2 border rounded-md border-gray-500 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-none print:p-0 print:bg-white`}                                        
                                        readOnly={true}
                                    />
                                </div>

                                <div className="space-y-1 print:flex print:flex-col">
                                    <label htmlFor="aracModelYili" className="block text-sm font-medium text-gray-700 print:font-bold">
                                        Araç Model Yılı
                                    </label>
                                    <input
                                        type="text"
                                        id="aracModelYili"
                                        value={props.arac?.modelYili}
                                        className={`text-black w-full px-3 py-2 border rounded-md border-gray-500 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-none print:p-0 print:bg-white`}
                                        
                                        readOnly={true}
                                    />
                                </div>

                                <div className="space-y-1 print:flex print:flex-col">
                                    <label htmlFor="isEmirNo" className="block text-sm font-medium text-gray-700 print:font-bold">
                                        İş Emir No
                                    </label>
                                    <input
                                        type="text"
                                        id="isEmirNo"
                                        value={props.isEmri?.isEmirNo}
                                        className={`text-black w-full px-3 py-2 border rounded-md border-gray-500 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-none print:p-0 print:bg-white`}
                                        
                                        readOnly={true}
                                    />
                                </div>

                                <div className="space-y-1 print:flex print:flex-col">
                                    <label htmlFor="aracKm" className="block text-sm font-medium text-gray-700 print:font-bold">
                                        Araç Km
                                    </label>
                                    <input
                                        type="number"
                                        id="aracKm"
                                        value={props.isEmri?.aracKm}
                                        className={`text-black w-full px-3 py-2 border rounded-md border-gray-500 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-none print:p-0 print:bg-white`}
                                        
                                        readOnly={true}
                                    />
                                </div>

                                <div className="space-y-1 print:flex print:flex-col">
                                    <label htmlFor="teknisyen_id" className="block text-sm font-medium text-gray-700 print:font-bold">
                                        Teknisyen
                                    </label>
                                    <input
                                        type="text"
                                        id="teknisyen_id"
                                        value={props.isEmri?.teknisyen?.name + " " + props.isEmri?.teknisyen?.surname}
                                        className={`text-black w-full px-3 py-2 border rounded-md border-gray-500 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-none print:p-0 print:bg-white`}
                                        
                                        readOnly={true}
                                    />
                                </div>

                                <div className="space-y-1 print:flex print:flex-col">
                                    <label htmlFor="danisman_id" className="block text-sm font-medium text-gray-700 print:font-bold">
                                        Danışman
                                    </label>
                                    <input
                                        type="text"
                                        id="danisman_id"
                                        value={props.isEmri?.danisman?.name + " " + props.isEmri?.danisman?.surname}
                                        className={`text-black w-full px-3 py-2 border rounded-md border-gray-500 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-none print:p-0 print:bg-white`}
                                        
                                        readOnly={true}
                                    />
                                </div>

                                <div className="space-y-1 print:flex print:flex-col">
                                    <label htmlFor="aracDurumu_id" className="block text-sm font-medium text-gray-700 print:font-bold">
                                        Araç Durumu
                                    </label>
                                    <input
                                        type="text"
                                        id="aracDurumu_id"
                                        value={props.isEmri?.aracDurumu?.adi}
                                        className={`text-black w-full px-3 py-2 border rounded-md border-gray-500 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-none print:p-0 print:bg-white`}
                                        
                                        readOnly={true}
                                    />
                                </div>

                                <div className="space-y-1 print:flex print:flex-col">
                                    <label htmlFor="yapilanIslem_id" className="block text-sm font-medium text-gray-700 print:font-bold">
                                        Yapılan İşlem
                                    </label>
                                    <input
                                        type="text"
                                        id="yapilanIslem_id"
                                        value={props.isEmri?.yapilanIslem?.adi}
                                        className={`text-black w-full px-3 py-2 border rounded-md border-gray-500 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-none print:p-0 print:bg-white`}
                                        
                                        readOnly={true}
                                    />
                                </div>

                                <div className="space-y-1 print:flex print:flex-col">
                                    <label htmlFor="iskonto" className="block text-sm font-medium text-gray-700 print:font-bold">
                                        İskonto
                                    </label>
                                    <input
                                        type="number"
                                        id="iskonto"
                                        value={props.isEmri?.iskonto}
                                        step="0.01"
                                        className={`text-black w-full px-3 py-2 border rounded-md border-gray-500 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-none print:p-0 print:bg-white`}
                                        readOnly={true}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Müşteri Notları - Ayrı bir bölüm olarak düzenlenmiş */}
                        <div className="bg-gray-50 p-4 rounded-md print:bg-white print:p-0 print:border-b print:border-gray-300 print:py-4 print:mt-2">
                            <h2 className="text-lg font-semibold text-gray-700 mb-4 print:mb-3 print:text-xl print:text-center print:border-b print:border-gray-200 print:pb-2">Notlar</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2 print:gap-4">
                                <div className="space-y-1 print:flex print:flex-col">
                                    <label htmlFor="musteriTalep" className="block text-sm font-medium text-gray-700 print:font-bold">
                                        Müşteri Talep
                                    </label>
                                    <textarea
                                        id="musteriTalep"
                                        value={props.isEmri?.musteriTalep}
                                        rows={15}
                                        className={`text-black w-full px-3 py-2 border rounded-md border-gray-500 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-none print:p-0 print:bg-white print:text-sm`}
                                        readOnly={true}
                                    />
                                </div>

                                <div className="space-y-1 print:flex print:flex-col">
                                    <label htmlFor="servisIslemOnNotlari" className="block text-sm font-medium text-gray-700 print:font-bold">
                                        Servis İşlem Ön Notları
                                    </label>
                                    <textarea
                                        id="servisIslemOnNotlari"
                                        value={props.isEmri?.servisIslemOnNotlari}
                                        rows={15}
                                        className={`text-black w-full px-3 py-2 border rounded-md border-gray-500 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-none print:p-0 print:bg-white print:text-sm`}
                                        readOnly={true}
                                    />
                                </div>

                                <div className="space-y-1 print:flex print:flex-col">
                                    <label htmlFor="servisIslemBitisNotlari" className="block text-sm font-medium text-gray-700 print:font-bold">
                                        Servis İşlem Bitiş Notları
                                    </label>
                                    <textarea
                                        id="servisIslemBitisNotlari"
                                        value={props.isEmri?.servisIslemBitisNotlari}
                                        rows={10}
                                        className={`text-black w-full px-3 py-2 border rounded-md border-gray-500 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-none print:p-0 print:bg-white print:text-sm`}
                                        disabled={props.action === "detay"}
                                        readOnly={true}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* İşlemler ve Parçalar Tablosu */}
                        <div className="print:mt-4">
                            <h2 className="text-lg font-semibold text-gray-700 mb-4 print:block print:mb-3 print:text-xl print:text-center print:border-b print:border-gray-200 print:pb-2">Yapılan İşlemler ve Parçalar</h2>
                            <IsEmriDetayTable 
                                isEmri={props.isEmri!} 
                                isEmriDetaylar={props.isEmriDetaylar ?? []}
                                parcaToplamFiyat={props.parcaToplamFiyat}
                                iscilikToplamFiyat={props.iscilikToplamFiyat}
                                action='raport'
                            />
                        </div>
                        
                        {/* İmza Alanı - Sadece yazdırırken görünür */}
                        <div className="hidden print:block mt-12">
                            <div className="grid grid-cols-2 gap-16">
                                <div className="border-t border-gray-400 pt-2">
                                    <p className="text-center font-medium">Müşteri Adı Soyadı / İmza</p>
                                </div>
                                <div className="border-t border-gray-400 pt-2">
                                    <p className="text-center font-medium">Servis Yetkilisi / İmza</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            
            {/* Yazdırma Stilleri */}
            <style jsx global>{`
                @media print {
                    @page {
                        size: A4;
                        margin: 1.5cm;
                    }
                    
                    html, body {
                        width: 210mm;
                        font-size: 11pt;
                        color: black;
                        background-color: white;
                    }
                    
                    .print\\:hidden {
                        display: none !important;
                    }
                    
                    .print\\:block {
                        display: block !important;
                    }
                    
                    /* İmza alanlarını sayfa altına sabitlemek için */
                    /* YORUM: İmza alanını sayfa sonuna sabitlemek yerine akışta kalması daha iyi olabilir, uzun tablolarda içeriğin üzerine binebilir. Şimdilik kaldırıyorum. */
                    /* .mt-12 {
                        position: fixed;
                        bottom: 2cm;
                        left: 0;
                        right: 0;
                        width: 100%;
                    } */
                    
                    /* Tablolar için özel stiller */
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 1rem; /* İmza alanı ile arasında biraz boşluk bırakalım */
                        page-break-inside: auto;
                        table-layout: fixed;
                    }
                    
                    table thead {
                         /* Başlığın her sayfada tekrar etmesini sağla */
                        display: table-header-group;
                    }
                    
                    table tfoot {
                        /* Altbilginin (toplamlar) tablonun sonunda görünmesini sağla */
                        display: table-footer-group;
                    }
                    
                    table tbody tr {
                        /* Satırların sayfa arasında bölünebilmesini sağla */
                        page-break-inside: auto;
                    }
                    
                    table th {
                        background-color: #f3f4f6 !important;
                        color: black !important;
                        font-weight: bold !important;
                        font-size: 10pt !important;
                         /* Hücre içeriğinin bölünmesini engelle */
                        page-break-inside: avoid !important; 
                    }
                    
                    table th, table td {
                        border: 1px solid #ccc !important;
                        padding: 6px !important;
                        text-align: left;
                        font-size: 10pt !important;
                        word-wrap: break-word !important;
                        overflow-wrap: break-word !important;
                         /* Hücre içeriğinin bölünmesini engelle */
                        page-break-inside: avoid !important;
                    }
                    
                    /* Tablo başlıkları ve hücreleri için ek stillemeler */
                    table th:nth-child(1), table td:nth-child(1) {
                        width: 40% !important;
                    }
                    
                    table th:nth-child(2), table td:nth-child(2) {
                        width: 10% !important;
                        text-align: center !important;
                    }
                    
                    table th:nth-child(3), table td:nth-child(3),
                    table th:nth-child(4), table td:nth-child(4),
                    table th:nth-child(5), table td:nth-child(5) {
                        width: 15% !important;
                        text-align: right !important;
                    }
                    
                    /* Tablo genişliği kontrolü */
                    .print\\:table {
                        width: 100% !important;
                        max-width: 100% !important;
                        margin: 0 !important;
                    }
                    
                    /* Tablo overflow kontrolü */
                    .print\\:block.overflow-auto {
                        overflow: visible !important;
                    }
                    
                    /* Form elemanları için temiz görünüm */
                    input, select, textarea {
                        border: none !important;
                        padding: 0 !important;
                        background: white !important;
                        color: black !important;
                        font-size: 10pt !important;
                    }
                    
                    /* Textarea için ek düzenlemeler */
                    textarea {
                        height: auto !important;
                        overflow: visible !important;
                        white-space: pre-wrap !important;
                        word-wrap: break-word !important;
                        min-height: 0 !important;
                        resize: none !important;
                        page-break-inside: auto !important; /* Uzun notların bölünebilmesi */
                    }
                    
                    /* Sayfa sonu kontrolü için */
                    .page-break {
                        page-break-before: always;
                    }
                    
                    /* Yazdırırken metin renkleri */
                    h1, h2, h3, p, label, span {
                        color: black !important;
                    }
                    
                    /* Responsive düzenlemeler */
                    .print\\:grid-cols-2 {
                        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                    }
                }
            `}</style>
        </div>
    );
}