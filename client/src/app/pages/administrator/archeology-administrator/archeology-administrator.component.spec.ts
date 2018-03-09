import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcheologyAdministratorComponent } from './archeology-administrator.component';

describe('ArcheologyAdministratorComponent', () => {
  let component: ArcheologyAdministratorComponent;
  let fixture: ComponentFixture<ArcheologyAdministratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArcheologyAdministratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArcheologyAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
