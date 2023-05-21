import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusStefamonsComponent } from './meus-stefamons.component';

describe('MeusStefamonsComponent', () => {
  let component: MeusStefamonsComponent;
  let fixture: ComponentFixture<MeusStefamonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeusStefamonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeusStefamonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
