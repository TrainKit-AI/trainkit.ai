import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DATASET_PATH } from '../../../../../../core/constants/paths.constants';
import { Dataset } from '../../../../../../core/models/dataset.model';
import { DatasetService } from '../../../../../../core/services/dataset.service';
import { ExampleService } from '../../../../../../core/services/example.service';

@Component({
  selector: 'app-view-example',
  imports: [CommonModule, RouterModule],
  templateUrl: './view-dataset.component.html',
  styleUrl: './view-dataset.component.css',
})
export class ViewDatasetComponent {
  readonly datasetPath = DATASET_PATH;
  dataset: Dataset | null = null;
  datasetId!: number;
  errorMessage: string | null = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private datasetService: DatasetService,
    private exampleService: ExampleService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('datasetId');
    if (idParam) {
      this.datasetId = +idParam;
      this.loadDataset();
    } else {
      this.errorMessage = 'Dataset ID invalide';
    }
  }

  loadDataset(): void {
    this.loading = true;
    this.datasetService.getDatasetById(this.datasetId).subscribe({
      next: (data) => {
        this.dataset = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Dataset introuvable.';
        this.loading = false;
      },
    });
  }

  deleteExample(exampleId: number): void {
    const confirmed = confirm('Delete this example ?');
    if (!confirmed) return;

    this.exampleService.deleteExample(exampleId).subscribe({
      next: () => {
        if (this.dataset) {
          this.dataset.examples = this.dataset.examples.filter(
            (ex) => ex.id !== exampleId
          );
        }
      },
      error: () => {
        this.errorMessage = 'Échec de la suppression de l’example.';
      },
    });
  }
}
