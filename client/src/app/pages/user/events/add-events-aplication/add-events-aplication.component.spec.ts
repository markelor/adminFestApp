import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventsAplicationComponent } from './add-events-aplication.component';

describe('AddEventsAplicationComponent', () => {
  let component: AddEventsAplicationComponent;
  let fixture: ComponentFixture<AddEventsAplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEventsAplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventsAplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
