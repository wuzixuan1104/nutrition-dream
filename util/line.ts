/* eslint-disable @typescript-eslint/no-var-requires */
const line = require('@line/bot-sdk');
const client = new line.Client({
  channelAccessToken: process?.env?.LINE_TOKEN,
});

export default client;