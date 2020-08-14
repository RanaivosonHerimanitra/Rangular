import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { filter, map, min, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TidyverseService {

  constructor() { }

  getToyData(): any[] {
    return [{a: 50}, {a: -100}, {a: 80}, {a: -10}];
  }

  slice_min(dataSource: any[], columnName: string, nLast: number): Observable<any> {
    const data$ = from(dataSource.sort((object1: any, object2: any) => object1[columnName] - object2[columnName]));
    return data$.pipe(
      take(nLast)
      );
  }
}
