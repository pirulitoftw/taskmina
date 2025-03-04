# Task Management Microservice

Este microservicio se encarga de la gestión de tareas para una aplicación. La autenticación de usuarios está delegada a otro microservicio.

## Estructura del Proyecto

```
index.js
package.json
postman_collection.json
README.md
api/
    routes.js
    constants/
        index.js
        templateEmail.js
    controllers/
        index.js
        TaskController.js
        UserController.js
    middlewares/
        authMiddleware.js
        authorizationMiddleware.js
        errorHandler.js
    models/
        index.js
        Task.js
        User.js
    services/
        index.js
        mailService.js
        TaskService.js
    validators/
        taskValidator.js
config/
    bootstrap.js
    routes.js
    transport.js
```

## Endpoints

### Crear una tarea

- **Endpoint**: `POST /api/v1/tasks`
- **Descripción**: Crea una nueva tarea para el usuario autenticado.
- **Cuerpo de la solicitud**:
  ```json
  {
    "title": "Título de la tarea",
    "description": "Descripción de la tarea",
    "dueDate": "2025-05-15",
    "priority": "high"
  }
  ```
- **Respuesta esperada**:
  ```json
  {
    "success": true,
    "data": {
      "id": "task_id",
      "title": "Título de la tarea",
      "description": "Descripción de la tarea",
      "completed": false,
      "dueDate": "2025-05-15",
      "priority": "high",
      "userId": "user_id",
      "createdAt": "2025-05-01T00:00:00.000Z",
      "updatedAt": "2025-05-01T00:00:00.000Z"
    }
  }
  ```

### Actualizar una tarea

- **Endpoint**: `PUT /api/v1/tasks/:id`
- **Descripción**: Actualiza una tarea existente del usuario autenticado.
- **Cuerpo de la solicitud**:
  ```json
  {
    "title": "Nuevo título de la tarea",
    "description": "Nueva descripción de la tarea",
    "completed": true,
    "dueDate": "2025-05-20",
    "priority": "medium"
  }
  ```
- **Respuesta esperada**:
  ```json
  {
    "success": true,
    "data": {
      "id": "task_id",
      "title": "Nuevo título de la tarea",
      "description": "Nueva descripción de la tarea",
      "completed": true,
      "dueDate": "2025-05-20",
      "priority": "medium",
      "userId": "user_id",
      "createdAt": "2025-05-01T00:00:00.000Z",
      "updatedAt": "2025-05-01T00:00:00.000Z"
    }
  }
  ```

### Eliminar una tarea

- **Endpoint**: `DELETE /api/v1/tasks/:id`
- **Descripción**: Elimina una tarea del usuario autenticado.
- **Respuesta esperada**:
  ```json
  {
    "success": true,
    "message": "Tarea eliminada correctamente"
  }
  ```

### Obtener todas las tareas

- **Endpoint**: `GET /api/v1/tasks`
- **Descripción**: Devuelve una lista de todas las tareas del usuario autenticado.

### Obtener una tarea específica

- **Endpoint**: `GET /api/v1/tasks/:id`
- **Descripción**: Devuelve los detalles de una tarea específica del usuario autenticado.

### Marcar una tarea como completada

- **Endpoint**: `PATCH /api/v1/tasks/:id/complete`
- **Descripción**: Marca una tarea específica como completada.

### Marcar una tarea como no completada

- **Endpoint**: `PATCH /api/v1/tasks/:id/incomplete`
- **Descripción**: Marca una tarea específica como no completada.

### Obtener tareas por prioridad

- **Endpoint**: `GET /api/v1/tasks/priority/:priority`
- **Descripción**: Devuelve una lista de tareas del usuario autenticado filtradas por prioridad.

### Obtener tareas por fecha de vencimiento

- **Endpoint**: `GET /api/v1/tasks/due/:date`
- **Descripción**: Devuelve una lista de tareas del usuario autenticado que vencen en una fecha específica.

## Middlewares

### Autenticación

- **Archivo**: `api/middlewares/authMiddleware.js`
- **Descripción**: Verifica que el usuario esté autenticado mediante un token JWT.

### Autorización

- **Archivo**: `api/middlewares/authorizationMiddleware.js`
- **Descripción**: Verifica que el usuario tenga permiso para realizar una acción específica en una tarea.

### Manejo de Errores

- **Archivo**: `api/middlewares/errorHandler.js`
- **Descripción**: Centraliza el manejo de errores y proporciona mensajes de error detallados.

## Validaciones

### Validación de Tareas

- **Archivo**: `api/validators/taskValidator.js`
- **Descripción**: Define las reglas de validación para las tareas utilizando `express-validator`.

## Servicios

### Servicio de Tareas

- **Archivo**: `api/services/TaskService.js`
- **Descripción**: Interactúa con la base de datos para realizar operaciones CRUD en las tareas.

## Modelos

### Modelo de Tarea

- **Archivo**: `api/models/Task.js`
- **Descripción**: Define el esquema de la tarea utilizando Mongoose.

## Configuración

### Bootstrap

- **Archivo**: `config/bootstrap.js`
- **Descripción**: Configura y arranca el servidor.

## Documentación de la API

La documentación de la API está disponible en formato Postman y se puede importar utilizando el archivo `postman_collection.json`.

## Ejecución del Proyecto

Para ejecutar el proyecto, sigue estos pasos:

1. Instala las dependencias:
   ```bash
   npm install
   ```

2. Configura las variables de entorno en un archivo `.env`:
   ```
   HOST=localhost
   PORT=3000
   DB=mongodb://localhost:27017/taskdb
   JWT_SECRET=your_jwt_secret
   AUTH_SERVICE_URL=http://localhost:3001
   ```

3. Inicia el servidor:
   ```bash
   npm start
   ```

4. Importa la colección de Postman (`postman_collection.json`) para probar los endpoints.

## Contribuciones

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.




