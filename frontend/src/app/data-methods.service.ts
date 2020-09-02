import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
export const BASE_ENDPOINT = 'http://127.0.0.1:7999/';
export const ENDPOINT_URLS = ["api/iris","echo","api/iris","api/binomial/random"];
@Injectable({
  providedIn: 'root'
})

export class DataMethodsService {
  constructor(private http: HttpClient) { }

  getDataService(path: string): Observable<any> {
      return this.http.get<any>(BASE_ENDPOINT + path);
    }
  
}
