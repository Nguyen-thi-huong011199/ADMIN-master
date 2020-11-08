import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaicvComponent } from './loaicv.component';

describe('LoaicvComponent', () => {
  let component: LoaicvComponent;
  let fixture: ComponentFixture<LoaicvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaicvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaicvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
