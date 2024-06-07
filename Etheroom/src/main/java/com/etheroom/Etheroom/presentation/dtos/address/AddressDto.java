package com.etheroom.Etheroom.presentation.dtos.address;

import com.etheroom.Etheroom.domain.models.address.Address;
import com.etheroom.Etheroom.infrastructure.base.BaseEntityDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressDto extends BaseEntityDto<Address> {

    private String description;
    private String country;
    private String zipCode;

    @Override
    public Address mapDtoToEntity() {
        Address address = new Address();
        address.setId(this.getId());
        address.setDescription(this.getDescription());
        address.setZipCode(this.getZipCode());
        address.setCountry(this.getCountry());
        address.setUpdatedAt(this.getUpdatedAt());
        address.setCreatedAt(this.getCreatedAt());
        return address;
    }

}
