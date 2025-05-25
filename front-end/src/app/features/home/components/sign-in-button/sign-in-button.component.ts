import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AUTHENTICATION_PATHS } from '../../../../core/constants/paths.constants';

@Component({
  selector: 'app-sign-in-button',
  imports: [RouterModule],
  templateUrl: './sign-in-button.component.html',
  styleUrl: './sign-in-button.component.css',
})
export class SignInButtonComponent {
  signInLink = AUTHENTICATION_PATHS.signIn;
}
