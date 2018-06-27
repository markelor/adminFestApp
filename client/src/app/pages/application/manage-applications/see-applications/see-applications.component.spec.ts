import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeApplicationsComponent } from './see-applications.component';

describe('SeeApplicationsComponent', () => {
  let component: SeeApplicationsComponent;
  let fixture: ComponentFixture<SeeApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeApplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
