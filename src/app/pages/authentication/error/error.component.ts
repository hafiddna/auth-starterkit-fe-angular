import { Component } from '@angular/core';
import { MatAnchor } from "@angular/material/button";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-error',
  imports: [RouterModule, MatAnchor],
  templateUrl: './error.component.html'
})
export class AppErrorComponent {}
