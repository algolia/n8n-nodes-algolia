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
        name: 'configurations',
        value: 'configurations',
        description: 'Manage Query Suggestions configurations',
      },
      {
        name: 'logs',
        value: 'logs',
        description: 'Get logs for a Query Suggestions index',
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
        name: 'List configurations',
        value: 'getAllConfigs',
        action: 'List configurations',
        description: 'Retrieves all Query Suggestions configurations of your Algolia application.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/configs',
          },
        },
      },
      {
        name: 'Create a configuration',
        value: 'createConfig',
        action: 'Create a configuration',
        description: 'Creates a new Query Suggestions configuration.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/configs',
          },
        },
      },
      {
        name: 'Retrieve a configuration',
        value: 'getConfig',
        action: 'Retrieve a configuration',
        description: 'Retrieves a single Query Suggestions configuration by its index name.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/configs/{{ $parameter.indexName_string }}',
          },
        },
      },
      {
        name: 'Update a configuration',
        value: 'updateConfig',
        action: 'Update a configuration',
        description: 'Updates a QuerySuggestions configuration.',
        routing: {
          request: {
            method: 'PUT',
            url: '=/1/configs/{{ $parameter.indexName_string }}',
          },
        },
      },
      {
        name: 'Delete a configuration',
        value: 'deleteConfig',
        action: 'Delete a configuration',
        description: 'Deletes a Query Suggestions configuration.',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/1/configs/{{ $parameter.indexName_string }}',
          },
        },
      },
      {
        name: 'Retrieve configuration status',
        value: 'getConfigStatus',
        action: 'Retrieve configuration status',
        description: 'Reports the status of a Query Suggestions index.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/configs/{{ $parameter.indexName_string }}/status',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['configurations'],
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
        name: 'Retrieve logs',
        value: 'getLogFile',
        action: 'Retrieve logs',
        description: 'Retrieves the logs for a single Query Suggestions index.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/logs/{{ $parameter.indexName_string }}',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['logs'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Configuration With Index',
    name: 'configuration_with_index_object',
    description: 'Query Suggestions configuration.',
    required: true,
    default: '{}',
    routing: {
      request: {
        body: '={{ $value }}',
      },
    },
    displayOptions: {
      show: {
        resource: ['configurations'],
        operation: ['createConfig'],
      },
    },
  },
  {
    type: 'options',
    placeholder: 'ALGOLIA_INDEX_NAME',
    default: '',
    description: 'Name of the Query Suggestions index (case-sensitive).',
    displayName: 'Index Name',
    name: 'indexName_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['configurations'],
        operation: ['getConfig'],
      },
    },
    typeOptions: {
      loadOptions: {
        routing: {
          request: {
            method: 'GET',
            url: '/1/indexes',
          },
          output: {
            postReceive: [
              {
                type: 'rootProperty',
                properties: {
                  property: 'items',
                },
              },
              {
                type: 'setKeyValue',
                properties: {
                  name: '={{ $responseItem.name }}',
                  value: '={{ $responseItem.name }}',
                },
              },
            ],
          },
        },
      },
    },
  },
  {
    type: 'options',
    placeholder: 'ALGOLIA_INDEX_NAME',
    default: '',
    description: 'Name of the Query Suggestions index (case-sensitive).',
    displayName: 'Index Name',
    name: 'indexName_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['configurations'],
        operation: ['updateConfig'],
      },
    },
    typeOptions: {
      loadOptions: {
        routing: {
          request: {
            method: 'GET',
            url: '/1/indexes',
          },
          output: {
            postReceive: [
              {
                type: 'rootProperty',
                properties: {
                  property: 'items',
                },
              },
              {
                type: 'setKeyValue',
                properties: {
                  name: '={{ $responseItem.name }}',
                  value: '={{ $responseItem.name }}',
                },
              },
            ],
          },
        },
      },
    },
  },
  {
    displayName: 'Configuration',
    name: 'configuration_object',
    type: 'multiOptions',
    description: 'Query Suggestions configuration.',
    required: true,
    default: [],
    options: [
      {
        name: 'Source Indices',
        value: 'sourceIndices_json',
      },
      {
        name: 'Languages',
        value: 'languages',
      },
      {
        name: 'Exclude',
        value: 'exclude',
      },
      {
        name: 'Enable Personalization',
        value: 'enablePersonalization_boolean',
      },
      {
        name: 'Allow Special Characters',
        value: 'allowSpecialCharacters_boolean',
      },
    ],
    displayOptions: {
      show: {
        resource: ['configurations'],
        operation: ['updateConfig'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Source Indices',
    name: 'sourceIndices_json',
    default: '[]',
    description: 'Algolia indices from which to get the popular searches for query suggestions.',
    required: true,
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'sourceIndices',
      },
    },
    displayOptions: {
      show: {
        configuration_object: ['sourceIndices_json'],
        resource: ['configurations'],
        operation: ['updateConfig'],
      },
    },
  },
  {
    type: 'options',
    name: 'languages',
    displayName: 'Languages',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'Boolean',
        value: 'boolean',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'languages',
        value:
          '={{ typeof $parameter.languages_json !== "undefined" ? JSON.parse($parameter.languages_json) : typeof $parameter.languages_boolean !== "undefined" ? $parameter.languages_boolean : undefined }}',
      },
    },
    displayOptions: {
      show: {
        configuration_object: ['languages'],
        resource: ['configurations'],
        operation: ['updateConfig'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Languages (Array)',
    name: 'languages_json',
    default: '[]',
    description: 'Languages for which to deduplicate singular and plural forms.',
    required: false,
    displayOptions: {
      show: {
        configuration_object: ['languages'],
        languages: ['array'],
        resource: ['configurations'],
        operation: ['updateConfig'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description: 'If true, deduplication is enabled for all languages.',
    displayName: 'Languages (Boolean)',
    name: 'languages_boolean',
    displayOptions: {
      show: {
        configuration_object: ['languages'],
        languages: ['boolean'],
        resource: ['configurations'],
        operation: ['updateConfig'],
      },
    },
  },
  {
    type: 'options',
    name: 'exclude',
    displayName: 'Exclude',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'Null',
        value: 'null',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'exclude',
        value:
          '={{ typeof $parameter.exclude_json !== "undefined" ? JSON.parse($parameter.exclude_json) : typeof $parameter.exclude_null !== "undefined" ? JSON.parse($parameter.exclude_null) : undefined }}',
      },
    },
    displayOptions: {
      show: {
        configuration_object: ['exclude'],
        resource: ['configurations'],
        operation: ['updateConfig'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Exclude (Array)',
    name: 'exclude_json',
    default: '[]',
    description: undefined,
    required: false,
    displayOptions: {
      show: {
        configuration_object: ['exclude'],
        exclude: ['array'],
        resource: ['configurations'],
        operation: ['updateConfig'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Exclude (Null)',
    name: 'exclude_null',
    default: 'null',
    description: undefined,
    required: false,
    disabledOptions: {
      show: {
        exclude: ['null'],
      },
    },
    displayOptions: {
      show: {
        configuration_object: ['exclude'],
        exclude: ['null'],
        resource: ['configurations'],
        operation: ['updateConfig'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description: 'Whether to turn on personalized query suggestions.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'enablePersonalization',
      },
    },
    displayName: 'Enable Personalization',
    name: 'enablePersonalization_boolean',
    displayOptions: {
      show: {
        configuration_object: ['enablePersonalization_boolean'],
        resource: ['configurations'],
        operation: ['updateConfig'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description: 'Whether to include suggestions with special characters.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'allowSpecialCharacters',
      },
    },
    displayName: 'Allow Special Characters',
    name: 'allowSpecialCharacters_boolean',
    displayOptions: {
      show: {
        configuration_object: ['allowSpecialCharacters_boolean'],
        resource: ['configurations'],
        operation: ['updateConfig'],
      },
    },
  },
  {
    type: 'options',
    placeholder: 'ALGOLIA_INDEX_NAME',
    default: '',
    description: 'Name of the Query Suggestions index (case-sensitive).',
    displayName: 'Index Name',
    name: 'indexName_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['configurations'],
        operation: ['deleteConfig'],
      },
    },
    typeOptions: {
      loadOptions: {
        routing: {
          request: {
            method: 'GET',
            url: '/1/indexes',
          },
          output: {
            postReceive: [
              {
                type: 'rootProperty',
                properties: {
                  property: 'items',
                },
              },
              {
                type: 'setKeyValue',
                properties: {
                  name: '={{ $responseItem.name }}',
                  value: '={{ $responseItem.name }}',
                },
              },
            ],
          },
        },
      },
    },
  },
  {
    type: 'options',
    placeholder: 'ALGOLIA_INDEX_NAME',
    default: '',
    description: 'Name of the Query Suggestions index (case-sensitive).',
    displayName: 'Index Name',
    name: 'indexName_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['configurations'],
        operation: ['getConfigStatus'],
      },
    },
    typeOptions: {
      loadOptions: {
        routing: {
          request: {
            method: 'GET',
            url: '/1/indexes',
          },
          output: {
            postReceive: [
              {
                type: 'rootProperty',
                properties: {
                  property: 'items',
                },
              },
              {
                type: 'setKeyValue',
                properties: {
                  name: '={{ $responseItem.name }}',
                  value: '={{ $responseItem.name }}',
                },
              },
            ],
          },
        },
      },
    },
  },
  {
    type: 'options',
    placeholder: 'ALGOLIA_INDEX_NAME',
    default: '',
    description: 'Name of the Query Suggestions index (case-sensitive).',
    displayName: 'Index Name',
    name: 'indexName_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['logs'],
        operation: ['getLogFile'],
      },
    },
    typeOptions: {
      loadOptions: {
        routing: {
          request: {
            method: 'GET',
            url: '/1/indexes',
          },
          output: {
            postReceive: [
              {
                type: 'rootProperty',
                properties: {
                  property: 'items',
                },
              },
              {
                type: 'setKeyValue',
                properties: {
                  name: '={{ $responseItem.name }}',
                  value: '={{ $responseItem.name }}',
                },
              },
            ],
          },
        },
      },
    },
  },
];

export default properties;
