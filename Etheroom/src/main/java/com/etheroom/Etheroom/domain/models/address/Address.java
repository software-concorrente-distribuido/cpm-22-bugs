package com.etheroom.Etheroom.domain.models.address;

import com.etheroom.Etheroom.infrastructure.base.BaseEntity;
import com.etheroom.Etheroom.presentation.dtos.address.AddressDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Table(name = "etheroom_address")
@Entity
public class Address extends BaseEntity {

    @Column(name = "description")
    private String description;

    @Column(name = "country")
    private String country;

    @Column(name = "zip_code")
    private String zipCode;

    @Override
    public AddressDto mapEntityToDto() {
        AddressDto addressDto = new AddressDto();
        addressDto.setId(this.getId());
        addressDto.setDescription(this.getDescription());
        addressDto.setCountry(this.getCountry());
        addressDto.setZipCode(this.getZipCode());
        addressDto.setUpdatedAt(this.getUpdatedAt());
        addressDto.setCreatedAt(this.getCreatedAt());
        return addressDto;
    }

}
