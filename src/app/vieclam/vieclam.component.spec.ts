import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VieclamComponent } from './vieclam.component';

describe('VieclamComponent', () => {
  let component: VieclamComponent;
  let fixture: ComponentFixture<VieclamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VieclamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VieclamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
