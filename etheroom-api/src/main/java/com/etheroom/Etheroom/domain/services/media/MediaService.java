package com.etheroom.Etheroom.domain.services.media;

import com.etheroom.Etheroom.domain.models.media.Media;
import com.etheroom.Etheroom.domain.repositories.media.MediaRepository;
import com.etheroom.Etheroom.infrastructure.utils.Functions;
import com.etheroom.Etheroom.infrastructure.vo.enums.MediaType;
import com.etheroom.Etheroom.infrastructure.vo.exception.exceptions.NotFoundException;
import com.etheroom.Etheroom.infrastructure.vo.exception.exceptions.ServiceException;
import com.etheroom.Etheroom.presentation.dtos.media.MediaDto;
import com.etheroom.Etheroom.presentation.services.media.IMediaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MediaService implements IMediaService {

    private static final String MEDIA_NOT_FOUND = "Media not found";

    private static final String MEDIA_PROCESSING_ERROR = "Error while processing media";

    private final MediaRepository mediaRepository;

    @Override
    public MediaDto create(MultipartFile multipartFile) {
        Media media = this.mapFromMultipartFile(multipartFile);
        return this.mediaRepository.save(media).mapEntityToDto();
    }

    @Override
    public MediaDto findById(String id) {
        return this.mediaRepository.findById(UUID.fromString(id))
                .map(Media::mapEntityToDto)
                .orElseThrow(() -> new NotFoundException(MEDIA_NOT_FOUND));
    }

    @Override
    public MediaDto update(String id, MultipartFile multipartFile) {
        Functions.acceptFalseThrows(
                this.mediaRepository.existsById(UUID.fromString(id)),
                () -> new NotFoundException(MEDIA_NOT_FOUND)
        );
        Media media = this.mapFromMultipartFile(multipartFile);
        media.setId(UUID.fromString(id));
        return this.mediaRepository.save(media).mapEntityToDto();
    }

    @Override
    public void delete(String id) {
        Functions.acceptTrueThrows(
                this.mediaRepository.existsById(UUID.fromString(id)),
                () -> new NotFoundException(MEDIA_NOT_FOUND)
        );
        this.mediaRepository.deleteById(UUID.fromString(id));
    }

    private Media mapFromMultipartFile(MultipartFile file) {
        try {
            Media media = new Media();
            media.setFilename(file.getOriginalFilename());
            media.setData(file.getBytes());
            media.setSize(file.getSize());
            media.setType(
                    MediaType.fromFileOriginalName(
                            Objects.requireNonNull(
                                    file.getOriginalFilename()
                            )
                    )
            );
            return media;
        } catch (IOException e) {
            throw new ServiceException(MEDIA_PROCESSING_ERROR);
        }
    }

}

