package com.template.backend.entities;

import java.util.List;

import com.template.backend.entities.parametreler.AracDurumu;
import com.template.backend.entities.parametreler.YapilanIslem;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "is_emirleri")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IsEmri {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String isEmirNo;
    private Long aracKm;

    @ManyToOne
    @JoinColumn(name = "arac_id")
    private Arac arac;

    @ManyToOne
    @JoinColumn(name = "teknisyen_id")
    private User teknisyen;

    @ManyToOne
    @JoinColumn(name = "danisman_id")
    private User danisman;

    @ManyToOne
    @JoinColumn(name = "arac_durumu_id")
    private AracDurumu aracDurumu;

    @ManyToOne
    @JoinColumn(name = "yapilan_islem_id")
    private YapilanIslem yapilanIslem;
    
    private Double iskonto;
    private String musteriTalep;
    private String servisIslemOnNotlari;
    private String servisIslemBitisNotlari;
    private String servisIslemGizliNotlari;
    
}

