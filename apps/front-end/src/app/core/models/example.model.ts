export type ExampleType = 'LABELED' | 'UNLABELED' | 'REVIEWED';

export interface Example {
  id: number;
  data: string;
  label: string | null;
  status: ExampleType;
  createdAt: string;
  updatedAt: string;
}
