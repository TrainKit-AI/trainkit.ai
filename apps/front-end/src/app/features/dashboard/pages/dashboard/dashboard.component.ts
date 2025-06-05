import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../../../core/auth/services/authentication.service';
import { User } from '../../../../core/auth/user.model';
import { DASHBOARD_PATHS } from '../../../../core/constants/paths.constants';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  user: User | null = null;
  isSidebarOpen = false;
  readonly datasetPath = DASHBOARD_PATHS.dataset;
  readonly evaluationPath = DASHBOARD_PATHS.evaluation;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe({
      next: (user) => {
        this.user = user;
      },
    });
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout(): void {
    this.authService.logout();
  }
}
