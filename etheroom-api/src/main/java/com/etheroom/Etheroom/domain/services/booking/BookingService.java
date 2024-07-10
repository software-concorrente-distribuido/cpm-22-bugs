package com.etheroom.Etheroom.domain.services.booking;

import com.etheroom.Etheroom.domain.models.booking.Booking;
import com.etheroom.Etheroom.domain.repositories.booking.BookingRepository;
import com.etheroom.Etheroom.infrastructure.utils.Functions;
import com.etheroom.Etheroom.infrastructure.vo.enums.BookingStatus;
import com.etheroom.Etheroom.infrastructure.vo.exception.exceptions.BadRequestException;
import com.etheroom.Etheroom.infrastructure.vo.exception.exceptions.NotFoundException;
import com.etheroom.Etheroom.infrastructure.vo.filter.BookingFilter;
import com.etheroom.Etheroom.presentation.dtos.booking.BookingDto;
import com.etheroom.Etheroom.presentation.services.booking.IBookingService;
import com.etheroom.Etheroom.presentation.services.hotel.aggregates.IHotelRoomService;
import com.etheroom.Etheroom.presentation.services.person.IPersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BookingService implements IBookingService {

    private static final String BOOKING_NOT_FOUND = "Booking not found";

    private static final String PERSON_NOT_SENDED = "Person not sended";

    private static final String HOTEL_ROOM_NOT_SENDED = "Hotel room not sended";

    private static final String ONLY_STARTED_BOOKINGS = "Only started bookings can be updated or deleted";

    private static final String ONLY_ONGOING_BOOKINGS = "Only ongoing bookings can be cancelled";

    private final BookingRepository bookingRepository;

    private final IPersonService personService;

    private final IHotelRoomService hotelRoomService;

    @Override
    public BookingDto create(BookingDto bookingDto) {
        Booking booking = bookingDto.mapDtoToEntity();
        String personId = Optional.ofNullable(bookingDto.getPersonId())
                .map(Objects::toString)
                .orElseThrow(() -> new BadRequestException(PERSON_NOT_SENDED));
        String hotelRoomId = Optional.ofNullable(bookingDto.getHotelRoomId())
                .map(Objects::toString)
                .orElseThrow(() -> new BadRequestException(HOTEL_ROOM_NOT_SENDED));
        booking.setPerson(this.personService.findById(personId).mapDtoToEntity());
        booking.setHotelRoom(this.hotelRoomService.findById(hotelRoomId).mapDtoToEntity());
        booking.setStatus(BookingStatus.STARTED);
        return this.bookingRepository.save(booking).mapEntityToDto();
    }

    @Override
    public Page<BookingDto> findAll(Pageable pageable, BookingFilter filter) {
        return this.bookingRepository.findAll(
                pageable,
                filter.getContractOwnerName(),
                filter.getLocation(),
                filter.getCheckIn(),
                filter.getCheckOut(),
                filter.getRoomNumber(),
                filter.getStatus(),
                Optional.ofNullable(filter.getPersonId()).map(UUID::fromString).orElse(null),
                Optional.ofNullable(filter.getHotelRoomId()).map(UUID::fromString).orElse(null),
                Optional.ofNullable(filter.getHotelId()).map(UUID::fromString).orElse(null)
        ).map(Booking::mapEntityToDto);
    }

    @Override
    public Page<BookingDto> findAllRegistered(Pageable pageable, BookingFilter filter) {
        return this.bookingRepository.findAllRegistered(
                pageable,
                filter.getContractOwnerName(),
                filter.getLocation(),
                filter.getCheckIn(),
                filter.getCheckOut(),
                filter.getRoomNumber(),
                filter.getStatus(),
                Optional.ofNullable(filter.getPersonId()).map(UUID::fromString).orElse(null),
                Optional.ofNullable(filter.getHotelRoomId()).map(UUID::fromString).orElse(null),
                Optional.ofNullable(filter.getHotelId()).map(UUID::fromString).orElse(null)
        ).map(Booking::mapEntityToDto);
    }

    @Override
    public BookingDto findById(String id) {
        return this.bookingRepository.findById(UUID.fromString(id))
                .map(Booking::mapEntityToDto)
                .orElseThrow(() -> new RuntimeException(BOOKING_NOT_FOUND));
    }

    @Override
    public void update(BookingDto bookingDto) {
        Booking saved = this.bookingRepository.findById(bookingDto.getId())
                .orElseThrow(() -> new NotFoundException(BOOKING_NOT_FOUND));
        Functions.acceptTrueThrows(
                BookingStatus.STARTED.equals(saved.getStatus()),
                () -> new BadRequestException(ONLY_STARTED_BOOKINGS)
        );
        Booking booking = bookingDto.mapDtoToEntity();
        booking.setStatus(BookingStatus.FINISHED);
        this.bookingRepository.save(booking);
    }

    @Override
    public void cancel(String id) {
        UUID uuid = UUID.fromString(id);
        Booking booking = this.bookingRepository.findById(uuid)
                .orElseThrow(() -> new NotFoundException(BOOKING_NOT_FOUND));
        Functions.acceptTrueThrows(
                BookingStatus.ACTIVE.equals(booking.getStatus()),
                () -> new BadRequestException(ONLY_ONGOING_BOOKINGS)
        );
        booking.setStatus(BookingStatus.CANCELLED);
        this.bookingRepository.save(booking);
    }

    @Override
    public void delete(String id) {
        UUID uuid = UUID.fromString(id);
        Booking saved = this.bookingRepository.findById(uuid)
                .orElseThrow(() -> new NotFoundException(BOOKING_NOT_FOUND));
        Functions.acceptTrueThrows(
                BookingStatus.STARTED.equals(saved.getStatus()),
                () -> new BadRequestException(ONLY_STARTED_BOOKINGS)
        );
        this.bookingRepository.deleteById(uuid);
    }

}
