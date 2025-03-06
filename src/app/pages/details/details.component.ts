import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ILineChartDatas } from '../../core/models/LineChart';
import { OlympicService } from '../../core/services/olympic.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  public countryParticipation$?: Observable<ILineChartDatas[] | undefined>;

  constructor(private olympicService: OlympicService) {}

  ngOnInit() {
    this.countryParticipation$ = this.olympicService.getCountryDetailsById(2);
  }
}
