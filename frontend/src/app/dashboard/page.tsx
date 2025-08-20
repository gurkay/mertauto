import { getServerAuthSession } from "@/utils/auth";
import Image from "next/image";
import Link from "next/link";
import CategoryTabs from "../_components/CategoryTabs";

export default async function Dashboard() {
  const session = await getServerAuthSession();

  // Sample data for dashboard demonstration
  const recentActivities = [
    { id: 1, type: "Araç Bakımı", status: "Tamamlandı", date: "15 Tem 2023", vehicle: "BMW X5" },
    { id: 2, type: "Motor Tamiri", status: "Devam Ediyor", date: "22 Tem 2023", vehicle: "Mercedes C180" },
    { id: 3, type: "Yağ Değişimi", status: "Beklemede", date: "30 Tem 2023", vehicle: "Audi A3" },
    { id: 4, type: "Fren Sistemi", status: "Tamamlandı", date: "05 Ağu 2023", vehicle: "Volkswagen Golf" },
  ];

  const stats = [
    { title: "Toplam Randevu", value: "24", icon: "📅", color: "bg-blue-100 text-blue-600" },
    { title: "Aktif İşlemler", value: "3", icon: "🔧", color: "bg-green-100 text-green-600" },
    { title: "Bekleyen İşlemler", value: "2", icon: "⏳", color: "bg-yellow-100 text-yellow-600" },
    { title: "Tamamlanan İşlemler", value: "19", icon: "✅", color: "bg-purple-100 text-purple-600" },
  ];

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 max-w-md bg-white rounded-xl shadow-lg">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Erişim Engellendi</h2>
          <p className="text-gray-600 mb-6">Bu sayfayı görüntülemek için giriş yapmanız gerekmektedir.</p>
          <Link href="/auth/signin" className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
            Giriş Yap
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-7xl px-4 py-16 sm:py-24">

        {/* User Welcome Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="bg-gray-100 rounded-full p-2 h-24 w-24 flex items-center justify-center">
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="User Profile"
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              ) : (
                <div className="text-4xl">
                  {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || "U"}
                </div>
              )}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Hoş Geldiniz, {session.user.name || session.user.email?.split('@')[0] || "Kullanıcı"}
              </h1>
              <p className="text-gray-600">
                Kullanıcı ID: <span className="font-medium">{session.user.id}</span>
              </p>
              <p className="text-gray-600">
                Email: <span className="font-medium">{session.user.email}</span>
              </p>
              <p className="text-gray-600">
                Rol: <span className="font-medium capitalize">{session.user.roles?.join(', ') || "Standart Kullanıcı"}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-500 mb-1 text-sm">{stat.title}</p>
                  <h3 className="text-3xl font-bold">{stat.value}</h3>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-2xl`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 mb-8 hidden md:block">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Son Aktiviteler</h2>

          <div className="overflow-x-auto">
            <table className="w-full min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">İşlem</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Araç</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Tarih</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Durum</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentActivities.map((activity) => (
                  <tr key={activity.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm text-gray-900">{activity.type}</td>
                    <td className="px-4 py-4 text-sm text-gray-600">{activity.vehicle}</td>
                    <td className="px-4 py-4 text-sm text-gray-600">{activity.date}</td>
                    <td className="px-4 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${activity.status === 'Tamamlandı' ? 'bg-green-100 text-green-800' :
                        activity.status === 'Devam Ediyor' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                        {activity.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <button className="text-gray-500 hover:text-gray-700">
                        <span className="underline">Detaylar</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-center">
            <Link href="#" className="inline-block text-gray-600 hover:text-gray-900 font-medium">
              Tüm Aktiviteleri Görüntüle →
            </Link>
          </div>
        </div>

        {/* Card view for Mobile */}
        <div className="md:hidden">
          <ul className="bg-white rounded-2xl shadow-md p-6 md:p-8 mb-8 divide-y divide-white-200">
            {recentActivities.map((activity) => (
              <li key={activity.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium text-gray-900">{activity.type}</h3>
                  <div className="flex space-x-2">
                    <a
                      href={`/dashboard/arac-islemleri/${activity.id}`}
                      className="text-sm text-blue-600 hover:text-blue-900"
                    >
                      Detay
                    </a>
                    <a
                      href={`/dashboard/arac-islemleri/${activity.id}/duzenle`}
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Düzenle
                    </a>
                  </div>
                </div>
                <div className="text-sm text-gray-500 mb-1">
                  <span className="font-medium text-gray-900">{activity.vehicle}</span>
                </div>
                <div className="text-sm text-gray-500 mb-1">
                  {activity.date}
                </div>
                <div className="text-sm text-gray-500">
                  <span className="font-medium">Müşteri:</span> {activity.status}
                </div>
              </li>
            ))}

            <div className="mt-2 text-center">
              <Link href="#" className="inline-block text-gray-600 hover:text-gray-900 font-medium">
                Tüm Aktiviteleri Görüntüle →
              </Link>
            </div>
          </ul>

        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <Link href="#" className="block bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Randevu Oluştur</h3>
            <p className="text-gray-600 mb-4">Yeni bir servis randevusu oluşturun</p>
            <div className="text-gray-800 font-medium">İşlem Başlat →</div>
          </Link>

          <Link href="#" className="block bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Araçlarım</h3>
            <p className="text-gray-600 mb-4">Kayıtlı araçlarınızı görüntüleyin</p>
            <div className="text-gray-800 font-medium">Araçlara Git →</div>
          </Link>

          <Link href="#" className="block bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Faturalarım</h3>
            <p className="text-gray-600 mb-4">Geçmiş faturalarınızı görüntüleyin</p>
            <div className="text-gray-800 font-medium">Faturaları Gör →</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
