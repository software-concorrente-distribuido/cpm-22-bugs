package com.etheroom.Etheroom.domain.models.user;

import com.etheroom.Etheroom.domain.models.media.Media;
import com.etheroom.Etheroom.infrastructure.base.BaseEntity;
import com.etheroom.Etheroom.infrastructure.vo.enums.UserRole;
import com.etheroom.Etheroom.presentation.dtos.user.UserDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Getter
@Setter
@Table(name = "etheroom_user")
@Entity
public class User extends BaseEntity implements UserDetails {

    @Column(name = "email")
    private String email;

    @Column(name = "ethereum_address", unique = true, updatable = false)
    private String ethereumAddress;

    @Column(name = "ethereum_public_key", unique = true, updatable = false)
    private String ethereumPublicKey;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", updatable = false)
    private UserRole role;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "profile_picture_id", referencedColumnName = "id")
    private Media profilePicture;

    @Override
    public Collection<SimpleGrantedAuthority> getAuthorities() {
        return List.of(
                new SimpleGrantedAuthority(this.role.name())
        );
    }

    @Transient
    private String addressToMatch;

    @Transient
    private String keyToMatch;

    @Override
    public String getPassword() {
        return this.ethereumPublicKey;
    }

    @Override
    public String getUsername() {
        return this.ethereumAddress;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public UserDto mapEntityToDto() {
        UserDto userDto = new UserDto();
        userDto.setId(this.getId());
        userDto.setEthereumAddress(this.getEthereumAddress());
        userDto.setEthereumPublicKey(this.getEthereumPublicKey());
        userDto.setEmail(this.getEmail());
        userDto.setRole(this.getRole());
        userDto.setProfilePicture(
                Optional.ofNullable(this.getProfilePicture())
                        .map(Media::mapEntityToDto)
                        .orElse(null)
        );
        userDto.setUpdatedAt(this.getUpdatedAt());
        userDto.setCreatedAt(this.getCreatedAt());
        return userDto;
    }
}
