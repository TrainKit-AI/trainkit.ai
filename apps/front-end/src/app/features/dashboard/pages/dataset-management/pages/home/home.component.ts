import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DATASET_PATH } from '../../../../../../core/constants/paths.constants';
import { Dataset } from '../../../../../../core/models/dataset.model';
import { DatasetService } from '../../../../../../core/services/dataset.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  readonly datasetPath = DATASET_PATH;
  datasets: Dataset[] = [];

  constructor(private datasetService: DatasetService) {}

  ngOnInit(): void {
    this.loadDatasets();
  }

  loadDatasets(): void {
    this.datasetService.getAllDatasets().subscribe({
      next: (data) => {
        this.datasets = data;
      },
      error: (err) => {
        console.error('Erreur de chargement des datasets :', err);
      },
    });
  }

  exportDataset(datasetId: number): void {
    this.datasetService.exportDatasetAsJson(datasetId).subscribe({
      next: (datasetJson) => {
        const blob = new Blob([JSON.stringify(datasetJson, null, 2)], {
          type: 'application/json',
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dataset-${datasetId}.json`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err: any) => {
        console.error("Erreur lors de l'export du dataset :", err);
      },
    });
  }

  deleteDataset(datasetId: number): void {
    const confirmed = confirm('Are you sure you want to delete this dataset?');
    if (!confirmed) return;

    this.datasetService.deleteDataset(datasetId).subscribe({
      next: () => {
        this.datasets = this.datasets.filter((d) => d.id !== datasetId);
      },
      error: (err) => {
        console.error('Deleting failed :', err);
      },
    });
  }
}
