import { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = [
  {
    type: 'string',
    placeholder: 'c11-test',
    default: '',
    description: 'Cluster name.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'cluster',
      },
    },
    displayName: 'Cluster',
    name: 'cluster_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Clusters'],
        operation: ['assignUserId'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'user1',
    default: '',
    description: 'Unique identifier of the user who makes the search request.',
    typeOptions: {
      pattern: '^[a-zA-Z0-9 \-*.]+$',
    },
    routing: {
      request: {
        headers: {
          'X-Algolia-User-ID': '={{ $value }}',
        },
      },
    },
    displayName: 'X-Algolia-User-ID',
    name: 'X-Algolia-User-ID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Clusters'],
        operation: ['assignUserId'],
      },
    },
  },
];

export default properties;
