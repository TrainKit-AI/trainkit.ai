import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { DropdownMenu } from '../../../../core/data/dropdown-menu.data';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  imports: [CommonModule],
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent implements OnInit {
  @Input() DropdownMenu!: DropdownMenu;
  isExpanded: boolean = false;
  isMobile: boolean = false;

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
    if (this.isMobile) {
      this.isExpanded = true;
    }
  }

  show() {
    this.isExpanded = true;
  }

  hide() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
