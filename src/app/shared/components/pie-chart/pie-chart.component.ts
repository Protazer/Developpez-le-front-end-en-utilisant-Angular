import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ScaleType } from '@swimlane/ngx-charts';
import { IPieChartDatas } from '../../../core/models/PieChart';
import { IPieChartConfiguration } from './pie-chart.types';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResponsiveDevicesType } from '../../../core/services/responsive.service.type';
import { ResponsiveService } from '../../../core/services/responsive.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent implements OnInit, OnDestroy {
  @Input() datas?: IPieChartDatas[];
  public responsiveSubscription?: Subscription;
  public responsiveDevices: ResponsiveDevicesType = null;
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

  /**
   * Dependencies injection.
   * @param router
   * @param responsiveService
   */
  constructor(
    private router: Router,
    private responsiveService: ResponsiveService
  ) {}

  ngOnInit() {
    // Initialize view of chart.
    this.configuration.view = [window.innerWidth, 500];
    this.responsiveSubscription = this.responsiveService
      .observeBreakPoints()
      .subscribe((): void => {
        this.responsiveDevices = this.responsiveService.breakPointsChange();
        this.configuration.trimLabels =
          this.responsiveService.breakPointsChange() === 'phone';
      });
  }

  /**
   * Redirect to 'details/id' with selected country id.
   * @param data
   */
  onSelect(data: IPieChartDatas): void {
    this.router.navigateByUrl(`details/${data.extra.id}`);
  }

  /**
   * Compute view width with resize event.
   * @param event
   */
  onResize(event: Event): void {
    const element = event.target as Window;
    this.configuration.view = [element.innerWidth, 500];
  }

  /**
   * Unsubscribe services.
   */
  ngOnDestroy(): void {
    this.responsiveSubscription?.unsubscribe();
  }
}
