import { TestBed } from '@angular/core/testing';
import { AdminDestinazioni } from './admin-destinazioni';

describe('AdminDestinazioni', () => {
  let service: AdminDestinazioni;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminDestinazioni);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
