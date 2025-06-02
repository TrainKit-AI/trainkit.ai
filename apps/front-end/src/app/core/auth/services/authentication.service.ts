import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';
import { getEndpoints } from '../../constants/endpoints.constants';
import { MessageResponse } from '../types/message-response.type';
import { User } from '../user.model';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly endpoints = getEndpoints();
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  public isAuthenticated = this.currentUser$.pipe(map((user) => !!user));

  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    private router: Router
  ) {
    const token = this.jwtService.getToken();
    if (token) {
      this.loadCurrentUser().subscribe({
        next: () => {
          this.router.navigate(['/dashboard'], { replaceUrl: true });
        },
        error: () => {
          this.logout();
        },
      });
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(this.endpoints.auth.login, { email, password })
      .pipe(
        tap((response) => {
          if (response.token) {
            this.jwtService.saveTokenWithExpiration(
              response.token,
              response.expiresIn
            );
            this.loadCurrentUser().subscribe();
          }
        })
      );
  }

  register(email: string, password: string, username: string): Observable<any> {
    return this.http
      .post<void>(this.endpoints.auth.signup, {
        email,
        password,
        username,
      })
      .pipe(
        map(() => ({ error: null })),
        catchError((error: HttpErrorResponse) => {
          return of({
            error: error.error?.message,
          });
        })
      );
  }

  verifyEmail(email: string, verificationCode: string): Observable<any> {
    return this.http
      .post<MessageResponse>(this.endpoints.auth.verify, {
        email,
        verificationCode,
      })
      .pipe(
        map((response: MessageResponse) => {
          if (response.status === 'error') {
            return {
              error: response.message,
              message: null,
            };
          }
          return {
            message: response.message,
            error: null,
          };
        }),
        catchError((error: HttpErrorResponse) => {
          return of({
            error: error.error?.message,
            message: null,
          });
        })
      );
  }

  resendVerificationCode(email: string): Observable<any> {
    return this.http
      .post<MessageResponse>(this.endpoints.auth.resendVerification, email)
      .pipe(
        map((response: MessageResponse) => {
          if (response.status === 'error') {
            return {
              error: response.message,
              message: null,
            };
          }
          return {
            message: response.message,
            error: null,
          };
        }),
        catchError((error: HttpErrorResponse) => {
          return of({
            error: error.error?.message,
            message: null,
          });
        })
      );
  }

  logout(): void {
    this.jwtService.destroyToken();
    this.currentUserSubject.next(null);
    this.router.navigate(['/signin'], { replaceUrl: true });
  }

  getUser(): Observable<User | null> {
    return this.currentUser$;
  }

  private loadCurrentUser(): Observable<User> {
    const token = this.jwtService.getToken();
    if (!token) {
      return throwError(() => new Error('No token available'));
    }

    return this.http.get<User>(this.endpoints.users.me).pipe(
      tap((user) => {
        this.currentUserSubject.next(user);
      }),
      catchError((error: HttpErrorResponse) => {
        this.currentUserSubject.next(null);
        throw error;
      })
    );
  }

  getToken(): string | null {
    return this.jwtService.getToken();
  }

  forgotPassword(email: string): Observable<any> {
    return this.http
      .post<MessageResponse>(this.endpoints.auth.forgotPassword, email)
      .pipe(
        map((response: MessageResponse) => ({
          message: response.message,
          error: response.status === 'error' ? response.message : null,
        })),
        catchError((error: HttpErrorResponse) => {
          return of({
            error: error.error?.message,
          });
        })
      );
  }

  resetPassword(data: {
    token: string;
    newPassword: string;
    confirmPassword: string;
  }): Observable<any> {
    return this.http
      .post<MessageResponse>(this.endpoints.auth.resetPassword, {
        token: data.token,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      })
      .pipe(
        map((response: MessageResponse) => {
          if (response.status === 'error') {
            return {
              error: response.message,
              message: null,
            };
          }
          return {
            message: response.message,
            error: null,
          };
        }),
        catchError((error: HttpErrorResponse) => {
          return of({
            error: error.error?.message,
            message: null,
          });
        })
      );
  }
}
