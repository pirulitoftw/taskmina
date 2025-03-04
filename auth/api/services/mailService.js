const ENV         =   process.env.NODE_ENV;
const nodeMailer  =  require('nodemailer');
const transport   =  require('../../config/transport');
const TransporterDev =  nodeMailer.createTransport(transport.configWeb);
const Templates = require('../constants/templateEmail')

module.exports = {
    /**
     * 
     * @param {Object} options @description  from: from,
              to: '',
              bcc: `${bcc}`,
              priority: priority,
              subject: ENV == 'production' ? subject : `${subject} - ${ type == 'setpass' ? '***': '[ DEV ]'}`,
              attachments: attachment,
     */
    sendEmail: (options, message) => {
        try {
            options.html = Templates.standard('#363a2c', options.subject, message)
            options.subject = ENV == 'production' ? options.subject : `[DEV] ${options.subject}`;
            TransporterDev.sendMail(options, function(error, info){
                if (error) throw new Error('Error mailer');
                return info;
            });
        } catch (error) {
            throw error
        }
    },

    async sendPasswordReset(email, token, name) {
        try {
            const resetURL = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
            
            const message = `
                <p>Hola ${name},</p>
                <p>Has solicitado restablecer tu contraseña.</p>
                <p>Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
                <a href="${resetURL}" target="_blank">Restablecer contraseña</a>
                <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
                <p>El enlace expirará en 1 hora.</p>
            `;

            const options = {
                from: process.env.EMAIL_FROM || 'noreply@yourdomain.com',
                to: email,
                subject: 'Recuperación de Contraseña',
                priority: 'high'
            };

            return await this.sendEmail(options, message);
        } catch (error) {
            console.error('Error sending password reset email:', error);
            throw new Error('Error al enviar el correo de recuperación de contraseña');
        }
    }
}