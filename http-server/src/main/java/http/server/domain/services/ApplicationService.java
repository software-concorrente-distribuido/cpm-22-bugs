package http.server.domain.services;

import http.server.application.dtos.ItemResponse;
import http.server.application.services.IApplicationService;
import http.server.domain.repositories.IItemRepository;
import http.server.infrastructure.utils.Functions;
import http.server.infrastructure.exceptions.NotFoundException;
import http.server.infrastructure.repositories.ItemRepository;

import java.util.List;
import java.util.Optional;

public class ApplicationService implements IApplicationService {

    private static final String ITEM_NOT_FOUND = "Item não encontrado";

    private static final String EMPTY_CONTENT = "Conteúdo vazio";

    private static final String ID_NOT_SENT = "ID não enviado";

    private final IItemRepository itemRepository = ItemRepository.getInstance();

    private static IApplicationService applicationService;

    @Override
    public ItemResponse create(Object object) {
        Functions.acceptFalseThrows(
                Optional.ofNullable(object).isPresent(),
                () -> new NotFoundException(EMPTY_CONTENT)
        );
        return ItemResponse.fromItem(
                this.itemRepository.create(object)
        );
    }

    @Override
    public ItemResponse findById(String id) {
        return this.itemRepository.findById(id)
                .map(ItemResponse::fromItem)
                .orElseThrow(() -> new NotFoundException(ITEM_NOT_FOUND));
    }

    @Override
    public List<ItemResponse> findAll() {
        return this.itemRepository.findAll()
                .stream()
                .map(ItemResponse::fromItem)
                .toList();
    }

    @Override
    public void update(String id, Object object) {
        Functions.acceptFalseThrows(
                Optional.ofNullable(id).isPresent(),
                () -> new NotFoundException(ID_NOT_SENT)
        );
        Functions.acceptFalseThrows(
                this.itemRepository.existsById(id),
                () -> new NotFoundException(ITEM_NOT_FOUND)
        );
        Functions.acceptFalseThrows(
                Optional.ofNullable(object).isPresent(),
                () -> new NotFoundException(EMPTY_CONTENT)
        );
        this.itemRepository.update(id, object);
    }

    @Override
    public void deleteById(String id) {
        Functions.acceptFalseThrows(
                Optional.ofNullable(id).isPresent(),
                () -> new NotFoundException(ID_NOT_SENT)
        );
        Functions.acceptFalseThrows(
                this.itemRepository.existsById(id),
                () -> new NotFoundException(ITEM_NOT_FOUND)
        );
        this.itemRepository.deleteById(id);
    }

    public static IApplicationService getInstance() {
        applicationService = Optional.ofNullable(applicationService).isEmpty() ? new ApplicationService() : applicationService;
        return applicationService;
    }

}