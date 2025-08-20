import AracEkle from "@/components/araclar/AracEkle";
import { getServerAuthSession } from "@/utils/auth";
import { Marka, Model, MotorHacmi, YakitTuru, Sanziman } from "@/types/MyTypes.d";
import { ApiUrlConsts } from "@/constants/ApiUrlConsts";
import { fetchData } from "@/utils/FetchData";



async function AracEkleWithParams() {
    const session = await getServerAuthSession();
    const accessToken = session?.user?.accessToken;

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
            rawDataYakitTurleri
        ] = await Promise.all([
            fetchData(ApiUrlConsts.SANZIMANLAR, accessToken),
            fetchData(ApiUrlConsts.MARKALAR, accessToken),
            fetchData(ApiUrlConsts.MODELLE, accessToken),
            fetchData(ApiUrlConsts.MOTOR_HACIMLERI, accessToken),
            fetchData(ApiUrlConsts.YAKIT_TURU, accessToken)
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
            />
        );

    } catch (error) {
        console.error('Error fetching parameters:', error);
        // Render an error message to the user
        return (
            <div className="text-red-500 text-center p-4">
                Parametreler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.
            </div>
        );
    }
}

export default AracEkleWithParams;