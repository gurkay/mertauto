package com.template.backend.dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDtos {
    private List<UserDto> users;
    private int totalPages;
    private long totalElements;
    private int numberOfElements;
    private int size;
    private int number;
}
