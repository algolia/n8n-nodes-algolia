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
        name: 'Update and insert (upsert) a composition',
        value: 'putComposition',
        action: 'Update and insert (upsert) a composition',
        description: 'Update and insert a composition in the current Algolia application.',
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
      {
        name: 'Set or update the "sortingStrategy" configuration for an existing composition',
        value: 'updateSortingStrategyComposition',
        action: 'Set or update the "sortingStrategy" configuration for an existing composition',
        description: 'Updates the "sortingStrategy" field of an existing composition.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/compositions/{{ $parameter.compositionID_string }}/sortingStrategy',
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
    type: 'json',
    description: undefined,
    required: false,
    default: '{}',
    routing: {
      send: {
        type: 'body',
        property: 'params',
        value: '={{ JSON.parse($value) }}',
      },
    },
    displayName: 'Run Composition Parameters As Object',
    name: 'run_composition_parameters_as_object_object',
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
    type: 'json',
    description: undefined,
    required: false,
    default: '{}',
    routing: {
      send: {
        type: 'body',
        property: 'params',
        value: '={{ JSON.parse($value) }}',
      },
    },
    displayName: 'Search For Facet Values Params',
    name: 'search_for_facet_values_params_object',
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['search_for_facet_values_params_object'],
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
      {
        name: 'Sorting Strategy',
        value: 'sorting_strategy_object',
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
    type: 'json',
    description: undefined,
    required: true,
    default: '{}',
    routing: {
      send: {
        type: 'body',
        property: 'behavior',
        value: '={{ JSON.parse($value) }}',
      },
    },
    displayName: 'Composition Behavior',
    name: 'composition_behavior_object',
    displayOptions: {
      show: {
        composition_object: ['composition_behavior_object'],
        resource: ['Compositions'],
        operation: ['putComposition'],
      },
    },
  },
  {
    type: 'json',
    description:
      'A mapping of sorting labels to the indices (or replicas) that implement those sorting rules. The sorting indices MUST be related to the associated main targeted index in the composition.\nEach key is the label your frontend sends at runtime (for example, "Price (asc)"), and each value is the name of the index that should be queried when that label is selected.\n\nWhen a request includes a "sortBy" parameter, the platform looks up the corresponding index in this mapping and uses it to execute the query. The main targeted index is replaced\nwith the sorting strategy index it is mapped to.\n\nUp to 20 sorting strategies can be defined.\n',
    required: false,
    default: '{}',
    routing: {
      send: {
        type: 'body',
        property: 'sortingStrategy',
        value: '={{ JSON.parse($value) }}',
      },
    },
    displayName: 'Sorting Strategy',
    name: 'sorting_strategy_object',
    displayOptions: {
      show: {
        composition_object: ['sorting_strategy_object'],
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
        value: '={{ JSON.parse($value) }}',
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
        resource: ['Compositions'],
        operation: ['updateSortingStrategyComposition'],
      },
    },
  },
  {
    type: 'json',
    description:
      'A mapping of sorting labels to the indices (or replicas) that implement those sorting rules. The sorting indices MUST be related to the associated main targeted index in the composition.\nEach key is the label your frontend sends at runtime (for example, "Price (asc)"), and each value is the name of the index that should be queried when that label is selected.\n\nWhen a request includes a "sortBy" parameter, the platform looks up the corresponding index in this mapping and uses it to execute the query. The main targeted index is replaced\nwith the sorting strategy index it is mapped to.\n\nUp to 20 sorting strategies can be defined.\n',
    required: false,
    default: '{}',
    routing: {
      request: {
        body: '={{ JSON.parse($value) }}',
      },
    },
    displayName: 'Sorting Strategy',
    name: 'sorting_strategy_object',
    displayOptions: {
      show: {
        resource: ['Compositions'],
        operation: ['updateSortingStrategyComposition'],
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
        value: '={{ JSON.parse($value) }}',
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
    type: 'json',
    description: 'Effect of the rule.',
    required: true,
    default: '{}',
    routing: {
      send: {
        type: 'body',
        property: 'consequence',
        value: '={{ JSON.parse($value) }}',
      },
    },
    displayName: 'Composition Rule Consequence',
    name: 'composition_rule_consequence_object',
    displayOptions: {
      show: {
        composition_rule_object: ['composition_rule_consequence_object'],
        resource: ['Composition Rules'],
        operation: ['putCompositionRule'],
      },
    },
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
        value: '={{ JSON.parse($value) }}',
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
        value: '={{ JSON.parse($value) }}',
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
        value: '={{ JSON.parse($value) }}',
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
