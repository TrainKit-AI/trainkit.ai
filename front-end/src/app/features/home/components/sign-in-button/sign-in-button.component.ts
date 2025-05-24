import { Component } from '@angular/core';
import { AUTHENTICATION_PATHS } from '../../../../core/constants/paths.constants';

@Component({
  selector: 'app-sign-in-button',
  imports: [],
  templateUrl: './sign-in-button.component.html',
  styleUrl: './sign-in-button.component.css',
})
export class SignInButtonComponent {
  signInLink = AUTHENTICATION_PATHS.signIn;
}
