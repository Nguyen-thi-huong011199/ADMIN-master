import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserndComponent } from './usernd.component';

describe('UserndComponent', () => {
  let component: UserndComponent;
  let fixture: ComponentFixture<UserndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserndComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
