import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLayoutHeaderComponent } from './admin-layout-header.component';

describe('AdminLayoutHeaderComponent', () => {
  let component: AdminLayoutHeaderComponent;
  let fixture: ComponentFixture<AdminLayoutHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLayoutHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLayoutHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
