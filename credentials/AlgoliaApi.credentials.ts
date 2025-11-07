import type {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class AlgoliaApi implements ICredentialType {
  name = 'algoliaApi';
  displayName = 'Algolia API';
  documentationUrl = 'https://www.algolia.com';
  icon = 'file:../algolia.svg' as const;
  properties: INodeProperties[] = [
    {
      displayName: 'Application ID',
      name: 'appId',
      type: 'string',
      required: true,
      default: '',
    },
    {
      displayName: 'Admin API Key',
      name: 'adminApiKey',
      type: 'string',
      typeOptions: {
        password: true,
      },
      required: true,
      default: '',
    },
  ];
  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        'X-Algolia-Application-Id': '={{ $credentials.appId }}',
        'X-Algolia-API-Key': '={{ $credentials.adminApiKey }}',
      },
    },
  };
  test: ICredentialTestRequest = {
    request: {
      baseURL: '={{ `https://${$credentials.appId}.algolia.net` }}',
      url: '/1/keys',
    },
  };
}
