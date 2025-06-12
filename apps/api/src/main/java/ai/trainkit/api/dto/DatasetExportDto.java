package ai.trainkit.api.dto;


import java.util.List;

import ai.trainkit.api.enums.DatasetType;
import lombok.Data;

@Data
public class DatasetExportDto {
    private Long id;
    private String name;
    private String description;
    private DatasetType type;
    private List<ExampleDto> examples;
}
