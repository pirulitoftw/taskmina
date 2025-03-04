const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { User } = require('../models');
const { mailService } = require('../services');

module.exports = {
    async logIn(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    error: 'Email y contraseña son requeridos'
                });
            }

            const user = await User.findOne({ email: email.toLowerCase() });
            
            if (!user || user.status !== 'active') {
                return res.status(401).json({
                    success: false,
                    error: 'Credenciales inválidas'
                });
            }

            const isValidPassword = await user.comparePassword(password);
            
            if (!isValidPassword) {
                return res.status(401).json({
                    success: false,
                    error: 'Credenciales inválidas'
                });
            }

            const token = jwt.sign(
                { 
                    id: user._id,
                    email: user.email,
                    type: user.type,
                    name: user.name, 
                }, 
                process.env.SECRET,
                { expiresIn: process.env.EXP || '24h' }
            );

            res.status(200).json({
                success: true,
                data: {
                    token,
                    user: {
                        id: user._id,
                        email: user.email,
                        name: user.name,
                        type: user.type,
                        status: user.status
                    }
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Error al procesar la solicitud'
            });
        }
    },

    async tokenValidation(req, res, next) {
        try {
            const token = req.headers.authorization?.split(' ')[1] || req.headers.token;
            if (!token) {
                return res.status(401).json({
                    success: false,
                    error: 'Token no proporcionado'
                });
            }

            jwt.verify(token, process.env.SECRET, async (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        success: false,
                        error: 'Token inválido o expirado'
                    });
                }

                // Verificar si el usuario sigue activo
                const user = await User.findById(decoded.id);
                if (!user || user.status !== 'active') {
                    return res.status(401).json({
                        success: false,
                        error: 'Usuario no autorizado'
                    });
                }

                req.user = {
                    id: decoded.id,
                    email: decoded.email,
                    name: decoded.name,
                    type: decoded.type
                };
                next();
            });
        } catch (error) {
            console.error('Error en validación de token:', error);
            res.status(500).json({
                success: false,
                error: 'Error al validar el token'
            });
        }
    },

    async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email: email.toLowerCase() });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    error: 'No existe un usuario con este email'
                });
            }

            const resetToken = user.createPasswordResetToken();
            await user.save();

            try {
                await mailService.sendPasswordReset(
                    user.email,
                    resetToken,
                    user.name
                );

                res.status(200).json({
                    success: true,
                    message: 'Token enviado al email'
                });
            } catch (error) {
                user.passwordResetToken = undefined;
                user.passwordResetExpires = undefined;
                await user.save();

                return res.status(500).json({
                    success: false,
                    error: 'Error al enviar el email de recuperación'
                });
            }
        } catch (error) {
            console.error('Error en forgotPassword:', error);
            res.status(500).json({
                success: false,
                error: 'Error al procesar la solicitud'
            });
        }
    },

    async resetPassword(req, res) {
        try {
            const { token, password } = req.body;

            const hashedToken = crypto
                .createHash('sha256')
                .update(token)
                .digest('hex');

            const user = await User.findOne({
                passwordResetToken: hashedToken,
                passwordResetExpires: { $gt: Date.now() }
            });

            if (!user) {
                return res.status(400).json({
                    success: false,
                    error: 'Token inválido o expirado'
                });
            }

            user.password = password;
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save();

            res.status(200).json({
                success: true,
                message: 'Contraseña actualizada correctamente'
            });
        } catch (error) {
            console.error('Error en resetPassword:', error);
            res.status(500).json({
                success: false,
                error: 'Error al restablecer la contraseña'
            });
        }
    }
}