import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectToppingsComponent } from './select-toppings.component';

describe('SelectToppingsComponent', () => {
  let component: SelectToppingsComponent;
  let fixture: ComponentFixture<SelectToppingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectToppingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectToppingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
