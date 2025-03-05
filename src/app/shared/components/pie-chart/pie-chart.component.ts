import { Component, Input, OnInit } from '@angular/core';
import { ScaleType } from '@swimlane/ngx-charts';
import { IPieChartDatas } from '../../../core/models/PieChart';
import { IPieChartConfiguration } from './pie-chart.types';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent implements OnInit {
  @Input() datas?: IPieChartDatas[] | null;
  configuration: IPieChartConfiguration = {
    view: [500, 500],
    gradient: true,
    showLegend: false,
    showLabels: true,
    isDoughnut: false,
    trimLabels: false,
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
  }

  onSelect(data: IPieChartDatas) {
    console.log(data);
  }

  onResize(event: Event): void {
    const element = event.target as Window;
    this.configuration.view = [element.innerWidth, 500];
  }

  onActivate(data: any): void {}
}
