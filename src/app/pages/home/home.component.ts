import { Component, OnDestroy, OnInit } from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { IPieChartDatas } from '../../core/models/PieChart';
import { Subscription } from 'rxjs';
import { IOlympicServiceState } from '../../core/services/olympics.service.type';
import { IOlympicCountry } from '../../core/models/Olympic';
import { ResponsiveService } from '../../core/services/responsive.service';
import { ResponsiveDevicesType } from '../../core/services/responsive.service.type';
import { IParticipation } from '../../core/models/Participation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympicsSubscription?: Subscription;
  public responsiveSubscription?: Subscription;
  public responsiveDevices: ResponsiveDevicesType = null;
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
      .subscribe((state: IOlympicServiceState<IOlympicCountry[]>) => {
        this.olympicsState = state;
        this.countriesChartDatas = state.data?.map(
          ({
            country,
            participations,
            id,
          }: IOlympicCountry): IPieChartDatas => ({
            extra: { id: id },
            name: country,
            value: participations.reduce(
              (acc: number, value: IParticipation): number => {
                return acc + value.medalsCount;
              },
              0
            ),
          })
        );
        this.participationsNumber = Math.max(
          ...(state.data?.map(
            (country: IOlympicCountry): number => country.participations.length
          ) ?? [0])
        );
      });
    this.responsiveSubscription = this.responsiveService
      .observeBreakPoints()
      .subscribe((): void => {
        this.responsiveDevices = this.responsiveService.breakPointsChange();
      });
  }

  ngOnDestroy(): void {
    this.responsiveSubscription?.unsubscribe();
    this.olympicsSubscription?.unsubscribe();
  }
}
