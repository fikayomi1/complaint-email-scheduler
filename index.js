require('dotenv').config();
const cron = require('node-cron');
const { sendEmail } = require('./mailer');
const { RECIPIENTS, getDaysSinceIssue } = require('./helper');

const arg = process.argv[2];

if (arg === 'morning' || arg === 'night') {
    // Manual trigger: node index.js morning | node index.js night
    sendEmail(arg);
} else {
    // Scheduled mode: runs automatically
    // Morning: 8:00 AM WAT (UTC+1)
    // Night:   9:00 PM WAT (UTC+1)
    console.log('Scheduler started. Emails will send at 8:00 AM and 9:00 PM (WAT) every day.');
    console.log(`Sending to: ${RECIPIENTS.join(', ')}`);
    console.log(`Days since issue started: ${getDaysSinceIssue()}`);

    cron.schedule('0 7 * * *', () => sendEmail('morning'), {
        timezone: 'Africa/Lagos',
    });

    cron.schedule('0 20 * * *', () => sendEmail('night'), {
        timezone: 'Africa/Lagos',
    });
}
