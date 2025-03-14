import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandlerService implements ErrorHandler {
  // Injection de router dans le service.
  constructor(private router: Router) {}

  /**
   * Redirect to 'error' page.
   * @param error - ErrorHandler catched error.
   */
  handleError(error: Error): void {
    this.router.navigateByUrl('/error');
    console.error(error.message);
  }
}
