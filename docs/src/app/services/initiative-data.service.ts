import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contributor, FeedbackRecord } from '../models/contributor';

@Injectable({
  providedIn: 'root'
})
export class InitiativeDataService {
  private apiUrl = 'https://localhost:7124/api';

  constructor(private http: HttpClient) { }

  submitContributor(data: Contributor): Observable<any> {
    return this.http.post(`${this.apiUrl}/contributors`, data).pipe(
      catchError(() => of({ status: 'offline_saved', data }))
    );
  }

  submitFeedback(data: FeedbackRecord): Observable<any> {
    return this.http.post(`${this.apiUrl}/feedback`, data).pipe(
      catchError(() => of({ status: 'offline_saved', data }))
    );
  }
}
