-- Rolleri ekle (ROLE_ prefix'i ile)
INSERT INTO roles(name, description) VALUES
    ('ROLE_ADMIN', 'Admin role'),
    ('ROLE_MANAGER', 'Manager role'),
    ('ROLE_SALES', 'Sales role'),
    ('ROLE_EDITOR', 'Editor role'),
    ('ROLE_SUPERVISOR', 'Supervisor role'),
    ('ROLE_TECHNICIAN', 'Technician role'),
    ('ROLE_USER', 'User role');

-- Admin kullanıcısını ekle (şifre: 123456)
INSERT INTO users (name, surname, phone, address, city, postal_code, tc_no, email, password, created_at) 
VALUES 
('gurkay', 'BAŞYİĞİT', '5555555555', 'Kınalı Sk. no: 54', 'ANKARA', '06100', '1234567890', 'gurkay.basyigit@gmail.com', '$2a$10$C7qVkluVhnCDjGF7Uw2by.INAqnCZaXJGQ/P.W5JRo5CXPnCU3ZGC', CURRENT_TIMESTAMP),
('gurkay', 'BAŞYİĞİT', '5303261105', 'Kınalı Sk. no: 54', 'ANKARA', '06100', '1234567890', 'gunesebak@gmail.com', '$2a$10$C7qVkluVhnCDjGF7Uw2by.INAqnCZaXJGQ/P.W5JRo5CXPnCU3ZGC', CURRENT_TIMESTAMP),
('tufan', 'BAŞYİĞİT', '5555555555', 'Yaprak Sk. no: 12', 'AFYONKARAHİSAR', '03100', '32822918298', 'tufan.basyigit@gmail.com', '$2a$10$C7qVkluVhnCDjGF7Uw2by.INAqnCZaXJGQ/P.W5JRo5CXPnCU3ZGC', CURRENT_TIMESTAMP),
('mert', 'BAŞYİĞİT', '5555555555', 'Çayır Sk. no: 11', 'ÇANAKKALE', '02100', '31231231231', 'mert.yildiz@gmail.com', '$2a$10$C7qVkluVhnCDjGF7Uw2by.INAqnCZaXJGQ/P.W5JRo5CXPnCU3ZGC', CURRENT_TIMESTAMP),
('ali', 'BAŞYİĞİT', '5555555555', 'Tabak Sk. no: 10', 'BOLU', '04100', '12342112890', 'ali.yildiz@gmail.com', '$2a$10$C7qVkluVhnCDjGF7Uw2by.INAqnCZaXJGQ/P.W5JRo5CXPnCU3ZGC', CURRENT_TIMESTAMP),
('veli', 'BAŞYİĞİT', '5555555555', 'Çanak Sk. no: 13', 'AĞRI', '05100', '4321567890', 'veli.yildiz@gmail.com', '$2a$10$C7qVkluVhnCDjGF7Uw2by.INAqnCZaXJGQ/P.W5JRo5CXPnCU3ZGC', CURRENT_TIMESTAMP),
('ayse', 'BAŞYİĞİT', '5555555555', 'Sürmeli Sk. no: 14', 'İZMİR', '02110', '1255567890', 'ayse.yildiz@gmail.com', '$2a$10$C7qVkluVhnCDjGF7Uw2by.INAqnCZaXJGQ/P.W5JRo5CXPnCU3ZGC', CURRENT_TIMESTAMP);


-- Admin rolünü kullanıcıya ata
INSERT INTO users_roles (user_id, role_id) SELECT u.id, r.id FROM users u, roles r WHERE u.email = 'gurkay.basyigit@gmail.com' AND r.name = 'ROLE_ADMIN';
INSERT INTO users_roles (user_id, role_id) SELECT u.id, r.id FROM users u, roles r WHERE u.email = 'gunesebak@gmail.com' AND r.name = 'ROLE_ADMIN';
INSERT INTO users_roles (user_id, role_id) SELECT u.id, r.id FROM users u, roles r WHERE u.email = 'gunesebak@gmail.com' AND r.name = 'ROLE_MANAGER';
INSERT INTO users_roles (user_id, role_id) SELECT u.id, r.id FROM users u, roles r WHERE u.email = 'mert.yildiz@gmail.com' AND r.name = 'ROLE_SUPERVISOR';
INSERT INTO users_roles (user_id, role_id) SELECT u.id, r.id FROM users u, roles r WHERE u.email = 'ali.yildiz@gmail.com' AND r.name = 'ROLE_SALESPERSON';
INSERT INTO users_roles (user_id, role_id) SELECT u.id, r.id FROM users u, roles r WHERE u.email = 'veli.yildiz@gmail.com' AND r.name = 'ROLE_TECHNICIAN';
INSERT INTO users_roles (user_id, role_id) SELECT u.id, r.id FROM users u, roles r WHERE u.email = 'ayse.yildiz@gmail.com' AND r.name = 'ROLE_USER';
INSERT INTO users_roles (user_id, role_id) SELECT u.id, r.id FROM users u, roles r WHERE u.email = 'tufan.basyigit@gmail.com' AND r.name = 'ROLE_TECHNICIAN';
INSERT INTO users_roles (user_id, role_id) SELECT u.id, r.id FROM users u, roles r WHERE u.email = 'tufan.basyigit@gmail.com' AND r.name = 'ROLE_SUPERVISOR';

-- Sanziman ekle
INSERT INTO sanziman (adi) VALUES
    ('Manual') ,  
    ('Otomatik') , 
    ('Yarı Otomatik');

-- Arac durumu ekle
INSERT INTO arac_durumu (adi) VALUES
    ('Beklemede') ,  
    ('Tamamlandı') , 
    ('Devam Ediyor') , 
    ('İptal Edildi');

-- Yapılan işlemler ekle
INSERT INTO yapilan_islemler (adi) VALUES
    ('Araç Genel Bakımı') ,  
    ('Motor Tamiri') , 
    ('Yağ Değişimi') , 
    ('Fren Tamiri') , 
    ('Şanzıman Tamiri');

-- Yakıt ekle
INSERT INTO yakit_turu (adi) VALUES
    ('Benzin') ,  
    ('Dizel') , 
    ('Benzin+LPG') , 
    ('Hibrit') , 
    ('Elektrik');

-- Kasa kategorileri ekle
INSERT INTO kasa_kategorileri (adi) VALUES
    ('Servis Bakım Gelirleri'),
    ('Servis Bakım Giderleri'),
    ('Servis Stok Giderleri'),
    ('Servis Genel Giderleri'),
    ('Kira Gelirleri'),
    ('Kira Giderleri'),
    ('SSK Giderleri'),
    ('Yakıt Giderleri'),
    ('Mutfak Giderleri'),
    ('Personel Giderleri'),
    ('Kurumsal Giderler'),
    ('Kurumsal Gelirler'),
    ('Diğer Giderler'),
    ('Diğer Gelirler');

-- Kasa işlem türü ekle
INSERT INTO kasa_islem_turu (adi) VALUES
    ('Gelir'),
    ('Gider');

-- Kasa ödeme şekli
INSERT INTO kasa_odeme_sekli (adi) VALUES
    ('Nakit'),
    ('Kredi Kartı'),
    ('Banka Kartı'),
    ('Havale'),
    ('EFT'),
    ('Senet'),
    ('Çek'),
    ('Mail Order'),
    ('Diğer');

-- Motor hacmi ekle
INSERT INTO motor_hacmi (adi) VALUES
    ('1.0') ,  
    ('1.2') , 
    ('1.3') , 
    ('1.4') , 
    ('1.5') , 
    ('1.6') , 
    ('1.7') , 
    ('1.8') , 
    ('1.9') , 
    ('2.0') , 
    ('2.2') , 
    ('2.4') , 
    ('2.5') , 
    ('2.8') , 
    ('3.0') , 
    ('3.2') , 
    ('3.5') , 
    ('4.0');

-- Markaları ekle
INSERT INTO markalar (adi) VALUES
    ('Alfa Romeo'),
    ('Aston Martin'),
    ('Audi'),
    ('Bentley'),
    ('BMW'),
    ('BYD'),
    ('Chery'),
    ('Citroen'),
    ('Cupra'),
    ('Dacia'),
    ('DS'),
    ('Ferrari'),
    ('Fiat'),
    ('Ford'),
    ('Honda'),
    ('Hyundai'),
    ('Isuzu'), -- (Genellikle ticari araç odaklı olsa da binek modelleri de olabilir)
    ('Jaguar'),
    ('Jeep'),
    ('Kia'),
    ('Lamborghini'),
    ('Land Rover'),
    ('Leapmotor'),
    ('Lexus'),
    ('Maserati'),
    ('Maxus'),
    ('Mazda'), -- (Satışı olup olmadığını teyit etmek gerekebilir, geçmişte vardı)
    ('Mercedes-Benz'),
    ('MG'),
    ('Mini'),
    ('Mitsubishi'),
    ('NETA'),
    ('Nissan'),
    ('Opel'),
    ('Peugeot'),
    ('Porsche'),
    ('Renault'),
    ('Seat'),
    ('Seres'),
    ('Skoda'),
    ('SsangYong'), -- (Yeni adı KG Mobility olabilir, kontrol etmekte fayda var)
    ('Subaru'),
    ('Suzuki'),
    ('Skywell'),
    ('Togg'),
    ('Toyota'),
    ('Volkswagen'),
    ('Volvo');

-- Modellere ekle
INSERT INTO modeller (marka_id, adi) VALUES
    (14, 'Fiesta') ,  
    (14, 'Focus') , 
    (14, 'Kuga') , 
    (14, 'Puma') , 
    (14, 'Ranger') , 
    (14, 'Transit') , 
    (14, 'Tourneo Courier') , 
    (14, 'Mustang') , 
    (14, 'Explorer') , 
    (14, 'Edge') , 
    (14, 'EcoSport') , 
    (14, 'Galaxy') , 
    (14, 'S-MAX') , 
    (14, 'Maverick') , 
    (14, 'Mondeo') , 
    (14, 'Fusion') , 
    (14, 'Escape') , 
    (14, 'Expedition');

INSERT INTO modeller (marka_id, adi) VALUES
    (15, 'Civic') ,
    (15, 'Accord') ,
    (15, 'City') ,
    (15, 'Jazz') ,
    (15, 'CR-V') ,
    (15, 'HR-V') ,
    (15, 'ZR-V') ,
    (15, 'Pilot') ,
    (15, 'Passport') ,
    (15, 'Ridgeline') ,
    (15, 'e:Ny1') ,
    (15, 'Honda e') ,
    (15, 'Odyssey') ,
    (15, 'Insight') ,
    (15, 'Clarity');

INSERT INTO modeller (marka_id, adi) VALUES
    (3, 'A1') ,
    (3, 'A3') ,
    (3, 'A4') ,
    (3, 'A5') ,
    (3, 'A6') ,
    (3, 'A7') ,
    (3, 'A8') ,
    (3, 'Q2') ,
    (3, 'Q3') ,
    (3, 'Q5') ,
    (3, 'Q7') ,
    (3, 'Q8') ,
    (3, 'Q4 e-tron') ,
    (3, 'Q5 e-tron') ,
    (3, 'Q6 e-tron') ,
    (3, 'Q7 e-tron') ,
    (3, 'Q8 e-tron');

INSERT INTO modeller (marka_id, adi) VALUES
    (47, 'Polo') ,
    (47, 'Golf') ,
    (47, 'Passat') ,
    (47, 'Passat Variant') ,
    (47, 'Jetta') ,
    (47, 'Arteon') ,
    (47, 'T-Cross') ,
    (47, 'T-Roc') ,
    (47, 'Tiguan') ,
    (47, 'Tiguan Allspace') ,
    (47, 'Touareg') ,
    (47, 'Taigo') ,
    (47, 'Caddy') ,
    (47, 'ID.4');

INSERT INTO modeller (marka_id, adi) VALUES
    (40, 'Fabia') ,
    (40, 'Scala') ,
    (40, 'Octavia') ,
    (40, 'Superb') ,
    (40, 'Kamiq') ,
    (40, 'Karoq') ,
    (40, 'Kodiaq');

INSERT INTO modeller (marka_id, adi) VALUES
    (38, 'Ibiza') ,
    (38, 'Leon') ,
    (38, 'Toledo') ,
    (38, 'Arona') ,
    (38, 'Ateca') ,
    (38, 'Tarraco') ,
    (38, 'Tavascan') ,
    (38, 'UrbanRebel'),
    (38, 'Born') ,
    (38, 'Formentor') ;

INSERT INTO modeller (marka_id, adi) VALUES
    (13, 'Egea') ,
    (13, '500') ,
    (13, '500X') ,
    (13, '500e') ,
    (13, 'Panda') ,
    (13, 'Egea Cross') ,
    (13, 'Panda Cross') ,
    (13, 'Doblo') ,
    (13, 'Fiorino') ,
    (13, 'Scudo') ,
    (13, 'Ducato') ,
    (13, 'Ulysse') ,
    (13, '500e') ,
    (13, 'E-Doblo') ,
    (13, 'E-Ulysse') ,
    (13, 'E-Scudo') ,
    (13, 'Topolino');

INSERT INTO stoklar (barkod_no, stok_markasi, stok_adi, miktar, birim_fiyati, birim, raf_kodu, aciklama) VALUES
    ('1234567890', 'Ford', 'Yağ Filtresi', 100, 75.50, 'Adet', 'A1', 'Ford Focus için uyumlu'),
    ('1234567891', 'Ford', 'Hava Filtresi', 80, 65.00, 'Adet', 'A1', 'Ford Fiesta modelleri için'),
    ('1234567892', 'Ford', 'Polen Filtresi', 90, 55.00, 'Adet', 'A1', 'Kabin içi hava filtresi'),
    ('1234567893', 'Ford', 'Yakıt Filtresi', 60, 85.00, 'Adet', 'A2', 'Dizel araçlar için'),
    ('1234567894', 'Ford', 'Ön Fren Balatası', 50, 250.00, 'Adet', 'A2', 'Focus ve Mondeo için'),
    ('1234567895', 'Ford', 'Arka Fren Balatası', 55, 230.00, 'Adet', 'A2', 'Fiesta ve Kuga için'),
    ('1234567896', 'Ford', 'Debriyaj Seti', 20, 1750.00, 'Adet', 'B1', 'Ford Transit için'),
    ('1234567897', 'Ford', 'Triger Seti', 15, 1850.00, 'Adet', 'B1', 'Focus 1.6 TDCi için'),
    ('1234567898', 'Ford', 'Su Radyatörü', 10, 1250.00, 'Adet', 'B2', 'Motor soğutma radyatörü'),
    ('1234567899', 'Ford', 'Termostat', 40, 350.00, 'Adet', 'B2', 'Motor sıcaklık kontrolü için'),
    ('12345678910', 'Ford', 'V Kayışı', 70, 200.00, 'Adet', 'C1', 'Kuga 2.0 TDCi uyumlu'),
    ('12345678911', 'Ford', 'Fren Diski Ön', 30, 600.00, 'Adet', 'C1', 'Focus ve C-Max için'),
    ('12345678912', 'Ford', 'Fren Diski Arka', 28, 550.00, 'Adet', 'C1', 'Fiesta için uyumlu'),
    ('12345678913', 'Ford', 'Amortisör Ön', 25, 900.00, 'Adet', 'C2', 'Mondeo modelleri için'),
    ('12345678914', 'Ford', 'Amortisör Arka', 27, 850.00, 'Adet', 'C2', 'S-Max için uygun'),
    ('12345678915', 'Ford', 'Aks Komple', 12, 1650.00, 'Adet', 'D1', 'Transit Custom için'),
    ('12345678916', 'Ford', 'Rot Başlığı', 45, 280.00, 'Adet', 'D1', 'Ön süspansiyon için'),
    ('12345678917', 'Ford', 'Rotil', 50, 240.00, 'Adet', 'D1', 'Ön teker bağlantısı'),
    ('12345678918', 'Ford', 'Salıncak', 20, 950.00, 'Adet', 'D2', 'Alt süspansiyon kolu'),
    ('12345678919', 'Ford', 'Direksiyon Kutusu', 5, 5200.00, 'Adet', 'D2', 'Elektrikli direksiyon sistemi için'),
    ('12345678920', 'Ford', 'Enjektör', 18, 1450.00, 'Adet', 'E1', 'Focus TDCi dizel motor için'),
    ('12345678921', 'Ford', 'Turbo Şarj', 6, 5500.00, 'Adet', 'E1', 'Focus ve Mondeo 1.6 TDCi için'),
    ('12345678922', 'Ford', 'Motor Takozu', 30, 450.00, 'Adet', 'E1', 'Titreşim önleyici motor takozu'),
    ('12345678923', 'Ford', 'Şanzıman Takozu', 25, 400.00, 'Adet', 'E2', 'Şanzıman stabilitesi için'),
    ('12345678924', 'Ford', 'Far Sağ', 8, 2200.00, 'Adet', 'F1', 'Focus 2015 model için'),
    ('12345678925', 'Ford', 'Far Sol', 8, 2200.00, 'Adet', 'F1', 'Focus 2015 model için'),
    ('12345678926', 'Ford', 'Stop Lambası Sağ', 12, 750.00, 'Adet', 'F1', 'Fiesta 2018 modeli için'),
    ('12345678927', 'Ford', 'Stop Lambası Sol', 12, 750.00, 'Adet', 'F1', 'Fiesta 2018 modeli için'),
    ('12345678928', 'Ford', 'Tampon Ön', 5, 3200.00, 'Adet', 'F2', 'Focus için ön tampon'),
    ('12345678929', 'Ford', 'Tampon Arka', 5, 3000.00, 'Adet', 'F2', 'Focus için arka tampon'),
    ('12345678930', 'Ford', 'Kaput', 3, 4500.00, 'Adet', 'F2', 'Motor kaputu'),
    ('12345678931', 'Ford', 'Çamurluk Ön Sağ', 7, 1600.00, 'Adet', 'G1', 'Sağ ön çamurluk'),
    ('12345678932', 'Ford', 'Çamurluk Ön Sol', 7, 1600.00, 'Adet', 'G1', 'Sol ön çamurluk'),
    ('12345678933', 'Ford', 'Ayna Sağ', 15, 950.00, 'Adet', 'G1', 'Elektrikli ayna'),
    ('12345678934', 'Ford', 'Ayna Sol', 15, 950.00, 'Adet', 'G1', 'Elektrikli ayna'),
    ('12345678935', 'Ford', 'Kapı Ön Sağ', 4, 5800.00, 'Adet', 'G2', 'Ön sağ kapı'),
    ('12345678936', 'Ford', 'Kapı Ön Sol', 4, 5800.00, 'Adet', 'G2', 'Ön sol kapı'),
    ('12345678937', 'Ford', 'Kapı Arka Sağ', 4, 5600.00, 'Adet', 'G2', 'Arka sağ kapı'),
    ('12345678938', 'Ford', 'Kapı Arka Sol', 4, 5600.00, 'Adet', 'G2', 'Arka sol kapı'),
    ('12345678939', 'Ford', 'Egzoz Sistemi', 6, 3800.00, 'Adet', 'H1', 'Focus için tam egzoz sistemi'),
    ('12345678940', 'Ford', 'Katalitik Konvertör', 5, 4200.00, 'Adet', 'H1', 'Çevre dostu egzoz parçası'),
    ('12345678941', 'Ford', 'Partikül Filtresi (DPF)', 5, 7000.00, 'Adet', 'H1', 'Dizel partikül filtresi'),
    ('12345678942', 'Ford', 'Klima Kompresörü', 7, 4800.00, 'Adet', 'H2', 'Klimayı çalıştıran parça'),
    ('12345678943', 'Ford', 'Radyatör Fanı', 9, 1500.00, 'Adet', 'H2', 'Motor soğutma fanı'),
    ('12345678944', 'Ford', 'Cam Krikosu Ön Sağ', 10, 850.00, 'Adet', 'H2', 'Elektrikli cam mekanizması'),
    ('12345678945', 'Ford', 'Cam Krikosu Ön Sol', 10, 850.00, 'Adet', 'H2', 'Elektrikli cam mekanizması'),
    ('12345678946', 'Ford', 'Cam Krikosu Arka Sağ', 10, 800.00, 'Adet', 'H2', 'Arka sağ cam mekanizması'),
    ('12345678947', 'Ford', 'Cam Krikosu Arka Sol', 10, 800.00, 'Adet', 'H2', 'Arka sol cam mekanizması'),
    ('12345678948', 'Ford', 'Silecek Motoru', 15, 1200.00, 'Adet', 'I1', 'Ön cam silecek motoru'),
    ('12345678949', 'Ford', 'Silecek Kolu', 30, 150.00, 'Adet', 'I1', 'Ön cam için silecek kolu');

