import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuyLoginComponent } from './quy-login.component';

describe('QuyLoginComponent', () => {
  let component: QuyLoginComponent;
  let fixture: ComponentFixture<QuyLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuyLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuyLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
