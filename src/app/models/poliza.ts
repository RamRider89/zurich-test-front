/**
 * @model Poliza 
 * @description Interface de datos para tabla polizas
 */

import { Cliente } from './cliente'; // Importa la interfaz Cliente

export interface Poliza {
  id: number;
  cliente: Cliente;  // Objeto Cliente asociado a la póliza
  typePoliza: number;
  dateStart: string; // Puedes usar Date si lo prefieres
  dateExpiration: string; // Puedes usar Date si lo prefieres
  monto: number;
  status: boolean;
}