package com.template.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.template.backend.entities.Stok;

@Repository
public interface StokRepository extends JpaRepository<Stok, Long> {
    @Query(
        "SELECT s " +
        "FROM Stok s " +
        "WHERE CONCAT(" +
            "s.barkodNo, ' ', s.stokMarkasi, ' ', s.stokAdi, ' ', " +
            "s.rafKodu, ' ', s.aciklama " +
            ") " +
            "LIKE %:keyword%" 
        )
    Page<Stok> findAllStok(String keyword, Pageable pageable);
}
