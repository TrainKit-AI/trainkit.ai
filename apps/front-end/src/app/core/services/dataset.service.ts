import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getEndpoints } from '../constants/endpoints.constants';
import { Dataset } from '../models/dataset.model';

@Injectable({
  providedIn: 'root',
})
export class DatasetService {
  private endpoints = getEndpoints().datasets;

  constructor(private http: HttpClient) {}

  getAllDatasets(): Observable<Dataset[]> {
    return this.http.get<Dataset[]>(this.endpoints.base);
  }

  getDatasetById(id: number): Observable<Dataset> {
    return this.http.get<Dataset>(this.endpoints.byId(id));
  }

  createDataset(dataset: Partial<Dataset>): Observable<Dataset> {
    return this.http.post<Dataset>(this.endpoints.base, dataset);
  }

  updateDataset(
    id: number,
    updatedData: Partial<Dataset>
  ): Observable<Dataset> {
    return this.http.put<Dataset>(this.endpoints.byId(id), updatedData);
  }

  deleteDataset(id: number): Observable<void> {
    return this.http.delete<void>(this.endpoints.byId(id));
  }

  exportDatasetAsJson(datasetId: number): Observable<any> {
    return this.http.get<any>(this.endpoints.export(datasetId));
  }
}
