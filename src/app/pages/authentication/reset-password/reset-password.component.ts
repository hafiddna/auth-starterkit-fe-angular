import { Component } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatAnchor } from "@angular/material/button";
import { MatInput } from "@angular/material/input";
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from "@ngx-translate/core";
import { BrandingComponent } from "../../../layouts/full/vertical/sidebar/branding.component";

@Component({
  selector: 'app-reset-password',
  imports: [RouterModule, BrandingComponent, MatFormField, MatInput, MatLabel, ReactiveFormsModule, TranslateModule, MatAnchor],
  templateUrl: './reset-password.component.html'
})
export class AppResetPasswordComponent {
  constructor(
    private router: Router,
  ) {}
}
