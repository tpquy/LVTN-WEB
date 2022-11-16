import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLayoutFooterComponent } from './admin-layout-footer.component';

describe('AdminLayoutFooterComponent', () => {
  let component: AdminLayoutFooterComponent;
  let fixture: ComponentFixture<AdminLayoutFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLayoutFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLayoutFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
