# Práctico Integrador: App Fullstack React + Node.js

## Descripción

Aplicación **fullstack** desarrollada en **JavaScript**, con:

- **Frontend:** React (Vite)
- **Backend:** Express (Node.js)

Permite realizar **CRUD completos** de:

- **Productos**
- **Usuarios**

El frontend consume los endpoints del backend utilizando **Axios** y permite:

- Crear, listar, editar y eliminar productos y usuarios
- Exportar listados en **PDF** mediante `jspdf` y `jspdf-autotable`

Diseño minimalista y moderno con **PrimeReact**.

---

## Tecnologías y Librerías Principales

- React (con Vite)
- Express (Node.js)
- Axios
- fs (para persistencia en archivos JSON: `productos.json` y `usuarios.json`)
- PrimeReact + PrimeIcons
- React Router DOM
- jspdf + jspdf-autotable

---

## Instalación y Ejecución

###  Backend

```bash
cd backend
npm install
npm run dev
```

>  Asegúrate de tener instalado `nodemon` en tu backend:

```bash
npm install --save-dev nodemon
```

En tu `package.json`, agrega o modifica el script `"dev"`:

```json
"scripts": {
  "dev": "nodemon index.js"
}
```

Ahora si inicia el backend en modo desarrollo con:

```bash
npm run dev
```

---

### Frontend

#### Comandos para crear y configurar:

```bash
npm create vite@latest fronted_react_y_node --template react
npm install
npm install axios
npm install axios jspdf jspdf-autotable
npm install primereact primeicons
npm install react-router-dom
```

#### Para correr el frontend:

```bash
npm run dev
```

---

## Funcionalidades

- CRUD completo para **productos** y **usuarios**
- Exportación de listados en **PDF**
- Navegación entre secciones con **React Router**
- Interfaz estilizada con **PrimeReact**

---

## Desarrollado y Diseñado por

**Hugo Lucero** 
