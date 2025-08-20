CREATE DATABASE IF NOT EXISTS mertautodb;
USE mertautodb;

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET collation_connection = 'utf8mb4_unicode_ci';

-- Veritabanı karakter seti ayarı
ALTER DATABASE mertautodb CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NULL,
    surname VARCHAR(255) NULL,
    phone VARCHAR(255) NULL,
    address VARCHAR(255) NULL,
    city VARCHAR(255) NULL,
    postal_code VARCHAR(255) NULL,
    tc_no VARCHAR(255) NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users_roles (
    user_id BIGINT,
    role_id BIGINT,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS markalar (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    adi VARCHAR(255) NOT NULL,
    resim_url VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS modeller (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    marka_id BIGINT NOT NULL,
    adi VARCHAR(255) NOT NULL,
    resim_url VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (marka_id) REFERENCES markalar(id)
);

CREATE TABLE IF NOT EXISTS sanziman (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    adi VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS motor_hacmi (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    adi VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS yakit_turu (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    adi VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS arac_durumu (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    adi VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS yapilan_islemler (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    adi VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS kasa_kategorileri (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    adi VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS kasa_islem_turu (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    adi VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS kasa_odeme_sekli (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    adi VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS araclar (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    model_id BIGINT NULL,
    motor_hacmi_id BIGINT NULL,
    yakit_turu_id BIGINT NULL,
    sanziman_id BIGINT NULL,
    plaka VARCHAR(255) NULL,
    sasi_no VARCHAR(255) NULL,
    motor_no VARCHAR(255) NULL,
    model_yili SMALLINT NULL,
    musteri_tc VARCHAR(255) NULL,
    musteri_ad_soyad VARCHAR(255) NULL,
    musteri_telefon VARCHAR(255) NULL,
    musteri_email VARCHAR(255) NULL,
    musteri_adres VARCHAR(255) NULL,
    musteri_vergi_dairesi VARCHAR(255) NULL,
    araci_teslim_eden_tc VARCHAR(255) NULL,
    araci_teslim_eden_ad_soyad VARCHAR(255) NULL,
    araci_teslim_eden_telefon VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (model_id) REFERENCES modeller(id),
    FOREIGN KEY (motor_hacmi_id) REFERENCES motor_hacmi(id),
    FOREIGN KEY (yakit_turu_id) REFERENCES yakit_turu(id),
    FOREIGN KEY (sanziman_id) REFERENCES sanziman(id)
);

CREATE TABLE IF NOT EXISTS stoklar (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    barkod_no VARCHAR(255) NULL,
    stok_markasi VARCHAR(255) NULL,
    stok_adi VARCHAR(255) NULL,
    miktar DECIMAL(10, 2) NULL,
    birim_fiyati DECIMAL(10, 2) NULL,
    birim VARCHAR(255) NULL,
    raf_kodu VARCHAR(255) NULL,
    aciklama VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS is_emirleri (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    is_emir_no VARCHAR(255) NOT NULL,
    arac_km BIGINT NULL,
    arac_id BIGINT NULL,
    teknisyen_id BIGINT NULL,
    danisman_id BIGINT NULL,
    arac_durumu_id BIGINT NULL,
    yapilan_islem_id BIGINT NULL,
    iskonto DECIMAL(10, 2) NULL,
    musteri_talep VARCHAR(255) NULL,
    servis_islem_on_notlari VARCHAR(255) NULL,
    servis_islem_bitis_notlari VARCHAR(255) NULL,
    servis_islem_gizli_notlari VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (arac_id) REFERENCES araclar(id),
    FOREIGN KEY (teknisyen_id) REFERENCES users(id),
    FOREIGN KEY (danisman_id) REFERENCES users(id),
    FOREIGN KEY (arac_durumu_id) REFERENCES arac_durumu(id),
    FOREIGN KEY (yapilan_islem_id) REFERENCES yapilan_islemler(id)
);

CREATE TABLE IF NOT EXISTS is_emirleri_detay (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    is_emri_id BIGINT NULL,
    stok_id BIGINT NULL,
    yapilan_islem_adi VARCHAR(255) NULL,
    birim_fiyati DECIMAL(10, 2) NULL,
    birim VARCHAR(255) NULL,
    miktar DECIMAL(10, 2) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (is_emri_id) REFERENCES is_emirleri(id),
    FOREIGN KEY (stok_id) REFERENCES stoklar(id)
);

CREATE TABLE IF NOT EXISTS kasa (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    kasa_islem_turu_id BIGINT NOT NULL,
    kasa_kategorileri_id BIGINT NOT NULL,
    kasa_odeme_sekli_id BIGINT NOT NULL,
    aciklama VARCHAR(255) NULL,
    tarih TIMESTAMP NULL,
    tutar DECIMAL(10,2) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (kasa_islem_turu_id) REFERENCES kasa_islem_turu(id),
    FOREIGN KEY (kasa_kategorileri_id) REFERENCES kasa_kategorileri(id),
    FOREIGN KEY (kasa_odeme_sekli_id) REFERENCES kasa_odeme_sekli(id)
);
