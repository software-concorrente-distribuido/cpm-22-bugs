package com.etheroom.Etheroom.domain.models.media;

import com.etheroom.Etheroom.infrastructure.base.BaseEntity;
import com.etheroom.Etheroom.infrastructure.vo.enums.MediaType;
import com.etheroom.Etheroom.presentation.dtos.media.MediaDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Table(name = "jk_media")
@Entity
public class Media extends BaseEntity {

    @Column(name = "filename")
    private String filename;

    @Column(name = "size")
    private Long size;

    @Column(name = "type")
    private MediaType type;

    @Column(name = "data", columnDefinition = "bytea")
    private byte[] data;

    @Override
    public MediaDto mapEntityToDto() {
        MediaDto mediaDto = new MediaDto();
        mediaDto.setFilename(this.getFilename());
        mediaDto.setId(this.getId());
        mediaDto.setSize(this.getSize());
        mediaDto.setType(this.getType());
        mediaDto.setData(this.getData());
        mediaDto.setUpdatedAt(this.getUpdatedAt());
        mediaDto.setCreatedAt(this.getCreatedAt());
        return mediaDto;
    }

}
