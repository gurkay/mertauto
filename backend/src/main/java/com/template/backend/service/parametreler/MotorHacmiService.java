package com.template.backend.service.parametreler;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.template.backend.entities.parametreler.MotorHacmi;
import com.template.backend.repository.parametreler.MotorHacmiRepository;

@Service
public class MotorHacmiService {
    @Autowired
    private MotorHacmiRepository motorHacmiRepository;

    public List<MotorHacmi> findAllMotorHacmi() {
        return motorHacmiRepository.findAllMotorHacmi();
    }
}