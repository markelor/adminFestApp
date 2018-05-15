import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsAplicationFormComponent } from './events-aplication-form.component';

describe('EventsAplicationFormComponent', () => {
  let component: EventsAplicationFormComponent;
  let fixture: ComponentFixture<EventsAplicationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsAplicationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsAplicationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
