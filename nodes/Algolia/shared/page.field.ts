import type { INodeProperties } from 'n8n-workflow';

export const page: INodeProperties = {
  // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
  displayName: 'page',
  name: 'page',
  description: 'The page to retrieve',
  type: 'number',
  default: 0,
  typeOptions: {
    minValue: 0,
  },
  routing: {
    request: {
      body: {
        page: '={{ $value }}',
      },
    },
  },
};
