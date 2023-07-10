import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarStefamonsComponent } from './listar-stefamons.component';

describe('MostrarStefamonsComponent', () => {
  let component: MostrarStefamonsComponent;
  let fixture: ComponentFixture<MostrarStefamonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarStefamonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarStefamonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
