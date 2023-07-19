import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAjudaLojaComponent } from './modal-ajuda-loja.component';

describe('ModalAjudaLojaComponent', () => {
  let component: ModalAjudaLojaComponent;
  let fixture: ComponentFixture<ModalAjudaLojaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAjudaLojaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAjudaLojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
