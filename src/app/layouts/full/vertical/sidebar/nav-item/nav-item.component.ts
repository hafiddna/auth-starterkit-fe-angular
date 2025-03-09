import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NavItem } from './nav-item';
import { NavService } from '../../../../../services/nav.service';
import { JWTUser } from "../../../../../services/token.service";
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-nav-item',
  imports: [TranslateModule, TablerIconsModule, MaterialModule, CommonModule],
  templateUrl: './nav-item.component.html',
  styleUrls: [],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ]),
  ],
})
export class AppNavItemComponent implements OnChanges {
  @Output() toggleMobileLink: any = new EventEmitter<void>();
  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();

  expanded: any = false;
  disabled: any = false;
  twoLines: any = false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: NavItem | any;
  @Input() depth: any;
  @Input() authData: JWTUser | null;

  constructor(public navService: NavService, public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnChanges() {
    const url = this.navService.currentUrl();
    if (this.item.route && url) {
      this.expanded = url.indexOf(`/${this.item.route}`) === 0;
      this.ariaExpanded = this.expanded;
    }
  }

  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
    //scroll
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    if (!this.expanded) {
      if (window.innerWidth < 1024) {
        this.notify.emit();
      }
    }
  }

  onSubItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      if (this.expanded && window.innerWidth < 1024) {
        this.notify.emit();
      }
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
