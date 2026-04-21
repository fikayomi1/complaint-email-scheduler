const ISSUE_START_DATE = new Date(process.env.ISSUE_START_DATE || '2025-01-01');

const RECIPIENTS = process.env.RECIPIENT_EMAILS
    ? process.env.RECIPIENT_EMAILS.split(',').map((e) => e.trim())
    : [];

const TIMEZONE = process.env.TIMEZONE || 'UTC';

function getDaysSinceIssue() {
    const now = new Date();
    const diff = now - ISSUE_START_DATE;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function formatDate(date) {
    return date.toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

module.exports = { ISSUE_START_DATE, RECIPIENTS, TIMEZONE, getDaysSinceIssue, formatDate };
