import { redirect } from "next/navigation";
import ReportsPage from "@/components/reports/ReportsPage";
import { getServerAuthSession } from "@/utils/auth";
import { fetchData } from "@/utils/FetchData";
import { ApiUrlConsts } from "@/constants/ApiUrlConsts";
import Link from "next/link";

export default async function ReportPage({ params }: { params: { id: string } }) {
    const session = await getServerAuthSession();
    const accessToken = session?.user?.accessToken;

    const { id } = params;

    if (!accessToken) {
        // Handle case where user is not authenticated or token is missing
        // Redirect to login or show an appropriate message
        return <div>Yetkilendirme hatası. Lütfen giriş yapın.</div>;
    }
    console.log(params);
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
            fetchData(`${ApiUrlConsts.IS_EMIRLERI}${id}`, accessToken),
            fetchData(`${ApiUrlConsts.ARACLAR}${id}`, accessToken),
            fetchData(`${ApiUrlConsts.USERS}/role/ROLE_TECHNICIAN`, accessToken),
            fetchData(`${ApiUrlConsts.USERS}/role/ROLE_SUPERVISOR`, accessToken),
            fetchData(`${ApiUrlConsts.ARAC_DURUMU}`, accessToken),
            fetchData(`${ApiUrlConsts.YAPILAN_ISLEMLER}`, accessToken),
        ]);
        console.log('params:::', params);
        console.log('rawDataIsEmri:::', rawDataIsEmri);
        console.log('rawDataArac:::', rawDataArac);
        console.log('rawDataTeknisyenler:::', rawDataTeknisyenler);
        console.log('rawDataDanismanlar:::', rawDataDanismanlar);
        console.log('rawDataAracDurumlar:::', rawDataAracDurumlar);
        console.log('rawDataYapilanIslemler:::', rawDataYapilanIslemler);

        return (
            <ReportsPage
                isEmri={rawDataIsEmri}
                isEmriDetaylar={rawDataIsEmri?.isEmriDetaylar || []}
                dataTeknisyenler={rawDataTeknisyenler || []}
                dataDanismanlar={rawDataDanismanlar || []}
                dataAracDurumlar={rawDataAracDurumlar || []}
                dataYapilanIslemler={rawDataYapilanIslemler || []}
                action="raport"
                id={params.id}
                title="İş Emri Raporu"
                arac={rawDataArac}
                parcaToplamFiyat={0}
                iscilikToplamFiyat={0}
            />
        );

    } catch (error) {
        console.error('Error fetching parameters:', error);
        // Render an error message to the user
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-8 max-w-md bg-white rounded-xl shadow-lg">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Hata</h2>
                    <p className="text-gray-600 mb-6">Stok yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.</p>
                    <Link href="/dashboard/stocks" className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
                        Stoklar Listesine Dön
                    </Link>
                </div>
            </div>
        );
    }


} 