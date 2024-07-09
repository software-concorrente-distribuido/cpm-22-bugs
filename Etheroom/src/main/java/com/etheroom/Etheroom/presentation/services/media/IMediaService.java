package com.etheroom.Etheroom.presentation.services.media;

import com.etheroom.Etheroom.presentation.dtos.media.MediaDto;
import org.springframework.web.multipart.MultipartFile;

public interface IMediaService {

    MediaDto create(MultipartFile multipartFile);

    MediaDto findById(String id);

    MediaDto update(String id, MultipartFile multipartFile);

    void delete(String id);

}
