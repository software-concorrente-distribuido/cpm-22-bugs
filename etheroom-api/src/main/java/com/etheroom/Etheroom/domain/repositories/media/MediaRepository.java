package com.etheroom.Etheroom.domain.repositories.media;

import com.etheroom.Etheroom.domain.models.media.Media;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface MediaRepository extends JpaRepository<Media, UUID> {
}
