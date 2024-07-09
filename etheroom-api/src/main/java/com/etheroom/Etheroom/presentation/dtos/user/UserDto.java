package com.etheroom.Etheroom.presentation.dtos.user;

import com.etheroom.Etheroom.domain.models.user.User;
import com.etheroom.Etheroom.infrastructure.base.BaseEntityDto;
import com.etheroom.Etheroom.infrastructure.vo.enums.UserRole;
import com.etheroom.Etheroom.presentation.dtos.media.MediaDto;
import lombok.Getter;
import lombok.Setter;

import java.util.Optional;

@Getter
@Setter
public class UserDto extends BaseEntityDto<User> {

    private String ethereumAddress;
    private String ethereumPublicKey;
    private String email;
    private UserRole role;
    private MediaDto profilePicture;

    @Override
    public User mapDtoToEntity() {
        User user = new User();
        user.setId(this.getId());
        user.setEthereumAddress(this.getEthereumAddress());
        user.setEthereumPublicKey(this.getEthereumPublicKey());
        user.setEmail(this.getEmail());
        user.setRole(this.getRole());
        user.setProfilePicture(
                Optional.ofNullable(this.getProfilePicture())
                        .map(MediaDto::mapDtoToEntity)
                        .orElse(null)
        );
        user.setUpdatedAt(this.getUpdatedAt());
        user.setCreatedAt(this.getCreatedAt());
        return user;
    }
}
