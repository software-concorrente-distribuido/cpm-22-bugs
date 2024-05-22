package com.etheroom.Etheroom.domain.models;

import com.etheroom.Etheroom.infrastructure.base.BaseEntity;
import com.etheroom.Etheroom.infrastructure.base.BaseEntityDto;
import com.etheroom.Etheroom.infrastructure.vo.enums.UserRole;
import com.etheroom.Etheroom.presentation.dtos.UserDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
@Setter
@Table(name = "etheroom_user")
@Entity
public class User extends BaseEntity implements UserDetails {

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "address")
    private String address;

    @Column(name = "locked")
    private Boolean locked;

    @Column(name = "role")
    private UserRole role;

    @Override
    public Collection<SimpleGrantedAuthority> getAuthorities() {
        return List.of(
                new SimpleGrantedAuthority(this.role.name())
        );
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return this.address;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !this.locked;
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
        userDto.setName(this.getName());
        userDto.setAddress(this.getAddress());
        userDto.setEmail(this.getEmail());
        userDto.setLocked(this.getLocked());
        userDto.setRole(this.getRole());
        userDto.setUpdatedAt(this.getUpdatedAt());
        userDto.setCreatedAt(this.getCreatedAt());
        return userDto;
    }
}
