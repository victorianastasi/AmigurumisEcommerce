const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
        api_key: '',
        domain: ''
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (email, subject, text, title, cb) => {
    const mailOptions = {
        from: email,
        to: 'vicrnastasi@gmail.com',
        subject: title,
        text : `
Nombre: ${subject}
Mensaje: ${text}`
    };
    
    transporter.sendMail(mailOptions, function(err, data){
        if(err){
            cb(err, null);
        }
        else{
            cb(null, data);
        }
    });
};

module.exports = sendMail;
