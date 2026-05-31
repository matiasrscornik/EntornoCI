const {
  GITHUB_REF_NAME,
  GITHUB_REPOSITORY,
  GITHUB_RUN_ID,
  GITHUB_SERVER_URL = 'https://github.com',
  GITHUB_SHA,
  JIRA_API_TOKEN,
  JIRA_BASE_URL,
  JIRA_EMAIL,
  JIRA_ISSUE_TEXT = '',
  JIRA_JOB_STATUS = 'unknown',
  JIRA_PROJECT_KEY,
} = process.env;

const normalizedProjectKey = JIRA_PROJECT_KEY?.split('-')[0]?.toUpperCase();
const issuePattern = /\b[A-Z][A-Z0-9]+-\d+\b/g;
const issueKeys = JIRA_ISSUE_TEXT.match(issuePattern) ?? [];
const issueKey = issueKeys
  .map((key) => key.toUpperCase())
  .find((key) => !normalizedProjectKey || key.startsWith(`${normalizedProjectKey}-`));

console.log(`Jira issue text: ${JIRA_ISSUE_TEXT}`);

if (!issueKey) {
  console.log('No Jira issue key found. Skipping Jira notification.');
  process.exit(0);
}

console.log(`Jira issue key found: ${issueKey}`);

const missingSecrets = [
  ['JIRA_BASE_URL', JIRA_BASE_URL],
  ['JIRA_EMAIL', JIRA_EMAIL],
  ['JIRA_API_TOKEN', JIRA_API_TOKEN],
].filter(([, value]) => !value);

if (missingSecrets.length > 0) {
  const names = missingSecrets.map(([name]) => name).join(', ');
  throw new Error(`Missing Jira secrets: ${names}`);
}

const shortSha = GITHUB_SHA ? GITHUB_SHA.slice(0, 7) : 'unknown';
const runUrl = `${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}`;
const status = JIRA_JOB_STATUS.toUpperCase();
const messageLines = [
  `GitHub Actions finalizo con estado: ${status}`,
  `Repositorio: ${GITHUB_REPOSITORY}`,
  `Rama: ${GITHUB_REF_NAME}`,
  `Commit: ${shortSha}`,
  `Run: ${runUrl}`,
];
const auth = Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString('base64');
const baseUrl = JIRA_BASE_URL.replace(/\/$/, '');

const response = await fetch(`${baseUrl}/rest/api/3/issue/${issueKey}/comment`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    Authorization: `Basic ${auth}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    body: {
      type: 'doc',
      version: 1,
      content: messageLines.map((text) => ({
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text,
          },
        ],
      })),
    },
  }),
});

if (!response.ok) {
  const errorBody = await response.text();
  throw new Error(`Jira notification failed (${response.status}): ${errorBody}`);
}

const comment = await response.json();
console.log(`Jira notification sent to ${issueKey}. Comment id: ${comment.id}`);
console.log(`Jira comment URL: ${baseUrl}/browse/${issueKey}?focusedCommentId=${comment.id}`);
