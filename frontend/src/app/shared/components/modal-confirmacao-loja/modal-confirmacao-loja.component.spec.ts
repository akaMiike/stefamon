import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmacaoLojaComponent } from './modal-confirmacao-loja.component';

describe('ModalConfirmacaoLojaComponent', () => {
  let component: ModalConfirmacaoLojaComponent;
  let fixture: ComponentFixture<ModalConfirmacaoLojaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConfirmacaoLojaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmacaoLojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
