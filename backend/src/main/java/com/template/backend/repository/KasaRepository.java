package com.template.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.template.backend.entities.Kasa;

public interface KasaRepository extends JpaRepository<Kasa, Long> {
    @Query(
        "SELECT k " +
        "FROM Kasa k " +
        "WHERE CONCAT(" +
            "k.kasaIslemTuru.adi, ' ', k.kasaKategorileri.adi, ' ', k.kasaOdemeSekli.adi, ' ', " +
            "k.isEmri.isEmirNo, ' ', k.stok.stokAdi, ' ', k.aciklama " + 
            ") " +
            "LIKE %:keyword%" 
        )
    Page<Kasa> findAllKasa(String keyword, Pageable pageable);
    
}
