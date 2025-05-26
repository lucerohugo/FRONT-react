# 📝 Práctico Integrador: App Fullstack React + Node.js

## Descripción

Aplicación fullstack en JavaScript con **React** en el frontend y **Express** en el backend que permite realizar CRUD completos de:

- Productos  
- Usuarios (personas)

El frontend consume los endpoints del backend usando **axios** y permite crear, listar, editar y eliminar productos y usuarios. Además, incluye funcionalidad para exportar listados en PDF usando **jspdf**.

El diseño usa **PrimeReact** para una interfaz clara y agradable.

---

## Tecnologías y librerías principales

- React (con Vite)  
- Express  
- Axios  
- fs para persistencia en JSON (`productos.json` y `usuarios.json`)  
- PrimeReact + PrimeIcons  
- React Router DOM  
- jspdf + jspdf-autotable  

---

## Instalación y ejecución

### Backend

```bash
cd backend
npm install
npm run dev

---
Pasos para configurar y usar:
Asegúrate de tener instalado nodemon como dependencia de desarrollo. Si no lo tienes, instálalo con:

npm install --save-dev nodemon

En tu package.json dentro del backend, agrega o modifica el script "dev" como arriba.

Ahora puedes arrancar el backend en modo desarrollo con:
npm run dev




Frontend
Comandos usados para crear y preparar el frontend:
npm create vite@latest fronted_react_y_node --template react
cd fronted_react_y_node
npm install
npm install axios
npm install axios jspdf jspdf-autotable
npm install primereact primeicons
npm install react-router-dom

Para correr la app frontend:
npm run dev


Uso
CRUD completo para productos y usuarios

Exportación de listados en PDF

Navegación entre secciones con React Router

Interfaz estilizada con PrimeReact


Desarrollado y diseñado por 💻 **Hugo Lucero**.
