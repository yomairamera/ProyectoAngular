import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './auto/clientes/clientes.component';
import { HomeComponent } from './auto/home/home.component';
import { ListaAutosDetalleComponent } from './auto/lista-autos-detalle/lista-autos-detalle.component';
import { ListaAutosComponent } from './auto/lista-autos/lista-autos.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'lista-autos',
    component: ListaAutosComponent
  },
  {
    path: 'lista-autos/:codigo',
    component: ListaAutosDetalleComponent
  },
  {
    path: 'clientes',
    component: ClientesComponent
  },
  {
    path:'',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
