package com.etheroom.Etheroom.presentation.dtos.media;

import com.etheroom.Etheroom.domain.models.media.Media;
import com.etheroom.Etheroom.infrastructure.base.BaseEntityDto;
import com.etheroom.Etheroom.infrastructure.vo.enums.MediaType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MediaDto extends BaseEntityDto<Media> {

    private String filename;
    private Long size;
    private MediaType type;
    private byte[] data;

    @Override
    public Media mapDtoToEntity() {
        Media media = new Media();
        media.setId(this.getId());
        media.setFilename(this.getFilename());
        media.setSize(this.getSize());
        media.setType(this.getType());
        media.setData(this.getData());
        media.setUpdatedAt(this.getUpdatedAt());
        media.setCreatedAt(this.getCreatedAt());
        return media;
    }
}
