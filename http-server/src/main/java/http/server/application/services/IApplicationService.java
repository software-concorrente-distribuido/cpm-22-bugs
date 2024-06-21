package http.server.application.services;

import http.server.application.dtos.ItemResponse;

import java.util.List;

public interface IApplicationService {

    ItemResponse create(Object object);

    ItemResponse findById(String id);

    List<ItemResponse> findAll();

    void update(String id, Object object);

    void deleteById(String id);

}
