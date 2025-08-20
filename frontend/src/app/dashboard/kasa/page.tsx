
import KasaList from "@/components/kasa/KasaList";
import { getServerAuthSession } from "@/utils/auth";


export default async function StokIslemleriPage() {    
    const session = await getServerAuthSession();
    const accessToken = session?.user?.accessToken;

    if (!accessToken) {
        // Handle case where user is not authenticated or token is missing
        // Redirect to login or show an appropriate message
        return <div>Yetkilendirme hatası. Lütfen giriş yapın.</div>;
    }

    return (
        <KasaList />
    );

}