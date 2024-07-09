package com.etheroom.Etheroom.domain.repositories.hotel.aggregates;

import com.etheroom.Etheroom.domain.models.hotel.aggregates.HotelRoom;
import com.etheroom.Etheroom.infrastructure.vo.enums.HotelRoomType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface HotelRoomRepository extends JpaRepository<HotelRoom, UUID> {

    @Query(
            "SELECT hr FROM HotelRoom hr " +
            "WHERE (:number IS NULL OR hr.number = :number) " +
            "AND (:type IS NULL OR hr.type = :type)" +
            "AND (:hotelId IS NULL OR hr.hotel.id = :hotelId)" +
            "AND (:available IS NULL OR hr.available = :available)"
    )
    Page<HotelRoom> findAll(
            Pageable pageable,
            @Param("number") Integer number,
            @Param("type") HotelRoomType type,
            @Param("hotelId") UUID hotelId,
            @Param("available") Boolean available
    );

}
