package com.template.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.template.backend.constants.EntityPageConst;
import com.template.backend.entities.Stok;
import com.template.backend.interfaces.IStokService;
import com.template.backend.repository.StokRepository;


@Service
public class StokServiceImpl implements IStokService<Stok> {

    @Autowired
    private StokRepository stokRepository;

    @Override
    public Stok save(Stok entity) {
        return stokRepository.save(entity);
    }

    @Override
    public Stok update(Long id, Stok entity) {
        Stok stok = stokRepository.findById(id).orElse(null);
        if (stok == null) {
            throw new RuntimeException("Stok bulunamadı");
        }
        stok.setBarkodNo(entity.getBarkodNo());
        stok.setStokMarkasi(entity.getStokMarkasi());
        stok.setStokAdi(entity.getStokAdi());
        stok.setMiktar(entity.getMiktar());
        stok.setBirimFiyati(entity.getBirimFiyati());
        stok.setBirim(entity.getBirim());
        stok.setRafKodu(entity.getRafKodu());
        stok.setAciklama(entity.getAciklama());
        return stokRepository.save(stok);
    }

    @Override
    public void delete(Long id) {
        stokRepository.deleteById(id);
    }

    @Override
    public Stok findById(Long id) {
        return stokRepository.findById(id).orElse(null);
    }

    @Override
    public List<Stok> findAll() {
        return stokRepository.findAll();
    }

    @Override
    public Page<Stok> findAllPagination(int pageNum, String sortField, String sortDir, String keyword) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortField).ascending() : Sort.by(sortField).descending();
        Pageable pageable = PageRequest.of(pageNum - 1, EntityPageConst.DEFAULT_PAGE_SIZE, sort);
        if (keyword != null && !keyword.isEmpty()) {
            Page<Stok> stoklar = stokRepository.findAllStok(keyword, pageable);
            return stoklar;
        }
        Page<Stok> stoklar = stokRepository.findAll(pageable);
        return stoklar;
    }
}
