import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcheologyModalComponent } from './archeology-modal.component';

describe('ArcheologyModalComponent', () => {
  let component: ArcheologyModalComponent;
  let fixture: ComponentFixture<ArcheologyModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArcheologyModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArcheologyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
