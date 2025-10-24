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
        "name": 'abtest',
        "value": 'abtest',
        "description": 'Manage A/B tests'
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
        "name": 'Create an A/B test',
        "value": 'addABTests',
        "action": 'Create an A/B test',
        "description": 'Creates a new A/B test.',
        "routing": {
          "request": {
            "method": 'POST',
            "url": '=/2/abtests'
          }
        }
      },
      {
        "name": 'List all A/B tests',
        "value": 'listABTests',
        "action": 'List all A/B tests',
        "description": 'Lists all A/B tests you configured for this application.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/2/abtests'
          }
        }
      },
      {
        "name": 'Retrieve A/B test details',
        "value": 'getABTest',
        "action": 'Retrieve A/B test details',
        "description": 'Retrieves the details for an A/B test by its ID.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/2/abtests/{{ $parameter.id_number }}'
          },
          "output": {
            "postReceive": [
              async function (items) {
              const simple = this.getNodeParameter('simplify', 0);
              if (!simple) return items;
              return items.map((item) => {
                const json = item.json || {};
                const simplified = new Map();
                ["abTestID","createdAt","endAt","name","status","updatedAt","variants"].forEach((f) => {
                  if (json[f] !== undefined) simplified.set(f, json[f]);
                });
                return { json: Object.fromEntries(simplified) };
              });
            }
            ]
          }
        },
        "inputSchema": {
          "simplifiedOutput": [
            'abTestID',
            'createdAt',
            'endAt',
            'name',
            'status',
            'updatedAt',
            'variants'
          ]
        }
      },
      {
        "name": 'Delete an A/B test',
        "value": 'deleteABTest',
        "action": 'Delete an A/B test',
        "description": 'Deletes an A/B test by its ID.',
        "routing": {
          "request": {
            "method": 'DELETE',
            "url": '=/2/abtests/{{ $parameter.id_number }}'
          }
        }
      },
      {
        "name": 'Stop an A/B test',
        "value": 'stopABTest',
        "action": 'Stop an A/B test',
        "description": 'Stops an A/B test by its ID.',
        "routing": {
          "request": {
            "method": 'POST',
            "url": '=/2/abtests/{{ $parameter.id_number }}/stop'
          }
        }
      },
      {
        "name": 'Schedule an A/B test',
        "value": 'scheduleABTest',
        "action": 'Schedule an A/B test',
        "description": 'Schedule an A/B test to be started at a later time.',
        "routing": {
          "request": {
            "method": 'POST',
            "url": '=/2/abtests/schedule'
          }
        }
      },
      {
        "name": 'Estimate the sample size and duration of an A/B test',
        "value": 'estimateABTest',
        "action": 'Estimate the sample size and duration of an A/B test',
        "description": 'Given the traffic percentage and the expected effect size, this endpoint estimates the sample size and duration of an A/B test based on historical traffic.',
        "routing": {
          "request": {
            "method": 'POST',
            "url": '=/2/abtests/estimate'
          }
        }
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'abtest'
        ]
      }
    }
  },
  {
    "displayName": 'Simplify',
    "name": 'simplify',
    "type": 'boolean',
    "default": false,
    "description": 'Whether to return a simplified version of the response instead of the raw data',
    "displayOptions": {
      "show": {
        "resource": [
          'abtest'
        ],
        "operation": [
          'getABTest'
        ]
      }
    }
  },
  {
    "displayName": 'Add ABTests Request',
    "name": 'add_abtests_request_object',
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
        "name": 'Variants',
        "value": 'variants_json'
      },
      {
        "name": 'End At',
        "value": 'endAt_string'
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'abtest'
        ],
        "operation": [
          'addABTests'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": 'Custom ranking sales rank test',
    "default": '',
    "description": 'A/B test name.',
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
        "add_abtests_request_object": [
          'name_string'
        ],
        "resource": [
          'abtest'
        ],
        "operation": [
          'addABTests'
        ]
      }
    },
    "required": true
  },
  {
    "type": 'json',
    "displayName": 'Variants',
    "name": 'variants_json',
    "default": '[]',
    "description": 'A/B test variants.',
    "required": true,
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ JSON.parse($value) }}',
        "property": 'variants'
      }
    },
    "displayOptions": {
      "show": {
        "add_abtests_request_object": [
          'variants_json'
        ],
        "resource": [
          'abtest'
        ],
        "operation": [
          'addABTests'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '2023-06-17T00:00:00Z',
    "default": '',
    "description": 'End date and time of the A/B test, in RFC 3339 format.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'endAt'
      }
    },
    "displayName": 'End At',
    "name": 'endAt_string',
    "displayOptions": {
      "show": {
        "add_abtests_request_object": [
          'endAt_string'
        ],
        "resource": [
          'abtest'
        ],
        "operation": [
          'addABTests'
        ]
      }
    },
    "required": true
  },
  {
    "type": 'number',
    "default": '',
    "typeOptions": {
      "minValue": 0
    },
    "routing": {
      "request": {
        "qs": {
          "offset": '={{ $value }}'
        }
      }
    },
    "displayName": 'Offset',
    "name": 'offset_number',
    "displayOptions": {
      "show": {
        "resource": [
          'abtest'
        ],
        "operation": [
          'listABTests'
        ]
      }
    }
  },
  {
    "type": 'number',
    "default": 10,
    "routing": {
      "request": {
        "qs": {
          "limit": '={{ $value }}'
        }
      }
    },
    "displayName": 'Limit',
    "name": 'limit_number',
    "displayOptions": {
      "show": {
        "resource": [
          'abtest'
        ],
        "operation": [
          'listABTests'
        ]
      }
    }
  },
  {
    "type": 'string',
    "default": '',
    "routing": {
      "request": {
        "qs": {
          "indexPrefix": '={{ $value }}'
        }
      }
    },
    "displayName": 'Index Prefix',
    "name": 'indexPrefix_string',
    "displayOptions": {
      "show": {
        "resource": [
          'abtest'
        ],
        "operation": [
          'listABTests'
        ]
      }
    }
  },
  {
    "type": 'string',
    "default": '',
    "routing": {
      "request": {
        "qs": {
          "indexSuffix": '={{ $value }}'
        }
      }
    },
    "displayName": 'Index Suffix',
    "name": 'indexSuffix_string',
    "displayOptions": {
      "show": {
        "resource": [
          'abtest'
        ],
        "operation": [
          'listABTests'
        ]
      }
    }
  },
  {
    "type": 'number',
    "placeholder": '224',
    "default": '',
    "description": 'Unique A/B test identifier.',
    "displayName": 'Id',
    "name": 'id_number',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'abtest'
        ],
        "operation": [
          'getABTest'
        ]
      }
    }
  },
  {
    "type": 'number',
    "placeholder": '224',
    "default": '',
    "description": 'Unique A/B test identifier.',
    "displayName": 'Id',
    "name": 'id_number',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'abtest'
        ],
        "operation": [
          'deleteABTest'
        ]
      }
    }
  },
  {
    "type": 'number',
    "placeholder": '224',
    "default": '',
    "description": 'Unique A/B test identifier.',
    "displayName": 'Id',
    "name": 'id_number',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'abtest'
        ],
        "operation": [
          'stopABTest'
        ]
      }
    }
  },
  {
    "displayName": 'Schedule ABTests Request',
    "name": 'schedule_abtests_request_object',
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
        "name": 'Variants',
        "value": 'variants_json'
      },
      {
        "name": 'Scheduled At',
        "value": 'scheduledAt_string'
      },
      {
        "name": 'End At',
        "value": 'endAt_string'
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'abtest'
        ],
        "operation": [
          'scheduleABTest'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": 'Custom ranking sales rank test',
    "default": '',
    "description": 'A/B test name.',
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
        "schedule_abtests_request_object": [
          'name_string'
        ],
        "resource": [
          'abtest'
        ],
        "operation": [
          'scheduleABTest'
        ]
      }
    },
    "required": true
  },
  {
    "type": 'json',
    "displayName": 'Variants',
    "name": 'variants_json',
    "default": '[]',
    "description": 'A/B test variants.',
    "required": true,
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ JSON.parse($value) }}',
        "property": 'variants'
      }
    },
    "displayOptions": {
      "show": {
        "schedule_abtests_request_object": [
          'variants_json'
        ],
        "resource": [
          'abtest'
        ],
        "operation": [
          'scheduleABTest'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '2023-06-15T15:06:44.400601Z',
    "default": '',
    "description": 'Date and time when the A/B test is scheduled to start, in RFC 3339 format.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'scheduledAt'
      }
    },
    "displayName": 'Scheduled At',
    "name": 'scheduledAt_string',
    "displayOptions": {
      "show": {
        "schedule_abtests_request_object": [
          'scheduledAt_string'
        ],
        "resource": [
          'abtest'
        ],
        "operation": [
          'scheduleABTest'
        ]
      }
    },
    "required": true
  },
  {
    "type": 'string',
    "placeholder": '2023-06-17T00:00:00Z',
    "default": '',
    "description": 'End date and time of the A/B test, in RFC 3339 format.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'endAt'
      }
    },
    "displayName": 'End At',
    "name": 'endAt_string',
    "displayOptions": {
      "show": {
        "schedule_abtests_request_object": [
          'endAt_string'
        ],
        "resource": [
          'abtest'
        ],
        "operation": [
          'scheduleABTest'
        ]
      }
    },
    "required": true
  },
  {
    "displayName": 'Estimate ABTest Request',
    "name": 'estimate_abtest_request_object',
    "type": 'multiOptions',
    "description": undefined,
    "required": true,
    "default": [],
    "options": [
      {
        "name": 'Estimate Configuration',
        "value": 'estimate_configuration_object'
      },
      {
        "name": 'Variants',
        "value": 'variants_json'
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'abtest'
        ],
        "operation": [
          'estimateABTest'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'A/B test configuration for estimating the sample size and duration using minimum detectable effect.',
    "required": true,
    "default": '{}',
    "routing": {
      "send": {
        "type": 'body',
        "property": 'configuration',
        "value": '={{ JSON.parse($value) }}'
      }
    },
    "displayName": 'Estimate Configuration',
    "name": 'estimate_configuration_object',
    "displayOptions": {
      "show": {
        "estimate_abtest_request_object": [
          'estimate_configuration_object'
        ],
        "resource": [
          'abtest'
        ],
        "operation": [
          'estimateABTest'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Variants',
    "name": 'variants_json',
    "default": '[]',
    "description": 'A/B test variants.',
    "required": true,
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ JSON.parse($value) }}',
        "property": 'variants'
      }
    },
    "displayOptions": {
      "show": {
        "estimate_abtest_request_object": [
          'variants_json'
        ],
        "resource": [
          'abtest'
        ],
        "operation": [
          'estimateABTest'
        ]
      }
    }
  }
];

export default properties;
