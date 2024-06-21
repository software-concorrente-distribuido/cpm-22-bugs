package http.server.application.services;

import http.server.application.dtos.ApplicationResponse;
import http.server.domain.models.Item;

import java.util.List;

public interface IApplicationService {

    ApplicationResponse create(Object object);

    ApplicationResponse findById(Integer id);

    List<ApplicationResponse> findAll();

    void update(String id, Object object);

    void deleteById(String id);

}
