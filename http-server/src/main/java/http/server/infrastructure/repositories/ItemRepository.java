package http.server.infrastructure.repositories;

import http.server.domain.models.Item;
import http.server.domain.repositories.IItemRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

public class ItemRepository implements IItemRepository {

    private final HashMap<String, Item> items = new HashMap<>();

    private static IItemRepository applicationRepository;

    @Override
    public Item create(Object object) {
        return null;
    }

    @Override
    public Optional<Item> findById(Integer id) {
        return null;
    }

    @Override
    public List<Item> findAll() {
        return null;
    }

    @Override
    public void update(String id, Object object) {

    }

    @Override
    public void deleteById(String id) {

    }

    public static IItemRepository getInstance() {
        applicationRepository = Optional.ofNullable(applicationRepository).isEmpty() ? new ItemRepository() : applicationRepository;
        return applicationRepository;
    }

}
