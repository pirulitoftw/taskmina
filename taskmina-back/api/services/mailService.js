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
    }
}