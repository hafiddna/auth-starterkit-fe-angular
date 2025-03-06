import {
  Component,
  Output,
  EventEmitter,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { AppSettings } from 'src/app/config';
import { CoreService } from 'src/app/services/core.service';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-customizer',
  imports: [TablerIconsModule, MaterialModule, FormsModule, NgScrollbarModule, TranslateModule],
  templateUrl: './customizer.component.html',
  styleUrls: ['./customizer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CustomizerComponent {
  options = this.settings.getOptions();

  @Output() optionsChange = new EventEmitter<AppSettings>();
  hideSingleSelectionIndicator = signal(true);

  constructor(private settings: CoreService) {}

  setDark(theme: string) {
    this.settings.setOptions({ theme: theme });
    this.emitOptions();

  }

  setColor(color: string) {
    this.settings.setOptions({ activeTheme: color });
    this.emitOptions();
  }

  setDir(dir: 'ltr' | 'rtl') {
    this.settings.setOptions({ dir: dir });
    this.emitOptions();
  }

  setSidebar(sidenavOpened: boolean) {
    this.settings.setOptions({ sidenavOpened: sidenavOpened });
    this.emitOptions();
  }

  setLayout(horizontal: boolean) {
    this.settings.setOptions({ horizontal: horizontal });
    this.emitOptions();
  }

  setCardBoder(cardBorder: boolean) {
    this.settings.setOptions({ cardBorder: cardBorder });
    this.emitOptions();
  }

  setBoxed(boxed: boolean) {
    this.settings.setOptions({ boxed: boxed });
    this.emitOptions();
  }

  private emitOptions() {
    this.optionsChange.emit(this.options);
  }
}
