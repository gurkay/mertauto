package com.template.backend.repository.parametreler;

import org.springframework.data.jpa.repository.JpaRepository;

import com.template.backend.entities.parametreler.AracDurumu;

public interface AracDurumuRepository extends JpaRepository<AracDurumu, Long> {
    
}
