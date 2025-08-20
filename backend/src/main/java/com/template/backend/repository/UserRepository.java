package com.template.backend.repository;

import com.template.backend.entities.ERole;
import com.template.backend.entities.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

// Use ReactiveCrudRepository instead of JpaRepository
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Boolean existsByEmail(String email);

    //find by email
    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u JOIN u.roles r WHERE r.name = :roleEnum")
    List<User> findByRoleNameUsers(@Param("roleEnum") ERole roleEnum);

    @Query(
        "SELECT u " +
        "FROM User u " +
        "WHERE CONCAT(" +
            "u.name, ' ', u.email, ' ', u.tcNo, ' ', u.surname, ' ', u.phone, ' ', " +
            "u.city " +
            ") " +
            "LIKE %:keyword%" 
        )
    Page<User> findAllUser(String keyword, Pageable pageable);

}
