# Gestión de Seguros - Frontend

Este proyecto es el frontend de la aplicación de gestión de seguros, desarrollado con Angular.

## Requisitos

* Node.js y npm (o yarn) instalados.

## Instalación

1. Clonar el repositorio:
   git clone https://github.com/RamRider89/zurich-test-front.git
   
2. Instalar las dependencias:
Bash
cd gestion-seguros-frontend
npm install

3. Desarrollo
Iniciar el servidor de desarrollo:
Bash

ng serve
Esto iniciará la aplicación en http://localhost:4200/.

Construir para producción
1. Ejecutar el siguiente comando:
Bash
ng build --configuration production
Esto generará los archivos de la aplicación en la carpeta dist/.

Estructura del proyecto

src/
├── app/
│   ├── cliente-list/
│   │   ├── cliente-list.component.css
│   │   ├── cliente-list.component.html
│   │   └── cliente-list.component.ts
│   ├── cliente-form/
│   │   ├── cliente-form.component.css
│   │   ├── cliente-form.component.html
│   │   └── cliente-form.component.ts
│   ├── cliente/
│   │   ├── cliente.component.css
│   │   ├── cliente.component.html
│   │   └── cliente.component.ts
│   ├── poliza-list/
│   │   ├── poliza-list.component.css
│   │   ├── poliza-list.component.html
│   │   └── poliza-list.component.ts
│   ├── poliza-form/
│   │   ├── poliza-form.component.css
│   │   ├── poliza-form.component.html
│   │   └── poliza-form.component.ts
│   ├── poliza/
│   │   ├── poliza.component.css
│   │   ├── poliza.component.html
│   │   └── poliza.component.ts
│   ├── dashboard/
│   │   ├── dashboard.component.css
│   │   ├── dashboard.component.html
│   │   └── dashboard.component.ts
│   ├── header/
│   │   ├── header.component.css
│   │   ├── header.component.html
│   │   └── header.component.ts
│   ├── login/
│   │   ├── login.component.css
│   │   ├── login.component.html
│   │   └── login.component.ts
│   ├── app.component.css
│   ├── app.component.html
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
├── main.ts
├── polyfills.ts
├── styles.css
└── ...

Tecnologías utilizadas
- Angular
- Angular Material
- RxJS
- TypeScript
- Moment.js

Autor
david.duarte@davdav.tech