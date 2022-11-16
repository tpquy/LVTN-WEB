import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCpuComponent } from './add-cpu.component';

describe('AddCpuComponent', () => {
  let component: AddCpuComponent;
  let fixture: ComponentFixture<AddCpuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCpuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCpuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
