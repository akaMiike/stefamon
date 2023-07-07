import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoBatalhaComponent } from './resultado-batalha.component';

describe('ResultadoBatalhaComponent', () => {
  let component: ResultadoBatalhaComponent;
  let fixture: ComponentFixture<ResultadoBatalhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadoBatalhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadoBatalhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
