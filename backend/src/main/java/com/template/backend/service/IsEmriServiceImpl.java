package com.template.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.template.backend.constants.EntityPageConst;
import com.template.backend.entities.IsEmri;
import com.template.backend.entities.IsEmriDetay;
import com.template.backend.entities.Stok;
import com.template.backend.interfaces.IIsEmriService;
import com.template.backend.repository.IsEmriDetayRepository;
import com.template.backend.repository.IsEmriRepository;
import com.template.backend.repository.StokRepository;

@Service
public class IsEmriServiceImpl implements IIsEmriService<IsEmri> {

    @Autowired
    private IsEmriRepository isEmriRepository;

    @Autowired
    private StokRepository stokRepository;

    @Autowired
    private IsEmriDetayRepository isEmriDetayRepository;

    @Override
    public Page<IsEmri> findAllPagination(int pageNum, String sortField, String sortDir, String keyword) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortField).ascending() : Sort.by(sortField).descending();
        Pageable pageable = PageRequest.of(pageNum - 1, EntityPageConst.DEFAULT_PAGE_SIZE, sort);
        if (keyword != null && !keyword.isEmpty()) {
            Page<IsEmri> isEmri = isEmriRepository.findAllIsEmri(keyword, pageable);
            return isEmri;
        }
        Page<IsEmri> isEmri = isEmriRepository.findAll(pageable);
        return isEmri;
    }

    @Override
    public IsEmri save(IsEmri isEmri) {
        return isEmriRepository.save(isEmri);
    }

    @Override
    public void delete(Long id) {
        isEmriRepository.deleteById(id);
    }

    @Override
    public IsEmri update(Long id, IsEmri entity) {
        IsEmri isEmri = isEmriRepository.findById(id).orElse(null);
        if(isEmri == null){
            throw new RuntimeException("IsEmri bulunamadı");
        }
        isEmri.setAracKm(entity.getAracKm());
        isEmri.setArac(entity.getArac());
        isEmri.setAracDurumu(entity.getAracDurumu());
        isEmri.setDanisman(entity.getDanisman());
        isEmri.setTeknisyen(entity.getTeknisyen());
        isEmri.setYapilanIslem(entity.getYapilanIslem());
        isEmri.setMusteriTalep(entity.getMusteriTalep());
        isEmri.setServisIslemOnNotlari(entity.getServisIslemOnNotlari());
        isEmri.setServisIslemBitisNotlari(entity.getServisIslemBitisNotlari());
        isEmri.setServisIslemGizliNotlari(entity.getServisIslemGizliNotlari());
        isEmri.setIskonto(entity.getIskonto());
        return isEmriRepository.save(isEmri);
    }

    @Override
    public IsEmri findById(Long id) {
        return isEmriRepository.findById(id).orElse(null);
    }

    @Override
    public List<IsEmri> findAll() {
        return isEmriRepository.findAll();
    }

    @Override
    public IsEmriDetay saveIsEmriDetay(IsEmriDetay isEmriDetay) {
        try {
            if(isEmriDetay.getId() != null && isEmriDetay.getId() == 0) {
                isEmriDetay.setId(null);
            }
            
            if(isEmriDetay.getStok() != null){
                Stok stok = stokRepository.findById(isEmriDetay.getStok().getId()).orElse(null);
                if(stok != null){
                    isEmriDetay.setBirim(stok.getBirim());
                }
            } 
            
            return isEmriDetayRepository.save(isEmriDetay);
        } catch (Exception e) {
            throw new RuntimeException("IsEmriDetay kaydedilirken hata oluştu: " + e.getMessage());
        }
    }

    @Override
    public List<IsEmriDetay> findDetayByIsEmriId(Long isEmriId) {
        return isEmriDetayRepository.findByIsEmriId(isEmriId);
    }

    @Override
    public void deleteIsEmriDetay(Long id) {
        isEmriDetayRepository.deleteById(id);
    }

}
