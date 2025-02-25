import { Component } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from "../../material.module";

// components
import { TopCardsComponent } from "../../components/dashboard/top-cards/top-cards.component";
import { RevenueUpdatesComponent } from "../../components/dashboard/revenue-updates/revenue-updates.component";
import { YearlyBreakupComponent } from "../../components/dashboard/yearly-breakup/yearly-breakup.component";
import { MonthlyEarningsComponent } from "../../components/dashboard/monthly-earnings/monthly-earnings.component";
import { EmployeeSalaryComponent } from "../../components/dashboard/employee-salary/employee-salary.component";
import { CustomersComponent } from "../../components/dashboard/customers/customers.component";
import { SocialCardComponent } from "../../components/dashboard/social-card/social-card.component";
import { SellingProductComponent } from "../../components/dashboard/selling-product/selling-product.component";
import { WeeklyStatsComponent } from "../../components/dashboard/weekly-stats/weekly-stats.component";
import { TopProjectsComponent } from "../../components/dashboard/top-projects/top-projects.component";
import { ProjectsComponent } from "../../components/dashboard/projects/projects.component";

@Component({
  selector: 'app-dashboard',
  imports: [
    TablerIconsModule,
    MaterialModule,
    TopCardsComponent,
    RevenueUpdatesComponent,
    YearlyBreakupComponent,
    MonthlyEarningsComponent,
    EmployeeSalaryComponent,
    CustomersComponent,
    SocialCardComponent,
    SellingProductComponent,
    WeeklyStatsComponent,
    TopProjectsComponent,
    ProjectsComponent
  ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  constructor() {}
}
