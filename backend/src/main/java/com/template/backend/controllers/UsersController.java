package com.template.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.template.backend.dtos.UserDto;
import com.template.backend.dtos.UserDtos;
import com.template.backend.entities.ERole;
import com.template.backend.entities.User;
import com.template.backend.interfaces.IUserService;
import com.template.backend.mappers.UserMapper;

@Controller
@RequestMapping("/api/users")
public class UsersController {

    private final IUserService<User> userService;
    private final UserMapper userMapper;

    public UsersController(IUserService<User> userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }
    
    @GetMapping("/page/{pageNum}")
    public ResponseEntity<UserDtos> findAllPagination(
        @PathVariable(value = "pageNum") int pageNum,
        @RequestParam("sortField") String sortField,
        @RequestParam("sortDir") String sortDir,
        @RequestParam("keyword") String keyword) {
            
        if (sortField == null) {
            sortField = "name";
            sortDir = "asc";
        }
        Page<User> pageUser = userService.findAllPagination(pageNum, sortField, sortDir, keyword);
        return ResponseEntity.ok(userMapper.convertToDtos(pageUser));
    }

    @PostMapping
    public ResponseEntity<UserDto> save(@RequestBody User user) {
        User savedUser = userService.save(user);
        return ResponseEntity.ok(userMapper.convertToDto(savedUser));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> update(@PathVariable Long id, @RequestBody User user) {
        User updatedUser = userService.update(id, user);
        return ResponseEntity.ok(userMapper.convertToDto(updatedUser));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> findById(@PathVariable Long id) {
        User user = userService.findById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userMapper.convertToDto(user));
    }

    @GetMapping("/role/{roleName}")
    public ResponseEntity<List<UserDto>> findByRoleNameUsers(@PathVariable String roleName) {
        ERole roleEnum;
        try {
            // Convert String to ERole enum (case-insensitive)
            roleEnum = ERole.valueOf(roleName.toUpperCase());
        } catch (IllegalArgumentException e) {
            // Handle invalid role name string
            return ResponseEntity.badRequest().body(null); // Or return a specific error response
        }
        List<User> users = userService.findByRoleNameUsers(roleEnum);
        
        return ResponseEntity.ok(userMapper.convertToDto(users));
    }
}
