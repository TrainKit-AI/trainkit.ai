import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AUTHENTICATION_PATHS } from '../../../../core/constants/paths.constants';

@Component({
  selector: 'app-sign-up-button',
  imports: [RouterModule],
  templateUrl: './sign-up-button.component.html',
  styleUrl: './sign-up-button.component.css',
})
export class SignUpButtonComponent {
  signUpLink = AUTHENTICATION_PATHS.signUp;
}
