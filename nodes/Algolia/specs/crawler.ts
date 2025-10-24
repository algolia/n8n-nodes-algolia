import { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = [
  {
    "displayName": 'Resource',
    "name": 'resource',
    "type": 'options',
    "default": '',
    "description": 'Select the resource to work with',
    "options": [
      {
        "name": 'actions',
        "value": 'actions',
        "description": 'Change the state of crawlers, such as pausing crawl schedules or testing the crawler with specific URLs'
      },
      {
        "name": 'config',
        "value": 'config',
        "description": 'In the Crawler configuration, you specify which URLs to crawl, when to crawl, how to extract records from the crawl, and where to index the extracted records'
      },
      {
        "name": 'crawlers',
        "value": 'crawlers',
        "description": 'A crawler is an object with a name and a configuration'
      },
      {
        "name": 'domains',
        "value": 'domains',
        "description": 'List registered domains'
      },
      {
        "name": 'tasks',
        "value": 'tasks',
        "description": 'Task operations'
      }
    ]
  },
  {
    "displayName": 'Operation',
    "name": 'operation',
    "type": 'options',
    "default": '',
    "description": 'Select the operation to work with',
    "options": [
      {
        "name": 'List crawlers',
        "value": 'listCrawlers',
        "action": 'List crawlers',
        "description": 'Lists all your crawlers.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/1/crawlers'
          }
        }
      },
      {
        "name": 'Create a crawler',
        "value": 'createCrawler',
        "action": 'Create a crawler',
        "description": 'Creates a new crawler with the provided configuration.',
        "routing": {
          "request": {
            "method": 'POST',
            "url": '=/1/crawlers'
          }
        }
      },
      {
        "name": 'Retrieve crawler details',
        "value": 'getCrawler',
        "action": 'Retrieve crawler details',
        "description": 'Retrieves details about the specified crawler, optionally with its configuration.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/1/crawlers/{{ $parameter.id_string }}'
          }
        }
      },
      {
        "name": 'Replace crawler configuration',
        "value": 'patchCrawler',
        "action": 'Replace crawler configuration',
        "description": 'Replaces the crawler configuration with a new one.',
        "routing": {
          "request": {
            "method": 'PATCH',
            "url": '=/1/crawlers/{{ $parameter.id_string }}'
          }
        }
      },
      {
        "name": 'Delete a crawler',
        "value": 'deleteCrawler',
        "action": 'Delete a crawler',
        "description": 'Delete the specified crawler.',
        "routing": {
          "request": {
            "method": 'DELETE',
            "url": '=/1/crawlers/{{ $parameter.id_string }}'
          }
        }
      },
      {
        "name": 'Retrieve crawler stats',
        "value": 'getStats',
        "action": 'Retrieve crawler stats',
        "description": 'Retrieves information about the number of crawled, skipped, and failed URLs.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/1/crawlers/{{ $parameter.id_string }}/stats/urls'
          }
        }
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'crawlers'
        ]
      }
    }
  },
  {
    "displayName": 'Operation',
    "name": 'operation',
    "type": 'options',
    "default": '',
    "description": 'Select the operation to work with',
    "options": [
      {
        "name": 'Unpause a crawler',
        "value": 'runCrawler',
        "action": 'Unpause a crawler',
        "description": 'Unpauses the specified crawler.',
        "routing": {
          "request": {
            "method": 'POST',
            "url": '=/1/crawlers/{{ $parameter.id_string }}/run'
          }
        }
      },
      {
        "name": 'Pause a crawler',
        "value": 'pauseCrawler',
        "action": 'Pause a crawler',
        "description": 'Pauses the specified crawler.',
        "routing": {
          "request": {
            "method": 'POST',
            "url": '=/1/crawlers/{{ $parameter.id_string }}/pause'
          }
        }
      },
      {
        "name": 'Start a crawl',
        "value": 'startReindex',
        "action": 'Start a crawl',
        "description": 'Starts or resumes a crawl.',
        "routing": {
          "request": {
            "method": 'POST',
            "url": '=/1/crawlers/{{ $parameter.id_string }}/reindex'
          }
        }
      },
      {
        "name": 'Test crawl a URL',
        "value": 'testUrl',
        "action": 'Test crawl a URL',
        "description": 'Tests a URL with the crawler\'s configuration and shows the extracted records.',
        "routing": {
          "request": {
            "method": 'POST',
            "url": '=/1/crawlers/{{ $parameter.id_string }}/test'
          }
        }
      },
      {
        "name": 'Crawl URLs',
        "value": 'crawlUrls',
        "action": 'Crawl URLs',
        "description": 'Crawls the specified URLs, extracts records from them, and adds them to the index.',
        "routing": {
          "request": {
            "method": 'POST',
            "url": '=/1/crawlers/{{ $parameter.id_string }}/urls/crawl'
          }
        }
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'actions'
        ]
      }
    }
  },
  {
    "displayName": 'Operation',
    "name": 'operation',
    "type": 'options',
    "default": '',
    "description": 'Select the operation to work with',
    "options": [
      {
        "name": 'Update crawler configuration',
        "value": 'patchConfig',
        "action": 'Update crawler configuration',
        "description": 'Updates the configuration of the specified crawler.',
        "routing": {
          "request": {
            "method": 'PATCH',
            "url": '=/1/crawlers/{{ $parameter.id_string }}/config'
          }
        }
      },
      {
        "name": 'List configuration versions',
        "value": 'listConfigVersions',
        "action": 'List configuration versions',
        "description": 'Lists previous versions of the specified crawler\'s configuration, including who authored the change.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/1/crawlers/{{ $parameter.id_string }}/config/versions'
          }
        }
      },
      {
        "name": 'Retrieve a configuration version',
        "value": 'getConfigVersion',
        "action": 'Retrieve a configuration version',
        "description": 'Retrieves the specified version of the crawler configuration.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/1/crawlers/{{ $parameter.id_string }}/config/versions/{{ $parameter.version_number }}'
          }
        }
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'config'
        ]
      }
    }
  },
  {
    "displayName": 'Operation',
    "name": 'operation',
    "type": 'options',
    "default": '',
    "description": 'Select the operation to work with',
    "options": [
      {
        "name": 'Retrieve task status',
        "value": 'getTaskStatus',
        "action": 'Retrieve task status',
        "description": 'Retrieves the status of the specified tasks, whether they\'re pending or completed.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/1/crawlers/{{ $parameter.id_string }}/tasks/{{ $parameter.taskID_string }}'
          }
        }
      },
      {
        "name": 'Cancel a blocking task',
        "value": 'cancelBlockingAction',
        "action": 'Cancel a blocking task',
        "description": 'Cancels a blocking task.',
        "routing": {
          "request": {
            "method": 'POST',
            "url": '=/1/crawlers/{{ $parameter.id_string }}/tasks/{{ $parameter.taskID_string }}/cancel'
          }
        }
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ]
      }
    }
  },
  {
    "displayName": 'Operation',
    "name": 'operation',
    "type": 'options',
    "default": '',
    "description": 'Select the operation to work with',
    "options": [
      {
        "name": 'List registered domains',
        "value": 'listDomains',
        "action": 'List registered domains',
        "description": 'Lists registered domains.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/1/domains'
          }
        }
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'domains'
        ]
      }
    }
  },
  {
    "type": 'number',
    "default": 20,
    "description": 'Number of items per page of the paginated API response.',
    "typeOptions": {
      "minValue": 1,
      "maxValue": 100
    },
    "routing": {
      "request": {
        "qs": {
          "itemsPerPage": '={{ $value }}'
        }
      }
    },
    "displayName": 'Items Per Page',
    "name": 'itemsPerPage_number',
    "displayOptions": {
      "show": {
        "resource": [
          'crawlers'
        ],
        "operation": [
          'listCrawlers'
        ]
      }
    }
  },
  {
    "type": 'number',
    "default": 1,
    "description": 'Current page of the paginated API response.',
    "typeOptions": {
      "minValue": 1,
      "maxValue": 100
    },
    "routing": {
      "request": {
        "qs": {
          "page": '={{ $value }}'
        }
      }
    },
    "displayName": 'Page',
    "name": 'page_number',
    "displayOptions": {
      "show": {
        "resource": [
          'crawlers'
        ],
        "operation": [
          'listCrawlers'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": 'test-crawler',
    "default": '',
    "description": 'Name of the crawler.',
    "routing": {
      "request": {
        "qs": {
          "name": '={{ $value }}'
        }
      }
    },
    "displayName": 'Name',
    "name": 'name_string',
    "displayOptions": {
      "show": {
        "resource": [
          'crawlers'
        ],
        "operation": [
          'listCrawlers'
        ]
      }
    }
  },
  {
    "type": 'string',
    "default": '',
    "description": 'Algolia application ID where the crawler creates and updates indices.\n',
    "routing": {
      "request": {
        "qs": {
          "appID": '={{ $value }}'
        }
      }
    },
    "displayName": 'App ID',
    "name": 'appID_string',
    "displayOptions": {
      "show": {
        "resource": [
          'crawlers'
        ],
        "operation": [
          'listCrawlers'
        ]
      }
    }
  },
  {
    "displayName": 'Crawler Create',
    "name": 'crawler_create_object',
    "type": 'multiOptions',
    "description": undefined,
    "required": true,
    "default": [],
    "options": [
      {
        "name": 'Name',
        "value": 'name_string'
      },
      {
        "name": 'Configuration',
        "value": 'configuration_object'
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'crawlers'
        ],
        "operation": [
          'createCrawler'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": 'test-crawler',
    "default": '',
    "description": 'Name of the crawler.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'name'
      }
    },
    "displayName": 'Name',
    "name": 'name_string',
    "displayOptions": {
      "show": {
        "crawler_create_object": [
          'name_string'
        ],
        "resource": [
          'crawlers'
        ],
        "operation": [
          'createCrawler'
        ]
      }
    },
    "required": true
  },
  {
    "type": 'json',
    "description": 'Crawler configuration.',
    "required": true,
    "default": '{}',
    "routing": {
      "send": {
        "type": 'body',
        "property": 'config',
        "value": '={{ JSON.parse($value) }}'
      }
    },
    "displayName": 'Configuration',
    "name": 'configuration_object',
    "displayOptions": {
      "show": {
        "crawler_create_object": [
          'configuration_object'
        ],
        "resource": [
          'crawlers'
        ],
        "operation": [
          'createCrawler'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": 'e0f6db8a-24f5-4092-83a4-1b2c6cb6d809',
    "default": '',
    "description": 'Universally unique identifier (UUID) of the crawler.',
    "displayName": 'Id',
    "name": 'id_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'crawlers'
        ],
        "operation": [
          'getCrawler'
        ]
      }
    }
  },
  {
    "type": 'boolean',
    "default": false,
    "routing": {
      "request": {
        "qs": {
          "withConfig": '={{ $value }}'
        }
      }
    },
    "displayName": 'With Config',
    "name": 'withConfig_boolean',
    "displayOptions": {
      "show": {
        "resource": [
          'crawlers'
        ],
        "operation": [
          'getCrawler'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": 'e0f6db8a-24f5-4092-83a4-1b2c6cb6d809',
    "default": '',
    "description": 'Universally unique identifier (UUID) of the crawler.',
    "displayName": 'Id',
    "name": 'id_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'crawlers'
        ],
        "operation": [
          'patchCrawler'
        ]
      }
    }
  },
  {
    "displayName": 'Patch Crawler',
    "name": 'patch_crawler_object',
    "type": 'multiOptions',
    "description": undefined,
    "required": false,
    "default": [],
    "options": [
      {
        "name": 'Name',
        "value": 'name_string'
      },
      {
        "name": 'Configuration',
        "value": 'configuration_object'
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'crawlers'
        ],
        "operation": [
          'patchCrawler'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": 'test-crawler',
    "default": '',
    "description": 'Name of the crawler.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'name'
      }
    },
    "displayName": 'Name',
    "name": 'name_string',
    "displayOptions": {
      "show": {
        "patch_crawler_object": [
          'name_string'
        ],
        "resource": [
          'crawlers'
        ],
        "operation": [
          'patchCrawler'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Crawler configuration.',
    "required": true,
    "default": '{}',
    "routing": {
      "send": {
        "type": 'body',
        "property": 'config',
        "value": '={{ JSON.parse($value) }}'
      }
    },
    "displayName": 'Configuration',
    "name": 'configuration_object',
    "displayOptions": {
      "show": {
        "patch_crawler_object": [
          'configuration_object'
        ],
        "resource": [
          'crawlers'
        ],
        "operation": [
          'patchCrawler'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": 'e0f6db8a-24f5-4092-83a4-1b2c6cb6d809',
    "default": '',
    "description": 'Universally unique identifier (UUID) of the crawler.',
    "displayName": 'Id',
    "name": 'id_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'crawlers'
        ],
        "operation": [
          'deleteCrawler'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": 'e0f6db8a-24f5-4092-83a4-1b2c6cb6d809',
    "default": '',
    "description": 'Universally unique identifier (UUID) of the crawler.',
    "displayName": 'Id',
    "name": 'id_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'actions'
        ],
        "operation": [
          'runCrawler'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": 'e0f6db8a-24f5-4092-83a4-1b2c6cb6d809',
    "default": '',
    "description": 'Universally unique identifier (UUID) of the crawler.',
    "displayName": 'Id',
    "name": 'id_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'actions'
        ],
        "operation": [
          'pauseCrawler'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": 'e0f6db8a-24f5-4092-83a4-1b2c6cb6d809',
    "default": '',
    "description": 'Universally unique identifier (UUID) of the crawler.',
    "displayName": 'Id',
    "name": 'id_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'actions'
        ],
        "operation": [
          'startReindex'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": 'e0f6db8a-24f5-4092-83a4-1b2c6cb6d809',
    "default": '',
    "description": 'Universally unique identifier (UUID) of the crawler.',
    "displayName": 'Id',
    "name": 'id_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'actions'
        ],
        "operation": [
          'testUrl'
        ]
      }
    }
  },
  {
    "displayName": 'Test Url',
    "name": 'test_url_object',
    "type": 'multiOptions',
    "description": undefined,
    "required": true,
    "default": [],
    "options": [
      {
        "name": 'Url',
        "value": 'url_string'
      },
      {
        "name": 'Configuration',
        "value": 'configuration_object'
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'actions'
        ],
        "operation": [
          'testUrl'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": 'https://www.algolia.com/blog',
    "default": '',
    "description": 'URL to test.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'url'
      }
    },
    "displayName": 'Url',
    "name": 'url_string',
    "displayOptions": {
      "show": {
        "test_url_object": [
          'url_string'
        ],
        "resource": [
          'actions'
        ],
        "operation": [
          'testUrl'
        ]
      }
    },
    "required": true
  },
  {
    "type": 'json',
    "description": 'Crawler configuration.',
    "required": true,
    "default": '{}',
    "routing": {
      "send": {
        "type": 'body',
        "property": 'config',
        "value": '={{ JSON.parse($value) }}'
      }
    },
    "displayName": 'Configuration',
    "name": 'configuration_object',
    "displayOptions": {
      "show": {
        "test_url_object": [
          'configuration_object'
        ],
        "resource": [
          'actions'
        ],
        "operation": [
          'testUrl'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": 'e0f6db8a-24f5-4092-83a4-1b2c6cb6d809',
    "default": '',
    "description": 'Universally unique identifier (UUID) of the crawler.',
    "displayName": 'Id',
    "name": 'id_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'actions'
        ],
        "operation": [
          'crawlUrls'
        ]
      }
    }
  },
  {
    "displayName": 'Crawl Urls',
    "name": 'crawl_urls_object',
    "type": 'multiOptions',
    "description": undefined,
    "required": true,
    "default": [],
    "options": [
      {
        "name": 'Urls',
        "value": 'urls_json'
      },
      {
        "name": 'Save',
        "value": 'save_boolean'
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'actions'
        ],
        "operation": [
          'crawlUrls'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Urls',
    "name": 'urls_json',
    "default": '[]',
    "description": 'URLs to crawl.',
    "required": true,
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ JSON.parse($value) }}',
        "property": 'urls'
      }
    },
    "displayOptions": {
      "show": {
        "crawl_urls_object": [
          'urls_json'
        ],
        "resource": [
          'actions'
        ],
        "operation": [
          'crawlUrls'
        ]
      }
    }
  },
  {
    "type": 'boolean',
    "default": false,
    "description": 'Whether the specified URLs should be added to the `extraURLs` property of the crawler configuration.\nIf unspecified, the URLs are added to the `extraUrls` field only if they haven\'t been indexed during the last reindex.\n',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'save'
      }
    },
    "displayName": 'Save',
    "name": 'save_boolean',
    "displayOptions": {
      "show": {
        "crawl_urls_object": [
          'save_boolean'
        ],
        "resource": [
          'actions'
        ],
        "operation": [
          'crawlUrls'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": 'e0f6db8a-24f5-4092-83a4-1b2c6cb6d809',
    "default": '',
    "description": 'Universally unique identifier (UUID) of the crawler.',
    "displayName": 'Id',
    "name": 'id_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'crawlers'
        ],
        "operation": [
          'getStats'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": 'e0f6db8a-24f5-4092-83a4-1b2c6cb6d809',
    "default": '',
    "description": 'Universally unique identifier (UUID) of the crawler.',
    "displayName": 'Id',
    "name": 'id_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'config'
        ],
        "operation": [
          'patchConfig'
        ]
      }
    }
  },
  {
    "type": 'multiOptions',
    "name": 'partial_config',
    "displayName": 'Partial Config',
    "description": 'Crawler configuration to update.\nYou can only update top-level configuration properties.\nTo update a nested configuration, such as `actions.recordExtractor`,\nyou must provide the complete top-level object such as `actions`.\n',
    "default": [],
    "options": [
      {
        "name": 'Actions',
        "value": 'actions_json'
      },
      {
        "name": 'Api Key',
        "value": 'apikey_string'
      },
      {
        "name": 'Application Id',
        "value": 'applicationid_string'
      },
      {
        "name": 'Exclusion Patterns',
        "value": 'exclusionpatterns_json'
      },
      {
        "name": 'External Data',
        "value": 'externaldata_json'
      },
      {
        "name": 'Extra Urls',
        "value": 'extraurls_json'
      },
      {
        "name": 'Ignore Canonical To',
        "value": 'ignorecanonicalto'
      },
      {
        "name": 'Ignore No Follow To',
        "value": 'ignorenofollowto_boolean'
      },
      {
        "name": 'Ignore No Index',
        "value": 'ignorenoindex_boolean'
      },
      {
        "name": 'Ignore Pagination Attributes',
        "value": 'ignorepaginationattributes_boolean'
      },
      {
        "name": 'Ignore Query Params',
        "value": 'ignorequeryparams_json'
      },
      {
        "name": 'Ignore Robots Txt Rules',
        "value": 'ignorerobotstxtrules_boolean'
      },
      {
        "name": 'Index Prefix',
        "value": 'indexprefix_string'
      },
      {
        "name": 'Initial Index Settings',
        "value": 'initial_index_settings_object'
      },
      {
        "name": 'Link Extractor',
        "value": 'link_extractor_object'
      },
      {
        "name": 'Login',
        "value": 'login'
      },
      {
        "name": 'Max Depth',
        "value": 'maxdepth_number'
      },
      {
        "name": 'Max Urls',
        "value": 'maxurls_number'
      },
      {
        "name": 'Rate Limit',
        "value": 'ratelimit_number'
      },
      {
        "name": 'Render Java Script',
        "value": 'renderjavascript'
      },
      {
        "name": 'Request Options',
        "value": 'request_options_object'
      },
      {
        "name": 'Safety Checks',
        "value": 'safety_checks_object'
      },
      {
        "name": 'Save Backup',
        "value": 'savebackup_boolean'
      },
      {
        "name": 'Schedule',
        "value": 'schedule_string'
      },
      {
        "name": 'Sitemaps',
        "value": 'sitemaps_json'
      },
      {
        "name": 'Start Urls',
        "value": 'starturls_json'
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'config'
        ],
        "operation": [
          'patchConfig'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Actions',
    "name": 'actions_json',
    "default": '[]',
    "description": 'A list of actions.',
    "required": true,
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ JSON.parse($value) }}',
        "property": 'actions'
      }
    },
    "displayOptions": {
      "show": {
        "partial_config": [
          'actions_json'
        ],
        "resource": [
          'config'
        ],
        "operation": [
          'patchConfig'
        ]
      }
    }
  },
  {
    "type": 'string',
    "default": '',
    "description": 'The Algolia API key the crawler uses for indexing records.\nIf you don\'t provide an API key, one will be generated by the Crawler when you create a configuration.\n\nThe API key must have:\n\n- These [rights and restrictions](https://www.algolia.com/doc/guides/security/api-keys/#rights-and-restrictions): `search`, `addObject`, `deleteObject`, `deleteIndex`, `settings`, `editSettings`, `listIndexes`, `browse`\n- Access to the correct set of indices, based on the crawler\'s `indexPrefix`.\nFor example, if the prefix is `crawler_`, the API key must have access to `crawler_*`.\n\n**Don\'t use your [Admin API key](https://www.algolia.com/doc/guides/security/api-keys/#predefined-api-keys)**.\n',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'apiKey'
      }
    },
    "displayName": 'Api Key',
    "name": 'apiKey_string',
    "displayOptions": {
      "show": {
        "partial_config": [
          'apikey_string'
        ],
        "resource": [
          'config'
        ],
        "operation": [
          'patchConfig'
        ]
      }
    }
  },
  {
    "type": 'string',
    "default": '',
    "description": 'Algolia application ID where the crawler creates and updates indices.\n',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'applicationId'
      }
    },
    "displayName": 'Application Id',
    "name": 'applicationId_string',
    "displayOptions": {
      "show": {
        "partial_config": [
          'applicationid_string'
        ],
        "resource": [
          'config'
        ],
        "operation": [
          'patchConfig'
        ]
      }
    },
    "required": true
  },
  {
    "type": 'json',
    "displayName": 'Exclusion Patterns',
    "name": 'exclusionPatterns_json',
    "default": '[]',
    "description": 'URLs to exclude from crawling.',
    "required": false,
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ JSON.parse($value) }}',
        "property": 'exclusionPatterns'
      }
    },
    "displayOptions": {
      "show": {
        "partial_config": [
          'exclusionpatterns_json'
        ],
        "resource": [
          'config'
        ],
        "operation": [
          'patchConfig'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'External Data',
    "name": 'externalData_json',
    "default": '[]',
    "description": 'References to external data sources for enriching the extracted records.\n',
    "required": false,
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ JSON.parse($value) }}',
        "property": 'externalData'
      }
    },
    "displayOptions": {
      "show": {
        "partial_config": [
          'externaldata_json'
        ],
        "resource": [
          'config'
        ],
        "operation": [
          'patchConfig'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Extra Urls',
    "name": 'extraUrls_json',
    "default": '[]',
    "description": 'The Crawler treats `extraUrls` the same as `startUrls`.\nSpecify `extraUrls` if you want to differentiate between URLs you manually added to fix site crawling from those you initially specified in `startUrls`.\n',
    "required": false,
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ JSON.parse($value) }}',
        "property": 'extraUrls'
      }
    },
    "displayOptions": {
      "show": {
        "partial_config": [
          'extraurls_json'
        ],
        "resource": [
          'config'
        ],
        "operation": [
          'patchConfig'
        ]
      }
    }
  },
  {
    "type": 'options',
    "name": 'ignoreCanonicalTo',
    "displayName": 'Ignore Canonical To',
    "default": '',
    "options": [
      {
        "name": 'Boolean',
        "value": 'boolean'
      },
      {
        "name": 'Array',
        "value": 'array'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "property": 'ignoreCanonicalTo',
        "value": '={{ typeof $parameter.ignoreCanonicalTo_boolean !== "undefined" ? $parameter.ignoreCanonicalTo_boolean : typeof $parameter.ignoreCanonicalTo_json !== "undefined" ? JSON.parse($parameter.ignoreCanonicalTo_json) : undefined }}'
      }
    },
    "displayOptions": {
      "show": {
        "partial_config": [
          'ignorecanonicalto'
        ],
        "resource": [
          'config'
        ],
        "operation": [
          'patchConfig'
        ]
      }
    }
  },
  {
    "type": 'boolean',
    "default": false,
    "description": 'Determines if the crawler should extract records from a page with a [canonical URL](https://www.algolia.com/doc/tools/crawler/getting-started/crawler-configuration/#canonical-urls-and-crawler-behavior).\n\nIf `ignoreCanonicalTo` is set to:\n\n- `true` all canonical URLs are ignored.\n- One or more URL patterns, the crawler will ignore the canonical URL if it matches a pattern.\n',
    "displayName": 'Ignore Canonical To (Boolean)',
    "name": 'ignoreCanonicalTo_boolean',
    "displayOptions": {
      "show": {
        "ignoreCanonicalTo": [
          'boolean'
        ],
        "partial_config": [
          'ignorecanonicalto'
        ],
        "resource": [
          'config'
        ],
        "operation": [
          'patchConfig'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Ignore Canonical To (Array)',
    "name": 'ignoreCanonicalTo_json',
    "default": '[]',
    "description": 'Canonical URLs or URL patterns to ignore.\n',
    "required": false,
    "displayOptions": {
      "show": {
        "ignoreCanonicalTo": [
          'array'
        ],
        "partial_config": [
          'ignorecanonicalto'
        ],
        "resource": [
          'config'
        ],
        "operation": [
          'patchConfig'
        ]
      }
    }
  },
  {
    "type": 'boolean',
    "default": false,
    "description": 'Determines if the crawler should follow links with a `nofollow` directive.\nIf `true`, the crawler will ignore the `nofollow` directive and crawl links on the page.\n\nThe crawler always ignores links that don\'t match your [configuration settings](https://www.algolia.com/doc/tools/crawler/getting-started/crawler-configuration/#exclude-and-include-content).\n`ignoreNoFollowTo` applies to:\n\n- Links that are ignored because the [`robots` meta tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name#Other_metadata_names) contains `nofollow` or `none`.\n- Links with a [`rel` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel) containing the `nofollow` directive.\n',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'ignoreNoFollowTo'
      }
    },
    "displayName": 'Ignore No Follow To',
    "name": 'ignoreNoFollowTo_boolean',
    "displayOptions": {
      "show": {
        "partial_config": [
          'ignorenofollowto_boolean'
        ],
        "resource": [
          'config'
        ],
        "operation": [
          'patchConfig'
        ]
      }
    }
  },
  {
    "type": 'boolean',
    "default": false,
    "description": 'Whether to ignore the `noindex` robots meta tag.\nIf `true`, pages with this meta tag _will_ be crawled.\n',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'ignoreNoIndex'
      }
    },
    "displayName": 'Ignore No Index',
    "name": 'ignoreNoIndex_boolean',
    "displayOptions": {
      "show": {
        "partial_config": [
          'ignorenoindex_boolean'
        ],
        "resource": [
          'config'
        ],
        "operation": [
          'patchConfig'
        ]
      }
    }
  },
  {
    "type": 'boolean',
    "default": true,
    "description": 'Whether the crawler should follow `rel="prev"` and `rel="next"` pagination links in the `<head>` section of an HTML page.\n\n- If `true`, the crawler ignores the pagination links.\n- If `false`, the crawler follows the pagination links.\n',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'ignorePaginationAttributes'
      }
    },
    "displayName": 'Ignore Pagination Attributes',
    "name": 'ignorePaginationAttributes_boolean',
    "displayOptions": {
      "show": {
        "partial_config": [
          'ignorepaginationattributes_boolean'
        ],
        "resource": [
          'config'
        ],
        "operation": [
          'patchConfig'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Ignore Query Params',
    "name": 'ignoreQueryParams_json',
    "default": '[]',
    "description": 'Query parameters to ignore while crawling.\n\nAll URLs with the matching query parameters are treated as identical.\nThis prevents indexing URLs that just differ by their query parameters.\n',
    "required": false,
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ JSON.parse($value) }}',
        "property": 'ignoreQueryParams'
      }
    },
    "displayOptions": {
      "show": {
        "partial_config": [
          'ignorequeryparams_json'
        ],
        "resource": [
          'config'
        ],
        "operation": [
          'patchConfig'
        ]
      }
    }
  },
  {
    "type": 'boolean',
    "default": false,
    "description": 'Whether to ignore rules defined in your `robots.txt` file.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'ignoreRobotsTxtRules'
      }
    },
    "displayName": 'Ignore Robots Txt Rules',
    "name": 'ignoreRobotsTxtRules_boolean',
    "displayOptions": {
      "show": {
        "partial_config": [
          'ignorerobotstxtrules_boolean'
        ],
        "resource": [
          'config'
        ],
        "operation": [
          'patchConfig'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": 'crawler_',
    "default": '',
    "description": 'A prefix for all indices created by this crawler. It\'s combined with the `indexName` for each action to form the complete index name.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'indexPrefix'
      }
    },
    "displayName": 'Index Prefix',
    "name": 'indexPrefix_string',
    "displayOptions": {
      "show": {
        "partial_config": [
          'indexprefix_string'
        ],
        "resource": [
          'config'
        ],
        "operation": [
          'patchConfig'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Crawler index settings.\n\nThese index settings are only applied during the first crawl of an index.\n\nAny subsequent changes won\'t be applied to the index.\nInstead, make changes to your index settings in the [Algolia dashboard](https://dashboard.algolia.com/explorer/configuration).\n',
    "required": false,
    "default": '{}',
    "routing": {
      "send": {
        "type": 'body',
        "property": 'initialIndexSettings',
        "value": '={{ JSON.parse($value) }}'
      }
    },
    "displayName": 'Initial Index Settings',
    "name": 'initial_index_settings_object',
    "displayOptions": {
      "show": {
        "partial_config": [
          'initial_index_settings_object'
        ],
        "resource": [
          'config'
        ],
        "operation": [
          'patchConfig'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Function for extracting URLs from links on crawled pages.\n\nFor more information, see the [`linkExtractor` documentation](https://www.algolia.com/doc/tools/crawler/apis/configuration/link-extractor).\n',
    "required": false,
    "default": '{}',
    "routing": {
      "send": {
        "type": 'body',
        "property": 'linkExtractor',
        "value": '={{ JSON.parse($value) }}'
      }
    },
    "displayName": 'Link Extractor',
    "name": 'link_extractor_object',
    "displayOptions": {
      "show": {
        "partial_config": [
          'link_extractor_object'
        ],
        "resource": [
          'config'
        ],
        "operation": [
          'patchConfig'
        ]
      }
    }
  },
  {
    "type": 'options',
    "name": 'login',
    "displayName": 'Login',
    "default": '',
    "options": [
      {
        "name": 'HTTP request',
        "value": 'http_request'
      },
      {
        "name": 'Browser-based',
        "value": 'browserbased'
      },
      {
        "name": 'OAuth 20',
        "value": 'oauth_20'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "property": 'login',
        "value": '={{ typeof $parameter.http_request_object !== "undefined" ? JSON.parse($parameter.http_request_object) : typeof $parameter.browserbased_object !== "undefined" ? JSON.parse($parameter.browserbased_object) : typeof $parameter.oauth_20_object !== "undefined" ? JSON.parse($parameter.oauth_20_object) : undefined }}'
      }
    },
    "displayOptions": {
      "show": {
        "partial_config": [
          'login'
        ],
        "resource": [
          'config'
        ],
        "operation": [
          'patchConfig'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Information for making a HTTP request for authorization.',
    "required": true,
    "default": '{}',
    "displayName": 'HTTP Request',
    "name": 'http_request_object',
    "displayOptions": {
      "show": {
        "login": [
          'http_request'
        ],
        "partial_config": [
          'login'
        ],
        "resource": [
          'config'
        ],
        "operation": [
          'patchConfig'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Information for using a web browser for authorization.\nThe browser loads a login page and enters the provided credentials.\n',
    "required": true,
    "default": '{}',
    "displayName": 'Browser-Based',
    "name": 'browserbased_object',
    "displayOptions": {
      "show": {
        "login": [
          'browserbased'
        ],
        "partial_config": [
          'login'
        ],
        "resource": [
          'config'
        ],
        "operation": [
          'patchConfig'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Authorization information for using the [OAuth 2.0 client credentials](https://datatracker.ietf.org/doc/html/rfc6749#section-4.4) authorization grant.\n\nOAuth authorization is supported for [Azure Active Directory version 1](https://learn.microsoft.com/en-us/previous-versions/azure/active-directory/azuread-dev/v1-oauth2-client-creds-grant-flow) as provider.\n',
    "required": true,
    "default": '{}',
    "displayName": 'OAuth 20',
    "name": 'oauth_20_object',
    "displayOptions": {
      "show": {
        "login": [
          'oauth_20'
        ],
        "partial_config": [
          'login'
        ],
        "resource": [
          'config'
        ],
        "operation": [
          'patchConfig'
        ]
      }
    }
  },
  {
    "type": 'number',
    "placeholder": '5',
    "default": '',
    "description": 'Determines the maximum path depth of crawled URLs.\n\nPath depth is calculated based on the number of slash characters (`/`) after the domain (starting at 1).\nFor example:\n\n- **1** `http://example.com`\n- **1** `http://example.com/`\n- **1** `http://example.com/foo`\n- **2** `http://example.com/foo/`\n- **2** `http://example.com/foo/bar`\n- **3** `http://example.com/foo/bar/`\n\n**URLs added with `startUrls` and `sitemaps` aren\'t checked for `maxDepth`.**.\n',
    "typeOptions": {
      "minValue": 1,
      "maxValue": 100
    },
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'maxDepth'
      }
    },
    "displayName": 'Max Depth',
    "name": 'maxDepth_number',
    "displayOptions": {
      "show": {
        "partial_config": [
          'maxdepth_number'
        ],
        "resource": [
          'config'
        ],
        "operation": [
          'patchConfig'
        ]
      }
    }
  },
  {
    "type": 'number',
    "placeholder": '250',
    "default": '',
    "description": 'Limits the number of URLs your crawler processes.\n\nChange it to a low value, such as 100, for quick crawling tests.\nChange it to a higher explicit value for full crawls to prevent it from getting "lost" in complex site structures.\nBecause the Crawler works on many pages simultaneously, `maxUrls` doesn\'t guarantee finding the same pages each time it runs.\n',
    "typeOptions": {
      "minValue": 1,
      "maxValue": 15000000
    },
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'maxUrls'
      }
    },
    "displayName": 'Max Urls',
    "name": 'maxUrls_number',
    "displayOptions": {
      "show": {
        "partial_config": [
          'maxurls_number'
        ],
        "resource": [
          'config'
        ],
        "operation": [
          'patchConfig'
        ]
      }
    }
  },
  {
    "type": 'number',
    "placeholder": '4',
    "default": '',
    "description": 'Determines the number of concurrent tasks per second that can run for this configuration.\n\nA higher rate limit means more crawls per second.\nAlgolia prevents system overload by ensuring the number of URLs added in the last second and the number of URLs being processed is less than the rate limit:\n\n\n```\nmax(new_urls_added, active_urls_processing) <= rateLimit\n```\n\nStart with a low value (for example, 2) and increase it if you need faster crawling.\nBe aware that a high `rateLimit` can have a huge impact on bandwidth cost and server resource consumption.\n\nThe number of pages processed per second depends on the average time it takes to fetch, process, and upload a URL. \nFor a given `rateLimit` if fetching, processing, and uploading URLs takes (on average):\n\n- Less than a second, your crawler processes up to `rateLimit` pages per second.\n- Four seconds, your crawler processes up to `rateLimit / 4` pages per second.\n\nIn the latter case, increasing `rateLimit` improves performance, up to a point. \nHowever, if the processing time remains at four seconds, increasing `rateLimit` won\'t increase the number of pages processed per second.\n',
    "typeOptions": {
      "minValue": 1,
      "maxValue": 100
    },
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'rateLimit'
      }
    },
    "displayName": 'Rate Limit',
    "name": 'rateLimit_number',
    "displayOptions": {
      "show": {
        "partial_config": [
          'ratelimit_number'
        ],
        "resource": [
          'config'
        ],
        "operation": [
          'patchConfig'
        ]
      }
    },
    "required": true
  },
  {
    "type": 'options',
    "name": 'renderJavaScript',
    "displayName": 'Render Java Script',
    "default": '',
    "options": [
      {
        "name": 'Boolean',
        "value": 'boolean'
      },
      {
        "name": 'Array',
        "value": 'array'
      },
      {
        "name": 'HeadlessBrowserConfig',
        "value": 'headlessbrowserconfig'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "property": 'renderJavaScript',
        "value": '={{ typeof $parameter.renderJavaScript_boolean !== "undefined" ? $parameter.renderJavaScript_boolean : typeof $parameter.renderJavaScript_json !== "undefined" ? JSON.parse($parameter.renderJavaScript_json) : typeof $parameter.headless_browser_config_object !== "undefined" ? JSON.parse($parameter.headless_browser_config_object) : undefined }}'
      }
    },
    "displayOptions": {
      "show": {
        "partial_config": [
          'renderjavascript'
        ],
        "resource": [
          'config'
        ],
        "operation": [
          'patchConfig'
        ]
      }
    }
  },
  {
    "type": 'boolean',
    "default": false,
    "description": 'Whether to render all pages.',
    "displayName": 'Render Java Script (Boolean)',
    "name": 'renderJavaScript_boolean',
    "displayOptions": {
      "show": {
        "renderJavaScript": [
          'boolean'
        ],
        "partial_config": [
          'renderjavascript'
        ],
        "resource": [
          'config'
        ],
        "operation": [
          'patchConfig'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Render Java Script (Array)',
    "name": 'renderJavaScript_json',
    "default": '[]',
    "description": 'URLs or URL patterns to render.',
    "required": false,
    "displayOptions": {
      "show": {
        "renderJavaScript": [
          'array'
        ],
        "partial_config": [
          'renderjavascript'
        ],
        "resource": [
          'config'
        ],
        "operation": [
          'patchConfig'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Configuration for rendering HTML.',
    "required": true,
    "default": '{}',
    "displayName": 'Headless Browser Config',
    "name": 'headless_browser_config_object',
    "displayOptions": {
      "show": {
        "renderJavaScript": [
          'headlessbrowserconfig'
        ],
        "partial_config": [
          'renderjavascript'
        ],
        "resource": [
          'config'
        ],
        "operation": [
          'patchConfig'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Lets you add options to HTTP requests made by the crawler.',
    "required": false,
    "default": '{}',
    "routing": {
      "send": {
        "type": 'body',
        "property": 'requestOptions',
        "value": '={{ JSON.parse($value) }}'
      }
    },
    "displayName": 'Request Options',
    "name": 'request_options_object',
    "displayOptions": {
      "show": {
        "partial_config": [
          'request_options_object'
        ],
        "resource": [
          'config'
        ],
        "operation": [
          'patchConfig'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Checks to ensure the crawl was successful.\n\nFor more information, see the [Safety checks](https://www.algolia.com/doc/tools/crawler/getting-started/crawler-configuration/#safety-checks) documentation.\n',
    "required": false,
    "default": '{}',
    "routing": {
      "send": {
        "type": 'body',
        "property": 'safetyChecks',
        "value": '={{ JSON.parse($value) }}'
      }
    },
    "displayName": 'Safety Checks',
    "name": 'safety_checks_object',
    "displayOptions": {
      "show": {
        "partial_config": [
          'safety_checks_object'
        ],
        "resource": [
          'config'
        ],
        "operation": [
          'patchConfig'
        ]
      }
    }
  },
  {
    "type": 'boolean',
    "default": false,
    "description": 'Whether to back up your index before the crawler overwrites it with new records.\n',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'saveBackup'
      }
    },
    "displayName": 'Save Backup',
    "name": 'saveBackup_boolean',
    "displayOptions": {
      "show": {
        "partial_config": [
          'savebackup_boolean'
        ],
        "resource": [
          'config'
        ],
        "operation": [
          'patchConfig'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": 'every weekday at 12:00 pm',
    "default": '',
    "description": 'Schedule for running the crawl.\n\nInstead of manually starting a crawl each time, you can set up a schedule for automatic crawls.\n[Use the visual UI](https://www.algolia.com/doc/tools/crawler/getting-started/crawler-configuration-visual) or add the `schedule` parameter to [your configuration](https://www.algolia.com/doc/tools/crawler/getting-started/crawler-configuration).\n\n`schedule` uses [Later.js syntax](https://bunkat.github.io/later) to specify when to crawl your site.\nHere are some key things to keep in mind when using `Later.js` syntax with the Crawler:\n\n- The interval between two scheduled crawls must be at least 24 hours.\n- To crawl daily, use "every 1 day" instead of "everyday" or "every day".\n- If you don\'t specify a time, the crawl can happen any time during the scheduled day.\n- Specify times for the UTC (GMT+0) timezone\n- Include minutes when specifying a time. For example, "at 3:00 pm" instead of "at 3pm".\n- Use "at 12:00 am" to specify midnight, not "at 00:00 am".\n',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'schedule'
      }
    },
    "displayName": 'Schedule',
    "name": 'schedule_string',
    "displayOptions": {
      "show": {
        "partial_config": [
          'schedule_string'
        ],
        "resource": [
          'config'
        ],
        "operation": [
          'patchConfig'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Sitemaps',
    "name": 'sitemaps_json',
    "default": '[]',
    "description": 'Sitemaps with URLs from where to start crawling.',
    "required": false,
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ JSON.parse($value) }}',
        "property": 'sitemaps'
      }
    },
    "displayOptions": {
      "show": {
        "partial_config": [
          'sitemaps_json'
        ],
        "resource": [
          'config'
        ],
        "operation": [
          'patchConfig'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Start Urls',
    "name": 'startUrls_json',
    "default": '[]',
    "description": 'URLs from where to start crawling.',
    "required": false,
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ JSON.parse($value) }}',
        "property": 'startUrls'
      }
    },
    "displayOptions": {
      "show": {
        "partial_config": [
          'starturls_json'
        ],
        "resource": [
          'config'
        ],
        "operation": [
          'patchConfig'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": 'e0f6db8a-24f5-4092-83a4-1b2c6cb6d809',
    "default": '',
    "description": 'Universally unique identifier (UUID) of the crawler.',
    "displayName": 'Id',
    "name": 'id_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'config'
        ],
        "operation": [
          'listConfigVersions'
        ]
      }
    }
  },
  {
    "type": 'number',
    "default": 20,
    "description": 'Number of items per page of the paginated API response.',
    "typeOptions": {
      "minValue": 1,
      "maxValue": 100
    },
    "routing": {
      "request": {
        "qs": {
          "itemsPerPage": '={{ $value }}'
        }
      }
    },
    "displayName": 'Items Per Page',
    "name": 'itemsPerPage_number',
    "displayOptions": {
      "show": {
        "resource": [
          'config'
        ],
        "operation": [
          'listConfigVersions'
        ]
      }
    }
  },
  {
    "type": 'number',
    "default": 1,
    "description": 'Current page of the paginated API response.',
    "typeOptions": {
      "minValue": 1,
      "maxValue": 100
    },
    "routing": {
      "request": {
        "qs": {
          "page": '={{ $value }}'
        }
      }
    },
    "displayName": 'Page',
    "name": 'page_number',
    "displayOptions": {
      "show": {
        "resource": [
          'config'
        ],
        "operation": [
          'listConfigVersions'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": 'e0f6db8a-24f5-4092-83a4-1b2c6cb6d809',
    "default": '',
    "description": 'Universally unique identifier (UUID) of the crawler.',
    "displayName": 'Id',
    "name": 'id_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'config'
        ],
        "operation": [
          'getConfigVersion'
        ]
      }
    }
  },
  {
    "type": 'number',
    "default": '',
    "displayName": 'Version',
    "name": 'version_number',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'config'
        ],
        "operation": [
          'getConfigVersion'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": 'e0f6db8a-24f5-4092-83a4-1b2c6cb6d809',
    "default": '',
    "description": 'Universally unique identifier (UUID) of the crawler.',
    "displayName": 'Id',
    "name": 'id_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'getTaskStatus'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '98458796-b7bb-4703-8b1b-785c1080b110',
    "default": '',
    "description": 'Universally unique identifier (UUID) of the task.',
    "displayName": 'Task ID',
    "name": 'taskID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'getTaskStatus'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": 'e0f6db8a-24f5-4092-83a4-1b2c6cb6d809',
    "default": '',
    "description": 'Universally unique identifier (UUID) of the crawler.',
    "displayName": 'Id',
    "name": 'id_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'cancelBlockingAction'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '98458796-b7bb-4703-8b1b-785c1080b110',
    "default": '',
    "description": 'Universally unique identifier (UUID) of the task.',
    "displayName": 'Task ID',
    "name": 'taskID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'cancelBlockingAction'
        ]
      }
    }
  },
  {
    "type": 'number',
    "default": 20,
    "description": 'Number of items per page of the paginated API response.',
    "typeOptions": {
      "minValue": 1,
      "maxValue": 100
    },
    "routing": {
      "request": {
        "qs": {
          "itemsPerPage": '={{ $value }}'
        }
      }
    },
    "displayName": 'Items Per Page',
    "name": 'itemsPerPage_number',
    "displayOptions": {
      "show": {
        "resource": [
          'domains'
        ],
        "operation": [
          'listDomains'
        ]
      }
    }
  },
  {
    "type": 'number',
    "default": 1,
    "description": 'Current page of the paginated API response.',
    "typeOptions": {
      "minValue": 1,
      "maxValue": 100
    },
    "routing": {
      "request": {
        "qs": {
          "page": '={{ $value }}'
        }
      }
    },
    "displayName": 'Page',
    "name": 'page_number',
    "displayOptions": {
      "show": {
        "resource": [
          'domains'
        ],
        "operation": [
          'listDomains'
        ]
      }
    }
  },
  {
    "type": 'string',
    "default": '',
    "description": 'Algolia application ID where the crawler creates and updates indices.\n',
    "routing": {
      "request": {
        "qs": {
          "appID": '={{ $value }}'
        }
      }
    },
    "displayName": 'App ID',
    "name": 'appID_string',
    "displayOptions": {
      "show": {
        "resource": [
          'domains'
        ],
        "operation": [
          'listDomains'
        ]
      }
    }
  }
];

export default properties;
