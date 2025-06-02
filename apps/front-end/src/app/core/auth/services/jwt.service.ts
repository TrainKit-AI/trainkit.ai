import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class JwtService {
  private readonly TOKEN_KEY = 'jwtToken';
  private readonly EXPIRATION_KEY = 'jwtExpiration';

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  saveTokenWithExpiration(token: string, expiresInMs: number): void {
    this.saveToken(token);
    const expirationTimestamp = Date.now() + expiresInMs;
    localStorage.setItem(this.EXPIRATION_KEY, expirationTimestamp.toString());
  }

  getExpiration(): number | null {
    const exp = localStorage.getItem(this.EXPIRATION_KEY);
    return exp ? parseInt(exp, 10) : null;
  }

  isTokenExpired(): boolean {
    const expiration = this.getExpiration();
    return expiration !== null && Date.now() > expiration;
  }

  destroyToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.EXPIRATION_KEY);
  }
}
