import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHistoricoBatalhasComponent } from './modal-historico-batalhas.component';

describe('ModalHistoricoBatalhasComponent', () => {
  let component: ModalHistoricoBatalhasComponent;
  let fixture: ComponentFixture<ModalHistoricoBatalhasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalHistoricoBatalhasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHistoricoBatalhasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
