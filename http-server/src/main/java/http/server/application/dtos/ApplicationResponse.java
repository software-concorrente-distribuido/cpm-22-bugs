package http.server.application.dtos;

import http.server.domain.models.Item;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ApplicationResponse {

    private String id;

    private Object content;

    private Date updatedAt;

    private Date createdAt;

    private Date queriedAt;

    public static ApplicationResponse fromItem(Item item) {
        ApplicationResponse response = new ApplicationResponse();
        response.id = item.getId();
        response.content = item.getContent();
        response.updatedAt = item.getUpdatedAt();
        response.createdAt = item.getCreatedAt();
        response.queriedAt = new Date();
        return response;
    }

}
