package com.template.backend.repository.parametreler;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.template.backend.entities.parametreler.MotorHacmi;

public interface MotorHacmiRepository extends JpaRepository<MotorHacmi, Long> {
    @Query("SELECT m FROM MotorHacmi m ORDER BY m.adi ASC")
    List<MotorHacmi> findAllMotorHacmi();
}
