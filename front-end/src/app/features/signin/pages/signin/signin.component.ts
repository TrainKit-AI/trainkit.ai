import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AUTHENTICATION_PATHS } from '../../../../core/constants/paths.constants';

@Component({
  selector: 'app-signin',
  imports: [RouterModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  signUpLink = AUTHENTICATION_PATHS.signUp;
}
