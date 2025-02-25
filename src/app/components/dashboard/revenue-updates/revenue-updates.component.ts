import { Component, ViewChild } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { TablerIconsModule } from 'angular-tabler-icons';
import { ApexChart, ChartComponent, ApexDataLabels, ApexLegend, ApexStroke, ApexTooltip, ApexAxisChartSeries, ApexXAxis, ApexYAxis, ApexGrid, ApexPlotOptions, ApexFill, ApexMarkers, NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from '../../../material.module';

interface month {
  value: string;
  monthViewValue: string;
  yearViewValue: string;
}

export interface revenueChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
  marker: ApexMarkers;
}

@Component({
  selector: 'app-revenue-updates',
  imports: [NgApexchartsModule, MaterialModule, TablerIconsModule, TranslateModule],
  templateUrl: './revenue-updates.component.html'
})
export class RevenueUpdatesComponent {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  public revenueChart!: Partial<revenueChart> | any;

  months: month[] = [
    { value: 'mar', monthViewValue: 'March', yearViewValue: '2025' },
    { value: 'apr', monthViewValue: 'April', yearViewValue: '2025' },
    { value: 'june', monthViewValue: 'June', yearViewValue: '2025' },
  ];

  constructor() {
    this.revenueChart = {
      series: [
        {
          name: 'Eanings this month',
          data: [1.5, 2.7, 2.2, 3.6, 1.5, 1.0],
          color: '#5D87FF',
        },
        {
          name: 'Expense this month',
          data: [-1.8, -1.1, -2.5, -1.5, -0.6, -1.8],
          color: '#49BEFF',
        },
      ],

      chart: {
        type: 'bar',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 340,
        stacked: true,
      },

      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '20%',
          borderRadius: [6],
          borderRadiusApplication: 'end',
          borderRadiusWhenStacked: 'all',
        },
      },

      stroke: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      grid: {
        borderColor: 'rgba(0,0,0,0.1)',
        strokeDashArray: 3,
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      yaxis: {
        min: -5,
        max: 5,
        tickAmount: 4,
      },
      xaxis: {
        categories: [
          '16/08',
          '17/08',
          '18/08',
          '19/08',
          '20/08',
          '21/08',
          '22/08',
        ],
        axisBorder: {
          show: false,
        },
      },
      tooltip: {
        theme: 'dark',
        fillSeriesColor: false,
      },
    };
  }
}
