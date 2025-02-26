import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-add',
  imports: [MatDialogModule, CommonModule, MatButtonModule],
  templateUrl: './add.component.html',
  providers: [DatePipe]
})
export class AddComponent {
  constructor() {}
}
