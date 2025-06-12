package ai.trainkit.api.dto;

import ai.trainkit.api.enums.Status;
import java.time.Instant;
import lombok.Data;

@Data
public class ExampleDto {
    private Long id;
    private String data;
    private String label;
    private Status status;
    private Instant createdAt;
    private Instant updatedAt;
}