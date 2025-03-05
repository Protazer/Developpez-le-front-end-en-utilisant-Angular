import { Color } from '@swimlane/ngx-charts';

export interface IPieChartConfiguration {
  view: [number, number];
  gradient: boolean;
  showLegend: boolean;
  showLabels: boolean;
  isDoughnut: boolean;
  trimLabels: boolean;
  colorScheme: Color;
}
