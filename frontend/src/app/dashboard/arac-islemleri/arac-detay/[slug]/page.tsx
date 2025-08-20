import AracEkle from "@/components/araclar/AracEkle";
import { ApiUrlConsts } from "@/constants/ApiUrlConsts";
import { Marka, Model, MotorHacmi, YakitTuru, Sanziman } from "@/types/MyTypes.d";
import { getServerAuthSession } from "@/utils/auth";
import { fetchData } from "@/utils/FetchData";
import Link from "next/link";

async function AracEkleSlugPage({ params }: { params: { slug: string } }) {
    const session = await getServerAuthSession();
    const accessToken = session?.user?.accessToken;
    const slug = params.slug;
    if (!accessToken) {
        // Handle case where user is not authenticated or token is missing
        // Redirect to login or show an appropriate message
        return <div>Yetkilendirme hatası. Lütfen giriş yapın.</div>;
    }

    try {
        // Fetch all data in parallel
        const [
            rawDataSanzimanlar,
            rawDataMarkalar,
            rawDataModeller,
            rawDataMotorHacimleri,
            rawDataYakitTurleri,
            rawDataArac
        ] = await Promise.all([
            fetchData(ApiUrlConsts.SANZIMANLAR, accessToken),
            fetchData(ApiUrlConsts.MARKALAR, accessToken),
            fetchData(ApiUrlConsts.MODELLE, accessToken),
            fetchData(ApiUrlConsts.MOTOR_HACIMLERI, accessToken),
            fetchData(ApiUrlConsts.YAKIT_TURU, accessToken),
            (slug === "detay") ? null : fetchData(`${ApiUrlConsts.ARAC_GET_BY_ID}${slug}`, accessToken)
        ]);

        // Map data with proper types (adjust property names like 'adi', 'hacim' based on actual API response)
        const sanzimanlar: Sanziman[] = rawDataSanzimanlar.map((item: any): Sanziman => ({
            id: item.id,
            adi: item.adi, // Adjust if property name is different
        }));

        const markalar: Marka[] = rawDataMarkalar.map((item: any): Marka => ({
            id: item.id,
            adi: item.adi,
        }));

        const modeller: Model[] = rawDataModeller.map((item: any): Model => ({
            id: item.id,
            adi: item.adi,
            marka: { // Assuming nested structure from API
                id: item.marka.id,
                adi: item.marka.adi,
            },
        }));

        const motorHacimleri: MotorHacmi[] = rawDataMotorHacimleri.map((item: any): MotorHacmi => ({
            id: item.id,
            adi: item.adi, // Changed from hacim assuming property name is 'adi'
        }));

        const yakitTurleri: YakitTuru[] = rawDataYakitTurleri.map((item: any): YakitTuru => ({
            id: item.id,
            adi: item.adi, // Adjust if property name is different
        }));

        return (
            <AracEkle
                dataSanzimanlar={sanzimanlar}
                dataMarkalar={markalar}
                dataModeller={modeller}
                dataMotorHacimleri={motorHacimleri}
                dataYakitTurleri={yakitTurleri}
                arac={rawDataArac}
                slug={slug}
                title={'Araç Detayı'}
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
                    <p className="text-gray-600 mb-6">Parametreler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.</p>
                    <Link href="/dashboard/arac-islemleri" className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
                        Ana Sayfaya Dön
                    </Link>
                </div>
            </div>
        );
    }
}

export default AracEkleSlugPage;