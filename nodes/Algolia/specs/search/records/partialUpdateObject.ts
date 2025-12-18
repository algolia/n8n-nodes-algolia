import { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = [
  {
    type: 'json',
    description: 'Attributes to update.',
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
        operation: ['partialUpdateObject'],
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
        operation: ['partialUpdateObject'],
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
  {
    type: 'string',
    placeholder: 'test-record-123',
    default: '',
    description: 'Unique record identifier.',
    displayName: 'Object ID',
    name: 'objectID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Records'],
        operation: ['partialUpdateObject'],
      },
    },
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add option',
    default: {},
    required: false,
    options: [
      {
        type: 'boolean',
        default: true,
        displayName: 'Create If Not Exists',
        name: 'createIfNotExists_boolean',
        description: "Whether to create a new record if it doesn't exist.",
      },
    ],
    routing: {
      request: {
        qs: {
          createIfNotExists: '={{ $value.createIfNotExists_boolean }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Records'],
        operation: ['partialUpdateObject'],
      },
    },
  },
];

export default properties;
