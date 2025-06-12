package ai.trainkit.api.dto;

import ai.trainkit.api.enums.DatasetType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DatasetCreateDto {
    private String name;
    private String description;
    private DatasetType type;
    private Long ownerId;
}
