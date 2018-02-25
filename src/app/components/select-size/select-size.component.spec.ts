import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSizeComponent } from './select-size.component';

describe('SelectSizeComponent', () => {
  let component: SelectSizeComponent;
  let fixture: ComponentFixture<SelectSizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
