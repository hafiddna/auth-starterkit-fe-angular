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
    if (!permissions || permissions.length === 0) {
      return true;
    }

    if (!this.authData || !this.authData.permissions) {
      return false;
    }

    for (const requiredPermission of permissions) {
      if (requiredPermission === '*:*' || requiredPermission === '*') {
        return true; // Full access wildcard
      }

      for (const userPermission of this.authData.permissions) {
        // Exact match
        if (userPermission === requiredPermission) {
          return true;
        }

        // Handle wildcards like "*:permissions"
        const [requiredAction, requiredResource] = requiredPermission.split(':');
        const [userAction, userResource] = userPermission.split(':');

        if (
          (requiredAction === '*' || requiredAction === userAction) &&
          (requiredResource === '*' || requiredResource === userResource)
        ) {
          return true; // Match any action or resource
        }
      }
    }

    return false; // No match found
  }
}
