import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { TranslateModule } from "@ngx-translate/core";
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { tap, catchError, throwError } from 'rxjs';
import { environment } from "../../../../environments/environment";
import { BrandingComponent } from "../../../layouts/full/vertical/sidebar/branding.component";
import { MaterialModule } from "../../../material.module";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-side-login',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, BrandingComponent, TranslateModule, CommonModule, ToastrModule],
  templateUrl: './side-login.component.html',
  providers: [ToastrService]
})
export class AppSideLoginComponent {
  appName = environment.appName;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  form = new FormGroup({
    credential: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required]),
    remember: new FormControl(false),
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
    this.authService.login(this.form.value as { credential: string; password: string; remember: boolean }).pipe(
      tap(() => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
        this.router.navigate([returnUrl]).then(() => {});
      }),
      catchError((error) => {
        if (error.status === 401) {
          this.toastr.error('Invalid credentials', 'Error');
        } else if (error.status === 429) {
          // TODO: Handle rate limit error
        }

        return throwError(error);
      })
    ).subscribe();
  }
}
