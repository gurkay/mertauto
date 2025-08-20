package com.template.backend.service.parametreler;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.template.backend.entities.parametreler.YakitTuru;
import com.template.backend.repository.parametreler.YakitTuruRepository;

@Service
public class YakitTuruService {
    @Autowired
    private YakitTuruRepository yakitTuruRepository;

    public List<YakitTuru> findAllYakitTuru() {
        return yakitTuruRepository.findAllYakitTuru();
    }
}