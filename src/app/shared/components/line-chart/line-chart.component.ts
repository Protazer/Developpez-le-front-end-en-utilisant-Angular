import { Component, Input, OnInit } from '@angular/core';
import { ScaleType } from '@swimlane/ngx-charts';
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
    colorScheme: {
      name: 'custom colors',
      group: ScaleType.Linear,
      domain: [
        '#956065',
        '#793d52',
        '#89a1db',
        '#9780a1',
        '#bfe0f1',
        '#b8cbe7',
      ],
      selectable: false,
    },
  };

  ngOnInit() {
    this.configuration.view = [window.innerWidth, 500];
    const medalsCount: number[] | undefined = this.datas
      ?.map((data) => {
        return data.series.map((serie) => {
          return serie.value;
        });
      })
      .flat();

    if (medalsCount) {
      const max = Math.max(...medalsCount);
      const min = Math.min(...medalsCount);
      const delta = Math.floor(max - min);
      this.configuration.yScaleMin = Math.floor(min - delta);
      this.configuration.yScaleMax = Math.floor(max + delta);
    }
  }

  onResize(event: Event): void {
    const element = event.target as Window;
    this.configuration.view = [element.innerWidth, 500];
  }
}
