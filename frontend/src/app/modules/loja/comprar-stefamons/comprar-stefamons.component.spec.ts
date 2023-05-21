import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprarStefamonsComponent } from './comprar-stefamons.component';

describe('ComprarStefamonsComponent', () => {
  let component: ComprarStefamonsComponent;
  let fixture: ComponentFixture<ComprarStefamonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComprarStefamonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprarStefamonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
