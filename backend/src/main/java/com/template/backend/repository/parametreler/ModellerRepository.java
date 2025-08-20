package com.template.backend.repository.parametreler;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.template.backend.entities.parametreler.Model;

public interface ModellerRepository extends JpaRepository<Model, Long> {
    @Query("SELECT m FROM Model m WHERE m.marka.id = :markaId ORDER BY m.adi ASC ")
    List<Model> findByMarkaId(@Param("markaId") Long markaId);
}
