import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';

@NgModule({
  declarations: [PieChartComponent, LineChartComponent],
  exports: [PieChartComponent, LineChartComponent],
  imports: [CommonModule, NgxChartsModule],
})
export class SharedModule {}
