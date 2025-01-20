import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { PolizaListComponent } from './poliza-list/poliza-list.component';

import { PolizaFormComponent } from './poliza-form/poliza-form.component';

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
  path: 'polizas', 
  data: { title: 'polizas' },
  component: PolizaListComponent,
}
];