import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ExampleType } from '../../../../../../core/models/example.model';
import { ExampleService } from '../../../../../../core/services/example.service';

@Component({
  selector: 'app-add-example',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './add-example.component.html',
  styleUrl: './add-example.component.css',
})
export class AddExampleComponent {
  addExampleForm: FormGroup;
  errorMessage: string | null = null;
  datasetId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private exampleService: ExampleService
  ) {
    this.addExampleForm = this.fb.group({
      data: ['', Validators.required],
      label: ['', Validators.required],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('datasetId');
      this.datasetId = id ? +id : null;
    });
  }

  onSubmit(): void {
    if (this.addExampleForm.valid && this.datasetId !== null) {
      const { data, label } = this.addExampleForm.value;

      const newExample = {
        data,
        label,
        status: 'UNLABELED' as ExampleType,
      };

      this.exampleService.createExample(this.datasetId, newExample).subscribe({
        next: () =>
          this.router.navigate(['../../'], { relativeTo: this.route }),
        error: () => {
          this.errorMessage = 'Failed to add the example';
        },
      });
    } else {
      this.addExampleForm.markAllAsTouched();
    }
  }
}
