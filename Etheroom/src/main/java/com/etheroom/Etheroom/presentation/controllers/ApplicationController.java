package com.etheroom.Etheroom.presentation.controllers;

import com.etheroom.Etheroom.presentation.dtos.app.EnumDto;
import com.etheroom.Etheroom.presentation.services.app.IEnumService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/app")
@RequiredArgsConstructor
public class ApplicationController {

    private final IEnumService enumService;

    @GetMapping("/health")
    @ResponseStatus(HttpStatus.OK)
    public String health() {
        return "ETHEROOM API Running!";
    }

    @GetMapping("/enum/{name}")
    @ResponseStatus(HttpStatus.OK)
    public List<EnumDto> findEnumByName(@PathVariable(name = "name") String name) {
        return this.enumService.findEnumByName(name);
    }

}
