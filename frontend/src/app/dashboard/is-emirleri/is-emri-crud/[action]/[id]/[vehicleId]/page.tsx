import IsEmri from "@/components/isEmirleri/IsEmri";
import { ApiUrlConsts } from "@/constants/ApiUrlConsts";
import { getServerAuthSession } from "@/utils/auth";
import { fetchData } from "@/utils/FetchData";
import Link from "next/link";

export default async function IsEmriCrudPage({ params }: { params: { action: string, id: string, vehicleId: string } }) {
    const session = await getServerAuthSession();
    const accessToken = session?.user?.accessToken;

    const { action, id, vehicleId } = params;
    console.log('params : ', params);
    if (!accessToken) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-md p-6 max-w-sm w-full">
                    <div className="text-center text-red-500 mb-4">⚠️</div>
                    <h2 className="text-xl font-semibold text-center mb-4">Yetkilendirme Hatası</h2>
                    <p className="text-gray-600 mb-4 text-center">Lütfen giriş yapın.</p>
                    <Link href="/auth/signin" className="block w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition">
                        Giriş Sayfasına Git
                    </Link>
                </div>
            </div>
        );
    }

    try {
        // Fetch all data in parallel
        const [
            rawDataIsEmri,
            rawDataArac,
            rawDataTeknisyenler,
            rawDataDanismanlar,
            rawDataAracDurumlar,
            rawDataYapilanIslemler
        ] = await Promise.all([
            (action !== "new") ? fetchData(`${ApiUrlConsts.IS_EMIRLERI}${id}`, accessToken) : null,
            fetchData(`${ApiUrlConsts.ARACLAR}${vehicleId}`, accessToken),
            fetchData(`${ApiUrlConsts.USERS}/role/ROLE_TECHNICIAN`, accessToken),
            fetchData(`${ApiUrlConsts.USERS}/role/ROLE_SUPERVISOR`, accessToken),
            fetchData(`${ApiUrlConsts.ARAC_DURUMU}`, accessToken),
            fetchData(`${ApiUrlConsts.YAPILAN_ISLEMLER}`, accessToken),
        ]);

        // Page titles based on action
        const pageTitles = {
            "new": "İş Emir Ekle",
            "edit": "İş Emir Düzenle",
            "detail": "İş Emir Detay"
        };
        
        return (
            <div className="min-h-screen bg-gray-50 pt-4 px-4 sm:px-6 lg:px-8">
                <div className="mb-4 flex justify-between items-center">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                        {pageTitles[action as keyof typeof pageTitles]}
                    </h1>
                    <Link 
                        href="/dashboard/is-emirleri" 
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md text-sm transition"
                    >
                        Listeye Dön
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                    {action === "new" && (
                        <IsEmri
                            action={action} 
                            id={id}
                            title={pageTitles.new}
                            dataTeknisyenler={rawDataTeknisyenler}
                            dataDanismanlar={rawDataDanismanlar}
                            dataAracDurumlar={rawDataAracDurumlar}
                            dataYapilanIslemler={rawDataYapilanIslemler}
                            arac={rawDataArac}
                        />
                    )}

                    {action === "edit" && (
                        <IsEmri
                            action={action}
                            id={id}
                            title={pageTitles.edit}
                            isEmri={rawDataIsEmri}
                            arac={rawDataArac}
                            dataTeknisyenler={rawDataTeknisyenler}
                            dataDanismanlar={rawDataDanismanlar}
                            dataAracDurumlar={rawDataAracDurumlar}
                            dataYapilanIslemler={rawDataYapilanIslemler}
                        />
                    )}

                    {action === "detail" && (
                        <IsEmri
                            action={action}
                            id={id}
                            title={pageTitles.detail}
                            isEmri={rawDataIsEmri}
                            arac={rawDataArac}
                            dataTeknisyenler={rawDataTeknisyenler}
                            dataDanismanlar={rawDataDanismanlar}
                            dataAracDurumlar={rawDataAracDurumlar}
                            dataYapilanIslemler={rawDataYapilanIslemler}
                        />
                    )}
                </div>
            </div>
        );

    } catch (error) {
        console.error('Error fetching parameters:', error);
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center max-w-md w-full bg-white rounded-lg shadow-md p-6">
                    <div className="text-red-500 text-4xl mb-4">⚠️</div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Hata</h2>
                    <p className="text-gray-600 mb-6">İş emri yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.</p>
                    <Link href="/dashboard/is-emirleri" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition">
                        İş Emirleri Listesine Dön
                    </Link>
                </div>
            </div>
        );
    }
}