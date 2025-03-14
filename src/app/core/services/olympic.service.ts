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
  private olympicUrl: string = './assets/mock/olympic.json';
  private olympics$: BehaviorSubject<IOlympicServiceState<IOlympicCountry[]>> =
    new BehaviorSubject<IOlympicServiceState<IOlympicCountry[]>>({
      data: undefined,
      loading: true,
    });

  /**
   * Dependencies injection.
   * @param http
   */
  constructor(private http: HttpClient) {}

  /**
   * Initialize state's datas.
   */
  loadInitialData(): Observable<IOlympicCountry[]> {
    return this.http.get<IOlympicCountry[]>(this.olympicUrl).pipe(
      tap((value: IOlympicCountry[]): void => {
        this.olympics$.next({ data: value, loading: false });
      }),
      catchError((error: Error, caught: Observable<IOlympicCountry[]>) => {
        this.olympics$.next({ data: undefined, loading: false });
        throw new Error('Oups il y a une erreur !');
      })
    );
  }

  /**
   * Return state's data of type IOlympicCountry[] and loading status.
   */
  getOlympics(): Observable<IOlympicServiceState<IOlympicCountry[]>> {
    return this.olympics$.asObservable().pipe(delay(1000));
  }

  /**
   * Return  state's data for only one country of type IOlympicCountry || undefined and loading status.
   * @param id - Country id.
   */
  getCountryById(
    id: number
  ): Observable<IOlympicServiceState<IOlympicCountry>> {
    return this.olympics$.asObservable().pipe(
      delay(1000),
      map(
        ({
          loading,
          data,
        }: IOlympicServiceState<IOlympicCountry[]>): {
          loading: boolean;
          data?: IOlympicCountry;
        } => ({
          loading,
          data: data?.find(
            (country: IOlympicCountry): boolean => country?.id === id
          ),
        })
      )
    );
  }
}
