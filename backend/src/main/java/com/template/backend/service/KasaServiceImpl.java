package com.template.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.template.backend.constants.EntityPageConst;
import com.template.backend.entities.Kasa;
import com.template.backend.interfaces.IKasaService;
import com.template.backend.repository.KasaRepository;

@Service
public class KasaServiceImpl implements IKasaService<Kasa> {
    @Autowired
    private KasaRepository kasaRepository;

    @Override
    public Kasa save(Kasa entity) {
        return kasaRepository.save(entity);
    }

    @Override
    public Kasa update(Long id, Kasa entity) {
        Kasa kasa = kasaRepository.findById(id).orElse(null);
        if (kasa == null) {
            throw new RuntimeException("Kasa bulunamadı");
        }
        kasa.setKasaIslemTuru(entity.getKasaIslemTuru());
        kasa.setKasaKategorileri(entity.getKasaKategorileri());
        kasa.setKasaOdemeSekli(entity.getKasaOdemeSekli());
        kasa.setIsEmri(entity.getIsEmri());
        kasa.setStok(entity.getStok());
        kasa.setAciklama(entity.getAciklama());
        kasa.setTarih(entity.getTarih());
        kasa.setTutar(entity.getTutar());
        
        return kasaRepository.save(kasa);
    }

    @Override
    public void delete(Long id) {
        kasaRepository.deleteById(id);
    }

    @Override
    public Kasa findById(Long id) {
        return kasaRepository.findById(id).orElse(null);
    }

    @Override
    public List<Kasa> findAll() {
        return kasaRepository.findAll();
    }

    @Override
    public Page<Kasa> findAllPagination(int pageNum, String sortField, String sortDir, String keyword) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortField).ascending() : Sort.by(sortField).descending();
        Pageable pageable = PageRequest.of(pageNum - 1, EntityPageConst.DEFAULT_PAGE_SIZE, sort);
        if (keyword != null && !keyword.isEmpty()) {
            Page<Kasa> kasalar = kasaRepository.findAllKasa(keyword, pageable);
            return kasalar;
        }
        Page<Kasa> kasalar = kasaRepository.findAll(pageable);
        return kasalar;
    }

    
}
