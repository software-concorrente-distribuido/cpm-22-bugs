package com.etheroom.Etheroom.domain.models.hotel.aggregates;

import com.etheroom.Etheroom.infrastructure.base.BaseEntity;
import com.etheroom.Etheroom.infrastructure.base.BaseEntityDto;
import com.etheroom.Etheroom.infrastructure.vo.enums.ConvenienceType;
import com.etheroom.Etheroom.presentation.dtos.hotel.aggregates.ConvenienceDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Table(name = "etheroom_convenience")
@Entity
public class Convenience extends BaseEntity {

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private ConvenienceType type;

    @Override
    public ConvenienceDto mapEntityToDto() {
        ConvenienceDto convenienceDto = new ConvenienceDto();
        convenienceDto.setId(this.getId());
        convenienceDto.setType(this.getType());
        return convenienceDto;
    }
}
