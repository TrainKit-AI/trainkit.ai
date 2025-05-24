import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
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
export class HeaderComponent implements OnInit, OnDestroy {
  Services: DropdownMenu = SERVICES;
  isMenuOpen = false;

  ngOnInit() {
    this.updateBodyScroll();
  }

  ngOnDestroy() {
    document.body.style.overflow = 'auto';
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.updateBodyScroll();
  }

  private updateBodyScroll() {
    if (this.isMenuOpen && window.innerWidth <= 777) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth > 777 && this.isMenuOpen) {
      this.isMenuOpen = false;
      this.updateBodyScroll();
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent) {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
      this.updateBodyScroll();
    }
  }
}
