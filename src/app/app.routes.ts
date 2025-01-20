import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { PolizaListComponent } from './poliza-list/poliza-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { 
    path: '', 
    data: { title: 'home' },
    component: HomeComponent,
 },
 { 
  path: 'clientes', 
  data: { title: 'clientes', role: 'admin'},
  component: ClienteListComponent,
  canActivate: [AuthGuard]
},
{ 
  path: 'polizas', 
  data: { title: 'polizas', role: 'admin'},
  component: PolizaListComponent,
  canActivate: [AuthGuard]
},
{ 
  path: 'dashboard', 
  data: { title: 'dashboard', role: 'cliente'},
  component: DashboardComponent,
  canActivate: [AuthGuard]
},
{ 
  path: 'login', 
  data: { title: 'login' },
  component: LoginComponent,
},

];