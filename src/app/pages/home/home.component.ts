import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { IOlympicCountry } from '../../core/models/Olympic';
import { IPieChartDatas } from '../../core/models/PieChart';
import { ILineChartDatas } from '../../core/models/LineChart';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<IOlympicCountry[] | null | undefined> = of(null);
  public countryMedals$?: Observable<IPieChartDatas[] | undefined>;
  public countryParticipation$?: Observable<ILineChartDatas[] | undefined>;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.countryMedals$ = this.olympicService.getCountryMedals();
    this.countryParticipation$ = this.olympicService.getCountryDetailsById(2);
  }
}
