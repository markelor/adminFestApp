import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeServicesComponent } from './see-services.component';

describe('SeeServicesComponent', () => {
  let component: SeeServicesComponent;
  let fixture: ComponentFixture<SeeServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
