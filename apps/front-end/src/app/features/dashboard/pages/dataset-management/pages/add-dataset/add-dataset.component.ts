import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../../../../../core/auth/services/authentication.service';
import { DATASET_TYPES } from '../../../../../../core/constants/dataset.constants';
import { DatasetService } from '../../../../../../core/services/dataset.service';

@Component({
  selector: 'app-add-dataset',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './add-dataset.component.html',
  styleUrl: './add-dataset.component.css',
})
export class AddDatasetComponent {
  readonly datasetTypes = DATASET_TYPES;
  addDatasetForm: FormGroup;
  errorMessage: string | null = null;
  currentUserId?: number;

  constructor(
    private fb: FormBuilder,
    private datasetService: DatasetService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) {
    this.addDatasetForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
    });
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.currentUserId = user.id;
      }
    });
  }

  onSubmit(): void {
    if (this.addDatasetForm.valid) {
      this.errorMessage = null;
      const newDataset = {
        ...this.addDatasetForm.value,
        ownerId: this.currentUserId,
      };
      this.datasetService.createDataset(newDataset).subscribe({
        next: () => {
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (err) => {
          this.errorMessage = 'Failed to add the dataset';
          console.error(err);
        },
      });
    } else {
      this.addDatasetForm.markAllAsTouched();
    }
  }
}
