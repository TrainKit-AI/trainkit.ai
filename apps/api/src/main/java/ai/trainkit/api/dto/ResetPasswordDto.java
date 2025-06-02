package ai.trainkit.api.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ResetPasswordDto {
    private String token;
    private String newPassword;
    private String confirmPassword;
} 