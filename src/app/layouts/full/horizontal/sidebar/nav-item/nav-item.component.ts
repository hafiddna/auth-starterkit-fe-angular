import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NavService } from '../../../../../services/nav.service';
import { JWTUser } from "../../../../../services/token.service";

@Component({
  selector: 'app-horizontal-nav-item',
  imports: [TablerIconsModule, CommonModule, MatIconModule],
  templateUrl: './nav-item.component.html',
})
export class AppHorizontalNavItemComponent implements OnInit {
  @Input() depth: any;
  @Input() item: any;
  @Input() authData: JWTUser | null;

  constructor(public navService: NavService, public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {}
  onItemSelected(item: any) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]).then(() => {});
    }
  }

  checkPermissions(permissions: string[] | undefined): boolean {
    if (!permissions) {
      return true;
    }

    if (!this.authData) {
      return false;
    }

    for (const permission of permissions) {
      if (permission === '*') {
        return true;
      }

      if (permission.startsWith('*:')) {
        const permissionName = permission.split(':')[1];
        if (this.authData.permissions.includes(permissionName)) {
          return true;
        }
      }

      if (this.authData.permissions.includes(permission)) {
        return true;
      }
    }

    return false;
  }
}
