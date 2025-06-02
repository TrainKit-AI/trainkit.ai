import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../../../core/auth/services/authentication.service';
import { AUTHENTICATION_PATHS } from '../../../../core/constants/paths.constants';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  token: string | null = null;
  readonly signInLink = AUTHENTICATION_PATHS.signIn;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    if (!this.token) {
      this.router.navigate(['/', this.signInLink]);
    }
  }

  onSubmit(): void {
    if (this.resetForm.valid && this.token) {
      this.errorMessage = null;
      this.successMessage = null;

      const resetData = {
        token: this.token,
        newPassword: this.resetForm.get('newPassword')?.value,
        confirmPassword: this.resetForm.get('confirmPassword')?.value,
      };

      this.authService.resetPassword(resetData).subscribe({
        next: (response) => {
          if (response?.error) {
            this.errorMessage = response.error;
            this.successMessage = null;
          } else if (response?.message) {
            this.successMessage = response.message;
            this.errorMessage = null;
            setTimeout(() => {
              this.router.navigate(['/', this.signInLink]);
            }, 2000);
          }
        },
        error: (error) => {
          this.errorMessage =
            error.error?.message || 'Une erreur technique est survenue';
          this.successMessage = null;
        },
      });
    } else {
      this.resetForm.markAllAsTouched();
      if (!this.token) {
        this.errorMessage = 'Token de réinitialisation manquant';
      }
    }
  }
}
