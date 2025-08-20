package com.template.backend.service.parametreler;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.template.backend.entities.parametreler.KasaIslemTuru;
import com.template.backend.repository.parametreler.KasaIslemTuruRepository;

@Service
public class KasaIslemTuruService {
    @Autowired
    private KasaIslemTuruRepository kasaIslemTuruRepository;

    public List<KasaIslemTuru> findAllKasaIslemTuru() {
        return kasaIslemTuruRepository.findAll();
    }
}