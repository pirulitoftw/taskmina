const { User } = require('../models');

module.exports = {
  async createUser(req, res) {
    try {
      const { email, password, name, lastName, type } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Email y contraseña son requeridos'
        });
      }

      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: 'El email ya está registrado'
        });
      }

      const user = await User.create({
        email: email.toLowerCase(),
        password,
        name,
        lastName,
        type: type || 'user'
      });

      res.status(201).json({
        success: true,
        data: {
          user: {
            id: user._id,
            email: user.email,
            name: user.name,
            lastName: user.lastName,
            type: user.type
          }
        }
      });

    } catch (error) {
      console.error('Error en createUser:', error);
      res.status(500).json({
        success: false,
        error: 'Error al crear el usuario'
      });
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      // Verificar si el usuario existe
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'Usuario no encontrado'
        });
      }

      // Verificar que no se puede eliminar a sí mismo
      if (req.user.id === id) {
        return res.status(400).json({
          success: false,
          error: 'No puedes eliminar tu propia cuenta'
        });
      }

      // Verificar si el usuario que hace la petición es admin
      if (req.user.type !== 'admin') {
        return res.status(403).json({
          success: false,
          error: 'No tienes permisos para realizar esta acción'
        });
      }

      await User.findByIdAndDelete(id);

      res.status(200).json({
        success: true,
        message: 'Usuario eliminado correctamente'
      });

    } catch (error) {
      console.error('Error en deleteUser:', error);
      res.status(500).json({
        success: false,
        error: 'Error al eliminar el usuario'
      });
    }
  }
};