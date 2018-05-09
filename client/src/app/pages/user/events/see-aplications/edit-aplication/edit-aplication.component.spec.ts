import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAplicationComponent } from './edit-aplication.component';

describe('EditAplicationComponent', () => {
  let component: EditAplicationComponent;
  let fixture: ComponentFixture<EditAplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
