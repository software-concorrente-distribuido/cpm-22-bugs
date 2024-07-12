import { Injectable, inject } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Observable, catchError } from "rxjs";
import { Optional } from "../utils/optional";
import { AuthenticationService } from "../services/authentication.service";
import { SnackbarService } from "../../shared/components/snackbar/snackbar.service";

const TOKEN_KEY: string = 'accessToken';

const UNHANDLED_ERROR: number = 0;

export const etheroomInterceptor: HttpInterceptorFn = (req, next) => {
    const authReq = Optional.ofNullable(localStorage.getItem(TOKEN_KEY))
        .filter(() => isMainAPI(req.url))
        .map(token => req.clone({ 
                headers: req.headers.set('Authorization', `Bearer ${token}`) 
        }))
        .orElse(req.clone());
    return next(authReq).pipe(
        catchError(errorHandler)
    );
}

const errorHandler = (error: HttpErrorResponse): Observable<never> => {
    if (error.status === UNHANDLED_ERROR && isMainAPI(error.url)) {
        inject(AuthenticationService).logout();
        inject(SnackbarService).info('Sua sessão expirou, faça login novamente.');
    }
    throw error;
}

const isMainAPI = (url: string): boolean => {
    return url.includes('localhost') || url.includes('etheroom');
}