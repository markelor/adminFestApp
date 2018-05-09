import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeAplicationsComponent } from './see-aplications.component';

describe('SeeAplicationsComponent', () => {
  let component: SeeAplicationsComponent;
  let fixture: ComponentFixture<SeeAplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeAplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeAplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
