import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../../core/auth/services/user.service';
import { AUTHENTICATION_PATHS } from '../../../../core/constants/paths.constants';

@Component({
  selector: 'app-signup',
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  private readonly dashboardLink = AUTHENTICATION_PATHS.dashboard;
  readonly signInLink = AUTHENTICATION_PATHS.signIn;
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.userService.register(this.signupForm.value).subscribe({
        next: (res: any) => {
          console.log('Signup success:', res);
          this.router.navigate(['/', this.dashboardLink]);
        },
        error: (err: any) => {
          console.error('Signup error:', err);
        },
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}
