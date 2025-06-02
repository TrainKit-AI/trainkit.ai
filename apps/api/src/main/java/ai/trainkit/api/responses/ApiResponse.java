package ai.trainkit.api.responses;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse {
    private String message;
    private String status;

    public static ApiResponse success(String message) {
        return new ApiResponse(message, "success");
    }

    public static ApiResponse error(String message) {
        return new ApiResponse(message, "error");
    }
} 