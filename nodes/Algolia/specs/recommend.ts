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
        name: 'recommendations',
        value: 'recommendations',
        description: 'Retrieve recommendations from a pre-trained AI model',
      },
      {
        name: 'rules',
        value: 'rules',
        description: 'Curate your recommendations with rules, which are _if_-_then_ statements',
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
        name: 'Retrieve recommendations',
        value: 'getRecommendations',
        action: 'Retrieve recommendations',
        description: 'Retrieves recommendations from selected AI models.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/indexes/*/recommendations',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['recommendations'],
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
        name: 'Retrieve a rule',
        value: 'getRecommendRule',
        action: 'Retrieve a rule',
        description:
          'Retrieves a Recommend rule that you previously created in the Algolia dashboard.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/{{ $parameter.model_options }}/recommend/rules/{{ $parameter.objectID_string }}',
          },
        },
      },
      {
        name: 'Delete a rule',
        value: 'deleteRecommendRule',
        action: 'Delete a rule',
        description: 'Deletes a Recommend rule from a recommendation scenario.',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/{{ $parameter.model_options }}/recommend/rules/{{ $parameter.objectID_string }}',
          },
        },
      },
      {
        name: 'Check task status',
        value: 'getRecommendStatus',
        action: 'Check task status',
        description: 'Checks the status of a given task.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/{{ $parameter.model_options }}/task/{{ $parameter.taskID_number }}',
          },
        },
      },
      {
        name: 'Search for rules',
        value: 'searchRecommendRules',
        action: 'Search for rules',
        description: 'Searches for Recommend rules.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/{{ $parameter.model_options }}/recommend/rules/search',
          },
        },
      },
      {
        name: 'Create or update a batch of Recommend Rules',
        value: 'batchRecommendRules',
        action: 'Create or update a batch of Recommend Rules',
        description: 'Create or update a batch of Recommend Rules',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/{{ $parameter.model_options }}/recommend/rules/batch',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['rules'],
      },
    },
  },
  {
    displayName: 'Get Recommendations Params',
    name: 'get_recommendations_params_object',
    type: 'multiOptions',
    description: 'Recommend request body.',
    required: true,
    default: [],
    options: [
      {
        name: 'Requests',
        value: 'requests_json',
      },
    ],
    displayOptions: {
      show: {
        resource: ['recommendations'],
        operation: ['getRecommendations'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Requests',
    name: 'requests_json',
    default: '[]',
    description: 'Recommendation request with parameters depending on the requested model.',
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
        get_recommendations_params_object: ['requests_json'],
        resource: ['recommendations'],
        operation: ['getRecommendations'],
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
    displayOptions: {
      show: {
        resource: ['rules'],
        operation: ['getRecommendRule'],
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
    default: '',
    options: [
      {
        name: 'related-products',
        value: 'related-products',
      },
      {
        name: 'bought-together',
        value: 'bought-together',
      },
      {
        name: 'trending-facets',
        value: 'trending-facets',
      },
      {
        name: 'trending-items',
        value: 'trending-items',
      },
    ],
    displayName: 'Model',
    name: 'model_options',
    required: true,
    displayOptions: {
      show: {
        resource: ['rules'],
        operation: ['getRecommendRule'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'test-record-123',
    default: '',
    description: 'Unique record identifier.',
    displayName: 'Object ID',
    name: 'objectID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['rules'],
        operation: ['getRecommendRule'],
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
    displayOptions: {
      show: {
        resource: ['rules'],
        operation: ['deleteRecommendRule'],
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
    default: '',
    options: [
      {
        name: 'related-products',
        value: 'related-products',
      },
      {
        name: 'bought-together',
        value: 'bought-together',
      },
      {
        name: 'trending-facets',
        value: 'trending-facets',
      },
      {
        name: 'trending-items',
        value: 'trending-items',
      },
    ],
    displayName: 'Model',
    name: 'model_options',
    required: true,
    displayOptions: {
      show: {
        resource: ['rules'],
        operation: ['deleteRecommendRule'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'test-record-123',
    default: '',
    description: 'Unique record identifier.',
    displayName: 'Object ID',
    name: 'objectID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['rules'],
        operation: ['deleteRecommendRule'],
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
    displayOptions: {
      show: {
        resource: ['rules'],
        operation: ['getRecommendStatus'],
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
    default: '',
    options: [
      {
        name: 'related-products',
        value: 'related-products',
      },
      {
        name: 'bought-together',
        value: 'bought-together',
      },
      {
        name: 'trending-facets',
        value: 'trending-facets',
      },
      {
        name: 'trending-items',
        value: 'trending-items',
      },
    ],
    displayName: 'Model',
    name: 'model_options',
    required: true,
    displayOptions: {
      show: {
        resource: ['rules'],
        operation: ['getRecommendStatus'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '1514562690001',
    default: '',
    description:
      "Unique identifier of a task.\n\nA successful API response means that a task was added to a queue.\nIt might not run immediately.\nYou can check the task's progress with the [`task` operation](https://www.algolia.com/doc/rest-api/search/get-task) and this task ID.\n",
    displayName: 'Task ID',
    name: 'taskID_number',
    required: true,
    displayOptions: {
      show: {
        resource: ['rules'],
        operation: ['getRecommendStatus'],
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
    displayOptions: {
      show: {
        resource: ['rules'],
        operation: ['searchRecommendRules'],
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
    default: '',
    options: [
      {
        name: 'related-products',
        value: 'related-products',
      },
      {
        name: 'bought-together',
        value: 'bought-together',
      },
      {
        name: 'trending-facets',
        value: 'trending-facets',
      },
      {
        name: 'trending-items',
        value: 'trending-items',
      },
    ],
    displayName: 'Model',
    name: 'model_options',
    required: true,
    displayOptions: {
      show: {
        resource: ['rules'],
        operation: ['searchRecommendRules'],
      },
    },
  },
  {
    displayName: 'Search Recommend Rules Params',
    name: 'search_recommend_rules_params_object',
    type: 'multiOptions',
    description: 'Recommend rules parameters.',
    required: false,
    default: [],
    options: [
      {
        name: 'Query',
        value: 'query_string',
      },
      {
        name: 'Context',
        value: 'context_string',
      },
      {
        name: 'Page',
        value: 'page_number',
      },
      {
        name: 'Hits Per Page',
        value: 'hitsPerPage_number',
      },
      {
        name: 'Enabled',
        value: 'enabled_boolean',
      },
      {
        name: 'Filters',
        value: 'filters_string',
      },
      {
        name: 'Facets',
        value: 'facets_json',
      },
      {
        name: 'Max Values Per Facet',
        value: 'maxValuesPerFacet_number',
      },
    ],
    displayOptions: {
      show: {
        resource: ['rules'],
        operation: ['searchRecommendRules'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Search query.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'query',
      },
    },
    displayName: 'Query',
    name: 'query_string',
    displayOptions: {
      show: {
        search_recommend_rules_params_object: ['query_string'],
        resource: ['rules'],
        operation: ['searchRecommendRules'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'mobile',
    default: '',
    description: 'Only search for rules with matching context.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'context',
      },
    },
    displayName: 'Context',
    name: 'context_string',
    displayOptions: {
      show: {
        search_recommend_rules_params_object: ['context_string'],
        resource: ['rules'],
        operation: ['searchRecommendRules'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description:
      'Requested page of the API response.\n\nAlgolia uses `page` and `hitsPerPage` to control how search results are displayed ([paginated](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/pagination/js)).\n\n- `hitsPerPage`: sets the number of search results (_hits_) displayed per page.\n- `page`: specifies the page number of the search results you want to retrieve. Page numbering starts at 0, so the first page is `page=0`, the second is `page=1`, and so on.\n\nFor example, to display 10 results per page starting from the third page, set `hitsPerPage` to 10 and `page` to 2.\n',
    typeOptions: {
      minValue: 0,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'page',
      },
    },
    displayName: 'Page',
    name: 'page_number',
    displayOptions: {
      show: {
        search_recommend_rules_params_object: ['page_number'],
        resource: ['rules'],
        operation: ['searchRecommendRules'],
      },
    },
  },
  {
    type: 'number',
    default: 20,
    description:
      'Maximum number of hits per page.\n\nAlgolia uses `page` and `hitsPerPage` to control how search results are displayed ([paginated](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/pagination/js)).\n\n- `hitsPerPage`: sets the number of search results (_hits_) displayed per page.\n- `page`: specifies the page number of the search results you want to retrieve. Page numbering starts at 0, so the first page is `page=0`, the second is `page=1`, and so on.\n\nFor example, to display 10 results per page starting from the third page, set `hitsPerPage` to 10 and `page` to 2.\n',
    typeOptions: {
      minValue: 1,
      maxValue: 1000,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'hitsPerPage',
      },
    },
    displayName: 'Hits Per Page',
    name: 'hitsPerPage_number',
    displayOptions: {
      show: {
        search_recommend_rules_params_object: ['hitsPerPage_number'],
        resource: ['rules'],
        operation: ['searchRecommendRules'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      'Whether to only show rules where the value of their `enabled` property matches this parameter.\nIf absent, show all rules, regardless of their `enabled` property.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'enabled',
      },
    },
    displayName: 'Enabled',
    name: 'enabled_boolean',
    displayOptions: {
      show: {
        search_recommend_rules_params_object: ['enabled_boolean'],
        resource: ['rules'],
        operation: ['searchRecommendRules'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'objectID:rr-123456',
    default: '',
    description: 'Filter expression. This only searches for rules matching the filter expression.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'filters',
      },
    },
    displayName: 'Filters',
    name: 'filters_string',
    displayOptions: {
      show: {
        search_recommend_rules_params_object: ['filters_string'],
        resource: ['rules'],
        operation: ['searchRecommendRules'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Facets',
    name: 'facets_json',
    default: '[]',
    description:
      "Include facets and facet values in the response. Use `['*']` to include all facets.",
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'facets',
      },
    },
    displayOptions: {
      show: {
        search_recommend_rules_params_object: ['facets_json'],
        resource: ['rules'],
        operation: ['searchRecommendRules'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description: 'Maximum number of values to return for each facet.',
    typeOptions: {
      minValue: 1,
      maxValue: 1000,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'maxValuesPerFacet',
      },
    },
    displayName: 'Max Values Per Facet',
    name: 'maxValuesPerFacet_number',
    displayOptions: {
      show: {
        search_recommend_rules_params_object: ['maxValuesPerFacet_number'],
        resource: ['rules'],
        operation: ['searchRecommendRules'],
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
    displayOptions: {
      show: {
        resource: ['rules'],
        operation: ['batchRecommendRules'],
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
    default: '',
    options: [
      {
        name: 'related-products',
        value: 'related-products',
      },
      {
        name: 'bought-together',
        value: 'bought-together',
      },
      {
        name: 'trending-facets',
        value: 'trending-facets',
      },
      {
        name: 'trending-items',
        value: 'trending-items',
      },
    ],
    displayName: 'Model',
    name: 'model_options',
    required: true,
    displayOptions: {
      show: {
        resource: ['rules'],
        operation: ['batchRecommendRules'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Body',
    name: 'body',
    default: '[]',
    description: 'Recommend rules.',
    required: false,
    routing: {
      request: {
        body: '={{ JSON.parse($value) }}',
      },
    },
    displayOptions: {
      show: {
        resource: ['rules'],
        operation: ['batchRecommendRules'],
      },
    },
  },
];

export default properties;
