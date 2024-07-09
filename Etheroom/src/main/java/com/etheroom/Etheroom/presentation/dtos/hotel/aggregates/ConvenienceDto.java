package com.etheroom.Etheroom.presentation.dtos.hotel.aggregates;

import com.etheroom.Etheroom.domain.models.hotel.aggregates.Convenience;
import com.etheroom.Etheroom.infrastructure.base.BaseEntityDto;
import com.etheroom.Etheroom.infrastructure.vo.enums.ConvenienceType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ConvenienceDto extends BaseEntityDto<Convenience> {

    private ConvenienceType type;


    @Override
    public Convenience mapDtoToEntity() {
        Convenience convenience = new Convenience();
        convenience.setId(this.getId());
        convenience.setType(this.getType());
        return convenience;
    }
}
