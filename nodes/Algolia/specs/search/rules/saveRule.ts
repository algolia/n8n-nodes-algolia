import { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = [
  {
    type: 'json',
    description:
      'Effect of the rule.\n\nFor more information, see [Consequences](https://www.algolia.com/doc/guides/managing-results/rules/rules-overview/#consequences).\n',
    required: true,
    default: '{}',
    routing: {
      send: {
        type: 'body',
        property: 'consequence',
        value: '={{ JSON.parse($value) }}',
      },
    },
    displayName: 'Consequence',
    name: 'consequence_object',
    displayOptions: {
      show: {
        resource: ['Rules'],
        operation: ['saveRule'],
      },
    },
  },
  {
    type: 'options',
    placeholder: 'ALGOLIA_INDEX_NAME',
    default: '',
    displayName: 'Index Name',
    name: 'indexName_string',
    required: true,
    description: 'Name of the index on which to perform the operation.',
    displayOptions: {
      show: {
        resource: ['Rules'],
        operation: ['saveRule'],
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
    type: 'string',
    default: '',
    description: 'Unique identifier of a rule object.',
    displayName: 'Object ID',
    name: 'objectID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Rules'],
        operation: ['saveRule'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Unique identifier of a rule object.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'objectID',
      },
    },
    displayName: 'Object ID',
    name: 'objectID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Rules'],
        operation: ['saveRule'],
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
        type: 'json',
        displayName: 'Conditions',
        name: 'conditions_json',
        default: '[]',
        description:
          "Conditions that trigger a rule.\n\nSome consequences require specific conditions or don't require any condition.\nFor more information, see [Conditions](https://www.algolia.com/doc/guides/managing-results/rules/rules-overview/#conditions).\n",
        required: false,
      },
      {
        type: 'string',
        placeholder: 'Display a promotional banner',
        default: '',
        description:
          "Description of the rule's purpose to help you distinguish between different rules.",
        displayName: 'Description',
        name: 'description_string',
      },
      {
        type: 'boolean',
        default: true,
        description: 'Whether the rule is active.',
        displayName: 'Enabled',
        name: 'enabled_boolean',
      },
      {
        type: 'json',
        displayName: 'Validity',
        name: 'validity_json',
        default: '[]',
        description: 'Time periods when the rule is active.',
        required: false,
      },
      {
        type: 'json',
        displayName: 'Tags',
        name: 'tags_json',
        default: '[]',
        description: undefined,
        required: false,
      },
      {
        type: 'string',
        default: '',
        displayName: 'Scope',
        name: 'scope_string',
      },
    ],
    routing: {
      request: {
        body: {
          conditions: '={{ JSON.parse($value.conditions_json) }}',
          description: '={{ $value.description_string }}',
          enabled: '={{ $value.enabled_boolean }}',
          validity: '={{ JSON.parse($value.validity_json) }}',
          tags: '={{ JSON.parse($value.tags_json) }}',
          scope: '={{ $value.scope_string }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Rules'],
        operation: ['saveRule'],
      },
    },
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add option',
    default: {},
    required: false,
    options: [
      {
        type: 'boolean',
        default: false,
        displayName: 'Forward To Replicas',
        name: 'forwardToReplicas_boolean',
        description: 'Whether changes are applied to replica indices.',
      },
    ],
    routing: {
      request: {
        qs: {
          forwardToReplicas: '={{ $value.forwardToReplicas_boolean }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Rules'],
        operation: ['saveRule'],
      },
    },
  },
];

export default properties;
