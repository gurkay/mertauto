package com.template.backend.service.parametreler;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.template.backend.entities.parametreler.YapilanIslem;
import com.template.backend.repository.parametreler.YapilanIslemRepository;

@Service
public class YapilanIslemService {
    @Autowired
    private YapilanIslemRepository yapilanIslemRepository;

    public List<YapilanIslem> findAllYapilanIslem() {
        return yapilanIslemRepository.findAll();
    }
}
