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
        "name": 'incidents',
        "value": 'incidents',
        "description": 'List the known incidents'
      },
      {
        "name": 'infrastructure',
        "value": 'infrastructure',
        "description": 'Return information about the Algolia infrastructure used by your application'
      },
      {
        "name": 'monitoring-tag',
        "value": 'monitoring-tag',
        "description": 'Report search and indexing times for your clusters, and get a list of servers'
      },
      {
        "name": 'status',
        "value": 'status',
        "description": 'Report the status of Algolia clusters'
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
        "name": 'Retrieve status of all clusters',
        "value": 'getStatus',
        "action": 'Retrieve status of all clusters',
        "description": 'Retrieves the status of all Algolia clusters and instances.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/1/status'
          }
        }
      },
      {
        "name": 'Retrieve cluster status',
        "value": 'getClusterStatus',
        "action": 'Retrieve cluster status',
        "description": 'Retrieves the status of selected clusters.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/1/status/{{ $parameter.clusters_string }}'
          }
        }
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'status'
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
        "name": 'Retrieve all incidents',
        "value": 'getIncidents',
        "action": 'Retrieve all incidents',
        "description": 'Retrieves known incidents for all clusters.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/1/incidents'
          }
        }
      },
      {
        "name": 'Retrieve cluster incidents',
        "value": 'getClusterIncidents',
        "action": 'Retrieve cluster incidents',
        "description": 'Retrieves known incidents for the selected clusters.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/1/incidents/{{ $parameter.clusters_string }}'
          }
        }
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'incidents'
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
        "name": 'Retrieve servers',
        "value": 'getServers',
        "action": 'Retrieve servers',
        "description": 'Retrieves the servers that belong to clusters.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/1/inventory/servers'
          }
        }
      },
      {
        "name": 'Retrieve search latency times',
        "value": 'getLatency',
        "action": 'Retrieve search latency times',
        "description": 'Retrieves the average latency for search requests for selected clusters.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/1/latency/{{ $parameter.clusters_string }}'
          }
        }
      },
      {
        "name": 'Retrieve indexing times',
        "value": 'getIndexingTime',
        "action": 'Retrieve indexing times',
        "description": 'Retrieves average times for indexing operations for selected clusters.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/1/indexing/{{ $parameter.clusters_string }}'
          }
        }
      },
      {
        "name": 'Test the reachability of clusters',
        "value": 'getReachability',
        "action": 'Test the reachability of clusters',
        "description": 'Test whether clusters are reachable or not.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/1/reachability/{{ $parameter.clusters_string }}/probes'
          }
        }
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'monitoring-tag'
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
        "name": 'Retrieve metrics',
        "value": 'getMetrics',
        "action": 'Retrieve metrics',
        "description": 'Retrieves metrics related to your Algolia infrastructure, aggregated over a selected time window.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/1/infrastructure/{{ $parameter.metric_options }}/period/{{ $parameter.period_options }}'
          }
        }
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'infrastructure'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": 'c1-de,c2-de,c3-de',
    "default": '',
    "displayName": 'Clusters',
    "name": 'clusters_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'status'
        ],
        "operation": [
          'getClusterStatus'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": 'c1-de,c2-de,c3-de',
    "default": '',
    "displayName": 'Clusters',
    "name": 'clusters_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'incidents'
        ],
        "operation": [
          'getClusterIncidents'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": 'c1-de,c2-de,c3-de',
    "default": '',
    "displayName": 'Clusters',
    "name": 'clusters_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'monitoring-tag'
        ],
        "operation": [
          'getLatency'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": 'c1-de,c2-de,c3-de',
    "default": '',
    "displayName": 'Clusters',
    "name": 'clusters_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'monitoring-tag'
        ],
        "operation": [
          'getIndexingTime'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": 'c1-de,c2-de,c3-de',
    "default": '',
    "displayName": 'Clusters',
    "name": 'clusters_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'monitoring-tag'
        ],
        "operation": [
          'getReachability'
        ]
      }
    }
  },
  {
    "type": 'options',
    "placeholder": '*',
    "default": '',
    "options": [
      {
        "name": 'avg_build_time',
        "value": 'avg_build_time'
      },
      {
        "name": 'ssd_usage',
        "value": 'ssd_usage'
      },
      {
        "name": 'ram_search_usage',
        "value": 'ram_search_usage'
      },
      {
        "name": 'ram_indexing_usage',
        "value": 'ram_indexing_usage'
      },
      {
        "name": 'cpu_usage',
        "value": 'cpu_usage'
      },
      {
        "name": '*',
        "value": '*'
      }
    ],
    "displayName": 'Metric',
    "name": 'metric_options',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'infrastructure'
        ],
        "operation": [
          'getMetrics'
        ]
      }
    }
  },
  {
    "type": 'options',
    "placeholder": 'week',
    "default": '',
    "options": [
      {
        "name": 'minute',
        "value": 'minute'
      },
      {
        "name": 'hour',
        "value": 'hour'
      },
      {
        "name": 'day',
        "value": 'day'
      },
      {
        "name": 'week',
        "value": 'week'
      },
      {
        "name": 'month',
        "value": 'month'
      }
    ],
    "displayName": 'Period',
    "name": 'period_options',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'infrastructure'
        ],
        "operation": [
          'getMetrics'
        ]
      }
    }
  }
];

export default properties;
