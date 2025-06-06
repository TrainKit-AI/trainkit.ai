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
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  signUpLink = AUTHENTICATION_PATHS.signUp;
  dashboardLink = AUTHENTICATION_PATHS.dashboard;
  forgotPasswordLink = AUTHENTICATION_PATHS.forgotPassword;
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.errorMessage = null;
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          if (response.token) {
            this.router.navigate(['/', this.dashboardLink]);
          } else {
            this.errorMessage = response.message;
          }
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
