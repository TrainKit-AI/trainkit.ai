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
  selector: 'app-signup',
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  readonly verifyLink = AUTHENTICATION_PATHS.verify;
  readonly signInLink = AUTHENTICATION_PATHS.signIn;
  signupForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      username: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.errorMessage = null;
      const { email, password, username } = this.signupForm.value;
      this.authService.register(email, password, username).subscribe({
        next: (response) => {
          if (response.error) {
            this.errorMessage = response.error;
          } else {
            localStorage.setItem('pendingVerificationEmail', email);
            this.router.navigate(['/', this.verifyLink]);
          }
        },
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}
