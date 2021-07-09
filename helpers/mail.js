const nodemailer = require('nodemailer');
const mail = function () { }
const transporter = nodemailer.createTransport({ 
        host: 'mail.samosys.com',
        port: 465,
        secure: true,
        auth: {
            user: 'test@samosys.com',
            pass: 'test@#321',
        }
    });

mail.sendMail = async (email, subject, mailBody) => {
    await transporter.sendMail({ from: 'test@samosys.com', to: email, subject: subject, html: mailBody }, (error, info) => { });
    return true;
};

module.exports = mail;