import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppVerifyCredentialComponent } from './verify-credential.component';

describe('AppVerifyCredentialComponent', () => {
  let component: AppVerifyCredentialComponent;
  let fixture: ComponentFixture<AppVerifyCredentialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppVerifyCredentialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppVerifyCredentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
