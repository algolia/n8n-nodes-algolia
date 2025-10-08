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
        name: 'profiles',
        value: 'profiles',
        description:
          'User profiles represent the affinities each user profile has for the different facets in your index',
      },
      {
        name: 'strategies',
        value: 'strategies',
        description:
          'The personalization strategy defines how personalization should affect the search results,\nand how much each facet and event type impact the personalization',
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
        name: 'Retrieve a user profile',
        value: 'getUserTokenProfile',
        action: 'Retrieve a user profile',
        description: 'Retrieves a user profile and their affinities for different facets.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/profiles/personalization/{{ $parameter.userToken_string }}',
          },
        },
      },
      {
        name: 'Delete a user profile',
        value: 'deleteUserProfile',
        action: 'Delete a user profile',
        description: 'Deletes a user profile.',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/1/profiles/{{ $parameter.userToken_string }}',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['profiles'],
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
        name: 'Retrieve the personalization strategy',
        value: 'getPersonalizationStrategy',
        action: 'Retrieve the personalization strategy',
        description: 'Retrieves the current personalization strategy.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/strategies/personalization',
          },
        },
      },
      {
        name: 'Define the personalization strategy',
        value: 'setPersonalizationStrategy',
        action: 'Define the personalization strategy',
        description: 'Creates a new personalization strategy.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/strategies/personalization',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['strategies'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'test-user-123',
    description:
      'Unique pseudonymous or anonymous user identifier.\n\nThis helps with analytics and click and conversion events.\nFor more information, see [user token](https://www.algolia.com/doc/guides/sending-events/concepts/usertoken).\n',
    displayName: 'User Token',
    name: 'userToken_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['profiles'],
        operation: ['getUserTokenProfile'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'test-user-123',
    description:
      'Unique pseudonymous or anonymous user identifier.\n\nThis helps with analytics and click and conversion events.\nFor more information, see [user token](https://www.algolia.com/doc/guides/sending-events/concepts/usertoken).\n',
    displayName: 'User Token',
    name: 'userToken_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['profiles'],
        operation: ['deleteUserProfile'],
      },
    },
  },
  {
    displayName: 'Personalization Strategy Params',
    name: 'personalization_strategy_params_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Events Scoring',
        value: 'eventsScoring_json',
      },
      {
        name: 'Facets Scoring',
        value: 'facetsScoring_fixedCollection',
      },
      {
        name: 'Personalization Impact',
        value: 'personalizationImpact_number',
      },
    ],
    displayOptions: {
      show: {
        resource: ['strategies'],
        operation: ['setPersonalizationStrategy'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Events Scoring',
    name: 'eventsScoring_json',
    default: '',
    description:
      'Scores associated with each event.\n\nThe higher the scores, the higher the impact of those events on the personalization of search results.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'eventsScoring',
      },
    },
    displayOptions: {
      show: {
        personalization_strategy_params_object: ['eventsScoring_json'],
        resource: ['strategies'],
        operation: ['setPersonalizationStrategy'],
      },
    },
  },
  {
    type: 'fixedCollection',
    displayName: 'Facets Scoring',
    name: 'facetsScoring_fixedCollection',
    default: '',
    description:
      'Scores associated with each facet.\n\nThe higher the scores, the higher the impact of those events on the personalization of search results.\n',
    required: false,
    typeOptions: {
      multipleValues: true,
    },
    options: [
      {
        name: 'facetsScoring_fixedCollection_values',
        displayName: 'Facets Scoring',
        values: [
          {
            type: 'number',
            description: 'Event score.',
            displayName: 'Score',
            name: 'score_number_facetsScoring',
            default: '',
          },
          {
            type: 'string',
            description: 'Facet attribute name.',
            displayName: 'Facet Name',
            name: 'facetName_string_facetsScoring',
            default: '',
          },
        ],
      },
    ],
    routing: {
      send: {
        type: 'body',
        value:
          '={{ $parameter.values?.map(item => ({ score: typeof item.score_number_facetsScoring !== "undefined" ? item.score_number_facetsScoring : undefined, facetName: typeof item.facetName_string_facetsScoring !== "undefined" ? item.facetName_string_facetsScoring : undefined })) }}',
        property: 'facetsScoring',
      },
    },
    displayOptions: {
      show: {
        personalization_strategy_params_object: ['facetsScoring_fixedCollection'],
        resource: ['strategies'],
        operation: ['setPersonalizationStrategy'],
      },
    },
  },
  {
    type: 'number',
    description:
      'Impact of personalization on the search results.\n\nIf set to 0, personalization has no impact on the search results.\n',
    typeOptions: {
      minValue: 0,
      maxValue: 100,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'personalizationImpact',
      },
    },
    displayName: 'Personalization Impact',
    name: 'personalizationImpact_number',
    default: '',
    displayOptions: {
      show: {
        personalization_strategy_params_object: ['personalizationImpact_number'],
        resource: ['strategies'],
        operation: ['setPersonalizationStrategy'],
      },
    },
  },
];

export default properties;
