import { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = [
  {
    type: 'options',
    default: '',
    options: [
      {
        name: 'plurals',
        value: 'plurals',
      },
      {
        name: 'stopwords',
        value: 'stopwords',
      },
      {
        name: 'compounds',
        value: 'compounds',
      },
    ],
    displayName: 'Dictionary Name',
    name: 'dictionaryName_options',
    required: true,
    description: 'Dictionary type in which to search.',
    displayOptions: {
      show: {
        resource: ['Dictionaries'],
        operation: ['batchDictionaryEntries'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Requests',
    name: 'requests_json',
    default: '[]',
    description: 'List of additions and deletions to your dictionaries.',
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
        resource: ['Dictionaries'],
        operation: ['batchDictionaryEntries'],
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
        type: 'boolean',
        default: false,
        description:
          'Whether to replace all custom entries in the dictionary with the ones sent with this request.',
        displayName: 'Clear Existing Dictionary Entries',
        name: 'clearExistingDictionaryEntries_boolean',
      },
    ],
    routing: {
      request: {
        body: {
          clearExistingDictionaryEntries: '={{ $value.clearExistingDictionaryEntries_boolean }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Dictionaries'],
        operation: ['batchDictionaryEntries'],
      },
    },
  },
];

export default properties;
