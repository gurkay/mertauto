package com.template.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "stoklar")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Stok {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String barkodNo;
    private String stokMarkasi;
    private String stokAdi;
    private Double miktar;
    private Double birimFiyati;
    private String birim;
    private String rafKodu;
    private String aciklama;
}