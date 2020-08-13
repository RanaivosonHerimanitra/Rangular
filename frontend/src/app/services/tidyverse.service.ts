import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { filter, map, min } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TidyverseService {

  constructor() { }

  slice_min(dataSource: Observable<any>, columnName: string, nLast: number): Observable<any> {
    return dataSource.pipe(
      min<any>( (a: any, b: any) => a[columnName] < b[columnName] ? -1 : 1),
    );
  }
}
