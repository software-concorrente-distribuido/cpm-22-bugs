package com.etheroom.Etheroom.presentation.controllers;

import com.etheroom.Etheroom.presentation.dtos.person.PersonDto;
import com.etheroom.Etheroom.presentation.services.person.IPersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/person")
@RequiredArgsConstructor
public class PersonController {

    private final IPersonService personService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PersonDto create(@RequestBody PersonDto personDto) {
        return personService.create(personDto);
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public PersonDto findById(@PathVariable String id) {
        return personService.findById(id);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public void update(@RequestBody PersonDto personDto) {
        personService.update(personDto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable String id) {
        personService.delete(id);
    }

}
