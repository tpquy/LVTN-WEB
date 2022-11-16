import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NofiComponent } from './nofi.component';

describe('NofiComponent', () => {
  let component: NofiComponent;
  let fixture: ComponentFixture<NofiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NofiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NofiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
