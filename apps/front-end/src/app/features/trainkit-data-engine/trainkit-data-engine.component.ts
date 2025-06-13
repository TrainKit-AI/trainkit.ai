import { Component } from '@angular/core';
import { FooterComponent } from '../home/components/footer/footer.component';
import { HeaderComponent } from '../home/components/header/header.component';

@Component({
  selector: 'app-trainkit-data-engine',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './trainkit-data-engine.component.html',
  styleUrl: './trainkit-data-engine.component.css',
})
export class TrainkitDataEngineComponent {}
