import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../auth/services/authentication.service';

@Injectable()
export class TokenExpirationInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const expiration = localStorage.getItem('jwtExpiration');
    const now = Date.now();

    if (expiration && parseInt(expiration, 10) < now) {
      this.authService.logout();
      localStorage.removeItem('jwtExpiration');
      localStorage.removeItem('jwtToken');
      return throwError(() => new Error('Session expired'));
    }

    return next.handle(req);
  }
}
