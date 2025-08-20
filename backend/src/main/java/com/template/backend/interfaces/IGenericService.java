package com.template.backend.interfaces;

import java.util.List;

public interface IGenericService<T> {
    T save(T entity);
    T update(Long id, T entity);
    void delete(Long id);
    T findById(Long id);
    List<T> findAll();
}
