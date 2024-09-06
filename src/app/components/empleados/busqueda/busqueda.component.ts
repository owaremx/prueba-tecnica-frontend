import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Empleados } from 'src/app/model/empleados';
import { Estados } from 'src/app/model/estados';
import { Puestos } from 'src/app/model/puestos';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { EstadosService } from 'src/app/services/estados.service';
import { PuestosService } from 'src/app/services/puestos.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  empleados: Empleados[] = [];
  puestos: Puestos[] = [];
  estados: Estados[] = [];
  form: FormGroup;
  errores = "";
  /**
   *
   */
  constructor(
    private empleadosService: EmpleadosService,
    private puestosService: PuestosService,
    private estadosService: EstadosService,
    builder: FormBuilder
  ) {
    this.form = builder.group({
      nombre: [""],
      apellido: [""],
      correoElectronico: [""],
      estadoId: [""],
      puestoId: [""],
      fechaContratacion: [""]
    });
  }

  ngOnInit(): void {
    this.procesarBusqueda(
      this.empleadosService.buscar({})
    );

    this.puestosService.lista()
    .subscribe({
      next: (data) => {
        this.puestos = data;
      }
    });

    this.estadosService.lista()
    .subscribe({
      next: (data) => {
        this.estados = data;
      }
    });
  }

  buscar() {
    this.errores = "";
    var parametros = this.form.value as Empleados;
    this.procesarBusqueda(
      this.empleadosService.buscar(parametros)
    );
    
  }

  private procesarBusqueda(o: Observable<Empleados[]>) {
    o.subscribe({
      next: (data) => {
        this.empleados = data;
      },
      error: (e) => {
        this.errores = e.message;
      }
    });
  }

  eliminar(e: Empleados) {
    this.errores = "";
    this.empleadosService.eliminar(e)
    .subscribe({
      next: (data) => {
        this.empleados.splice(this.empleados.indexOf(e, 1));
      },
      error: (e) => {
        this.errores = e.message;
      }
    })
  }
}
