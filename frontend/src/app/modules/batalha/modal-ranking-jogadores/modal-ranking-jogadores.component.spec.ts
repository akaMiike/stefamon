import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRankingJogadoresComponent } from './modal-ranking-jogadores.component';

describe('ModalRankingJogadoresComponent', () => {
  let component: ModalRankingJogadoresComponent;
  let fixture: ComponentFixture<ModalRankingJogadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRankingJogadoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRankingJogadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
