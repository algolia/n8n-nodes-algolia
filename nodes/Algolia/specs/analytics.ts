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
        name: 'click',
        value: 'click',
        description:
          'Metrics related to click and conversion events,\nsuch as click and conversion rates for your search results',
      },
      {
        name: 'filter',
        value: 'filter',
        description: 'Metrics related to filters',
      },
      {
        name: 'revenue',
        value: 'revenue',
        description: 'Metrics related to revenue',
      },
      {
        name: 'search',
        value: 'search',
        description:
          'Metrics related to searches and search results,\nsuch as the no-results rate or the most frequent search queries',
      },
      {
        name: 'status',
        value: 'status',
        description: 'Check the status of the Analytics API',
      },
      {
        name: 'user',
        value: 'user',
        description: 'Metrics related to the users of your search',
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
        name: 'Retrieve top searches',
        value: 'getTopSearches',
        action: 'Retrieve top searches',
        description:
          'Returns the most popular searches. For each search, it also includes the average number of hits.',
        routing: {
          request: {
            method: 'GET',
            url: '=/2/searches',
          },
        },
      },
      {
        name: 'Retrieve number of searches',
        value: 'getSearchesCount',
        action: 'Retrieve number of searches',
        description:
          'Retrieves the number of searches within a time range, including a daily breakdown.',
        routing: {
          request: {
            method: 'GET',
            url: '=/2/searches/count',
          },
        },
      },
      {
        name: 'Retrieve the most frequent searches without results',
        value: 'getSearchesNoResults',
        action: 'Retrieve the most frequent searches without results',
        description: 'Retrieves the 1,000 most frequent searches that produced zero results.',
        routing: {
          request: {
            method: 'GET',
            url: '=/2/searches/noResults',
          },
        },
      },
      {
        name: 'Retrieve no results rate',
        value: 'getNoResultsRate',
        action: 'Retrieve no results rate',
        description:
          "Retrieves the fraction of searches that didn't return any results within a time range, including a daily breakdown.",
        routing: {
          request: {
            method: 'GET',
            url: '=/2/searches/noResultRate',
          },
        },
      },
      {
        name: 'Retrieve top search results',
        value: 'getTopHits',
        action: 'Retrieve top search results',
        description: 'Retrieves the object IDs of the 1,000 most frequent search results.',
        routing: {
          request: {
            method: 'GET',
            url: '=/2/hits',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['search'],
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
        name: 'Retrieve top searches without clicks',
        value: 'getSearchesNoClicks',
        action: 'Retrieve top searches without clicks',
        description:
          "Retrieves the most popular searches that didn't lead to any clicks, from the 1,000 most frequent searches.",
        routing: {
          request: {
            method: 'GET',
            url: '=/2/searches/noClicks',
          },
        },
      },
      {
        name: 'Retrieve no click rate',
        value: 'getNoClickRate',
        action: 'Retrieve no click rate',
        description:
          "Retrieves the fraction of searches that didn't lead to any click within a time range, including a daily breakdown.",
        routing: {
          request: {
            method: 'GET',
            url: '=/2/searches/noClickRate',
          },
        },
      },
      {
        name: 'Retrieve average click position',
        value: 'getAverageClickPosition',
        action: 'Retrieve average click position',
        description:
          'Retrieves the average click position of your search results, including a daily breakdown.',
        routing: {
          request: {
            method: 'GET',
            url: '=/2/clicks/averageClickPosition',
          },
        },
      },
      {
        name: 'Retrieve click positions',
        value: 'getClickPositions',
        action: 'Retrieve click positions',
        description:
          'Retrieves the positions in the search results and their associated number of clicks.',
        routing: {
          request: {
            method: 'GET',
            url: '=/2/clicks/positions',
          },
        },
      },
      {
        name: 'Retrieve click-through rate',
        value: 'getClickThroughRate',
        action: 'Retrieve click-through rate',
        description:
          'Retrieves the click-through rate (CTR) for all your searches with at least one click event, including a daily breakdown.',
        routing: {
          request: {
            method: 'GET',
            url: '=/2/clicks/clickThroughRate',
          },
        },
      },
      {
        name: 'Retrieve conversion rate',
        value: 'getConversionRate',
        action: 'Retrieve conversion rate',
        description:
          'Retrieves the conversion rate (CR) for all your searches with at least one conversion event, including a daily breakdown.',
        routing: {
          request: {
            method: 'GET',
            url: '=/2/conversions/conversionRate',
          },
        },
      },
      {
        name: 'Retrieve add-to-cart rate',
        value: 'getAddToCartRate',
        action: 'Retrieve add-to-cart rate',
        description:
          'Retrieves the add-to-cart rate for all your searches with at least one add-to-cart event, including a daily breakdown.',
        routing: {
          request: {
            method: 'GET',
            url: '=/2/conversions/addToCartRate',
          },
        },
      },
      {
        name: 'Retrieve purchase rate',
        value: 'getPurchaseRate',
        action: 'Retrieve purchase rate',
        description:
          'Retrieves the purchase rate for all your searches with at least one purchase event, including a daily breakdown.',
        routing: {
          request: {
            method: 'GET',
            url: '=/2/conversions/purchaseRate',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['click'],
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
        name: 'Retrieve number of users',
        value: 'getUsersCount',
        action: 'Retrieve number of users',
        description:
          'Retrieves the number of unique users within a time range, including a daily breakdown.',
        routing: {
          request: {
            method: 'GET',
            url: '=/2/users/count',
          },
        },
      },
      {
        name: 'Retrieve top countries',
        value: 'getTopCountries',
        action: 'Retrieve top countries',
        description: 'Retrieves the countries with the most searches in your index.',
        routing: {
          request: {
            method: 'GET',
            url: '=/2/countries',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['user'],
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
        name: 'Retrieve top filters',
        value: 'getTopFilterAttributes',
        action: 'Retrieve top filters',
        description: 'Retrieves the 1,000 most frequently used filter attributes.',
        routing: {
          request: {
            method: 'GET',
            url: '=/2/filters',
          },
        },
      },
      {
        name: 'Retrieve top filter values',
        value: 'getTopFilterForAttribute',
        action: 'Retrieve top filter values',
        description:
          'Retrieves the 1,000 most frequent filter (facet) values for a filter attribute.',
        routing: {
          request: {
            method: 'GET',
            url: '=/2/filters/{{ $parameter.attribute_string }}',
          },
        },
      },
      {
        name: 'Retrieve top filters for a search without results',
        value: 'getTopFiltersNoResults',
        action: 'Retrieve top filters for a search without results',
        description:
          "Retrieves the 1,000 most frequently used filters for a search that didn't return any results.",
        routing: {
          request: {
            method: 'GET',
            url: '=/2/filters/noResults',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['filter'],
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
        name: 'Retrieve revenue data',
        value: 'getRevenue',
        action: 'Retrieve revenue data',
        description:
          'Retrieves revenue-related metrics, such as the total revenue or the average order value.',
        routing: {
          request: {
            method: 'GET',
            url: '=/2/conversions/revenue',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['revenue'],
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
        name: 'Retrieve update status',
        value: 'getStatus',
        action: 'Retrieve update status',
        description:
          'Retrieves the time when the Analytics data for the specified index was last updated.',
        routing: {
          request: {
            method: 'GET',
            url: '=/2/status',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['status'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'ALGOLIA_INDEX_NAME',
    routing: {
      request: {
        qs: {
          index: '={{ $value }}',
        },
      },
    },
    displayName: 'Index',
    name: 'index_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['search'],
        operation: ['getTopSearches'],
      },
    },
  },
  {
    type: 'boolean',
    routing: {
      request: {
        qs: {
          clickAnalytics: '={{ $value }}',
        },
      },
    },
    displayName: 'Click Analytics',
    name: 'clickAnalytics_boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['search'],
        operation: ['getTopSearches'],
      },
    },
  },
  {
    type: 'boolean',
    routing: {
      request: {
        qs: {
          revenueAnalytics: '={{ $value }}',
        },
      },
    },
    displayName: 'Revenue Analytics',
    name: 'revenueAnalytics_boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['search'],
        operation: ['getTopSearches'],
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
        resource: ['search'],
        operation: ['getTopSearches'],
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
        resource: ['search'],
        operation: ['getTopSearches'],
      },
    },
  },
  {
    type: 'options',
    default: 'searchCount',
    description:
      'Attribute by which to order the response items.\n\nIf the `clickAnalytics` parameter is false, only `searchCount` is available.\n',
    options: [
      {
        name: 'searchCount',
        value: 'searchCount',
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
        name: 'averageClickPosition',
        value: 'averageClickPosition',
      },
    ],
    routing: {
      request: {
        qs: {
          orderBy: '={{ $value }}',
        },
      },
    },
    displayName: 'Order By',
    name: 'orderBy_options',
    displayOptions: {
      show: {
        resource: ['search'],
        operation: ['getTopSearches'],
      },
    },
  },
  {
    type: 'options',
    default: 'asc',
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
        resource: ['search'],
        operation: ['getTopSearches'],
      },
    },
  },
  {
    type: 'number',
    default: 10,
    typeOptions: {
      maxValue: 1000,
    },
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
        resource: ['search'],
        operation: ['getTopSearches'],
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
        resource: ['search'],
        operation: ['getTopSearches'],
      },
    },
  },
  {
    type: 'string',
    routing: {
      request: {
        qs: {
          tags: '={{ $value }}',
        },
      },
    },
    displayName: 'Tags',
    name: 'tags_string',
    default: '',
    displayOptions: {
      show: {
        resource: ['search'],
        operation: ['getTopSearches'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'ALGOLIA_INDEX_NAME',
    routing: {
      request: {
        qs: {
          index: '={{ $value }}',
        },
      },
    },
    displayName: 'Index',
    name: 'index_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['search'],
        operation: ['getSearchesCount'],
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
        resource: ['search'],
        operation: ['getSearchesCount'],
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
        resource: ['search'],
        operation: ['getSearchesCount'],
      },
    },
  },
  {
    type: 'string',
    routing: {
      request: {
        qs: {
          tags: '={{ $value }}',
        },
      },
    },
    displayName: 'Tags',
    name: 'tags_string',
    default: '',
    displayOptions: {
      show: {
        resource: ['search'],
        operation: ['getSearchesCount'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'ALGOLIA_INDEX_NAME',
    routing: {
      request: {
        qs: {
          index: '={{ $value }}',
        },
      },
    },
    displayName: 'Index',
    name: 'index_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['search'],
        operation: ['getSearchesNoResults'],
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
        resource: ['search'],
        operation: ['getSearchesNoResults'],
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
        resource: ['search'],
        operation: ['getSearchesNoResults'],
      },
    },
  },
  {
    type: 'number',
    default: 10,
    typeOptions: {
      maxValue: 1000,
    },
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
        resource: ['search'],
        operation: ['getSearchesNoResults'],
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
        resource: ['search'],
        operation: ['getSearchesNoResults'],
      },
    },
  },
  {
    type: 'string',
    routing: {
      request: {
        qs: {
          tags: '={{ $value }}',
        },
      },
    },
    displayName: 'Tags',
    name: 'tags_string',
    default: '',
    displayOptions: {
      show: {
        resource: ['search'],
        operation: ['getSearchesNoResults'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'ALGOLIA_INDEX_NAME',
    routing: {
      request: {
        qs: {
          index: '={{ $value }}',
        },
      },
    },
    displayName: 'Index',
    name: 'index_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['click'],
        operation: ['getSearchesNoClicks'],
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
        resource: ['click'],
        operation: ['getSearchesNoClicks'],
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
        resource: ['click'],
        operation: ['getSearchesNoClicks'],
      },
    },
  },
  {
    type: 'number',
    default: 10,
    typeOptions: {
      maxValue: 1000,
    },
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
        resource: ['click'],
        operation: ['getSearchesNoClicks'],
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
        resource: ['click'],
        operation: ['getSearchesNoClicks'],
      },
    },
  },
  {
    type: 'string',
    routing: {
      request: {
        qs: {
          tags: '={{ $value }}',
        },
      },
    },
    displayName: 'Tags',
    name: 'tags_string',
    default: '',
    displayOptions: {
      show: {
        resource: ['click'],
        operation: ['getSearchesNoClicks'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'ALGOLIA_INDEX_NAME',
    routing: {
      request: {
        qs: {
          index: '={{ $value }}',
        },
      },
    },
    displayName: 'Index',
    name: 'index_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['search'],
        operation: ['getNoResultsRate'],
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
        resource: ['search'],
        operation: ['getNoResultsRate'],
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
        resource: ['search'],
        operation: ['getNoResultsRate'],
      },
    },
  },
  {
    type: 'string',
    routing: {
      request: {
        qs: {
          tags: '={{ $value }}',
        },
      },
    },
    displayName: 'Tags',
    name: 'tags_string',
    default: '',
    displayOptions: {
      show: {
        resource: ['search'],
        operation: ['getNoResultsRate'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'ALGOLIA_INDEX_NAME',
    routing: {
      request: {
        qs: {
          index: '={{ $value }}',
        },
      },
    },
    displayName: 'Index',
    name: 'index_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['click'],
        operation: ['getNoClickRate'],
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
        resource: ['click'],
        operation: ['getNoClickRate'],
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
        resource: ['click'],
        operation: ['getNoClickRate'],
      },
    },
  },
  {
    type: 'string',
    routing: {
      request: {
        qs: {
          tags: '={{ $value }}',
        },
      },
    },
    displayName: 'Tags',
    name: 'tags_string',
    default: '',
    displayOptions: {
      show: {
        resource: ['click'],
        operation: ['getNoClickRate'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'ALGOLIA_INDEX_NAME',
    routing: {
      request: {
        qs: {
          index: '={{ $value }}',
        },
      },
    },
    displayName: 'Index',
    name: 'index_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['search'],
        operation: ['getTopHits'],
      },
    },
  },
  {
    type: 'string',
    routing: {
      request: {
        qs: {
          search: '={{ $value }}',
        },
      },
    },
    displayName: 'Search',
    name: 'search_string',
    default: '',
    displayOptions: {
      show: {
        resource: ['search'],
        operation: ['getTopHits'],
      },
    },
  },
  {
    type: 'boolean',
    routing: {
      request: {
        qs: {
          clickAnalytics: '={{ $value }}',
        },
      },
    },
    displayName: 'Click Analytics',
    name: 'clickAnalytics_boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['search'],
        operation: ['getTopHits'],
      },
    },
  },
  {
    type: 'boolean',
    routing: {
      request: {
        qs: {
          revenueAnalytics: '={{ $value }}',
        },
      },
    },
    displayName: 'Revenue Analytics',
    name: 'revenueAnalytics_boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['search'],
        operation: ['getTopHits'],
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
        resource: ['search'],
        operation: ['getTopHits'],
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
        resource: ['search'],
        operation: ['getTopHits'],
      },
    },
  },
  {
    type: 'number',
    default: 10,
    typeOptions: {
      maxValue: 1000,
    },
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
        resource: ['search'],
        operation: ['getTopHits'],
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
        resource: ['search'],
        operation: ['getTopHits'],
      },
    },
  },
  {
    type: 'string',
    routing: {
      request: {
        qs: {
          tags: '={{ $value }}',
        },
      },
    },
    displayName: 'Tags',
    name: 'tags_string',
    default: '',
    displayOptions: {
      show: {
        resource: ['search'],
        operation: ['getTopHits'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'ALGOLIA_INDEX_NAME',
    routing: {
      request: {
        qs: {
          index: '={{ $value }}',
        },
      },
    },
    displayName: 'Index',
    name: 'index_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['user'],
        operation: ['getUsersCount'],
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
        resource: ['user'],
        operation: ['getUsersCount'],
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
        resource: ['user'],
        operation: ['getUsersCount'],
      },
    },
  },
  {
    type: 'string',
    routing: {
      request: {
        qs: {
          tags: '={{ $value }}',
        },
      },
    },
    displayName: 'Tags',
    name: 'tags_string',
    default: '',
    displayOptions: {
      show: {
        resource: ['user'],
        operation: ['getUsersCount'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'ALGOLIA_INDEX_NAME',
    routing: {
      request: {
        qs: {
          index: '={{ $value }}',
        },
      },
    },
    displayName: 'Index',
    name: 'index_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['filter'],
        operation: ['getTopFilterAttributes'],
      },
    },
  },
  {
    type: 'string',
    routing: {
      request: {
        qs: {
          search: '={{ $value }}',
        },
      },
    },
    displayName: 'Search',
    name: 'search_string',
    default: '',
    displayOptions: {
      show: {
        resource: ['filter'],
        operation: ['getTopFilterAttributes'],
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
        resource: ['filter'],
        operation: ['getTopFilterAttributes'],
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
        resource: ['filter'],
        operation: ['getTopFilterAttributes'],
      },
    },
  },
  {
    type: 'number',
    default: 10,
    typeOptions: {
      maxValue: 1000,
    },
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
        resource: ['filter'],
        operation: ['getTopFilterAttributes'],
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
        resource: ['filter'],
        operation: ['getTopFilterAttributes'],
      },
    },
  },
  {
    type: 'string',
    routing: {
      request: {
        qs: {
          tags: '={{ $value }}',
        },
      },
    },
    displayName: 'Tags',
    name: 'tags_string',
    default: '',
    displayOptions: {
      show: {
        resource: ['filter'],
        operation: ['getTopFilterAttributes'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'brand',
    displayName: 'Attribute',
    name: 'attribute_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['filter'],
        operation: ['getTopFilterForAttribute'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'ALGOLIA_INDEX_NAME',
    routing: {
      request: {
        qs: {
          index: '={{ $value }}',
        },
      },
    },
    displayName: 'Index',
    name: 'index_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['filter'],
        operation: ['getTopFilterForAttribute'],
      },
    },
  },
  {
    type: 'string',
    routing: {
      request: {
        qs: {
          search: '={{ $value }}',
        },
      },
    },
    displayName: 'Search',
    name: 'search_string',
    default: '',
    displayOptions: {
      show: {
        resource: ['filter'],
        operation: ['getTopFilterForAttribute'],
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
        resource: ['filter'],
        operation: ['getTopFilterForAttribute'],
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
        resource: ['filter'],
        operation: ['getTopFilterForAttribute'],
      },
    },
  },
  {
    type: 'number',
    default: 10,
    typeOptions: {
      maxValue: 1000,
    },
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
        resource: ['filter'],
        operation: ['getTopFilterForAttribute'],
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
        resource: ['filter'],
        operation: ['getTopFilterForAttribute'],
      },
    },
  },
  {
    type: 'string',
    routing: {
      request: {
        qs: {
          tags: '={{ $value }}',
        },
      },
    },
    displayName: 'Tags',
    name: 'tags_string',
    default: '',
    displayOptions: {
      show: {
        resource: ['filter'],
        operation: ['getTopFilterForAttribute'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'ALGOLIA_INDEX_NAME',
    routing: {
      request: {
        qs: {
          index: '={{ $value }}',
        },
      },
    },
    displayName: 'Index',
    name: 'index_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['filter'],
        operation: ['getTopFiltersNoResults'],
      },
    },
  },
  {
    type: 'string',
    routing: {
      request: {
        qs: {
          search: '={{ $value }}',
        },
      },
    },
    displayName: 'Search',
    name: 'search_string',
    default: '',
    displayOptions: {
      show: {
        resource: ['filter'],
        operation: ['getTopFiltersNoResults'],
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
        resource: ['filter'],
        operation: ['getTopFiltersNoResults'],
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
        resource: ['filter'],
        operation: ['getTopFiltersNoResults'],
      },
    },
  },
  {
    type: 'number',
    default: 10,
    typeOptions: {
      maxValue: 1000,
    },
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
        resource: ['filter'],
        operation: ['getTopFiltersNoResults'],
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
        resource: ['filter'],
        operation: ['getTopFiltersNoResults'],
      },
    },
  },
  {
    type: 'string',
    routing: {
      request: {
        qs: {
          tags: '={{ $value }}',
        },
      },
    },
    displayName: 'Tags',
    name: 'tags_string',
    default: '',
    displayOptions: {
      show: {
        resource: ['filter'],
        operation: ['getTopFiltersNoResults'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'ALGOLIA_INDEX_NAME',
    routing: {
      request: {
        qs: {
          index: '={{ $value }}',
        },
      },
    },
    displayName: 'Index',
    name: 'index_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['user'],
        operation: ['getTopCountries'],
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
        resource: ['user'],
        operation: ['getTopCountries'],
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
        resource: ['user'],
        operation: ['getTopCountries'],
      },
    },
  },
  {
    type: 'number',
    default: 10,
    typeOptions: {
      maxValue: 1000,
    },
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
        resource: ['user'],
        operation: ['getTopCountries'],
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
        resource: ['user'],
        operation: ['getTopCountries'],
      },
    },
  },
  {
    type: 'string',
    routing: {
      request: {
        qs: {
          tags: '={{ $value }}',
        },
      },
    },
    displayName: 'Tags',
    name: 'tags_string',
    default: '',
    displayOptions: {
      show: {
        resource: ['user'],
        operation: ['getTopCountries'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'ALGOLIA_INDEX_NAME',
    routing: {
      request: {
        qs: {
          index: '={{ $value }}',
        },
      },
    },
    displayName: 'Index',
    name: 'index_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['click'],
        operation: ['getAverageClickPosition'],
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
        resource: ['click'],
        operation: ['getAverageClickPosition'],
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
        resource: ['click'],
        operation: ['getAverageClickPosition'],
      },
    },
  },
  {
    type: 'string',
    routing: {
      request: {
        qs: {
          tags: '={{ $value }}',
        },
      },
    },
    displayName: 'Tags',
    name: 'tags_string',
    default: '',
    displayOptions: {
      show: {
        resource: ['click'],
        operation: ['getAverageClickPosition'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'ALGOLIA_INDEX_NAME',
    routing: {
      request: {
        qs: {
          index: '={{ $value }}',
        },
      },
    },
    displayName: 'Index',
    name: 'index_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['click'],
        operation: ['getClickPositions'],
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
        resource: ['click'],
        operation: ['getClickPositions'],
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
        resource: ['click'],
        operation: ['getClickPositions'],
      },
    },
  },
  {
    type: 'string',
    routing: {
      request: {
        qs: {
          tags: '={{ $value }}',
        },
      },
    },
    displayName: 'Tags',
    name: 'tags_string',
    default: '',
    displayOptions: {
      show: {
        resource: ['click'],
        operation: ['getClickPositions'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'ALGOLIA_INDEX_NAME',
    routing: {
      request: {
        qs: {
          index: '={{ $value }}',
        },
      },
    },
    displayName: 'Index',
    name: 'index_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['click'],
        operation: ['getClickThroughRate'],
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
        resource: ['click'],
        operation: ['getClickThroughRate'],
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
        resource: ['click'],
        operation: ['getClickThroughRate'],
      },
    },
  },
  {
    type: 'string',
    routing: {
      request: {
        qs: {
          tags: '={{ $value }}',
        },
      },
    },
    displayName: 'Tags',
    name: 'tags_string',
    default: '',
    displayOptions: {
      show: {
        resource: ['click'],
        operation: ['getClickThroughRate'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'ALGOLIA_INDEX_NAME',
    routing: {
      request: {
        qs: {
          index: '={{ $value }}',
        },
      },
    },
    displayName: 'Index',
    name: 'index_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['click'],
        operation: ['getConversionRate'],
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
        resource: ['click'],
        operation: ['getConversionRate'],
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
        resource: ['click'],
        operation: ['getConversionRate'],
      },
    },
  },
  {
    type: 'string',
    routing: {
      request: {
        qs: {
          tags: '={{ $value }}',
        },
      },
    },
    displayName: 'Tags',
    name: 'tags_string',
    default: '',
    displayOptions: {
      show: {
        resource: ['click'],
        operation: ['getConversionRate'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'ALGOLIA_INDEX_NAME',
    routing: {
      request: {
        qs: {
          index: '={{ $value }}',
        },
      },
    },
    displayName: 'Index',
    name: 'index_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['click'],
        operation: ['getAddToCartRate'],
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
        resource: ['click'],
        operation: ['getAddToCartRate'],
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
        resource: ['click'],
        operation: ['getAddToCartRate'],
      },
    },
  },
  {
    type: 'string',
    routing: {
      request: {
        qs: {
          tags: '={{ $value }}',
        },
      },
    },
    displayName: 'Tags',
    name: 'tags_string',
    default: '',
    displayOptions: {
      show: {
        resource: ['click'],
        operation: ['getAddToCartRate'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'ALGOLIA_INDEX_NAME',
    routing: {
      request: {
        qs: {
          index: '={{ $value }}',
        },
      },
    },
    displayName: 'Index',
    name: 'index_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['click'],
        operation: ['getPurchaseRate'],
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
        resource: ['click'],
        operation: ['getPurchaseRate'],
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
        resource: ['click'],
        operation: ['getPurchaseRate'],
      },
    },
  },
  {
    type: 'string',
    routing: {
      request: {
        qs: {
          tags: '={{ $value }}',
        },
      },
    },
    displayName: 'Tags',
    name: 'tags_string',
    default: '',
    displayOptions: {
      show: {
        resource: ['click'],
        operation: ['getPurchaseRate'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'ALGOLIA_INDEX_NAME',
    routing: {
      request: {
        qs: {
          index: '={{ $value }}',
        },
      },
    },
    displayName: 'Index',
    name: 'index_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['revenue'],
        operation: ['getRevenue'],
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
        resource: ['revenue'],
        operation: ['getRevenue'],
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
        resource: ['revenue'],
        operation: ['getRevenue'],
      },
    },
  },
  {
    type: 'string',
    routing: {
      request: {
        qs: {
          tags: '={{ $value }}',
        },
      },
    },
    displayName: 'Tags',
    name: 'tags_string',
    default: '',
    displayOptions: {
      show: {
        resource: ['revenue'],
        operation: ['getRevenue'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'ALGOLIA_INDEX_NAME',
    routing: {
      request: {
        qs: {
          index: '={{ $value }}',
        },
      },
    },
    displayName: 'Index',
    name: 'index_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['status'],
        operation: ['getStatus'],
      },
    },
  },
];

export default properties;
