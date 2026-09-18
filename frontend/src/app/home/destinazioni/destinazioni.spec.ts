import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Destinazioni } from './destinazioni';

describe('Destinazioni', () => {
  let component: Destinazioni;
  let fixture: ComponentFixture<Destinazioni>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Destinazioni],
    }).compileComponents();

    fixture = TestBed.createComponent(Destinazioni);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
