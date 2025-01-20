/**
 * @model Poliza 
 * @description Interface de datos para tabla polizas
 */

import { Cliente } from './cliente'; // Importa la interfaz Cliente

export interface Poliza {
  id: number;
  clienteId: number | null;
  cliente: Cliente;
  typePoliza: number;
  tipoPolizaName: string | null; // opcional
  dateStart: Date | string;
  dateExpiration: Date | string;
  monto: number;
  status: boolean | number;
  statusName: string | null; // opcional
}