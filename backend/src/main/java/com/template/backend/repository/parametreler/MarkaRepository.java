package com.template.backend.repository.parametreler;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.template.backend.entities.parametreler.Marka;

public interface MarkaRepository extends JpaRepository<Marka, Long> {
    @Query("SELECT m FROM Marka m ORDER BY m.adi")
    List<Marka> findAllMarkalar();
}
