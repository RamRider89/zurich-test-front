/**
 * Enviroment por default
 * Desarrollo
 */

const apiHost = 'localhost:8080';
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
    PolizaByCliente : "polizas/clientes",
    PolizaType : "poliza-types",
    Login : "login",
  }
};