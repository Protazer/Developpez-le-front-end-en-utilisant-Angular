import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { IPieChartDatas } from '../../core/models/PieChart';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public countryMedals$?: Observable<IPieChartDatas[] | undefined>;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.countryMedals$ = this.olympicService.getCountriesChartMedals();
  }
}
