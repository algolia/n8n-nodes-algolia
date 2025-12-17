import { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = [
  {
    type: 'string',
    placeholder: '10.0.0.1/32',
    default: '',
    description: 'IP address range of the source.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'source',
      },
    },
    displayName: 'Source',
    name: 'source_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Vaults'],
        operation: ['appendSource'],
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
        placeholder: 'Server subnet',
        default: '',
        description: 'Source description.',
        displayName: 'Description',
        name: 'description_string',
      },
    ],
    routing: {
      request: {
        body: {
          description: '={{ $value.description_string }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Vaults'],
        operation: ['appendSource'],
      },
    },
  },
];

export default properties;
