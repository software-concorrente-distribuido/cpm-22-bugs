import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
import { Functions } from "../utils/functions";

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    const authService = inject(AuthenticationService);
    const isAuthenticated = authService.verifyAuthentication();
    Functions.acceptFalse(
        isAuthenticated,
        () => authService.logout()
    );
    return isAuthenticated;
}