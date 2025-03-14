import { Component, Input, OnInit } from '@angular/core';
import { ILineChartDatas } from '../../../core/models/LineChart';
import { ILineChartConfiguration } from './line-chart.types';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss',
})
export class LineChartComponent implements OnInit {
  @Input() datas?: ILineChartDatas[] | null;

  configuration: ILineChartConfiguration = {
    view: [500, 500],
    showLegend: false,
    showXAxisLabel: true,
    xAxisLabel: 'Dates',
    yScaleMin: 0,
    yScaleMax: 0,
    xAxis: true,
    yAxis: true,
    timeline: true,
    autoScale: true,
  };

  ngOnInit(): void {
    // Initialize view of chart.
    this.configuration.view = [window.innerWidth, 500];

    // Get medals count
    const medalsCount: number[] | undefined = this.datas
      ?.map((data: ILineChartDatas): number[] => {
        return data.series.map(
          (serie: { name: string; value: number }): number => {
            return serie.value;
          }
        );
      })
      .flat();

    // Compute min and max medals to set the y scale
    if (medalsCount) {
      const max: number = Math.max(...medalsCount);
      const min: number = Math.min(...medalsCount);
      const delta: number = Math.floor(max - min);
      this.configuration.yScaleMin = Math.floor(min - delta);
      this.configuration.yScaleMax = Math.floor(max + delta);
    }
  }

  /**
   * Compute view width with resize event.
   * @param event
   */
  onResize(event: Event): void {
    const element = event.target as Window;
    this.configuration.view = [element.innerWidth, 500];
  }
}
