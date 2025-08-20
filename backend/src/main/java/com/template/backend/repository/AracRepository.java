package com.template.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.template.backend.entities.Arac;

@Repository
public interface AracRepository extends JpaRepository<Arac, Long> {
    @Query(
        "SELECT a " +
        "FROM Arac a " +
        "WHERE CONCAT(" +
            "a.plaka, ' ', a.sasiNo, ' ', a.motorNo, ' ', a.musteriTc, ' ', a.musteriAdSoyad, ' ', " +
            "a.musteriVergiDairesi, ' ', ' ', a.model.adi, ' ', a.model.marka.adi " +
            ") " +
            "LIKE %:keyword%" 
        )
    Page<Arac> findAllArac(String keyword, Pageable pageable);
}
