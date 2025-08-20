package com.template.backend.interfaces;

import java.util.List;

import org.springframework.data.domain.Page;

import com.template.backend.entities.ERole;

public interface IUserService<T> extends IGenericService<T> {
    public Page<T> findAllPagination(int pageNum, String sortField, String sortDir, String keyword);
    List<T> findByRoleNameUsers(ERole roleEnum);
}
