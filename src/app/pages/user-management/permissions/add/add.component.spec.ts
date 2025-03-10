import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPermissionComponent } from './add.component';

describe('AddPermissionComponent', () => {
  let component: AddPermissionComponent;
  let fixture: ComponentFixture<AddPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPermissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
