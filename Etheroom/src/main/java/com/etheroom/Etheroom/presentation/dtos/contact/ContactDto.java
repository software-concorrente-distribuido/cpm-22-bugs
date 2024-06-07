package com.etheroom.Etheroom.presentation.dtos.contact;

import com.etheroom.Etheroom.domain.models.contact.Contact;
import com.etheroom.Etheroom.infrastructure.base.BaseEntityDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContactDto extends BaseEntityDto<Contact> {

    private String phone;
    private String cellphone;

    @Override
    public Contact mapDtoToEntity() {
        Contact contact = new Contact();
        contact.setId(this.getId());
        contact.setPhone(this.getPhone());
        contact.setCellphone(this.getCellphone());
        contact.setUpdatedAt(this.getUpdatedAt());
        contact.setCreatedAt(this.getCreatedAt());
        return contact;
    }

}
