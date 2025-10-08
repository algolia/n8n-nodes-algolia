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
        value: 'metrics_fixedCollection',
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
    default: '',
    displayOptions: {
      show: {
        add_abtests_request_object: ['name_string'],
        resource: ['abtest'],
        operation: ['addABTests'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Variants',
    name: 'variants_json',
    default: '[]',
    description: 'A/B test variants.',
    required: false,
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
    type: 'fixedCollection',
    displayName: 'Metrics',
    name: 'metrics_fixedCollection',
    default: '',
    description:
      'A/B test metrics involved in the test. Only these metrics will be considered when calculating results.',
    required: false,
    typeOptions: {
      multipleValues: true,
    },
    options: [
      {
        name: 'metrics_fixedCollection_values',
        displayName: 'Metrics',
        values: [
          {
            type: 'string',
            description: 'Name of the metric.',
            displayName: 'Name',
            name: 'name_string_metrics',
            default: '',
          },
          {
            type: 'string',
            description:
              'Dimension of the metric, for example, in case of a revenue metric it could be USD, EUR...',
            displayName: 'Dimension',
            name: 'dimension_string_metrics',
            default: '',
          },
        ],
      },
    ],
    routing: {
      send: {
        type: 'body',
        value:
          '={{ $parameter.values?.map(item => ({ name: typeof item.name_string_metrics !== "undefined" ? item.name_string_metrics : undefined, dimension: typeof item.dimension_string_metrics !== "undefined" ? item.dimension_string_metrics : undefined })) }}',
        property: 'metrics',
      },
    },
    displayOptions: {
      show: {
        add_abtests_request_object: ['metrics_fixedCollection'],
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
        value: 'filters_fixedCollection_configuration',
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
          '={{ { "minimumDetectableEffect": { "size": typeof $parameter.size_number_minimumDetectableEffect_configuration !== "undefined" ? $parameter.size_number_minimumDetectableEffect_configuration : undefined, "metric": typeof $parameter.metric_options_minimumDetectableEffect_configuration !== "undefined" ? $parameter.metric_options_minimumDetectableEffect_configuration : undefined }, "filters": $parameter.filters_fixedCollection_configuration.filters_fixedCollection_values?.map(item => ({ domain: typeof item.domain_string_filters !== "undefined" ? item.domain_string_filters : undefined, name: typeof item.name_string_filters !== "undefined" ? item.name_string_filters : undefined, trackEffects: typeof item.trackEffects_boolean_filters !== "undefined" ? item.trackEffects_boolean_filters : undefined, includes: typeof item.includes_boolean_filters !== "undefined" ? item.includes_boolean_filters : undefined })), "errorCorrection": typeof $parameter.errorCorrection_options_configuration !== "undefined" ? $parameter.errorCorrection_options_configuration : undefined } }}',
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
    description:
      'Smallest difference in an observable metric between variants.\nFor example, to detect a 10% difference between variants, set this value to 0.1.\n',
    typeOptions: {
      minValue: 0,
      maxValue: 1,
    },
    displayName: 'Size',
    name: 'size_number_minimumDetectableEffect_configuration',
    default: '',
    displayOptions: {
      show: {
        add_abtests_request_object: ['configuration_object'],
        configuration_object: ['minimum_detectable_effect_object_configuration'],
        minimum_detectable_effect_object_configuration: ['size_number_minimumDetectableEffect'],
        resource: ['abtest'],
        operation: ['addABTests'],
      },
    },
  },
  {
    type: 'options',
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
    default: '',
    displayOptions: {
      show: {
        add_abtests_request_object: ['configuration_object'],
        configuration_object: ['minimum_detectable_effect_object_configuration'],
        minimum_detectable_effect_object_configuration: ['metric_options_minimumDetectableEffect'],
        resource: ['abtest'],
        operation: ['addABTests'],
      },
    },
  },
  {
    type: 'fixedCollection',
    displayName: 'Filters',
    name: 'filters_fixedCollection_configuration',
    default: '',
    description: 'List of metric filters applied to the test population.',
    required: false,
    typeOptions: {
      multipleValues: true,
    },
    options: [
      {
        name: 'filters_fixedCollection_values',
        displayName: 'Filters',
        values: [
          {
            type: 'string',
            placeholder: 'abtesting',
            description: 'Metric domain (for example `abtesting`, `personalization`).',
            displayName: 'Domain',
            name: 'domain_string_filters',
            default: '',
          },
          {
            type: 'string',
            placeholder: 'isOutlier',
            description: 'Public metric name.',
            displayName: 'Name',
            name: 'name_string_filters',
            default: '',
          },
          {
            type: 'boolean',
            description: 'Whether the experiment should record the effects of this filter.',
            displayName: 'Track Effects',
            name: 'trackEffects_boolean_filters',
            default: '',
          },
          {
            type: 'boolean',
            description: 'If true, keep items that match the filter; if false, exclude them.',
            displayName: 'Includes',
            name: 'includes_boolean_filters',
            default: '',
          },
        ],
      },
    ],
    displayOptions: {
      show: {
        add_abtests_request_object: ['configuration_object'],
        configuration_object: ['filters_fixedCollection_configuration'],
        resource: ['abtest'],
        operation: ['addABTests'],
      },
    },
  },
  {
    type: 'options',
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
    default: '',
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
    default: '',
    displayOptions: {
      show: {
        add_abtests_request_object: ['endAt_string'],
        resource: ['abtest'],
        operation: ['addABTests'],
      },
    },
  },
  {
    type: 'number',
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
    default: 0,
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
    routing: {
      request: {
        qs: {
          indexPrefix: '={{ $value }}',
        },
      },
    },
    displayName: 'Index Prefix',
    name: 'indexPrefix_string',
    default: '',
    displayOptions: {
      show: {
        resource: ['abtest'],
        operation: ['listABTests'],
      },
    },
  },
  {
    type: 'string',
    routing: {
      request: {
        qs: {
          indexSuffix: '={{ $value }}',
        },
      },
    },
    displayName: 'Index Suffix',
    name: 'indexSuffix_string',
    default: '',
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
    default: '',
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
    description: 'Unique A/B test identifier.',
    displayName: 'Id',
    name: 'id_number',
    default: '',
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
    description: 'Unique A/B test identifier.',
    displayName: 'Id',
    name: 'id_number',
    default: '',
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
    description: 'Unique A/B test identifier.',
    displayName: 'Id',
    name: 'id_number',
    default: '',
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
        value: 'metrics_fixedCollection',
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
    default: '',
    displayOptions: {
      show: {
        schedule_abtests_request_object: ['name_string'],
        resource: ['abtest'],
        operation: ['scheduleABTest'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Variants',
    name: 'variants_json',
    default: '[]',
    description: 'A/B test variants.',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
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
    type: 'fixedCollection',
    displayName: 'Metrics',
    name: 'metrics_fixedCollection',
    default: '',
    description:
      'A/B test metrics involved in the test. Only these metrics will be considered when calculating results.',
    required: false,
    typeOptions: {
      multipleValues: true,
    },
    options: [
      {
        name: 'metrics_fixedCollection_values',
        displayName: 'Metrics',
        values: [
          {
            type: 'string',
            description: 'Name of the metric.',
            displayName: 'Name',
            name: 'name_string_metrics',
            default: '',
          },
          {
            type: 'string',
            description:
              'Dimension of the metric, for example, in case of a revenue metric it could be USD, EUR...',
            displayName: 'Dimension',
            name: 'dimension_string_metrics',
            default: '',
          },
        ],
      },
    ],
    routing: {
      send: {
        type: 'body',
        value:
          '={{ $parameter.values?.map(item => ({ name: typeof item.name_string_metrics !== "undefined" ? item.name_string_metrics : undefined, dimension: typeof item.dimension_string_metrics !== "undefined" ? item.dimension_string_metrics : undefined })) }}',
        property: 'metrics',
      },
    },
    displayOptions: {
      show: {
        schedule_abtests_request_object: ['metrics_fixedCollection'],
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
        value: 'filters_fixedCollection_configuration',
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
          '={{ { "minimumDetectableEffect": { "size": typeof $parameter.size_number_minimumDetectableEffect_configuration !== "undefined" ? $parameter.size_number_minimumDetectableEffect_configuration : undefined, "metric": typeof $parameter.metric_options_minimumDetectableEffect_configuration !== "undefined" ? $parameter.metric_options_minimumDetectableEffect_configuration : undefined }, "filters": $parameter.filters_fixedCollection_configuration.filters_fixedCollection_values?.map(item => ({ domain: typeof item.domain_string_filters !== "undefined" ? item.domain_string_filters : undefined, name: typeof item.name_string_filters !== "undefined" ? item.name_string_filters : undefined, trackEffects: typeof item.trackEffects_boolean_filters !== "undefined" ? item.trackEffects_boolean_filters : undefined, includes: typeof item.includes_boolean_filters !== "undefined" ? item.includes_boolean_filters : undefined })), "errorCorrection": typeof $parameter.errorCorrection_options_configuration !== "undefined" ? $parameter.errorCorrection_options_configuration : undefined } }}',
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
    description:
      'Smallest difference in an observable metric between variants.\nFor example, to detect a 10% difference between variants, set this value to 0.1.\n',
    typeOptions: {
      minValue: 0,
      maxValue: 1,
    },
    displayName: 'Size',
    name: 'size_number_minimumDetectableEffect_configuration',
    default: '',
    displayOptions: {
      show: {
        schedule_abtests_request_object: ['configuration_object'],
        configuration_object: ['minimum_detectable_effect_object_configuration'],
        minimum_detectable_effect_object_configuration: ['size_number_minimumDetectableEffect'],
        resource: ['abtest'],
        operation: ['scheduleABTest'],
      },
    },
  },
  {
    type: 'options',
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
    default: '',
    displayOptions: {
      show: {
        schedule_abtests_request_object: ['configuration_object'],
        configuration_object: ['minimum_detectable_effect_object_configuration'],
        minimum_detectable_effect_object_configuration: ['metric_options_minimumDetectableEffect'],
        resource: ['abtest'],
        operation: ['scheduleABTest'],
      },
    },
  },
  {
    type: 'fixedCollection',
    displayName: 'Filters',
    name: 'filters_fixedCollection_configuration',
    default: '',
    description: 'List of metric filters applied to the test population.',
    required: false,
    typeOptions: {
      multipleValues: true,
    },
    options: [
      {
        name: 'filters_fixedCollection_values',
        displayName: 'Filters',
        values: [
          {
            type: 'string',
            placeholder: 'abtesting',
            description: 'Metric domain (for example `abtesting`, `personalization`).',
            displayName: 'Domain',
            name: 'domain_string_filters',
            default: '',
          },
          {
            type: 'string',
            placeholder: 'isOutlier',
            description: 'Public metric name.',
            displayName: 'Name',
            name: 'name_string_filters',
            default: '',
          },
          {
            type: 'boolean',
            description: 'Whether the experiment should record the effects of this filter.',
            displayName: 'Track Effects',
            name: 'trackEffects_boolean_filters',
            default: '',
          },
          {
            type: 'boolean',
            description: 'If true, keep items that match the filter; if false, exclude them.',
            displayName: 'Includes',
            name: 'includes_boolean_filters',
            default: '',
          },
        ],
      },
    ],
    displayOptions: {
      show: {
        schedule_abtests_request_object: ['configuration_object'],
        configuration_object: ['filters_fixedCollection_configuration'],
        resource: ['abtest'],
        operation: ['scheduleABTest'],
      },
    },
  },
  {
    type: 'options',
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
    default: '',
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
    default: '',
    displayOptions: {
      show: {
        schedule_abtests_request_object: ['scheduledAt_string'],
        resource: ['abtest'],
        operation: ['scheduleABTest'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '2023-06-17T00:00:00Z',
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
    default: '',
    displayOptions: {
      show: {
        schedule_abtests_request_object: ['endAt_string'],
        resource: ['abtest'],
        operation: ['scheduleABTest'],
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
        value: 'filters_fixedCollection_configuration',
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
          '={{ { "filters": $parameter.filters_fixedCollection_configuration.filters_fixedCollection_values?.map(item => ({ domain: typeof item.domain_string_filters !== "undefined" ? item.domain_string_filters : undefined, name: typeof item.name_string_filters !== "undefined" ? item.name_string_filters : undefined, trackEffects: typeof item.trackEffects_boolean_filters !== "undefined" ? item.trackEffects_boolean_filters : undefined, includes: typeof item.includes_boolean_filters !== "undefined" ? item.includes_boolean_filters : undefined })), "minimumDetectableEffect": { "size": typeof $parameter.size_number_minimumDetectableEffect_configuration !== "undefined" ? $parameter.size_number_minimumDetectableEffect_configuration : undefined, "metric": typeof $parameter.metric_options_minimumDetectableEffect_configuration !== "undefined" ? $parameter.metric_options_minimumDetectableEffect_configuration : undefined } } }}',
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
    type: 'fixedCollection',
    displayName: 'Filters',
    name: 'filters_fixedCollection_configuration',
    default: '',
    description: 'List of metric filters applied to the test population.',
    required: false,
    typeOptions: {
      multipleValues: true,
    },
    options: [
      {
        name: 'filters_fixedCollection_values',
        displayName: 'Filters',
        values: [
          {
            type: 'string',
            placeholder: 'abtesting',
            description: 'Metric domain (for example `abtesting`, `personalization`).',
            displayName: 'Domain',
            name: 'domain_string_filters',
            default: '',
          },
          {
            type: 'string',
            placeholder: 'isOutlier',
            description: 'Public metric name.',
            displayName: 'Name',
            name: 'name_string_filters',
            default: '',
          },
          {
            type: 'boolean',
            description: 'Whether the experiment should record the effects of this filter.',
            displayName: 'Track Effects',
            name: 'trackEffects_boolean_filters',
            default: '',
          },
          {
            type: 'boolean',
            description: 'If true, keep items that match the filter; if false, exclude them.',
            displayName: 'Includes',
            name: 'includes_boolean_filters',
            default: '',
          },
        ],
      },
    ],
    displayOptions: {
      show: {
        estimate_abtest_request_object: ['estimate_configuration_object'],
        estimate_configuration_object: ['filters_fixedCollection_configuration'],
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
    description:
      'Smallest difference in an observable metric between variants.\nFor example, to detect a 10% difference between variants, set this value to 0.1.\n',
    typeOptions: {
      minValue: 0,
      maxValue: 1,
    },
    displayName: 'Size',
    name: 'size_number_minimumDetectableEffect_configuration',
    default: '',
    displayOptions: {
      show: {
        estimate_abtest_request_object: ['estimate_configuration_object'],
        estimate_configuration_object: ['minimum_detectable_effect_object_configuration'],
        minimum_detectable_effect_object_configuration: ['size_number_minimumDetectableEffect'],
        resource: ['abtest'],
        operation: ['estimateABTest'],
      },
    },
  },
  {
    type: 'options',
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
    default: '',
    displayOptions: {
      show: {
        estimate_abtest_request_object: ['estimate_configuration_object'],
        estimate_configuration_object: ['minimum_detectable_effect_object_configuration'],
        minimum_detectable_effect_object_configuration: ['metric_options_minimumDetectableEffect'],
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
    required: false,
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
    description: 'Unique A/B test identifier.',
    displayName: 'Id',
    name: 'id_number',
    default: '',
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
    routing: {
      request: {
        qs: {
          startDate: '={{ $value }}',
        },
      },
    },
    displayName: 'Start Date',
    name: 'startDate_string',
    default: '',
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
    routing: {
      request: {
        qs: {
          endDate: '={{ $value }}',
        },
      },
    },
    displayName: 'End Date',
    name: 'endDate_string',
    default: '',
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
