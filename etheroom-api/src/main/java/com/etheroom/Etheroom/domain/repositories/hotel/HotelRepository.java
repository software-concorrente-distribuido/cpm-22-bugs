package com.etheroom.Etheroom.domain.repositories.hotel;

import com.etheroom.Etheroom.domain.models.hotel.Hotel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, UUID> {

    @Query(
            "SELECT h FROM Hotel h " +
                    "LEFT JOIN HotelRoom hr ON h.id = hr.hotel.id " +
                    "WHERE (:location IS NULL OR :location = '' OR LOWER(h.address.description) LIKE LOWER(CONCAT('%', :location, '%'))) " +
                    "AND (:checkIn IS NULL OR :checkOut IS NULL OR NOT EXISTS (SELECT 1 FROM Booking b WHERE b.hotelRoom.id = hr.id AND b.checkIn < :checkOut AND b.checkOut > :checkIn)) " +
                    "AND (:numberOfGuests IS NULL OR hr.capacity >= :numberOfGuests) "
    )
    Page<Hotel> findAll(
            Pageable pageable,
            @Param("location") String location,
            @Param("checkIn") LocalDateTime checkIn,
            @Param("checkOut") LocalDateTime checkOut,
            @Param("numberOfGuests") Integer numberOfGuests
    );

    @Query(
            "FROM Hotel h " +
                    "WHERE h.user.id = :userId"
    )
    Optional<Hotel> findByUserId(
            @Param("userId") UUID userId
    );

}
