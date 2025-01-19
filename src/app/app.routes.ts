import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';

export const routes: Routes = [
  { 
    path: '', 
    data: { title: 'home' },
    component: HomeComponent,
 },
 { 
  path: 'clientes', 
  data: { title: 'clientes' },
  component: ClienteListComponent,
},
{ 
  path: 'new-cliente', 
  data: { title: 'nuevo' },
  component: ClienteFormComponent,
}
];