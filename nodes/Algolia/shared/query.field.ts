import type { INodeProperties } from 'n8n-workflow';

export const query: INodeProperties = {
  displayName: 'Query',
  name: 'query',
  type: 'string',
  description: 'The text used to search an index',
  default: '',
  routing: {
    request: {
      body: {
        query: '={{ $value }}',
      },
    },
  },
};
