import { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = [
  {
    type: 'json',
    description: undefined,
    required: true,
    default: '{}',
    routing: {
      request: {
        body: '={{ JSON.parse($value) }}',
      },
    },
    displayName: 'Body',
    name: 'body_object',
    displayOptions: {
      show: {
        resource: ['Records'],
        operation: ['saveObject'],
      },
    },
  },
  {
    type: 'options',
    placeholder: 'ALGOLIA_INDEX_NAME',
    default: '',
    displayName: 'Index Name',
    name: 'indexName_string',
    required: true,
    description: 'Name of the index on which to perform the operation.',
    displayOptions: {
      show: {
        resource: ['Records'],
        operation: ['saveObject'],
      },
    },
    typeOptions: {
      loadOptions: {
        routing: {
          request: {
            method: 'GET',
            url: '/1/indexes',
          },
          output: {
            postReceive: [
              {
                type: 'rootProperty',
                properties: {
                  property: 'items',
                },
              },
              {
                type: 'setKeyValue',
                properties: {
                  name: '={{ $responseItem.name }}',
                  value: '={{ $responseItem.name }}',
                },
              },
            ],
          },
        },
      },
    },
  },
];

export default properties;
