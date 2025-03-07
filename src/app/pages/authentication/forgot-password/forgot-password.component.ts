import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAnchor, MatButton } from "@angular/material/button";
import { MatFormField, MatHint, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from "@ngx-translate/core";
import { BrandingComponent } from "../../../layouts/full/vertical/sidebar/branding.component";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-forgot-password',
  imports: [RouterModule, BrandingComponent, MatButton, MatFormField, MatHint, MatInput, MatLabel, FormsModule, ReactiveFormsModule, TranslateModule, MatAnchor],
  templateUrl: './forgot-password.component.html'
})
export class AppForgotPasswordComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  form = new FormGroup({
    credential: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    alert("This feature is not implemented yet." + JSON.stringify(this.form.value));
  }
}
