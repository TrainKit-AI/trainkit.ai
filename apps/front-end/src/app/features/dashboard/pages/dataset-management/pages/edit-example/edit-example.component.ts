import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EXAMPLE_STATUS } from '../../../../../../core/constants/dataset.constants';
import { Dataset } from '../../../../../../core/models/dataset.model';
import { Example } from '../../../../../../core/models/example.model';
import { DatasetService } from '../../../../../../core/services/dataset.service';
import { ExampleService } from '../../../../../../core/services/example.service';

@Component({
  selector: 'app-edit-example',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './edit-example.component.html',
  styleUrl: './edit-example.component.css',
})
export class EditExampleComponent {
  readonly exampleStatus = EXAMPLE_STATUS;
  editExampleForm: FormGroup;
  errorMessage: string | null = null;
  dataset: Dataset | null = null;
  datasetId!: number;
  exampleId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private exampleService: ExampleService,
    private datasetService: DatasetService
  ) {
    this.editExampleForm = this.fb.group({
      data: ['', Validators.required],
      label: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const datasetIdParam = this.route.snapshot.paramMap.get('datasetId');
    const exampleIdParam = this.route.snapshot.paramMap.get('exampleId');

    if (datasetIdParam && exampleIdParam) {
      this.datasetId = +datasetIdParam;
      this.exampleId = +exampleIdParam;

      this.datasetService.getDatasetById(this.datasetId).subscribe({
        next: (ds) => {
          this.dataset = ds;
        },
        error: () => {
          this.errorMessage = 'Dataset not found.';
        },
      });

      this.exampleService.getExampleById(this.exampleId).subscribe({
        next: (example: Example) => {
          this.editExampleForm.patchValue({
            data: example.data,
            label: example.label,
            status: example.status,
          });
        },
        error: () => {
          this.errorMessage = 'Example not found.';
        },
      });
    }
  }

  onSubmit(): void {
    if (this.editExampleForm.valid) {
      const updatedExample = this.editExampleForm.value;

      this.exampleService
        .updateExample(this.exampleId, updatedExample)
        .subscribe({
          next: () => {
            this.router.navigate(['../../../'], { relativeTo: this.route });
          },
          error: () => {
            this.errorMessage = 'Failed to update example.';
          },
        });
    } else {
      this.editExampleForm.markAllAsTouched();
    }
  }
}
