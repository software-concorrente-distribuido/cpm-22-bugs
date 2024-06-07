package com.etheroom.Etheroom.presentation.dtos.user;

import com.etheroom.Etheroom.domain.models.user.User;
import com.etheroom.Etheroom.infrastructure.base.BaseEntityDto;
import com.etheroom.Etheroom.infrastructure.vo.enums.UserRole;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto extends BaseEntityDto<User> {

    private String ethereumAddress;
    private String email;
    private UserRole role;

    @Override
    public User mapDtoToEntity() {
        User user = new User();
        user.setId(this.getId());
        user.setEthereumAddress(this.getEthereumAddress());
        user.setEmail(this.getEmail());
        user.setRole(this.getRole());
        user.setUpdatedAt(this.getUpdatedAt());
        user.setCreatedAt(this.getCreatedAt());
        return user;
    }
}
