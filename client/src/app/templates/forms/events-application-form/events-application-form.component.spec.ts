import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsApplicationFormComponent } from './events-application-form.component';

describe('EventsApplicationFormComponent', () => {
  let component: EventsApplicationFormComponent;
  let fixture: ComponentFixture<EventsApplicationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsApplicationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsApplicationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
