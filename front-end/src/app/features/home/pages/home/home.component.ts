import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { SignUpButtonComponent } from '../../components/sign-up-button/sign-up-button.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, SignUpButtonComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
