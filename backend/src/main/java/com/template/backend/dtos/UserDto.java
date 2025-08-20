package com.template.backend.dtos;

import java.util.List;

import com.template.backend.entities.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String email;
    private String name;
    private String surname;
    private String phone;
    private String address;
    private String city;
    private String postalCode;
    private String tcNo;
    private List<Role> roles;
}
