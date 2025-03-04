const axios = require('axios');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }

    if (!process.env.AUTH_SERVICE_URL) {
      return res.status(500).json({ success: false, message: 'Authentication service URL not configured.' });
    }

    // Llamada al microservicio de auth para verificar el token
    const response = await axios.get(`${process.env.AUTH_SERVICE_URL}/auth/verify`, {
      headers: {
        'Authorization': token // El token ya viene con el prefijo "Bearer" del request original
      }
    });

    if (response.data.success) {
      // Asegurarse de que tenemos la información del usuario necesaria
      if (!response.data.user || !response.data.user.id) {
        return res.status(401).json({ success: false, message: 'Invalid user data from auth service.' });
      }
      // Asignar el id del usuario desde la respuesta del servicio de auth
      req.user = {
        userId: response.data.user.id
      };
      next();
    } else {
      res.status(401).json({ success: false, message: 'Invalid token.' });
    }
  } catch (error) {
    // Log del error para debugging
    console.error('Auth service error:', error.message);
    
    if (error.response) {
      // Error de respuesta del servicio de auth
      res.status(error.response.status).json({ 
        success: false, 
        message: error.response.data.message || 'Authentication failed.' 
      });
    } else if (error.request) {
      // Error de conexión
      res.status(503).json({ 
        success: false, 
        message: 'Authentication service is unavailable.' 
      });
    } else {
      // Otros errores
      res.status(500).json({ 
        success: false, 
        message: 'Internal server error during authentication.' 
      });
    }
  }
};

module.exports = authMiddleware;