import { ReadVarExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleados } from 'src/app/model/empleados';
import { Estados } from 'src/app/model/estados';
import { Puestos } from 'src/app/model/puestos';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { EstadosService } from 'src/app/services/estados.service';
import { PuestosService } from 'src/app/services/puestos.service';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {
  accion = "Nuevo";
  form: FormGroup;
  errores = "";
  puestos: Puestos[] = [];
  estados: Estados[] = [];
  private empleado: Empleados | null = null;
  /**
   *
   */
  constructor(
    private empleadosService: EmpleadosService,
    private puestosService: PuestosService,
    private estadosService: EstadosService,
    private router: Router,
    route: ActivatedRoute,
    builder: FormBuilder) {

    var id = parseInt(route.snapshot.paramMap.get("id") || "0");

    if(id > 0){
      this.accion = "Modificar";
      this.getEmpleado(id);
    }

    this.form = builder.group({
      id: [id], 
      fotografia: [""], 
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      puestoId: [''], 
      fechaNacimiento: [''],
      fechaContratacion: [''], 
      direccion: [''],
      telefono: [''],
      correoElectronico: ['', Validators.email],
      estadoId: [null], 
    });
    
  }
  
  private getEmpleado(id: any) {
    this.empleadosService.detalles(id)
    .subscribe({
      next: (data) => {
        this.form.patchValue(data);
        this.empleado = data as Empleados;
      },
      error: (e) => {
        this.errores = e.message;
      }
    });
  }

  ngOnInit(): void {
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

  onArchivoSeleccionado(evt: any) {
    const archivo = evt.target.files[0];
    if(archivo) {      
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.form.patchValue({
          fotografia: fileReader.result as string
        });
      }

      fileReader.readAsDataURL(archivo);
    }
  }

  guardar() {
    if(!this.form.valid)
      return;

    const e = this.form.value as Empleados;

    if(e.id == 0 ) {
      // agregando nuevo
      e.id = undefined;

      this.empleadosService.guardar(e)
      .subscribe({
        next: (data) => {
          this.router.navigate(["/buscar"])
        },
        error: (e) => {
          this.errores = e.message;
        }
      });
    } else {
      // modificando
      this.empleadosService.actualizar(e)
      .subscribe({
        next: (data) => {
          this.router.navigate(["/buscar"])
        },
        error: (e) => {
          this.errores = e.message;
        }
      });
    }
  }
}
