import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estados } from '../model/estados';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {
  apiUrl = "https://localhost:7027/api/";

  constructor(private http: HttpClient) { 

  }

  lista(): Observable<Estados[]> {
    return this.http.get<Estados[]>(this.apiUrl + "estados/lista");
  }
}
