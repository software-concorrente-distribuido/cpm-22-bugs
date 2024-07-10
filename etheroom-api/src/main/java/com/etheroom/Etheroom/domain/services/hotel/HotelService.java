package com.etheroom.Etheroom.domain.services.hotel;

import com.etheroom.Etheroom.domain.models.hotel.Hotel;
import com.etheroom.Etheroom.domain.models.user.User;
import com.etheroom.Etheroom.domain.repositories.hotel.HotelRepository;
import com.etheroom.Etheroom.infrastructure.utils.Functions;
import com.etheroom.Etheroom.infrastructure.vo.enums.BookingStatus;
import com.etheroom.Etheroom.infrastructure.vo.enums.UserRole;
import com.etheroom.Etheroom.infrastructure.vo.exception.exceptions.BadRequestException;
import com.etheroom.Etheroom.infrastructure.vo.exception.exceptions.NotFoundException;
import com.etheroom.Etheroom.infrastructure.vo.filter.HotelFilter;
import com.etheroom.Etheroom.presentation.dtos.hotel.HotelDto;
import com.etheroom.Etheroom.presentation.services.booking.aggregates.IBookingHelper;
import com.etheroom.Etheroom.presentation.services.hotel.IHotelService;
import com.etheroom.Etheroom.presentation.services.user.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class HotelService implements IHotelService {

    private static final String HOTEL_NOT_FOUND = "Hotel not found";

    private static final String ONGOING_BOOKING = "This hotel have ongoing booking";

    private final HotelRepository hotelRepository;

    private final IBookingHelper bookingHelper;

    private final IUserService userService;


    @Override
    public HotelDto create(HotelDto hotelDto) {
        Hotel hotel = hotelDto.mapDtoToEntity();
        User user = hotel.getUser();
        this.userService.handleUserByRole(user, UserRole.HOTEL);
        hotel.setUser(user);
        return this.hotelRepository.save(hotel).mapEntityToDto();
    }

    @Override
    public Page<HotelDto> findAll(Pageable pageable, HotelFilter filter) {
        return this.hotelRepository.findAll(
                pageable,
                filter.getLocation(),
                filter.getCheckIn(),
                filter.getCheckOut(),
                filter.getNumberOfGuests()
        ).map(Hotel::mapEntityToDto);
    }

    @Override
    public Page<HotelDto> findMostBooked(Pageable pageable) {
        return this.hotelRepository.findMostBooked(pageable)
                .map(Hotel::mapEntityToDto);
    }

    @Override
    public HotelDto findById(String id) {
        return this.hotelRepository.findById(UUID.fromString(id))
                .map(Hotel::mapEntityToDto)
                .orElseThrow(() -> new NotFoundException(HOTEL_NOT_FOUND));
    }

    @Override
    public HotelDto findByUserId(String userId) {
        return this.hotelRepository.findByUserId(UUID.fromString(userId))
                .map(Hotel::mapEntityToDto)
                .orElseThrow(() -> new NotFoundException(HOTEL_NOT_FOUND));
    }

    @Override
    public void update(HotelDto hotelDto) {
        Functions.acceptTrueThrows(
                Optional.ofNullable(hotelDto.getId()).isPresent() && this.hotelRepository.existsById(hotelDto.getId()),
                () -> new NotFoundException(HOTEL_NOT_FOUND)
        );
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
        Functions.acceptTrueThrows(
                this.bookingHelper.existsByHotelIdAndStatus(id, BookingStatus.ACTIVE),
                () -> new BadRequestException(ONGOING_BOOKING)
        );
        this.hotelRepository.deleteById(hotelId);
    }
}
