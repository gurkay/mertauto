package com.template.backend.service.parametreler;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.template.backend.entities.parametreler.AracDurumu;
import com.template.backend.repository.parametreler.AracDurumuRepository;

@Service
public class AracDurumuService {
    @Autowired
    private AracDurumuRepository aracDurumuRepository;

    public List<AracDurumu> findAllAracDurumu() {
        return aracDurumuRepository.findAll();
    }
}