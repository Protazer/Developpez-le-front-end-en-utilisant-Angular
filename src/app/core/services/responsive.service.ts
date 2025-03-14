import { Injectable } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { ResponsiveDevicesType } from './responsive.service.type';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  public breakPoint: string = '';

  /**
   * Dependencies injections.
   * @param responsiveObserver
   */
  constructor(private responsiveObserver: BreakpointObserver) {}

  /**
   * Observe current breakPoint.
   * @returns Observable<BreakpointState>
   */
  observeBreakPoints(): Observable<BreakpointState> {
    const { Web, Tablet, Handset } = Breakpoints;
    return this.responsiveObserver.observe([Web, Tablet, Handset]);
  }

  /**
   * Observe type of BreakpointObserver.
   * @returns "desktop" | "tablet" | "phone" | undefined.
   */
  breakPointsChange(): ResponsiveDevicesType {
    const { Web, Tablet, Handset } = Breakpoints;
    if (this.responsiveObserver.isMatched(Web)) {
      return (this.breakPoint = 'desktop');
    } else if (this.responsiveObserver.isMatched(Tablet)) {
      return (this.breakPoint = 'tablet');
    } else if (this.responsiveObserver.isMatched(Handset)) {
      return (this.breakPoint = 'phone');
    }
    return null;
  }
}
