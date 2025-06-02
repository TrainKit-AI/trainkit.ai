package ai.trainkit.api.responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Map;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorResponse {
    private final String message;
    private final String code;
    private final LocalDateTime timestamp;
    private Map<String, Object> details;

    public ErrorResponse(String message, String code) {
        this.message = message;
        this.code = code;
        this.timestamp = LocalDateTime.now();
    }

    public ErrorResponse(String message, String code, Map<String, Object> details) {
        this(message, code);
        this.details = details;
    }

}