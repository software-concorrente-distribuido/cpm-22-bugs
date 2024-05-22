package com.etheroom.Etheroom.domain.services.app;

import com.etheroom.Etheroom.infrastructure.vo.enums.UserRole;
import com.etheroom.Etheroom.presentation.dtos.app.EnumDto;
import com.etheroom.Etheroom.presentation.services.app.IEnumService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnumService implements IEnumService {

    @Override
    public List<EnumDto> findEnumByName(String name) {
        return switch (name) {
            case "userRole" -> UserRole.buildEnumDto();
            default -> null;
        };
    }

}
