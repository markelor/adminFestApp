import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventsAplicationComponent } from './edit-events-aplication.component';

describe('EditEventsAplicationComponent', () => {
  let component: EditEventsAplicationComponent;
  let fixture: ComponentFixture<EditEventsAplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEventsAplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEventsAplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
