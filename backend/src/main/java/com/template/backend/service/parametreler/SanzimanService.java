package com.template.backend.service.parametreler;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.template.backend.entities.parametreler.Sanziman;
import com.template.backend.repository.parametreler.SanzimanRepository;

@Service
public class SanzimanService {
    @Autowired
    private SanzimanRepository sanzimanRepository;

    public List<Sanziman> findAllSanziman() {
        return sanzimanRepository.findAllSanziman();
    }
}