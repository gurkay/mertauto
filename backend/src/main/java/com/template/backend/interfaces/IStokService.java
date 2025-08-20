package com.template.backend.interfaces;

import org.springframework.data.domain.Page;

public interface IStokService<T> extends IGenericService<T> {
    public Page<T> findAllPagination(int pageNum, String sortField, String sortDir, String keyword);
}
