import { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = [
  {
    type: 'string',
    placeholder: '10.0.0.1/32',
    default: '',
    displayName: 'Source',
    name: 'source_string',
    required: true,
    description: 'IP address range of the source.',
    displayOptions: {
      show: {
        resource: ['Vaults'],
        operation: ['deleteSource'],
      },
    },
  },
];

export default properties;
