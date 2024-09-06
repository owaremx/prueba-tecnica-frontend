import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Puestos } from '../model/puestos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuestosService {
  apiUrl = "https://localhost:7027/api/";

  constructor(private http: HttpClient) { 

  }

  lista(): Observable<Puestos[]> {
    return this.http.get<Puestos[]>(this.apiUrl + "puestos/lista");
  }
}
