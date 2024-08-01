package com.etheroom.Etheroom.domain.repositories.booking;

import com.etheroom.Etheroom.domain.models.booking.Booking;
import com.etheroom.Etheroom.infrastructure.vo.enums.BookingStatus;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface BookingRepository extends JpaRepository<Booking, UUID> {

    @Query(
            "SELECT b FROM Booking b " +
                    "WHERE (DATE(:checkIn) IS NULL OR b.checkIn >= :checkIn) "
                    + "AND (DATE(:checkOut) IS NULL OR b.checkOut <= :checkOut) "
                    + "AND (:roomNumber IS NULL OR b.hotelRoom.number = :roomNumber) "
                    + "AND (:status IS NULL OR b.status = :status) "
                    + "AND (:personId IS NULL OR b.person.id = :personId) "
                    + "AND (:hotelRoomId IS NULL OR b.hotelRoom.id = :hotelRoomId) "
                    + "AND (:hotelId IS NULL OR b.hotelRoom.hotel.id = :hotelId)"
    )
    Page<Booking> findAll(
            Pageable pageable,
            @Param("checkIn") LocalDateTime checkIn,
            @Param("checkOut") LocalDateTime checkOut,
            @Param("roomNumber") Integer roomNumber,
            @Param("status") BookingStatus status,
            @Param("personId") UUID personId,
            @Param("hotelRoomId") UUID hotelRoomId,
            @Param("hotelId") UUID hotelId
    );

    @Query(
            "SELECT b FROM Booking b " +
                    "WHERE (DATE(:checkIn) IS NULL OR b.checkIn >= :checkIn) "
                    + "AND (DATE(:checkOut) IS NULL OR b.checkOut <= :checkOut) "
                    + "AND (:roomNumber IS NULL OR b.hotelRoom.number = :roomNumber) "
                    + "AND (:status IS NULL OR b.status = :status) "
                    + "AND (:personId IS NULL OR b.person.id = :personId) "
                    + "AND (:hotelRoomId IS NULL OR b.hotelRoom.id = :hotelRoomId) "
                    + "AND (:hotelId IS NULL OR b.hotelRoom.hotel.id = :hotelId) "
                    + "AND b.status != 'STARTED'"
    )
    Page<Booking> findAllRegistered(
            Pageable pageable,
            @Param("checkIn") LocalDateTime checkIn,
            @Param("checkOut") LocalDateTime checkOut,
            @Param("roomNumber") Integer roomNumber,
            @Param("status") BookingStatus status,
            @Param("personId") UUID personId,
            @Param("hotelRoomId") UUID hotelRoomId,
            @Param("hotelId") UUID hotelId
    );

    @Query("SELECT b FROM Booking b " +
            "WHERE b.status = 'ACTIVE' " +
            "AND b.checkOut < CURRENT_TIMESTAMP")
    List<Booking> findAllActiveDone();

    @Query("SELECT CASE WHEN COUNT(b) > 0 THEN true ELSE false END FROM Booking b " +
            "WHERE b.person.id = :personId AND b.status = :status")
    Boolean existsByPersonIdAndStatus(UUID personId, BookingStatus status);

    @Query("SELECT CASE WHEN COUNT(b) > 0 THEN true ELSE false END FROM Booking b " +
            "WHERE b.hotelRoom.id = :hotelRoomId AND b.status = :status")
    Boolean existsByRoomIdAndStatus(UUID hotelRoomId, BookingStatus status);

    @Query("SELECT CASE WHEN COUNT(b) > 0 THEN true ELSE false END FROM Booking b " +
            "WHERE b.hotelRoom.hotel.id = :hotelId AND b.status = :status")
    Boolean existsByHotelIdAndStatus(UUID hotelId, BookingStatus status);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT CASE WHEN COUNT(b) > 0 THEN true ELSE false END FROM Booking b " +
            "WHERE b.hotelRoom.id = :hotelRoomId AND b.status = 'ACTIVE' " +
            "AND ((b.checkIn >= :checkIn AND b.checkIn <= :checkOut) " +
            "OR (b.checkOut >= :checkIn AND b.checkOut <= :checkOut))")
    Boolean isHotelRoomBooked(UUID hotelRoomId, LocalDateTime checkIn, LocalDateTime checkOut);

}
