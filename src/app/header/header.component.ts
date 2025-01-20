import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router'; // Importa el Router

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule]
})
export class HeaderComponent {


  constructor(private router: Router) {}

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