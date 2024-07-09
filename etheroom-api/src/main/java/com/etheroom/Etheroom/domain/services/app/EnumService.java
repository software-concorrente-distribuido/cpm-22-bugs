package com.etheroom.Etheroom.domain.services.app;

import com.etheroom.Etheroom.infrastructure.vo.enums.BookingStatus;
import com.etheroom.Etheroom.infrastructure.vo.enums.ConvenienceType;
import com.etheroom.Etheroom.infrastructure.vo.enums.HotelRoomType;
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
            case "bookingStatus" -> BookingStatus.buildEnumDto();
            case "hotelRoomType" -> HotelRoomType.buildEnumDto();
            case "hotelConvenience" -> ConvenienceType.buildEnumDtoForHotelConvenience();
            case "hotelRoomConvenience" -> ConvenienceType.buildEnumDto();
            default -> null;
        };
    }

}
