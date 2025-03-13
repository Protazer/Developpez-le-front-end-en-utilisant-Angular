import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [NgIf, SharedModule],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public pathSubscription?: Subscription;
  public showBackLink: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.pathSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showBackLink = event.url.includes('/details/');
      }
    });
  }

  ngOnDestroy() {
    this.pathSubscription?.unsubscribe();
  }

  handleOnClickBack(): void {
    this.router.navigateByUrl('/');
  }
}
