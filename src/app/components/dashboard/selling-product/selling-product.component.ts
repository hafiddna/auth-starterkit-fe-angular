import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-selling-product',
  imports: [MaterialModule, TranslateModule],
  templateUrl: './selling-product.component.html'
})
export class SellingProductComponent {

}
