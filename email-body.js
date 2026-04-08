const { getDaysSinceIssue, formatDate, ISSUE_START_DATE } = require('./helper');

function buildEmailBody(slot) {
    const today = formatDate(new Date());
    const days = getDaysSinceIssue();
    const greeting = slot === 'morning' ? 'Good morning' : 'Good evening';

    return `
${greeting} MTN,

I am writing to follow up on an unresolved issue regarding my MTN FibreX service.

Today is ${today}, and it has now been ${days} day${days === 1 ? '' : 's'} since I first reported this issue on ${formatDate(ISSUE_START_DATE)}.

The problem is as follows:

I subscribed to MTN FibreX, however I have been unable to use the service because it is not yet live in my location. Each time I follow up, I am told that the team is awaiting an update and that I will be communicated to — yet I have received no communication whatsoever since the issue began.

This is quite unfair. I have paid for a service I cannot use, and ${days} days later I am still without a resolution or even a meaningful update.

I am formally requesting:
1. A clear timeline for when FibreX will go live in my area.
2. A direct update on the status of my case.

I will continue to follow up until this matter is resolved.

Warm Regards,
Olaoluwa
  `.trim();
}

function buildSubject(slot) {
    const days = getDaysSinceIssue();
    const tag = slot === 'morning' ? '[Morning Follow-Up]' : '[Evening Follow-Up]';
    return `${tag} Unresolved MTN FibreX Issue — ${days} Days and Counting`;
}

module.exports = { buildEmailBody, buildSubject };
