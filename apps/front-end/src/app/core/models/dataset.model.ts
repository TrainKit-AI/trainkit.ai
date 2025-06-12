import { Example } from './example.model';

export type DatasetType = 'TEXT' | 'IMAGE';

export interface Dataset {
  id: number;
  name: string;
  description: string;
  type: DatasetType;
  createdAt: string;
  examples: Example[];
}
