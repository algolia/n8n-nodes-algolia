import { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = [
  {
    type: 'string',
    placeholder: 'ALGOLIA_API_KEY',
    default: '',
    displayName: 'Key',
    name: 'key_string',
    required: true,
    description: 'API key.',
    displayOptions: {
      show: {
        resource: ['Api Keys'],
        operation: ['deleteApiKey'],
      },
    },
  },
];

export default properties;
