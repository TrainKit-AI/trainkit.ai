import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AUTHENTICATION_PATHS } from '../../../../core/constants/paths.constants';

@Component({
  selector: 'app-signup',
  imports: [RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signInLink = AUTHENTICATION_PATHS.signIn;
}
