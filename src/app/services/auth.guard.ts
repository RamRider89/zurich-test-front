import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HeaderComponent } from '@app/header/header.component';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private header: HeaderComponent
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        
    if (this.authService.isLoggedIn) {
      // Verificar si el usuario tiene el rol necesario para acceder a la ruta
      const requiredRole = route.data['role'];
      if (!requiredRole || this.authService.userRole === requiredRole) {       
        return true;
      }
    }

    // Redirigir al login si el usuario no está autenticado o no tiene el rol necesario
    this.router.navigate(['/login']);
    return false;
  }  
}