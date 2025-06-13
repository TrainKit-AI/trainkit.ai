import { Component } from '@angular/core';
import { FooterComponent } from '../home/components/footer/footer.component';
import { HeaderComponent } from '../home/components/header/header.component';

@Component({
  selector: 'app-privacy',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.css',
})
export class PrivacyComponent {}
