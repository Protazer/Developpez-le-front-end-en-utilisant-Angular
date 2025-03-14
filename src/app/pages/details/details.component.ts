import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ILineChartDatas } from '../../core/models/LineChart';
import { OlympicService } from '../../core/services/olympic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponsiveService } from '../../core/services/responsive.service';
import { ResponsiveDevicesType } from '../../core/services/responsive.service.type';
import { IOlympicServiceState } from '../../core/services/olympics.service.type';
import { IOlympicCountry } from '../../core/models/Olympic';
import { IParticipation } from '../../core/models/Participation';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit, OnDestroy {
  public countrySubscription?: Subscription;
  public responsiveSubscription?: Subscription;
  public responsiveDevices: ResponsiveDevicesType = null;
  public loading: boolean = true;
  public countryEntries?: number;
  public countryMedals?: number;
  public countryAtheletes?: number;
  public countryName?: string;
  public countryParticipation?: ILineChartDatas[];

  constructor(
    private olympicService: OlympicService,
    private router: Router,
    private route: ActivatedRoute,
    private responsiveService: ResponsiveService
  ) {}

  ngOnInit() {
    const countryId: number = Number(this.route.snapshot.params['id']);
    this.countrySubscription = this.olympicService
      .getCountryById(countryId)
      .subscribe(
        ({ data, loading }: IOlympicServiceState<IOlympicCountry>): void => {
          if (!data) {
            this.router.navigateByUrl('**');
          } else {
            this.loading = loading;
            this.countryName = data.country;
            this.countryEntries = data.participations.length;
            this.countryMedals = data.participations
              .map(
                (participation: IParticipation): number =>
                  participation.medalsCount
              )
              .reduce((acc: number, current: number): number => {
                return acc + current;
              }, 0);

            this.countryAtheletes = data.participations
              .map(
                (participation: IParticipation): number =>
                  participation.athleteCount
              )
              .reduce((acc: number, current: number): number => {
                return acc + current;
              }, 0);
            this.countryParticipation = [
              {
                name: data.country,
                series: data.participations.map(
                  (
                    participation: IParticipation
                  ): { name: string; value: number } => ({
                    name: String(participation.year),
                    value: participation.medalsCount,
                  })
                ),
              },
            ];
          }
        }
      );
    this.responsiveSubscription = this.responsiveService
      .observeBreakPoints()
      .subscribe((): void => {
        this.responsiveDevices = this.responsiveService.breakPointsChange();
      });
  }

  ngOnDestroy(): void {
    this.countrySubscription?.unsubscribe();
    this.responsiveSubscription?.unsubscribe();
  }
}
