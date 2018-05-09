import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAplicationComponent } from './create-aplication.component';

describe('CreateAplicationComponent', () => {
  let component: CreateAplicationComponent;
  let fixture: ComponentFixture<CreateAplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
