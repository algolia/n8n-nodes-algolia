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
        name: 'Schedule an A/B test',
        value: 'scheduleABTest',
        action: 'Schedule an A/B test',
        description: 'Schedule an A/B test to be started at a later time.',
        routing: {
          request: {
            method: 'POST',
            url: '=/3/abtests/schedule',
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
        value: '={{ $value }}',
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
        value: '={{ $value }}',
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
    displayName: 'Configuration',
    name: 'configuration_object',
    type: 'multiOptions',
    description: 'A/B test configuration.',
    required: false,
    default: [],
    options: [
      {
        name: 'Minimum Detectable Effect',
        value: 'minimum_detectable_effect_object_configuration',
      },
      {
        name: 'Filters',
        value: 'filters_json_configuration',
      },
      {
        name: 'Error Correction',
        value: 'errorCorrection_options_configuration',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'configuration',
        value:
          '={{ { "minimumDetectableEffect": { "size": typeof $parameter.size_number_minimumDetectableEffect_configuration !== "undefined" ? $parameter.size_number_minimumDetectableEffect_configuration : undefined, "metric": typeof $parameter.metric_options_minimumDetectableEffect_configuration !== "undefined" ? $parameter.metric_options_minimumDetectableEffect_configuration : undefined }, "filters": typeof $parameter.filters_json_configuration !== "undefined" ? JSON.parse($parameter.filters_json_configuration) : undefined, "errorCorrection": typeof $parameter.errorCorrection_options_configuration !== "undefined" ? $parameter.errorCorrection_options_configuration : undefined } }}',
      },
    },
    displayOptions: {
      show: {
        add_abtests_request_object: ['configuration_object'],
        resource: ['abtest'],
        operation: ['addABTests'],
      },
    },
  },
  {
    displayName: 'Minimum Detectable Effect',
    name: 'minimum_detectable_effect_object_configuration',
    type: 'multiOptions',
    description:
      'Configuration for the smallest difference between test variants you want to detect.',
    required: true,
    default: [],
    options: [
      {
        name: 'Size',
        value: 'size_number_minimumDetectableEffect',
      },
      {
        name: 'Metric',
        value: 'metric_options_minimumDetectableEffect',
      },
    ],
    displayOptions: {
      show: {
        add_abtests_request_object: ['configuration_object'],
        configuration_object: ['minimum_detectable_effect_object_configuration'],
        resource: ['abtest'],
        operation: ['addABTests'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description:
      'Smallest difference in an observable metric between variants.\nFor example, to detect a 10% difference between variants, set this value to 0.1.\n',
    typeOptions: {
      minValue: 0,
      maxValue: 1,
    },
    displayName: 'Size',
    name: 'size_number_minimumDetectableEffect_configuration',
    displayOptions: {
      show: {
        add_abtests_request_object: ['configuration_object'],
        configuration_object: ['minimum_detectable_effect_object_configuration'],
        minimum_detectable_effect_object_configuration: ['size_number_minimumDetectableEffect'],
        resource: ['abtest'],
        operation: ['addABTests'],
      },
    },
    required: true,
  },
  {
    type: 'options',
    default: '',
    description: 'Metric for which you want to detect the smallest relative difference.',
    options: [
      {
        name: 'addToCartRate',
        value: 'addToCartRate',
      },
      {
        name: 'clickThroughRate',
        value: 'clickThroughRate',
      },
      {
        name: 'conversionRate',
        value: 'conversionRate',
      },
      {
        name: 'purchaseRate',
        value: 'purchaseRate',
      },
      {
        name: 'noResultsRate',
        value: 'noResultsRate',
      },
    ],
    displayName: 'Metric',
    name: 'metric_options_minimumDetectableEffect_configuration',
    displayOptions: {
      show: {
        add_abtests_request_object: ['configuration_object'],
        configuration_object: ['minimum_detectable_effect_object_configuration'],
        minimum_detectable_effect_object_configuration: ['metric_options_minimumDetectableEffect'],
        resource: ['abtest'],
        operation: ['addABTests'],
      },
    },
    required: true,
  },
  {
    type: 'json',
    displayName: 'Filters',
    name: 'filters_json_configuration',
    default: '[]',
    description: 'List of metric filters applied to the test population.',
    required: false,
    displayOptions: {
      show: {
        add_abtests_request_object: ['configuration_object'],
        configuration_object: ['filters_json_configuration'],
        resource: ['abtest'],
        operation: ['addABTests'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description: 'Multiple-testing correction method applied when evaluating metric significance.',
    options: [
      {
        name: 'bonferroni',
        value: 'bonferroni',
      },
      {
        name: 'benjamini-hochberg',
        value: 'benjamini-hochberg',
      },
    ],
    displayName: 'Error Correction',
    name: 'errorCorrection_options_configuration',
    displayOptions: {
      show: {
        add_abtests_request_object: ['configuration_object'],
        configuration_object: ['errorCorrection_options_configuration'],
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
    displayName: 'Schedule ABTests Request',
    name: 'schedule_abtests_request_object',
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
        name: 'Scheduled At',
        value: 'scheduledAt_string',
      },
      {
        name: 'End At',
        value: 'endAt_string',
      },
    ],
    displayOptions: {
      show: {
        resource: ['abtest'],
        operation: ['scheduleABTest'],
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
        schedule_abtests_request_object: ['name_string'],
        resource: ['abtest'],
        operation: ['scheduleABTest'],
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
        value: '={{ $value }}',
        property: 'variants',
      },
    },
    displayOptions: {
      show: {
        schedule_abtests_request_object: ['variants_json'],
        resource: ['abtest'],
        operation: ['scheduleABTest'],
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
        value: '={{ $value }}',
        property: 'metrics',
      },
    },
    displayOptions: {
      show: {
        schedule_abtests_request_object: ['metrics_json'],
        resource: ['abtest'],
        operation: ['scheduleABTest'],
      },
    },
  },
  {
    displayName: 'Configuration',
    name: 'configuration_object',
    type: 'multiOptions',
    description: 'A/B test configuration.',
    required: false,
    default: [],
    options: [
      {
        name: 'Minimum Detectable Effect',
        value: 'minimum_detectable_effect_object_configuration',
      },
      {
        name: 'Filters',
        value: 'filters_json_configuration',
      },
      {
        name: 'Error Correction',
        value: 'errorCorrection_options_configuration',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'configuration',
        value:
          '={{ { "minimumDetectableEffect": { "size": typeof $parameter.size_number_minimumDetectableEffect_configuration !== "undefined" ? $parameter.size_number_minimumDetectableEffect_configuration : undefined, "metric": typeof $parameter.metric_options_minimumDetectableEffect_configuration !== "undefined" ? $parameter.metric_options_minimumDetectableEffect_configuration : undefined }, "filters": typeof $parameter.filters_json_configuration !== "undefined" ? JSON.parse($parameter.filters_json_configuration) : undefined, "errorCorrection": typeof $parameter.errorCorrection_options_configuration !== "undefined" ? $parameter.errorCorrection_options_configuration : undefined } }}',
      },
    },
    displayOptions: {
      show: {
        schedule_abtests_request_object: ['configuration_object'],
        resource: ['abtest'],
        operation: ['scheduleABTest'],
      },
    },
  },
  {
    displayName: 'Minimum Detectable Effect',
    name: 'minimum_detectable_effect_object_configuration',
    type: 'multiOptions',
    description:
      'Configuration for the smallest difference between test variants you want to detect.',
    required: true,
    default: [],
    options: [
      {
        name: 'Size',
        value: 'size_number_minimumDetectableEffect',
      },
      {
        name: 'Metric',
        value: 'metric_options_minimumDetectableEffect',
      },
    ],
    displayOptions: {
      show: {
        schedule_abtests_request_object: ['configuration_object'],
        configuration_object: ['minimum_detectable_effect_object_configuration'],
        resource: ['abtest'],
        operation: ['scheduleABTest'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description:
      'Smallest difference in an observable metric between variants.\nFor example, to detect a 10% difference between variants, set this value to 0.1.\n',
    typeOptions: {
      minValue: 0,
      maxValue: 1,
    },
    displayName: 'Size',
    name: 'size_number_minimumDetectableEffect_configuration',
    displayOptions: {
      show: {
        schedule_abtests_request_object: ['configuration_object'],
        configuration_object: ['minimum_detectable_effect_object_configuration'],
        minimum_detectable_effect_object_configuration: ['size_number_minimumDetectableEffect'],
        resource: ['abtest'],
        operation: ['scheduleABTest'],
      },
    },
    required: true,
  },
  {
    type: 'options',
    default: '',
    description: 'Metric for which you want to detect the smallest relative difference.',
    options: [
      {
        name: 'addToCartRate',
        value: 'addToCartRate',
      },
      {
        name: 'clickThroughRate',
        value: 'clickThroughRate',
      },
      {
        name: 'conversionRate',
        value: 'conversionRate',
      },
      {
        name: 'purchaseRate',
        value: 'purchaseRate',
      },
      {
        name: 'noResultsRate',
        value: 'noResultsRate',
      },
    ],
    displayName: 'Metric',
    name: 'metric_options_minimumDetectableEffect_configuration',
    displayOptions: {
      show: {
        schedule_abtests_request_object: ['configuration_object'],
        configuration_object: ['minimum_detectable_effect_object_configuration'],
        minimum_detectable_effect_object_configuration: ['metric_options_minimumDetectableEffect'],
        resource: ['abtest'],
        operation: ['scheduleABTest'],
      },
    },
    required: true,
  },
  {
    type: 'json',
    displayName: 'Filters',
    name: 'filters_json_configuration',
    default: '[]',
    description: 'List of metric filters applied to the test population.',
    required: false,
    displayOptions: {
      show: {
        schedule_abtests_request_object: ['configuration_object'],
        configuration_object: ['filters_json_configuration'],
        resource: ['abtest'],
        operation: ['scheduleABTest'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description: 'Multiple-testing correction method applied when evaluating metric significance.',
    options: [
      {
        name: 'bonferroni',
        value: 'bonferroni',
      },
      {
        name: 'benjamini-hochberg',
        value: 'benjamini-hochberg',
      },
    ],
    displayName: 'Error Correction',
    name: 'errorCorrection_options_configuration',
    displayOptions: {
      show: {
        schedule_abtests_request_object: ['configuration_object'],
        configuration_object: ['errorCorrection_options_configuration'],
        resource: ['abtest'],
        operation: ['scheduleABTest'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '2023-06-15T15:06:44.400601Z',
    default: '',
    description: 'Date and time when the A/B test is scheduled to start, in RFC 3339 format.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'scheduledAt',
      },
    },
    displayName: 'Scheduled At',
    name: 'scheduledAt_string',
    displayOptions: {
      show: {
        schedule_abtests_request_object: ['scheduledAt_string'],
        resource: ['abtest'],
        operation: ['scheduleABTest'],
      },
    },
    required: true,
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
        schedule_abtests_request_object: ['endAt_string'],
        resource: ['abtest'],
        operation: ['scheduleABTest'],
      },
    },
    required: true,
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
    displayName: 'Estimate Configuration',
    name: 'estimate_configuration_object',
    type: 'multiOptions',
    description:
      'A/B test configuration for estimating the sample size and duration using minimum detectable effect.',
    required: true,
    default: [],
    options: [
      {
        name: 'Filters',
        value: 'filters_json_configuration',
      },
      {
        name: 'Minimum Detectable Effect',
        value: 'minimum_detectable_effect_object_configuration',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'configuration',
        value:
          '={{ { "filters": typeof $parameter.filters_json_configuration !== "undefined" ? JSON.parse($parameter.filters_json_configuration) : undefined, "minimumDetectableEffect": { "size": typeof $parameter.size_number_minimumDetectableEffect_configuration !== "undefined" ? $parameter.size_number_minimumDetectableEffect_configuration : undefined, "metric": typeof $parameter.metric_options_minimumDetectableEffect_configuration !== "undefined" ? $parameter.metric_options_minimumDetectableEffect_configuration : undefined } } }}',
      },
    },
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
    displayName: 'Filters',
    name: 'filters_json_configuration',
    default: '[]',
    description: 'List of metric filters applied to the test population.',
    required: false,
    displayOptions: {
      show: {
        estimate_abtest_request_object: ['estimate_configuration_object'],
        estimate_configuration_object: ['filters_json_configuration'],
        resource: ['abtest'],
        operation: ['estimateABTest'],
      },
    },
  },
  {
    displayName: 'Minimum Detectable Effect',
    name: 'minimum_detectable_effect_object_configuration',
    type: 'multiOptions',
    description:
      'Configuration for the smallest difference between test variants you want to detect.',
    required: true,
    default: [],
    options: [
      {
        name: 'Size',
        value: 'size_number_minimumDetectableEffect',
      },
      {
        name: 'Metric',
        value: 'metric_options_minimumDetectableEffect',
      },
    ],
    displayOptions: {
      show: {
        estimate_abtest_request_object: ['estimate_configuration_object'],
        estimate_configuration_object: ['minimum_detectable_effect_object_configuration'],
        resource: ['abtest'],
        operation: ['estimateABTest'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description:
      'Smallest difference in an observable metric between variants.\nFor example, to detect a 10% difference between variants, set this value to 0.1.\n',
    typeOptions: {
      minValue: 0,
      maxValue: 1,
    },
    displayName: 'Size',
    name: 'size_number_minimumDetectableEffect_configuration',
    displayOptions: {
      show: {
        estimate_abtest_request_object: ['estimate_configuration_object'],
        estimate_configuration_object: ['minimum_detectable_effect_object_configuration'],
        minimum_detectable_effect_object_configuration: ['size_number_minimumDetectableEffect'],
        resource: ['abtest'],
        operation: ['estimateABTest'],
      },
    },
    required: true,
  },
  {
    type: 'options',
    default: '',
    description: 'Metric for which you want to detect the smallest relative difference.',
    options: [
      {
        name: 'addToCartRate',
        value: 'addToCartRate',
      },
      {
        name: 'clickThroughRate',
        value: 'clickThroughRate',
      },
      {
        name: 'conversionRate',
        value: 'conversionRate',
      },
      {
        name: 'purchaseRate',
        value: 'purchaseRate',
      },
      {
        name: 'noResultsRate',
        value: 'noResultsRate',
      },
    ],
    displayName: 'Metric',
    name: 'metric_options_minimumDetectableEffect_configuration',
    displayOptions: {
      show: {
        estimate_abtest_request_object: ['estimate_configuration_object'],
        estimate_configuration_object: ['minimum_detectable_effect_object_configuration'],
        minimum_detectable_effect_object_configuration: ['metric_options_minimumDetectableEffect'],
        resource: ['abtest'],
        operation: ['estimateABTest'],
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
        value: '={{ $value }}',
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
          metric: '={{ $value }}',
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
