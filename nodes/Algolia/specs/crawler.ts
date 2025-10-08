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
        name: 'actions',
        value: 'actions',
        description:
          'Change the state of crawlers, such as pausing crawl schedules or testing the crawler with specific URLs',
      },
      {
        name: 'config',
        value: 'config',
        description:
          'In the Crawler configuration, you specify which URLs to crawl, when to crawl, how to extract records from the crawl, and where to index the extracted records',
      },
      {
        name: 'crawlers',
        value: 'crawlers',
        description: 'A crawler is an object with a name and a configuration',
      },
      {
        name: 'domains',
        value: 'domains',
        description: 'List registered domains',
      },
      {
        name: 'tasks',
        value: 'tasks',
        description: 'Task operations',
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
        name: 'List crawlers',
        value: 'listCrawlers',
        action: 'List crawlers',
        description: 'Lists all your crawlers.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/crawlers',
          },
        },
      },
      {
        name: 'Create a crawler',
        value: 'createCrawler',
        action: 'Create a crawler',
        description: 'Creates a new crawler with the provided configuration.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/crawlers',
          },
        },
      },
      {
        name: 'Retrieve crawler details',
        value: 'getCrawler',
        action: 'Retrieve crawler details',
        description:
          'Retrieves details about the specified crawler, optionally with its configuration.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/crawlers/{{ $parameter.id_string }}',
          },
        },
      },
      {
        name: 'Replace crawler configuration',
        value: 'patchCrawler',
        action: 'Replace crawler configuration',
        description: 'Replaces the crawler configuration with a new one.',
        routing: {
          request: {
            method: 'PATCH',
            url: '=/1/crawlers/{{ $parameter.id_string }}',
          },
        },
      },
      {
        name: 'Delete a crawler',
        value: 'deleteCrawler',
        action: 'Delete a crawler',
        description: 'Delete the specified crawler.',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/1/crawlers/{{ $parameter.id_string }}',
          },
        },
      },
      {
        name: 'Retrieve crawler stats',
        value: 'getStats',
        action: 'Retrieve crawler stats',
        description: 'Retrieves information about the number of crawled, skipped, and failed URLs.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/crawlers/{{ $parameter.id_string }}/stats/urls',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['crawlers'],
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
        name: 'Unpause a crawler',
        value: 'runCrawler',
        action: 'Unpause a crawler',
        description: 'Unpauses the specified crawler.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/crawlers/{{ $parameter.id_string }}/run',
          },
        },
      },
      {
        name: 'Pause a crawler',
        value: 'pauseCrawler',
        action: 'Pause a crawler',
        description: 'Pauses the specified crawler.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/crawlers/{{ $parameter.id_string }}/pause',
          },
        },
      },
      {
        name: 'Start a crawl',
        value: 'startReindex',
        action: 'Start a crawl',
        description: 'Starts or resumes a crawl.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/crawlers/{{ $parameter.id_string }}/reindex',
          },
        },
      },
      {
        name: 'Test crawl a URL',
        value: 'testUrl',
        action: 'Test crawl a URL',
        description:
          "Tests a URL with the crawler's configuration and shows the extracted records.",
        routing: {
          request: {
            method: 'POST',
            url: '=/1/crawlers/{{ $parameter.id_string }}/test',
          },
        },
      },
      {
        name: 'Crawl URLs',
        value: 'crawlUrls',
        action: 'Crawl URLs',
        description:
          'Crawls the specified URLs, extracts records from them, and adds them to the index.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/crawlers/{{ $parameter.id_string }}/urls/crawl',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['actions'],
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
        name: 'Update crawler configuration',
        value: 'patchConfig',
        action: 'Update crawler configuration',
        description: 'Updates the configuration of the specified crawler.',
        routing: {
          request: {
            method: 'PATCH',
            url: '=/1/crawlers/{{ $parameter.id_string }}/config',
          },
        },
      },
      {
        name: 'List configuration versions',
        value: 'listConfigVersions',
        action: 'List configuration versions',
        description:
          "Lists previous versions of the specified crawler's configuration, including who authored the change.",
        routing: {
          request: {
            method: 'GET',
            url: '=/1/crawlers/{{ $parameter.id_string }}/config/versions',
          },
        },
      },
      {
        name: 'Retrieve a configuration version',
        value: 'getConfigVersion',
        action: 'Retrieve a configuration version',
        description: 'Retrieves the specified version of the crawler configuration.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/crawlers/{{ $parameter.id_string }}/config/versions/{{ $parameter.version_number }}',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['config'],
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
        name: 'Retrieve task status',
        value: 'getTaskStatus',
        action: 'Retrieve task status',
        description:
          "Retrieves the status of the specified tasks, whether they're pending or completed.",
        routing: {
          request: {
            method: 'GET',
            url: '=/1/crawlers/{{ $parameter.id_string }}/tasks/{{ $parameter.taskID_string }}',
          },
        },
      },
      {
        name: 'Cancel a blocking task',
        value: 'cancelBlockingAction',
        action: 'Cancel a blocking task',
        description: 'Cancels a blocking task.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/crawlers/{{ $parameter.id_string }}/tasks/{{ $parameter.taskID_string }}/cancel',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['tasks'],
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
        name: 'List registered domains',
        value: 'listDomains',
        action: 'List registered domains',
        description: 'Lists registered domains.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/domains',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['domains'],
      },
    },
  },
  {
    type: 'number',
    default: 20,
    description: 'Number of items per page of the paginated API response.',
    typeOptions: {
      minValue: 1,
      maxValue: 100,
    },
    routing: {
      request: {
        qs: {
          itemsPerPage: '={{ $value }}',
        },
      },
    },
    displayName: 'Items Per Page',
    name: 'itemsPerPage_number',
    displayOptions: {
      show: {
        resource: ['crawlers'],
        operation: ['listCrawlers'],
      },
    },
  },
  {
    type: 'number',
    default: 1,
    description: 'Current page of the paginated API response.',
    typeOptions: {
      minValue: 1,
      maxValue: 100,
    },
    routing: {
      request: {
        qs: {
          page: '={{ $value }}',
        },
      },
    },
    displayName: 'Page',
    name: 'page_number',
    displayOptions: {
      show: {
        resource: ['crawlers'],
        operation: ['listCrawlers'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'test-crawler',
    description: 'Name of the crawler.',
    routing: {
      request: {
        qs: {
          name: '={{ $value }}',
        },
      },
    },
    displayName: 'Name',
    name: 'name_string',
    default: '',
    displayOptions: {
      show: {
        resource: ['crawlers'],
        operation: ['listCrawlers'],
      },
    },
  },
  {
    type: 'string',
    description: 'Algolia application ID where the crawler creates and updates indices.\n',
    routing: {
      request: {
        qs: {
          appID: '={{ $value }}',
        },
      },
    },
    displayName: 'App ID',
    name: 'appID_string',
    default: '',
    displayOptions: {
      show: {
        resource: ['crawlers'],
        operation: ['listCrawlers'],
      },
    },
  },
  {
    displayName: 'Crawler Create',
    name: 'crawler_create_object',
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
        name: 'Configuration',
        value: 'configuration_object',
      },
    ],
    displayOptions: {
      show: {
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'test-crawler',
    description: 'Name of the crawler.',
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
        crawler_create_object: ['name_string'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    displayName: 'Configuration',
    name: 'configuration_object',
    type: 'multiOptions',
    description: 'Crawler configuration.',
    required: true,
    default: [],
    options: [
      {
        name: 'Actions',
        value: 'actions_json_config',
      },
      {
        name: 'Api Key',
        value: 'apiKey_string_config',
      },
      {
        name: 'Application Id',
        value: 'applicationId_string_config',
      },
      {
        name: 'Exclusion Patterns',
        value: 'exclusionPatterns_json_config',
      },
      {
        name: 'External Data',
        value: 'externalData_json_config',
      },
      {
        name: 'Extra Urls',
        value: 'extraUrls_json_config',
      },
      {
        name: 'Ignore Canonical To',
        value: 'ignoreCanonicalTo_config',
      },
      {
        name: 'Ignore No Follow To',
        value: 'ignoreNoFollowTo_boolean_config',
      },
      {
        name: 'Ignore No Index',
        value: 'ignoreNoIndex_boolean_config',
      },
      {
        name: 'Ignore Pagination Attributes',
        value: 'ignorePaginationAttributes_boolean_config',
      },
      {
        name: 'Ignore Query Params',
        value: 'ignoreQueryParams_json_config',
      },
      {
        name: 'Ignore Robots Txt Rules',
        value: 'ignoreRobotsTxtRules_boolean_config',
      },
      {
        name: 'Index Prefix',
        value: 'indexPrefix_string_config',
      },
      {
        name: 'Index Settings',
        value: 'index_settings_config',
      },
      {
        name: 'Link Extractor',
        value: 'link_extractor_object_config',
      },
      {
        name: 'Login',
        value: 'login_config',
      },
      {
        name: 'Max Depth',
        value: 'maxDepth_number_config',
      },
      {
        name: 'Max Urls',
        value: 'maxUrls_number_config',
      },
      {
        name: 'Rate Limit',
        value: 'rateLimit_number_config',
      },
      {
        name: 'Render Java Script',
        value: 'renderJavaScript_config',
      },
      {
        name: 'Request Options',
        value: 'request_options_object_config',
      },
      {
        name: 'Safety Checks',
        value: 'safety_checks_object_config',
      },
      {
        name: 'Save Backup',
        value: 'saveBackup_boolean_config',
      },
      {
        name: 'Schedule',
        value: 'schedule_string_config',
      },
      {
        name: 'Sitemaps',
        value: 'sitemaps_json_config',
      },
      {
        name: 'Start Urls',
        value: 'startUrls_json_config',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'config',
        value:
          '={{ { "actions": typeof $parameter.actions_json_config !== "undefined" ? JSON.parse($parameter.actions_json_config) : undefined, "apiKey": typeof $parameter.apiKey_string_config !== "undefined" ? $parameter.apiKey_string_config : undefined, "applicationId": typeof $parameter.applicationId_string_config !== "undefined" ? $parameter.applicationId_string_config : undefined, "exclusionPatterns": typeof $parameter.exclusionPatterns_json_config !== "undefined" ? JSON.parse($parameter.exclusionPatterns_json_config) : undefined, "externalData": typeof $parameter.externalData_json_config !== "undefined" ? JSON.parse($parameter.externalData_json_config) : undefined, "extraUrls": typeof $parameter.extraUrls_json_config !== "undefined" ? JSON.parse($parameter.extraUrls_json_config) : undefined, "ignoreCanonicalTo": typeof $parameter.ignoreCanonicalTo_boolean_config !== "undefined" ? $parameter.ignoreCanonicalTo_boolean_config : typeof $parameter.ignoreCanonicalTo_json_config !== "undefined" ? JSON.parse($parameter.ignoreCanonicalTo_json_config) : undefined, "ignoreNoFollowTo": typeof $parameter.ignoreNoFollowTo_boolean_config !== "undefined" ? $parameter.ignoreNoFollowTo_boolean_config : undefined, "ignoreNoIndex": typeof $parameter.ignoreNoIndex_boolean_config !== "undefined" ? $parameter.ignoreNoIndex_boolean_config : undefined, "ignorePaginationAttributes": typeof $parameter.ignorePaginationAttributes_boolean_config !== "undefined" ? $parameter.ignorePaginationAttributes_boolean_config : undefined, "ignoreQueryParams": typeof $parameter.ignoreQueryParams_json_config !== "undefined" ? JSON.parse($parameter.ignoreQueryParams_json_config) : undefined, "ignoreRobotsTxtRules": typeof $parameter.ignoreRobotsTxtRules_boolean_config !== "undefined" ? $parameter.ignoreRobotsTxtRules_boolean_config : undefined, "indexPrefix": typeof $parameter.indexPrefix_string_config !== "undefined" ? $parameter.indexPrefix_string_config : undefined, "initialIndexSettings": typeof $parameter.index_settings_config !== "undefined" ? JSON.parse($parameter.index_settings_config) : undefined, "linkExtractor": { "__type": typeof $parameter.__type_options_linkExtractor_config !== "undefined" ? $parameter.__type_options_linkExtractor_config : undefined, "source": typeof $parameter.source_string_linkExtractor_config !== "undefined" ? $parameter.source_string_linkExtractor_config : undefined }, "login": typeof $parameter.http_request_object_config !== "undefined" ? { "url": typeof $parameter.url_string_login_config !== "undefined" ? $parameter.url_string_login_config : undefined, "requestOptions": { "method": typeof $parameter.method_string_requestOptions_login_config !== "undefined" ? $parameter.method_string_requestOptions_login_config : undefined, "headers": { "Accept-Language": typeof $parameter.Accept-Language_string_headers_requestOptions_login_config !== "undefined" ? $parameter.Accept-Language_string_headers_requestOptions_login_config : undefined, "Authorization": typeof $parameter.Authorization_string_headers_requestOptions_login_config !== "undefined" ? $parameter.Authorization_string_headers_requestOptions_login_config : undefined, "Cookie": typeof $parameter.Cookie_string_headers_requestOptions_login_config !== "undefined" ? $parameter.Cookie_string_headers_requestOptions_login_config : undefined }, "body": typeof $parameter.body_string_requestOptions_login_config !== "undefined" ? $parameter.body_string_requestOptions_login_config : undefined, "timeout": typeof $parameter.timeout_number_requestOptions_login_config !== "undefined" ? $parameter.timeout_number_requestOptions_login_config : undefined } } : typeof $parameter.url_string_login_config !== "undefined" ? $parameter.url_string_login_config : typeof $parameter.login_request_options_object_login_config !== "undefined" ? $parameter.login_request_options_object_login_config : typeof $parameter.method_string_requestOptions_login_config !== "undefined" ? $parameter.method_string_requestOptions_login_config : typeof $parameter.headers_object_requestOptions_login_config !== "undefined" ? $parameter.headers_object_requestOptions_login_config : typeof $parameter.Accept-Language_string_headers_requestOptions_login_config !== "undefined" ? $parameter.Accept-Language_string_headers_requestOptions_login_config : typeof $parameter.Authorization_string_headers_requestOptions_login_config !== "undefined" ? $parameter.Authorization_string_headers_requestOptions_login_config : typeof $parameter.Cookie_string_headers_requestOptions_login_config !== "undefined" ? $parameter.Cookie_string_headers_requestOptions_login_config : typeof $parameter.body_string_requestOptions_login_config !== "undefined" ? $parameter.body_string_requestOptions_login_config : typeof $parameter.timeout_number_requestOptions_login_config !== "undefined" ? $parameter.timeout_number_requestOptions_login_config : typeof $parameter.browserbased_object_config !== "undefined" ? { "url": typeof $parameter.url_string_login_config !== "undefined" ? $parameter.url_string_login_config : undefined, "username": typeof $parameter.username_string_login_config !== "undefined" ? $parameter.username_string_login_config : undefined, "password": typeof $parameter.password_string_login_config !== "undefined" ? $parameter.password_string_login_config : undefined, "waitTime": { "min": typeof $parameter.min_number_waitTime_login_config !== "undefined" ? $parameter.min_number_waitTime_login_config : undefined, "max": typeof $parameter.max_number_waitTime_login_config !== "undefined" ? $parameter.max_number_waitTime_login_config : undefined } } : typeof $parameter.url_string_login_config !== "undefined" ? $parameter.url_string_login_config : typeof $parameter.username_string_login_config !== "undefined" ? $parameter.username_string_login_config : typeof $parameter.password_string_login_config !== "undefined" ? $parameter.password_string_login_config : typeof $parameter.wait_time_object_login_config !== "undefined" ? $parameter.wait_time_object_login_config : typeof $parameter.min_number_waitTime_login_config !== "undefined" ? $parameter.min_number_waitTime_login_config : typeof $parameter.max_number_waitTime_login_config !== "undefined" ? $parameter.max_number_waitTime_login_config : typeof $parameter.oauth_20_object_config !== "undefined" ? { "accessTokenRequest": { "url": typeof $parameter.url_string_accessTokenRequest_login_config !== "undefined" ? $parameter.url_string_accessTokenRequest_login_config : undefined, "grantType": typeof $parameter.grantType_options_accessTokenRequest_login_config !== "undefined" ? $parameter.grantType_options_accessTokenRequest_login_config : undefined, "clientId": typeof $parameter.clientId_string_accessTokenRequest_login_config !== "undefined" ? $parameter.clientId_string_accessTokenRequest_login_config : undefined, "clientSecret": typeof $parameter.clientSecret_string_accessTokenRequest_login_config !== "undefined" ? $parameter.clientSecret_string_accessTokenRequest_login_config : undefined, "scope": typeof $parameter.scope_string_accessTokenRequest_login_config !== "undefined" ? $parameter.scope_string_accessTokenRequest_login_config : undefined, "extraParameters": { "resource": typeof $parameter.resource_string_extraParameters_accessTokenRequest_login_config !== "undefined" ? $parameter.resource_string_extraParameters_accessTokenRequest_login_config : undefined } } } : typeof $parameter.access_token_request_object_login_config !== "undefined" ? $parameter.access_token_request_object_login_config : typeof $parameter.url_string_accessTokenRequest_login_config !== "undefined" ? $parameter.url_string_accessTokenRequest_login_config : typeof $parameter.grantType_options_accessTokenRequest_login_config !== "undefined" ? $parameter.grantType_options_accessTokenRequest_login_config : typeof $parameter.clientId_string_accessTokenRequest_login_config !== "undefined" ? $parameter.clientId_string_accessTokenRequest_login_config : typeof $parameter.clientSecret_string_accessTokenRequest_login_config !== "undefined" ? $parameter.clientSecret_string_accessTokenRequest_login_config : typeof $parameter.scope_string_accessTokenRequest_login_config !== "undefined" ? $parameter.scope_string_accessTokenRequest_login_config : typeof $parameter.extra_parameters_object_accessTokenRequest_login_config !== "undefined" ? $parameter.extra_parameters_object_accessTokenRequest_login_config : typeof $parameter.resource_string_extraParameters_accessTokenRequest_login_config !== "undefined" ? $parameter.resource_string_extraParameters_accessTokenRequest_login_config : undefined, "maxDepth": typeof $parameter.maxDepth_number_config !== "undefined" ? $parameter.maxDepth_number_config : undefined, "maxUrls": typeof $parameter.maxUrls_number_config !== "undefined" ? $parameter.maxUrls_number_config : undefined, "rateLimit": typeof $parameter.rateLimit_number_config !== "undefined" ? $parameter.rateLimit_number_config : undefined, "renderJavaScript": typeof $parameter.renderJavaScript_boolean_config !== "undefined" ? $parameter.renderJavaScript_boolean_config : typeof $parameter.renderJavaScript_json_config !== "undefined" ? JSON.parse($parameter.renderJavaScript_json_config) : typeof $parameter.headless_browser_config_object_config !== "undefined" ? { "enabled": typeof $parameter.enabled_boolean_renderJavaScript_config !== "undefined" ? $parameter.enabled_boolean_renderJavaScript_config : undefined, "patterns": typeof $parameter.patterns_json_renderJavaScript_config !== "undefined" ? JSON.parse($parameter.patterns_json_renderJavaScript_config) : undefined, "adBlock": typeof $parameter.adBlock_boolean_renderJavaScript_config !== "undefined" ? $parameter.adBlock_boolean_renderJavaScript_config : undefined, "waitTime": { "min": typeof $parameter.min_number_waitTime_renderJavaScript_config !== "undefined" ? $parameter.min_number_waitTime_renderJavaScript_config : undefined, "max": typeof $parameter.max_number_waitTime_renderJavaScript_config !== "undefined" ? $parameter.max_number_waitTime_renderJavaScript_config : undefined } } : typeof $parameter.enabled_boolean_renderJavaScript_config !== "undefined" ? $parameter.enabled_boolean_renderJavaScript_config : typeof $parameter.patterns_json_renderJavaScript_config !== "undefined" ? JSON.parse($parameter.patterns_json_renderJavaScript_config) : typeof $parameter.adBlock_boolean_renderJavaScript_config !== "undefined" ? $parameter.adBlock_boolean_renderJavaScript_config : typeof $parameter.wait_time_object_renderJavaScript_config !== "undefined" ? $parameter.wait_time_object_renderJavaScript_config : typeof $parameter.min_number_waitTime_renderJavaScript_config !== "undefined" ? $parameter.min_number_waitTime_renderJavaScript_config : typeof $parameter.max_number_waitTime_renderJavaScript_config !== "undefined" ? $parameter.max_number_waitTime_renderJavaScript_config : undefined, "requestOptions": { "proxy": typeof $parameter.proxy_string_requestOptions_config !== "undefined" ? $parameter.proxy_string_requestOptions_config : undefined, "timeout": typeof $parameter.timeout_number_requestOptions_config !== "undefined" ? $parameter.timeout_number_requestOptions_config : undefined, "retries": typeof $parameter.retries_number_requestOptions_config !== "undefined" ? $parameter.retries_number_requestOptions_config : undefined, "headers": { "Accept-Language": typeof $parameter.Accept-Language_string_headers_requestOptions_config !== "undefined" ? $parameter.Accept-Language_string_headers_requestOptions_config : undefined, "Authorization": typeof $parameter.Authorization_string_headers_requestOptions_config !== "undefined" ? $parameter.Authorization_string_headers_requestOptions_config : undefined, "Cookie": typeof $parameter.Cookie_string_headers_requestOptions_config !== "undefined" ? $parameter.Cookie_string_headers_requestOptions_config : undefined } }, "safetyChecks": { "beforeIndexPublishing": { "maxLostRecordsPercentage": typeof $parameter.maxLostRecordsPercentage_number_beforeIndexPublishing_safetyChecks_config !== "undefined" ? $parameter.maxLostRecordsPercentage_number_beforeIndexPublishing_safetyChecks_config : undefined, "maxFailedUrls": typeof $parameter.maxFailedUrls_number_beforeIndexPublishing_safetyChecks_config !== "undefined" ? $parameter.maxFailedUrls_number_beforeIndexPublishing_safetyChecks_config : undefined } }, "saveBackup": typeof $parameter.saveBackup_boolean_config !== "undefined" ? $parameter.saveBackup_boolean_config : undefined, "schedule": typeof $parameter.schedule_string_config !== "undefined" ? $parameter.schedule_string_config : undefined, "sitemaps": typeof $parameter.sitemaps_json_config !== "undefined" ? JSON.parse($parameter.sitemaps_json_config) : undefined, "startUrls": typeof $parameter.startUrls_json_config !== "undefined" ? JSON.parse($parameter.startUrls_json_config) : undefined } }}',
      },
    },
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Actions',
    name: 'actions_json_config',
    default: '',
    description: 'A list of actions.',
    required: false,
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['actions_json_config'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'string',
    description:
      "The Algolia API key the crawler uses for indexing records.\nIf you don't provide an API key, one will be generated by the Crawler when you create a configuration.\n\nThe API key must have:\n\n- These [rights and restrictions](https://www.algolia.com/doc/guides/security/api-keys/#rights-and-restrictions): `search`, `addObject`, `deleteObject`, `deleteIndex`, `settings`, `editSettings`, `listIndexes`, `browse`\n- Access to the correct set of indices, based on the crawler's `indexPrefix`.\nFor example, if the prefix is `crawler_`, the API key must have access to `crawler_*`.\n\n**Don't use your [Admin API key](https://www.algolia.com/doc/guides/security/api-keys/#predefined-api-keys)**.\n",
    displayName: 'Api Key',
    name: 'apiKey_string_config',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['apiKey_string_config'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'string',
    description: 'Algolia application ID where the crawler creates and updates indices.\n',
    displayName: 'Application Id',
    name: 'applicationId_string_config',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['applicationId_string_config'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Exclusion Patterns',
    name: 'exclusionPatterns_json_config',
    default: '[]',
    description: 'URLs to exclude from crawling.',
    required: false,
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['exclusionPatterns_json_config'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'External Data',
    name: 'externalData_json_config',
    default: '[]',
    description: 'References to external data sources for enriching the extracted records.\n',
    required: false,
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['externalData_json_config'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Extra Urls',
    name: 'extraUrls_json_config',
    default: '[]',
    description:
      'The Crawler treats `extraUrls` the same as `startUrls`.\nSpecify `extraUrls` if you want to differentiate between URLs you manually added to fix site crawling from those you initially specified in `startUrls`.\n',
    required: false,
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['extraUrls_json_config'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'options',
    name: 'ignoreCanonicalTo_config',
    displayName: 'Ignore Canonical To',
    default: '',
    options: [
      {
        name: 'Boolean',
        value: 'boolean',
      },
      {
        name: 'Array',
        value: 'array',
      },
    ],
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['ignoreCanonicalTo_config'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'boolean',
    description:
      'Determines if the crawler should extract records from a page with a [canonical URL](https://www.algolia.com/doc/tools/crawler/getting-started/crawler-configuration/#canonical-urls-and-crawler-behavior).\n\nIf `ignoreCanonicalTo` is set to:\n\n- `true` all canonical URLs are ignored.\n- One or more URL patterns, the crawler will ignore the canonical URL if it matches a pattern.\n',
    displayName: 'Ignore Canonical To (Boolean)',
    name: 'ignoreCanonicalTo_boolean_config',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['ignoreCanonicalTo_config'],
        ignoreCanonicalTo_config: ['boolean'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Ignore Canonical To (Array)',
    name: 'ignoreCanonicalTo_json_config',
    default: '[]',
    description: 'Canonical URLs or URL patterns to ignore.\n',
    required: false,
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['ignoreCanonicalTo_config'],
        ignoreCanonicalTo_config: ['array'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'boolean',
    description:
      "Determines if the crawler should follow links with a `nofollow` directive.\nIf `true`, the crawler will ignore the `nofollow` directive and crawl links on the page.\n\nThe crawler always ignores links that don't match your [configuration settings](https://www.algolia.com/doc/tools/crawler/getting-started/crawler-configuration/#exclude-and-include-content).\n`ignoreNoFollowTo` applies to:\n\n- Links that are ignored because the [`robots` meta tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name#Other_metadata_names) contains `nofollow` or `none`.\n- Links with a [`rel` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel) containing the `nofollow` directive.\n",
    displayName: 'Ignore No Follow To',
    name: 'ignoreNoFollowTo_boolean_config',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['ignoreNoFollowTo_boolean_config'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'boolean',
    description:
      'Whether to ignore the `noindex` robots meta tag.\nIf `true`, pages with this meta tag _will_ be crawled.\n',
    displayName: 'Ignore No Index',
    name: 'ignoreNoIndex_boolean_config',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['ignoreNoIndex_boolean_config'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description:
      'Whether the crawler should follow `rel="prev"` and `rel="next"` pagination links in the `<head>` section of an HTML page.\n\n- If `true`, the crawler ignores the pagination links.\n- If `false`, the crawler follows the pagination links.\n',
    displayName: 'Ignore Pagination Attributes',
    name: 'ignorePaginationAttributes_boolean_config',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['ignorePaginationAttributes_boolean_config'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Ignore Query Params',
    name: 'ignoreQueryParams_json_config',
    default: '[]',
    description:
      'Query parameters to ignore while crawling.\n\nAll URLs with the matching query parameters are treated as identical.\nThis prevents indexing URLs that just differ by their query parameters.\n',
    required: false,
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['ignoreQueryParams_json_config'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'boolean',
    description: 'Whether to ignore rules defined in your `robots.txt` file.',
    displayName: 'Ignore Robots Txt Rules',
    name: 'ignoreRobotsTxtRules_boolean_config',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['ignoreRobotsTxtRules_boolean_config'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'crawler_',
    description:
      "A prefix for all indices created by this crawler. It's combined with the `indexName` for each action to form the complete index name.",
    displayName: 'Index Prefix',
    name: 'indexPrefix_string_config',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['indexPrefix_string_config'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'json',
    name: 'index_settings_config',
    displayName: 'Index Settings',
    description: 'Index settings.',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['index_settings_config'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    displayName: 'Link Extractor',
    name: 'link_extractor_object_config',
    type: 'multiOptions',
    description:
      'Function for extracting URLs from links on crawled pages.\n\nFor more information, see the [`linkExtractor` documentation](https://www.algolia.com/doc/tools/crawler/apis/configuration/link-extractor).\n',
    required: false,
    default: [],
    options: [
      {
        name: '  Type',
        value: '__type_options_linkExtractor',
      },
      {
        name: 'Source',
        value: 'source_string_linkExtractor',
      },
    ],
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['link_extractor_object_config'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'options',
    options: [
      {
        name: 'function',
        value: 'function',
      },
    ],
    displayName: '  Type',
    name: '__type_options_linkExtractor_config',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['link_extractor_object_config'],
        link_extractor_object_config: ['__type_options_linkExtractor'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder:
      '({ $, url, defaultExtractor }) => {\n  if (/example.com\/doc\//.test(url.href)) {\n    // For all pages under `/doc`, only extract the first found URL.\n    return defaultExtractor().slice(0, 1)\n  }\n  // For all other pages, use the default.\n  return defaultExtractor()\n}\n',
    displayName: 'Source',
    name: 'source_string_linkExtractor_config',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['link_extractor_object_config'],
        link_extractor_object_config: ['source_string_linkExtractor'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'options',
    name: 'login_config',
    displayName: 'Login',
    default: '',
    options: [
      {
        name: 'HTTP request',
        value: 'http_request',
      },
      {
        name: 'Browser-based',
        value: 'browserbased',
      },
      {
        name: 'OAuth 20',
        value: 'oauth_20',
      },
    ],
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['login_config'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    displayName: 'HTTP Request',
    name: 'http_request_object_config',
    type: 'multiOptions',
    description: 'Information for making a HTTP request for authorization.',
    required: true,
    default: [],
    options: [
      {
        name: 'Url',
        value: 'url_string_login',
      },
      {
        name: 'Login Request Options',
        value: 'login_request_options_object_login',
      },
    ],
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['http_request'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'https://example.com/login',
    description: 'URL with your login form.',
    displayName: 'Url',
    name: 'url_string_login_config',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['http_request'],
        http_request_object_config: ['url_string_login'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    displayName: 'Login Request Options',
    name: 'login_request_options_object_login_config',
    type: 'multiOptions',
    description: 'Options for the HTTP request for logging in.',
    required: false,
    default: [],
    options: [
      {
        name: 'Method',
        value: 'method_string_requestOptions',
      },
      {
        name: 'Headers',
        value: 'headers_object_requestOptions',
      },
      {
        name: 'Body',
        value: 'body_string_requestOptions',
      },
      {
        name: 'Timeout',
        value: 'timeout_number_requestOptions',
      },
    ],
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['http_request'],
        http_request_object_config: ['login_request_options_object_login'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'POST',
    default: 'GET',
    description: 'HTTP method for sending the request.',
    displayName: 'Method',
    name: 'method_string_requestOptions_login_config',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['http_request'],
        http_request_object_config: ['login_request_options_object_login'],
        login_request_options_object_login_config: ['method_string_requestOptions'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    displayName: 'Headers',
    name: 'headers_object_requestOptions_login_config',
    type: 'multiOptions',
    description: 'Headers to add to all requests.',
    required: false,
    default: [],
    options: [
      {
        name: 'Accept-Language',
        value: 'Accept-Language_string_headers',
      },
      {
        name: 'Authorization',
        value: 'Authorization_string_headers',
      },
      {
        name: 'Cookie',
        value: 'Cookie_string_headers',
      },
    ],
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['http_request'],
        http_request_object_config: ['login_request_options_object_login'],
        login_request_options_object_login_config: ['headers_object_requestOptions'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'fr-FR',
    description: 'Preferred natural language and locale.',
    displayName: 'Accept-Language',
    name: 'Accept-Language_string_headers_requestOptions_login_config',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['http_request'],
        http_request_object_config: ['login_request_options_object_login'],
        login_request_options_object_login_config: ['headers_object_requestOptions'],
        headers_object_requestOptions_login_config: ['Accept-Language_string_headers'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'Bearer Aerehdf==',
    description: 'Basic authentication header.',
    displayName: 'Authorization',
    name: 'Authorization_string_headers_requestOptions_login_config',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['http_request'],
        http_request_object_config: ['login_request_options_object_login'],
        login_request_options_object_login_config: ['headers_object_requestOptions'],
        headers_object_requestOptions_login_config: ['Authorization_string_headers'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'session=1234',
    description: 'Cookie. The header will be replaced by the cookie retrieved when logging in.',
    displayName: 'Cookie',
    name: 'Cookie_string_headers_requestOptions_login_config',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['http_request'],
        http_request_object_config: ['login_request_options_object_login'],
        login_request_options_object_login_config: ['headers_object_requestOptions'],
        headers_object_requestOptions_login_config: ['Cookie_string_headers'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'id=user&password=s3cr3t',
    description: 'Form content.',
    displayName: 'Body',
    name: 'body_string_requestOptions_login_config',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['http_request'],
        http_request_object_config: ['login_request_options_object_login'],
        login_request_options_object_login_config: ['body_string_requestOptions'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'number',
    description: 'Timeout for the request.',
    displayName: 'Timeout',
    name: 'timeout_number_requestOptions_login_config',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['http_request'],
        http_request_object_config: ['login_request_options_object_login'],
        login_request_options_object_login_config: ['timeout_number_requestOptions'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    displayName: 'Browser-Based',
    name: 'browserbased_object_config',
    type: 'multiOptions',
    description:
      'Information for using a web browser for authorization.\nThe browser loads a login page and enters the provided credentials.\n',
    required: true,
    default: [],
    options: [
      {
        name: 'Url',
        value: 'url_string_login',
      },
      {
        name: 'Username',
        value: 'username_string_login',
      },
      {
        name: 'Password',
        value: 'password_string_login',
      },
      {
        name: 'Wait Time',
        value: 'wait_time_object_login',
      },
    ],
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['browserbased'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'https://example.com/login',
    description:
      'URL of your login page.\n\nThe crawler looks for an input matching the selector `input[type=text]` or `input[type=email]` for the username and `input[type=password]` for the password.\n',
    displayName: 'Url',
    name: 'url_string_login_config',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['browserbased'],
        browserbased_object_config: ['url_string_login'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'crawler',
    description: 'Username for signing in.',
    displayName: 'Username',
    name: 'username_string_login_config',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['browserbased'],
        browserbased_object_config: ['username_string_login'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 's3cr3t',
    description: 'Password for signing in.',
    displayName: 'Password',
    name: 'password_string_login_config',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['browserbased'],
        browserbased_object_config: ['password_string_login'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    displayName: 'Wait Time',
    name: 'wait_time_object_login_config',
    type: 'multiOptions',
    description: 'Timeout for the HTTP request.',
    required: false,
    default: [],
    options: [
      {
        name: 'Min',
        value: 'min_number_waitTime',
      },
      {
        name: 'Max',
        value: 'max_number_waitTime',
      },
    ],
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['browserbased'],
        browserbased_object_config: ['wait_time_object_login'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '7000',
    description: 'Minimum waiting time in milliseconds.',
    displayName: 'Min',
    name: 'min_number_waitTime_login_config',
    default: 0,
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['browserbased'],
        browserbased_object_config: ['wait_time_object_login'],
        wait_time_object_login_config: ['min_number_waitTime'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '15000',
    default: 20000,
    description: 'Maximum waiting time in milliseconds.',
    displayName: 'Max',
    name: 'max_number_waitTime_login_config',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['browserbased'],
        browserbased_object_config: ['wait_time_object_login'],
        wait_time_object_login_config: ['max_number_waitTime'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    displayName: 'OAuth 20',
    name: 'oauth_20_object_config',
    type: 'multiOptions',
    description:
      'Authorization information for using the [OAuth 2.0 client credentials](https://datatracker.ietf.org/doc/html/rfc6749#section-4.4) authorization grant.\n\nOAuth authorization is supported for [Azure Active Directory version 1](https://learn.microsoft.com/en-us/previous-versions/azure/active-directory/azuread-dev/v1-oauth2-client-creds-grant-flow) as provider.\n',
    required: true,
    default: [],
    options: [
      {
        name: 'Access Token Request',
        value: 'access_token_request_object_login',
      },
    ],
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['oauth_20'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    displayName: 'Access Token Request',
    name: 'access_token_request_object_login_config',
    type: 'multiOptions',
    description:
      'Parameters required to make the [access token request](https://datatracker.ietf.org/doc/html/rfc6749#section-4.4.2).\n',
    required: true,
    default: [],
    options: [
      {
        name: 'Url',
        value: 'url_string_accessTokenRequest',
      },
      {
        name: 'Grant Type',
        value: 'grantType_options_accessTokenRequest',
      },
      {
        name: 'Client Id',
        value: 'clientId_string_accessTokenRequest',
      },
      {
        name: 'Client Secret',
        value: 'clientSecret_string_accessTokenRequest',
      },
      {
        name: 'Scope',
        value: 'scope_string_accessTokenRequest',
      },
      {
        name: 'Extra Parameters',
        value: 'extra_parameters_object_accessTokenRequest',
      },
    ],
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['oauth_20'],
        oauth_20_object_config: ['access_token_request_object_login'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'string',
    description: 'URL for the access token endpoint.',
    displayName: 'Url',
    name: 'url_string_accessTokenRequest_login_config',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['oauth_20'],
        oauth_20_object_config: ['access_token_request_object_login'],
        access_token_request_object_login_config: ['url_string_accessTokenRequest'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'options',
    description: 'OAuth 2.0 grant type.',
    options: [
      {
        name: 'client_credentials',
        value: 'client_credentials',
      },
    ],
    displayName: 'Grant Type',
    name: 'grantType_options_accessTokenRequest_login_config',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['oauth_20'],
        oauth_20_object_config: ['access_token_request_object_login'],
        access_token_request_object_login_config: ['grantType_options_accessTokenRequest'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'string',
    description:
      '[Client identifier](https://datatracker.ietf.org/doc/html/rfc6749#section-2.2).\n',
    displayName: 'Client Id',
    name: 'clientId_string_accessTokenRequest_login_config',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['oauth_20'],
        oauth_20_object_config: ['access_token_request_object_login'],
        access_token_request_object_login_config: ['clientId_string_accessTokenRequest'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'string',
    description: 'Client secret.',
    displayName: 'Client Secret',
    name: 'clientSecret_string_accessTokenRequest_login_config',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['oauth_20'],
        oauth_20_object_config: ['access_token_request_object_login'],
        access_token_request_object_login_config: ['clientSecret_string_accessTokenRequest'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'string',
    description:
      '[Access token scope](https://datatracker.ietf.org/doc/html/rfc6749#section-3.3).\n',
    displayName: 'Scope',
    name: 'scope_string_accessTokenRequest_login_config',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['oauth_20'],
        oauth_20_object_config: ['access_token_request_object_login'],
        access_token_request_object_login_config: ['scope_string_accessTokenRequest'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    displayName: 'Extra Parameters',
    name: 'extra_parameters_object_accessTokenRequest_login_config',
    type: 'multiOptions',
    description: 'Extra parameters for the authorization request.',
    required: false,
    default: [],
    options: [
      {
        name: 'Resource',
        value: 'resource_string_extraParameters',
      },
    ],
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['oauth_20'],
        oauth_20_object_config: ['access_token_request_object_login'],
        access_token_request_object_login_config: ['extra_parameters_object_accessTokenRequest'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'string',
    description:
      'App ID URI of the receiving web service.\n\nFor more information, see [Azure Active Directory](https://learn.microsoft.com/en-us/previous-versions/azure/active-directory/azuread-dev/v1-oauth2-client-creds-grant-flow#first-case-access-token-request-with-a-shared-secret).\n',
    displayName: 'Resource',
    name: 'resource_string_extraParameters_accessTokenRequest_login_config',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['oauth_20'],
        oauth_20_object_config: ['access_token_request_object_login'],
        access_token_request_object_login_config: ['extra_parameters_object_accessTokenRequest'],
        extra_parameters_object_accessTokenRequest_login_config: [
          'resource_string_extraParameters',
        ],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '5',
    description:
      "Determines the maximum path depth of crawled URLs.\n\nPath depth is calculated based on the number of slash characters (`/`) after the domain (starting at 1).\nFor example:\n\n- **1** `http://example.com`\n- **1** `http://example.com/`\n- **1** `http://example.com/foo`\n- **2** `http://example.com/foo/`\n- **2** `http://example.com/foo/bar`\n- **3** `http://example.com/foo/bar/`\n\n**URLs added with `startUrls` and `sitemaps` aren't checked for `maxDepth`.**.\n",
    typeOptions: {
      minValue: 1,
      maxValue: 100,
    },
    displayName: 'Max Depth',
    name: 'maxDepth_number_config',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['maxDepth_number_config'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '250',
    description:
      'Limits the number of URLs your crawler processes.\n\nChange it to a low value, such as 100, for quick crawling tests.\nChange it to a higher explicit value for full crawls to prevent it from getting "lost" in complex site structures.\nBecause the Crawler works on many pages simultaneously, `maxUrls` doesn\'t guarantee finding the same pages each time it runs.\n',
    typeOptions: {
      minValue: 1,
      maxValue: 15000000,
    },
    displayName: 'Max Urls',
    name: 'maxUrls_number_config',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['maxUrls_number_config'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '4',
    description:
      "Determines the number of concurrent tasks per second that can run for this configuration.\n\nA higher rate limit means more crawls per second.\nAlgolia prevents system overload by ensuring the number of URLs added in the last second and the number of URLs being processed is less than the rate limit:\n\n\n```\nmax(new_urls_added, active_urls_processing) <= rateLimit\n```\n\nStart with a low value (for example, 2) and increase it if you need faster crawling.\nBe aware that a high `rateLimit` can have a huge impact on bandwidth cost and server resource consumption.\n\nThe number of pages processed per second depends on the average time it takes to fetch, process, and upload a URL. \nFor a given `rateLimit` if fetching, processing, and uploading URLs takes (on average):\n\n- Less than a second, your crawler processes up to `rateLimit` pages per second.\n- Four seconds, your crawler processes up to `rateLimit / 4` pages per second.\n\nIn the latter case, increasing `rateLimit` improves performance, up to a point. \nHowever, if the processing time remains at four seconds, increasing `rateLimit` won't increase the number of pages processed per second.\n",
    typeOptions: {
      minValue: 1,
      maxValue: 100,
    },
    displayName: 'Rate Limit',
    name: 'rateLimit_number_config',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['rateLimit_number_config'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'options',
    name: 'renderJavaScript_config',
    displayName: 'Render Java Script',
    default: '',
    options: [
      {
        name: 'Boolean',
        value: 'boolean',
      },
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'HeadlessBrowserConfig',
        value: 'headlessbrowserconfig',
      },
    ],
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['renderJavaScript_config'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'boolean',
    description: 'Whether to render all pages.',
    displayName: 'Render Java Script (Boolean)',
    name: 'renderJavaScript_boolean_config',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['renderJavaScript_config'],
        renderJavaScript_config: ['boolean'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Render Java Script (Array)',
    name: 'renderJavaScript_json_config',
    default: '[]',
    description: 'URLs or URL patterns to render.',
    required: false,
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['renderJavaScript_config'],
        renderJavaScript_config: ['array'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    displayName: 'Headless Browser Config',
    name: 'headless_browser_config_object_config',
    type: 'multiOptions',
    description: 'Configuration for rendering HTML.',
    required: true,
    default: [],
    options: [
      {
        name: 'Enabled',
        value: 'enabled_boolean_renderJavaScript',
      },
      {
        name: 'Patterns',
        value: 'patterns_json_renderJavaScript',
      },
      {
        name: 'Ad Block',
        value: 'adBlock_boolean_renderJavaScript',
      },
      {
        name: 'Wait Time',
        value: 'wait_time_object_renderJavaScript',
      },
    ],
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['renderJavaScript_config'],
        renderJavaScript_config: ['headlessbrowserconfig'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'boolean',
    placeholder: 'true',
    description: 'Whether to enable JavaScript rendering.',
    displayName: 'Enabled',
    name: 'enabled_boolean_renderJavaScript_config',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['renderJavaScript_config'],
        renderJavaScript_config: ['headlessbrowserconfig'],
        headless_browser_config_object_config: ['enabled_boolean_renderJavaScript'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Patterns',
    name: 'patterns_json_renderJavaScript_config',
    default: '[]',
    description: 'URLs or URL patterns to render.',
    required: false,
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['renderJavaScript_config'],
        renderJavaScript_config: ['headlessbrowserconfig'],
        headless_browser_config_object_config: ['patterns_json_renderJavaScript'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'boolean',
    description:
      "Whether to use the Crawler's ad blocker.\nIt blocks most ads and tracking scripts but can break some sites.\n",
    displayName: 'Ad Block',
    name: 'adBlock_boolean_renderJavaScript_config',
    default: false,
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['renderJavaScript_config'],
        renderJavaScript_config: ['headlessbrowserconfig'],
        headless_browser_config_object_config: ['adBlock_boolean_renderJavaScript'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    displayName: 'Wait Time',
    name: 'wait_time_object_renderJavaScript_config',
    type: 'multiOptions',
    description: 'Timeout for the HTTP request.',
    required: false,
    default: [],
    options: [
      {
        name: 'Min',
        value: 'min_number_waitTime',
      },
      {
        name: 'Max',
        value: 'max_number_waitTime',
      },
    ],
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['renderJavaScript_config'],
        renderJavaScript_config: ['headlessbrowserconfig'],
        headless_browser_config_object_config: ['wait_time_object_renderJavaScript'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '7000',
    description: 'Minimum waiting time in milliseconds.',
    displayName: 'Min',
    name: 'min_number_waitTime_renderJavaScript_config',
    default: 0,
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['renderJavaScript_config'],
        renderJavaScript_config: ['headlessbrowserconfig'],
        headless_browser_config_object_config: ['wait_time_object_renderJavaScript'],
        wait_time_object_renderJavaScript_config: ['min_number_waitTime'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '15000',
    default: 20000,
    description: 'Maximum waiting time in milliseconds.',
    displayName: 'Max',
    name: 'max_number_waitTime_renderJavaScript_config',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['renderJavaScript_config'],
        renderJavaScript_config: ['headlessbrowserconfig'],
        headless_browser_config_object_config: ['wait_time_object_renderJavaScript'],
        wait_time_object_renderJavaScript_config: ['max_number_waitTime'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    displayName: 'Request Options',
    name: 'request_options_object_config',
    type: 'multiOptions',
    description: 'Lets you add options to HTTP requests made by the crawler.',
    required: false,
    default: [],
    options: [
      {
        name: 'Proxy',
        value: 'proxy_string_requestOptions',
      },
      {
        name: 'Timeout',
        value: 'timeout_number_requestOptions',
      },
      {
        name: 'Retries',
        value: 'retries_number_requestOptions',
      },
      {
        name: 'Headers',
        value: 'headers_object_requestOptions',
      },
    ],
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['request_options_object_config'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'string',
    description: 'Proxy for all crawler requests.',
    displayName: 'Proxy',
    name: 'proxy_string_requestOptions_config',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['request_options_object_config'],
        request_options_object_config: ['proxy_string_requestOptions'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'number',
    default: 30000,
    description: 'Timeout in milliseconds for the crawl.',
    displayName: 'Timeout',
    name: 'timeout_number_requestOptions_config',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['request_options_object_config'],
        request_options_object_config: ['timeout_number_requestOptions'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'number',
    default: 3,
    description: 'Maximum number of retries to crawl one URL.',
    displayName: 'Retries',
    name: 'retries_number_requestOptions_config',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['request_options_object_config'],
        request_options_object_config: ['retries_number_requestOptions'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    displayName: 'Headers',
    name: 'headers_object_requestOptions_config',
    type: 'multiOptions',
    description: 'Headers to add to all requests.',
    required: false,
    default: [],
    options: [
      {
        name: 'Accept-Language',
        value: 'Accept-Language_string_headers',
      },
      {
        name: 'Authorization',
        value: 'Authorization_string_headers',
      },
      {
        name: 'Cookie',
        value: 'Cookie_string_headers',
      },
    ],
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['request_options_object_config'],
        request_options_object_config: ['headers_object_requestOptions'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'fr-FR',
    description: 'Preferred natural language and locale.',
    displayName: 'Accept-Language',
    name: 'Accept-Language_string_headers_requestOptions_config',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['request_options_object_config'],
        request_options_object_config: ['headers_object_requestOptions'],
        headers_object_requestOptions_config: ['Accept-Language_string_headers'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'Bearer Aerehdf==',
    description: 'Basic authentication header.',
    displayName: 'Authorization',
    name: 'Authorization_string_headers_requestOptions_config',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['request_options_object_config'],
        request_options_object_config: ['headers_object_requestOptions'],
        headers_object_requestOptions_config: ['Authorization_string_headers'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'session=1234',
    description: 'Cookie. The header will be replaced by the cookie retrieved when logging in.',
    displayName: 'Cookie',
    name: 'Cookie_string_headers_requestOptions_config',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['request_options_object_config'],
        request_options_object_config: ['headers_object_requestOptions'],
        headers_object_requestOptions_config: ['Cookie_string_headers'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    displayName: 'Safety Checks',
    name: 'safety_checks_object_config',
    type: 'multiOptions',
    description:
      'Checks to ensure the crawl was successful.\n\nFor more information, see the [Safety checks](https://www.algolia.com/doc/tools/crawler/getting-started/crawler-configuration/#safety-checks) documentation.\n',
    required: false,
    default: [],
    options: [
      {
        name: 'Before Index Publishing',
        value: 'before_index_publishing_object_safetyChecks',
      },
    ],
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['safety_checks_object_config'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    displayName: 'Before Index Publishing',
    name: 'before_index_publishing_object_safetyChecks_config',
    type: 'multiOptions',
    description:
      'Checks triggered after the crawl finishes but before the records are added to the Algolia index.',
    required: false,
    default: [],
    options: [
      {
        name: 'Max Lost Records Percentage',
        value: 'maxLostRecordsPercentage_number_beforeIndexPublishing',
      },
      {
        name: 'Max Failed Urls',
        value: 'maxFailedUrls_number_beforeIndexPublishing',
      },
    ],
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['safety_checks_object_config'],
        safety_checks_object_config: ['before_index_publishing_object_safetyChecks'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'number',
    default: 10,
    description: 'Maximum difference in percent between the numbers of records between crawls.',
    typeOptions: {
      minValue: 1,
      maxValue: 100,
    },
    displayName: 'Max Lost Records Percentage',
    name: 'maxLostRecordsPercentage_number_beforeIndexPublishing_safetyChecks_config',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['safety_checks_object_config'],
        safety_checks_object_config: ['before_index_publishing_object_safetyChecks'],
        before_index_publishing_object_safetyChecks_config: [
          'maxLostRecordsPercentage_number_beforeIndexPublishing',
        ],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'number',
    description: 'Stops the crawler if a specified number of pages fail to crawl.',
    displayName: 'Max Failed Urls',
    name: 'maxFailedUrls_number_beforeIndexPublishing_safetyChecks_config',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['safety_checks_object_config'],
        safety_checks_object_config: ['before_index_publishing_object_safetyChecks'],
        before_index_publishing_object_safetyChecks_config: [
          'maxFailedUrls_number_beforeIndexPublishing',
        ],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'boolean',
    description:
      'Whether to back up your index before the crawler overwrites it with new records.\n',
    displayName: 'Save Backup',
    name: 'saveBackup_boolean_config',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['saveBackup_boolean_config'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'every weekday at 12:00 pm',
    description:
      'Schedule for running the crawl.\n\nInstead of manually starting a crawl each time, you can set up a schedule for automatic crawls.\n[Use the visual UI](https://www.algolia.com/doc/tools/crawler/getting-started/crawler-configuration-visual) or add the `schedule` parameter to [your configuration](https://www.algolia.com/doc/tools/crawler/getting-started/crawler-configuration).\n\n`schedule` uses [Later.js syntax](https://bunkat.github.io/later) to specify when to crawl your site.\nHere are some key things to keep in mind when using `Later.js` syntax with the Crawler:\n\n- The interval between two scheduled crawls must be at least 24 hours.\n- To crawl daily, use "every 1 day" instead of "everyday" or "every day".\n- If you don\'t specify a time, the crawl can happen any time during the scheduled day.\n- Specify times for the UTC (GMT+0) timezone\n- Include minutes when specifying a time. For example, "at 3:00 pm" instead of "at 3pm".\n- Use "at 12:00 am" to specify midnight, not "at 00:00 am".\n',
    displayName: 'Schedule',
    name: 'schedule_string_config',
    default: '',
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['schedule_string_config'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Sitemaps',
    name: 'sitemaps_json_config',
    default: '[]',
    description: 'Sitemaps with URLs from where to start crawling.',
    required: false,
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['sitemaps_json_config'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Start Urls',
    name: 'startUrls_json_config',
    default: '[]',
    description: 'URLs from where to start crawling.',
    required: false,
    displayOptions: {
      show: {
        crawler_create_object: ['configuration_object'],
        configuration_object: ['startUrls_json_config'],
        resource: ['crawlers'],
        operation: ['createCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'e0f6db8a-24f5-4092-83a4-1b2c6cb6d809',
    description: 'Universally unique identifier (UUID) of the crawler.',
    displayName: 'Id',
    name: 'id_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['crawlers'],
        operation: ['getCrawler'],
      },
    },
  },
  {
    type: 'boolean',
    routing: {
      request: {
        qs: {
          withConfig: '={{ $value }}',
        },
      },
    },
    displayName: 'With Config',
    name: 'withConfig_boolean',
    default: '',
    displayOptions: {
      show: {
        resource: ['crawlers'],
        operation: ['getCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'e0f6db8a-24f5-4092-83a4-1b2c6cb6d809',
    description: 'Universally unique identifier (UUID) of the crawler.',
    displayName: 'Id',
    name: 'id_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    displayName: 'Patch Crawler',
    name: 'patch_crawler_object',
    type: 'multiOptions',
    description: undefined,
    required: false,
    default: [],
    options: [
      {
        name: 'Name',
        value: 'name_string',
      },
      {
        name: 'Configuration',
        value: 'configuration_object',
      },
    ],
    displayOptions: {
      show: {
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'test-crawler',
    description: 'Name of the crawler.',
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
        patch_crawler_object: ['name_string'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    displayName: 'Configuration',
    name: 'configuration_object',
    type: 'multiOptions',
    description: 'Crawler configuration.',
    required: true,
    default: [],
    options: [
      {
        name: 'Actions',
        value: 'actions_json_config',
      },
      {
        name: 'Api Key',
        value: 'apiKey_string_config',
      },
      {
        name: 'Application Id',
        value: 'applicationId_string_config',
      },
      {
        name: 'Exclusion Patterns',
        value: 'exclusionPatterns_json_config',
      },
      {
        name: 'External Data',
        value: 'externalData_json_config',
      },
      {
        name: 'Extra Urls',
        value: 'extraUrls_json_config',
      },
      {
        name: 'Ignore Canonical To',
        value: 'ignoreCanonicalTo_config',
      },
      {
        name: 'Ignore No Follow To',
        value: 'ignoreNoFollowTo_boolean_config',
      },
      {
        name: 'Ignore No Index',
        value: 'ignoreNoIndex_boolean_config',
      },
      {
        name: 'Ignore Pagination Attributes',
        value: 'ignorePaginationAttributes_boolean_config',
      },
      {
        name: 'Ignore Query Params',
        value: 'ignoreQueryParams_json_config',
      },
      {
        name: 'Ignore Robots Txt Rules',
        value: 'ignoreRobotsTxtRules_boolean_config',
      },
      {
        name: 'Index Prefix',
        value: 'indexPrefix_string_config',
      },
      {
        name: 'Index Settings',
        value: 'index_settings_config',
      },
      {
        name: 'Link Extractor',
        value: 'link_extractor_object_config',
      },
      {
        name: 'Login',
        value: 'login_config',
      },
      {
        name: 'Max Depth',
        value: 'maxDepth_number_config',
      },
      {
        name: 'Max Urls',
        value: 'maxUrls_number_config',
      },
      {
        name: 'Rate Limit',
        value: 'rateLimit_number_config',
      },
      {
        name: 'Render Java Script',
        value: 'renderJavaScript_config',
      },
      {
        name: 'Request Options',
        value: 'request_options_object_config',
      },
      {
        name: 'Safety Checks',
        value: 'safety_checks_object_config',
      },
      {
        name: 'Save Backup',
        value: 'saveBackup_boolean_config',
      },
      {
        name: 'Schedule',
        value: 'schedule_string_config',
      },
      {
        name: 'Sitemaps',
        value: 'sitemaps_json_config',
      },
      {
        name: 'Start Urls',
        value: 'startUrls_json_config',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'config',
        value:
          '={{ { "actions": typeof $parameter.actions_json_config !== "undefined" ? JSON.parse($parameter.actions_json_config) : undefined, "apiKey": typeof $parameter.apiKey_string_config !== "undefined" ? $parameter.apiKey_string_config : undefined, "applicationId": typeof $parameter.applicationId_string_config !== "undefined" ? $parameter.applicationId_string_config : undefined, "exclusionPatterns": typeof $parameter.exclusionPatterns_json_config !== "undefined" ? JSON.parse($parameter.exclusionPatterns_json_config) : undefined, "externalData": typeof $parameter.externalData_json_config !== "undefined" ? JSON.parse($parameter.externalData_json_config) : undefined, "extraUrls": typeof $parameter.extraUrls_json_config !== "undefined" ? JSON.parse($parameter.extraUrls_json_config) : undefined, "ignoreCanonicalTo": typeof $parameter.ignoreCanonicalTo_boolean_config !== "undefined" ? $parameter.ignoreCanonicalTo_boolean_config : typeof $parameter.ignoreCanonicalTo_json_config !== "undefined" ? JSON.parse($parameter.ignoreCanonicalTo_json_config) : undefined, "ignoreNoFollowTo": typeof $parameter.ignoreNoFollowTo_boolean_config !== "undefined" ? $parameter.ignoreNoFollowTo_boolean_config : undefined, "ignoreNoIndex": typeof $parameter.ignoreNoIndex_boolean_config !== "undefined" ? $parameter.ignoreNoIndex_boolean_config : undefined, "ignorePaginationAttributes": typeof $parameter.ignorePaginationAttributes_boolean_config !== "undefined" ? $parameter.ignorePaginationAttributes_boolean_config : undefined, "ignoreQueryParams": typeof $parameter.ignoreQueryParams_json_config !== "undefined" ? JSON.parse($parameter.ignoreQueryParams_json_config) : undefined, "ignoreRobotsTxtRules": typeof $parameter.ignoreRobotsTxtRules_boolean_config !== "undefined" ? $parameter.ignoreRobotsTxtRules_boolean_config : undefined, "indexPrefix": typeof $parameter.indexPrefix_string_config !== "undefined" ? $parameter.indexPrefix_string_config : undefined, "initialIndexSettings": typeof $parameter.index_settings_config !== "undefined" ? JSON.parse($parameter.index_settings_config) : undefined, "linkExtractor": { "__type": typeof $parameter.__type_options_linkExtractor_config !== "undefined" ? $parameter.__type_options_linkExtractor_config : undefined, "source": typeof $parameter.source_string_linkExtractor_config !== "undefined" ? $parameter.source_string_linkExtractor_config : undefined }, "login": typeof $parameter.http_request_object_config !== "undefined" ? { "url": typeof $parameter.url_string_login_config !== "undefined" ? $parameter.url_string_login_config : undefined, "requestOptions": { "method": typeof $parameter.method_string_requestOptions_login_config !== "undefined" ? $parameter.method_string_requestOptions_login_config : undefined, "headers": { "Accept-Language": typeof $parameter.Accept-Language_string_headers_requestOptions_login_config !== "undefined" ? $parameter.Accept-Language_string_headers_requestOptions_login_config : undefined, "Authorization": typeof $parameter.Authorization_string_headers_requestOptions_login_config !== "undefined" ? $parameter.Authorization_string_headers_requestOptions_login_config : undefined, "Cookie": typeof $parameter.Cookie_string_headers_requestOptions_login_config !== "undefined" ? $parameter.Cookie_string_headers_requestOptions_login_config : undefined }, "body": typeof $parameter.body_string_requestOptions_login_config !== "undefined" ? $parameter.body_string_requestOptions_login_config : undefined, "timeout": typeof $parameter.timeout_number_requestOptions_login_config !== "undefined" ? $parameter.timeout_number_requestOptions_login_config : undefined } } : typeof $parameter.url_string_login_config !== "undefined" ? $parameter.url_string_login_config : typeof $parameter.login_request_options_object_login_config !== "undefined" ? $parameter.login_request_options_object_login_config : typeof $parameter.method_string_requestOptions_login_config !== "undefined" ? $parameter.method_string_requestOptions_login_config : typeof $parameter.headers_object_requestOptions_login_config !== "undefined" ? $parameter.headers_object_requestOptions_login_config : typeof $parameter.Accept-Language_string_headers_requestOptions_login_config !== "undefined" ? $parameter.Accept-Language_string_headers_requestOptions_login_config : typeof $parameter.Authorization_string_headers_requestOptions_login_config !== "undefined" ? $parameter.Authorization_string_headers_requestOptions_login_config : typeof $parameter.Cookie_string_headers_requestOptions_login_config !== "undefined" ? $parameter.Cookie_string_headers_requestOptions_login_config : typeof $parameter.body_string_requestOptions_login_config !== "undefined" ? $parameter.body_string_requestOptions_login_config : typeof $parameter.timeout_number_requestOptions_login_config !== "undefined" ? $parameter.timeout_number_requestOptions_login_config : typeof $parameter.browserbased_object_config !== "undefined" ? { "url": typeof $parameter.url_string_login_config !== "undefined" ? $parameter.url_string_login_config : undefined, "username": typeof $parameter.username_string_login_config !== "undefined" ? $parameter.username_string_login_config : undefined, "password": typeof $parameter.password_string_login_config !== "undefined" ? $parameter.password_string_login_config : undefined, "waitTime": { "min": typeof $parameter.min_number_waitTime_login_config !== "undefined" ? $parameter.min_number_waitTime_login_config : undefined, "max": typeof $parameter.max_number_waitTime_login_config !== "undefined" ? $parameter.max_number_waitTime_login_config : undefined } } : typeof $parameter.url_string_login_config !== "undefined" ? $parameter.url_string_login_config : typeof $parameter.username_string_login_config !== "undefined" ? $parameter.username_string_login_config : typeof $parameter.password_string_login_config !== "undefined" ? $parameter.password_string_login_config : typeof $parameter.wait_time_object_login_config !== "undefined" ? $parameter.wait_time_object_login_config : typeof $parameter.min_number_waitTime_login_config !== "undefined" ? $parameter.min_number_waitTime_login_config : typeof $parameter.max_number_waitTime_login_config !== "undefined" ? $parameter.max_number_waitTime_login_config : typeof $parameter.oauth_20_object_config !== "undefined" ? { "accessTokenRequest": { "url": typeof $parameter.url_string_accessTokenRequest_login_config !== "undefined" ? $parameter.url_string_accessTokenRequest_login_config : undefined, "grantType": typeof $parameter.grantType_options_accessTokenRequest_login_config !== "undefined" ? $parameter.grantType_options_accessTokenRequest_login_config : undefined, "clientId": typeof $parameter.clientId_string_accessTokenRequest_login_config !== "undefined" ? $parameter.clientId_string_accessTokenRequest_login_config : undefined, "clientSecret": typeof $parameter.clientSecret_string_accessTokenRequest_login_config !== "undefined" ? $parameter.clientSecret_string_accessTokenRequest_login_config : undefined, "scope": typeof $parameter.scope_string_accessTokenRequest_login_config !== "undefined" ? $parameter.scope_string_accessTokenRequest_login_config : undefined, "extraParameters": { "resource": typeof $parameter.resource_string_extraParameters_accessTokenRequest_login_config !== "undefined" ? $parameter.resource_string_extraParameters_accessTokenRequest_login_config : undefined } } } : typeof $parameter.access_token_request_object_login_config !== "undefined" ? $parameter.access_token_request_object_login_config : typeof $parameter.url_string_accessTokenRequest_login_config !== "undefined" ? $parameter.url_string_accessTokenRequest_login_config : typeof $parameter.grantType_options_accessTokenRequest_login_config !== "undefined" ? $parameter.grantType_options_accessTokenRequest_login_config : typeof $parameter.clientId_string_accessTokenRequest_login_config !== "undefined" ? $parameter.clientId_string_accessTokenRequest_login_config : typeof $parameter.clientSecret_string_accessTokenRequest_login_config !== "undefined" ? $parameter.clientSecret_string_accessTokenRequest_login_config : typeof $parameter.scope_string_accessTokenRequest_login_config !== "undefined" ? $parameter.scope_string_accessTokenRequest_login_config : typeof $parameter.extra_parameters_object_accessTokenRequest_login_config !== "undefined" ? $parameter.extra_parameters_object_accessTokenRequest_login_config : typeof $parameter.resource_string_extraParameters_accessTokenRequest_login_config !== "undefined" ? $parameter.resource_string_extraParameters_accessTokenRequest_login_config : undefined, "maxDepth": typeof $parameter.maxDepth_number_config !== "undefined" ? $parameter.maxDepth_number_config : undefined, "maxUrls": typeof $parameter.maxUrls_number_config !== "undefined" ? $parameter.maxUrls_number_config : undefined, "rateLimit": typeof $parameter.rateLimit_number_config !== "undefined" ? $parameter.rateLimit_number_config : undefined, "renderJavaScript": typeof $parameter.renderJavaScript_boolean_config !== "undefined" ? $parameter.renderJavaScript_boolean_config : typeof $parameter.renderJavaScript_json_config !== "undefined" ? JSON.parse($parameter.renderJavaScript_json_config) : typeof $parameter.headless_browser_config_object_config !== "undefined" ? { "enabled": typeof $parameter.enabled_boolean_renderJavaScript_config !== "undefined" ? $parameter.enabled_boolean_renderJavaScript_config : undefined, "patterns": typeof $parameter.patterns_json_renderJavaScript_config !== "undefined" ? JSON.parse($parameter.patterns_json_renderJavaScript_config) : undefined, "adBlock": typeof $parameter.adBlock_boolean_renderJavaScript_config !== "undefined" ? $parameter.adBlock_boolean_renderJavaScript_config : undefined, "waitTime": { "min": typeof $parameter.min_number_waitTime_renderJavaScript_config !== "undefined" ? $parameter.min_number_waitTime_renderJavaScript_config : undefined, "max": typeof $parameter.max_number_waitTime_renderJavaScript_config !== "undefined" ? $parameter.max_number_waitTime_renderJavaScript_config : undefined } } : typeof $parameter.enabled_boolean_renderJavaScript_config !== "undefined" ? $parameter.enabled_boolean_renderJavaScript_config : typeof $parameter.patterns_json_renderJavaScript_config !== "undefined" ? JSON.parse($parameter.patterns_json_renderJavaScript_config) : typeof $parameter.adBlock_boolean_renderJavaScript_config !== "undefined" ? $parameter.adBlock_boolean_renderJavaScript_config : typeof $parameter.wait_time_object_renderJavaScript_config !== "undefined" ? $parameter.wait_time_object_renderJavaScript_config : typeof $parameter.min_number_waitTime_renderJavaScript_config !== "undefined" ? $parameter.min_number_waitTime_renderJavaScript_config : typeof $parameter.max_number_waitTime_renderJavaScript_config !== "undefined" ? $parameter.max_number_waitTime_renderJavaScript_config : undefined, "requestOptions": { "proxy": typeof $parameter.proxy_string_requestOptions_config !== "undefined" ? $parameter.proxy_string_requestOptions_config : undefined, "timeout": typeof $parameter.timeout_number_requestOptions_config !== "undefined" ? $parameter.timeout_number_requestOptions_config : undefined, "retries": typeof $parameter.retries_number_requestOptions_config !== "undefined" ? $parameter.retries_number_requestOptions_config : undefined, "headers": { "Accept-Language": typeof $parameter.Accept-Language_string_headers_requestOptions_config !== "undefined" ? $parameter.Accept-Language_string_headers_requestOptions_config : undefined, "Authorization": typeof $parameter.Authorization_string_headers_requestOptions_config !== "undefined" ? $parameter.Authorization_string_headers_requestOptions_config : undefined, "Cookie": typeof $parameter.Cookie_string_headers_requestOptions_config !== "undefined" ? $parameter.Cookie_string_headers_requestOptions_config : undefined } }, "safetyChecks": { "beforeIndexPublishing": { "maxLostRecordsPercentage": typeof $parameter.maxLostRecordsPercentage_number_beforeIndexPublishing_safetyChecks_config !== "undefined" ? $parameter.maxLostRecordsPercentage_number_beforeIndexPublishing_safetyChecks_config : undefined, "maxFailedUrls": typeof $parameter.maxFailedUrls_number_beforeIndexPublishing_safetyChecks_config !== "undefined" ? $parameter.maxFailedUrls_number_beforeIndexPublishing_safetyChecks_config : undefined } }, "saveBackup": typeof $parameter.saveBackup_boolean_config !== "undefined" ? $parameter.saveBackup_boolean_config : undefined, "schedule": typeof $parameter.schedule_string_config !== "undefined" ? $parameter.schedule_string_config : undefined, "sitemaps": typeof $parameter.sitemaps_json_config !== "undefined" ? JSON.parse($parameter.sitemaps_json_config) : undefined, "startUrls": typeof $parameter.startUrls_json_config !== "undefined" ? JSON.parse($parameter.startUrls_json_config) : undefined } }}',
      },
    },
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Actions',
    name: 'actions_json_config',
    default: '',
    description: 'A list of actions.',
    required: false,
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['actions_json_config'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'string',
    description:
      "The Algolia API key the crawler uses for indexing records.\nIf you don't provide an API key, one will be generated by the Crawler when you create a configuration.\n\nThe API key must have:\n\n- These [rights and restrictions](https://www.algolia.com/doc/guides/security/api-keys/#rights-and-restrictions): `search`, `addObject`, `deleteObject`, `deleteIndex`, `settings`, `editSettings`, `listIndexes`, `browse`\n- Access to the correct set of indices, based on the crawler's `indexPrefix`.\nFor example, if the prefix is `crawler_`, the API key must have access to `crawler_*`.\n\n**Don't use your [Admin API key](https://www.algolia.com/doc/guides/security/api-keys/#predefined-api-keys)**.\n",
    displayName: 'Api Key',
    name: 'apiKey_string_config',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['apiKey_string_config'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'string',
    description: 'Algolia application ID where the crawler creates and updates indices.\n',
    displayName: 'Application Id',
    name: 'applicationId_string_config',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['applicationId_string_config'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Exclusion Patterns',
    name: 'exclusionPatterns_json_config',
    default: '[]',
    description: 'URLs to exclude from crawling.',
    required: false,
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['exclusionPatterns_json_config'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'External Data',
    name: 'externalData_json_config',
    default: '[]',
    description: 'References to external data sources for enriching the extracted records.\n',
    required: false,
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['externalData_json_config'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Extra Urls',
    name: 'extraUrls_json_config',
    default: '[]',
    description:
      'The Crawler treats `extraUrls` the same as `startUrls`.\nSpecify `extraUrls` if you want to differentiate between URLs you manually added to fix site crawling from those you initially specified in `startUrls`.\n',
    required: false,
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['extraUrls_json_config'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'options',
    name: 'ignoreCanonicalTo_config',
    displayName: 'Ignore Canonical To',
    default: '',
    options: [
      {
        name: 'Boolean',
        value: 'boolean',
      },
      {
        name: 'Array',
        value: 'array',
      },
    ],
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['ignoreCanonicalTo_config'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'boolean',
    description:
      'Determines if the crawler should extract records from a page with a [canonical URL](https://www.algolia.com/doc/tools/crawler/getting-started/crawler-configuration/#canonical-urls-and-crawler-behavior).\n\nIf `ignoreCanonicalTo` is set to:\n\n- `true` all canonical URLs are ignored.\n- One or more URL patterns, the crawler will ignore the canonical URL if it matches a pattern.\n',
    displayName: 'Ignore Canonical To (Boolean)',
    name: 'ignoreCanonicalTo_boolean_config',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['ignoreCanonicalTo_config'],
        ignoreCanonicalTo_config: ['boolean'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Ignore Canonical To (Array)',
    name: 'ignoreCanonicalTo_json_config',
    default: '[]',
    description: 'Canonical URLs or URL patterns to ignore.\n',
    required: false,
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['ignoreCanonicalTo_config'],
        ignoreCanonicalTo_config: ['array'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'boolean',
    description:
      "Determines if the crawler should follow links with a `nofollow` directive.\nIf `true`, the crawler will ignore the `nofollow` directive and crawl links on the page.\n\nThe crawler always ignores links that don't match your [configuration settings](https://www.algolia.com/doc/tools/crawler/getting-started/crawler-configuration/#exclude-and-include-content).\n`ignoreNoFollowTo` applies to:\n\n- Links that are ignored because the [`robots` meta tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name#Other_metadata_names) contains `nofollow` or `none`.\n- Links with a [`rel` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel) containing the `nofollow` directive.\n",
    displayName: 'Ignore No Follow To',
    name: 'ignoreNoFollowTo_boolean_config',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['ignoreNoFollowTo_boolean_config'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'boolean',
    description:
      'Whether to ignore the `noindex` robots meta tag.\nIf `true`, pages with this meta tag _will_ be crawled.\n',
    displayName: 'Ignore No Index',
    name: 'ignoreNoIndex_boolean_config',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['ignoreNoIndex_boolean_config'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description:
      'Whether the crawler should follow `rel="prev"` and `rel="next"` pagination links in the `<head>` section of an HTML page.\n\n- If `true`, the crawler ignores the pagination links.\n- If `false`, the crawler follows the pagination links.\n',
    displayName: 'Ignore Pagination Attributes',
    name: 'ignorePaginationAttributes_boolean_config',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['ignorePaginationAttributes_boolean_config'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Ignore Query Params',
    name: 'ignoreQueryParams_json_config',
    default: '[]',
    description:
      'Query parameters to ignore while crawling.\n\nAll URLs with the matching query parameters are treated as identical.\nThis prevents indexing URLs that just differ by their query parameters.\n',
    required: false,
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['ignoreQueryParams_json_config'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'boolean',
    description: 'Whether to ignore rules defined in your `robots.txt` file.',
    displayName: 'Ignore Robots Txt Rules',
    name: 'ignoreRobotsTxtRules_boolean_config',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['ignoreRobotsTxtRules_boolean_config'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'crawler_',
    description:
      "A prefix for all indices created by this crawler. It's combined with the `indexName` for each action to form the complete index name.",
    displayName: 'Index Prefix',
    name: 'indexPrefix_string_config',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['indexPrefix_string_config'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'json',
    name: 'index_settings_config',
    displayName: 'Index Settings',
    description: 'Index settings.',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['index_settings_config'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    displayName: 'Link Extractor',
    name: 'link_extractor_object_config',
    type: 'multiOptions',
    description:
      'Function for extracting URLs from links on crawled pages.\n\nFor more information, see the [`linkExtractor` documentation](https://www.algolia.com/doc/tools/crawler/apis/configuration/link-extractor).\n',
    required: false,
    default: [],
    options: [
      {
        name: '  Type',
        value: '__type_options_linkExtractor',
      },
      {
        name: 'Source',
        value: 'source_string_linkExtractor',
      },
    ],
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['link_extractor_object_config'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'options',
    options: [
      {
        name: 'function',
        value: 'function',
      },
    ],
    displayName: '  Type',
    name: '__type_options_linkExtractor_config',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['link_extractor_object_config'],
        link_extractor_object_config: ['__type_options_linkExtractor'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder:
      '({ $, url, defaultExtractor }) => {\n  if (/example.com\/doc\//.test(url.href)) {\n    // For all pages under `/doc`, only extract the first found URL.\n    return defaultExtractor().slice(0, 1)\n  }\n  // For all other pages, use the default.\n  return defaultExtractor()\n}\n',
    displayName: 'Source',
    name: 'source_string_linkExtractor_config',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['link_extractor_object_config'],
        link_extractor_object_config: ['source_string_linkExtractor'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'options',
    name: 'login_config',
    displayName: 'Login',
    default: '',
    options: [
      {
        name: 'HTTP request',
        value: 'http_request',
      },
      {
        name: 'Browser-based',
        value: 'browserbased',
      },
      {
        name: 'OAuth 20',
        value: 'oauth_20',
      },
    ],
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['login_config'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    displayName: 'HTTP Request',
    name: 'http_request_object_config',
    type: 'multiOptions',
    description: 'Information for making a HTTP request for authorization.',
    required: true,
    default: [],
    options: [
      {
        name: 'Url',
        value: 'url_string_login',
      },
      {
        name: 'Login Request Options',
        value: 'login_request_options_object_login',
      },
    ],
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['http_request'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'https://example.com/login',
    description: 'URL with your login form.',
    displayName: 'Url',
    name: 'url_string_login_config',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['http_request'],
        http_request_object_config: ['url_string_login'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    displayName: 'Login Request Options',
    name: 'login_request_options_object_login_config',
    type: 'multiOptions',
    description: 'Options for the HTTP request for logging in.',
    required: false,
    default: [],
    options: [
      {
        name: 'Method',
        value: 'method_string_requestOptions',
      },
      {
        name: 'Headers',
        value: 'headers_object_requestOptions',
      },
      {
        name: 'Body',
        value: 'body_string_requestOptions',
      },
      {
        name: 'Timeout',
        value: 'timeout_number_requestOptions',
      },
    ],
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['http_request'],
        http_request_object_config: ['login_request_options_object_login'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'POST',
    default: 'GET',
    description: 'HTTP method for sending the request.',
    displayName: 'Method',
    name: 'method_string_requestOptions_login_config',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['http_request'],
        http_request_object_config: ['login_request_options_object_login'],
        login_request_options_object_login_config: ['method_string_requestOptions'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    displayName: 'Headers',
    name: 'headers_object_requestOptions_login_config',
    type: 'multiOptions',
    description: 'Headers to add to all requests.',
    required: false,
    default: [],
    options: [
      {
        name: 'Accept-Language',
        value: 'Accept-Language_string_headers',
      },
      {
        name: 'Authorization',
        value: 'Authorization_string_headers',
      },
      {
        name: 'Cookie',
        value: 'Cookie_string_headers',
      },
    ],
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['http_request'],
        http_request_object_config: ['login_request_options_object_login'],
        login_request_options_object_login_config: ['headers_object_requestOptions'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'fr-FR',
    description: 'Preferred natural language and locale.',
    displayName: 'Accept-Language',
    name: 'Accept-Language_string_headers_requestOptions_login_config',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['http_request'],
        http_request_object_config: ['login_request_options_object_login'],
        login_request_options_object_login_config: ['headers_object_requestOptions'],
        headers_object_requestOptions_login_config: ['Accept-Language_string_headers'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'Bearer Aerehdf==',
    description: 'Basic authentication header.',
    displayName: 'Authorization',
    name: 'Authorization_string_headers_requestOptions_login_config',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['http_request'],
        http_request_object_config: ['login_request_options_object_login'],
        login_request_options_object_login_config: ['headers_object_requestOptions'],
        headers_object_requestOptions_login_config: ['Authorization_string_headers'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'session=1234',
    description: 'Cookie. The header will be replaced by the cookie retrieved when logging in.',
    displayName: 'Cookie',
    name: 'Cookie_string_headers_requestOptions_login_config',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['http_request'],
        http_request_object_config: ['login_request_options_object_login'],
        login_request_options_object_login_config: ['headers_object_requestOptions'],
        headers_object_requestOptions_login_config: ['Cookie_string_headers'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'id=user&password=s3cr3t',
    description: 'Form content.',
    displayName: 'Body',
    name: 'body_string_requestOptions_login_config',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['http_request'],
        http_request_object_config: ['login_request_options_object_login'],
        login_request_options_object_login_config: ['body_string_requestOptions'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'number',
    description: 'Timeout for the request.',
    displayName: 'Timeout',
    name: 'timeout_number_requestOptions_login_config',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['http_request'],
        http_request_object_config: ['login_request_options_object_login'],
        login_request_options_object_login_config: ['timeout_number_requestOptions'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    displayName: 'Browser-Based',
    name: 'browserbased_object_config',
    type: 'multiOptions',
    description:
      'Information for using a web browser for authorization.\nThe browser loads a login page and enters the provided credentials.\n',
    required: true,
    default: [],
    options: [
      {
        name: 'Url',
        value: 'url_string_login',
      },
      {
        name: 'Username',
        value: 'username_string_login',
      },
      {
        name: 'Password',
        value: 'password_string_login',
      },
      {
        name: 'Wait Time',
        value: 'wait_time_object_login',
      },
    ],
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['browserbased'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'https://example.com/login',
    description:
      'URL of your login page.\n\nThe crawler looks for an input matching the selector `input[type=text]` or `input[type=email]` for the username and `input[type=password]` for the password.\n',
    displayName: 'Url',
    name: 'url_string_login_config',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['browserbased'],
        browserbased_object_config: ['url_string_login'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'crawler',
    description: 'Username for signing in.',
    displayName: 'Username',
    name: 'username_string_login_config',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['browserbased'],
        browserbased_object_config: ['username_string_login'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 's3cr3t',
    description: 'Password for signing in.',
    displayName: 'Password',
    name: 'password_string_login_config',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['browserbased'],
        browserbased_object_config: ['password_string_login'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    displayName: 'Wait Time',
    name: 'wait_time_object_login_config',
    type: 'multiOptions',
    description: 'Timeout for the HTTP request.',
    required: false,
    default: [],
    options: [
      {
        name: 'Min',
        value: 'min_number_waitTime',
      },
      {
        name: 'Max',
        value: 'max_number_waitTime',
      },
    ],
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['browserbased'],
        browserbased_object_config: ['wait_time_object_login'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '7000',
    description: 'Minimum waiting time in milliseconds.',
    displayName: 'Min',
    name: 'min_number_waitTime_login_config',
    default: 0,
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['browserbased'],
        browserbased_object_config: ['wait_time_object_login'],
        wait_time_object_login_config: ['min_number_waitTime'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '15000',
    default: 20000,
    description: 'Maximum waiting time in milliseconds.',
    displayName: 'Max',
    name: 'max_number_waitTime_login_config',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['browserbased'],
        browserbased_object_config: ['wait_time_object_login'],
        wait_time_object_login_config: ['max_number_waitTime'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    displayName: 'OAuth 20',
    name: 'oauth_20_object_config',
    type: 'multiOptions',
    description:
      'Authorization information for using the [OAuth 2.0 client credentials](https://datatracker.ietf.org/doc/html/rfc6749#section-4.4) authorization grant.\n\nOAuth authorization is supported for [Azure Active Directory version 1](https://learn.microsoft.com/en-us/previous-versions/azure/active-directory/azuread-dev/v1-oauth2-client-creds-grant-flow) as provider.\n',
    required: true,
    default: [],
    options: [
      {
        name: 'Access Token Request',
        value: 'access_token_request_object_login',
      },
    ],
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['oauth_20'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    displayName: 'Access Token Request',
    name: 'access_token_request_object_login_config',
    type: 'multiOptions',
    description:
      'Parameters required to make the [access token request](https://datatracker.ietf.org/doc/html/rfc6749#section-4.4.2).\n',
    required: true,
    default: [],
    options: [
      {
        name: 'Url',
        value: 'url_string_accessTokenRequest',
      },
      {
        name: 'Grant Type',
        value: 'grantType_options_accessTokenRequest',
      },
      {
        name: 'Client Id',
        value: 'clientId_string_accessTokenRequest',
      },
      {
        name: 'Client Secret',
        value: 'clientSecret_string_accessTokenRequest',
      },
      {
        name: 'Scope',
        value: 'scope_string_accessTokenRequest',
      },
      {
        name: 'Extra Parameters',
        value: 'extra_parameters_object_accessTokenRequest',
      },
    ],
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['oauth_20'],
        oauth_20_object_config: ['access_token_request_object_login'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'string',
    description: 'URL for the access token endpoint.',
    displayName: 'Url',
    name: 'url_string_accessTokenRequest_login_config',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['oauth_20'],
        oauth_20_object_config: ['access_token_request_object_login'],
        access_token_request_object_login_config: ['url_string_accessTokenRequest'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'options',
    description: 'OAuth 2.0 grant type.',
    options: [
      {
        name: 'client_credentials',
        value: 'client_credentials',
      },
    ],
    displayName: 'Grant Type',
    name: 'grantType_options_accessTokenRequest_login_config',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['oauth_20'],
        oauth_20_object_config: ['access_token_request_object_login'],
        access_token_request_object_login_config: ['grantType_options_accessTokenRequest'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'string',
    description:
      '[Client identifier](https://datatracker.ietf.org/doc/html/rfc6749#section-2.2).\n',
    displayName: 'Client Id',
    name: 'clientId_string_accessTokenRequest_login_config',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['oauth_20'],
        oauth_20_object_config: ['access_token_request_object_login'],
        access_token_request_object_login_config: ['clientId_string_accessTokenRequest'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'string',
    description: 'Client secret.',
    displayName: 'Client Secret',
    name: 'clientSecret_string_accessTokenRequest_login_config',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['oauth_20'],
        oauth_20_object_config: ['access_token_request_object_login'],
        access_token_request_object_login_config: ['clientSecret_string_accessTokenRequest'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'string',
    description:
      '[Access token scope](https://datatracker.ietf.org/doc/html/rfc6749#section-3.3).\n',
    displayName: 'Scope',
    name: 'scope_string_accessTokenRequest_login_config',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['oauth_20'],
        oauth_20_object_config: ['access_token_request_object_login'],
        access_token_request_object_login_config: ['scope_string_accessTokenRequest'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    displayName: 'Extra Parameters',
    name: 'extra_parameters_object_accessTokenRequest_login_config',
    type: 'multiOptions',
    description: 'Extra parameters for the authorization request.',
    required: false,
    default: [],
    options: [
      {
        name: 'Resource',
        value: 'resource_string_extraParameters',
      },
    ],
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['oauth_20'],
        oauth_20_object_config: ['access_token_request_object_login'],
        access_token_request_object_login_config: ['extra_parameters_object_accessTokenRequest'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'string',
    description:
      'App ID URI of the receiving web service.\n\nFor more information, see [Azure Active Directory](https://learn.microsoft.com/en-us/previous-versions/azure/active-directory/azuread-dev/v1-oauth2-client-creds-grant-flow#first-case-access-token-request-with-a-shared-secret).\n',
    displayName: 'Resource',
    name: 'resource_string_extraParameters_accessTokenRequest_login_config',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['login_config'],
        login_config: ['oauth_20'],
        oauth_20_object_config: ['access_token_request_object_login'],
        access_token_request_object_login_config: ['extra_parameters_object_accessTokenRequest'],
        extra_parameters_object_accessTokenRequest_login_config: [
          'resource_string_extraParameters',
        ],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '5',
    description:
      "Determines the maximum path depth of crawled URLs.\n\nPath depth is calculated based on the number of slash characters (`/`) after the domain (starting at 1).\nFor example:\n\n- **1** `http://example.com`\n- **1** `http://example.com/`\n- **1** `http://example.com/foo`\n- **2** `http://example.com/foo/`\n- **2** `http://example.com/foo/bar`\n- **3** `http://example.com/foo/bar/`\n\n**URLs added with `startUrls` and `sitemaps` aren't checked for `maxDepth`.**.\n",
    typeOptions: {
      minValue: 1,
      maxValue: 100,
    },
    displayName: 'Max Depth',
    name: 'maxDepth_number_config',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['maxDepth_number_config'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '250',
    description:
      'Limits the number of URLs your crawler processes.\n\nChange it to a low value, such as 100, for quick crawling tests.\nChange it to a higher explicit value for full crawls to prevent it from getting "lost" in complex site structures.\nBecause the Crawler works on many pages simultaneously, `maxUrls` doesn\'t guarantee finding the same pages each time it runs.\n',
    typeOptions: {
      minValue: 1,
      maxValue: 15000000,
    },
    displayName: 'Max Urls',
    name: 'maxUrls_number_config',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['maxUrls_number_config'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '4',
    description:
      "Determines the number of concurrent tasks per second that can run for this configuration.\n\nA higher rate limit means more crawls per second.\nAlgolia prevents system overload by ensuring the number of URLs added in the last second and the number of URLs being processed is less than the rate limit:\n\n\n```\nmax(new_urls_added, active_urls_processing) <= rateLimit\n```\n\nStart with a low value (for example, 2) and increase it if you need faster crawling.\nBe aware that a high `rateLimit` can have a huge impact on bandwidth cost and server resource consumption.\n\nThe number of pages processed per second depends on the average time it takes to fetch, process, and upload a URL. \nFor a given `rateLimit` if fetching, processing, and uploading URLs takes (on average):\n\n- Less than a second, your crawler processes up to `rateLimit` pages per second.\n- Four seconds, your crawler processes up to `rateLimit / 4` pages per second.\n\nIn the latter case, increasing `rateLimit` improves performance, up to a point. \nHowever, if the processing time remains at four seconds, increasing `rateLimit` won't increase the number of pages processed per second.\n",
    typeOptions: {
      minValue: 1,
      maxValue: 100,
    },
    displayName: 'Rate Limit',
    name: 'rateLimit_number_config',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['rateLimit_number_config'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'options',
    name: 'renderJavaScript_config',
    displayName: 'Render Java Script',
    default: '',
    options: [
      {
        name: 'Boolean',
        value: 'boolean',
      },
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'HeadlessBrowserConfig',
        value: 'headlessbrowserconfig',
      },
    ],
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['renderJavaScript_config'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'boolean',
    description: 'Whether to render all pages.',
    displayName: 'Render Java Script (Boolean)',
    name: 'renderJavaScript_boolean_config',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['renderJavaScript_config'],
        renderJavaScript_config: ['boolean'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Render Java Script (Array)',
    name: 'renderJavaScript_json_config',
    default: '[]',
    description: 'URLs or URL patterns to render.',
    required: false,
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['renderJavaScript_config'],
        renderJavaScript_config: ['array'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    displayName: 'Headless Browser Config',
    name: 'headless_browser_config_object_config',
    type: 'multiOptions',
    description: 'Configuration for rendering HTML.',
    required: true,
    default: [],
    options: [
      {
        name: 'Enabled',
        value: 'enabled_boolean_renderJavaScript',
      },
      {
        name: 'Patterns',
        value: 'patterns_json_renderJavaScript',
      },
      {
        name: 'Ad Block',
        value: 'adBlock_boolean_renderJavaScript',
      },
      {
        name: 'Wait Time',
        value: 'wait_time_object_renderJavaScript',
      },
    ],
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['renderJavaScript_config'],
        renderJavaScript_config: ['headlessbrowserconfig'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'boolean',
    placeholder: 'true',
    description: 'Whether to enable JavaScript rendering.',
    displayName: 'Enabled',
    name: 'enabled_boolean_renderJavaScript_config',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['renderJavaScript_config'],
        renderJavaScript_config: ['headlessbrowserconfig'],
        headless_browser_config_object_config: ['enabled_boolean_renderJavaScript'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Patterns',
    name: 'patterns_json_renderJavaScript_config',
    default: '[]',
    description: 'URLs or URL patterns to render.',
    required: false,
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['renderJavaScript_config'],
        renderJavaScript_config: ['headlessbrowserconfig'],
        headless_browser_config_object_config: ['patterns_json_renderJavaScript'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'boolean',
    description:
      "Whether to use the Crawler's ad blocker.\nIt blocks most ads and tracking scripts but can break some sites.\n",
    displayName: 'Ad Block',
    name: 'adBlock_boolean_renderJavaScript_config',
    default: false,
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['renderJavaScript_config'],
        renderJavaScript_config: ['headlessbrowserconfig'],
        headless_browser_config_object_config: ['adBlock_boolean_renderJavaScript'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    displayName: 'Wait Time',
    name: 'wait_time_object_renderJavaScript_config',
    type: 'multiOptions',
    description: 'Timeout for the HTTP request.',
    required: false,
    default: [],
    options: [
      {
        name: 'Min',
        value: 'min_number_waitTime',
      },
      {
        name: 'Max',
        value: 'max_number_waitTime',
      },
    ],
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['renderJavaScript_config'],
        renderJavaScript_config: ['headlessbrowserconfig'],
        headless_browser_config_object_config: ['wait_time_object_renderJavaScript'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '7000',
    description: 'Minimum waiting time in milliseconds.',
    displayName: 'Min',
    name: 'min_number_waitTime_renderJavaScript_config',
    default: 0,
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['renderJavaScript_config'],
        renderJavaScript_config: ['headlessbrowserconfig'],
        headless_browser_config_object_config: ['wait_time_object_renderJavaScript'],
        wait_time_object_renderJavaScript_config: ['min_number_waitTime'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '15000',
    default: 20000,
    description: 'Maximum waiting time in milliseconds.',
    displayName: 'Max',
    name: 'max_number_waitTime_renderJavaScript_config',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['renderJavaScript_config'],
        renderJavaScript_config: ['headlessbrowserconfig'],
        headless_browser_config_object_config: ['wait_time_object_renderJavaScript'],
        wait_time_object_renderJavaScript_config: ['max_number_waitTime'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    displayName: 'Request Options',
    name: 'request_options_object_config',
    type: 'multiOptions',
    description: 'Lets you add options to HTTP requests made by the crawler.',
    required: false,
    default: [],
    options: [
      {
        name: 'Proxy',
        value: 'proxy_string_requestOptions',
      },
      {
        name: 'Timeout',
        value: 'timeout_number_requestOptions',
      },
      {
        name: 'Retries',
        value: 'retries_number_requestOptions',
      },
      {
        name: 'Headers',
        value: 'headers_object_requestOptions',
      },
    ],
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['request_options_object_config'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'string',
    description: 'Proxy for all crawler requests.',
    displayName: 'Proxy',
    name: 'proxy_string_requestOptions_config',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['request_options_object_config'],
        request_options_object_config: ['proxy_string_requestOptions'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'number',
    default: 30000,
    description: 'Timeout in milliseconds for the crawl.',
    displayName: 'Timeout',
    name: 'timeout_number_requestOptions_config',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['request_options_object_config'],
        request_options_object_config: ['timeout_number_requestOptions'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'number',
    default: 3,
    description: 'Maximum number of retries to crawl one URL.',
    displayName: 'Retries',
    name: 'retries_number_requestOptions_config',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['request_options_object_config'],
        request_options_object_config: ['retries_number_requestOptions'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    displayName: 'Headers',
    name: 'headers_object_requestOptions_config',
    type: 'multiOptions',
    description: 'Headers to add to all requests.',
    required: false,
    default: [],
    options: [
      {
        name: 'Accept-Language',
        value: 'Accept-Language_string_headers',
      },
      {
        name: 'Authorization',
        value: 'Authorization_string_headers',
      },
      {
        name: 'Cookie',
        value: 'Cookie_string_headers',
      },
    ],
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['request_options_object_config'],
        request_options_object_config: ['headers_object_requestOptions'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'fr-FR',
    description: 'Preferred natural language and locale.',
    displayName: 'Accept-Language',
    name: 'Accept-Language_string_headers_requestOptions_config',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['request_options_object_config'],
        request_options_object_config: ['headers_object_requestOptions'],
        headers_object_requestOptions_config: ['Accept-Language_string_headers'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'Bearer Aerehdf==',
    description: 'Basic authentication header.',
    displayName: 'Authorization',
    name: 'Authorization_string_headers_requestOptions_config',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['request_options_object_config'],
        request_options_object_config: ['headers_object_requestOptions'],
        headers_object_requestOptions_config: ['Authorization_string_headers'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'session=1234',
    description: 'Cookie. The header will be replaced by the cookie retrieved when logging in.',
    displayName: 'Cookie',
    name: 'Cookie_string_headers_requestOptions_config',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['request_options_object_config'],
        request_options_object_config: ['headers_object_requestOptions'],
        headers_object_requestOptions_config: ['Cookie_string_headers'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    displayName: 'Safety Checks',
    name: 'safety_checks_object_config',
    type: 'multiOptions',
    description:
      'Checks to ensure the crawl was successful.\n\nFor more information, see the [Safety checks](https://www.algolia.com/doc/tools/crawler/getting-started/crawler-configuration/#safety-checks) documentation.\n',
    required: false,
    default: [],
    options: [
      {
        name: 'Before Index Publishing',
        value: 'before_index_publishing_object_safetyChecks',
      },
    ],
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['safety_checks_object_config'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    displayName: 'Before Index Publishing',
    name: 'before_index_publishing_object_safetyChecks_config',
    type: 'multiOptions',
    description:
      'Checks triggered after the crawl finishes but before the records are added to the Algolia index.',
    required: false,
    default: [],
    options: [
      {
        name: 'Max Lost Records Percentage',
        value: 'maxLostRecordsPercentage_number_beforeIndexPublishing',
      },
      {
        name: 'Max Failed Urls',
        value: 'maxFailedUrls_number_beforeIndexPublishing',
      },
    ],
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['safety_checks_object_config'],
        safety_checks_object_config: ['before_index_publishing_object_safetyChecks'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'number',
    default: 10,
    description: 'Maximum difference in percent between the numbers of records between crawls.',
    typeOptions: {
      minValue: 1,
      maxValue: 100,
    },
    displayName: 'Max Lost Records Percentage',
    name: 'maxLostRecordsPercentage_number_beforeIndexPublishing_safetyChecks_config',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['safety_checks_object_config'],
        safety_checks_object_config: ['before_index_publishing_object_safetyChecks'],
        before_index_publishing_object_safetyChecks_config: [
          'maxLostRecordsPercentage_number_beforeIndexPublishing',
        ],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'number',
    description: 'Stops the crawler if a specified number of pages fail to crawl.',
    displayName: 'Max Failed Urls',
    name: 'maxFailedUrls_number_beforeIndexPublishing_safetyChecks_config',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['safety_checks_object_config'],
        safety_checks_object_config: ['before_index_publishing_object_safetyChecks'],
        before_index_publishing_object_safetyChecks_config: [
          'maxFailedUrls_number_beforeIndexPublishing',
        ],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'boolean',
    description:
      'Whether to back up your index before the crawler overwrites it with new records.\n',
    displayName: 'Save Backup',
    name: 'saveBackup_boolean_config',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['saveBackup_boolean_config'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'every weekday at 12:00 pm',
    description:
      'Schedule for running the crawl.\n\nInstead of manually starting a crawl each time, you can set up a schedule for automatic crawls.\n[Use the visual UI](https://www.algolia.com/doc/tools/crawler/getting-started/crawler-configuration-visual) or add the `schedule` parameter to [your configuration](https://www.algolia.com/doc/tools/crawler/getting-started/crawler-configuration).\n\n`schedule` uses [Later.js syntax](https://bunkat.github.io/later) to specify when to crawl your site.\nHere are some key things to keep in mind when using `Later.js` syntax with the Crawler:\n\n- The interval between two scheduled crawls must be at least 24 hours.\n- To crawl daily, use "every 1 day" instead of "everyday" or "every day".\n- If you don\'t specify a time, the crawl can happen any time during the scheduled day.\n- Specify times for the UTC (GMT+0) timezone\n- Include minutes when specifying a time. For example, "at 3:00 pm" instead of "at 3pm".\n- Use "at 12:00 am" to specify midnight, not "at 00:00 am".\n',
    displayName: 'Schedule',
    name: 'schedule_string_config',
    default: '',
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['schedule_string_config'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Sitemaps',
    name: 'sitemaps_json_config',
    default: '[]',
    description: 'Sitemaps with URLs from where to start crawling.',
    required: false,
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['sitemaps_json_config'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Start Urls',
    name: 'startUrls_json_config',
    default: '[]',
    description: 'URLs from where to start crawling.',
    required: false,
    displayOptions: {
      show: {
        patch_crawler_object: ['configuration_object'],
        configuration_object: ['startUrls_json_config'],
        resource: ['crawlers'],
        operation: ['patchCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'e0f6db8a-24f5-4092-83a4-1b2c6cb6d809',
    description: 'Universally unique identifier (UUID) of the crawler.',
    displayName: 'Id',
    name: 'id_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['crawlers'],
        operation: ['deleteCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'e0f6db8a-24f5-4092-83a4-1b2c6cb6d809',
    description: 'Universally unique identifier (UUID) of the crawler.',
    displayName: 'Id',
    name: 'id_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['actions'],
        operation: ['runCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'e0f6db8a-24f5-4092-83a4-1b2c6cb6d809',
    description: 'Universally unique identifier (UUID) of the crawler.',
    displayName: 'Id',
    name: 'id_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['actions'],
        operation: ['pauseCrawler'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'e0f6db8a-24f5-4092-83a4-1b2c6cb6d809',
    description: 'Universally unique identifier (UUID) of the crawler.',
    displayName: 'Id',
    name: 'id_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['actions'],
        operation: ['startReindex'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'e0f6db8a-24f5-4092-83a4-1b2c6cb6d809',
    description: 'Universally unique identifier (UUID) of the crawler.',
    displayName: 'Id',
    name: 'id_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    displayName: 'Test Url',
    name: 'test_url_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Url',
        value: 'url_string',
      },
      {
        name: 'Partial Config',
        value: 'partial_config',
      },
    ],
    displayOptions: {
      show: {
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'https://www.algolia.com/blog',
    description: 'URL to test.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'url',
      },
    },
    displayName: 'Url',
    name: 'url_string',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['url_string'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'multiOptions',
    name: 'partial_config',
    displayName: 'Partial Config',
    description:
      'Crawler configuration to update.\nYou can only update top-level configuration properties.\nTo update a nested configuration, such as `actions.recordExtractor`,\nyou must provide the complete top-level object such as `actions`.\n',
    default: [],
    options: [
      {
        name: 'Actions',
        value: 'actions_json_config',
      },
      {
        name: 'Api Key',
        value: 'apikey_string_config',
      },
      {
        name: 'Application Id',
        value: 'applicationid_string_config',
      },
      {
        name: 'Exclusion Patterns',
        value: 'exclusionpatterns_json_config',
      },
      {
        name: 'External Data',
        value: 'externaldata_json_config',
      },
      {
        name: 'Extra Urls',
        value: 'extraurls_json_config',
      },
      {
        name: 'Ignore Canonical To Config',
        value: 'ignorecanonicalto_config',
      },
      {
        name: 'Ignore No Follow To',
        value: 'ignorenofollowto_boolean_config',
      },
      {
        name: 'Ignore No Index',
        value: 'ignorenoindex_boolean_config',
      },
      {
        name: 'Ignore Pagination Attributes',
        value: 'ignorepaginationattributes_boolean_config',
      },
      {
        name: 'Ignore Query Params',
        value: 'ignorequeryparams_json_config',
      },
      {
        name: 'Ignore Robots Txt Rules',
        value: 'ignorerobotstxtrules_boolean_config',
      },
      {
        name: 'Index Prefix',
        value: 'indexprefix_string_config',
      },
      {
        name: 'Index Settings Config',
        value: 'index_settings_config',
      },
      {
        name: 'Link Extractor Object Config',
        value: 'link_extractor_object_config',
      },
      {
        name: 'Login Config',
        value: 'login_config',
      },
      {
        name: 'Max Depth',
        value: 'maxdepth_number_config',
      },
      {
        name: 'Max Urls',
        value: 'maxurls_number_config',
      },
      {
        name: 'Rate Limit',
        value: 'ratelimit_number_config',
      },
      {
        name: 'Render Java Script Config',
        value: 'renderjavascript_config',
      },
      {
        name: 'Request',
        value: 'request_options_object_config',
      },
      {
        name: 'Safety Checks Object Config',
        value: 'safety_checks_object_config',
      },
      {
        name: 'Save Backup',
        value: 'savebackup_boolean_config',
      },
      {
        name: 'Schedule',
        value: 'schedule_string_config',
      },
      {
        name: 'Sitemaps',
        value: 'sitemaps_json_config',
      },
      {
        name: 'Start Urls',
        value: 'starturls_json_config',
      },
    ],
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Actions',
    name: 'actions_json_config',
    default: '',
    description: 'A list of actions.',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'actions',
      },
    },
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        partial_config: ['actions_json_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'string',
    description:
      "The Algolia API key the crawler uses for indexing records.\nIf you don't provide an API key, one will be generated by the Crawler when you create a configuration.\n\nThe API key must have:\n\n- These [rights and restrictions](https://www.algolia.com/doc/guides/security/api-keys/#rights-and-restrictions): `search`, `addObject`, `deleteObject`, `deleteIndex`, `settings`, `editSettings`, `listIndexes`, `browse`\n- Access to the correct set of indices, based on the crawler's `indexPrefix`.\nFor example, if the prefix is `crawler_`, the API key must have access to `crawler_*`.\n\n**Don't use your [Admin API key](https://www.algolia.com/doc/guides/security/api-keys/#predefined-api-keys)**.\n",
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'apiKey',
      },
    },
    displayName: 'Api Key',
    name: 'apiKey_string_config',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        partial_config: ['apikey_string_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'string',
    description: 'Algolia application ID where the crawler creates and updates indices.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'applicationId',
      },
    },
    displayName: 'Application Id',
    name: 'applicationId_string_config',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        partial_config: ['applicationid_string_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Exclusion Patterns',
    name: 'exclusionPatterns_json_config',
    default: '[]',
    description: 'URLs to exclude from crawling.',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'exclusionPatterns',
      },
    },
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        partial_config: ['exclusionpatterns_json_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'External Data',
    name: 'externalData_json_config',
    default: '[]',
    description: 'References to external data sources for enriching the extracted records.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'externalData',
      },
    },
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        partial_config: ['externaldata_json_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Extra Urls',
    name: 'extraUrls_json_config',
    default: '[]',
    description:
      'The Crawler treats `extraUrls` the same as `startUrls`.\nSpecify `extraUrls` if you want to differentiate between URLs you manually added to fix site crawling from those you initially specified in `startUrls`.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'extraUrls',
      },
    },
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        partial_config: ['extraurls_json_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'options',
    name: 'ignoreCanonicalTo_config',
    displayName: 'Ignore Canonical To',
    default: '',
    options: [
      {
        name: 'Boolean',
        value: 'boolean',
      },
      {
        name: 'Array',
        value: 'array',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'ignoreCanonicalTo',
        value:
          '={{ typeof $parameter.ignoreCanonicalTo_boolean_config !== "undefined" ? $parameter.ignoreCanonicalTo_boolean_config : typeof $parameter.ignoreCanonicalTo_json_config !== "undefined" ? JSON.parse($parameter.ignoreCanonicalTo_json_config) : undefined }}',
      },
    },
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        partial_config: ['ignorecanonicalto_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'boolean',
    description:
      'Determines if the crawler should extract records from a page with a [canonical URL](https://www.algolia.com/doc/tools/crawler/getting-started/crawler-configuration/#canonical-urls-and-crawler-behavior).\n\nIf `ignoreCanonicalTo` is set to:\n\n- `true` all canonical URLs are ignored.\n- One or more URL patterns, the crawler will ignore the canonical URL if it matches a pattern.\n',
    displayName: 'Ignore Canonical To (Boolean)',
    name: 'ignoreCanonicalTo_boolean_config',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        ignoreCanonicalTo_config: ['boolean'],
        partial_config: ['ignorecanonicalto_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Ignore Canonical To (Array)',
    name: 'ignoreCanonicalTo_json_config',
    default: '[]',
    description: 'Canonical URLs or URL patterns to ignore.\n',
    required: false,
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        ignoreCanonicalTo_config: ['array'],
        partial_config: ['ignorecanonicalto_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'boolean',
    description:
      "Determines if the crawler should follow links with a `nofollow` directive.\nIf `true`, the crawler will ignore the `nofollow` directive and crawl links on the page.\n\nThe crawler always ignores links that don't match your [configuration settings](https://www.algolia.com/doc/tools/crawler/getting-started/crawler-configuration/#exclude-and-include-content).\n`ignoreNoFollowTo` applies to:\n\n- Links that are ignored because the [`robots` meta tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name#Other_metadata_names) contains `nofollow` or `none`.\n- Links with a [`rel` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel) containing the `nofollow` directive.\n",
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'ignoreNoFollowTo',
      },
    },
    displayName: 'Ignore No Follow To',
    name: 'ignoreNoFollowTo_boolean_config',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        partial_config: ['ignorenofollowto_boolean_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'boolean',
    description:
      'Whether to ignore the `noindex` robots meta tag.\nIf `true`, pages with this meta tag _will_ be crawled.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'ignoreNoIndex',
      },
    },
    displayName: 'Ignore No Index',
    name: 'ignoreNoIndex_boolean_config',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        partial_config: ['ignorenoindex_boolean_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description:
      'Whether the crawler should follow `rel="prev"` and `rel="next"` pagination links in the `<head>` section of an HTML page.\n\n- If `true`, the crawler ignores the pagination links.\n- If `false`, the crawler follows the pagination links.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'ignorePaginationAttributes',
      },
    },
    displayName: 'Ignore Pagination Attributes',
    name: 'ignorePaginationAttributes_boolean_config',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        partial_config: ['ignorepaginationattributes_boolean_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Ignore Query Params',
    name: 'ignoreQueryParams_json_config',
    default: '[]',
    description:
      'Query parameters to ignore while crawling.\n\nAll URLs with the matching query parameters are treated as identical.\nThis prevents indexing URLs that just differ by their query parameters.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'ignoreQueryParams',
      },
    },
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        partial_config: ['ignorequeryparams_json_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'boolean',
    description: 'Whether to ignore rules defined in your `robots.txt` file.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'ignoreRobotsTxtRules',
      },
    },
    displayName: 'Ignore Robots Txt Rules',
    name: 'ignoreRobotsTxtRules_boolean_config',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        partial_config: ['ignorerobotstxtrules_boolean_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'crawler_',
    description:
      "A prefix for all indices created by this crawler. It's combined with the `indexName` for each action to form the complete index name.",
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'indexPrefix',
      },
    },
    displayName: 'Index Prefix',
    name: 'indexPrefix_string_config',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        partial_config: ['indexprefix_string_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'json',
    name: 'index_settings_config',
    displayName: 'Index Settings',
    description: 'Index settings.',
    default: '',
    routing: {
      send: {
        type: 'body',
        property: 'initialIndexSettings',
        value: '={{ undefined }}',
      },
    },
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        partial_config: ['index_settings_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    displayName: 'Link Extractor',
    name: 'link_extractor_object_config',
    type: 'multiOptions',
    description:
      'Function for extracting URLs from links on crawled pages.\n\nFor more information, see the [`linkExtractor` documentation](https://www.algolia.com/doc/tools/crawler/apis/configuration/link-extractor).\n',
    required: false,
    default: [],
    options: [
      {
        name: '  Type',
        value: '__type_options_linkExtractor',
      },
      {
        name: 'Source',
        value: 'source_string_linkExtractor',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'linkExtractor',
        value:
          '={{ { "__type": typeof $parameter.__type_options_linkExtractor_config !== "undefined" ? $parameter.__type_options_linkExtractor_config : undefined, "source": typeof $parameter.source_string_linkExtractor_config !== "undefined" ? $parameter.source_string_linkExtractor_config : undefined } }}',
      },
    },
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        partial_config: ['link_extractor_object_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'options',
    options: [
      {
        name: 'function',
        value: 'function',
      },
    ],
    displayName: '  Type',
    name: '__type_options_linkExtractor_config',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        link_extractor_object_config: ['__type_options_linkExtractor'],
        partial_config: ['link_extractor_object_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'string',
    placeholder:
      '({ $, url, defaultExtractor }) => {\n  if (/example.com\/doc\//.test(url.href)) {\n    // For all pages under `/doc`, only extract the first found URL.\n    return defaultExtractor().slice(0, 1)\n  }\n  // For all other pages, use the default.\n  return defaultExtractor()\n}\n',
    displayName: 'Source',
    name: 'source_string_linkExtractor_config',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        link_extractor_object_config: ['source_string_linkExtractor'],
        partial_config: ['link_extractor_object_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'options',
    name: 'login_config',
    displayName: 'Login',
    default: '',
    options: [
      {
        name: 'HTTP request',
        value: 'http_request',
      },
      {
        name: 'Browser-based',
        value: 'browserbased',
      },
      {
        name: 'OAuth 20',
        value: 'oauth_20',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'login',
        value:
          '={{ typeof $parameter.http_request_object_config !== "undefined" ? { "url": typeof $parameter.url_string_login_config !== "undefined" ? $parameter.url_string_login_config : undefined, "requestOptions": { "method": typeof $parameter.method_string_requestOptions_login_config !== "undefined" ? $parameter.method_string_requestOptions_login_config : undefined, "headers": { "Accept-Language": typeof $parameter.Accept-Language_string_headers_requestOptions_login_config !== "undefined" ? $parameter.Accept-Language_string_headers_requestOptions_login_config : undefined, "Authorization": typeof $parameter.Authorization_string_headers_requestOptions_login_config !== "undefined" ? $parameter.Authorization_string_headers_requestOptions_login_config : undefined, "Cookie": typeof $parameter.Cookie_string_headers_requestOptions_login_config !== "undefined" ? $parameter.Cookie_string_headers_requestOptions_login_config : undefined }, "body": typeof $parameter.body_string_requestOptions_login_config !== "undefined" ? $parameter.body_string_requestOptions_login_config : undefined, "timeout": typeof $parameter.timeout_number_requestOptions_login_config !== "undefined" ? $parameter.timeout_number_requestOptions_login_config : undefined } } : typeof $parameter.url_string_login_config !== "undefined" ? $parameter.url_string_login_config : typeof $parameter.login_request_options_object_login_config !== "undefined" ? $parameter.login_request_options_object_login_config : typeof $parameter.method_string_requestOptions_login_config !== "undefined" ? $parameter.method_string_requestOptions_login_config : typeof $parameter.headers_object_requestOptions_login_config !== "undefined" ? $parameter.headers_object_requestOptions_login_config : typeof $parameter.Accept-Language_string_headers_requestOptions_login_config !== "undefined" ? $parameter.Accept-Language_string_headers_requestOptions_login_config : typeof $parameter.Authorization_string_headers_requestOptions_login_config !== "undefined" ? $parameter.Authorization_string_headers_requestOptions_login_config : typeof $parameter.Cookie_string_headers_requestOptions_login_config !== "undefined" ? $parameter.Cookie_string_headers_requestOptions_login_config : typeof $parameter.body_string_requestOptions_login_config !== "undefined" ? $parameter.body_string_requestOptions_login_config : typeof $parameter.timeout_number_requestOptions_login_config !== "undefined" ? $parameter.timeout_number_requestOptions_login_config : typeof $parameter.browserbased_object_config !== "undefined" ? { "url": typeof $parameter.url_string_login_config !== "undefined" ? $parameter.url_string_login_config : undefined, "username": typeof $parameter.username_string_login_config !== "undefined" ? $parameter.username_string_login_config : undefined, "password": typeof $parameter.password_string_login_config !== "undefined" ? $parameter.password_string_login_config : undefined, "waitTime": { "min": typeof $parameter.min_number_waitTime_login_config !== "undefined" ? $parameter.min_number_waitTime_login_config : undefined, "max": typeof $parameter.max_number_waitTime_login_config !== "undefined" ? $parameter.max_number_waitTime_login_config : undefined } } : typeof $parameter.url_string_login_config !== "undefined" ? $parameter.url_string_login_config : typeof $parameter.username_string_login_config !== "undefined" ? $parameter.username_string_login_config : typeof $parameter.password_string_login_config !== "undefined" ? $parameter.password_string_login_config : typeof $parameter.wait_time_object_login_config !== "undefined" ? $parameter.wait_time_object_login_config : typeof $parameter.min_number_waitTime_login_config !== "undefined" ? $parameter.min_number_waitTime_login_config : typeof $parameter.max_number_waitTime_login_config !== "undefined" ? $parameter.max_number_waitTime_login_config : typeof $parameter.oauth_20_object_config !== "undefined" ? { "accessTokenRequest": { "url": typeof $parameter.url_string_accessTokenRequest_login_config !== "undefined" ? $parameter.url_string_accessTokenRequest_login_config : undefined, "grantType": typeof $parameter.grantType_options_accessTokenRequest_login_config !== "undefined" ? $parameter.grantType_options_accessTokenRequest_login_config : undefined, "clientId": typeof $parameter.clientId_string_accessTokenRequest_login_config !== "undefined" ? $parameter.clientId_string_accessTokenRequest_login_config : undefined, "clientSecret": typeof $parameter.clientSecret_string_accessTokenRequest_login_config !== "undefined" ? $parameter.clientSecret_string_accessTokenRequest_login_config : undefined, "scope": typeof $parameter.scope_string_accessTokenRequest_login_config !== "undefined" ? $parameter.scope_string_accessTokenRequest_login_config : undefined, "extraParameters": { "resource": typeof $parameter.resource_string_extraParameters_accessTokenRequest_login_config !== "undefined" ? $parameter.resource_string_extraParameters_accessTokenRequest_login_config : undefined } } } : typeof $parameter.access_token_request_object_login_config !== "undefined" ? $parameter.access_token_request_object_login_config : typeof $parameter.url_string_accessTokenRequest_login_config !== "undefined" ? $parameter.url_string_accessTokenRequest_login_config : typeof $parameter.grantType_options_accessTokenRequest_login_config !== "undefined" ? $parameter.grantType_options_accessTokenRequest_login_config : typeof $parameter.clientId_string_accessTokenRequest_login_config !== "undefined" ? $parameter.clientId_string_accessTokenRequest_login_config : typeof $parameter.clientSecret_string_accessTokenRequest_login_config !== "undefined" ? $parameter.clientSecret_string_accessTokenRequest_login_config : typeof $parameter.scope_string_accessTokenRequest_login_config !== "undefined" ? $parameter.scope_string_accessTokenRequest_login_config : typeof $parameter.extra_parameters_object_accessTokenRequest_login_config !== "undefined" ? $parameter.extra_parameters_object_accessTokenRequest_login_config : typeof $parameter.resource_string_extraParameters_accessTokenRequest_login_config !== "undefined" ? $parameter.resource_string_extraParameters_accessTokenRequest_login_config : undefined }}',
      },
    },
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        partial_config: ['login_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    displayName: 'HTTP Request',
    name: 'http_request_object_config',
    type: 'multiOptions',
    description: 'Information for making a HTTP request for authorization.',
    required: true,
    default: [],
    options: [
      {
        name: 'Url',
        value: 'url_string_login',
      },
      {
        name: 'Login Request Options',
        value: 'login_request_options_object_login',
      },
    ],
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        login_config: ['http_request'],
        partial_config: ['login_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'https://example.com/login',
    description: 'URL with your login form.',
    displayName: 'Url',
    name: 'url_string_login_config',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        login_config: ['http_request'],
        http_request_object_config: ['url_string_login'],
        partial_config: ['login_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    displayName: 'Login Request Options',
    name: 'login_request_options_object_login_config',
    type: 'multiOptions',
    description: 'Options for the HTTP request for logging in.',
    required: false,
    default: [],
    options: [
      {
        name: 'Method',
        value: 'method_string_requestOptions',
      },
      {
        name: 'Headers',
        value: 'headers_object_requestOptions',
      },
      {
        name: 'Body',
        value: 'body_string_requestOptions',
      },
      {
        name: 'Timeout',
        value: 'timeout_number_requestOptions',
      },
    ],
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        login_config: ['http_request'],
        http_request_object_config: ['login_request_options_object_login'],
        partial_config: ['login_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'POST',
    default: 'GET',
    description: 'HTTP method for sending the request.',
    displayName: 'Method',
    name: 'method_string_requestOptions_login_config',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        login_config: ['http_request'],
        http_request_object_config: ['login_request_options_object_login'],
        login_request_options_object_login_config: ['method_string_requestOptions'],
        partial_config: ['login_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    displayName: 'Headers',
    name: 'headers_object_requestOptions_login_config',
    type: 'multiOptions',
    description: 'Headers to add to all requests.',
    required: false,
    default: [],
    options: [
      {
        name: 'Accept-Language',
        value: 'Accept-Language_string_headers',
      },
      {
        name: 'Authorization',
        value: 'Authorization_string_headers',
      },
      {
        name: 'Cookie',
        value: 'Cookie_string_headers',
      },
    ],
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        login_config: ['http_request'],
        http_request_object_config: ['login_request_options_object_login'],
        login_request_options_object_login_config: ['headers_object_requestOptions'],
        partial_config: ['login_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'fr-FR',
    description: 'Preferred natural language and locale.',
    displayName: 'Accept-Language',
    name: 'Accept-Language_string_headers_requestOptions_login_config',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        login_config: ['http_request'],
        http_request_object_config: ['login_request_options_object_login'],
        login_request_options_object_login_config: ['headers_object_requestOptions'],
        headers_object_requestOptions_login_config: ['Accept-Language_string_headers'],
        partial_config: ['login_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'Bearer Aerehdf==',
    description: 'Basic authentication header.',
    displayName: 'Authorization',
    name: 'Authorization_string_headers_requestOptions_login_config',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        login_config: ['http_request'],
        http_request_object_config: ['login_request_options_object_login'],
        login_request_options_object_login_config: ['headers_object_requestOptions'],
        headers_object_requestOptions_login_config: ['Authorization_string_headers'],
        partial_config: ['login_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'session=1234',
    description: 'Cookie. The header will be replaced by the cookie retrieved when logging in.',
    displayName: 'Cookie',
    name: 'Cookie_string_headers_requestOptions_login_config',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        login_config: ['http_request'],
        http_request_object_config: ['login_request_options_object_login'],
        login_request_options_object_login_config: ['headers_object_requestOptions'],
        headers_object_requestOptions_login_config: ['Cookie_string_headers'],
        partial_config: ['login_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'id=user&password=s3cr3t',
    description: 'Form content.',
    displayName: 'Body',
    name: 'body_string_requestOptions_login_config',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        login_config: ['http_request'],
        http_request_object_config: ['login_request_options_object_login'],
        login_request_options_object_login_config: ['body_string_requestOptions'],
        partial_config: ['login_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'number',
    description: 'Timeout for the request.',
    displayName: 'Timeout',
    name: 'timeout_number_requestOptions_login_config',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        login_config: ['http_request'],
        http_request_object_config: ['login_request_options_object_login'],
        login_request_options_object_login_config: ['timeout_number_requestOptions'],
        partial_config: ['login_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    displayName: 'Browser-Based',
    name: 'browserbased_object_config',
    type: 'multiOptions',
    description:
      'Information for using a web browser for authorization.\nThe browser loads a login page and enters the provided credentials.\n',
    required: true,
    default: [],
    options: [
      {
        name: 'Url',
        value: 'url_string_login',
      },
      {
        name: 'Username',
        value: 'username_string_login',
      },
      {
        name: 'Password',
        value: 'password_string_login',
      },
      {
        name: 'Wait Time',
        value: 'wait_time_object_login',
      },
    ],
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        login_config: ['browserbased'],
        partial_config: ['login_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'https://example.com/login',
    description:
      'URL of your login page.\n\nThe crawler looks for an input matching the selector `input[type=text]` or `input[type=email]` for the username and `input[type=password]` for the password.\n',
    displayName: 'Url',
    name: 'url_string_login_config',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        login_config: ['browserbased'],
        browserbased_object_config: ['url_string_login'],
        partial_config: ['login_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'crawler',
    description: 'Username for signing in.',
    displayName: 'Username',
    name: 'username_string_login_config',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        login_config: ['browserbased'],
        browserbased_object_config: ['username_string_login'],
        partial_config: ['login_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 's3cr3t',
    description: 'Password for signing in.',
    displayName: 'Password',
    name: 'password_string_login_config',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        login_config: ['browserbased'],
        browserbased_object_config: ['password_string_login'],
        partial_config: ['login_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    displayName: 'Wait Time',
    name: 'wait_time_object_login_config',
    type: 'multiOptions',
    description: 'Timeout for the HTTP request.',
    required: false,
    default: [],
    options: [
      {
        name: 'Min',
        value: 'min_number_waitTime',
      },
      {
        name: 'Max',
        value: 'max_number_waitTime',
      },
    ],
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        login_config: ['browserbased'],
        browserbased_object_config: ['wait_time_object_login'],
        partial_config: ['login_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '7000',
    description: 'Minimum waiting time in milliseconds.',
    displayName: 'Min',
    name: 'min_number_waitTime_login_config',
    default: 0,
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        login_config: ['browserbased'],
        browserbased_object_config: ['wait_time_object_login'],
        wait_time_object_login_config: ['min_number_waitTime'],
        partial_config: ['login_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '15000',
    default: 20000,
    description: 'Maximum waiting time in milliseconds.',
    displayName: 'Max',
    name: 'max_number_waitTime_login_config',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        login_config: ['browserbased'],
        browserbased_object_config: ['wait_time_object_login'],
        wait_time_object_login_config: ['max_number_waitTime'],
        partial_config: ['login_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    displayName: 'OAuth 20',
    name: 'oauth_20_object_config',
    type: 'multiOptions',
    description:
      'Authorization information for using the [OAuth 2.0 client credentials](https://datatracker.ietf.org/doc/html/rfc6749#section-4.4) authorization grant.\n\nOAuth authorization is supported for [Azure Active Directory version 1](https://learn.microsoft.com/en-us/previous-versions/azure/active-directory/azuread-dev/v1-oauth2-client-creds-grant-flow) as provider.\n',
    required: true,
    default: [],
    options: [
      {
        name: 'Access Token Request',
        value: 'access_token_request_object_login',
      },
    ],
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        login_config: ['oauth_20'],
        partial_config: ['login_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    displayName: 'Access Token Request',
    name: 'access_token_request_object_login_config',
    type: 'multiOptions',
    description:
      'Parameters required to make the [access token request](https://datatracker.ietf.org/doc/html/rfc6749#section-4.4.2).\n',
    required: true,
    default: [],
    options: [
      {
        name: 'Url',
        value: 'url_string_accessTokenRequest',
      },
      {
        name: 'Grant Type',
        value: 'grantType_options_accessTokenRequest',
      },
      {
        name: 'Client Id',
        value: 'clientId_string_accessTokenRequest',
      },
      {
        name: 'Client Secret',
        value: 'clientSecret_string_accessTokenRequest',
      },
      {
        name: 'Scope',
        value: 'scope_string_accessTokenRequest',
      },
      {
        name: 'Extra Parameters',
        value: 'extra_parameters_object_accessTokenRequest',
      },
    ],
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        login_config: ['oauth_20'],
        oauth_20_object_config: ['access_token_request_object_login'],
        partial_config: ['login_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'string',
    description: 'URL for the access token endpoint.',
    displayName: 'Url',
    name: 'url_string_accessTokenRequest_login_config',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        login_config: ['oauth_20'],
        oauth_20_object_config: ['access_token_request_object_login'],
        access_token_request_object_login_config: ['url_string_accessTokenRequest'],
        partial_config: ['login_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'options',
    description: 'OAuth 2.0 grant type.',
    options: [
      {
        name: 'client_credentials',
        value: 'client_credentials',
      },
    ],
    displayName: 'Grant Type',
    name: 'grantType_options_accessTokenRequest_login_config',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        login_config: ['oauth_20'],
        oauth_20_object_config: ['access_token_request_object_login'],
        access_token_request_object_login_config: ['grantType_options_accessTokenRequest'],
        partial_config: ['login_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'string',
    description:
      '[Client identifier](https://datatracker.ietf.org/doc/html/rfc6749#section-2.2).\n',
    displayName: 'Client Id',
    name: 'clientId_string_accessTokenRequest_login_config',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        login_config: ['oauth_20'],
        oauth_20_object_config: ['access_token_request_object_login'],
        access_token_request_object_login_config: ['clientId_string_accessTokenRequest'],
        partial_config: ['login_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'string',
    description: 'Client secret.',
    displayName: 'Client Secret',
    name: 'clientSecret_string_accessTokenRequest_login_config',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        login_config: ['oauth_20'],
        oauth_20_object_config: ['access_token_request_object_login'],
        access_token_request_object_login_config: ['clientSecret_string_accessTokenRequest'],
        partial_config: ['login_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'string',
    description:
      '[Access token scope](https://datatracker.ietf.org/doc/html/rfc6749#section-3.3).\n',
    displayName: 'Scope',
    name: 'scope_string_accessTokenRequest_login_config',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        login_config: ['oauth_20'],
        oauth_20_object_config: ['access_token_request_object_login'],
        access_token_request_object_login_config: ['scope_string_accessTokenRequest'],
        partial_config: ['login_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    displayName: 'Extra Parameters',
    name: 'extra_parameters_object_accessTokenRequest_login_config',
    type: 'multiOptions',
    description: 'Extra parameters for the authorization request.',
    required: false,
    default: [],
    options: [
      {
        name: 'Resource',
        value: 'resource_string_extraParameters',
      },
    ],
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        login_config: ['oauth_20'],
        oauth_20_object_config: ['access_token_request_object_login'],
        access_token_request_object_login_config: ['extra_parameters_object_accessTokenRequest'],
        partial_config: ['login_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'string',
    description:
      'App ID URI of the receiving web service.\n\nFor more information, see [Azure Active Directory](https://learn.microsoft.com/en-us/previous-versions/azure/active-directory/azuread-dev/v1-oauth2-client-creds-grant-flow#first-case-access-token-request-with-a-shared-secret).\n',
    displayName: 'Resource',
    name: 'resource_string_extraParameters_accessTokenRequest_login_config',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        login_config: ['oauth_20'],
        oauth_20_object_config: ['access_token_request_object_login'],
        access_token_request_object_login_config: ['extra_parameters_object_accessTokenRequest'],
        extra_parameters_object_accessTokenRequest_login_config: [
          'resource_string_extraParameters',
        ],
        partial_config: ['login_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '5',
    description:
      "Determines the maximum path depth of crawled URLs.\n\nPath depth is calculated based on the number of slash characters (`/`) after the domain (starting at 1).\nFor example:\n\n- **1** `http://example.com`\n- **1** `http://example.com/`\n- **1** `http://example.com/foo`\n- **2** `http://example.com/foo/`\n- **2** `http://example.com/foo/bar`\n- **3** `http://example.com/foo/bar/`\n\n**URLs added with `startUrls` and `sitemaps` aren't checked for `maxDepth`.**.\n",
    typeOptions: {
      minValue: 1,
      maxValue: 100,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'maxDepth',
      },
    },
    displayName: 'Max Depth',
    name: 'maxDepth_number_config',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        partial_config: ['maxdepth_number_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '250',
    description:
      'Limits the number of URLs your crawler processes.\n\nChange it to a low value, such as 100, for quick crawling tests.\nChange it to a higher explicit value for full crawls to prevent it from getting "lost" in complex site structures.\nBecause the Crawler works on many pages simultaneously, `maxUrls` doesn\'t guarantee finding the same pages each time it runs.\n',
    typeOptions: {
      minValue: 1,
      maxValue: 15000000,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'maxUrls',
      },
    },
    displayName: 'Max Urls',
    name: 'maxUrls_number_config',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        partial_config: ['maxurls_number_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '4',
    description:
      "Determines the number of concurrent tasks per second that can run for this configuration.\n\nA higher rate limit means more crawls per second.\nAlgolia prevents system overload by ensuring the number of URLs added in the last second and the number of URLs being processed is less than the rate limit:\n\n\n```\nmax(new_urls_added, active_urls_processing) <= rateLimit\n```\n\nStart with a low value (for example, 2) and increase it if you need faster crawling.\nBe aware that a high `rateLimit` can have a huge impact on bandwidth cost and server resource consumption.\n\nThe number of pages processed per second depends on the average time it takes to fetch, process, and upload a URL. \nFor a given `rateLimit` if fetching, processing, and uploading URLs takes (on average):\n\n- Less than a second, your crawler processes up to `rateLimit` pages per second.\n- Four seconds, your crawler processes up to `rateLimit / 4` pages per second.\n\nIn the latter case, increasing `rateLimit` improves performance, up to a point. \nHowever, if the processing time remains at four seconds, increasing `rateLimit` won't increase the number of pages processed per second.\n",
    typeOptions: {
      minValue: 1,
      maxValue: 100,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'rateLimit',
      },
    },
    displayName: 'Rate Limit',
    name: 'rateLimit_number_config',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        partial_config: ['ratelimit_number_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'options',
    name: 'renderJavaScript_config',
    displayName: 'Render Java Script',
    default: '',
    options: [
      {
        name: 'Boolean',
        value: 'boolean',
      },
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'HeadlessBrowserConfig',
        value: 'headlessbrowserconfig',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'renderJavaScript',
        value:
          '={{ typeof $parameter.renderJavaScript_boolean_config !== "undefined" ? $parameter.renderJavaScript_boolean_config : typeof $parameter.renderJavaScript_json_config !== "undefined" ? JSON.parse($parameter.renderJavaScript_json_config) : typeof $parameter.headless_browser_config_object_config !== "undefined" ? { "enabled": typeof $parameter.enabled_boolean_renderJavaScript_config !== "undefined" ? $parameter.enabled_boolean_renderJavaScript_config : undefined, "patterns": typeof $parameter.patterns_json_renderJavaScript_config !== "undefined" ? JSON.parse($parameter.patterns_json_renderJavaScript_config) : undefined, "adBlock": typeof $parameter.adBlock_boolean_renderJavaScript_config !== "undefined" ? $parameter.adBlock_boolean_renderJavaScript_config : undefined, "waitTime": { "min": typeof $parameter.min_number_waitTime_renderJavaScript_config !== "undefined" ? $parameter.min_number_waitTime_renderJavaScript_config : undefined, "max": typeof $parameter.max_number_waitTime_renderJavaScript_config !== "undefined" ? $parameter.max_number_waitTime_renderJavaScript_config : undefined } } : typeof $parameter.enabled_boolean_renderJavaScript_config !== "undefined" ? $parameter.enabled_boolean_renderJavaScript_config : typeof $parameter.patterns_json_renderJavaScript_config !== "undefined" ? JSON.parse($parameter.patterns_json_renderJavaScript_config) : typeof $parameter.adBlock_boolean_renderJavaScript_config !== "undefined" ? $parameter.adBlock_boolean_renderJavaScript_config : typeof $parameter.wait_time_object_renderJavaScript_config !== "undefined" ? $parameter.wait_time_object_renderJavaScript_config : typeof $parameter.min_number_waitTime_renderJavaScript_config !== "undefined" ? $parameter.min_number_waitTime_renderJavaScript_config : typeof $parameter.max_number_waitTime_renderJavaScript_config !== "undefined" ? $parameter.max_number_waitTime_renderJavaScript_config : undefined }}',
      },
    },
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        partial_config: ['renderjavascript_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'boolean',
    description: 'Whether to render all pages.',
    displayName: 'Render Java Script (Boolean)',
    name: 'renderJavaScript_boolean_config',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        renderJavaScript_config: ['boolean'],
        partial_config: ['renderjavascript_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Render Java Script (Array)',
    name: 'renderJavaScript_json_config',
    default: '[]',
    description: 'URLs or URL patterns to render.',
    required: false,
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        renderJavaScript_config: ['array'],
        partial_config: ['renderjavascript_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    displayName: 'Headless Browser Config',
    name: 'headless_browser_config_object_config',
    type: 'multiOptions',
    description: 'Configuration for rendering HTML.',
    required: true,
    default: [],
    options: [
      {
        name: 'Enabled',
        value: 'enabled_boolean_renderJavaScript',
      },
      {
        name: 'Patterns',
        value: 'patterns_json_renderJavaScript',
      },
      {
        name: 'Ad Block',
        value: 'adBlock_boolean_renderJavaScript',
      },
      {
        name: 'Wait Time',
        value: 'wait_time_object_renderJavaScript',
      },
    ],
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        renderJavaScript_config: ['headlessbrowserconfig'],
        partial_config: ['renderjavascript_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'boolean',
    placeholder: 'true',
    description: 'Whether to enable JavaScript rendering.',
    displayName: 'Enabled',
    name: 'enabled_boolean_renderJavaScript_config',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        renderJavaScript_config: ['headlessbrowserconfig'],
        headless_browser_config_object_config: ['enabled_boolean_renderJavaScript'],
        partial_config: ['renderjavascript_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Patterns',
    name: 'patterns_json_renderJavaScript_config',
    default: '[]',
    description: 'URLs or URL patterns to render.',
    required: false,
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        renderJavaScript_config: ['headlessbrowserconfig'],
        headless_browser_config_object_config: ['patterns_json_renderJavaScript'],
        partial_config: ['renderjavascript_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'boolean',
    description:
      "Whether to use the Crawler's ad blocker.\nIt blocks most ads and tracking scripts but can break some sites.\n",
    displayName: 'Ad Block',
    name: 'adBlock_boolean_renderJavaScript_config',
    default: false,
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        renderJavaScript_config: ['headlessbrowserconfig'],
        headless_browser_config_object_config: ['adBlock_boolean_renderJavaScript'],
        partial_config: ['renderjavascript_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    displayName: 'Wait Time',
    name: 'wait_time_object_renderJavaScript_config',
    type: 'multiOptions',
    description: 'Timeout for the HTTP request.',
    required: false,
    default: [],
    options: [
      {
        name: 'Min',
        value: 'min_number_waitTime',
      },
      {
        name: 'Max',
        value: 'max_number_waitTime',
      },
    ],
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        renderJavaScript_config: ['headlessbrowserconfig'],
        headless_browser_config_object_config: ['wait_time_object_renderJavaScript'],
        partial_config: ['renderjavascript_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '7000',
    description: 'Minimum waiting time in milliseconds.',
    displayName: 'Min',
    name: 'min_number_waitTime_renderJavaScript_config',
    default: 0,
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        renderJavaScript_config: ['headlessbrowserconfig'],
        headless_browser_config_object_config: ['wait_time_object_renderJavaScript'],
        wait_time_object_renderJavaScript_config: ['min_number_waitTime'],
        partial_config: ['renderjavascript_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '15000',
    default: 20000,
    description: 'Maximum waiting time in milliseconds.',
    displayName: 'Max',
    name: 'max_number_waitTime_renderJavaScript_config',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        renderJavaScript_config: ['headlessbrowserconfig'],
        headless_browser_config_object_config: ['wait_time_object_renderJavaScript'],
        wait_time_object_renderJavaScript_config: ['max_number_waitTime'],
        partial_config: ['renderjavascript_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    displayName: 'Request Options',
    name: 'request_options_object_config',
    type: 'multiOptions',
    description: 'Lets you add options to HTTP requests made by the crawler.',
    required: false,
    default: [],
    options: [
      {
        name: 'Proxy',
        value: 'proxy_string_requestOptions',
      },
      {
        name: 'Timeout',
        value: 'timeout_number_requestOptions',
      },
      {
        name: 'Retries',
        value: 'retries_number_requestOptions',
      },
      {
        name: 'Headers',
        value: 'headers_object_requestOptions',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'requestOptions',
        value:
          '={{ { "proxy": typeof $parameter.proxy_string_requestOptions_config !== "undefined" ? $parameter.proxy_string_requestOptions_config : undefined, "timeout": typeof $parameter.timeout_number_requestOptions_config !== "undefined" ? $parameter.timeout_number_requestOptions_config : undefined, "retries": typeof $parameter.retries_number_requestOptions_config !== "undefined" ? $parameter.retries_number_requestOptions_config : undefined, "headers": { "Accept-Language": typeof $parameter.Accept-Language_string_headers_requestOptions_config !== "undefined" ? $parameter.Accept-Language_string_headers_requestOptions_config : undefined, "Authorization": typeof $parameter.Authorization_string_headers_requestOptions_config !== "undefined" ? $parameter.Authorization_string_headers_requestOptions_config : undefined, "Cookie": typeof $parameter.Cookie_string_headers_requestOptions_config !== "undefined" ? $parameter.Cookie_string_headers_requestOptions_config : undefined } } }}',
      },
    },
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        partial_config: ['request_options_object_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'string',
    description: 'Proxy for all crawler requests.',
    displayName: 'Proxy',
    name: 'proxy_string_requestOptions_config',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        request_options_object_config: ['proxy_string_requestOptions'],
        partial_config: ['request_options_object_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'number',
    default: 30000,
    description: 'Timeout in milliseconds for the crawl.',
    displayName: 'Timeout',
    name: 'timeout_number_requestOptions_config',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        request_options_object_config: ['timeout_number_requestOptions'],
        partial_config: ['request_options_object_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'number',
    default: 3,
    description: 'Maximum number of retries to crawl one URL.',
    displayName: 'Retries',
    name: 'retries_number_requestOptions_config',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        request_options_object_config: ['retries_number_requestOptions'],
        partial_config: ['request_options_object_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    displayName: 'Headers',
    name: 'headers_object_requestOptions_config',
    type: 'multiOptions',
    description: 'Headers to add to all requests.',
    required: false,
    default: [],
    options: [
      {
        name: 'Accept-Language',
        value: 'Accept-Language_string_headers',
      },
      {
        name: 'Authorization',
        value: 'Authorization_string_headers',
      },
      {
        name: 'Cookie',
        value: 'Cookie_string_headers',
      },
    ],
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        request_options_object_config: ['headers_object_requestOptions'],
        partial_config: ['request_options_object_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'fr-FR',
    description: 'Preferred natural language and locale.',
    displayName: 'Accept-Language',
    name: 'Accept-Language_string_headers_requestOptions_config',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        request_options_object_config: ['headers_object_requestOptions'],
        headers_object_requestOptions_config: ['Accept-Language_string_headers'],
        partial_config: ['request_options_object_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'Bearer Aerehdf==',
    description: 'Basic authentication header.',
    displayName: 'Authorization',
    name: 'Authorization_string_headers_requestOptions_config',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        request_options_object_config: ['headers_object_requestOptions'],
        headers_object_requestOptions_config: ['Authorization_string_headers'],
        partial_config: ['request_options_object_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'session=1234',
    description: 'Cookie. The header will be replaced by the cookie retrieved when logging in.',
    displayName: 'Cookie',
    name: 'Cookie_string_headers_requestOptions_config',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        request_options_object_config: ['headers_object_requestOptions'],
        headers_object_requestOptions_config: ['Cookie_string_headers'],
        partial_config: ['request_options_object_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    displayName: 'Safety Checks',
    name: 'safety_checks_object_config',
    type: 'multiOptions',
    description:
      'Checks to ensure the crawl was successful.\n\nFor more information, see the [Safety checks](https://www.algolia.com/doc/tools/crawler/getting-started/crawler-configuration/#safety-checks) documentation.\n',
    required: false,
    default: [],
    options: [
      {
        name: 'Before Index Publishing',
        value: 'before_index_publishing_object_safetyChecks',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'safetyChecks',
        value:
          '={{ { "beforeIndexPublishing": { "maxLostRecordsPercentage": typeof $parameter.maxLostRecordsPercentage_number_beforeIndexPublishing_safetyChecks_config !== "undefined" ? $parameter.maxLostRecordsPercentage_number_beforeIndexPublishing_safetyChecks_config : undefined, "maxFailedUrls": typeof $parameter.maxFailedUrls_number_beforeIndexPublishing_safetyChecks_config !== "undefined" ? $parameter.maxFailedUrls_number_beforeIndexPublishing_safetyChecks_config : undefined } } }}',
      },
    },
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        partial_config: ['safety_checks_object_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    displayName: 'Before Index Publishing',
    name: 'before_index_publishing_object_safetyChecks_config',
    type: 'multiOptions',
    description:
      'Checks triggered after the crawl finishes but before the records are added to the Algolia index.',
    required: false,
    default: [],
    options: [
      {
        name: 'Max Lost Records Percentage',
        value: 'maxLostRecordsPercentage_number_beforeIndexPublishing',
      },
      {
        name: 'Max Failed Urls',
        value: 'maxFailedUrls_number_beforeIndexPublishing',
      },
    ],
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        safety_checks_object_config: ['before_index_publishing_object_safetyChecks'],
        partial_config: ['safety_checks_object_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'number',
    default: 10,
    description: 'Maximum difference in percent between the numbers of records between crawls.',
    typeOptions: {
      minValue: 1,
      maxValue: 100,
    },
    displayName: 'Max Lost Records Percentage',
    name: 'maxLostRecordsPercentage_number_beforeIndexPublishing_safetyChecks_config',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        safety_checks_object_config: ['before_index_publishing_object_safetyChecks'],
        before_index_publishing_object_safetyChecks_config: [
          'maxLostRecordsPercentage_number_beforeIndexPublishing',
        ],
        partial_config: ['safety_checks_object_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'number',
    description: 'Stops the crawler if a specified number of pages fail to crawl.',
    displayName: 'Max Failed Urls',
    name: 'maxFailedUrls_number_beforeIndexPublishing_safetyChecks_config',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        safety_checks_object_config: ['before_index_publishing_object_safetyChecks'],
        before_index_publishing_object_safetyChecks_config: [
          'maxFailedUrls_number_beforeIndexPublishing',
        ],
        partial_config: ['safety_checks_object_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'boolean',
    description:
      'Whether to back up your index before the crawler overwrites it with new records.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'saveBackup',
      },
    },
    displayName: 'Save Backup',
    name: 'saveBackup_boolean_config',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        partial_config: ['savebackup_boolean_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'every weekday at 12:00 pm',
    description:
      'Schedule for running the crawl.\n\nInstead of manually starting a crawl each time, you can set up a schedule for automatic crawls.\n[Use the visual UI](https://www.algolia.com/doc/tools/crawler/getting-started/crawler-configuration-visual) or add the `schedule` parameter to [your configuration](https://www.algolia.com/doc/tools/crawler/getting-started/crawler-configuration).\n\n`schedule` uses [Later.js syntax](https://bunkat.github.io/later) to specify when to crawl your site.\nHere are some key things to keep in mind when using `Later.js` syntax with the Crawler:\n\n- The interval between two scheduled crawls must be at least 24 hours.\n- To crawl daily, use "every 1 day" instead of "everyday" or "every day".\n- If you don\'t specify a time, the crawl can happen any time during the scheduled day.\n- Specify times for the UTC (GMT+0) timezone\n- Include minutes when specifying a time. For example, "at 3:00 pm" instead of "at 3pm".\n- Use "at 12:00 am" to specify midnight, not "at 00:00 am".\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'schedule',
      },
    },
    displayName: 'Schedule',
    name: 'schedule_string_config',
    default: '',
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        partial_config: ['schedule_string_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Sitemaps',
    name: 'sitemaps_json_config',
    default: '[]',
    description: 'Sitemaps with URLs from where to start crawling.',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'sitemaps',
      },
    },
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        partial_config: ['sitemaps_json_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Start Urls',
    name: 'startUrls_json_config',
    default: '[]',
    description: 'URLs from where to start crawling.',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'startUrls',
      },
    },
    displayOptions: {
      show: {
        test_url_object: ['partial_config'],
        partial_config: ['starturls_json_config'],
        resource: ['actions'],
        operation: ['testUrl'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'e0f6db8a-24f5-4092-83a4-1b2c6cb6d809',
    description: 'Universally unique identifier (UUID) of the crawler.',
    displayName: 'Id',
    name: 'id_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['actions'],
        operation: ['crawlUrls'],
      },
    },
  },
  {
    displayName: 'Crawl Urls',
    name: 'crawl_urls_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Urls',
        value: 'urls_json',
      },
      {
        name: 'Save',
        value: 'save_boolean',
      },
    ],
    displayOptions: {
      show: {
        resource: ['actions'],
        operation: ['crawlUrls'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Urls',
    name: 'urls_json',
    default: '[]',
    description: 'URLs to crawl.',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'urls',
      },
    },
    displayOptions: {
      show: {
        crawl_urls_object: ['urls_json'],
        resource: ['actions'],
        operation: ['crawlUrls'],
      },
    },
  },
  {
    type: 'boolean',
    description:
      "Whether the specified URLs should be added to the `extraURLs` property of the crawler configuration.\nIf unspecified, the URLs are added to the `extraUrls` field only if they haven't been indexed during the last reindex.\n",
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'save',
      },
    },
    displayName: 'Save',
    name: 'save_boolean',
    default: '',
    displayOptions: {
      show: {
        crawl_urls_object: ['save_boolean'],
        resource: ['actions'],
        operation: ['crawlUrls'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'e0f6db8a-24f5-4092-83a4-1b2c6cb6d809',
    description: 'Universally unique identifier (UUID) of the crawler.',
    displayName: 'Id',
    name: 'id_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['crawlers'],
        operation: ['getStats'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'e0f6db8a-24f5-4092-83a4-1b2c6cb6d809',
    description: 'Universally unique identifier (UUID) of the crawler.',
    displayName: 'Id',
    name: 'id_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'multiOptions',
    name: 'partial_config',
    displayName: 'Partial Config',
    description:
      'Crawler configuration to update.\nYou can only update top-level configuration properties.\nTo update a nested configuration, such as `actions.recordExtractor`,\nyou must provide the complete top-level object such as `actions`.\n',
    default: [],
    options: [
      {
        name: 'Actions',
        value: 'actions_json',
      },
      {
        name: 'Api Key',
        value: 'apikey_string',
      },
      {
        name: 'Application Id',
        value: 'applicationid_string',
      },
      {
        name: 'Exclusion Patterns',
        value: 'exclusionpatterns_json',
      },
      {
        name: 'External Data',
        value: 'externaldata_json',
      },
      {
        name: 'Extra Urls',
        value: 'extraurls_json',
      },
      {
        name: 'Ignore Canonical To',
        value: 'ignorecanonicalto',
      },
      {
        name: 'Ignore No Follow To',
        value: 'ignorenofollowto_boolean',
      },
      {
        name: 'Ignore No Index',
        value: 'ignorenoindex_boolean',
      },
      {
        name: 'Ignore Pagination Attributes',
        value: 'ignorepaginationattributes_boolean',
      },
      {
        name: 'Ignore Query Params',
        value: 'ignorequeryparams_json',
      },
      {
        name: 'Ignore Robots Txt Rules',
        value: 'ignorerobotstxtrules_boolean',
      },
      {
        name: 'Index Prefix',
        value: 'indexprefix_string',
      },
      {
        name: 'Index Settings',
        value: 'index_settings',
      },
      {
        name: 'Link Extractor Object',
        value: 'link_extractor_object',
      },
      {
        name: 'Login',
        value: 'login',
      },
      {
        name: 'Max Depth',
        value: 'maxdepth_number',
      },
      {
        name: 'Max Urls',
        value: 'maxurls_number',
      },
      {
        name: 'Rate Limit',
        value: 'ratelimit_number',
      },
      {
        name: 'Render Java Script',
        value: 'renderjavascript',
      },
      {
        name: 'Request',
        value: 'request_options_object',
      },
      {
        name: 'Safety Checks Object',
        value: 'safety_checks_object',
      },
      {
        name: 'Save Backup',
        value: 'savebackup_boolean',
      },
      {
        name: 'Schedule',
        value: 'schedule_string',
      },
      {
        name: 'Sitemaps',
        value: 'sitemaps_json',
      },
      {
        name: 'Start Urls',
        value: 'starturls_json',
      },
    ],
    displayOptions: {
      show: {
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Actions',
    name: 'actions_json',
    default: '',
    description: 'A list of actions.',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'actions',
      },
    },
    displayOptions: {
      show: {
        partial_config: ['actions_json'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'string',
    description:
      "The Algolia API key the crawler uses for indexing records.\nIf you don't provide an API key, one will be generated by the Crawler when you create a configuration.\n\nThe API key must have:\n\n- These [rights and restrictions](https://www.algolia.com/doc/guides/security/api-keys/#rights-and-restrictions): `search`, `addObject`, `deleteObject`, `deleteIndex`, `settings`, `editSettings`, `listIndexes`, `browse`\n- Access to the correct set of indices, based on the crawler's `indexPrefix`.\nFor example, if the prefix is `crawler_`, the API key must have access to `crawler_*`.\n\n**Don't use your [Admin API key](https://www.algolia.com/doc/guides/security/api-keys/#predefined-api-keys)**.\n",
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'apiKey',
      },
    },
    displayName: 'Api Key',
    name: 'apiKey_string',
    default: '',
    displayOptions: {
      show: {
        partial_config: ['apikey_string'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'string',
    description: 'Algolia application ID where the crawler creates and updates indices.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'applicationId',
      },
    },
    displayName: 'Application Id',
    name: 'applicationId_string',
    default: '',
    displayOptions: {
      show: {
        partial_config: ['applicationid_string'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Exclusion Patterns',
    name: 'exclusionPatterns_json',
    default: '[]',
    description: 'URLs to exclude from crawling.',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'exclusionPatterns',
      },
    },
    displayOptions: {
      show: {
        partial_config: ['exclusionpatterns_json'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'External Data',
    name: 'externalData_json',
    default: '[]',
    description: 'References to external data sources for enriching the extracted records.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'externalData',
      },
    },
    displayOptions: {
      show: {
        partial_config: ['externaldata_json'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Extra Urls',
    name: 'extraUrls_json',
    default: '[]',
    description:
      'The Crawler treats `extraUrls` the same as `startUrls`.\nSpecify `extraUrls` if you want to differentiate between URLs you manually added to fix site crawling from those you initially specified in `startUrls`.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'extraUrls',
      },
    },
    displayOptions: {
      show: {
        partial_config: ['extraurls_json'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'options',
    name: 'ignoreCanonicalTo',
    displayName: 'Ignore Canonical To',
    default: '',
    options: [
      {
        name: 'Boolean',
        value: 'boolean',
      },
      {
        name: 'Array',
        value: 'array',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'ignoreCanonicalTo',
        value:
          '={{ typeof $parameter.ignoreCanonicalTo_boolean !== "undefined" ? $parameter.ignoreCanonicalTo_boolean : typeof $parameter.ignoreCanonicalTo_json !== "undefined" ? JSON.parse($parameter.ignoreCanonicalTo_json) : undefined }}',
      },
    },
    displayOptions: {
      show: {
        partial_config: ['ignorecanonicalto'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'boolean',
    description:
      'Determines if the crawler should extract records from a page with a [canonical URL](https://www.algolia.com/doc/tools/crawler/getting-started/crawler-configuration/#canonical-urls-and-crawler-behavior).\n\nIf `ignoreCanonicalTo` is set to:\n\n- `true` all canonical URLs are ignored.\n- One or more URL patterns, the crawler will ignore the canonical URL if it matches a pattern.\n',
    displayName: 'Ignore Canonical To (Boolean)',
    name: 'ignoreCanonicalTo_boolean',
    default: '',
    displayOptions: {
      show: {
        ignoreCanonicalTo: ['boolean'],
        partial_config: ['ignorecanonicalto'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Ignore Canonical To (Array)',
    name: 'ignoreCanonicalTo_json',
    default: '[]',
    description: 'Canonical URLs or URL patterns to ignore.\n',
    required: false,
    displayOptions: {
      show: {
        ignoreCanonicalTo: ['array'],
        partial_config: ['ignorecanonicalto'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'boolean',
    description:
      "Determines if the crawler should follow links with a `nofollow` directive.\nIf `true`, the crawler will ignore the `nofollow` directive and crawl links on the page.\n\nThe crawler always ignores links that don't match your [configuration settings](https://www.algolia.com/doc/tools/crawler/getting-started/crawler-configuration/#exclude-and-include-content).\n`ignoreNoFollowTo` applies to:\n\n- Links that are ignored because the [`robots` meta tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name#Other_metadata_names) contains `nofollow` or `none`.\n- Links with a [`rel` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel) containing the `nofollow` directive.\n",
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'ignoreNoFollowTo',
      },
    },
    displayName: 'Ignore No Follow To',
    name: 'ignoreNoFollowTo_boolean',
    default: '',
    displayOptions: {
      show: {
        partial_config: ['ignorenofollowto_boolean'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'boolean',
    description:
      'Whether to ignore the `noindex` robots meta tag.\nIf `true`, pages with this meta tag _will_ be crawled.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'ignoreNoIndex',
      },
    },
    displayName: 'Ignore No Index',
    name: 'ignoreNoIndex_boolean',
    default: '',
    displayOptions: {
      show: {
        partial_config: ['ignorenoindex_boolean'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description:
      'Whether the crawler should follow `rel="prev"` and `rel="next"` pagination links in the `<head>` section of an HTML page.\n\n- If `true`, the crawler ignores the pagination links.\n- If `false`, the crawler follows the pagination links.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'ignorePaginationAttributes',
      },
    },
    displayName: 'Ignore Pagination Attributes',
    name: 'ignorePaginationAttributes_boolean',
    displayOptions: {
      show: {
        partial_config: ['ignorepaginationattributes_boolean'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Ignore Query Params',
    name: 'ignoreQueryParams_json',
    default: '[]',
    description:
      'Query parameters to ignore while crawling.\n\nAll URLs with the matching query parameters are treated as identical.\nThis prevents indexing URLs that just differ by their query parameters.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'ignoreQueryParams',
      },
    },
    displayOptions: {
      show: {
        partial_config: ['ignorequeryparams_json'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'boolean',
    description: 'Whether to ignore rules defined in your `robots.txt` file.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'ignoreRobotsTxtRules',
      },
    },
    displayName: 'Ignore Robots Txt Rules',
    name: 'ignoreRobotsTxtRules_boolean',
    default: '',
    displayOptions: {
      show: {
        partial_config: ['ignorerobotstxtrules_boolean'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'crawler_',
    description:
      "A prefix for all indices created by this crawler. It's combined with the `indexName` for each action to form the complete index name.",
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'indexPrefix',
      },
    },
    displayName: 'Index Prefix',
    name: 'indexPrefix_string',
    default: '',
    displayOptions: {
      show: {
        partial_config: ['indexprefix_string'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'json',
    name: 'index_settings',
    displayName: 'Index Settings',
    description: 'Index settings.',
    default: '',
    routing: {
      send: {
        type: 'body',
        property: 'initialIndexSettings',
        value: '={{ undefined }}',
      },
    },
    displayOptions: {
      show: {
        partial_config: ['index_settings'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    displayName: 'Link Extractor',
    name: 'link_extractor_object',
    type: 'multiOptions',
    description:
      'Function for extracting URLs from links on crawled pages.\n\nFor more information, see the [`linkExtractor` documentation](https://www.algolia.com/doc/tools/crawler/apis/configuration/link-extractor).\n',
    required: false,
    default: [],
    options: [
      {
        name: '  Type',
        value: '__type_options_linkExtractor',
      },
      {
        name: 'Source',
        value: 'source_string_linkExtractor',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'linkExtractor',
        value:
          '={{ { "__type": typeof $parameter.__type_options_linkExtractor !== "undefined" ? $parameter.__type_options_linkExtractor : undefined, "source": typeof $parameter.source_string_linkExtractor !== "undefined" ? $parameter.source_string_linkExtractor : undefined } }}',
      },
    },
    displayOptions: {
      show: {
        partial_config: ['link_extractor_object'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'options',
    options: [
      {
        name: 'function',
        value: 'function',
      },
    ],
    displayName: '  Type',
    name: '__type_options_linkExtractor',
    default: '',
    displayOptions: {
      show: {
        link_extractor_object: ['__type_options_linkExtractor'],
        partial_config: ['link_extractor_object'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'string',
    placeholder:
      '({ $, url, defaultExtractor }) => {\n  if (/example.com\/doc\//.test(url.href)) {\n    // For all pages under `/doc`, only extract the first found URL.\n    return defaultExtractor().slice(0, 1)\n  }\n  // For all other pages, use the default.\n  return defaultExtractor()\n}\n',
    displayName: 'Source',
    name: 'source_string_linkExtractor',
    default: '',
    displayOptions: {
      show: {
        link_extractor_object: ['source_string_linkExtractor'],
        partial_config: ['link_extractor_object'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'options',
    name: 'login',
    displayName: 'Login',
    default: '',
    options: [
      {
        name: 'HTTP request',
        value: 'http_request',
      },
      {
        name: 'Browser-based',
        value: 'browserbased',
      },
      {
        name: 'OAuth 20',
        value: 'oauth_20',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'login',
        value:
          '={{ typeof $parameter.http_request_object !== "undefined" ? { "url": typeof $parameter.url_string_login !== "undefined" ? $parameter.url_string_login : undefined, "requestOptions": { "method": typeof $parameter.method_string_requestOptions_login !== "undefined" ? $parameter.method_string_requestOptions_login : undefined, "headers": { "Accept-Language": typeof $parameter.Accept-Language_string_headers_requestOptions_login !== "undefined" ? $parameter.Accept-Language_string_headers_requestOptions_login : undefined, "Authorization": typeof $parameter.Authorization_string_headers_requestOptions_login !== "undefined" ? $parameter.Authorization_string_headers_requestOptions_login : undefined, "Cookie": typeof $parameter.Cookie_string_headers_requestOptions_login !== "undefined" ? $parameter.Cookie_string_headers_requestOptions_login : undefined }, "body": typeof $parameter.body_string_requestOptions_login !== "undefined" ? $parameter.body_string_requestOptions_login : undefined, "timeout": typeof $parameter.timeout_number_requestOptions_login !== "undefined" ? $parameter.timeout_number_requestOptions_login : undefined } } : typeof $parameter.url_string_login !== "undefined" ? $parameter.url_string_login : typeof $parameter.login_request_options_object_login !== "undefined" ? $parameter.login_request_options_object_login : typeof $parameter.method_string_requestOptions_login !== "undefined" ? $parameter.method_string_requestOptions_login : typeof $parameter.headers_object_requestOptions_login !== "undefined" ? $parameter.headers_object_requestOptions_login : typeof $parameter.Accept-Language_string_headers_requestOptions_login !== "undefined" ? $parameter.Accept-Language_string_headers_requestOptions_login : typeof $parameter.Authorization_string_headers_requestOptions_login !== "undefined" ? $parameter.Authorization_string_headers_requestOptions_login : typeof $parameter.Cookie_string_headers_requestOptions_login !== "undefined" ? $parameter.Cookie_string_headers_requestOptions_login : typeof $parameter.body_string_requestOptions_login !== "undefined" ? $parameter.body_string_requestOptions_login : typeof $parameter.timeout_number_requestOptions_login !== "undefined" ? $parameter.timeout_number_requestOptions_login : typeof $parameter.browserbased_object !== "undefined" ? { "url": typeof $parameter.url_string_login !== "undefined" ? $parameter.url_string_login : undefined, "username": typeof $parameter.username_string_login !== "undefined" ? $parameter.username_string_login : undefined, "password": typeof $parameter.password_string_login !== "undefined" ? $parameter.password_string_login : undefined, "waitTime": { "min": typeof $parameter.min_number_waitTime_login !== "undefined" ? $parameter.min_number_waitTime_login : undefined, "max": typeof $parameter.max_number_waitTime_login !== "undefined" ? $parameter.max_number_waitTime_login : undefined } } : typeof $parameter.url_string_login !== "undefined" ? $parameter.url_string_login : typeof $parameter.username_string_login !== "undefined" ? $parameter.username_string_login : typeof $parameter.password_string_login !== "undefined" ? $parameter.password_string_login : typeof $parameter.wait_time_object_login !== "undefined" ? $parameter.wait_time_object_login : typeof $parameter.min_number_waitTime_login !== "undefined" ? $parameter.min_number_waitTime_login : typeof $parameter.max_number_waitTime_login !== "undefined" ? $parameter.max_number_waitTime_login : typeof $parameter.oauth_20_object !== "undefined" ? { "accessTokenRequest": { "url": typeof $parameter.url_string_accessTokenRequest_login !== "undefined" ? $parameter.url_string_accessTokenRequest_login : undefined, "grantType": typeof $parameter.grantType_options_accessTokenRequest_login !== "undefined" ? $parameter.grantType_options_accessTokenRequest_login : undefined, "clientId": typeof $parameter.clientId_string_accessTokenRequest_login !== "undefined" ? $parameter.clientId_string_accessTokenRequest_login : undefined, "clientSecret": typeof $parameter.clientSecret_string_accessTokenRequest_login !== "undefined" ? $parameter.clientSecret_string_accessTokenRequest_login : undefined, "scope": typeof $parameter.scope_string_accessTokenRequest_login !== "undefined" ? $parameter.scope_string_accessTokenRequest_login : undefined, "extraParameters": { "resource": typeof $parameter.resource_string_extraParameters_accessTokenRequest_login !== "undefined" ? $parameter.resource_string_extraParameters_accessTokenRequest_login : undefined } } } : typeof $parameter.access_token_request_object_login !== "undefined" ? $parameter.access_token_request_object_login : typeof $parameter.url_string_accessTokenRequest_login !== "undefined" ? $parameter.url_string_accessTokenRequest_login : typeof $parameter.grantType_options_accessTokenRequest_login !== "undefined" ? $parameter.grantType_options_accessTokenRequest_login : typeof $parameter.clientId_string_accessTokenRequest_login !== "undefined" ? $parameter.clientId_string_accessTokenRequest_login : typeof $parameter.clientSecret_string_accessTokenRequest_login !== "undefined" ? $parameter.clientSecret_string_accessTokenRequest_login : typeof $parameter.scope_string_accessTokenRequest_login !== "undefined" ? $parameter.scope_string_accessTokenRequest_login : typeof $parameter.extra_parameters_object_accessTokenRequest_login !== "undefined" ? $parameter.extra_parameters_object_accessTokenRequest_login : typeof $parameter.resource_string_extraParameters_accessTokenRequest_login !== "undefined" ? $parameter.resource_string_extraParameters_accessTokenRequest_login : undefined }}',
      },
    },
    displayOptions: {
      show: {
        partial_config: ['login'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    displayName: 'HTTP Request',
    name: 'http_request_object',
    type: 'multiOptions',
    description: 'Information for making a HTTP request for authorization.',
    required: true,
    default: [],
    options: [
      {
        name: 'Url',
        value: 'url_string_login',
      },
      {
        name: 'Login Request Options',
        value: 'login_request_options_object_login',
      },
    ],
    displayOptions: {
      show: {
        login: ['http_request'],
        partial_config: ['login'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'https://example.com/login',
    description: 'URL with your login form.',
    displayName: 'Url',
    name: 'url_string_login',
    default: '',
    displayOptions: {
      show: {
        http_request_object: ['url_string_login'],
        login: ['http_request'],
        partial_config: ['login'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    displayName: 'Login Request Options',
    name: 'login_request_options_object_login',
    type: 'multiOptions',
    description: 'Options for the HTTP request for logging in.',
    required: false,
    default: [],
    options: [
      {
        name: 'Method',
        value: 'method_string_requestOptions',
      },
      {
        name: 'Headers',
        value: 'headers_object_requestOptions',
      },
      {
        name: 'Body',
        value: 'body_string_requestOptions',
      },
      {
        name: 'Timeout',
        value: 'timeout_number_requestOptions',
      },
    ],
    displayOptions: {
      show: {
        http_request_object: ['login_request_options_object_login'],
        login: ['http_request'],
        partial_config: ['login'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'POST',
    default: 'GET',
    description: 'HTTP method for sending the request.',
    displayName: 'Method',
    name: 'method_string_requestOptions_login',
    displayOptions: {
      show: {
        http_request_object: ['login_request_options_object_login'],
        login_request_options_object_login: ['method_string_requestOptions'],
        login: ['http_request'],
        partial_config: ['login'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    displayName: 'Headers',
    name: 'headers_object_requestOptions_login',
    type: 'multiOptions',
    description: 'Headers to add to all requests.',
    required: false,
    default: [],
    options: [
      {
        name: 'Accept-Language',
        value: 'Accept-Language_string_headers',
      },
      {
        name: 'Authorization',
        value: 'Authorization_string_headers',
      },
      {
        name: 'Cookie',
        value: 'Cookie_string_headers',
      },
    ],
    displayOptions: {
      show: {
        http_request_object: ['login_request_options_object_login'],
        login_request_options_object_login: ['headers_object_requestOptions'],
        login: ['http_request'],
        partial_config: ['login'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'fr-FR',
    description: 'Preferred natural language and locale.',
    displayName: 'Accept-Language',
    name: 'Accept-Language_string_headers_requestOptions_login',
    default: '',
    displayOptions: {
      show: {
        http_request_object: ['login_request_options_object_login'],
        login_request_options_object_login: ['headers_object_requestOptions'],
        headers_object_requestOptions_login: ['Accept-Language_string_headers'],
        login: ['http_request'],
        partial_config: ['login'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'Bearer Aerehdf==',
    description: 'Basic authentication header.',
    displayName: 'Authorization',
    name: 'Authorization_string_headers_requestOptions_login',
    default: '',
    displayOptions: {
      show: {
        http_request_object: ['login_request_options_object_login'],
        login_request_options_object_login: ['headers_object_requestOptions'],
        headers_object_requestOptions_login: ['Authorization_string_headers'],
        login: ['http_request'],
        partial_config: ['login'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'session=1234',
    description: 'Cookie. The header will be replaced by the cookie retrieved when logging in.',
    displayName: 'Cookie',
    name: 'Cookie_string_headers_requestOptions_login',
    default: '',
    displayOptions: {
      show: {
        http_request_object: ['login_request_options_object_login'],
        login_request_options_object_login: ['headers_object_requestOptions'],
        headers_object_requestOptions_login: ['Cookie_string_headers'],
        login: ['http_request'],
        partial_config: ['login'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'id=user&password=s3cr3t',
    description: 'Form content.',
    displayName: 'Body',
    name: 'body_string_requestOptions_login',
    default: '',
    displayOptions: {
      show: {
        http_request_object: ['login_request_options_object_login'],
        login_request_options_object_login: ['body_string_requestOptions'],
        login: ['http_request'],
        partial_config: ['login'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'number',
    description: 'Timeout for the request.',
    displayName: 'Timeout',
    name: 'timeout_number_requestOptions_login',
    default: '',
    displayOptions: {
      show: {
        http_request_object: ['login_request_options_object_login'],
        login_request_options_object_login: ['timeout_number_requestOptions'],
        login: ['http_request'],
        partial_config: ['login'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    displayName: 'Browser-Based',
    name: 'browserbased_object',
    type: 'multiOptions',
    description:
      'Information for using a web browser for authorization.\nThe browser loads a login page and enters the provided credentials.\n',
    required: true,
    default: [],
    options: [
      {
        name: 'Url',
        value: 'url_string_login',
      },
      {
        name: 'Username',
        value: 'username_string_login',
      },
      {
        name: 'Password',
        value: 'password_string_login',
      },
      {
        name: 'Wait Time',
        value: 'wait_time_object_login',
      },
    ],
    displayOptions: {
      show: {
        login: ['browserbased'],
        partial_config: ['login'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'https://example.com/login',
    description:
      'URL of your login page.\n\nThe crawler looks for an input matching the selector `input[type=text]` or `input[type=email]` for the username and `input[type=password]` for the password.\n',
    displayName: 'Url',
    name: 'url_string_login',
    default: '',
    displayOptions: {
      show: {
        browserbased_object: ['url_string_login'],
        login: ['browserbased'],
        partial_config: ['login'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'crawler',
    description: 'Username for signing in.',
    displayName: 'Username',
    name: 'username_string_login',
    default: '',
    displayOptions: {
      show: {
        browserbased_object: ['username_string_login'],
        login: ['browserbased'],
        partial_config: ['login'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 's3cr3t',
    description: 'Password for signing in.',
    displayName: 'Password',
    name: 'password_string_login',
    default: '',
    displayOptions: {
      show: {
        browserbased_object: ['password_string_login'],
        login: ['browserbased'],
        partial_config: ['login'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    displayName: 'Wait Time',
    name: 'wait_time_object_login',
    type: 'multiOptions',
    description: 'Timeout for the HTTP request.',
    required: false,
    default: [],
    options: [
      {
        name: 'Min',
        value: 'min_number_waitTime',
      },
      {
        name: 'Max',
        value: 'max_number_waitTime',
      },
    ],
    displayOptions: {
      show: {
        browserbased_object: ['wait_time_object_login'],
        login: ['browserbased'],
        partial_config: ['login'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '7000',
    description: 'Minimum waiting time in milliseconds.',
    displayName: 'Min',
    name: 'min_number_waitTime_login',
    default: 0,
    displayOptions: {
      show: {
        browserbased_object: ['wait_time_object_login'],
        wait_time_object_login: ['min_number_waitTime'],
        login: ['browserbased'],
        partial_config: ['login'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '15000',
    default: 20000,
    description: 'Maximum waiting time in milliseconds.',
    displayName: 'Max',
    name: 'max_number_waitTime_login',
    displayOptions: {
      show: {
        browserbased_object: ['wait_time_object_login'],
        wait_time_object_login: ['max_number_waitTime'],
        login: ['browserbased'],
        partial_config: ['login'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    displayName: 'OAuth 20',
    name: 'oauth_20_object',
    type: 'multiOptions',
    description:
      'Authorization information for using the [OAuth 2.0 client credentials](https://datatracker.ietf.org/doc/html/rfc6749#section-4.4) authorization grant.\n\nOAuth authorization is supported for [Azure Active Directory version 1](https://learn.microsoft.com/en-us/previous-versions/azure/active-directory/azuread-dev/v1-oauth2-client-creds-grant-flow) as provider.\n',
    required: true,
    default: [],
    options: [
      {
        name: 'Access Token Request',
        value: 'access_token_request_object_login',
      },
    ],
    displayOptions: {
      show: {
        login: ['oauth_20'],
        partial_config: ['login'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    displayName: 'Access Token Request',
    name: 'access_token_request_object_login',
    type: 'multiOptions',
    description:
      'Parameters required to make the [access token request](https://datatracker.ietf.org/doc/html/rfc6749#section-4.4.2).\n',
    required: true,
    default: [],
    options: [
      {
        name: 'Url',
        value: 'url_string_accessTokenRequest',
      },
      {
        name: 'Grant Type',
        value: 'grantType_options_accessTokenRequest',
      },
      {
        name: 'Client Id',
        value: 'clientId_string_accessTokenRequest',
      },
      {
        name: 'Client Secret',
        value: 'clientSecret_string_accessTokenRequest',
      },
      {
        name: 'Scope',
        value: 'scope_string_accessTokenRequest',
      },
      {
        name: 'Extra Parameters',
        value: 'extra_parameters_object_accessTokenRequest',
      },
    ],
    displayOptions: {
      show: {
        oauth_20_object: ['access_token_request_object_login'],
        login: ['oauth_20'],
        partial_config: ['login'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'string',
    description: 'URL for the access token endpoint.',
    displayName: 'Url',
    name: 'url_string_accessTokenRequest_login',
    default: '',
    displayOptions: {
      show: {
        oauth_20_object: ['access_token_request_object_login'],
        access_token_request_object_login: ['url_string_accessTokenRequest'],
        login: ['oauth_20'],
        partial_config: ['login'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'options',
    description: 'OAuth 2.0 grant type.',
    options: [
      {
        name: 'client_credentials',
        value: 'client_credentials',
      },
    ],
    displayName: 'Grant Type',
    name: 'grantType_options_accessTokenRequest_login',
    default: '',
    displayOptions: {
      show: {
        oauth_20_object: ['access_token_request_object_login'],
        access_token_request_object_login: ['grantType_options_accessTokenRequest'],
        login: ['oauth_20'],
        partial_config: ['login'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'string',
    description:
      '[Client identifier](https://datatracker.ietf.org/doc/html/rfc6749#section-2.2).\n',
    displayName: 'Client Id',
    name: 'clientId_string_accessTokenRequest_login',
    default: '',
    displayOptions: {
      show: {
        oauth_20_object: ['access_token_request_object_login'],
        access_token_request_object_login: ['clientId_string_accessTokenRequest'],
        login: ['oauth_20'],
        partial_config: ['login'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'string',
    description: 'Client secret.',
    displayName: 'Client Secret',
    name: 'clientSecret_string_accessTokenRequest_login',
    default: '',
    displayOptions: {
      show: {
        oauth_20_object: ['access_token_request_object_login'],
        access_token_request_object_login: ['clientSecret_string_accessTokenRequest'],
        login: ['oauth_20'],
        partial_config: ['login'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'string',
    description:
      '[Access token scope](https://datatracker.ietf.org/doc/html/rfc6749#section-3.3).\n',
    displayName: 'Scope',
    name: 'scope_string_accessTokenRequest_login',
    default: '',
    displayOptions: {
      show: {
        oauth_20_object: ['access_token_request_object_login'],
        access_token_request_object_login: ['scope_string_accessTokenRequest'],
        login: ['oauth_20'],
        partial_config: ['login'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    displayName: 'Extra Parameters',
    name: 'extra_parameters_object_accessTokenRequest_login',
    type: 'multiOptions',
    description: 'Extra parameters for the authorization request.',
    required: false,
    default: [],
    options: [
      {
        name: 'Resource',
        value: 'resource_string_extraParameters',
      },
    ],
    displayOptions: {
      show: {
        oauth_20_object: ['access_token_request_object_login'],
        access_token_request_object_login: ['extra_parameters_object_accessTokenRequest'],
        login: ['oauth_20'],
        partial_config: ['login'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'string',
    description:
      'App ID URI of the receiving web service.\n\nFor more information, see [Azure Active Directory](https://learn.microsoft.com/en-us/previous-versions/azure/active-directory/azuread-dev/v1-oauth2-client-creds-grant-flow#first-case-access-token-request-with-a-shared-secret).\n',
    displayName: 'Resource',
    name: 'resource_string_extraParameters_accessTokenRequest_login',
    default: '',
    displayOptions: {
      show: {
        oauth_20_object: ['access_token_request_object_login'],
        access_token_request_object_login: ['extra_parameters_object_accessTokenRequest'],
        extra_parameters_object_accessTokenRequest_login: ['resource_string_extraParameters'],
        login: ['oauth_20'],
        partial_config: ['login'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '5',
    description:
      "Determines the maximum path depth of crawled URLs.\n\nPath depth is calculated based on the number of slash characters (`/`) after the domain (starting at 1).\nFor example:\n\n- **1** `http://example.com`\n- **1** `http://example.com/`\n- **1** `http://example.com/foo`\n- **2** `http://example.com/foo/`\n- **2** `http://example.com/foo/bar`\n- **3** `http://example.com/foo/bar/`\n\n**URLs added with `startUrls` and `sitemaps` aren't checked for `maxDepth`.**.\n",
    typeOptions: {
      minValue: 1,
      maxValue: 100,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'maxDepth',
      },
    },
    displayName: 'Max Depth',
    name: 'maxDepth_number',
    default: '',
    displayOptions: {
      show: {
        partial_config: ['maxdepth_number'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '250',
    description:
      'Limits the number of URLs your crawler processes.\n\nChange it to a low value, such as 100, for quick crawling tests.\nChange it to a higher explicit value for full crawls to prevent it from getting "lost" in complex site structures.\nBecause the Crawler works on many pages simultaneously, `maxUrls` doesn\'t guarantee finding the same pages each time it runs.\n',
    typeOptions: {
      minValue: 1,
      maxValue: 15000000,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'maxUrls',
      },
    },
    displayName: 'Max Urls',
    name: 'maxUrls_number',
    default: '',
    displayOptions: {
      show: {
        partial_config: ['maxurls_number'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '4',
    description:
      "Determines the number of concurrent tasks per second that can run for this configuration.\n\nA higher rate limit means more crawls per second.\nAlgolia prevents system overload by ensuring the number of URLs added in the last second and the number of URLs being processed is less than the rate limit:\n\n\n```\nmax(new_urls_added, active_urls_processing) <= rateLimit\n```\n\nStart with a low value (for example, 2) and increase it if you need faster crawling.\nBe aware that a high `rateLimit` can have a huge impact on bandwidth cost and server resource consumption.\n\nThe number of pages processed per second depends on the average time it takes to fetch, process, and upload a URL. \nFor a given `rateLimit` if fetching, processing, and uploading URLs takes (on average):\n\n- Less than a second, your crawler processes up to `rateLimit` pages per second.\n- Four seconds, your crawler processes up to `rateLimit / 4` pages per second.\n\nIn the latter case, increasing `rateLimit` improves performance, up to a point. \nHowever, if the processing time remains at four seconds, increasing `rateLimit` won't increase the number of pages processed per second.\n",
    typeOptions: {
      minValue: 1,
      maxValue: 100,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'rateLimit',
      },
    },
    displayName: 'Rate Limit',
    name: 'rateLimit_number',
    default: '',
    displayOptions: {
      show: {
        partial_config: ['ratelimit_number'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'options',
    name: 'renderJavaScript',
    displayName: 'Render Java Script',
    default: '',
    options: [
      {
        name: 'Boolean',
        value: 'boolean',
      },
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'HeadlessBrowserConfig',
        value: 'headlessbrowserconfig',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'renderJavaScript',
        value:
          '={{ typeof $parameter.renderJavaScript_boolean !== "undefined" ? $parameter.renderJavaScript_boolean : typeof $parameter.renderJavaScript_json !== "undefined" ? JSON.parse($parameter.renderJavaScript_json) : typeof $parameter.headless_browser_config_object !== "undefined" ? { "enabled": typeof $parameter.enabled_boolean_renderJavaScript !== "undefined" ? $parameter.enabled_boolean_renderJavaScript : undefined, "patterns": typeof $parameter.patterns_json_renderJavaScript !== "undefined" ? JSON.parse($parameter.patterns_json_renderJavaScript) : undefined, "adBlock": typeof $parameter.adBlock_boolean_renderJavaScript !== "undefined" ? $parameter.adBlock_boolean_renderJavaScript : undefined, "waitTime": { "min": typeof $parameter.min_number_waitTime_renderJavaScript !== "undefined" ? $parameter.min_number_waitTime_renderJavaScript : undefined, "max": typeof $parameter.max_number_waitTime_renderJavaScript !== "undefined" ? $parameter.max_number_waitTime_renderJavaScript : undefined } } : typeof $parameter.enabled_boolean_renderJavaScript !== "undefined" ? $parameter.enabled_boolean_renderJavaScript : typeof $parameter.patterns_json_renderJavaScript !== "undefined" ? JSON.parse($parameter.patterns_json_renderJavaScript) : typeof $parameter.adBlock_boolean_renderJavaScript !== "undefined" ? $parameter.adBlock_boolean_renderJavaScript : typeof $parameter.wait_time_object_renderJavaScript !== "undefined" ? $parameter.wait_time_object_renderJavaScript : typeof $parameter.min_number_waitTime_renderJavaScript !== "undefined" ? $parameter.min_number_waitTime_renderJavaScript : typeof $parameter.max_number_waitTime_renderJavaScript !== "undefined" ? $parameter.max_number_waitTime_renderJavaScript : undefined }}',
      },
    },
    displayOptions: {
      show: {
        partial_config: ['renderjavascript'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'boolean',
    description: 'Whether to render all pages.',
    displayName: 'Render Java Script (Boolean)',
    name: 'renderJavaScript_boolean',
    default: '',
    displayOptions: {
      show: {
        renderJavaScript: ['boolean'],
        partial_config: ['renderjavascript'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Render Java Script (Array)',
    name: 'renderJavaScript_json',
    default: '[]',
    description: 'URLs or URL patterns to render.',
    required: false,
    displayOptions: {
      show: {
        renderJavaScript: ['array'],
        partial_config: ['renderjavascript'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    displayName: 'Headless Browser Config',
    name: 'headless_browser_config_object',
    type: 'multiOptions',
    description: 'Configuration for rendering HTML.',
    required: true,
    default: [],
    options: [
      {
        name: 'Enabled',
        value: 'enabled_boolean_renderJavaScript',
      },
      {
        name: 'Patterns',
        value: 'patterns_json_renderJavaScript',
      },
      {
        name: 'Ad Block',
        value: 'adBlock_boolean_renderJavaScript',
      },
      {
        name: 'Wait Time',
        value: 'wait_time_object_renderJavaScript',
      },
    ],
    displayOptions: {
      show: {
        renderJavaScript: ['headlessbrowserconfig'],
        partial_config: ['renderjavascript'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'boolean',
    placeholder: 'true',
    description: 'Whether to enable JavaScript rendering.',
    displayName: 'Enabled',
    name: 'enabled_boolean_renderJavaScript',
    default: '',
    displayOptions: {
      show: {
        headless_browser_config_object: ['enabled_boolean_renderJavaScript'],
        renderJavaScript: ['headlessbrowserconfig'],
        partial_config: ['renderjavascript'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Patterns',
    name: 'patterns_json_renderJavaScript',
    default: '[]',
    description: 'URLs or URL patterns to render.',
    required: false,
    displayOptions: {
      show: {
        headless_browser_config_object: ['patterns_json_renderJavaScript'],
        renderJavaScript: ['headlessbrowserconfig'],
        partial_config: ['renderjavascript'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'boolean',
    description:
      "Whether to use the Crawler's ad blocker.\nIt blocks most ads and tracking scripts but can break some sites.\n",
    displayName: 'Ad Block',
    name: 'adBlock_boolean_renderJavaScript',
    default: false,
    displayOptions: {
      show: {
        headless_browser_config_object: ['adBlock_boolean_renderJavaScript'],
        renderJavaScript: ['headlessbrowserconfig'],
        partial_config: ['renderjavascript'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    displayName: 'Wait Time',
    name: 'wait_time_object_renderJavaScript',
    type: 'multiOptions',
    description: 'Timeout for the HTTP request.',
    required: false,
    default: [],
    options: [
      {
        name: 'Min',
        value: 'min_number_waitTime',
      },
      {
        name: 'Max',
        value: 'max_number_waitTime',
      },
    ],
    displayOptions: {
      show: {
        headless_browser_config_object: ['wait_time_object_renderJavaScript'],
        renderJavaScript: ['headlessbrowserconfig'],
        partial_config: ['renderjavascript'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '7000',
    description: 'Minimum waiting time in milliseconds.',
    displayName: 'Min',
    name: 'min_number_waitTime_renderJavaScript',
    default: 0,
    displayOptions: {
      show: {
        headless_browser_config_object: ['wait_time_object_renderJavaScript'],
        wait_time_object_renderJavaScript: ['min_number_waitTime'],
        renderJavaScript: ['headlessbrowserconfig'],
        partial_config: ['renderjavascript'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '15000',
    default: 20000,
    description: 'Maximum waiting time in milliseconds.',
    displayName: 'Max',
    name: 'max_number_waitTime_renderJavaScript',
    displayOptions: {
      show: {
        headless_browser_config_object: ['wait_time_object_renderJavaScript'],
        wait_time_object_renderJavaScript: ['max_number_waitTime'],
        renderJavaScript: ['headlessbrowserconfig'],
        partial_config: ['renderjavascript'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    displayName: 'Request Options',
    name: 'request_options_object',
    type: 'multiOptions',
    description: 'Lets you add options to HTTP requests made by the crawler.',
    required: false,
    default: [],
    options: [
      {
        name: 'Proxy',
        value: 'proxy_string_requestOptions',
      },
      {
        name: 'Timeout',
        value: 'timeout_number_requestOptions',
      },
      {
        name: 'Retries',
        value: 'retries_number_requestOptions',
      },
      {
        name: 'Headers',
        value: 'headers_object_requestOptions',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'requestOptions',
        value:
          '={{ { "proxy": typeof $parameter.proxy_string_requestOptions !== "undefined" ? $parameter.proxy_string_requestOptions : undefined, "timeout": typeof $parameter.timeout_number_requestOptions !== "undefined" ? $parameter.timeout_number_requestOptions : undefined, "retries": typeof $parameter.retries_number_requestOptions !== "undefined" ? $parameter.retries_number_requestOptions : undefined, "headers": { "Accept-Language": typeof $parameter.Accept-Language_string_headers_requestOptions !== "undefined" ? $parameter.Accept-Language_string_headers_requestOptions : undefined, "Authorization": typeof $parameter.Authorization_string_headers_requestOptions !== "undefined" ? $parameter.Authorization_string_headers_requestOptions : undefined, "Cookie": typeof $parameter.Cookie_string_headers_requestOptions !== "undefined" ? $parameter.Cookie_string_headers_requestOptions : undefined } } }}',
      },
    },
    displayOptions: {
      show: {
        partial_config: ['request_options_object'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'string',
    description: 'Proxy for all crawler requests.',
    displayName: 'Proxy',
    name: 'proxy_string_requestOptions',
    default: '',
    displayOptions: {
      show: {
        request_options_object: ['proxy_string_requestOptions'],
        partial_config: ['request_options_object'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'number',
    default: 30000,
    description: 'Timeout in milliseconds for the crawl.',
    displayName: 'Timeout',
    name: 'timeout_number_requestOptions',
    displayOptions: {
      show: {
        request_options_object: ['timeout_number_requestOptions'],
        partial_config: ['request_options_object'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'number',
    default: 3,
    description: 'Maximum number of retries to crawl one URL.',
    displayName: 'Retries',
    name: 'retries_number_requestOptions',
    displayOptions: {
      show: {
        request_options_object: ['retries_number_requestOptions'],
        partial_config: ['request_options_object'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    displayName: 'Headers',
    name: 'headers_object_requestOptions',
    type: 'multiOptions',
    description: 'Headers to add to all requests.',
    required: false,
    default: [],
    options: [
      {
        name: 'Accept-Language',
        value: 'Accept-Language_string_headers',
      },
      {
        name: 'Authorization',
        value: 'Authorization_string_headers',
      },
      {
        name: 'Cookie',
        value: 'Cookie_string_headers',
      },
    ],
    displayOptions: {
      show: {
        request_options_object: ['headers_object_requestOptions'],
        partial_config: ['request_options_object'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'fr-FR',
    description: 'Preferred natural language and locale.',
    displayName: 'Accept-Language',
    name: 'Accept-Language_string_headers_requestOptions',
    default: '',
    displayOptions: {
      show: {
        request_options_object: ['headers_object_requestOptions'],
        headers_object_requestOptions: ['Accept-Language_string_headers'],
        partial_config: ['request_options_object'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'Bearer Aerehdf==',
    description: 'Basic authentication header.',
    displayName: 'Authorization',
    name: 'Authorization_string_headers_requestOptions',
    default: '',
    displayOptions: {
      show: {
        request_options_object: ['headers_object_requestOptions'],
        headers_object_requestOptions: ['Authorization_string_headers'],
        partial_config: ['request_options_object'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'session=1234',
    description: 'Cookie. The header will be replaced by the cookie retrieved when logging in.',
    displayName: 'Cookie',
    name: 'Cookie_string_headers_requestOptions',
    default: '',
    displayOptions: {
      show: {
        request_options_object: ['headers_object_requestOptions'],
        headers_object_requestOptions: ['Cookie_string_headers'],
        partial_config: ['request_options_object'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    displayName: 'Safety Checks',
    name: 'safety_checks_object',
    type: 'multiOptions',
    description:
      'Checks to ensure the crawl was successful.\n\nFor more information, see the [Safety checks](https://www.algolia.com/doc/tools/crawler/getting-started/crawler-configuration/#safety-checks) documentation.\n',
    required: false,
    default: [],
    options: [
      {
        name: 'Before Index Publishing',
        value: 'before_index_publishing_object_safetyChecks',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'safetyChecks',
        value:
          '={{ { "beforeIndexPublishing": { "maxLostRecordsPercentage": typeof $parameter.maxLostRecordsPercentage_number_beforeIndexPublishing_safetyChecks !== "undefined" ? $parameter.maxLostRecordsPercentage_number_beforeIndexPublishing_safetyChecks : undefined, "maxFailedUrls": typeof $parameter.maxFailedUrls_number_beforeIndexPublishing_safetyChecks !== "undefined" ? $parameter.maxFailedUrls_number_beforeIndexPublishing_safetyChecks : undefined } } }}',
      },
    },
    displayOptions: {
      show: {
        partial_config: ['safety_checks_object'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    displayName: 'Before Index Publishing',
    name: 'before_index_publishing_object_safetyChecks',
    type: 'multiOptions',
    description:
      'Checks triggered after the crawl finishes but before the records are added to the Algolia index.',
    required: false,
    default: [],
    options: [
      {
        name: 'Max Lost Records Percentage',
        value: 'maxLostRecordsPercentage_number_beforeIndexPublishing',
      },
      {
        name: 'Max Failed Urls',
        value: 'maxFailedUrls_number_beforeIndexPublishing',
      },
    ],
    displayOptions: {
      show: {
        safety_checks_object: ['before_index_publishing_object_safetyChecks'],
        partial_config: ['safety_checks_object'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'number',
    default: 10,
    description: 'Maximum difference in percent between the numbers of records between crawls.',
    typeOptions: {
      minValue: 1,
      maxValue: 100,
    },
    displayName: 'Max Lost Records Percentage',
    name: 'maxLostRecordsPercentage_number_beforeIndexPublishing_safetyChecks',
    displayOptions: {
      show: {
        safety_checks_object: ['before_index_publishing_object_safetyChecks'],
        before_index_publishing_object_safetyChecks: [
          'maxLostRecordsPercentage_number_beforeIndexPublishing',
        ],
        partial_config: ['safety_checks_object'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'number',
    description: 'Stops the crawler if a specified number of pages fail to crawl.',
    displayName: 'Max Failed Urls',
    name: 'maxFailedUrls_number_beforeIndexPublishing_safetyChecks',
    default: '',
    displayOptions: {
      show: {
        safety_checks_object: ['before_index_publishing_object_safetyChecks'],
        before_index_publishing_object_safetyChecks: ['maxFailedUrls_number_beforeIndexPublishing'],
        partial_config: ['safety_checks_object'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'boolean',
    description:
      'Whether to back up your index before the crawler overwrites it with new records.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'saveBackup',
      },
    },
    displayName: 'Save Backup',
    name: 'saveBackup_boolean',
    default: '',
    displayOptions: {
      show: {
        partial_config: ['savebackup_boolean'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'every weekday at 12:00 pm',
    description:
      'Schedule for running the crawl.\n\nInstead of manually starting a crawl each time, you can set up a schedule for automatic crawls.\n[Use the visual UI](https://www.algolia.com/doc/tools/crawler/getting-started/crawler-configuration-visual) or add the `schedule` parameter to [your configuration](https://www.algolia.com/doc/tools/crawler/getting-started/crawler-configuration).\n\n`schedule` uses [Later.js syntax](https://bunkat.github.io/later) to specify when to crawl your site.\nHere are some key things to keep in mind when using `Later.js` syntax with the Crawler:\n\n- The interval between two scheduled crawls must be at least 24 hours.\n- To crawl daily, use "every 1 day" instead of "everyday" or "every day".\n- If you don\'t specify a time, the crawl can happen any time during the scheduled day.\n- Specify times for the UTC (GMT+0) timezone\n- Include minutes when specifying a time. For example, "at 3:00 pm" instead of "at 3pm".\n- Use "at 12:00 am" to specify midnight, not "at 00:00 am".\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'schedule',
      },
    },
    displayName: 'Schedule',
    name: 'schedule_string',
    default: '',
    displayOptions: {
      show: {
        partial_config: ['schedule_string'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Sitemaps',
    name: 'sitemaps_json',
    default: '[]',
    description: 'Sitemaps with URLs from where to start crawling.',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'sitemaps',
      },
    },
    displayOptions: {
      show: {
        partial_config: ['sitemaps_json'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Start Urls',
    name: 'startUrls_json',
    default: '[]',
    description: 'URLs from where to start crawling.',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'startUrls',
      },
    },
    displayOptions: {
      show: {
        partial_config: ['starturls_json'],
        resource: ['config'],
        operation: ['patchConfig'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'e0f6db8a-24f5-4092-83a4-1b2c6cb6d809',
    description: 'Universally unique identifier (UUID) of the crawler.',
    displayName: 'Id',
    name: 'id_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['config'],
        operation: ['listConfigVersions'],
      },
    },
  },
  {
    type: 'number',
    default: 20,
    description: 'Number of items per page of the paginated API response.',
    typeOptions: {
      minValue: 1,
      maxValue: 100,
    },
    routing: {
      request: {
        qs: {
          itemsPerPage: '={{ $value }}',
        },
      },
    },
    displayName: 'Items Per Page',
    name: 'itemsPerPage_number',
    displayOptions: {
      show: {
        resource: ['config'],
        operation: ['listConfigVersions'],
      },
    },
  },
  {
    type: 'number',
    default: 1,
    description: 'Current page of the paginated API response.',
    typeOptions: {
      minValue: 1,
      maxValue: 100,
    },
    routing: {
      request: {
        qs: {
          page: '={{ $value }}',
        },
      },
    },
    displayName: 'Page',
    name: 'page_number',
    displayOptions: {
      show: {
        resource: ['config'],
        operation: ['listConfigVersions'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'e0f6db8a-24f5-4092-83a4-1b2c6cb6d809',
    description: 'Universally unique identifier (UUID) of the crawler.',
    displayName: 'Id',
    name: 'id_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['config'],
        operation: ['getConfigVersion'],
      },
    },
  },
  {
    type: 'number',
    displayName: 'Version',
    name: 'version_number',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['config'],
        operation: ['getConfigVersion'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'e0f6db8a-24f5-4092-83a4-1b2c6cb6d809',
    description: 'Universally unique identifier (UUID) of the crawler.',
    displayName: 'Id',
    name: 'id_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['getTaskStatus'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '98458796-b7bb-4703-8b1b-785c1080b110',
    description: 'Universally unique identifier (UUID) of the task.',
    displayName: 'Task ID',
    name: 'taskID_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['getTaskStatus'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'e0f6db8a-24f5-4092-83a4-1b2c6cb6d809',
    description: 'Universally unique identifier (UUID) of the crawler.',
    displayName: 'Id',
    name: 'id_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['cancelBlockingAction'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '98458796-b7bb-4703-8b1b-785c1080b110',
    description: 'Universally unique identifier (UUID) of the task.',
    displayName: 'Task ID',
    name: 'taskID_string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['cancelBlockingAction'],
      },
    },
  },
  {
    type: 'number',
    default: 20,
    description: 'Number of items per page of the paginated API response.',
    typeOptions: {
      minValue: 1,
      maxValue: 100,
    },
    routing: {
      request: {
        qs: {
          itemsPerPage: '={{ $value }}',
        },
      },
    },
    displayName: 'Items Per Page',
    name: 'itemsPerPage_number',
    displayOptions: {
      show: {
        resource: ['domains'],
        operation: ['listDomains'],
      },
    },
  },
  {
    type: 'number',
    default: 1,
    description: 'Current page of the paginated API response.',
    typeOptions: {
      minValue: 1,
      maxValue: 100,
    },
    routing: {
      request: {
        qs: {
          page: '={{ $value }}',
        },
      },
    },
    displayName: 'Page',
    name: 'page_number',
    displayOptions: {
      show: {
        resource: ['domains'],
        operation: ['listDomains'],
      },
    },
  },
  {
    type: 'string',
    description: 'Algolia application ID where the crawler creates and updates indices.\n',
    routing: {
      request: {
        qs: {
          appID: '={{ $value }}',
        },
      },
    },
    displayName: 'App ID',
    name: 'appID_string',
    default: '',
    displayOptions: {
      show: {
        resource: ['domains'],
        operation: ['listDomains'],
      },
    },
  },
];

export default properties;
