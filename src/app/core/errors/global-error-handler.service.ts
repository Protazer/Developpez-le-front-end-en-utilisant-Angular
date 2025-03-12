import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private router: Router) {}

  handleError(error: Error) {
    this.router.navigateByUrl('/error');
    console.error(error.message);
  }
}
