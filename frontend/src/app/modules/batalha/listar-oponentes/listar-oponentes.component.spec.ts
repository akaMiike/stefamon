import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarOponentesComponent } from './listar-oponentes.component';

describe('ListarOponentesComponent', () => {
  let component: ListarOponentesComponent;
  let fixture: ComponentFixture<ListarOponentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarOponentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarOponentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
