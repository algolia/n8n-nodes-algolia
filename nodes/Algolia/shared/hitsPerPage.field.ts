import type { INodeProperties } from 'n8n-workflow';

export const hitsPerPage: INodeProperties = {
  displayName: 'hitsPerPage',
  name: 'hitsPerPage',
  description: 'The number of hits per page',
  type: 'number',
  default: 20,
  typeOptions: {
    minValue: 0,
    maxValue: 1000,
  },
  routing: {
    request: {
      body: {
        hitsPerPage: '={{ $value }}',
      },
    },
  },
};
