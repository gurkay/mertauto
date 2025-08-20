package com.template.backend.service.parametreler;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.template.backend.entities.parametreler.Marka;
import com.template.backend.repository.parametreler.MarkaRepository;

@Service
public class MarkaService {

    @Autowired
    private MarkaRepository markaRepository;
    
    public List<Marka> findAllMarkalar() {
        return markaRepository.findAllMarkalar();
    }
    
}