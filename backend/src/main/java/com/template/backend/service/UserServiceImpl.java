package com.template.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.template.backend.constants.EntityPageConst;
import com.template.backend.entities.User;
import com.template.backend.interfaces.IUserService;
import com.template.backend.repository.UserRepository;
import com.template.backend.entities.ERole;

@Service
public class UserServiceImpl implements IUserService<User> {
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> findByRoleNameUsers(ERole roleEnum) {
        return userRepository.findByRoleNameUsers(roleEnum);
    }

    @Override
    public User save(User entity) {
        return userRepository.save(entity);
    }

    @Override
    public User update(Long id, User entity) {
        return userRepository.save(entity);
    }

    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Page<User> findAllPagination(int pageNum, String sortField, String sortDir, String keyword) {
        // Sayfa numarası negatif ise, 0'a ayarla
        pageNum = Math.max(0, pageNum);
        
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortField).ascending() : Sort.by(sortField).descending();
        Pageable pageable = PageRequest.of(pageNum - 1, EntityPageConst.DEFAULT_PAGE_SIZE, sort);
        if (keyword != null && !keyword.isEmpty()) {
            Page<User> users = userRepository.findAllUser(keyword, pageable);
            return users;
        }
        Page<User> users = userRepository.findAll(pageable);
        return users;
    }
}
