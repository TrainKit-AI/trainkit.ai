import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DATASET_TYPES } from '../../../../../../core/constants/dataset.constants';
import { Dataset } from '../../../../../../core/models/dataset.model';
import { DatasetService } from '../../../../../../core/services/dataset.service';

@Component({
  selector: 'app-edit-dataset',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './edit-dataset.component.html',
  styleUrl: './edit-dataset.component.css',
})
export class EditDatasetComponent {
  readonly datasetTypes = DATASET_TYPES;
  editDatasetForm: FormGroup;
  errorMessage: string | null = null;
  datasetId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private datasetService: DatasetService,
    private router: Router
  ) {
    this.editDatasetForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('datasetId');
    if (idParam) {
      this.datasetId = +idParam;

      this.datasetService.getDatasetById(this.datasetId).subscribe({
        next: (dataset: Dataset) => {
          this.editDatasetForm.patchValue({
            name: dataset.name,
            description: dataset.description,
            type: dataset.type,
          });
        },
        error: () => {
          this.errorMessage = 'Dataset introuvable.';
        },
      });
    }
  }

  onSubmit(): void {
    if (this.editDatasetForm.valid) {
      const updatedData = this.editDatasetForm.value;

      this.datasetService.updateDataset(this.datasetId, updatedData).subscribe({
        next: () => {
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: () => {
          this.errorMessage = 'An error occured while editing the dataset';
        },
      });
    } else {
      this.editDatasetForm.markAllAsTouched();
    }
  }
}
