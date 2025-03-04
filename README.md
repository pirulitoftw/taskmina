Taskmina 📋✨
Descripción del Proyecto
Taskmina es una aplicación de gestión de tareas construida con una arquitectura de microservicios y frontend en React. El proyecto está diseñado para proporcionar una experiencia de administración de tareas eficiente y moderna.
Estructura del Proyecto
El repositorio está organizado en tres carpetas principales:

frontend/: Aplicación React
microservicio-auth/: Microservicio de autenticación
microservicio-tareas/: Microservicio de gestión de tareas

Requisitos Previos

Node.js (v18 o superior)
npm (v9 o superior)

Instalación y Configuración
Clonar el Repositorio
bashCopygit clone https://github.com/tu-usuario/taskmina.git
cd taskmina
npm install
npm run dev
npm install nodemon -g

# Microservicio de Autenticación
cd ../auth
npm install
npm run dev

# Microservicio de Tareas
cd ../taskmina-back
npm install
npm run dev

Frontend: http://localhost:3000
Microservicio de Autenticación: http://localhost:5173/
Microservicio de Tareas: http://localhost:8090

Tecnologías Utilizadas

Frontend:

React
React Router
Axios


Backend:

Node.js
Express.js
MongoDB


Autenticación:

JWT (JSON Web Tokens)
bcrypt





Hecho con ❤️ por Josibell Guerrero