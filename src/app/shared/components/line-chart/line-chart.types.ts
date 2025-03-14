export interface ILineChartConfiguration {
  view: [number, number];
  showLegend: boolean;
  showXAxisLabel: boolean;
  xAxisLabel: string;
  yScaleMin: number;
  yScaleMax: number;
  xAxis: boolean;
  yAxis: boolean;
  timeline: boolean;
  autoScale: boolean;
}
