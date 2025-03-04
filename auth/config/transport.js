module.exports = {
    configWeb: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'web.test@test.com',
            pass: process.env.PASS_EMAIL_DEV,
        },
        pool: true,
    },
//todo modificar esto para usar emails reales
}
