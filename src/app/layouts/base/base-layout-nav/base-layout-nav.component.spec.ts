import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseLayoutNavComponent } from './base-layout-nav.component';

describe('BaseLayoutNavComponent', () => {
  let component: BaseLayoutNavComponent;
  let fixture: ComponentFixture<BaseLayoutNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseLayoutNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseLayoutNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
