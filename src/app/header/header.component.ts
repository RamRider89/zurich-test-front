import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'; // Importa el Router
// Mat
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule]
})
export class HeaderComponent {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {}

  mostrarMenu(): boolean {
    return this.authService.isLoggedIn;
  }

  // mostrar/ocultar items del menú según el rol
  mostrarClientes(): boolean {
    return this.authService.isAdmin();
  }

  mostrarPolizas(): boolean {
    return this.authService.isAdmin();
  }

  mostrarDashboard(): boolean {
    return this.authService.isCliente();
  }

  mostrarCerrarSesion(): boolean {
    return this.authService.isLoggedIn;
  }

  tipoUsuario(): string {
    return (this.authService.isAdmin()) ? 'Administrador' : 'Cliente';
  }


  goHome() {
    this.router.navigate(['/']);
  }

  goDash() {
    this.router.navigate(['/dashboard']);
  }

  goClientes() {
    this.router.navigate(['/clientes']);
  }

  goPolizas() {
    this.router.navigate(['/polizas']);
  }

  goLogin() {
    this.router.navigate(['/login']);
  }
 }