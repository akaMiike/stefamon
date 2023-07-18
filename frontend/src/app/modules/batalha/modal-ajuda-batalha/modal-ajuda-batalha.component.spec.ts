import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAjudaBatalhaComponent } from './modal-ajuda-batalha.component';

describe('ModalAjudaBatalhaComponent', () => {
  let component: ModalAjudaBatalhaComponent;
  let fixture: ComponentFixture<ModalAjudaBatalhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAjudaBatalhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAjudaBatalhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
