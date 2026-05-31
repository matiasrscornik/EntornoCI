const {
  GITHUB_ACTOR,
  GITHUB_EVENT_NAME,
  GITHUB_REF_NAME,
  GITHUB_REPOSITORY,
  GITHUB_RUN_ID,
  GITHUB_SERVER_URL = 'https://github.com',
  GITHUB_SHA,
  SLACK_JOB_NAME = 'CI',
  SLACK_JOB_STATUS = 'failure',
  SLACK_WEBHOOK_URL,
} = process.env;

if (!SLACK_WEBHOOK_URL) {
  throw new Error('Missing Slack secret: SLACK_WEBHOOK_URL');
}

const shortSha = GITHUB_SHA ? GITHUB_SHA.slice(0, 7) : 'unknown';
const runUrl = `${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}`;
const status = SLACK_JOB_STATUS.toUpperCase();

const payload = {
  text: `GitHub Actions ${status}: ${SLACK_JOB_NAME}`,
  blocks: [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: `GitHub Actions ${status}`,
      },
    },
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `*Job:*\n${SLACK_JOB_NAME}`,
        },
        {
          type: 'mrkdwn',
          text: `*Repositorio:*\n${GITHUB_REPOSITORY}`,
        },
        {
          type: 'mrkdwn',
          text: `*Rama:*\n${GITHUB_REF_NAME}`,
        },
        {
          type: 'mrkdwn',
          text: `*Commit:*\n${shortSha}`,
        },
        {
          type: 'mrkdwn',
          text: `*Evento:*\n${GITHUB_EVENT_NAME}`,
        },
        {
          type: 'mrkdwn',
          text: `*Autor:*\n${GITHUB_ACTOR}`,
        },
      ],
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Ver workflow',
          },
          url: runUrl,
        },
      ],
    },
  ],
};

const response = await fetch(SLACK_WEBHOOK_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
});

if (!response.ok) {
  const errorBody = await response.text();
  throw new Error(`Slack notification failed (${response.status}): ${errorBody}`);
}

console.log('Slack failure notification sent.');
