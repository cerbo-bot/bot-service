import * as dialogflow from '@google-cloud/dialogflow';

const sessionClient = new dialogflow.SessionsClient();

export const detectIntent = async (
  projectId,
  sessionId,
  query,
  contexts,
  languageCode
) => {
  // The path to identify the agent that owns the created intent.
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode,
      },
    },
  };

  if (contexts && contexts.length > 0) {
    request.queryParams = {
      contexts,
    };
  }

  const responses = await sessionClient.detectIntent(request);
  return responses[0];
};
