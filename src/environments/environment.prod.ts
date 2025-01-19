/**
 * Enviroment produccion
 * Produccion
 */

const apiHost = 'zurich-back.com';
const apiUrl = `http://${apiHost}/`;

export const environment = {
  production: true,
  enableDebugTools: false,
  logLevel: 'debug',
  apiHost,
  apiUrl,
  endpoints: {
    Cliente : "clientes",
    Poliza : "polizas",
    PolizaType : "polizatype",
    Login : "login",
  }
};