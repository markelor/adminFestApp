import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicationModalComponent } from './aplication-modal.component';

describe('AplicationModalComponent', () => {
  let component: AplicationModalComponent;
  let fixture: ComponentFixture<AplicationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AplicationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AplicationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
