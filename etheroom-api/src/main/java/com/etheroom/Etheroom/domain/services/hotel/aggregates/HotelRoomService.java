package com.etheroom.Etheroom.domain.services.hotel.aggregates;

import com.etheroom.Etheroom.domain.models.hotel.aggregates.HotelRoom;
import com.etheroom.Etheroom.domain.repositories.hotel.aggregates.HotelRoomRepository;
import com.etheroom.Etheroom.infrastructure.utils.Functions;
import com.etheroom.Etheroom.infrastructure.vo.enums.BookingStatus;
import com.etheroom.Etheroom.infrastructure.vo.exception.exceptions.BadRequestException;
import com.etheroom.Etheroom.infrastructure.vo.exception.exceptions.NotFoundException;
import com.etheroom.Etheroom.infrastructure.vo.filter.HotelRoomFilter;
import com.etheroom.Etheroom.presentation.dtos.hotel.HotelDto;
import com.etheroom.Etheroom.presentation.dtos.hotel.aggregates.HotelRoomDto;
import com.etheroom.Etheroom.presentation.services.booking.aggregates.IBookingHelper;
import com.etheroom.Etheroom.presentation.services.hotel.IHotelService;
import com.etheroom.Etheroom.presentation.services.hotel.aggregates.IHotelRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class HotelRoomService implements IHotelRoomService {

    private static final String HOTEL_ROOM_NOT_FOUND = "Hotel room not found";

    private static final String HOTEL_NOT_INFORMED = "Hotel not informed";

    private static final String ONGOING_BOOKING = "This hotel room have ongoing booking";

    private final IBookingHelper bookingHelper;

    private final IHotelService hotelService;

    private final HotelRoomRepository hotelRoomRepository;

    @Override
    public HotelRoomDto create(HotelRoomDto hotelRoomDto) {
        HotelRoom hotelRoom = hotelRoomDto.mapDtoToEntity();
        String hotelId = Optional.ofNullable(hotelRoomDto.getHotelId())
                .map(Objects::toString)
                .orElseThrow(() -> new BadRequestException(HOTEL_NOT_INFORMED));
        HotelDto hotelDto = this.hotelService.findById(hotelId);
        hotelRoom.setHotel(hotelDto.mapDtoToEntity());
        return this.hotelRoomRepository.save(hotelRoom).mapEntityToDto();
    }

    @Override
    public Page<HotelRoomDto> findAll(Pageable pageable, HotelRoomFilter filter) {
        return this.hotelRoomRepository.findAll(
                        pageable,
                        filter.getNumber(),
                        filter.getType(),
                        filter.getHotelId(),
                        filter.getAvailable()
                ).map(HotelRoom::mapEntityToDto);
    }

    @Override
    public Page<HotelRoomDto> findAllAvailable(Pageable pageable, HotelRoomFilter filter) {
        return this.hotelRoomRepository.findAll(
                        pageable,
                        filter.getNumber(),
                        filter.getType(),
                        filter.getHotelId(),
                        Boolean.TRUE
                ).map(HotelRoom::mapEntityToDto);
    }

    @Override
    public HotelRoomDto findById(String id) {
        return this.hotelRoomRepository.findById(UUID.fromString(id))
                .map(HotelRoom::mapEntityToDto)
                .orElseThrow(() -> new NotFoundException(HOTEL_ROOM_NOT_FOUND));
    }

    @Override
    public Boolean isHotelRoomBooked(String roomId, LocalDateTime checkIn, LocalDateTime checkOut) {
        return this.bookingHelper.isHotelRoomBooked(roomId, checkIn, checkOut);
    }

    @Override
    public void update(HotelRoomDto hotelRoomDto) {
        UUID uuid = hotelRoomDto.getId();
        Functions.acceptFalseThrows(
                hotelRoomRepository.existsById(uuid),
                () -> new NotFoundException(HOTEL_ROOM_NOT_FOUND)
        );
        HotelRoom hotelRoom = hotelRoomDto.mapDtoToEntity();
        this.hotelRoomRepository.save(hotelRoom);
    }

    @Override
    public void delete(String id) {
        UUID uuid = UUID.fromString(id);
        Functions.acceptTrueThrows(
                hotelRoomRepository.existsById(uuid),
                () -> new NotFoundException(HOTEL_ROOM_NOT_FOUND)
        );
        Functions.acceptTrueThrows(
                this.bookingHelper.existsByRoomIdAndStatus(id, BookingStatus.ACTIVE),
                () -> new BadRequestException(ONGOING_BOOKING)
        );
        this.hotelRoomRepository.deleteById(uuid);
    }
}
