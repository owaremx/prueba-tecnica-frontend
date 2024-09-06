import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusquedaComponent } from './components/empleados/busqueda/busqueda.component';
import { NuevoComponent } from './components/empleados/nuevo/nuevo.component';

const rutas: Routes = [
  {path: "buscar", component: BusquedaComponent},
  {path: "nuevo", component: NuevoComponent},
  {path: "modificar/:id", component: NuevoComponent},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(rutas),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
