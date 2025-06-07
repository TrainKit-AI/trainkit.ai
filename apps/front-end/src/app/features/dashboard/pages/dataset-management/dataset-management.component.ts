import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dataset-management',
  imports: [CommonModule],
  templateUrl: './dataset-management.component.html',
  styleUrl: './dataset-management.component.css',
})
export class DatasetManagementComponent {
  datasets = [
    {
      name: 'ImageNet',
      type: 'Image',
      creationDate: '2021-06-01',
      numberOfExamples: 1000000,
    },
    {
      name: 'TextCorpus',
      type: 'Text',
      creationDate: '2022-03-15',
      numberOfExamples: 250000,
    },
    {
      name: 'AudioClips',
      type: 'Audio',
      creationDate: '2023-01-20',
      numberOfExamples: 50000,
    },
  ];

  addDataset() {
    console.log('Add dataset button clicked');
  }

  viewExamples(dataset: any) {
    console.log('Viewing examples of', dataset.name);
  }

  addExample(dataset: any) {
    console.log('Adding example to', dataset.name);
  }

  editDataset(dataset: any) {
    console.log('Editing dataset', dataset.name);
  }
}
