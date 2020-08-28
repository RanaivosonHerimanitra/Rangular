import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
export const BASE_ENDPOINT = 'http://127.0.0.1:4520/';
export const ENDPOINT_URLS = [<%=getEndPoints(endpoints)%>];
@Injectable({
  providedIn: 'root'
})

export class DataMethodsService {
  constructor(private http: HttpClient) { }

  <%=getServiceMethods(endpoints)%>
  
}
