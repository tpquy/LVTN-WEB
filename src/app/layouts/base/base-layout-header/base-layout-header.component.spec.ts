import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseLayoutHeaderComponent } from './base-layout-header.component';

describe('BaseLayoutHeaderComponent', () => {
  let component: BaseLayoutHeaderComponent;
  let fixture: ComponentFixture<BaseLayoutHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseLayoutHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseLayoutHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
