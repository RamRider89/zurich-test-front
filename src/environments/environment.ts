/**
 * Enviroment por default
 * Desarrollo
 */

const apiHost = 'localhost:8080';
const apiUrl = `http://${apiHost}/api`;

export const environment = {
  production: false,
  enableDebugTools: true,
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