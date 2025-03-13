import { Component } from '@angular/core';
import { MatAnchor } from "@angular/material/button";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-not-found',
  imports: [RouterModule, MatAnchor],
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent {}
