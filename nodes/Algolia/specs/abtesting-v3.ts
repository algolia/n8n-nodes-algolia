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
        name: 'abtest',
        value: 'abtest',
        description: 'Manage A/B tests',
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
        name: 'Create an A/B test',
        value: 'addABTests',
        action: 'Create an A/B test',
        description: 'Creates a new A/B test.',
        routing: {
          request: {
            method: 'POST',
            url: '=/3/abtests',
          },
        },
      },
      {
        name: 'List all A/B tests',
        value: 'listABTests',
        action: 'List all A/B tests',
        description: 'Lists all A/B tests you configured for this application.',
        routing: {
          request: {
            method: 'GET',
            url: '=/3/abtests',
          },
        },
      },
      {
        name: 'Retrieve A/B test details',
        value: 'getABTest',
        action: 'Retrieve A/B test details',
        description: 'Retrieves the details for an A/B test by its ID.',
        routing: {
          request: {
            method: 'GET',
            url: '=/3/abtests/{{ $parameter.id_number }}',
          },
        },
      },
      {
        name: 'Delete an A/B test',
        value: 'deleteABTest',
        action: 'Delete an A/B test',
        description: 'Deletes an A/B test by its ID.',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/3/abtests/{{ $parameter.id_number }}',
          },
        },
      },
      {
        name: 'Stop an A/B test',
        value: 'stopABTest',
        action: 'Stop an A/B test',
        description: 'Stops an A/B test by its ID.',
        routing: {
          request: {
            method: 'POST',
            url: '=/3/abtests/{{ $parameter.id_number }}/stop',
          },
        },
      },
      {
        name: 'Estimate the sample size and duration of an A/B test',
        value: 'estimateABTest',
        action: 'Estimate the sample size and duration of an A/B test',
        description:
          'Given the traffic percentage and the expected effect size, this endpoint estimates the sample size and duration of an A/B test based on historical traffic.',
        routing: {
          request: {
            method: 'POST',
            url: '=/3/abtests/estimate',
          },
        },
      },
      {
        name: 'Retrieve timeseries of an A/B test',
        value: 'getTimeseries',
        action: 'Retrieve timeseries of an A/B test',
        description: 'Retrieves timeseries for an A/B test by its ID.',
        routing: {
          request: {
            method: 'GET',
            url: '=/3/abtests/{{ $parameter.id_number }}/timeseries',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['abtest'],
      },
    },
  },
  {
    displayName: 'Add ABTests Request',
    name: 'add_abtests_request_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Name',
        value: 'name_string',
      },
      {
        name: 'Variants',
        value: 'variants_json',
      },
      {
        name: 'Metrics',
        value: 'metrics_json',
      },
      {
        name: 'Configuration',
        value: 'configuration_object',
      },
      {
        name: 'End At',
        value: 'endAt_string',
      },
    ],
    displayOptions: {
      show: {
        resource: ['abtest'],
        operation: ['addABTests'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'Custom ranking sales rank test',
    default: '',
    description: 'A/B test name.',
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
        add_abtests_request_object: ['name_string'],
        resource: ['abtest'],
        operation: ['addABTests'],
      },
    },
    required: true,
  },
  {
    type: 'json',
    displayName: 'Variants',
    name: 'variants_json',
    default: '[]',
    description: 'A/B test variants.',
    required: true,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'variants',
      },
    },
    displayOptions: {
      show: {
        add_abtests_request_object: ['variants_json'],
        resource: ['abtest'],
        operation: ['addABTests'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Metrics',
    name: 'metrics_json',
    default: '[]',
    description:
      'A/B test metrics involved in the test. Only these metrics will be considered when calculating results.',
    required: true,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'metrics',
      },
    },
    displayOptions: {
      show: {
        add_abtests_request_object: ['metrics_json'],
        resource: ['abtest'],
        operation: ['addABTests'],
      },
    },
  },
  {
    type: 'json',
    description: 'A/B test configuration.',
    required: false,
    default: '{}',
    routing: {
      send: {
        type: 'body',
        property: 'configuration',
        value: '={{ JSON.parse($value) }}',
      },
    },
    displayName: 'Configuration',
    name: 'configuration_object',
    displayOptions: {
      show: {
        add_abtests_request_object: ['configuration_object'],
        resource: ['abtest'],
        operation: ['addABTests'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '2023-06-17T00:00:00Z',
    default: '',
    description: 'End date and time of the A/B test, in RFC 3339 format.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'endAt',
      },
    },
    displayName: 'End At',
    name: 'endAt_string',
    displayOptions: {
      show: {
        add_abtests_request_object: ['endAt_string'],
        resource: ['abtest'],
        operation: ['addABTests'],
      },
    },
    required: true,
  },
  {
    type: 'number',
    default: '',
    typeOptions: {
      minValue: 0,
    },
    routing: {
      request: {
        qs: {
          offset: '={{ $value }}',
        },
      },
    },
    displayName: 'Offset',
    name: 'offset_number',
    displayOptions: {
      show: {
        resource: ['abtest'],
        operation: ['listABTests'],
      },
    },
  },
  {
    type: 'number',
    default: 10,
    routing: {
      request: {
        qs: {
          limit: '={{ $value }}',
        },
      },
    },
    displayName: 'Limit',
    name: 'limit_number',
    displayOptions: {
      show: {
        resource: ['abtest'],
        operation: ['listABTests'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    routing: {
      request: {
        qs: {
          indexPrefix: '={{ $value }}',
        },
      },
    },
    displayName: 'Index Prefix',
    name: 'indexPrefix_string',
    displayOptions: {
      show: {
        resource: ['abtest'],
        operation: ['listABTests'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    routing: {
      request: {
        qs: {
          indexSuffix: '={{ $value }}',
        },
      },
    },
    displayName: 'Index Suffix',
    name: 'indexSuffix_string',
    displayOptions: {
      show: {
        resource: ['abtest'],
        operation: ['listABTests'],
      },
    },
  },
  {
    type: 'options',
    placeholder: 'desc',
    default: '',
    description:
      "Sort order for A/B tests by start date.\nUse 'asc' for ascending or 'desc' for descending.\nActive A/B tests are always listed first.\n",
    options: [
      {
        name: 'asc',
        value: 'asc',
      },
      {
        name: 'desc',
        value: 'desc',
      },
    ],
    routing: {
      request: {
        qs: {
          direction: '={{ $value }}',
        },
      },
    },
    displayName: 'Direction',
    name: 'direction_options',
    displayOptions: {
      show: {
        resource: ['abtest'],
        operation: ['listABTests'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '224',
    default: '',
    description: 'Unique A/B test identifier.',
    displayName: 'Id',
    name: 'id_number',
    required: true,
    displayOptions: {
      show: {
        resource: ['abtest'],
        operation: ['getABTest'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '224',
    default: '',
    description: 'Unique A/B test identifier.',
    displayName: 'Id',
    name: 'id_number',
    required: true,
    displayOptions: {
      show: {
        resource: ['abtest'],
        operation: ['deleteABTest'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '224',
    default: '',
    description: 'Unique A/B test identifier.',
    displayName: 'Id',
    name: 'id_number',
    required: true,
    displayOptions: {
      show: {
        resource: ['abtest'],
        operation: ['stopABTest'],
      },
    },
  },
  {
    displayName: 'Estimate ABTest Request',
    name: 'estimate_abtest_request_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Estimate Configuration',
        value: 'estimate_configuration_object',
      },
      {
        name: 'Variants',
        value: 'variants_json',
      },
    ],
    displayOptions: {
      show: {
        resource: ['abtest'],
        operation: ['estimateABTest'],
      },
    },
  },
  {
    type: 'json',
    description:
      'A/B test configuration for estimating the sample size and duration using minimum detectable effect.',
    required: true,
    default: '{}',
    routing: {
      send: {
        type: 'body',
        property: 'configuration',
        value: '={{ JSON.parse($value) }}',
      },
    },
    displayName: 'Estimate Configuration',
    name: 'estimate_configuration_object',
    displayOptions: {
      show: {
        estimate_abtest_request_object: ['estimate_configuration_object'],
        resource: ['abtest'],
        operation: ['estimateABTest'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Variants',
    name: 'variants_json',
    default: '[]',
    description: 'A/B test variants.',
    required: true,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'variants',
      },
    },
    displayOptions: {
      show: {
        estimate_abtest_request_object: ['variants_json'],
        resource: ['abtest'],
        operation: ['estimateABTest'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '224',
    default: '',
    description: 'Unique A/B test identifier.',
    displayName: 'Id',
    name: 'id_number',
    required: true,
    displayOptions: {
      show: {
        resource: ['abtest'],
        operation: ['getTimeseries'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '2022-09-19',
    default: '',
    routing: {
      request: {
        qs: {
          startDate: '={{ $value }}',
        },
      },
    },
    displayName: 'Start Date',
    name: 'startDate_string',
    displayOptions: {
      show: {
        resource: ['abtest'],
        operation: ['getTimeseries'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '2023-01-21',
    default: '',
    routing: {
      request: {
        qs: {
          endDate: '={{ $value }}',
        },
      },
    },
    displayName: 'End Date',
    name: 'endDate_string',
    displayOptions: {
      show: {
        resource: ['abtest'],
        operation: ['getTimeseries'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Metric',
    name: 'metric_json',
    default: '[]',
    description: undefined,
    required: false,
    routing: {
      request: {
        qs: {
          metric: '={{ JSON.parse($value) }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['abtest'],
        operation: ['getTimeseries'],
      },
    },
  },
];

export default properties;
