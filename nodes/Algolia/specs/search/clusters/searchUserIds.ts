import { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = [
  {
    type: 'string',
    default: '',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'query',
      },
    },
    displayName: 'Query',
    name: 'query_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Clusters'],
        operation: ['searchUserIds'],
      },
    },
  },
  {
    displayName: 'Additional Properties',
    name: 'additionalProperties',
    type: 'collection',
    placeholder: 'Add property',
    default: {},
    required: false,
    options: [
      {
        type: 'string',
        placeholder: 'c11-test',
        default: '',
        description: 'Cluster name.',
        displayName: 'Cluster Name',
        name: 'clusterName_string',
      },
      {
        type: 'number',
        default: '',
        description: 'Page of search results to retrieve.',
        typeOptions: {
          minValue: 0,
        },
        displayName: 'Page',
        name: 'page_number',
      },
      {
        type: 'number',
        default: 20,
        description: 'Number of hits per page.',
        typeOptions: {
          minValue: 1,
          maxValue: 1000,
        },
        displayName: 'Hits Per Page',
        name: 'hitsPerPage_number',
      },
    ],
    routing: {
      request: {
        body: {
          clusterName: '={{ $value.clusterName_string }}',
          page: '={{ $value.page_number }}',
          hitsPerPage: '={{ $value.hitsPerPage_number }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Clusters'],
        operation: ['searchUserIds'],
      },
    },
  },
];

export default properties;
