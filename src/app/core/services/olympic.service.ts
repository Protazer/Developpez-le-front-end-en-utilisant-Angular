import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IOlympicServiceState } from './olympics.service.type';
import { IOlympicCountry } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<
    IOlympicServiceState<IOlympicCountry[]>
  >({
    data: undefined,
    loading: true,
  });

  constructor(private http: HttpClient) {}

  loadInitialData(): Observable<IOlympicCountry[]> {
    return this.http.get<IOlympicCountry[]>(this.olympicUrl).pipe(
      tap((value: IOlympicCountry[]) => {
        this.olympics$.next({ data: value, loading: false });
      }),
      catchError((error: Error, caught) => {
        this.olympics$.next({ data: undefined, loading: false });
        throw new Error('Oups il y a une erreur !');
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable().pipe(delay(1000));
  }

  getCountryById(
    id: number
  ): Observable<IOlympicServiceState<IOlympicCountry>> {
    return this.olympics$.asObservable().pipe(
      delay(1000),
      map(({ loading, data }) => ({
        loading,
        data: data?.find((country) => country?.id === id),
      }))
    );
  }
}
