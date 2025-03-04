# Taskmina 📋✨

## Descripción del Proyecto
Taskmina es una aplicación de gestión de tareas diseñada con una arquitectura de microservicios y un frontend moderno en React. Su objetivo es proporcionar una experiencia eficiente y ágil para la administración de tareas, integrando autenticación segura y un backend escalable.

## Estructura del Proyecto
El repositorio está organizado en las siguientes carpetas principales:

```
/taskmina
├── taskmina/             # Aplicación React
├── auth/   # Microservicio de autenticación
└── taskmina-back/ # Microservicio de gestión de tareas
```

## Requisitos Previos
Asegúrate de tener instalados los siguientes requisitos antes de iniciar el proyecto:

- **Node.js** (v18 o superior)
- **npm** (v9 o superior)
- **nodemon** 

## Instalación y Configuración

### 1. Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/taskmina.git
cd taskmina
```

### 2. Instalación de Dependencias
#### taskmina
```bash
cd taskmina
npm install
npm run dev
```
Accede a: [http://localhost:3000](http://localhost:3000)

#### Microservicio de Autenticación
```bash
cd ../auth
npm install
npm run dev
```
Accede a: [http://localhost:5173](http://localhost:5173)

#### Microservicio de Gestión de Tareas
```bash
cd ../taskmina-back
npm install
npm run dev
```
Accede a: [http://localhost:8090](http://localhost:8090)

## Tecnologías Utilizadas

### **Frontend**
- React
- React Router
- Axios

### **Backend**
- Node.js
- Express.js
- MongoDB

### **Autenticación**
- JWT (JSON Web Tokens)
- bcrypt


## Licencia
Este proyecto está bajo la licencia [MIT](LICENSE).

---
**Hecho con ❤️ por Josibell Guerrero**





Hecho con ❤️ por Josibell Guerrero
