/**
 * @service PolizaService
 * @description Servicio para consumo de datos de las polizas
 */


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Poliza } from '@models/poliza';
import { environment } from '@env/environment'; // Importa las variables de entorno

@Injectable({
  providedIn: 'root'
})
export class PolizaService {

  private apiUrl = environment.apiUrl + environment.endpoints.Poliza;

  constructor(private http: HttpClient) { } // Inyecta HttpClient

  getAllPolizas(): Observable<Poliza[]> {
    return this.http.get<Poliza[]>(this.apiUrl); // Obtiene todas las pólizas
  }

  getPolizaById(id: number): Observable<Poliza> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Poliza>(url); // Obtiene una póliza por ID
  }

  createPoliza(poliza: Poliza): Observable<Poliza> {
    return this.http.post<Poliza>(this.apiUrl, poliza); // Crea una nueva póliza
  }

  updatePoliza(id: number, poliza: Poliza): Observable<Poliza> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Poliza>(url, poliza); // Actualiza una póliza
  }

  deletePoliza(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url); // Elimina una póliza
  }
}