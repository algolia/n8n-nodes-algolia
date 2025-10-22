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
        name: 'Advanced',
        value: 'Advanced',
        description: 'Advanced endpoints to manage tasks',
      },
      {
        name: 'Composition Rules',
        value: 'Composition Rules',
        description: 'Manage your compositions rules',
      },
      {
        name: 'Compositions',
        value: 'Compositions',
        description: 'Manage your compositions and composition settings',
      },
      {
        name: 'Search',
        value: 'Search',
        description: 'Search one or more indices for matching records or facet values',
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
        name: 'Run a Composition',
        value: 'search',
        action: 'Run a Composition',
        description: 'Runs a query on a single composition and returns matching results.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/compositions/{{ $parameter.compositionID_string }}/run',
          },
        },
      },
      {
        name: 'Search for facet values',
        value: 'searchForFacetValues',
        action: 'Search for facet values',
        description:
          "Searches for values of a specified facet attribute on the composition's main source's index.",
        routing: {
          request: {
            method: 'POST',
            url: '=/1/compositions/{{ $parameter.compositionID_string }}/facets/{{ $parameter.facetName_string }}/query',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['Search'],
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
        name: 'List compositions',
        value: 'listCompositions',
        action: 'List compositions',
        description: 'Lists all compositions in the current Algolia application.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/compositions',
          },
        },
      },
      {
        name: 'Retrieve a composition',
        value: 'getComposition',
        action: 'Retrieve a composition',
        description: 'Retrieve a single composition in the current Algolia application.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/compositions/{{ $parameter.compositionID_string }}',
          },
        },
      },
      {
        name: 'Upsert a composition',
        value: 'putComposition',
        action: 'Upsert a composition',
        description: 'Upsert a composition in the current Algolia application.',
        routing: {
          request: {
            method: 'PUT',
            url: '=/1/compositions/{{ $parameter.compositionID_string }}',
          },
        },
      },
      {
        name: 'Delete a composition',
        value: 'deleteComposition',
        action: 'Delete a composition',
        description: 'Delete a composition from the current Algolia application.',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/1/compositions/{{ $parameter.compositionID_string }}',
          },
        },
      },
      {
        name: 'Batch action to multiple compositions',
        value: 'multipleBatch',
        action: 'Batch action to multiple compositions',
        description: 'Adds, updates, or deletes compositions with a single API request.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/compositions/*/batch',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['Compositions'],
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
        value: 'getRule',
        action: 'Retrieve a rule',
        description: 'Retrieves a rule by its ID.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/compositions/{{ $parameter.compositionID_string }}/rules/{{ $parameter.objectID_string }}',
          },
        },
      },
      {
        name: 'Add or update a composition rule',
        value: 'putCompositionRule',
        action: 'Add or update a composition rule',
        description: 'If a composition rule with the provided ID already exists,',
        routing: {
          request: {
            method: 'PUT',
            url: '=/1/compositions/{{ $parameter.compositionID_string }}/rules/{{ $parameter.objectID_string }}',
          },
        },
      },
      {
        name: 'Delete a Composition Rule',
        value: 'deleteCompositionRule',
        action: 'Delete a Composition Rule',
        description: 'Delete a Composition Rule from the specified Composition ID.',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/1/compositions/{{ $parameter.compositionID_string }}/rules/{{ $parameter.objectID_string }}',
          },
        },
      },
      {
        name: 'Create or update or delete composition rules',
        value: 'saveRules',
        action: 'Create or update or delete composition rules',
        description: 'Create or update or delete multiple composition rules.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/compositions/{{ $parameter.compositionID_string }}/rules/batch',
          },
        },
      },
      {
        name: 'Search for composition rules',
        value: 'searchCompositionRules',
        action: 'Search for composition rules',
        description: 'Searches for composition rules in your index.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/compositions/{{ $parameter.compositionID_string }}/rules/search',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['Composition Rules'],
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
        name: 'Check task status',
        value: 'getTask',
        action: 'Check task status',
        description: 'Checks the status of a given task.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/compositions/{{ $parameter.compositionID_string }}/task/{{ $parameter.taskID_number }}',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['Advanced'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'my_composition_object_id',
    default: '',
    description: 'Composition unique identifier.',
    displayName: 'Composition ID',
    name: 'compositionID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    displayName: 'Request Body',
    name: 'request_body_object',
    type: 'multiOptions',
    description: undefined,
    required: false,
    default: [],
    options: [
      {
        name: 'Run Composition Parameters As Object',
        value: 'run_composition_parameters_as_object_object',
      },
    ],
    displayOptions: {
      show: {
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    displayName: 'Run Composition Parameters As Object',
    name: 'run_composition_parameters_as_object_object',
    type: 'multiOptions',
    description: undefined,
    required: false,
    default: [],
    options: [
      {
        name: 'Query',
        value: 'query_string_params',
      },
      {
        name: 'Filters',
        value: 'filters_string_params',
      },
      {
        name: 'Page',
        value: 'page_number_params',
      },
      {
        name: 'Get Ranking Info',
        value: 'getRankingInfo_boolean_params',
      },
      {
        name: 'Relevancy Strictness',
        value: 'relevancyStrictness_number_params',
      },
      {
        name: 'Facets',
        value: 'facets_json_params',
      },
      {
        name: 'Facet Filters',
        value: 'facetFilters_params',
      },
      {
        name: 'Optional Filters',
        value: 'optionalFilters_params',
      },
      {
        name: 'Numeric Filters',
        value: 'numericFilters_params',
      },
      {
        name: 'Hits Per Page',
        value: 'hitsPerPage_number_params',
      },
      {
        name: 'Around Lat Lng',
        value: 'aroundLatLng_string_params',
      },
      {
        name: 'Around Lat Lng Via IP',
        value: 'aroundLatLngViaIP_boolean_params',
      },
      {
        name: 'Around Radius',
        value: 'aroundRadius_params',
      },
      {
        name: 'Around Precision',
        value: 'aroundPrecision_params',
      },
      {
        name: 'Minimum Around Radius',
        value: 'minimumAroundRadius_number_params',
      },
      {
        name: 'Inside Bounding Box',
        value: 'insideBoundingBox_params',
      },
      {
        name: 'Inside Polygon',
        value: 'insidePolygon_json_params',
      },
      {
        name: 'Query Languages',
        value: 'queryLanguages_json_params',
      },
      {
        name: 'Natural Languages',
        value: 'naturalLanguages_json_params',
      },
      {
        name: 'Enable Rules',
        value: 'enableRules_boolean_params',
      },
      {
        name: 'Rule Contexts',
        value: 'ruleContexts_json_params',
      },
      {
        name: 'User Token',
        value: 'userToken_string_params',
      },
      {
        name: 'Click Analytics',
        value: 'clickAnalytics_boolean_params',
      },
      {
        name: 'Analytics',
        value: 'analytics_boolean_params',
      },
      {
        name: 'Analytics Tags',
        value: 'analyticsTags_json_params',
      },
      {
        name: 'Enable ABTest',
        value: 'enableABTest_boolean_params',
      },
      {
        name: 'Enable Re Ranking',
        value: 'enableReRanking_boolean_params',
      },
      {
        name: 'Injected Items',
        value: 'injected_items_object_params',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'params',
        value:
          '={{ { "query": typeof $parameter.query_string_params !== "undefined" ? $parameter.query_string_params : undefined, "filters": typeof $parameter.filters_string_params !== "undefined" ? $parameter.filters_string_params : undefined, "page": typeof $parameter.page_number_params !== "undefined" ? $parameter.page_number_params : undefined, "getRankingInfo": typeof $parameter.getRankingInfo_boolean_params !== "undefined" ? $parameter.getRankingInfo_boolean_params : undefined, "relevancyStrictness": typeof $parameter.relevancyStrictness_number_params !== "undefined" ? $parameter.relevancyStrictness_number_params : undefined, "facets": typeof $parameter.facets_json_params !== "undefined" ? JSON.parse($parameter.facets_json_params) : undefined, "facetFilters": typeof $parameter.facetFilters_json_params !== "undefined" ? JSON.parse($parameter.facetFilters_json_params) : typeof $parameter.facetFilters_string_params !== "undefined" ? $parameter.facetFilters_string_params : undefined, "optionalFilters": typeof $parameter.optionalFilters_json_params !== "undefined" ? JSON.parse($parameter.optionalFilters_json_params) : typeof $parameter.optionalFilters_string_params !== "undefined" ? $parameter.optionalFilters_string_params : undefined, "numericFilters": typeof $parameter.numericFilters_json_params !== "undefined" ? JSON.parse($parameter.numericFilters_json_params) : typeof $parameter.numericFilters_string_params !== "undefined" ? $parameter.numericFilters_string_params : undefined, "hitsPerPage": typeof $parameter.hitsPerPage_number_params !== "undefined" ? $parameter.hitsPerPage_number_params : undefined, "aroundLatLng": typeof $parameter.aroundLatLng_string_params !== "undefined" ? $parameter.aroundLatLng_string_params : undefined, "aroundLatLngViaIP": typeof $parameter.aroundLatLngViaIP_boolean_params !== "undefined" ? $parameter.aroundLatLngViaIP_boolean_params : undefined, "aroundRadius": typeof $parameter.aroundRadius_number_params !== "undefined" ? $parameter.aroundRadius_number_params : typeof $parameter.aroundRadius_options_params !== "undefined" ? $parameter.aroundRadius_options_params : undefined, "aroundPrecision": typeof $parameter.aroundPrecision_number_params !== "undefined" ? $parameter.aroundPrecision_number_params : typeof $parameter.aroundPrecision_json_params !== "undefined" ? JSON.parse($parameter.aroundPrecision_json_params) : undefined, "minimumAroundRadius": typeof $parameter.minimumAroundRadius_number_params !== "undefined" ? $parameter.minimumAroundRadius_number_params : undefined, "insideBoundingBox": typeof $parameter.insideBoundingBox_string_params !== "undefined" ? $parameter.insideBoundingBox_string_params : typeof $parameter.insideBoundingBox_null_params !== "undefined" ? JSON.parse($parameter.insideBoundingBox_null_params) : typeof $parameter.insideBoundingBox_json_params !== "undefined" ? JSON.parse($parameter.insideBoundingBox_json_params) : undefined, "insidePolygon": typeof $parameter.insidePolygon_json_params !== "undefined" ? JSON.parse($parameter.insidePolygon_json_params) : undefined, "queryLanguages": typeof $parameter.queryLanguages_json_params !== "undefined" ? JSON.parse($parameter.queryLanguages_json_params) : undefined, "naturalLanguages": typeof $parameter.naturalLanguages_json_params !== "undefined" ? JSON.parse($parameter.naturalLanguages_json_params) : undefined, "enableRules": typeof $parameter.enableRules_boolean_params !== "undefined" ? $parameter.enableRules_boolean_params : undefined, "ruleContexts": typeof $parameter.ruleContexts_json_params !== "undefined" ? JSON.parse($parameter.ruleContexts_json_params) : undefined, "userToken": typeof $parameter.userToken_string_params !== "undefined" ? $parameter.userToken_string_params : undefined, "clickAnalytics": typeof $parameter.clickAnalytics_boolean_params !== "undefined" ? $parameter.clickAnalytics_boolean_params : undefined, "analytics": typeof $parameter.analytics_boolean_params !== "undefined" ? $parameter.analytics_boolean_params : undefined, "analyticsTags": typeof $parameter.analyticsTags_json_params !== "undefined" ? JSON.parse($parameter.analyticsTags_json_params) : undefined, "enableABTest": typeof $parameter.enableABTest_boolean_params !== "undefined" ? $parameter.enableABTest_boolean_params : undefined, "enableReRanking": typeof $parameter.enableReRanking_boolean_params !== "undefined" ? $parameter.enableReRanking_boolean_params : undefined, "injectedItems": typeof $parameter.injected_items_object_params !== "undefined" ? JSON.parse($parameter.injected_items_object_params) : undefined } }}',
      },
    },
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Search query.',
    displayName: 'Query',
    name: 'query_string_params',
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['query_string_params'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '(category:Book OR category:Ebook) AND _tags:published',
    default: '',
    description:
      "Filter expression to only include items that match the filter criteria in the response.\n\nYou can use these filter expressions:\n\n- **Numeric filters.** `<facet> <op> <number>`, where `<op>` is one of `<`, `<=`, `=`, `!=`, `>`, `>=`.\n- **Ranges.** `<facet>:<lower> TO <upper>` where `<lower>` and `<upper>` are the lower and upper limits of the range (inclusive).\n- **Facet filters.** `<facet>:<value>` where `<facet>` is a facet attribute (case-sensitive) and `<value>` a facet value.\n- **Tag filters.** `_tags:<value>` or just `<value>` (case-sensitive).\n- **Boolean filters.** `<facet>: true | false`.\n\nYou can combine filters with `AND`, `OR`, and `NOT` operators with the following restrictions:\n\n- You can only combine filters of the same type with `OR`.\n  **Not supported:** `facet:value OR num > 3`.\n- You can't use `NOT` with combinations of filters.\n  **Not supported:** `NOT(facet:value OR facet:value)`\n- You can't combine conjunctions (`AND`) with `OR`.\n  **Not supported:** `facet:value OR (facet:value AND facet:value)`\n\nUse quotes around your filters, if the facet attribute name or facet value has spaces, keywords (`OR`, `AND`, `NOT`), or quotes.\nIf a facet attribute is an array, the filter matches if it matches at least one element of the array.\n\nFor more information, see [Filters](https://www.algolia.com/doc/guides/managing-results/refine-results/filtering).\n",
    displayName: 'Filters',
    name: 'filters_string_params',
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['filters_string_params'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description: 'Page of search results to retrieve.',
    typeOptions: {
      minValue: 0,
    },
    displayName: 'Page',
    name: 'page_number_params',
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['page_number_params'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description: 'Whether the run response should include detailed ranking information.',
    displayName: 'Get Ranking Info',
    name: 'getRankingInfo_boolean_params',
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['getRankingInfo_boolean_params'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '90',
    default: 100,
    description:
      "Relevancy threshold below which less relevant results aren't included in the results\nYou can only set `relevancyStrictness` on [virtual replica indices](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/in-depth/replicas/#what-are-virtual-replicas).\nUse this setting to strike a balance between the relevance and number of returned results.\n",
    displayName: 'Relevancy Strictness',
    name: 'relevancyStrictness_number_params',
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['relevancyStrictness_number_params'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Facets',
    name: 'facets_json_params',
    default: '[]',
    description:
      'Facets for which to retrieve facet values that match the search criteria and the number of matching facet values\nTo retrieve all facets, use the wildcard character `*`.\nFor more information, see [facets](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/#contextual-facet-values-and-counts).\n',
    required: false,
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['facets_json_params'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'options',
    name: 'facetFilters_params',
    displayName: 'Facet Filters',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'String',
        value: 'string',
      },
    ],
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['facetFilters_params'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Facet Filters (Array)',
    name: 'facetFilters_json_params',
    default: '[]',
    description: undefined,
    required: false,
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['facetFilters_params'],
        facetFilters_params: ['array'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    displayName: 'Facet Filters (String)',
    name: 'facetFilters_string_params',
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['facetFilters_params'],
        facetFilters_params: ['string'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'options',
    name: 'optionalFilters_params',
    displayName: 'Optional Filters',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'String',
        value: 'string',
      },
    ],
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['optionalFilters_params'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Optional Filters (Array)',
    name: 'optionalFilters_json_params',
    default: '[]',
    description: undefined,
    required: false,
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['optionalFilters_params'],
        optionalFilters_params: ['array'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    displayName: 'Optional Filters (String)',
    name: 'optionalFilters_string_params',
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['optionalFilters_params'],
        optionalFilters_params: ['string'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'options',
    name: 'numericFilters_params',
    displayName: 'Numeric Filters',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'String',
        value: 'string',
      },
    ],
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['numericFilters_params'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Numeric Filters (Array)',
    name: 'numericFilters_json_params',
    default: '[]',
    description: undefined,
    required: false,
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['numericFilters_params'],
        numericFilters_params: ['array'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    displayName: 'Numeric Filters (String)',
    name: 'numericFilters_string_params',
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['numericFilters_params'],
        numericFilters_params: ['string'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'number',
    default: 20,
    description: 'Number of hits per page.',
    typeOptions: {
      minValue: 1,
      maxValue: 1000,
    },
    displayName: 'Hits Per Page',
    name: 'hitsPerPage_number_params',
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['hitsPerPage_number_params'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '40.71,-74.01',
    default: '',
    description:
      'Coordinates for the center of a circle, expressed as a comma-separated string of latitude and longitude.\n\nOnly records included within a circle around this central location are included in the results.\nThe radius of the circle is determined by the `aroundRadius` and `minimumAroundRadius` settings.\nThis parameter is ignored if you also specify `insidePolygon` or `insideBoundingBox`.\n',
    displayName: 'Around Lat Lng',
    name: 'aroundLatLng_string_params',
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['aroundLatLng_string_params'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description: "Whether to obtain the coordinates from the request's IP address.",
    displayName: 'Around Lat Lng Via IP',
    name: 'aroundLatLngViaIP_boolean_params',
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['aroundLatLngViaIP_boolean_params'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'options',
    name: 'aroundRadius_params',
    displayName: 'Around Radius',
    default: '',
    options: [
      {
        name: 'Integer',
        value: 'integer',
      },
      {
        name: 'All',
        value: 'all',
      },
    ],
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['aroundRadius_params'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description: 'Maximum search radius around a central location in meters.',
    typeOptions: {
      minValue: 1,
    },
    displayName: 'Around Radius (Integer)',
    name: 'aroundRadius_number_params',
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['aroundRadius_params'],
        aroundRadius_params: ['integer'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description: "Return all records with a valid `_geoloc` attribute. Don't filter by distance.",
    options: [
      {
        name: 'all',
        value: 'all',
      },
    ],
    displayName: 'Around Radius (All)',
    name: 'aroundRadius_options_params',
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['aroundRadius_params'],
        aroundRadius_params: ['all'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'options',
    name: 'aroundPrecision_params',
    displayName: 'Around Precision',
    default: '',
    options: [
      {
        name: 'Integer',
        value: 'integer',
      },
      {
        name: 'Range objects',
        value: 'range_objects',
      },
    ],
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['aroundPrecision_params'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'number',
    default: 10,
    description:
      'Distance in meters to group results by similar distances.\n\nFor example, if you set `aroundPrecision` to 100, records wihin 100 meters to the central coordinate are considered to have the same distance,\nas are records between 100 and 199 meters.\n',
    displayName: 'Around Precision (Integer)',
    name: 'aroundPrecision_number_params',
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['aroundPrecision_params'],
        aroundPrecision_params: ['integer'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Around Precision (Range Objects)',
    name: 'aroundPrecision_json_params',
    default: '[]',
    description: undefined,
    required: false,
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['aroundPrecision_params'],
        aroundPrecision_params: ['range_objects'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description:
      "Minimum radius (in meters) for a search around a location when `aroundRadius` isn't set.",
    typeOptions: {
      minValue: 1,
    },
    displayName: 'Minimum Around Radius',
    name: 'minimumAroundRadius_number_params',
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['minimumAroundRadius_number_params'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'options',
    name: 'insideBoundingBox_params',
    displayName: 'Inside Bounding Box',
    default: '',
    options: [
      {
        name: 'String',
        value: 'string',
      },
      {
        name: 'Null',
        value: 'null',
      },
      {
        name: 'Inside bounding box array',
        value: 'inside_bounding_box_array',
      },
    ],
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['insideBoundingBox_params'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    displayName: 'Inside Bounding Box (String)',
    name: 'insideBoundingBox_string_params',
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['insideBoundingBox_params'],
        insideBoundingBox_params: ['string'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Inside Bounding Box (Null)',
    name: 'insideBoundingBox_null_params',
    default: 'null',
    description: undefined,
    required: false,
    disabledOptions: {
      show: {
        insideBoundingBox: ['null'],
      },
    },
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['insideBoundingBox_params'],
        insideBoundingBox_params: ['null'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Inside Bounding Box (Inside Bounding Box Array)',
    name: 'insideBoundingBox_json_params',
    default: '[]',
    description:
      'Coordinates for a rectangular area in which to search.\n\nEach bounding box is defined by the two opposite points of its diagonal, and expressed as latitude and longitude pair:\n`[p1 lat, p1 long, p2 lat, p2 long]`.\nProvide multiple bounding boxes as nested arrays.\nFor more information, see [rectangular area](https://www.algolia.com/doc/guides/managing-results/refine-results/geolocation/#filtering-inside-rectangular-or-polygonal-areas).\n',
    required: false,
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['insideBoundingBox_params'],
        insideBoundingBox_params: ['inside_bounding_box_array'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Inside Polygon',
    name: 'insidePolygon_json_params',
    default: '[]',
    description:
      'Coordinates of a polygon in which to search.\n\nPolygons are defined by 3 to 10,000 points. Each point is represented by its latitude and longitude.\nProvide multiple polygons as nested arrays.\nFor more information, see [filtering inside polygons](https://www.algolia.com/doc/guides/managing-results/refine-results/geolocation/#filtering-inside-rectangular-or-polygonal-areas).\nThis parameter is ignored if you also specify `insideBoundingBox`.\n',
    required: false,
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['insidePolygon_json_params'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Query Languages',
    name: 'queryLanguages_json_params',
    default: '[]',
    description:
      "Languages for language-specific query processing steps such as plurals, stop-word removal, and word-detection dictionaries \nThis setting sets a default list of languages used by the `removeStopWords` and `ignorePlurals` settings.\nThis setting also sets a dictionary for word detection in the logogram-based [CJK](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/normalization/#normalization-for-logogram-based-languages-cjk) languages.\nTo support this, you must place the CJK language **first** \n**You should always specify a query language.**\nIf you don't specify an indexing language, the search engine uses all [supported languages](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/supported-languages),\nor the languages you specified with the `ignorePlurals` or `removeStopWords` parameters.\nThis can lead to unexpected search results.\nFor more information, see [Language-specific configuration](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations).\n",
    required: false,
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['queryLanguages_json_params'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Natural Languages',
    name: 'naturalLanguages_json_params',
    default: '[]',
    description:
      'ISO language codes that adjust settings that are useful for processing natural language queries (as opposed to keyword searches)\n- Sets `removeStopWords` and `ignorePlurals` to the list of provided languages.\n- Sets `removeWordsIfNoResults` to `allOptional`.\n- Adds a `natural_language` attribute to `ruleContexts` and `analyticsTags`.\n',
    required: false,
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['naturalLanguages_json_params'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description: 'Whether to enable composition rules.',
    displayName: 'Enable Rules',
    name: 'enableRules_boolean_params',
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['enableRules_boolean_params'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Rule Contexts',
    name: 'ruleContexts_json_params',
    default: '[]',
    description:
      'Assigns a rule context to the run query\n[Rule contexts](https://www.algolia.com/doc/guides/managing-results/rules/rules-overview/how-to/customize-search-results-by-platform/#whats-a-context) are strings that you can use to trigger matching rules.\n',
    required: false,
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['ruleContexts_json_params'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'test-user-123',
    default: '',
    description:
      'Unique pseudonymous or anonymous user identifier.\n\nThis helps with analytics and click and conversion events.\nFor more information, see [user token](https://www.algolia.com/doc/guides/sending-events/concepts/usertoken).\n',
    displayName: 'User Token',
    name: 'userToken_string_params',
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['userToken_string_params'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      'Whether to include a `queryID` attribute in the response\nThe query ID is a unique identifier for a search query and is required for tracking [click and conversion events](https://www.algolia.com/doc/guides/sending-events/getting-started).\n',
    displayName: 'Click Analytics',
    name: 'clickAnalytics_boolean_params',
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['clickAnalytics_boolean_params'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description: 'Whether this search will be included in Analytics.',
    displayName: 'Analytics',
    name: 'analytics_boolean_params',
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['analytics_boolean_params'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Analytics Tags',
    name: 'analyticsTags_json_params',
    default: '[]',
    description:
      'Tags to apply to the query for [segmenting analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments).',
    required: false,
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['analyticsTags_json_params'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description:
      'Whether to enable index level A/B testing for this run request.\nIf the composition mixes multiple indices, the A/B test is ignored.\n',
    displayName: 'Enable ABTest',
    name: 'enableABTest_boolean_params',
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['enableABTest_boolean_params'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description:
      'Whether this search will use [Dynamic Re-Ranking](https://www.algolia.com/doc/guides/algolia-ai/re-ranking)\nThis setting only has an effect if you activated Dynamic Re-Ranking for this index in the Algolia dashboard.\n',
    displayName: 'Enable Re Ranking',
    name: 'enableReRanking_boolean_params',
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['enableReRanking_boolean_params'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Injected Items',
    name: 'injected_items_object_params',
    description: 'A list of extenrally injected objectID groups into from an external source.\n',
    required: false,
    default: '{}',
    displayOptions: {
      show: {
        request_body_object: ['run_composition_parameters_as_object_object'],
        run_composition_parameters_as_object_object: ['injected_items_object_params'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'my_composition_object_id',
    default: '',
    description: 'Composition unique identifier.',
    displayName: 'Composition ID',
    name: 'compositionID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    displayName: 'Facet Name',
    name: 'facetName_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    displayName: 'Search For Facet Values Request',
    name: 'search_for_facet_values_request_object',
    type: 'multiOptions',
    description: undefined,
    required: false,
    default: [],
    options: [
      {
        name: 'Search For Facet Values Params',
        value: 'search_for_facet_values_params_object',
      },
    ],
    displayOptions: {
      show: {
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    displayName: 'Search For Facet Values Params',
    name: 'search_for_facet_values_params_object',
    type: 'multiOptions',
    description: undefined,
    required: false,
    default: [],
    options: [
      {
        name: 'Query',
        value: 'query_string_params',
      },
      {
        name: 'Max Facet Hits',
        value: 'maxFacetHits_number_params',
      },
      {
        name: 'Run Composition Parameters As Object',
        value: 'run_composition_parameters_as_object_object_params',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'params',
        value:
          '={{ { "query": typeof $parameter.query_string_params !== "undefined" ? $parameter.query_string_params : undefined, "maxFacetHits": typeof $parameter.maxFacetHits_number_params !== "undefined" ? $parameter.maxFacetHits_number_params : undefined, "searchQuery": { "query": typeof $parameter.query_string_searchQuery_params !== "undefined" ? $parameter.query_string_searchQuery_params : undefined, "filters": typeof $parameter.filters_string_searchQuery_params !== "undefined" ? $parameter.filters_string_searchQuery_params : undefined, "page": typeof $parameter.page_number_searchQuery_params !== "undefined" ? $parameter.page_number_searchQuery_params : undefined, "getRankingInfo": typeof $parameter.getRankingInfo_boolean_searchQuery_params !== "undefined" ? $parameter.getRankingInfo_boolean_searchQuery_params : undefined, "relevancyStrictness": typeof $parameter.relevancyStrictness_number_searchQuery_params !== "undefined" ? $parameter.relevancyStrictness_number_searchQuery_params : undefined, "facets": typeof $parameter.facets_json_searchQuery_params !== "undefined" ? JSON.parse($parameter.facets_json_searchQuery_params) : undefined, "facetFilters": typeof $parameter.facetFilters_json_searchQuery_params !== "undefined" ? JSON.parse($parameter.facetFilters_json_searchQuery_params) : typeof $parameter.facetFilters_string_searchQuery_params !== "undefined" ? $parameter.facetFilters_string_searchQuery_params : undefined, "optionalFilters": typeof $parameter.optionalFilters_json_searchQuery_params !== "undefined" ? JSON.parse($parameter.optionalFilters_json_searchQuery_params) : typeof $parameter.optionalFilters_string_searchQuery_params !== "undefined" ? $parameter.optionalFilters_string_searchQuery_params : undefined, "numericFilters": typeof $parameter.numericFilters_json_searchQuery_params !== "undefined" ? JSON.parse($parameter.numericFilters_json_searchQuery_params) : typeof $parameter.numericFilters_string_searchQuery_params !== "undefined" ? $parameter.numericFilters_string_searchQuery_params : undefined, "hitsPerPage": typeof $parameter.hitsPerPage_number_searchQuery_params !== "undefined" ? $parameter.hitsPerPage_number_searchQuery_params : undefined, "aroundLatLng": typeof $parameter.aroundLatLng_string_searchQuery_params !== "undefined" ? $parameter.aroundLatLng_string_searchQuery_params : undefined, "aroundLatLngViaIP": typeof $parameter.aroundLatLngViaIP_boolean_searchQuery_params !== "undefined" ? $parameter.aroundLatLngViaIP_boolean_searchQuery_params : undefined, "aroundRadius": typeof $parameter.aroundRadius_number_searchQuery_params !== "undefined" ? $parameter.aroundRadius_number_searchQuery_params : typeof $parameter.aroundRadius_options_searchQuery_params !== "undefined" ? $parameter.aroundRadius_options_searchQuery_params : undefined, "aroundPrecision": typeof $parameter.aroundPrecision_number_searchQuery_params !== "undefined" ? $parameter.aroundPrecision_number_searchQuery_params : typeof $parameter.aroundPrecision_json_searchQuery_params !== "undefined" ? JSON.parse($parameter.aroundPrecision_json_searchQuery_params) : undefined, "minimumAroundRadius": typeof $parameter.minimumAroundRadius_number_searchQuery_params !== "undefined" ? $parameter.minimumAroundRadius_number_searchQuery_params : undefined, "insideBoundingBox": typeof $parameter.insideBoundingBox_string_searchQuery_params !== "undefined" ? $parameter.insideBoundingBox_string_searchQuery_params : typeof $parameter.insideBoundingBox_null_searchQuery_params !== "undefined" ? JSON.parse($parameter.insideBoundingBox_null_searchQuery_params) : typeof $parameter.insideBoundingBox_json_searchQuery_params !== "undefined" ? JSON.parse($parameter.insideBoundingBox_json_searchQuery_params) : undefined, "insidePolygon": typeof $parameter.insidePolygon_json_searchQuery_params !== "undefined" ? JSON.parse($parameter.insidePolygon_json_searchQuery_params) : undefined, "queryLanguages": typeof $parameter.queryLanguages_json_searchQuery_params !== "undefined" ? JSON.parse($parameter.queryLanguages_json_searchQuery_params) : undefined, "naturalLanguages": typeof $parameter.naturalLanguages_json_searchQuery_params !== "undefined" ? JSON.parse($parameter.naturalLanguages_json_searchQuery_params) : undefined, "enableRules": typeof $parameter.enableRules_boolean_searchQuery_params !== "undefined" ? $parameter.enableRules_boolean_searchQuery_params : undefined, "ruleContexts": typeof $parameter.ruleContexts_json_searchQuery_params !== "undefined" ? JSON.parse($parameter.ruleContexts_json_searchQuery_params) : undefined, "userToken": typeof $parameter.userToken_string_searchQuery_params !== "undefined" ? $parameter.userToken_string_searchQuery_params : undefined, "clickAnalytics": typeof $parameter.clickAnalytics_boolean_searchQuery_params !== "undefined" ? $parameter.clickAnalytics_boolean_searchQuery_params : undefined, "analytics": typeof $parameter.analytics_boolean_searchQuery_params !== "undefined" ? $parameter.analytics_boolean_searchQuery_params : undefined, "analyticsTags": typeof $parameter.analyticsTags_json_searchQuery_params !== "undefined" ? JSON.parse($parameter.analyticsTags_json_searchQuery_params) : undefined, "enableABTest": typeof $parameter.enableABTest_boolean_searchQuery_params !== "undefined" ? $parameter.enableABTest_boolean_searchQuery_params : undefined, "enableReRanking": typeof $parameter.enableReRanking_boolean_searchQuery_params !== "undefined" ? $parameter.enableReRanking_boolean_searchQuery_params : undefined, "injectedItems": typeof $parameter.injected_items_object_searchQuery_params !== "undefined" ? JSON.parse($parameter.injected_items_object_searchQuery_params) : undefined } } }}',
      },
    },
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Search query.',
    displayName: 'Query',
    name: 'query_string_params',
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: ['query_string_params'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'number',
    default: 10,
    description:
      'Maximum number of facet values to return when [searching for facet values](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/#search-for-facet-values).',
    typeOptions: {
      maxValue: 100,
    },
    displayName: 'Max Facet Hits',
    name: 'maxFacetHits_number_params',
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: ['maxFacetHits_number_params'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    displayName: 'Run Composition Parameters As Object',
    name: 'run_composition_parameters_as_object_object_params',
    type: 'multiOptions',
    description: undefined,
    required: false,
    default: [],
    options: [
      {
        name: 'Query',
        value: 'query_string_searchQuery',
      },
      {
        name: 'Filters',
        value: 'filters_string_searchQuery',
      },
      {
        name: 'Page',
        value: 'page_number_searchQuery',
      },
      {
        name: 'Get Ranking Info',
        value: 'getRankingInfo_boolean_searchQuery',
      },
      {
        name: 'Relevancy Strictness',
        value: 'relevancyStrictness_number_searchQuery',
      },
      {
        name: 'Facets',
        value: 'facets_json_searchQuery',
      },
      {
        name: 'Facet Filters',
        value: 'facetFilters_searchQuery',
      },
      {
        name: 'Optional Filters',
        value: 'optionalFilters_searchQuery',
      },
      {
        name: 'Numeric Filters',
        value: 'numericFilters_searchQuery',
      },
      {
        name: 'Hits Per Page',
        value: 'hitsPerPage_number_searchQuery',
      },
      {
        name: 'Around Lat Lng',
        value: 'aroundLatLng_string_searchQuery',
      },
      {
        name: 'Around Lat Lng Via IP',
        value: 'aroundLatLngViaIP_boolean_searchQuery',
      },
      {
        name: 'Around Radius',
        value: 'aroundRadius_searchQuery',
      },
      {
        name: 'Around Precision',
        value: 'aroundPrecision_searchQuery',
      },
      {
        name: 'Minimum Around Radius',
        value: 'minimumAroundRadius_number_searchQuery',
      },
      {
        name: 'Inside Bounding Box',
        value: 'insideBoundingBox_searchQuery',
      },
      {
        name: 'Inside Polygon',
        value: 'insidePolygon_json_searchQuery',
      },
      {
        name: 'Query Languages',
        value: 'queryLanguages_json_searchQuery',
      },
      {
        name: 'Natural Languages',
        value: 'naturalLanguages_json_searchQuery',
      },
      {
        name: 'Enable Rules',
        value: 'enableRules_boolean_searchQuery',
      },
      {
        name: 'Rule Contexts',
        value: 'ruleContexts_json_searchQuery',
      },
      {
        name: 'User Token',
        value: 'userToken_string_searchQuery',
      },
      {
        name: 'Click Analytics',
        value: 'clickAnalytics_boolean_searchQuery',
      },
      {
        name: 'Analytics',
        value: 'analytics_boolean_searchQuery',
      },
      {
        name: 'Analytics Tags',
        value: 'analyticsTags_json_searchQuery',
      },
      {
        name: 'Enable ABTest',
        value: 'enableABTest_boolean_searchQuery',
      },
      {
        name: 'Enable Re Ranking',
        value: 'enableReRanking_boolean_searchQuery',
      },
      {
        name: 'Injected Items',
        value: 'injected_items_object_searchQuery',
      },
    ],
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Search query.',
    displayName: 'Query',
    name: 'query_string_searchQuery_params',
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['query_string_searchQuery'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '(category:Book OR category:Ebook) AND _tags:published',
    default: '',
    description:
      "Filter expression to only include items that match the filter criteria in the response.\n\nYou can use these filter expressions:\n\n- **Numeric filters.** `<facet> <op> <number>`, where `<op>` is one of `<`, `<=`, `=`, `!=`, `>`, `>=`.\n- **Ranges.** `<facet>:<lower> TO <upper>` where `<lower>` and `<upper>` are the lower and upper limits of the range (inclusive).\n- **Facet filters.** `<facet>:<value>` where `<facet>` is a facet attribute (case-sensitive) and `<value>` a facet value.\n- **Tag filters.** `_tags:<value>` or just `<value>` (case-sensitive).\n- **Boolean filters.** `<facet>: true | false`.\n\nYou can combine filters with `AND`, `OR`, and `NOT` operators with the following restrictions:\n\n- You can only combine filters of the same type with `OR`.\n  **Not supported:** `facet:value OR num > 3`.\n- You can't use `NOT` with combinations of filters.\n  **Not supported:** `NOT(facet:value OR facet:value)`\n- You can't combine conjunctions (`AND`) with `OR`.\n  **Not supported:** `facet:value OR (facet:value AND facet:value)`\n\nUse quotes around your filters, if the facet attribute name or facet value has spaces, keywords (`OR`, `AND`, `NOT`), or quotes.\nIf a facet attribute is an array, the filter matches if it matches at least one element of the array.\n\nFor more information, see [Filters](https://www.algolia.com/doc/guides/managing-results/refine-results/filtering).\n",
    displayName: 'Filters',
    name: 'filters_string_searchQuery_params',
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['filters_string_searchQuery'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description: 'Page of search results to retrieve.',
    typeOptions: {
      minValue: 0,
    },
    displayName: 'Page',
    name: 'page_number_searchQuery_params',
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['page_number_searchQuery'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description: 'Whether the run response should include detailed ranking information.',
    displayName: 'Get Ranking Info',
    name: 'getRankingInfo_boolean_searchQuery_params',
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['getRankingInfo_boolean_searchQuery'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '90',
    default: 100,
    description:
      "Relevancy threshold below which less relevant results aren't included in the results\nYou can only set `relevancyStrictness` on [virtual replica indices](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/in-depth/replicas/#what-are-virtual-replicas).\nUse this setting to strike a balance between the relevance and number of returned results.\n",
    displayName: 'Relevancy Strictness',
    name: 'relevancyStrictness_number_searchQuery_params',
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: [
          'relevancyStrictness_number_searchQuery',
        ],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Facets',
    name: 'facets_json_searchQuery_params',
    default: '[]',
    description:
      'Facets for which to retrieve facet values that match the search criteria and the number of matching facet values\nTo retrieve all facets, use the wildcard character `*`.\nFor more information, see [facets](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/#contextual-facet-values-and-counts).\n',
    required: false,
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['facets_json_searchQuery'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'options',
    name: 'facetFilters_searchQuery_params',
    displayName: 'Facet Filters',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'String',
        value: 'string',
      },
    ],
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['facetFilters_searchQuery'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Facet Filters (Array)',
    name: 'facetFilters_json_searchQuery_params',
    default: '[]',
    description: undefined,
    required: false,
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['facetFilters_searchQuery'],
        facetFilters_searchQuery_params: ['array'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    displayName: 'Facet Filters (String)',
    name: 'facetFilters_string_searchQuery_params',
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['facetFilters_searchQuery'],
        facetFilters_searchQuery_params: ['string'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'options',
    name: 'optionalFilters_searchQuery_params',
    displayName: 'Optional Filters',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'String',
        value: 'string',
      },
    ],
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['optionalFilters_searchQuery'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Optional Filters (Array)',
    name: 'optionalFilters_json_searchQuery_params',
    default: '[]',
    description: undefined,
    required: false,
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['optionalFilters_searchQuery'],
        optionalFilters_searchQuery_params: ['array'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    displayName: 'Optional Filters (String)',
    name: 'optionalFilters_string_searchQuery_params',
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['optionalFilters_searchQuery'],
        optionalFilters_searchQuery_params: ['string'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'options',
    name: 'numericFilters_searchQuery_params',
    displayName: 'Numeric Filters',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'String',
        value: 'string',
      },
    ],
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['numericFilters_searchQuery'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Numeric Filters (Array)',
    name: 'numericFilters_json_searchQuery_params',
    default: '[]',
    description: undefined,
    required: false,
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['numericFilters_searchQuery'],
        numericFilters_searchQuery_params: ['array'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    displayName: 'Numeric Filters (String)',
    name: 'numericFilters_string_searchQuery_params',
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['numericFilters_searchQuery'],
        numericFilters_searchQuery_params: ['string'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'number',
    default: 20,
    description: 'Number of hits per page.',
    typeOptions: {
      minValue: 1,
      maxValue: 1000,
    },
    displayName: 'Hits Per Page',
    name: 'hitsPerPage_number_searchQuery_params',
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['hitsPerPage_number_searchQuery'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '40.71,-74.01',
    default: '',
    description:
      'Coordinates for the center of a circle, expressed as a comma-separated string of latitude and longitude.\n\nOnly records included within a circle around this central location are included in the results.\nThe radius of the circle is determined by the `aroundRadius` and `minimumAroundRadius` settings.\nThis parameter is ignored if you also specify `insidePolygon` or `insideBoundingBox`.\n',
    displayName: 'Around Lat Lng',
    name: 'aroundLatLng_string_searchQuery_params',
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['aroundLatLng_string_searchQuery'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description: "Whether to obtain the coordinates from the request's IP address.",
    displayName: 'Around Lat Lng Via IP',
    name: 'aroundLatLngViaIP_boolean_searchQuery_params',
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: [
          'aroundLatLngViaIP_boolean_searchQuery',
        ],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'options',
    name: 'aroundRadius_searchQuery_params',
    displayName: 'Around Radius',
    default: '',
    options: [
      {
        name: 'Integer',
        value: 'integer',
      },
      {
        name: 'All',
        value: 'all',
      },
    ],
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['aroundRadius_searchQuery'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description: 'Maximum search radius around a central location in meters.',
    typeOptions: {
      minValue: 1,
    },
    displayName: 'Around Radius (Integer)',
    name: 'aroundRadius_number_searchQuery_params',
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['aroundRadius_searchQuery'],
        aroundRadius_searchQuery_params: ['integer'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description: "Return all records with a valid `_geoloc` attribute. Don't filter by distance.",
    options: [
      {
        name: 'all',
        value: 'all',
      },
    ],
    displayName: 'Around Radius (All)',
    name: 'aroundRadius_options_searchQuery_params',
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['aroundRadius_searchQuery'],
        aroundRadius_searchQuery_params: ['all'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'options',
    name: 'aroundPrecision_searchQuery_params',
    displayName: 'Around Precision',
    default: '',
    options: [
      {
        name: 'Integer',
        value: 'integer',
      },
      {
        name: 'Range objects',
        value: 'range_objects',
      },
    ],
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['aroundPrecision_searchQuery'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'number',
    default: 10,
    description:
      'Distance in meters to group results by similar distances.\n\nFor example, if you set `aroundPrecision` to 100, records wihin 100 meters to the central coordinate are considered to have the same distance,\nas are records between 100 and 199 meters.\n',
    displayName: 'Around Precision (Integer)',
    name: 'aroundPrecision_number_searchQuery_params',
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['aroundPrecision_searchQuery'],
        aroundPrecision_searchQuery_params: ['integer'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Around Precision (Range Objects)',
    name: 'aroundPrecision_json_searchQuery_params',
    default: '[]',
    description: undefined,
    required: false,
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['aroundPrecision_searchQuery'],
        aroundPrecision_searchQuery_params: ['range_objects'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description:
      "Minimum radius (in meters) for a search around a location when `aroundRadius` isn't set.",
    typeOptions: {
      minValue: 1,
    },
    displayName: 'Minimum Around Radius',
    name: 'minimumAroundRadius_number_searchQuery_params',
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: [
          'minimumAroundRadius_number_searchQuery',
        ],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'options',
    name: 'insideBoundingBox_searchQuery_params',
    displayName: 'Inside Bounding Box',
    default: '',
    options: [
      {
        name: 'String',
        value: 'string',
      },
      {
        name: 'Null',
        value: 'null',
      },
      {
        name: 'Inside bounding box array',
        value: 'inside_bounding_box_array',
      },
    ],
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['insideBoundingBox_searchQuery'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    displayName: 'Inside Bounding Box (String)',
    name: 'insideBoundingBox_string_searchQuery_params',
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['insideBoundingBox_searchQuery'],
        insideBoundingBox_searchQuery_params: ['string'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Inside Bounding Box (Null)',
    name: 'insideBoundingBox_null_searchQuery_params',
    default: 'null',
    description: undefined,
    required: false,
    disabledOptions: {
      show: {
        insideBoundingBox: ['null'],
      },
    },
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['insideBoundingBox_searchQuery'],
        insideBoundingBox_searchQuery_params: ['null'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Inside Bounding Box (Inside Bounding Box Array)',
    name: 'insideBoundingBox_json_searchQuery_params',
    default: '[]',
    description:
      'Coordinates for a rectangular area in which to search.\n\nEach bounding box is defined by the two opposite points of its diagonal, and expressed as latitude and longitude pair:\n`[p1 lat, p1 long, p2 lat, p2 long]`.\nProvide multiple bounding boxes as nested arrays.\nFor more information, see [rectangular area](https://www.algolia.com/doc/guides/managing-results/refine-results/geolocation/#filtering-inside-rectangular-or-polygonal-areas).\n',
    required: false,
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['insideBoundingBox_searchQuery'],
        insideBoundingBox_searchQuery_params: ['inside_bounding_box_array'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Inside Polygon',
    name: 'insidePolygon_json_searchQuery_params',
    default: '[]',
    description:
      'Coordinates of a polygon in which to search.\n\nPolygons are defined by 3 to 10,000 points. Each point is represented by its latitude and longitude.\nProvide multiple polygons as nested arrays.\nFor more information, see [filtering inside polygons](https://www.algolia.com/doc/guides/managing-results/refine-results/geolocation/#filtering-inside-rectangular-or-polygonal-areas).\nThis parameter is ignored if you also specify `insideBoundingBox`.\n',
    required: false,
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['insidePolygon_json_searchQuery'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Query Languages',
    name: 'queryLanguages_json_searchQuery_params',
    default: '[]',
    description:
      "Languages for language-specific query processing steps such as plurals, stop-word removal, and word-detection dictionaries \nThis setting sets a default list of languages used by the `removeStopWords` and `ignorePlurals` settings.\nThis setting also sets a dictionary for word detection in the logogram-based [CJK](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/normalization/#normalization-for-logogram-based-languages-cjk) languages.\nTo support this, you must place the CJK language **first** \n**You should always specify a query language.**\nIf you don't specify an indexing language, the search engine uses all [supported languages](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/supported-languages),\nor the languages you specified with the `ignorePlurals` or `removeStopWords` parameters.\nThis can lead to unexpected search results.\nFor more information, see [Language-specific configuration](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations).\n",
    required: false,
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['queryLanguages_json_searchQuery'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Natural Languages',
    name: 'naturalLanguages_json_searchQuery_params',
    default: '[]',
    description:
      'ISO language codes that adjust settings that are useful for processing natural language queries (as opposed to keyword searches)\n- Sets `removeStopWords` and `ignorePlurals` to the list of provided languages.\n- Sets `removeWordsIfNoResults` to `allOptional`.\n- Adds a `natural_language` attribute to `ruleContexts` and `analyticsTags`.\n',
    required: false,
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['naturalLanguages_json_searchQuery'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description: 'Whether to enable composition rules.',
    displayName: 'Enable Rules',
    name: 'enableRules_boolean_searchQuery_params',
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['enableRules_boolean_searchQuery'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Rule Contexts',
    name: 'ruleContexts_json_searchQuery_params',
    default: '[]',
    description:
      'Assigns a rule context to the run query\n[Rule contexts](https://www.algolia.com/doc/guides/managing-results/rules/rules-overview/how-to/customize-search-results-by-platform/#whats-a-context) are strings that you can use to trigger matching rules.\n',
    required: false,
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['ruleContexts_json_searchQuery'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'test-user-123',
    default: '',
    description:
      'Unique pseudonymous or anonymous user identifier.\n\nThis helps with analytics and click and conversion events.\nFor more information, see [user token](https://www.algolia.com/doc/guides/sending-events/concepts/usertoken).\n',
    displayName: 'User Token',
    name: 'userToken_string_searchQuery_params',
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['userToken_string_searchQuery'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      'Whether to include a `queryID` attribute in the response\nThe query ID is a unique identifier for a search query and is required for tracking [click and conversion events](https://www.algolia.com/doc/guides/sending-events/getting-started).\n',
    displayName: 'Click Analytics',
    name: 'clickAnalytics_boolean_searchQuery_params',
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['clickAnalytics_boolean_searchQuery'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description: 'Whether this search will be included in Analytics.',
    displayName: 'Analytics',
    name: 'analytics_boolean_searchQuery_params',
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['analytics_boolean_searchQuery'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Analytics Tags',
    name: 'analyticsTags_json_searchQuery_params',
    default: '[]',
    description:
      'Tags to apply to the query for [segmenting analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments).',
    required: false,
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['analyticsTags_json_searchQuery'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description:
      'Whether to enable index level A/B testing for this run request.\nIf the composition mixes multiple indices, the A/B test is ignored.\n',
    displayName: 'Enable ABTest',
    name: 'enableABTest_boolean_searchQuery_params',
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['enableABTest_boolean_searchQuery'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description:
      'Whether this search will use [Dynamic Re-Ranking](https://www.algolia.com/doc/guides/algolia-ai/re-ranking)\nThis setting only has an effect if you activated Dynamic Re-Ranking for this index in the Algolia dashboard.\n',
    displayName: 'Enable Re Ranking',
    name: 'enableReRanking_boolean_searchQuery_params',
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['enableReRanking_boolean_searchQuery'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Injected Items',
    name: 'injected_items_object_searchQuery_params',
    description: 'A list of extenrally injected objectID groups into from an external source.\n',
    required: false,
    default: '{}',
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
        search_for_facet_values_params_object: [
          'run_composition_parameters_as_object_object_params',
        ],
        run_composition_parameters_as_object_object_params: ['injected_items_object_searchQuery'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'options',
    name: 'page',
    displayName: 'Page',
    default: '',
    options: [
      {
        name: 'Integer',
        value: 'integer',
      },
      {
        name: 'Null',
        value: 'null',
      },
    ],
    routing: {
      request: {
        qs: {
          page: '={{ (() => { const value = typeof $parameter.page_number !== "undefined" ? $parameter.page_number : typeof $parameter.page_null !== "undefined" ? JSON.parse($parameter.page_null) : undefined; if (value !== undefined && value !== null) { return value; } return undefined; })() }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Compositions'],
        operation: ['listCompositions'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    typeOptions: {
      minValue: 0,
    },
    displayName: 'Page (Integer)',
    name: 'page_number',
    displayOptions: {
      show: {
        page: ['integer'],
        resource: ['Compositions'],
        operation: ['listCompositions'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Page (Null)',
    name: 'page_null',
    default: 'null',
    description: undefined,
    required: false,
    disabledOptions: {
      show: {
        page: ['null'],
      },
    },
    displayOptions: {
      show: {
        page: ['null'],
        resource: ['Compositions'],
        operation: ['listCompositions'],
      },
    },
  },
  {
    type: 'number',
    default: 100,
    routing: {
      request: {
        qs: {
          hitsPerPage: '={{ $value }}',
        },
      },
    },
    displayName: 'Hits Per Page',
    name: 'hitsPerPage_number',
    displayOptions: {
      show: {
        resource: ['Compositions'],
        operation: ['listCompositions'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'my_composition_object_id',
    default: '',
    description: 'Composition unique identifier.',
    displayName: 'Composition ID',
    name: 'compositionID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Compositions'],
        operation: ['getComposition'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'my_composition_object_id',
    default: '',
    description: 'Composition unique identifier.',
    displayName: 'Composition ID',
    name: 'compositionID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Compositions'],
        operation: ['putComposition'],
      },
    },
  },
  {
    displayName: 'Composition',
    name: 'composition_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Object ID',
        value: 'objectID_string',
      },
      {
        name: 'Name',
        value: 'name_string',
      },
      {
        name: 'Description',
        value: 'description_string',
      },
      {
        name: 'Composition Behavior',
        value: 'composition_behavior_object',
      },
    ],
    displayOptions: {
      show: {
        resource: ['Compositions'],
        operation: ['putComposition'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'my_composition_object_id',
    default: '',
    description: 'Composition unique identifier.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'objectID',
      },
    },
    displayName: 'Object ID',
    name: 'objectID_string',
    displayOptions: {
      show: {
        composition_object: ['objectID_string'],
        resource: ['Compositions'],
        operation: ['putComposition'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    placeholder: 'my lovely crafted composition',
    default: '',
    description: 'Composition name.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'name',
      },
    },
    displayName: 'Name',
    name: 'name_string',
    displayOptions: {
      show: {
        composition_object: ['name_string'],
        resource: ['Compositions'],
        operation: ['putComposition'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    placeholder: 'my lovely crafted composition that is used for X purpose',
    default: '',
    description: 'Composition description.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'description',
      },
    },
    displayName: 'Description',
    name: 'description_string',
    displayOptions: {
      show: {
        composition_object: ['description_string'],
        resource: ['Compositions'],
        operation: ['putComposition'],
      },
    },
  },
  {
    displayName: 'Composition Behavior',
    name: 'composition_behavior_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Injection',
        value: 'injection_object_behavior',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'behavior',
        value:
          '={{ { "injection": { "main": { "source": { "search": { "index": typeof $parameter.index_string_search_source_main_injection_behavior !== "undefined" ? $parameter.index_string_search_source_main_injection_behavior : undefined, "params": typeof $parameter.composition_main_injection_query_parameters_as_object_object_search_source_main_injection_behavior !== "undefined" ? JSON.parse($parameter.composition_main_injection_query_parameters_as_object_object_search_source_main_injection_behavior) : undefined } } }, "injectedItems": typeof $parameter.injectedItems_json_injection_behavior !== "undefined" ? JSON.parse($parameter.injectedItems_json_injection_behavior) : undefined, "deduplication": { "positioning": typeof $parameter.positioning_options_deduplication_injection_behavior !== "undefined" ? $parameter.positioning_options_deduplication_injection_behavior : undefined } } } }}',
      },
    },
    displayOptions: {
      show: {
        composition_object: ['composition_behavior_object'],
        resource: ['Compositions'],
        operation: ['putComposition'],
      },
    },
  },
  {
    displayName: 'Injection',
    name: 'injection_object_behavior',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Main',
        value: 'main_object_injection',
      },
      {
        name: 'Injected Items',
        value: 'injectedItems_json_injection',
      },
      {
        name: 'Deduplication',
        value: 'deduplication_object_injection',
      },
    ],
    displayOptions: {
      show: {
        composition_object: ['composition_behavior_object'],
        composition_behavior_object: ['injection_object_behavior'],
        resource: ['Compositions'],
        operation: ['putComposition'],
      },
    },
  },
  {
    displayName: 'Main',
    name: 'main_object_injection_behavior',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Composition Source',
        value: 'composition_source_object_main',
      },
    ],
    displayOptions: {
      show: {
        composition_object: ['composition_behavior_object'],
        composition_behavior_object: ['injection_object_behavior'],
        injection_object_behavior: ['main_object_injection'],
        resource: ['Compositions'],
        operation: ['putComposition'],
      },
    },
  },
  {
    displayName: 'Composition Source',
    name: 'composition_source_object_main_injection_behavior',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Composition Source Search',
        value: 'composition_source_search_object_source',
      },
    ],
    displayOptions: {
      show: {
        composition_object: ['composition_behavior_object'],
        composition_behavior_object: ['injection_object_behavior'],
        injection_object_behavior: ['main_object_injection'],
        main_object_injection_behavior: ['composition_source_object_main'],
        resource: ['Compositions'],
        operation: ['putComposition'],
      },
    },
  },
  {
    displayName: 'Composition Source Search',
    name: 'composition_source_search_object_source_main_injection_behavior',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Index',
        value: 'index_string_search',
      },
      {
        name: 'Composition Main Injection Query Parameters As Object',
        value: 'composition_main_injection_query_parameters_as_object_object_search',
      },
    ],
    displayOptions: {
      show: {
        composition_object: ['composition_behavior_object'],
        composition_behavior_object: ['injection_object_behavior'],
        injection_object_behavior: ['main_object_injection'],
        main_object_injection_behavior: ['composition_source_object_main'],
        composition_source_object_main_injection_behavior: [
          'composition_source_search_object_source',
        ],
        resource: ['Compositions'],
        operation: ['putComposition'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'Products',
    default: '',
    description: 'Composition Main Index name.',
    displayName: 'Index',
    name: 'index_string_search_source_main_injection_behavior',
    displayOptions: {
      show: {
        composition_object: ['composition_behavior_object'],
        composition_behavior_object: ['injection_object_behavior'],
        injection_object_behavior: ['main_object_injection'],
        main_object_injection_behavior: ['composition_source_object_main'],
        composition_source_object_main_injection_behavior: [
          'composition_source_search_object_source',
        ],
        composition_source_search_object_source_main_injection_behavior: ['index_string_search'],
        resource: ['Compositions'],
        operation: ['putComposition'],
      },
    },
    required: true,
  },
  {
    type: 'json',
    displayName: 'Composition Main Injection Query Parameters As Object',
    name: 'composition_main_injection_query_parameters_as_object_object_search_source_main_injection_behavior',
    description: undefined,
    required: false,
    default: '{}',
    displayOptions: {
      show: {
        composition_object: ['composition_behavior_object'],
        composition_behavior_object: ['injection_object_behavior'],
        injection_object_behavior: ['main_object_injection'],
        main_object_injection_behavior: ['composition_source_object_main'],
        composition_source_object_main_injection_behavior: [
          'composition_source_search_object_source',
        ],
        composition_source_search_object_source_main_injection_behavior: [
          'composition_main_injection_query_parameters_as_object_object_search',
        ],
        resource: ['Compositions'],
        operation: ['putComposition'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Injected Items',
    name: 'injectedItems_json_injection_behavior',
    default: '[]',
    description: 'list of injected items of the current Composition.',
    required: false,
    displayOptions: {
      show: {
        composition_object: ['composition_behavior_object'],
        composition_behavior_object: ['injection_object_behavior'],
        injection_object_behavior: ['injectedItems_json_injection'],
        resource: ['Compositions'],
        operation: ['putComposition'],
      },
    },
  },
  {
    displayName: 'Deduplication',
    name: 'deduplication_object_injection_behavior',
    type: 'multiOptions',
    description:
      'Deduplication configures the methods used to resolve duplicate items between main search results and injected group results.',
    required: true,
    default: [],
    options: [
      {
        name: 'Positioning',
        value: 'positioning_options_deduplication',
      },
    ],
    displayOptions: {
      show: {
        composition_object: ['composition_behavior_object'],
        composition_behavior_object: ['injection_object_behavior'],
        injection_object_behavior: ['deduplication_object_injection'],
        resource: ['Compositions'],
        operation: ['putComposition'],
      },
    },
  },
  {
    type: 'options',
    placeholder: 'highest',
    default: 'highestInjected',
    description:
      "Deduplication positioning configures how a duplicate result should be resolved between an injected item and main search results.\nCurrent configuration supports:\n- 'highest': always select the item in the highest position, and remove duplicates that appear lower in the results.\n- 'highestInjected': duplicate result will be moved to its highest possible injected position, but not higher. \n  If a duplicate appears higher in main search results, it will be removed to stay it's intended group position (which could be lower than main).\n",
    options: [
      {
        name: 'highest',
        value: 'highest',
      },
      {
        name: 'highestInjected',
        value: 'highestInjected',
      },
    ],
    displayName: 'Positioning',
    name: 'positioning_options_deduplication_injection_behavior',
    displayOptions: {
      show: {
        composition_object: ['composition_behavior_object'],
        composition_behavior_object: ['injection_object_behavior'],
        injection_object_behavior: ['deduplication_object_injection'],
        deduplication_object_injection_behavior: ['positioning_options_deduplication'],
        resource: ['Compositions'],
        operation: ['putComposition'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    placeholder: 'my_composition_object_id',
    default: '',
    description: 'Composition unique identifier.',
    displayName: 'Composition ID',
    name: 'compositionID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Compositions'],
        operation: ['deleteComposition'],
      },
    },
  },
  {
    displayName: 'Batch Params',
    name: 'batch_params_object',
    type: 'multiOptions',
    description: 'Batch parameters.',
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
        resource: ['Compositions'],
        operation: ['multipleBatch'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Requests',
    name: 'requests_json',
    default: '[]',
    description: undefined,
    required: true,
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'requests',
      },
    },
    displayOptions: {
      show: {
        batch_params_object: ['requests_json'],
        resource: ['Compositions'],
        operation: ['multipleBatch'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'my_composition_object_id',
    default: '',
    description: 'Composition unique identifier.',
    displayName: 'Composition ID',
    name: 'compositionID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Composition Rules'],
        operation: ['getRule'],
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
        resource: ['Composition Rules'],
        operation: ['getRule'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'my_composition_object_id',
    default: '',
    description: 'Composition unique identifier.',
    displayName: 'Composition ID',
    name: 'compositionID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Composition Rules'],
        operation: ['putCompositionRule'],
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
        resource: ['Composition Rules'],
        operation: ['putCompositionRule'],
      },
    },
  },
  {
    displayName: 'Composition Rule',
    name: 'composition_rule_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Object ID',
        value: 'objectID_string',
      },
      {
        name: 'Conditions',
        value: 'conditions_json',
      },
      {
        name: 'Composition Rule Consequence',
        value: 'composition_rule_consequence_object',
      },
      {
        name: 'Description',
        value: 'description_string',
      },
      {
        name: 'Enabled',
        value: 'enabled_boolean',
      },
      {
        name: 'Validity',
        value: 'validity_json',
      },
      {
        name: 'Tags',
        value: 'tags_json',
      },
    ],
    displayOptions: {
      show: {
        resource: ['Composition Rules'],
        operation: ['putCompositionRule'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'my_composition_rule_object_id',
    default: '',
    description: 'Composition rule unique identifier.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'objectID',
      },
    },
    displayName: 'Object ID',
    name: 'objectID_string',
    displayOptions: {
      show: {
        composition_rule_object: ['objectID_string'],
        resource: ['Composition Rules'],
        operation: ['putCompositionRule'],
      },
    },
    required: true,
  },
  {
    type: 'json',
    displayName: 'Conditions',
    name: 'conditions_json',
    default: '[]',
    description: 'Conditions that trigger a composition rule.',
    required: true,
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'conditions',
      },
    },
    displayOptions: {
      show: {
        composition_rule_object: ['conditions_json'],
        resource: ['Composition Rules'],
        operation: ['putCompositionRule'],
      },
    },
  },
  {
    displayName: 'Composition Rule Consequence',
    name: 'composition_rule_consequence_object',
    type: 'multiOptions',
    description: 'Effect of the rule.',
    required: true,
    default: [],
    options: [
      {
        name: 'Composition Behavior',
        value: 'composition_behavior_object_consequence',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'consequence',
        value:
          '={{ { "behavior": { "injection": { "main": { "source": { "search": { "index": typeof $parameter.index_string_search_source_main_injection_behavior_consequence !== "undefined" ? $parameter.index_string_search_source_main_injection_behavior_consequence : undefined, "params": typeof $parameter.composition_main_injection_query_parameters_as_object_object_search_source_main_injection_behavior_consequence !== "undefined" ? JSON.parse($parameter.composition_main_injection_query_parameters_as_object_object_search_source_main_injection_behavior_consequence) : undefined } } }, "injectedItems": typeof $parameter.injectedItems_json_injection_behavior_consequence !== "undefined" ? JSON.parse($parameter.injectedItems_json_injection_behavior_consequence) : undefined, "deduplication": { "positioning": typeof $parameter.positioning_options_deduplication_injection_behavior_consequence !== "undefined" ? $parameter.positioning_options_deduplication_injection_behavior_consequence : undefined } } } } }}',
      },
    },
    displayOptions: {
      show: {
        composition_rule_object: ['composition_rule_consequence_object'],
        resource: ['Composition Rules'],
        operation: ['putCompositionRule'],
      },
    },
  },
  {
    displayName: 'Composition Behavior',
    name: 'composition_behavior_object_consequence',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Injection',
        value: 'injection_object_behavior',
      },
    ],
    displayOptions: {
      show: {
        composition_rule_object: ['composition_rule_consequence_object'],
        composition_rule_consequence_object: ['composition_behavior_object_consequence'],
        resource: ['Composition Rules'],
        operation: ['putCompositionRule'],
      },
    },
  },
  {
    displayName: 'Injection',
    name: 'injection_object_behavior_consequence',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Main',
        value: 'main_object_injection',
      },
      {
        name: 'Injected Items',
        value: 'injectedItems_json_injection',
      },
      {
        name: 'Deduplication',
        value: 'deduplication_object_injection',
      },
    ],
    displayOptions: {
      show: {
        composition_rule_object: ['composition_rule_consequence_object'],
        composition_rule_consequence_object: ['composition_behavior_object_consequence'],
        composition_behavior_object_consequence: ['injection_object_behavior'],
        resource: ['Composition Rules'],
        operation: ['putCompositionRule'],
      },
    },
  },
  {
    displayName: 'Main',
    name: 'main_object_injection_behavior_consequence',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Composition Source',
        value: 'composition_source_object_main',
      },
    ],
    displayOptions: {
      show: {
        composition_rule_object: ['composition_rule_consequence_object'],
        composition_rule_consequence_object: ['composition_behavior_object_consequence'],
        composition_behavior_object_consequence: ['injection_object_behavior'],
        injection_object_behavior_consequence: ['main_object_injection'],
        resource: ['Composition Rules'],
        operation: ['putCompositionRule'],
      },
    },
  },
  {
    displayName: 'Composition Source',
    name: 'composition_source_object_main_injection_behavior_consequence',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Composition Source Search',
        value: 'composition_source_search_object_source',
      },
    ],
    displayOptions: {
      show: {
        composition_rule_object: ['composition_rule_consequence_object'],
        composition_rule_consequence_object: ['composition_behavior_object_consequence'],
        composition_behavior_object_consequence: ['injection_object_behavior'],
        injection_object_behavior_consequence: ['main_object_injection'],
        main_object_injection_behavior_consequence: ['composition_source_object_main'],
        resource: ['Composition Rules'],
        operation: ['putCompositionRule'],
      },
    },
  },
  {
    displayName: 'Composition Source Search',
    name: 'composition_source_search_object_source_main_injection_behavior_consequence',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Index',
        value: 'index_string_search',
      },
      {
        name: 'Composition Main Injection Query Parameters As Object',
        value: 'composition_main_injection_query_parameters_as_object_object_search',
      },
    ],
    displayOptions: {
      show: {
        composition_rule_object: ['composition_rule_consequence_object'],
        composition_rule_consequence_object: ['composition_behavior_object_consequence'],
        composition_behavior_object_consequence: ['injection_object_behavior'],
        injection_object_behavior_consequence: ['main_object_injection'],
        main_object_injection_behavior_consequence: ['composition_source_object_main'],
        composition_source_object_main_injection_behavior_consequence: [
          'composition_source_search_object_source',
        ],
        resource: ['Composition Rules'],
        operation: ['putCompositionRule'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'Products',
    default: '',
    description: 'Composition Main Index name.',
    displayName: 'Index',
    name: 'index_string_search_source_main_injection_behavior_consequence',
    displayOptions: {
      show: {
        composition_rule_object: ['composition_rule_consequence_object'],
        composition_rule_consequence_object: ['composition_behavior_object_consequence'],
        composition_behavior_object_consequence: ['injection_object_behavior'],
        injection_object_behavior_consequence: ['main_object_injection'],
        main_object_injection_behavior_consequence: ['composition_source_object_main'],
        composition_source_object_main_injection_behavior_consequence: [
          'composition_source_search_object_source',
        ],
        composition_source_search_object_source_main_injection_behavior_consequence: [
          'index_string_search',
        ],
        resource: ['Composition Rules'],
        operation: ['putCompositionRule'],
      },
    },
    required: true,
  },
  {
    type: 'json',
    displayName: 'Composition Main Injection Query Parameters As Object',
    name: 'composition_main_injection_query_parameters_as_object_object_search_source_main_injection_behavior_consequence',
    description: undefined,
    required: false,
    default: '{}',
    displayOptions: {
      show: {
        composition_rule_object: ['composition_rule_consequence_object'],
        composition_rule_consequence_object: ['composition_behavior_object_consequence'],
        composition_behavior_object_consequence: ['injection_object_behavior'],
        injection_object_behavior_consequence: ['main_object_injection'],
        main_object_injection_behavior_consequence: ['composition_source_object_main'],
        composition_source_object_main_injection_behavior_consequence: [
          'composition_source_search_object_source',
        ],
        composition_source_search_object_source_main_injection_behavior_consequence: [
          'composition_main_injection_query_parameters_as_object_object_search',
        ],
        resource: ['Composition Rules'],
        operation: ['putCompositionRule'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Injected Items',
    name: 'injectedItems_json_injection_behavior_consequence',
    default: '[]',
    description: 'list of injected items of the current Composition.',
    required: false,
    displayOptions: {
      show: {
        composition_rule_object: ['composition_rule_consequence_object'],
        composition_rule_consequence_object: ['composition_behavior_object_consequence'],
        composition_behavior_object_consequence: ['injection_object_behavior'],
        injection_object_behavior_consequence: ['injectedItems_json_injection'],
        resource: ['Composition Rules'],
        operation: ['putCompositionRule'],
      },
    },
  },
  {
    displayName: 'Deduplication',
    name: 'deduplication_object_injection_behavior_consequence',
    type: 'multiOptions',
    description:
      'Deduplication configures the methods used to resolve duplicate items between main search results and injected group results.',
    required: true,
    default: [],
    options: [
      {
        name: 'Positioning',
        value: 'positioning_options_deduplication',
      },
    ],
    displayOptions: {
      show: {
        composition_rule_object: ['composition_rule_consequence_object'],
        composition_rule_consequence_object: ['composition_behavior_object_consequence'],
        composition_behavior_object_consequence: ['injection_object_behavior'],
        injection_object_behavior_consequence: ['deduplication_object_injection'],
        resource: ['Composition Rules'],
        operation: ['putCompositionRule'],
      },
    },
  },
  {
    type: 'options',
    placeholder: 'highest',
    default: 'highestInjected',
    description:
      "Deduplication positioning configures how a duplicate result should be resolved between an injected item and main search results.\nCurrent configuration supports:\n- 'highest': always select the item in the highest position, and remove duplicates that appear lower in the results.\n- 'highestInjected': duplicate result will be moved to its highest possible injected position, but not higher. \n  If a duplicate appears higher in main search results, it will be removed to stay it's intended group position (which could be lower than main).\n",
    options: [
      {
        name: 'highest',
        value: 'highest',
      },
      {
        name: 'highestInjected',
        value: 'highestInjected',
      },
    ],
    displayName: 'Positioning',
    name: 'positioning_options_deduplication_injection_behavior_consequence',
    displayOptions: {
      show: {
        composition_rule_object: ['composition_rule_consequence_object'],
        composition_rule_consequence_object: ['composition_behavior_object_consequence'],
        composition_behavior_object_consequence: ['injection_object_behavior'],
        injection_object_behavior_consequence: ['deduplication_object_injection'],
        deduplication_object_injection_behavior_consequence: ['positioning_options_deduplication'],
        resource: ['Composition Rules'],
        operation: ['putCompositionRule'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    placeholder: 'Display a promotional banner',
    default: '',
    description:
      "Description of the rule's purpose to help you distinguish between different rules.",
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'description',
      },
    },
    displayName: 'Description',
    name: 'description_string',
    displayOptions: {
      show: {
        composition_rule_object: ['description_string'],
        resource: ['Composition Rules'],
        operation: ['putCompositionRule'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description: 'Whether the rule is active.',
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
        composition_rule_object: ['enabled_boolean'],
        resource: ['Composition Rules'],
        operation: ['putCompositionRule'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Validity',
    name: 'validity_json',
    default: '[]',
    description: 'Time periods when the rule is active.',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'validity',
      },
    },
    displayOptions: {
      show: {
        composition_rule_object: ['validity_json'],
        resource: ['Composition Rules'],
        operation: ['putCompositionRule'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Tags',
    name: 'tags_json',
    default: '[]',
    description: 'A list of tags.',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'tags',
      },
    },
    displayOptions: {
      show: {
        composition_rule_object: ['tags_json'],
        resource: ['Composition Rules'],
        operation: ['putCompositionRule'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'my_composition_object_id',
    default: '',
    description: 'Composition unique identifier.',
    displayName: 'Composition ID',
    name: 'compositionID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Composition Rules'],
        operation: ['deleteCompositionRule'],
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
        resource: ['Composition Rules'],
        operation: ['deleteCompositionRule'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'my_composition_object_id',
    default: '',
    description: 'Composition unique identifier.',
    displayName: 'Composition ID',
    name: 'compositionID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Composition Rules'],
        operation: ['saveRules'],
      },
    },
  },
  {
    displayName: 'Composition Rules Batch Params',
    name: 'composition_rules_batch_params_object',
    type: 'multiOptions',
    description: 'Composition rules batch parameters.',
    required: false,
    default: [],
    options: [
      {
        name: 'Requests',
        value: 'requests_json',
      },
    ],
    displayOptions: {
      show: {
        resource: ['Composition Rules'],
        operation: ['saveRules'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Requests',
    name: 'requests_json',
    default: '[]',
    description: undefined,
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'requests',
      },
    },
    displayOptions: {
      show: {
        composition_rules_batch_params_object: ['requests_json'],
        resource: ['Composition Rules'],
        operation: ['saveRules'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'my_composition_object_id',
    default: '',
    description: 'Composition unique identifier.',
    displayName: 'Composition ID',
    name: 'compositionID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Composition Rules'],
        operation: ['searchCompositionRules'],
      },
    },
  },
  {
    displayName: 'Search Composition Rules Params',
    name: 'search_composition_rules_params_object',
    type: 'multiOptions',
    description: 'Composition Rules search parameters.',
    required: false,
    default: [],
    options: [
      {
        name: 'Query',
        value: 'query_string',
      },
      {
        name: 'Anchoring',
        value: 'anchoring_options',
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
        value: 'enabled',
      },
    ],
    displayOptions: {
      show: {
        resource: ['Composition Rules'],
        operation: ['searchCompositionRules'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Search query for rules.',
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
        search_composition_rules_params_object: ['query_string'],
        resource: ['Composition Rules'],
        operation: ['searchCompositionRules'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description:
      'Which part of the search query the pattern should match:\n\n- `startsWith`. The pattern must match the beginning of the query.\n- `endsWith`. The pattern must match the end of the query.\n- `is`. The pattern must match the query exactly.\n- `contains`. The pattern must match anywhere in the query.\n\nEmpty queries are only allowed as patterns with `anchoring: is`.\n',
    options: [
      {
        name: 'is',
        value: 'is',
      },
      {
        name: 'startsWith',
        value: 'startsWith',
      },
      {
        name: 'endsWith',
        value: 'endsWith',
      },
      {
        name: 'contains',
        value: 'contains',
      },
    ],
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'anchoring',
      },
    },
    displayName: 'Anchoring',
    name: 'anchoring_options',
    displayOptions: {
      show: {
        search_composition_rules_params_object: ['anchoring_options'],
        resource: ['Composition Rules'],
        operation: ['searchCompositionRules'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'mobile',
    default: '',
    description: 'Only return composition rules that match the context (exact match).',
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
        search_composition_rules_params_object: ['context_string'],
        resource: ['Composition Rules'],
        operation: ['searchCompositionRules'],
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
        search_composition_rules_params_object: ['page_number'],
        resource: ['Composition Rules'],
        operation: ['searchCompositionRules'],
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
        search_composition_rules_params_object: ['hitsPerPage_number'],
        resource: ['Composition Rules'],
        operation: ['searchCompositionRules'],
      },
    },
  },
  {
    type: 'options',
    name: 'enabled',
    displayName: 'Enabled',
    default: '',
    options: [
      {
        name: 'Boolean',
        value: 'boolean',
      },
      {
        name: 'Null',
        value: 'null',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'enabled',
        value:
          '={{ typeof $parameter.enabled_boolean !== "undefined" ? $parameter.enabled_boolean : typeof $parameter.enabled_null !== "undefined" ? JSON.parse($parameter.enabled_null) : undefined }}',
      },
    },
    displayOptions: {
      show: {
        search_composition_rules_params_object: ['enabled'],
        resource: ['Composition Rules'],
        operation: ['searchCompositionRules'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      'If `true`, return only enabled composition rules.\nIf `false`, return only inactive composition rules.\nBy default, _all_ composition rules are returned.\n',
    displayName: 'Enabled (Boolean)',
    name: 'enabled_boolean',
    displayOptions: {
      show: {
        search_composition_rules_params_object: ['enabled'],
        enabled: ['boolean'],
        resource: ['Composition Rules'],
        operation: ['searchCompositionRules'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Enabled (Null)',
    name: 'enabled_null',
    default: 'null',
    description: undefined,
    required: false,
    disabledOptions: {
      show: {
        enabled: ['null'],
      },
    },
    displayOptions: {
      show: {
        search_composition_rules_params_object: ['enabled'],
        enabled: ['null'],
        resource: ['Composition Rules'],
        operation: ['searchCompositionRules'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'my_composition_object_id',
    default: '',
    description: 'Composition unique identifier.',
    displayName: 'Composition ID',
    name: 'compositionID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Advanced'],
        operation: ['getTask'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '1506303845001',
    default: '',
    displayName: 'Task ID',
    name: 'taskID_number',
    required: true,
    displayOptions: {
      show: {
        resource: ['Advanced'],
        operation: ['getTask'],
      },
    },
  },
];

export default properties;
