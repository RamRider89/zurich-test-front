/**
 * Enviroment produccion
 * Produccion
 */

const apiHost = 'zurich-back.com';
const apiUrl = `http://${apiHost}/api`;

export const environment = {
  production: true,
  enableDebugTools: false,
  logLevel: 'debug',
  apiHost,
  apiUrl,
  endpoints: {
    Cliente : "cliente",
    Poliza : "poliza",
    PolizaType : "polizatype",
    Login : "login",
  }
};