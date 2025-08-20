package com.template.backend.repository.parametreler;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.template.backend.entities.parametreler.Sanziman;

public interface SanzimanRepository extends JpaRepository<Sanziman, Long> {
    @Query("SELECT s FROM Sanziman s ORDER BY s.adi ASC")
    List<Sanziman> findAllSanziman();
}
