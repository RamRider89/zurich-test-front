/**
 * Login basico
 * Zurich
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean; // Indica si el usuario está autenticado
  userRole: string; // Almacena el rol del usuario ('admin' o 'cliente')

  constructor() { 
    this.isLoggedIn = false;
    this.userRole = '';
  }

  login(username: string, password: string): boolean {
    // simulacion de login
    if (username === 'admin' && password === 'admin') {
      this.isLoggedIn = true;
      this.userRole = 'admin';
      return true;
    } else if (username === 'cliente' && password === 'cliente') {
      this.isLoggedIn = true;
      this.userRole = 'cliente';
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    this.isLoggedIn = false;
    this.userRole = '';
  }

  isAdmin(): boolean {
    return this.userRole === 'admin';
  }

  isCliente(): boolean {
    return this.userRole === 'cliente';
  }
}