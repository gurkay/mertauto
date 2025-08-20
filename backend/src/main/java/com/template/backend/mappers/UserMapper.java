package com.template.backend.mappers;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import com.template.backend.dtos.UserDto;
import com.template.backend.dtos.UserDtos;
import com.template.backend.entities.User;

@Component
public class UserMapper {
    @Autowired
    private ModelMapper modelMapper;

    public UserDto convertToDto(User user) {
        return modelMapper.map(user, UserDto.class);
    }

    public List<UserDto> convertToDto(List<User> users) {
        return users.stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }

    public User convertToEntity(UserDto userDto) {
        return modelMapper.map(userDto, User.class);
    }

    public List<User> convertToEntity(List<UserDto> userDtos) {
        return userDtos.stream()
            .map(this::convertToEntity)
            .collect(Collectors.toList());
    }

    public UserDtos convertToDtos(Page<User> users) {
        UserDtos userDtos = new UserDtos();
        userDtos.setUsers(convertToDto(users.getContent()));
        userDtos.setTotalPages(users.getTotalPages());
        userDtos.setTotalElements(users.getTotalElements());
        userDtos.setNumberOfElements(users.getNumberOfElements());
        userDtos.setSize(users.getSize());
        userDtos.setNumber(users.getNumber());
        return userDtos;
    }
}
