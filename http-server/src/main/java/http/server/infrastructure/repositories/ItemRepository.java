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
        Item item = new Item(object);
        synchronized (items) {
            items.put(item.getId(), item);
        }
        return item;
    }

    @Override
    public Boolean existsById(String id) {
        synchronized (items) {
            return items.containsKey(id);
        }
    }

    @Override
    public Optional<Item> findById(String id) {
        synchronized (items) {
            return Optional.ofNullable(items.get(id));
        }
    }

    @Override
    public List<Item> findAll() {
        synchronized (items) {
            return List.copyOf(items.values());
        }
    }

    @Override
    public void update(String id, Object object) {
        synchronized (items) {
            Item item = items.get(id);
            item.setContent(object);
            items.put(id, item);
        }
    }

    @Override
    public void deleteById(String id) {
        synchronized (items) {
            items.remove(id);
        }
    }

    public static IItemRepository getInstance() {
        applicationRepository = Optional.ofNullable(applicationRepository).isEmpty() ? new ItemRepository() : applicationRepository;
        return applicationRepository;
    }

}
