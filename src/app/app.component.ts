import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from "../environments/environment";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = `${environment.appName} Angular Admin Template`;
}
