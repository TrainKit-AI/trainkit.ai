package ai.trainkit.api.service;

import ai.trainkit.api.dto.LoginUserDto;
import ai.trainkit.api.dto.RegisterUserDto;
import ai.trainkit.api.dto.ResetPasswordDto;
import ai.trainkit.api.dto.VerifyUserDto;
import ai.trainkit.api.exception.UserAlreadyVerifiedException;
import ai.trainkit.api.model.User;
import ai.trainkit.api.repository.UserRepository;
import jakarta.mail.MessagingException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

@Service
public class AuthentiticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private EmailService emailService;

    public AuthentiticationService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            EmailService emailService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.emailService = emailService;
    }

    public User signUp(RegisterUserDto input) {
        Optional<User> existingUser = userRepository.findByEmail(input.getEmail());
        
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            // Si l'utilisateur existe mais n'est pas vérifié, on permet la réinscription
            if (!user.isEnabled()) {
                user.setUsername(input.getUsername());
                user.setPassword(passwordEncoder.encode(input.getPassword()));
                user.setVerificationCode(generateVerificationCode());
                user.setVerificationExpiration(LocalDateTime.now().plusMinutes(15));
                sendVerificationEmail(user);
                return userRepository.save(user);
            } else {
                throw new UserAlreadyVerifiedException(
                    "An account with this email already exists"
                    );
            }
        }

        User user = new User(
                input.getUsername(),
                input.getEmail(),
                passwordEncoder.encode(input.getPassword()));
        user.setVerificationCode(generateVerificationCode());
        user.setVerificationExpiration(LocalDateTime.now().plusMinutes(15));
        user.setEnabled(false);
        sendVerificationEmail(user);
        return userRepository.save(user);
    }

    public User authenticate(LoginUserDto input) {
        User user = userRepository.findByEmail(input.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(!user.isEnabled()) {
            throw new RuntimeException("Account not verified. Please verify your account.");
        }
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            input.getEmail(),
                            input.getPassword()
                    )
            );
            return user;
        } catch (Exception e) {
            throw new RuntimeException("Invalid password");
        }
    }

    public void verifyUser(VerifyUserDto input) {
        Optional<User> optionalUser = userRepository.findByEmail(input.getEmail());
        if(optionalUser.isPresent()) {
            User user = optionalUser.get();
            if(user.getVerificationExpiration().isBefore(LocalDateTime.now())) {
                throw new RuntimeException("Verification code has expired");
            }
            if(user.getVerificationCode().equals(input.getVerificationCode())) {
                user.setEnabled(true);
                user.setVerificationCode(null);
                user.setVerificationExpiration(null);
                userRepository.save(user);
            } else {
                throw new RuntimeException("Invalid verification code");
            }
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public void resendVerificationCode(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if(optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.isEnabled()) {
                throw new RuntimeException("Account is already verified.");
            }
            user.setVerificationCode(generateVerificationCode());
            user.setVerificationExpiration(LocalDateTime.now().plusHours(1));
            sendVerificationEmail(user);
            userRepository.save(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public void sendVerificationEmail(User user) {
        String subject = "Verification Code";
        String verificationCode = user.getVerificationCode();
        String htmlMessage = "<html>"
                + "<body style=\"font-family: Arial, sans-serif; margin: 0; padding: 0;\">"
                + "<div style=\"background-image: linear-gradient(to bottom right, #004aad, #09cb7a); padding: 40px; color: #ffffff; text-align: center;\">"
                + "<h1 style=\"margin-bottom: 10px;\">Welcome to TrainKit AI</h1>"
                + "<p style=\"font-size: 16px; margin-top: 0;\">We're excited to have you on board.</p>"
                + "</div>"
                + "<div style=\"background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin: 20px auto; max-width: 500px; text-align: center;\">"
                + "<h2>Your Verification Code:</h2>"
                + "<p style=\"font-size: 24px; font-weight: bold;\">" + verificationCode + "</p>"
                + "<p style=\"font-size: 14px; color: #555555; margin-top: 20px;\">Enter this code in the app to verify your email address.</p>"
                + "</div>"
                + "<div style=\"text-align: center; font-size: 12px; color: #aaaaaa; margin-top: 30px;\">"
                + "If you did not request this, please ignore this email."
                + "</div>"
                + "</body>"
                + "</html>";

        try {
            emailService.sendVerificationEmail(user.getEmail(), subject, htmlMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    public String generateVerificationCode() {
        Random random = new Random();
        int code = random.nextInt(900000) + 100000;
        return String.valueOf(code);
    }

    public void forgotPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String resetToken = generateResetToken();
        user.setResetPasswordToken(resetToken);
        user.setResetPasswordTokenExpiration(LocalDateTime.now().plusHours(1));
        userRepository.save(user);

        sendResetPasswordEmail(user);
    }

    public void resetPassword(ResetPasswordDto input) {
        if (!input.getNewPassword().equals(input.getConfirmPassword())) {
            throw new RuntimeException("Passwords do not match");
        }

        User user = userRepository.findByResetPasswordToken(input.getToken())
                .orElseThrow(() -> new RuntimeException("Invalid or expired reset token"));

        if (user.getResetPasswordTokenExpiration().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Reset token has expired");
        }

        user.setPassword(passwordEncoder.encode(input.getNewPassword()));
        user.setResetPasswordToken(null);
        user.setResetPasswordTokenExpiration(null);
        userRepository.save(user);
    }

    private String generateResetToken() {
        return UUID.randomUUID().toString();
    }

    private void sendResetPasswordEmail(User user) {
        String subject = "Reset Your Password";
        String resetLink = "http://localhost:4200/reset-password?token=" + user.getResetPasswordToken();
        String htmlMessage = "<html>"
                + "<body style=\"font-family: Arial, sans-serif; margin: 0; padding: 0;\">"
                + "<div style=\"background-image: linear-gradient(to bottom right, #004aad, #09cb7a); padding: 40px; color: #ffffff; text-align: center;\">"
                + "<h1 style=\"margin-bottom: 10px;\">Reset Your Password</h1>"
                + "<p style=\"font-size: 16px; margin-top: 0;\">We received a request to reset your password.</p>"
                + "</div>"
                + "<div style=\"background-color: #ffffff; color: black; padding: 30px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin: 20px auto; max-width: 500px; text-align: center;\">"
                + "<p>Click the button below to reset your password. This link will expire in 1 hour.</p>"
                + "<a href=\"" + resetLink + "\" style=\"display: inline-block; background-color: black; color: white; padding: 12px 24px; text-decoration: none; margin-top: 20px;\">Reset Password</a>"
                + "</div>"
                + "<div style=\"text-align: center; font-size: 12px; color: #aaaaaa; margin-top: 30px;\">"
                + "If you did not request this, please ignore this email."
                + "</div>"
                + "</body>"
                + "</html>";

        try {
            emailService.sendVerificationEmail(user.getEmail(), subject, htmlMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
