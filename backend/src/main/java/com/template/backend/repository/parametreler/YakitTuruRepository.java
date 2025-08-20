package com.template.backend.repository.parametreler;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.template.backend.entities.parametreler.YakitTuru;

public interface YakitTuruRepository extends JpaRepository<YakitTuru, Long> {
    @Query("SELECT y FROM YakitTuru y ORDER BY y.adi ASC")
    List<YakitTuru> findAllYakitTuru();
}
