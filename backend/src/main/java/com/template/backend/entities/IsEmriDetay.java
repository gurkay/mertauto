package com.template.backend.entities;

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
@Table(name = "is_emirleri_detay")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IsEmriDetay {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "is_emri_id")
    private IsEmri isEmri;

    @ManyToOne
    @JoinColumn(name = "stok_id")
    private Stok stok;

    private String yapilanIslemAdi;
    private Double birimFiyati;
    private String birim;
    private Double miktar;

}