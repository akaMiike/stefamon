import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarLogBatalhaComponent } from './listar-log-batalha.component';

describe('ListarLogBatalhaComponent', () => {
  let component: ListarLogBatalhaComponent;
  let fixture: ComponentFixture<ListarLogBatalhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarLogBatalhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarLogBatalhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
