import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  DropdownMenu,
  SERVICES,
} from '../../../../core/data/dropdown-menu.data';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { SignInButtonComponent } from '../sign-in-button/sign-in-button.component';
import { SignUpButtonComponent } from '../sign-up-button/sign-up-button.component';

@Component({
  selector: 'app-header',
  imports: [
    SignInButtonComponent,
    SignUpButtonComponent,
    DropdownComponent,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  Services: DropdownMenu = SERVICES;
}
