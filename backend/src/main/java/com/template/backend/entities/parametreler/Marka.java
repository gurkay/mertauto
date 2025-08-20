package com.template.backend.entities.parametreler;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "markalar")
public class Marka {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String adi;
    private String resim_url;
    private Date created_at;

    public Marka() {
    }

    public Marka(String adi, String resim_url) {
        this.adi = adi;
        this.resim_url = resim_url;
    }

    public Long getId() {
        return id;
    }

    public String getAdi() {
        return adi;
    }

    public String getResim_url() {
        return resim_url;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setAdi(String adi) {
        this.adi = adi;
    }

    public void setResim_url(String resim_url) {
        this.resim_url = resim_url;
    }
}
