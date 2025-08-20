package com.template.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.template.backend.constants.EntityPageConst;
import com.template.backend.entities.Arac;
import com.template.backend.interfaces.IAracService;
import com.template.backend.repository.AracRepository;

@Service
public class AracServiceImpl implements IAracService<Arac> {

    @Autowired
    private AracRepository aracRepository;

    @Override
    public Page<Arac> findAllPagination(int pageNum, String sortField, String sortDir, String keyword) {
        // Sayfa numarası negatif ise, 0'a ayarla
        pageNum = Math.max(0, pageNum);
        
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortField).ascending() : Sort.by(sortField).descending();
        Pageable pageable = PageRequest.of(pageNum - 1, EntityPageConst.DEFAULT_PAGE_SIZE, sort);
        if (keyword != null && !keyword.isEmpty()) {
            Page<Arac> araclar = aracRepository.findAllArac(keyword, pageable);
            return araclar;
        }
        Page<Arac> araclar = aracRepository.findAll(pageable);
        return araclar;
    }

    @Override
    public Arac save(Arac arac) {
        return aracRepository.save(arac);
    }

    @Override
    public void delete(Long id) {
        aracRepository.deleteById(id);
    }

    @Override
    public Arac update(Long id, Arac entity) {
        return aracRepository.save(entity);
    }

    @Override
    public Arac findById(Long id) {
        return aracRepository.findById(id).orElse(null);
    }

    @Override
    public List<Arac> findAll() {
        return aracRepository.findAll();
    }
}
