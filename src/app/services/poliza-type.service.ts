/**
 * @service PolizaTypeService
 * @description Servicio para consumo de datos de los tipos de polizas
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PolizaType } from '@models/poliza-type';
import { environment } from '@env/environment'; // Importa las variables de entorno

@Injectable({
  providedIn: 'root'
})
export class PolizaTypeService {

  private apiUrl = environment.apiUrl + environment.endpoints.PolizaType;

  constructor(private http: HttpClient) { } // Inyecta HttpClient

  getAllPolizaTypes(): Observable<PolizaType[]> {
    return this.http.get<PolizaType[]>(this.apiUrl); // Obtiene todos los tipos de pólizas
  }

  // Puedes agregar otros métodos según tus necesidades, como getPolizaTypeById
}