/**
 * @service ClienteService
 * @description Servicio para consumo de datos de los clientes
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '@models/cliente';
import { environment } from '@env/environment'; // Importa las variables de entorno

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = environment.apiUrl + environment.endpoints.Cliente;

  constructor(private http: HttpClient) { }

  getAllClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  getClienteById(id: number): Observable<Cliente> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Cliente>(url);
  }

  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  updateCliente(id: number, cliente: Cliente): Observable<Cliente> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Cliente>(url, cliente);
  }

  deleteCliente(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}