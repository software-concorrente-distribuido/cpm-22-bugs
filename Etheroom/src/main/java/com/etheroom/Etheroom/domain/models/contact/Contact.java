package com.etheroom.Etheroom.domain.models.contact;

import com.etheroom.Etheroom.infrastructure.base.BaseEntity;
import com.etheroom.Etheroom.presentation.dtos.contact.ContactDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Table(name = "etheroom_contact")
@Entity
public class Contact extends BaseEntity {

    @Column(name = "phone")
    private String phone;

    @Column(name = "cellphone")
    private String cellphone;

    @Override
    public ContactDto mapEntityToDto() {
        ContactDto contactDto = new ContactDto();
        contactDto.setId(this.getId());
        contactDto.setPhone(this.getPhone());
        contactDto.setCellphone(this.getCellphone());
        contactDto.setUpdatedAt(this.getUpdatedAt());
        contactDto.setCreatedAt(this.getCreatedAt());
        return contactDto;
    }

}
