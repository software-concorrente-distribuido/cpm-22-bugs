package http.server.domain.repositories;

import http.server.domain.models.Item;

import java.util.List;
import java.util.Optional;

public interface IItemRepository {

    Item create(Object object);

    Optional<Item> findById(Integer id);

    List<Item> findAll();

    void update(String id, Object object);

    void deleteById(String id);

}
