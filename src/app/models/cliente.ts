/**
 * @model Cliente 
 * @description Interface de datos para tabla clientes
 */

export interface Cliente {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
  }