const router = require('express').Router()
const { 
    userController, 
    authController, 
} = require('../api/controllers')

// Rutas de autenticación
router.post('/auth/register', userController.createUser)
router.post('/auth/login', authController.logIn)
router.post('/auth/forgot-password', authController.forgotPassword)
router.post('/auth/reset-password', authController.resetPassword)
router.get('/auth/verify', authController.tokenValidation, (req, res) => {
    res.status(200).json({ 
        success: true, 
        user: req.user 
    })
})

// Rutas de gestión de usuarios
router.delete('/users/:id', authController.tokenValidation, userController.deleteUser)

module.exports = router


