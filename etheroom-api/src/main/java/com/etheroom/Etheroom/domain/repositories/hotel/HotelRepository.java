package com.etheroom.Etheroom.domain.repositories.hotel;

import com.etheroom.Etheroom.domain.models.hotel.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, UUID> {
}
