package com.etheroom.Etheroom.domain.services.booking;

import com.etheroom.Etheroom.domain.models.booking.Booking;
import com.etheroom.Etheroom.domain.models.hotel.aggregates.HotelRoom;
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
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

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

    private static final String HOTEL_ROOM_DONT_SUPPORT_GUESTS = "Hotel Room don't support this amount of guests";

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
        this.checkGuestsAmount(booking, hotelRoomId);
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
                Optional.ofNullable(filter.getHotelRoomId()).filter(str -> !str.isBlank()).map(UUID::fromString).orElse(null),
                Optional.ofNullable(filter.getHotelId()).filter(str -> !str.isBlank()).map(UUID::fromString).orElse(null)
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
        )
                .map(booking -> {
                    BookingDto bookingDto = booking.mapEntityToDto();
                    bookingDto.setHotelRoom(booking.getHotelRoom().mapEntityToDto());
                    bookingDto.setHotel(booking.getHotelRoom().getHotel().mapEntityToDto());
                    return bookingDto;
                });
    }

    @Override
    public BookingDto findById(String id) {
        return this.bookingRepository.findById(UUID.fromString(id))
                .map(Booking::mapEntityToDto)
                .orElseThrow(() -> new RuntimeException(BOOKING_NOT_FOUND));
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void update(BookingDto bookingDto) {
        Booking saved = this.bookingRepository.findById(bookingDto.getId())
                .orElseThrow(() -> new NotFoundException(BOOKING_NOT_FOUND));
        String hotelRoomId = Optional.ofNullable(bookingDto.getHotelRoomId())
                .map(Objects::toString)
                .orElseThrow(() -> new BadRequestException(HOTEL_ROOM_NOT_SENDED));
        Functions.acceptTrueThrows(
                BookingStatus.STARTED.equals(saved.getStatus()),
                () -> new BadRequestException(ONLY_STARTED_BOOKINGS)
        );
        Booking booking = bookingDto.mapDtoToEntity();
        booking.setStatus(BookingStatus.ACTIVE);
        this.checkGuestsAmount(booking, hotelRoomId);
        Functions.acceptFalseOrElseThrow(
                this.bookingRepository.isHotelRoomBooked(
                        booking.getHotelRoom().getId(),
                        booking.getCheckIn(),
                        booking.getCheckOut()
                ),
                () -> this.bookingRepository.save(booking),
                () -> new BadRequestException("Hotel room is already booked")
        );
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

    @Scheduled(cron = "0 0 4 * * 6")
    public void findActiveDoneBookings() {
        this.bookingRepository.saveAll(
                this.bookingRepository.findAllActiveDone()
                        .stream()
                        .map(Booking::setFinishedStatus)
                        .toList()
        );
    }

    private void checkGuestsAmount(Booking booking, String id) {
        Integer hotelRoomCapacity = this.hotelRoomService.findById(id).mapDtoToEntity().getCapacity();
        Functions.acceptTrueThrows(
                booking.getGuests().size() > hotelRoomCapacity,
                () -> new BadRequestException(HOTEL_ROOM_DONT_SUPPORT_GUESTS)
        );
    }

}
