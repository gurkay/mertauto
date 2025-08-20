package com.template.backend.interfaces;

import java.util.List;

import org.springframework.data.domain.Page;

import com.template.backend.entities.IsEmriDetay;

public interface IIsEmriService<T> extends IGenericService<T> {
    public Page<T> findAllPagination(int pageNum, String sortField, String sortDir, String keyword);
    public IsEmriDetay saveIsEmriDetay(IsEmriDetay isEmriDetay);
    public List<IsEmriDetay> findDetayByIsEmriId(Long isEmriId);
    public void deleteIsEmriDetay(Long id); 
}
