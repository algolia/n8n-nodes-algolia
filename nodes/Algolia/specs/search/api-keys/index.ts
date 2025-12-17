import { INodeProperties } from 'n8n-workflow';
import addApiKeyProperties from './addApiKey';
import deleteApiKeyProperties from './deleteApiKey';
import getApiKeyProperties from './getApiKey';
import restoreApiKeyProperties from './restoreApiKey';
import updateApiKeyProperties from './updateApiKey';

const operationProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    default: '',
    description: 'Select the operation to work with',
    options: [
      {
        name: 'List API keys',
        value: 'listApiKeys',
        action: 'List API keys',
        description:
          'Lists all API keys associated with your Algolia application, including their permissions and restrictions.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/keys',
          },
        },
      },
      {
        name: 'Create an API key',
        value: 'addApiKey',
        action: 'Create an API key',
        description: 'Creates a new API key with specific permissions and restrictions.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/keys',
          },
        },
      },
      {
        name: 'Retrieve API key permissions',
        value: 'getApiKey',
        action: 'Retrieve API key permissions',
        description: 'Gets the permissions and restrictions of an API key.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/keys/{{ $parameter.key_string }}',
          },
        },
      },
      {
        name: 'Update an API key',
        value: 'updateApiKey',
        action: 'Update an API key',
        description: 'Replaces the permissions of an existing API key.',
        routing: {
          request: {
            method: 'PUT',
            url: '=/1/keys/{{ $parameter.key_string }}',
          },
        },
      },
      {
        name: 'Delete an API key',
        value: 'deleteApiKey',
        action: 'Delete an API key',
        description: 'Deletes the API key.',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/1/keys/{{ $parameter.key_string }}',
          },
        },
      },
      {
        name: 'Restore an API key',
        value: 'restoreApiKey',
        action: 'Restore an API key',
        description: 'Restores a deleted API key.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/keys/{{ $parameter.key_string }}/restore',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['Api Keys'],
      },
    },
  },
];

const properties: INodeProperties[] = [
  ...operationProperties,
  ...addApiKeyProperties,
  ...deleteApiKeyProperties,
  ...getApiKeyProperties,
  ...restoreApiKeyProperties,
  ...updateApiKeyProperties,
];

export default properties;
