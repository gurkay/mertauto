package com.template.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.template.backend.entities.IsEmriDetay;

public interface IsEmriDetayRepository extends JpaRepository<IsEmriDetay, Long> {
    @Query("SELECT ied FROM IsEmriDetay ied WHERE ied.isEmri.id = :isEmriId")
    List<IsEmriDetay> findByIsEmriId(@Param("isEmriId") Long isEmriId);
}
