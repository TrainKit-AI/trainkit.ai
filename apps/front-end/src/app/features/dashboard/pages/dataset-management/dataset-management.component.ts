import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dataset-management',
  imports: [CommonModule, RouterModule],
  templateUrl: './dataset-management.component.html',
  styleUrl: './dataset-management.component.css',
})
export class DatasetManagementComponent {}
