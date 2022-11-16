import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickUpdateProductComponent } from './quick-update-product.component';

describe('QuickUpdateProductComponent', () => {
  let component: QuickUpdateProductComponent;
  let fixture: ComponentFixture<QuickUpdateProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickUpdateProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickUpdateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
