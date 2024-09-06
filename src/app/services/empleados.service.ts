import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { Empleados } from 'src/app/model/empleados';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  apiUrl = "https://localhost:7027/api/";
  constructor(private http: HttpClient) { 

  }

  buscar(parametros: Empleados): Observable<Empleados[]> {
    return this.http.get<Empleados[]>(this.apiUrl + "empleados/buscar", {
      params: {
        nombre: parametros.nombre || "",
        apellido: parametros.apellido || "",
        correoElectronico: parametros.correoElectronico || "",
        estadoId: parametros.estadoId || 0,
        puestoId: parametros.puestoId || 0,
        fechaContratacion: parametros.fechaContratacion || ""
      }
    });
  }

  guardar(empleado: Empleados) {
    return this.http.post<Empleados>(this.apiUrl + "empleados/guardar", empleado);
  }

  actualizar(empleado: Empleados) {
    return this.http.put<Empleados>(this.apiUrl + "empleados/actualizar", empleado);
  }

  eliminar(e: Empleados) {
    return this.http.delete<Empleados>(this.apiUrl + "empleados/eliminar", {
      params: {
        id: e.id || 0
      }
    });
  }

  detalles(id: number): Observable<Empleados> {
    return this.http.get<Empleados>(this.apiUrl + "empleados/detalles", {
      params: {
        id
      }
    }).pipe(
      map((data) => {
        next: {
          data.fechaContratacion = data.fechaContratacion?.substring(0,10);
          data.fechaNacimiento = data.fechaNacimiento?.substring(0,10);

          return data;
        }
      })
    );
  }
}
