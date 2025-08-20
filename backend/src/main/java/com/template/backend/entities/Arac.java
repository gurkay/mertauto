package com.template.backend.entities;

import java.util.Date;

import com.template.backend.entities.parametreler.Model;
import com.template.backend.entities.parametreler.MotorHacmi;
import com.template.backend.entities.parametreler.Sanziman;
import com.template.backend.entities.parametreler.YakitTuru;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "araclar")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Arac {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "model_id")
    private Model model;

    @ManyToOne
    @JoinColumn(name = "motor_hacmi_id")
    private MotorHacmi motorHacmi;

    @ManyToOne
    @JoinColumn(name = "yakit_turu_id")
    private YakitTuru yakitTuru;

    @ManyToOne
    @JoinColumn(name = "sanziman_id")
    private Sanziman sanziman;

    private String plaka;
    private String sasiNo;
    private String motorNo;
    private Integer modelYili;
    private String musteriTc;
    private String musteriAdSoyad;
    private String musteriTelefon;
    private String musteriEmail;
    private String musteriAdres;
    private String musteriVergiDairesi;
    private String araciTeslimEdenTc;
    private String araciTeslimEdenAdSoyad;
    private String araciTeslimEdenTelefon;
}


