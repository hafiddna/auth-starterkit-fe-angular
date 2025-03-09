import { Component, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatFormField, MatHint, MatLabel, MatSuffix } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatProgressBar } from "@angular/material/progress-bar";
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from "@ngx-translate/core";
import { BrandingComponent } from "../../../layouts/full/vertical/sidebar/branding.component";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-reset-password',
  imports: [RouterModule, BrandingComponent, MatFormField, MatInput, MatLabel, FormsModule, ReactiveFormsModule, TranslateModule, MatButton, MatHint, MatIcon, MatIconButton, MatSuffix, MatProgressBar],
  templateUrl: './reset-password.component.html'
})
export class AppResetPasswordComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  form = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  hide = signal(true);
  hideConfirmation = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  clickConfirmationEvent(event: MouseEvent) {
    this.hideConfirmation.set(!this.hideConfirmation());
    event.stopPropagation();
  }

  get strength(): number {
    return this.calculateStrength(this.form.value.password ?? '');
  }

  private calculateStrength(password: string): number {
    let strength = 0;
    if (password.length >= 8) strength += 30;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^A-Za-z0-9]/.test(password)) strength += 15;
    return strength;
  }

  submit() {
    if (this.form.value.password !== this.form.value.confirmPassword) {
      this.form.controls.confirmPassword.setErrors({ 'notMatch': true });
      return;
    }

    alert('Password reset');
  }
}
