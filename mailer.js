const nodemailer = require('nodemailer');
const { buildEmailBody, buildSubject } = require('./email-body');
const { RECIPIENTS } = require('./helper');

function createTransporter() {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_APP_PASSWORD,
        },
    });
}

async function sendEmail(slot) {
    if (!RECIPIENTS.length) {
        console.error('No recipient emails configured in .env');
        process.exit(1);
    }

    const transporter = createTransporter();
    const subject = buildSubject(slot);
    const body = buildEmailBody(slot);

    try {
        const info = await transporter.sendMail({
            from: `<${process.env.SENDER_EMAIL}>`,
            to: RECIPIENTS.join(', '),
            subject,
            text: body,
        });

        console.log(`[${slot.toUpperCase()}] Email sent at ${new Date().toISOString()}`);
        console.log(`Recipients: ${RECIPIENTS.join(', ')}`);
        console.log(`Message ID: ${info.messageId}`);
    } catch (err) {
        console.error(`[${slot.toUpperCase()}] Failed to send email:`, err.message);
    }
}

module.exports = { sendEmail };
