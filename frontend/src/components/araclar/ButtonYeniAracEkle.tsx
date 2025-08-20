import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

function ButtonYeniAracEkle() {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Araç İşlemleri</h1>
                <p className="text-gray-600">Sistemde kayıtlı tüm araçları yönetin</p>
            </div>
            <div className="mt-4 md:mt-0">
                <Link
                    href="/dashboard/arac-islemleri/arac-ekle/yeni"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition duration-200 flex items-center"
                >
                    Yeni Araç Ekle
                    <FiChevronRight className="ml-1" />
                </Link>
            </div>
        </div>
    );
}

export default ButtonYeniAracEkle;