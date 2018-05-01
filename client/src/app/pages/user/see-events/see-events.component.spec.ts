import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeEventsComponent } from './see-events.component';

describe('SeeEventsComponent', () => {
  let component: SeeEventsComponent;
  let fixture: ComponentFixture<SeeEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
