import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DropdownMenu } from '../../../../core/data/dropdown-menu.data';

@Component({
  selector: 'app-dropdown',
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent {
  @Input()
  DropdownMenu!: DropdownMenu;
  isExpanded: boolean = false;

  show() {
    this.isExpanded = true;
  }

  hide() {
    this.isExpanded = false;
  }
}
