import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLayoutNavComponent } from './admin-layout-nav.component';

describe('AdminLayoutNavComponent', () => {
  let component: AdminLayoutNavComponent;
  let fixture: ComponentFixture<AdminLayoutNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLayoutNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLayoutNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
