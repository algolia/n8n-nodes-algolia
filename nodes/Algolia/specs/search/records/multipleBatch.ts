import { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = [
  {
    type: 'json',
    displayName: 'Requests',
    name: 'requests_json',
    default: '[]',
    description: undefined,
    required: true,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'requests',
      },
    },
    displayOptions: {
      show: {
        resource: ['Records'],
        operation: ['multipleBatch'],
      },
    },
  },
];

export default properties;
