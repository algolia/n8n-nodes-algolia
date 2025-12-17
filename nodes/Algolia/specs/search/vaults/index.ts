import { INodeProperties } from 'n8n-workflow';
import appendSourceProperties from './appendSource';
import deleteSourceProperties from './deleteSource';
import replaceSourcesProperties from './replaceSources';

const operationProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    default: '',
    description: 'Select the operation to work with',
    options: [
      {
        name: 'List allowed sources',
        value: 'getSources',
        action: 'List allowed sources',
        description: 'Retrieves all allowed IP addresses with access to your application.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/security/sources',
          },
        },
      },
      {
        name: 'Replace allowed sources',
        value: 'replaceSources',
        action: 'Replace allowed sources',
        description: 'Replaces the list of allowed sources.',
        routing: {
          request: {
            method: 'PUT',
            url: '=/1/security/sources',
          },
        },
      },
      {
        name: 'Add a source',
        value: 'appendSource',
        action: 'Add a source',
        description: 'Adds a source to the list of allowed sources.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/security/sources/append',
          },
        },
      },
      {
        name: 'Delete a source',
        value: 'deleteSource',
        action: 'Delete a source',
        description: 'Deletes a source from the list of allowed sources.',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/1/security/sources/{{ $parameter.source_string }}',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['Vaults'],
      },
    },
  },
];

const properties: INodeProperties[] = [
  ...operationProperties,
  ...appendSourceProperties,
  ...deleteSourceProperties,
  ...replaceSourcesProperties,
];

export default properties;
