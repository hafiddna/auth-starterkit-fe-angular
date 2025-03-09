import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppForgotPasswordComponent } from './forgot-password.component';

describe('AppForgotPasswordComponent', () => {
  let component: AppForgotPasswordComponent;
  let fixture: ComponentFixture<AppForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppForgotPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
