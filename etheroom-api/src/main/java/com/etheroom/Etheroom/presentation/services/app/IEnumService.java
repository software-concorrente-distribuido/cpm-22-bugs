package com.etheroom.Etheroom.presentation.services.app;

import com.etheroom.Etheroom.presentation.dtos.app.EnumDto;

import java.util.List;

public interface IEnumService {

    List<EnumDto> findEnumByName(String name);

}
