const { getDaysSinceIssue, formatDate, ISSUE_START_DATE } = require('./helper');

function buildEmailBody() {
    const today = formatDate(new Date());
    const days = getDaysSinceIssue();

    return `
Good day,

I am writing to follow up on an unresolved issue with my internet service.

Today is ${today}, and it has now been ${days} day${days === 1 ? '' : 's'} since installation on ${formatDate(ISSUE_START_DATE)}.

The situation is as follows:

The FATs have been powered and the lights on the router are green. At this point, all I need is for my router to be configured so I can start using the service I have paid for. Despite this, I have sent multiple emails and received absolutely no response — no reply, no follow-up.

This is happening over a month after the initial installation, and the entire process has been nothing short of disappointing.

I am formally requesting:
1. An urgent response to this email acknowledging my complaint.
2. A technician or support agent to reach out and complete the router configuration immediately.

I will continue to follow up every few hours until this matter is fully resolved.

Warm Regards,
Olaoluwa Odedunmoye
  `.trim();
}

function buildSubject() {
    const days = getDaysSinceIssue();
    return `[Follow-Up] Unresolved Internet Service Configuration — ${days} Days and Counting`;
}

module.exports = { buildEmailBody, buildSubject };
