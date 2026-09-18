import { TestBed } from '@angular/core/testing';
import { RichiesteService } from './richieste';

describe('Richiestepreventivo', () => {
  let service: RichiesteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RichiesteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
