import { Component } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-social-card',
  imports: [MaterialModule, TablerIconsModule, TranslateModule],
  templateUrl: './social-card.component.html'
})
export class SocialCardComponent {

}
