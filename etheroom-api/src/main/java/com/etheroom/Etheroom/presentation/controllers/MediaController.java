package com.etheroom.Etheroom.presentation.controllers;

import com.etheroom.Etheroom.presentation.dtos.media.MediaDto;
import com.etheroom.Etheroom.presentation.services.media.IMediaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/media")
@RequiredArgsConstructor
public class MediaController {

    private final IMediaService mediaService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MediaDto create(@RequestParam("file") MultipartFile file) {
        return mediaService.create(file);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public MediaDto findById(@PathVariable(name = "id") String id) {
        return mediaService.findById(id);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public MediaDto update(@PathVariable(name = "id") String id, @RequestParam("file") MultipartFile file) {
        return mediaService.update(id, file);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable(name = "id") String id) {
        mediaService.delete(id);
    }

}
