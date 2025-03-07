import { NgForOf } from "@angular/common";
import { Component } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, FormBuilder, FormArray } from "@angular/forms";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatButton } from "@angular/material/button";
import { MatInput } from "@angular/material/input";
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from "@ngx-translate/core";
import { BrandingComponent } from "../../../layouts/full/vertical/sidebar/branding.component";

@Component({
  selector: 'app-verify-credential',
  imports: [RouterModule, BrandingComponent, MatFormField, MatInput, MatLabel, FormsModule, ReactiveFormsModule, TranslateModule, MatButton, NgForOf],
  templateUrl: './verify-credential.component.html'
})
export class AppVerifyCredentialComponent {
  otpForm: FormGroup;
  otpLength = 6; // Number of OTP inputs

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
    this.otpForm = this.fb.group({
      otp: this.fb.array(Array(this.otpLength).fill('').map(() => new FormControl('')))
    });
  }

  // Updated getter with casting
  get otpControls(): FormControl[] {
    return (this.otpForm.get('otp') as FormArray).controls as FormControl[];
  }

  // Track by Index for better performance
  trackByIndex(index: number): number {
    return index;
  }

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // // Accept only numeric values (0-9)
    // if (!/^\d$/.test(value)) {
    //   input.value = ''; // Clear invalid input
    //   return;
    // }

    // Move focus to the next input if available
    if (value && index < this.otpLength - 1) {
      const nextInput = input.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.nextElementSibling?.querySelector('input') as HTMLInputElement | null;
      nextInput?.focus();
    }

    this.checkOtpCompletion();
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;

    // Handle backspace: move to the previous input if empty
    if (event.key === 'Backspace' && !input.value && index > 0) {
      const previousInput = input.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.previousElementSibling?.querySelector('input') as HTMLInputElement | null;
      previousInput?.focus();
    }

    // Handle left arrow: navigate to the previous input
    if (event.key === 'ArrowLeft' && index > 0) {
      const previousInput = input.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.previousElementSibling?.querySelector('input') as HTMLInputElement | null;
      previousInput?.focus();
    }

    // Handle right arrow: navigate to the next input
    if (event.key === 'ArrowRight' && index < this.otpLength - 1) {
      const nextInput = input.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.nextElementSibling?.querySelector('input') as HTMLInputElement | null;
      nextInput?.focus();
    }
  }


  checkOtpCompletion() {
    const otpValues = this.otpControls.map(control => control.value).join('');
    if (otpValues.length === this.otpLength) {
      console.log('OTP Completed:', otpValues);
      this.submit();
    }
  }

  resend() {
    alert("Resend verification email");
  }

  submit() {
    alert("Submitted verification email" + this.otpControls.map(control => control.value).join(''));
  }
}
