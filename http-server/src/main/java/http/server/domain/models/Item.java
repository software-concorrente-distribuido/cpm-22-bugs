package http.server.domain.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Item {

    private String id;

    private Object content;

    private Date updatedAt;

    private Date createdAt;

    public Item(Object content) {
        this.id = UUID.randomUUID().toString();
        this.content = content;
        this.updatedAt = new Date();
        this.createdAt = new Date();
    }

    public void updated() {
        this.updatedAt = new Date();
    }

}
