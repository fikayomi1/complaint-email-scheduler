require('dotenv').config();
const cron = require('node-cron');
const { sendEmail } = require('./mailer');
const { RECIPIENTS, TIMEZONE, getDaysSinceIssue } = require('./helper');

// Runs every 5 hours
const CRON_SCHEDULE = process.env.CRON_SCHEDULE || '0 */5 * * *';

const arg = process.argv[2];

if (arg === 'send') {
    // Manual trigger: node index.js send
    sendEmail();
} else {
    // Scheduled mode: runs automatically every 5 hours
    console.log(`Scheduler started. Emails will send every 5 hours (${CRON_SCHEDULE}).`);
    console.log(`Timezone: ${TIMEZONE}`);
    console.log(`Sending to: ${RECIPIENTS.join(', ')}`);
    console.log(`Days since issue started: ${getDaysSinceIssue()}`);

    cron.schedule(CRON_SCHEDULE, () => sendEmail(), {
        timezone: TIMEZONE,
    });
}
