package com.template.backend.service.parametreler;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.template.backend.entities.parametreler.KasaKategorileri;
import com.template.backend.repository.parametreler.KasaKategorileriRepository;

@Service
public class KasaKategorileriService {
    @Autowired
    private KasaKategorileriRepository kasaKategorileriRepository;

    public List<KasaKategorileri> findAllKasaKategorileri() {
        return kasaKategorileriRepository.findAll();
    }
}