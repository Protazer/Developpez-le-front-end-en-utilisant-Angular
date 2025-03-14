import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ILineChartDatas } from '../../core/models/LineChart';
import { OlympicService } from '../../core/services/olympic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponsiveService } from '../../core/services/responsive.service';
import { responsiveDevices } from '../../core/services/responsive.service.type';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit, OnDestroy {
  public countrySubscription?: Subscription;
  public responsiveSubscription?: Subscription;
  public responsiveDevices: responsiveDevices = null;
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
      .subscribe(({ data, loading }) => {
        if (!data) {
          this.router.navigateByUrl('**');
        } else {
          this.loading = loading;
          this.countryName = data.country;
          this.countryEntries = data.participations.length;
          this.countryMedals = data.participations
            .map((participation) => participation.medalsCount)
            .reduce((acc, current) => {
              return acc + current;
            }, 0);

          this.countryAtheletes = data.participations
            .map((participation) => participation.athleteCount)
            .reduce((acc, current) => {
              return acc + current;
            }, 0);
          this.countryParticipation = [
            {
              name: data.country,
              series: data.participations.map((participation) => ({
                name: String(participation.year),
                value: participation.medalsCount,
              })),
            },
          ];
        }
      });
    this.responsiveSubscription = this.responsiveService
      .observeBreakPoints()
      .subscribe(() => {
        this.responsiveDevices = this.responsiveService.breakPointsChange();
      });
  }

  ngOnDestroy() {
    this.countrySubscription?.unsubscribe();
    this.responsiveSubscription?.unsubscribe();
  }
}
