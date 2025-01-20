import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'zurich-test-front';

  constructor(private router: Router) {}

  goRuta(link: string) {
    this.router.navigate([link]);
  }

}
