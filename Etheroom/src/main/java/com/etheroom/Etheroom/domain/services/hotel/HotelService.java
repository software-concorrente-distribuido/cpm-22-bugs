package com.etheroom.Etheroom.domain.services.hotel;

import com.etheroom.Etheroom.domain.models.hotel.Hotel;
import com.etheroom.Etheroom.domain.models.user.User;
import com.etheroom.Etheroom.domain.repositories.hotel.HotelRepository;
import com.etheroom.Etheroom.infrastructure.utils.Functions;
import com.etheroom.Etheroom.infrastructure.vo.exception.exceptions.NotFoundException;
import com.etheroom.Etheroom.presentation.dtos.hotel.HotelDto;
import com.etheroom.Etheroom.presentation.services.hotel.IHotelService;
import com.etheroom.Etheroom.presentation.services.user.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class HotelService implements IHotelService {

    private static final String HOTEL_NOT_FOUND = "Hotel não encontrado";

    private final HotelRepository hotelRepository;

    private final IUserService userService;


    @Override
    public HotelDto create(HotelDto hotelDto) {
        Functions.acceptTrueThrows(
                Optional.ofNullable(hotelDto.getId()).isPresent() && this.hotelRepository.existsById(hotelDto.getId()),
                () -> new NotFoundException(HOTEL_NOT_FOUND)
        );
        Hotel hotel = hotelDto.mapDtoToEntity();
        User user = hotel.getUser();
        this.userService.handleUser(user);

        return this.hotelRepository.save(hotel).mapEntityToDto();
    }

    @Override
    public HotelDto findById(String id) {
        return this.hotelRepository.findById(UUID.fromString(id))
                .map(Hotel::mapEntityToDto)
                .orElseThrow(() -> new NotFoundException(HOTEL_NOT_FOUND));
    }

    @Override
    public void update(HotelDto hotelDto) {
        Hotel hotel = hotelDto.mapDtoToEntity();
        this.hotelRepository.save(hotel);
    }

    @Override
    public void delete(String id) {
        UUID hotelId = UUID.fromString(id);
        Functions.acceptFalseThrows(
                this.hotelRepository.existsById(hotelId),
                () -> new NotFoundException(HOTEL_NOT_FOUND)
        );
        this.hotelRepository.deleteById(hotelId);
    }
}
