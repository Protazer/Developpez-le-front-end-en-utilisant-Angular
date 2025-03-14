import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { CounterComponent } from './components/counter/counter.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    PieChartComponent,
    LineChartComponent,
    CounterComponent,
    PageTitleComponent,
    LoaderComponent,
  ],
  exports: [
    PieChartComponent,
    LineChartComponent,
    CounterComponent,
    PageTitleComponent,
    LoaderComponent,
  ],
  imports: [CommonModule, NgxChartsModule],
})
export class SharedModule {}
