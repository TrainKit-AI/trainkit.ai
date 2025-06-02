package ai.trainkit.api.exception;

import org.springframework.http.HttpStatus;

public class UserAlreadyVerifiedException extends ApiException {
    private static final String CODE = "USER_ALREADY_VERIFIED";
    
    public UserAlreadyVerifiedException(String message) {
        super(message, CODE, HttpStatus.CONFLICT);
    }

    public UserAlreadyVerifiedException() {
        this("An account with this email already exists");
    }
} 