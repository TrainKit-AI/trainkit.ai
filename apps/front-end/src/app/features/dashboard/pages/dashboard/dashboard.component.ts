import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthenticationService } from '../../../../core/auth/services/authentication.service';
import { User } from '../../../../core/auth/user.model';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  user: User | null = null;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe({
      next: (user) => {
        this.user = user;
      },
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
