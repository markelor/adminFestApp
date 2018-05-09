import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicationFormComponent } from './aplication-form.component';

describe('AplicationFormComponent', () => {
  let component: AplicationFormComponent;
  let fixture: ComponentFixture<AplicationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AplicationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AplicationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
