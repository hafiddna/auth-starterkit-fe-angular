import { Component, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from "@ngx-translate/core";
import { environment } from "../../../../environments/environment";
import { BrandingComponent } from 'src/app/layouts/full/vertical/sidebar/branding.component';
import { MaterialModule } from 'src/app/material.module';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-side-register',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, BrandingComponent, TranslateModule],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent {
  appName = environment.appName;

  options = this.settings.getOptions();

  constructor(private settings: CoreService, private router: Router) {}

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    this.router.navigate(['/']);
  }
}
