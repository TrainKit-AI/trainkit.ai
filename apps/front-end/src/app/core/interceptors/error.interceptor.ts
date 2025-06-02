import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

export function errorInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // On ne traite que les erreurs 400 (Bad Request)
      if (error.status === 400) {
        // On crée une réponse HTTP avec le même contenu que l'erreur
        return of(
          new HttpResponse({
            body: error.error,
            status: error.status,
            statusText: error.statusText,
          })
        );
      }
      // Pour les autres erreurs, on les laisse passer normalement
      throw error;
    })
  );
}
