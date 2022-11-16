import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCpuComponent } from './update-cpu.component';

describe('UpdateCpuComponent', () => {
  let component: UpdateCpuComponent;
  let fixture: ComponentFixture<UpdateCpuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCpuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCpuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
