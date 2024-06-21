package http.server.domain.services;

import http.server.application.dtos.ApplicationResponse;
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
    public ApplicationResponse create(Object object) {
        Functions.acceptFalseThrows(
                Optional.ofNullable(object).isEmpty(),
                () -> new NotFoundException(EMPTY_CONTENT)
        );
        return ApplicationResponse.fromItem(
                this.itemRepository.create(object)
        );
    }

    @Override
    public ApplicationResponse findById(Integer id) {
        return this.itemRepository.findById(id)
                .map(ApplicationResponse::fromItem)
                .orElseThrow(() -> new NotFoundException(ITEM_NOT_FOUND));
    }

    @Override
    public List<ApplicationResponse> findAll() {
        return this.itemRepository.findAll()
                .stream()
                .map(ApplicationResponse::fromItem)
                .toList();
    }

    @Override
    public void update(String id, Object object) {
        Functions.acceptFalseThrows(
                Optional.ofNullable(id).isEmpty(),
                () -> new NotFoundException(ID_NOT_SENT)
        );
        Functions.acceptFalseThrows(
                Optional.ofNullable(object).isEmpty(),
                () -> new NotFoundException(EMPTY_CONTENT)
        );
        this.itemRepository.update(id, object);
    }

    @Override
    public void deleteById(String id) {
        Functions.acceptFalseThrows(
                Optional.ofNullable(id).isEmpty(),
                () -> new NotFoundException(ID_NOT_SENT)
        );
        this.itemRepository.deleteById(id);
    }

    public static IApplicationService getInstance() {
        applicationService = Optional.ofNullable(applicationService).isEmpty() ? new ApplicationService() : applicationService;
        return applicationService;
    }

}