package com.etheroom.Etheroom.presentation.dtos;

import com.etheroom.Etheroom.domain.models.User;
import com.etheroom.Etheroom.infrastructure.base.BaseEntityDto;
import com.etheroom.Etheroom.infrastructure.vo.enums.UserRole;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto extends BaseEntityDto<User> {

    private String name;
    private String address;
    private String email;
    private Boolean locked;
    private UserRole role;

    @Override
    public User mapDtoToEntity() {
        User user = new User();
        user.setId(this.getId());
        user.setName(this.getName());
        user.setAddress(this.getAddress());
        user.setEmail(this.getEmail());
        user.setLocked(this.getLocked());
        user.setRole(this.getRole());
        user.setUpdatedAt(this.getUpdatedAt());
        user.setCreatedAt(this.getCreatedAt());
        return user;
    }
}
