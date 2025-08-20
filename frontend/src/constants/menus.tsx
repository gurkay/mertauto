export const menus = [
    {
        name: "Anasayfa",
        href: "/",
        icon: '/images/icons/home.png',
        auth: ['ALL'],
    },

    {
        name: "İletişim",
        href: "/pages/contact",
        icon: '/images/icons/contact.png',
        auth: ['ALL'],
    },
    {
        name: "Biz Kimiz?",
        href: "/pages/about",
        icon: '/images/icons/about.png',
        auth: ['ALL'],
        children: [
            { name: 'Hakkımızda', href: '/pages/about', icon: '/images/icons/about.png', auth: ['ALL'] },
            { name: 'Hizmetlerimiz', href: '/pages/services', icon: '/images/icons/services.png', auth: ['ALL'] },
            { name: 'Galeri', href: '/pages/galery', icon: '/images/icons/gallery.png', auth: ['ALL'] },
            { name: 'Haberler', href: '/pages/news', icon: '/images/icons/news.png', auth: ['ALL'] },
            { name: "İş İlanları", href: "/pages/careers", icon: '/images/icons/careers.png', auth: ['ALL'] },
        ]
    },

    {
        name: 'İşlemler',
        href: '/dashboard',
        icon: '/images/icons/car.png',
        auth: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_TECHNICIAN', 'ROLE_SUPERVISOR'],
        children: [
            { name: 'Araç İşlemleri', href: '/dashboard/arac-islemleri', icon: '/images/icons/car.png', auth: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_SUPERVISOR'] },
            { name: 'Kullanıcı işlemleri', href: '/dashboard/kullanici-islemleri/kullanici-listele', icon: '/images/icons/add.png', auth: ['ROLE_ADMIN', 'ROLE_MANAGER'] },
            { name: 'İş Emri İşlemleri', href: '/dashboard/is-emirleri', icon: '/images/icons/add.png', auth: ['ROLE_ADMIN', 'ROLE_MANAGER'] },
            { name: 'Stok İşlemleri', href: '/dashboard/stocks', icon: '/images/icons/stocks.png', auth: ['ROLE_ADMIN', 'ROLE_MANAGER'] },
            { name: 'Raporlar', href: '/dashboard/raporlar', icon: '/images/icons/report.png', auth: ['ROLE_ADMIN', 'ROLE_MANAGER'] },
            { name: 'Ayarlar', href: '/dashboard/ayarlar', icon: '/images/icons/settings.png', auth: ['ROLE_ADMIN', 'ROLE_MANAGER'] },
        ]
    },
];