import { TestBed } from '@angular/core/testing';

import { TidyverseService } from './tidyverse.service';
import { from } from 'rxjs';

describe('TidyverseService', () => {
  let service: TidyverseService = new TidyverseService();

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TidyverseService);
  });

  it('It should be -1: ', () => {
    const data = [{a: 1}, {a: 10}, {a: 4}, {a: -1}];
    service.slice_min(data, 'a', 1).subscribe(value => {
      expect(value.a).toBe(-1);
    });
  });
});
