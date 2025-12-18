import { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = [
  {
    type: 'string',
    placeholder: 'user1',
    default: '',
    description: 'Unique identifier of the user who makes the search request.',
    typeOptions: {
      pattern: '^[a-zA-Z0-9 \-*.]+$',
    },
    displayName: 'User ID',
    name: 'userID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Clusters'],
        operation: ['removeUserId'],
      },
    },
  },
];

export default properties;
