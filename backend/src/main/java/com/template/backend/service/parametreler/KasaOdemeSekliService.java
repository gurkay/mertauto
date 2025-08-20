package com.template.backend.service.parametreler;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.template.backend.entities.parametreler.KasaOdemeSekli;
import com.template.backend.repository.parametreler.KasaOdemeSekliRepository;

@Service
public class KasaOdemeSekliService {
    @Autowired
    private KasaOdemeSekliRepository kasaOdemeSekliRepository;

    public List<KasaOdemeSekli> findAllKasaOdemeSekli() {
        return kasaOdemeSekliRepository.findAll();
    }
}