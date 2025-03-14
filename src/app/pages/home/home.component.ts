import { Component, OnDestroy, OnInit } from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { IPieChartDatas } from '../../core/models/PieChart';
import { Subscription } from 'rxjs';
import { IOlympicServiceState } from '../../core/services/olympics.service.type';
import { IOlympicCountry } from '../../core/models/Olympic';
import { ResponsiveService } from '../../core/services/responsive.service';
import { responsiveDevices } from '../../core/services/responsive.service.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympicsSubscription?: Subscription;
  public responsiveSubscription?: Subscription;
  public responsiveDevices: responsiveDevices = null;
  public olympicsState?: IOlympicServiceState<IOlympicCountry[]> = {
    loading: true,
    data: undefined,
  };
  public countriesChartDatas?: IPieChartDatas[];
  public participationsNumber?: number;

  constructor(
    private olympicService: OlympicService,
    private responsiveService: ResponsiveService
  ) {}

  ngOnInit(): void {
    this.olympicsSubscription = this.olympicService
      .getOlympics()
      .subscribe((state) => {
        this.olympicsState = state;
        this.countriesChartDatas = state.data?.map(
          ({ country, participations, id }) => ({
            extra: { id: id },
            name: country,
            value: participations.reduce((acc, value) => {
              return acc + value.medalsCount;
            }, 0),
          })
        );
        this.participationsNumber = Math.max(
          ...(state.data?.map((country) => country.participations.length) ?? [
            0,
          ])
        );
      });
    this.responsiveSubscription = this.responsiveService
      .observeBreakPoints()
      .subscribe(() => {
        this.responsiveDevices = this.responsiveService.breakPointsChange();
      });
  }

  ngOnDestroy() {
    this.responsiveSubscription?.unsubscribe();
    this.olympicsSubscription?.unsubscribe();
  }
}
