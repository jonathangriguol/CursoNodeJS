import { messaging } from "../configs/app.config.js";

// Función para generar un código random
export const generateRandomCode = () => {
    const codeLength = 6;
    // Genera un código aleatorio de longitud especificada
    return crypto.randomBytes(Math.ceil(codeLength / 2))
        .toString('hex')
        .slice(0, codeLength);
}

// Configuración del transporte para el envío de correos electrónicos
const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: messaging.EMAIL_USER,
        pass: messaging.EMAIL_PASSWORD
    }
});

// Función para enviar un correo electrónico al usuario
export const sendEmailToUser = async (email, subject, html) => {
    // Enviar el correo electrónico y devolver el resultado
    const result = await transport.sendMail({
        from: 'Inicio de sesion en Coder App <' + config.EMAIL_USER + '>',
        to: email,
        subject: subject,
        html: html
    })
    return (result);
}