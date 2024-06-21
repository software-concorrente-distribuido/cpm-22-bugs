package http.server.application.services;

import http.server.application.dtos.ItemResponse;
import http.server.infrastructure.exceptions.NotFoundException;

import java.util.List;

public interface IApplicationService {

    ItemResponse create(Object object) throws NotFoundException;

    ItemResponse findById(String id) throws NotFoundException;

    List<ItemResponse> findAll();

    void update(String id, Object object) throws NotFoundException;

    void deleteById(String id) throws NotFoundException;

}
