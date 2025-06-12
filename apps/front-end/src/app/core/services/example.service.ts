import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getEndpoints } from '../constants/endpoints.constants';
import { Example } from '../models/example.model';

@Injectable({
  providedIn: 'root',
})
export class ExampleService {
  private endpoints = getEndpoints().examples;

  constructor(private http: HttpClient) {}

  getAllExamples(): Observable<Example[]> {
    return this.http.get<Example[]>(this.endpoints.base);
  }

  getExampleById(id: number): Observable<Example> {
    return this.http.get<Example>(this.endpoints.byId(id));
  }

  getExamplesByDatasetId(datasetId: number): Observable<Example[]> {
    return this.http.get<Example[]>(this.endpoints.byDataset(datasetId));
  }

  createExample(
    datasetId: number,
    example: Partial<Example>
  ): Observable<Example> {
    return this.http.post<Example>(
      this.endpoints.createForDataset(datasetId),
      example
    );
  }

  updateExample(id: number, example: Partial<Example>): Observable<Example> {
    return this.http.put<Example>(this.endpoints.byId(id), example);
  }

  deleteExample(id: number): Observable<void> {
    return this.http.delete<void>(this.endpoints.byId(id));
  }
}
