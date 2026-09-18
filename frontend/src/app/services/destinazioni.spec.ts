import { TestBed } from '@angular/core/testing';
import { Destinazioni } from './destinazioni';

describe('Destinazioni', () => {
  let service: Destinazioni;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Destinazioni);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
