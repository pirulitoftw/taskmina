# Auth Microservice

Microservicio de autenticación para la aplicación de tareas. Maneja la autenticación y autorización de usuarios mediante JWT tokens.

## Configuración

1. Clona el repositorio
2. Instala las dependencias:
```bash
npm install
```
3. Configura las variables de entorno en un archivo `.env`:
```env
HOST=localhost
PORT=8080
DB=tu_url_de_mongodb
SECRET=tu_jwt_secret
EXP=1d
EMAIL_FROM=tu_email
FRONTEND_URL=http://localhost:3000
PASS_EMAIL_DEV=tu_password_email
```

## Funcionalidades

- Registro de usuarios
- Login con JWT
- Validación de tokens JWT
- Recuperación de contraseña
- Eliminación de usuarios (solo admin)

## Documentación de la API

### Importar Colección de Postman

1. Abre Postman
2. Haz clic en "Import"
3. Selecciona el archivo `postman_collection.json`
4. Configura las variables de entorno en Postman:
   - `baseUrl`: URL base de tu API (ej: http://localhost:8080)
   - `token`: Token JWT obtenido al hacer login

### Variables de Entorno

- `SECRET`: Clave secreta para firmar los JWT tokens
- `EXP`: Tiempo de expiración del token (ej: '1d' para un día)

### Endpoints

#### Autenticación

- `POST /api/v1/auth/register` - Registro de usuarios
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/verify` - Verificar token JWT
- `POST /api/v1/auth/forgot-password` - Solicitar recuperación de contraseña
- `POST /api/v1/auth/reset-password` - Restablecer contraseña

#### Gestión de Usuarios

- `DELETE /api/v1/users/:id` - Eliminar usuario (requiere ser admin)

## Uso en Otros Microservicios

Para validar tokens JWT en otros microservicios:

1. Incluir el token en el header de la petición:
```
Authorization: Bearer <token>
```

2. Hacer una petición a `/api/v1/auth/verify` para validar el token

## Desarrollo

```bash
# Modo desarrollo
npm run dev

# Modo producción
npm start
```




