package com.template.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.template.backend.entities.IsEmri;

public interface IsEmriRepository extends JpaRepository<IsEmri, Long> {
    @Query(
        "SELECT iE " +
        "FROM IsEmri iE " +
        "WHERE CONCAT(" +
            "iE.isEmirNo, ' ', iE.arac.plaka, ' ', iE.arac.musteriAdSoyad, ' ', " +
            "iE.arac.musteriTc, ' ', iE.arac.sasiNo, ' ', iE.arac.motorNo, ' ', " +
            "iE.arac.model.adi, ' ', iE.arac.model.marka.adi " +
            ") " +
            "LIKE %:keyword%" 
        )
    Page<IsEmri> findAllIsEmri(String keyword, Pageable pageable);
}
