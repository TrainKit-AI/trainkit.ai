import { DatasetType } from '../models/dataset.model';
import { ExampleType } from '../models/example.model';

export const DATASET_TYPES: {
  value: DatasetType;
  icon: string;
  label: string;
}[] = [
  { value: 'TEXT', icon: 'list_alt', label: 'Text' },
  { value: 'IMAGE', icon: 'image', label: 'Image' },
];

export const EXAMPLE_STATUS: {
  value: ExampleType;
  icon: string;
  label: string;
  symbol: boolean;
}[] = [
  { value: 'LABELED', icon: 'label', label: 'Labeled', symbol: false },
  { value: 'UNLABELED', icon: 'image', label: 'Unlabeled', symbol: false },
  { value: 'REVIEWED', icon: 'visibility', label: 'Reviewed', symbol: false },
];
