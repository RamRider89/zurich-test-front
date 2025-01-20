/**
 * Enviroment por default
 * Desarrollo
 */

const apiHost = 'ec2-18-191-210-67.us-east-2.compute.amazonaws.com:8080';
const apiUrl = `http://${apiHost}/`;

export const environment = {
  production: false,
  enableDebugTools: true,
  logLevel: 'debug',
  apiHost,
  apiUrl,
  endpoints: {
    Cliente : "clientes",
    Poliza : "polizas",
    PolizaFiltrar : "polizas/filtrar",
    PolizaByCliente : "polizas/cliente",
    PolizaType : "poliza-types",
    Login : "login",
  }
};
