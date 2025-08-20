
import Stok from "@/components/stoklar/Stok";
import { ApiUrlConsts } from "@/constants/ApiUrlConsts";
import { getServerAuthSession } from "@/utils/auth";
import { fetchData } from "@/utils/FetchData";
import Link from "next/link";

export default async function StockCrudSlugPage({ params }: { params: { action: string, id: string } }) {
    const session = await getServerAuthSession();
    const accessToken = session?.user?.accessToken;

    const { action, id } = params;

    if (!accessToken) {
        // Handle case where user is not authenticated or token is missing
        // Redirect to login or show an appropriate message
        return <div>Yetkilendirme hatası. Lütfen giriş yapın.</div>;
    }

    try {
        // Fetch all data in parallel
        const [
            rawDataStok
        ] = await Promise.all([
            (action !== "new") ? fetchData(`${ApiUrlConsts.STOK_GET_BY_ID}${id}`, accessToken) : null
        ]);

        return (
            <>
                {
                    action === "new" && <Stok action={action} id={id} title={'Stok Ekle'} />
                }

                {
                    action === "edit" && <Stok
                        action={action}
                        id={id}
                        title={'Stok Düzenle'}
                        stok={rawDataStok}
                    />
                }

                {
                    action === "detail" && <Stok
                        action={action}
                        id={id}
                        title={'Stok Detay'}
                        stok={rawDataStok}
                    />
                }
            </>
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