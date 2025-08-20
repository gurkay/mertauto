package com.template.backend.entities;

import java.time.LocalDateTime;

import com.template.backend.entities.parametreler.KasaIslemTuru;
import com.template.backend.entities.parametreler.KasaKategorileri;
import com.template.backend.entities.parametreler.KasaOdemeSekli;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "kasa")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Kasa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "kasa_islem_turu_id")
    private KasaIslemTuru kasaIslemTuru;

    @ManyToOne
    @JoinColumn(name = "kasa_kategorileri_id")
    private KasaKategorileri kasaKategorileri;

    @ManyToOne
    @JoinColumn(name = "kasa_odeme_sekli_id")
    private KasaOdemeSekli kasaOdemeSekli;

    @ManyToOne
    @JoinColumn(name = "is_emri_id")
    private IsEmri isEmri;

    @ManyToOne
    @JoinColumn(name = "stok_id")
    private Stok stok;

    private String aciklama;

    private LocalDateTime tarih;

    private Double tutar;
    
    
    
    
}

