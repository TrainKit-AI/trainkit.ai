import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../../../core/auth/services/authentication.service';
import { AUTHENTICATION_PATHS } from '../../../../core/constants/paths.constants';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  readonly signInLink = AUTHENTICATION_PATHS.signIn;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.forgotForm.valid) {
      this.errorMessage = null;
      this.successMessage = null;

      this.authService
        .forgotPassword(this.forgotForm.get('email')?.value)
        .subscribe({
          next: (response) => {
            this.successMessage = response.message;
          },
          error: (error) => {
            this.errorMessage = error.error.message;
          },
        });
    } else {
      this.forgotForm.markAllAsTouched();
    }
  }
}
