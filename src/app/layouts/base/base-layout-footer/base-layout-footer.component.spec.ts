import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseLayoutFooterComponent } from './base-layout-footer.component';

describe('BaseLayoutFooterComponent', () => {
  let component: BaseLayoutFooterComponent;
  let fixture: ComponentFixture<BaseLayoutFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseLayoutFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseLayoutFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
