import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from "./services/auth.service";
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService
  ) {}

  title = 'Auth Starterkit Angular Admin Template';

  ngOnInit() {
    this.authService.getProfile().pipe(
      tap((profile) => {
        console.log('Profile:', profile);
      })
    )
  }
}
