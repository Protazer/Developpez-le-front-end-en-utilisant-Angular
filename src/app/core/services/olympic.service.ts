import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IOlympicCountry } from '../models/Olympic';
import { IPieChartDatas } from '../models/PieChart';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<IOlympicCountry[] | null | undefined>(
    undefined
  );

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<IOlympicCountry[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  getCountriesChartMedals(): Observable<IPieChartDatas[] | undefined> {
    return this.olympics$.pipe(
      map((countries) => {
        return countries?.map(({ country, participations, id }) => ({
          extra: { id: id },
          name: country,
          value: participations.reduce((acc, value) => {
            return acc + value.medalsCount;
          }, 0),
        }));
      })
    );
  }

  getCountryDetailsById(id: number) {
    return this.olympics$.pipe(
      map((countries) => {
        return countries
          ?.filter((country) => country?.id === id)
          .map((country) => ({
            name: country.country,
            series: country.participations.map((participation) => ({
              name: String(participation.year),
              value: participation.medalsCount,
            })),
          }));
      })
    );
  }
}
