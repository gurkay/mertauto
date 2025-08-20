package com.template.backend.repository.parametreler;

import org.springframework.data.jpa.repository.JpaRepository;

import com.template.backend.entities.parametreler.KasaIslemTuru;

public interface KasaIslemTuruRepository extends JpaRepository<KasaIslemTuru, Long> {
    
}
