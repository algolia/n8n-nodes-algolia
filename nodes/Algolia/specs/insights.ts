import { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = [
  {
    displayName: 'Resource',
    name: 'resource',
    type: 'options',
    default: '',
    description: 'Select the resource to work with',
    options: [
      {
        name: 'events',
        value: 'events',
        description: 'Events represent user interactions with your website or app',
      },
      {
        name: 'usertokens',
        value: 'usertokens',
        description: 'Delete events related to a specific user token',
      },
    ],
  },
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    default: '',
    description: 'Select the operation to work with',
    options: [
      {
        name: 'Send events',
        value: 'pushEvents',
        action: 'Send events',
        description: 'Sends a list of events to the Insights API.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/events',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['events'],
      },
    },
  },
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    default: '',
    description: 'Select the operation to work with',
    options: [
      {
        name: 'Delete user token',
        value: 'deleteUserToken',
        action: 'Delete user token',
        description:
          'Deletes all events related to the specified user token from events metrics and analytics.',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/1/usertokens/{{ $parameter.userToken_string }}',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['usertokens'],
      },
    },
  },
  {
    displayName: 'Insights Events',
    name: 'insights_events_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Events',
        value: 'events_json',
      },
    ],
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['pushEvents'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Events',
    name: 'events_json',
    default: '[]',
    description:
      'Click and conversion events.\n\n**All** events must be valid, otherwise the API returns an error.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'events',
      },
    },
    displayOptions: {
      show: {
        insights_events_object: ['events_json'],
        resource: ['events'],
        operation: ['pushEvents'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'test-user-1',
    description:
      "Anonymous or pseudonymous user identifier.\n\nDon't use personally identifiable information in user tokens.\nFor more information, see [User token](https://www.algolia.com/doc/guides/sending-events/concepts/usertoken).\n",
    typeOptions: {
      pattern: '[a-zA-Z0-9_=/+-]{1,129}',
    },
    displayName: 'User Token',
    name: 'userToken_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['usertokens'],
        operation: ['deleteUserToken'],
      },
    },
  },
];

export default properties;
