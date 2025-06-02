import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  selector: 'app-verify',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css',
})
export class VerifyComponent implements OnInit {
  verifyForm: FormGroup;
  email: string | null = null;
  dashboardLink = AUTHENTICATION_PATHS.dashboard;
  signInLink = AUTHENTICATION_PATHS.signIn;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isResending = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.verifyForm = this.fb.group({
      verificationCode: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{6}$')],
      ],
    });
  }

  ngOnInit() {
    this.email = localStorage.getItem('pendingVerificationEmail');
    if (!this.email) {
      this.router.navigate(['/', this.signInLink]);
    }
  }

  onSubmit(): void {
    if (this.verifyForm.valid && this.email) {
      const { verificationCode } = this.verifyForm.value;
      this.errorMessage = null;
      this.successMessage = null;

      this.authService.verifyEmail(this.email, verificationCode).subscribe({
        next: (response) => {
          if (response.error) {
            this.errorMessage = response.error;
            this.successMessage = null;
          } else if (response.message) {
            this.successMessage = response.message;
            this.errorMessage = null;
            localStorage.removeItem('pendingVerificationEmail');
            setTimeout(() => {
              this.router.navigate(['/', this.signInLink]);
            }, 2000);
          }
        },
      });
    } else {
      this.verifyForm.markAllAsTouched();
    }
  }

  resendCode(): void {
    if (this.email && !this.isResending) {
      this.isResending = true;
      this.errorMessage = null;
      this.successMessage = null;

      this.authService.resendVerificationCode(this.email).subscribe({
        next: (response) => {
          if (response.error) {
            this.errorMessage = response.error;
            this.successMessage = null;
          } else if (response.message) {
            this.successMessage = response.message;
            this.errorMessage = null;
          }
          this.isResending = false;
        },
      });
    }
  }
}
