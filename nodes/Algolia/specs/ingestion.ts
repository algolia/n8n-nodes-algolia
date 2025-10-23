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
        "name": 'authentications',
        "value": 'authentications',
        "description": 'Authentication resources describe how to connect to a source or destination'
      },
      {
        "name": 'destinations',
        "value": 'destinations',
        "description": 'Destinations are Algolia products or features where your data should be used, such as a search index or events'
      },
      {
        "name": 'observability',
        "value": 'observability',
        "description": 'Check the status and details of your task runs'
      },
      {
        "name": 'sources',
        "value": 'sources',
        "description": 'Sources are third-party platforms or services from where you want to ingest your data'
      },
      {
        "name": 'tasks',
        "value": 'tasks',
        "description": 'Tasks contain information how your data should be read from a source and stored in a destination'
      },
      {
        "name": 'transformations',
        "value": 'transformations',
        "description": 'Transformations allows you to transform a record before it gets indexed in Algolia'
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
        "name": 'Push records by indexName',
        "value": 'push',
        "action": 'Push records by indexName',
        "description": 'Pushes records through the Pipeline, directly to an index. You can make the call synchronous by providing the `watch` parameter, for asynchronous calls, you can use the observability endpoints and/or debugger dashboard to see the status of your task.',
        "routing": {
          "request": {
            "method": 'POST',
            "url": '=/1/push/{{ $parameter.indexName_string }}'
          }
        }
      },
      {
        "name": 'List tasks',
        "value": 'listTasks',
        "action": 'List tasks',
        "description": 'Retrieves a list of tasks.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/2/tasks'
          }
        }
      },
      {
        "name": 'Create a task',
        "value": 'createTask',
        "action": 'Create a task',
        "description": 'Creates a new task.',
        "routing": {
          "request": {
            "method": 'POST',
            "url": '=/2/tasks'
          }
        }
      },
      {
        "name": 'Search for tasks',
        "value": 'searchTasks',
        "action": 'Search for tasks',
        "description": 'Searches for tasks.',
        "routing": {
          "request": {
            "method": 'POST',
            "url": '=/2/tasks/search'
          },
          "output": {
            "postReceive": [
              async function (items) {
              const simple = this.getNodeParameter('simplify', 0);
              if (!simple) return items;
              return items.map((item) => {
                const json = item.json || {};
                const simplified = new Map();
                ["action","createdAt","cron","cursor","destinationID","enabled","failureThreshold","input","lastRun","nextRun"].forEach((f) => {
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
            'action',
            'createdAt',
            'cron',
            'cursor',
            'destinationID',
            'enabled',
            'failureThreshold',
            'input',
            'lastRun',
            'nextRun'
          ]
        }
      },
      {
        "name": 'Retrieve a task',
        "value": 'getTask',
        "action": 'Retrieve a task',
        "description": 'Retrieves a task by its ID.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/2/tasks/{{ $parameter.taskID_string }}'
          },
          "output": {
            "postReceive": [
              async function (items) {
              const simple = this.getNodeParameter('simplify', 0);
              if (!simple) return items;
              return items.map((item) => {
                const json = item.json || {};
                const simplified = new Map();
                ["createdAt","destinationID","enabled","sourceID","taskID","updatedAt"].forEach((f) => {
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
            'createdAt',
            'destinationID',
            'enabled',
            'sourceID',
            'taskID',
            'updatedAt'
          ]
        }
      },
      {
        "name": 'Fully update a task',
        "value": 'replaceTask',
        "action": 'Fully update a task',
        "description": 'Fully updates a task by its ID, use partialUpdateTask if you only want to update a subset of fields.',
        "routing": {
          "request": {
            "method": 'PUT',
            "url": '=/2/tasks/{{ $parameter.taskID_string }}'
          }
        }
      },
      {
        "name": 'Partially update a task',
        "value": 'updateTask',
        "action": 'Partially update a task',
        "description": 'Partially updates a task by its ID.',
        "routing": {
          "request": {
            "method": 'PATCH',
            "url": '=/2/tasks/{{ $parameter.taskID_string }}'
          }
        }
      },
      {
        "name": 'Delete a task',
        "value": 'deleteTask',
        "action": 'Delete a task',
        "description": 'Deletes a task by its ID.',
        "routing": {
          "request": {
            "method": 'DELETE',
            "url": '=/2/tasks/{{ $parameter.taskID_string }}'
          }
        }
      },
      {
        "name": 'Run a task',
        "value": 'runTask',
        "action": 'Run a task',
        "description": 'Runs a task. You can check the status of task runs with the observability endpoints.',
        "routing": {
          "request": {
            "method": 'POST',
            "url": '=/2/tasks/{{ $parameter.taskID_string }}/run'
          }
        }
      },
      {
        "name": 'Push records by task ID',
        "value": 'pushTask',
        "action": 'Push records by task ID',
        "description": 'Pushes records through the pipeline, directly to an index. You can make the call synchronous by providing the `watch` parameter, for asynchronous calls, you can use the observability endpoints or the debugger dashboard to see the status of your task.',
        "routing": {
          "request": {
            "method": 'POST',
            "url": '=/2/tasks/{{ $parameter.taskID_string }}/push'
          }
        }
      },
      {
        "name": 'Enable a task',
        "value": 'enableTask',
        "action": 'Enable a task',
        "description": 'Enables a task.',
        "routing": {
          "request": {
            "method": 'PUT',
            "url": '=/2/tasks/{{ $parameter.taskID_string }}/enable'
          }
        }
      },
      {
        "name": 'Disable a task',
        "value": 'disableTask',
        "action": 'Disable a task',
        "description": 'Disables a task.',
        "routing": {
          "request": {
            "method": 'PUT',
            "url": '=/2/tasks/{{ $parameter.taskID_string }}/disable'
          }
        }
      },
      {
        "name": 'List tasks V1',
        "value": 'listTasksV1',
        "action": 'List tasks V1',
        "description": 'Retrieves a list of tasks using the v1 endpoint, please use `getTasks` instead.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/1/tasks'
          }
        }
      },
      {
        "name": 'Create a task V1',
        "value": 'createTaskV1',
        "action": 'Create a task V1',
        "description": 'Creates a new task using the v1 endpoint, please use `createTask` instead.',
        "routing": {
          "request": {
            "method": 'POST',
            "url": '=/1/tasks'
          }
        }
      },
      {
        "name": 'Search for tasks V1',
        "value": 'searchTasksV1',
        "action": 'Search for tasks V1',
        "description": 'Searches for tasks using the v1 endpoint, please use `searchTasks` instead.',
        "routing": {
          "request": {
            "method": 'POST',
            "url": '=/1/tasks/search'
          },
          "output": {
            "postReceive": [
              async function (items) {
              const simple = this.getNodeParameter('simplify', 0);
              if (!simple) return items;
              return items.map((item) => {
                const json = item.json || {};
                const simplified = new Map();
                ["action","createdAt","cursor","destinationID","enabled","failureThreshold","input","notifications","policies","sourceID"].forEach((f) => {
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
            'action',
            'createdAt',
            'cursor',
            'destinationID',
            'enabled',
            'failureThreshold',
            'input',
            'notifications',
            'policies',
            'sourceID'
          ]
        }
      },
      {
        "name": 'Retrieve a task V1',
        "value": 'getTaskV1',
        "action": 'Retrieve a task V1',
        "description": 'Retrieves a task by its ID using the v1 endpoint, please use `getTask` instead.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/1/tasks/{{ $parameter.taskID_string }}'
          },
          "output": {
            "postReceive": [
              async function (items) {
              const simple = this.getNodeParameter('simplify', 0);
              if (!simple) return items;
              return items.map((item) => {
                const json = item.json || {};
                const simplified = new Map();
                ["createdAt","destinationID","enabled","sourceID","taskID","trigger","updatedAt"].forEach((f) => {
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
            'createdAt',
            'destinationID',
            'enabled',
            'sourceID',
            'taskID',
            'trigger',
            'updatedAt'
          ]
        }
      },
      {
        "name": 'Update a task V1',
        "value": 'updateTaskV1',
        "action": 'Update a task V1',
        "description": 'Updates a task by its ID using the v1 endpoint, please use `updateTask` instead.',
        "routing": {
          "request": {
            "method": 'PATCH',
            "url": '=/1/tasks/{{ $parameter.taskID_string }}'
          }
        }
      },
      {
        "name": 'Delete a task',
        "value": 'deleteTaskV1',
        "action": 'Delete a task',
        "description": 'Deletes a task by its ID using the v1 endpoint, please use `deleteTask` instead.',
        "routing": {
          "request": {
            "method": 'DELETE',
            "url": '=/1/tasks/{{ $parameter.taskID_string }}'
          }
        }
      },
      {
        "name": 'Run a task V1',
        "value": 'runTaskV1',
        "action": 'Run a task V1',
        "description": 'Runs a task using the v1 endpoint, please use `runTask` instead. You can check the status of task runs with the observability endpoints.',
        "routing": {
          "request": {
            "method": 'POST',
            "url": '=/1/tasks/{{ $parameter.taskID_string }}/run'
          }
        }
      },
      {
        "name": 'Enable a task V1',
        "value": 'enableTaskV1',
        "action": 'Enable a task V1',
        "description": 'Enables a task using the v1 endpoint, please use `enableTask` instead.',
        "routing": {
          "request": {
            "method": 'PUT',
            "url": '=/1/tasks/{{ $parameter.taskID_string }}/enable'
          }
        }
      },
      {
        "name": 'Disable a task V1',
        "value": 'disableTaskV1',
        "action": 'Disable a task V1',
        "description": 'Disables a task using the v1 endpoint, please use `disableTask` instead.',
        "routing": {
          "request": {
            "method": 'PUT',
            "url": '=/1/tasks/{{ $parameter.taskID_string }}/disable'
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
    "displayName": 'Simplify',
    "name": 'simplify',
    "type": 'boolean',
    "default": false,
    "description": 'Whether to return a simplified version of the response instead of the raw data',
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'searchTasks',
          'getTask',
          'searchTasksV1',
          'getTaskV1'
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
        "name": 'List authentication resources',
        "value": 'listAuthentications',
        "action": 'List authentication resources',
        "description": 'Retrieves a list of all authentication resources.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/1/authentications'
          }
        }
      },
      {
        "name": 'Create an authentication resource',
        "value": 'createAuthentication',
        "action": 'Create an authentication resource',
        "description": 'Creates a new authentication resource.',
        "routing": {
          "request": {
            "method": 'POST',
            "url": '=/1/authentications'
          }
        }
      },
      {
        "name": 'Search for authentication resources',
        "value": 'searchAuthentications',
        "action": 'Search for authentication resources',
        "description": 'Searches for authentication resources.',
        "routing": {
          "request": {
            "method": 'POST',
            "url": '=/1/authentications/search'
          }
        }
      },
      {
        "name": 'Retrieve an authentication resource',
        "value": 'getAuthentication',
        "action": 'Retrieve an authentication resource',
        "description": 'Retrieves an authentication resource by its ID.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/1/authentications/{{ $parameter.authenticationID_string }}'
          }
        }
      },
      {
        "name": 'Update an authentication resource',
        "value": 'updateAuthentication',
        "action": 'Update an authentication resource',
        "description": 'Updates an authentication resource.',
        "routing": {
          "request": {
            "method": 'PATCH',
            "url": '=/1/authentications/{{ $parameter.authenticationID_string }}'
          }
        }
      },
      {
        "name": 'Delete an authentication resource',
        "value": 'deleteAuthentication',
        "action": 'Delete an authentication resource',
        "description": 'Deletes an authentication resource. You can\'t delete authentication resources that are used by a source or a destination.',
        "routing": {
          "request": {
            "method": 'DELETE',
            "url": '=/1/authentications/{{ $parameter.authenticationID_string }}'
          }
        }
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'authentications'
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
        "name": 'List destinations',
        "value": 'listDestinations',
        "action": 'List destinations',
        "description": 'Retrieves a list of destinations.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/1/destinations'
          }
        }
      },
      {
        "name": 'Create a destination',
        "value": 'createDestination',
        "action": 'Create a destination',
        "description": 'Creates a new destination.',
        "routing": {
          "request": {
            "method": 'POST',
            "url": '=/1/destinations'
          }
        }
      },
      {
        "name": 'Search for destinations',
        "value": 'searchDestinations',
        "action": 'Search for destinations',
        "description": 'Searches for destinations.',
        "routing": {
          "request": {
            "method": 'POST',
            "url": '=/1/destinations/search'
          }
        }
      },
      {
        "name": 'Retrieve a destination',
        "value": 'getDestination',
        "action": 'Retrieve a destination',
        "description": 'Retrieves a destination by its ID.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/1/destinations/{{ $parameter.destinationID_string }}'
          }
        }
      },
      {
        "name": 'Update a destination',
        "value": 'updateDestination',
        "action": 'Update a destination',
        "description": 'Updates the destination by its ID.',
        "routing": {
          "request": {
            "method": 'PATCH',
            "url": '=/1/destinations/{{ $parameter.destinationID_string }}'
          }
        }
      },
      {
        "name": 'Delete a destination',
        "value": 'deleteDestination',
        "action": 'Delete a destination',
        "description": 'Deletes a destination by its ID. You can\'t delete destinations that are referenced in tasks.',
        "routing": {
          "request": {
            "method": 'DELETE',
            "url": '=/1/destinations/{{ $parameter.destinationID_string }}'
          }
        }
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'destinations'
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
        "name": 'List sources',
        "value": 'listSources',
        "action": 'List sources',
        "description": 'Retrieves a list of sources.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/1/sources'
          }
        }
      },
      {
        "name": 'Create a source',
        "value": 'createSource',
        "action": 'Create a source',
        "description": 'Creates a new source.',
        "routing": {
          "request": {
            "method": 'POST',
            "url": '=/1/sources'
          }
        }
      },
      {
        "name": 'Validate a source payload',
        "value": 'validateSource',
        "action": 'Validate a source payload',
        "description": 'Validates a source payload to ensure it can be created and that the data source can be reached by Algolia.',
        "routing": {
          "request": {
            "method": 'POST',
            "url": '=/1/sources/validate'
          }
        }
      },
      {
        "name": 'Search for sources',
        "value": 'searchSources',
        "action": 'Search for sources',
        "description": 'Searches for sources.',
        "routing": {
          "request": {
            "method": 'POST',
            "url": '=/1/sources/search'
          }
        }
      },
      {
        "name": 'Retrieve a source',
        "value": 'getSource',
        "action": 'Retrieve a source',
        "description": 'Retrieve a source by its ID.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/1/sources/{{ $parameter.sourceID_string }}'
          }
        }
      },
      {
        "name": 'Update a source',
        "value": 'updateSource',
        "action": 'Update a source',
        "description": 'Updates a source by its ID.',
        "routing": {
          "request": {
            "method": 'PATCH',
            "url": '=/1/sources/{{ $parameter.sourceID_string }}'
          }
        }
      },
      {
        "name": 'Delete a source',
        "value": 'deleteSource',
        "action": 'Delete a source',
        "description": 'Deletes a source by its ID. You can\'t delete sources that are referenced in tasks.',
        "routing": {
          "request": {
            "method": 'DELETE',
            "url": '=/1/sources/{{ $parameter.sourceID_string }}'
          }
        }
      },
      {
        "name": 'Validate an update of a source payload',
        "value": 'validateSourceBeforeUpdate',
        "action": 'Validate an update of a source payload',
        "description": 'Validates an update of a source payload to ensure it can be created and that the data source can be reached by Algolia.',
        "routing": {
          "request": {
            "method": 'POST',
            "url": '=/1/sources/{{ $parameter.sourceID_string }}/validate'
          }
        }
      },
      {
        "name": 'Trigger a stream-listing request',
        "value": 'triggerDockerSourceDiscover',
        "action": 'Trigger a stream-listing request',
        "description": 'Triggers a stream-listing request for a source.',
        "routing": {
          "request": {
            "method": 'POST',
            "url": '=/1/sources/{{ $parameter.sourceID_string }}/discover'
          }
        }
      },
      {
        "name": 'Run all tasks linked to a source',
        "value": 'runSource',
        "action": 'Run all tasks linked to a source',
        "description": 'Runs all tasks linked to a source, only available for Shopify, BigCommerce and commercetools sources. Creates one run per task.',
        "routing": {
          "request": {
            "method": 'POST',
            "url": '=/1/sources/{{ $parameter.sourceID_string }}/run'
          }
        }
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'sources'
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
        "name": 'List transformations',
        "value": 'listTransformations',
        "action": 'List transformations',
        "description": 'Retrieves a list of transformations.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/1/transformations'
          }
        }
      },
      {
        "name": 'Create a transformation',
        "value": 'createTransformation',
        "action": 'Create a transformation',
        "description": 'Creates a new transformation.',
        "routing": {
          "request": {
            "method": 'POST',
            "url": '=/1/transformations'
          }
        }
      },
      {
        "name": 'Try a transformation before creating it',
        "value": 'tryTransformation',
        "action": 'Try a transformation before creating it',
        "description": 'Try a transformation before creating it.',
        "routing": {
          "request": {
            "method": 'POST',
            "url": '=/1/transformations/try'
          }
        }
      },
      {
        "name": 'Search for transformations',
        "value": 'searchTransformations',
        "action": 'Search for transformations',
        "description": 'Searches for transformations.',
        "routing": {
          "request": {
            "method": 'POST',
            "url": '=/1/transformations/search'
          }
        }
      },
      {
        "name": 'Retrieve a transformation',
        "value": 'getTransformation',
        "action": 'Retrieve a transformation',
        "description": 'Retrieves a transformation by its ID.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/1/transformations/{{ $parameter.transformationID_string }}'
          }
        }
      },
      {
        "name": 'Update a transformation',
        "value": 'updateTransformation',
        "action": 'Update a transformation',
        "description": 'Updates a transformation by its ID.',
        "routing": {
          "request": {
            "method": 'PUT',
            "url": '=/1/transformations/{{ $parameter.transformationID_string }}'
          }
        }
      },
      {
        "name": 'Delete a transformation',
        "value": 'deleteTransformation',
        "action": 'Delete a transformation',
        "description": 'Deletes a transformation by its ID.',
        "routing": {
          "request": {
            "method": 'DELETE',
            "url": '=/1/transformations/{{ $parameter.transformationID_string }}'
          }
        }
      },
      {
        "name": 'Try a transformation before updating it',
        "value": 'tryTransformationBeforeUpdate',
        "action": 'Try a transformation before updating it',
        "description": 'Try a transformation before updating it.',
        "routing": {
          "request": {
            "method": 'POST',
            "url": '=/1/transformations/{{ $parameter.transformationID_string }}/try'
          }
        }
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'transformations'
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
        "name": 'List task runs',
        "value": 'listRuns',
        "action": 'List task runs',
        "description": 'Retrieve a list of task runs.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/1/runs'
          }
        }
      },
      {
        "name": 'Retrieve a task run',
        "value": 'getRun',
        "action": 'Retrieve a task run',
        "description": 'Retrieve a single task run by its ID.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/1/runs/{{ $parameter.runID_string }}'
          },
          "output": {
            "postReceive": [
              async function (items) {
              const simple = this.getNodeParameter('simplify', 0);
              if (!simple) return items;
              return items.map((item) => {
                const json = item.json || {};
                const simplified = new Map();
                ["appID","createdAt","runID","status","taskID","type"].forEach((f) => {
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
            'appID',
            'createdAt',
            'runID',
            'status',
            'taskID',
            'type'
          ]
        }
      },
      {
        "name": 'List task run events',
        "value": 'listEvents',
        "action": 'List task run events',
        "description": 'Retrieves a list of events for a task run, identified by its ID.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/1/runs/{{ $parameter.runID_string }}/events'
          }
        }
      },
      {
        "name": 'Retrieve a task run event',
        "value": 'getEvent',
        "action": 'Retrieve a task run event',
        "description": 'Retrieves a single task run event by its ID.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/1/runs/{{ $parameter.runID_string }}/events/{{ $parameter.eventID_string }}'
          }
        }
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'observability'
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
          'observability'
        ],
        "operation": [
          'getRun'
        ]
      }
    }
  },
  {
    "type": 'options',
    "placeholder": 'ALGOLIA_INDEX_NAME',
    "default": '',
    "displayName": 'Index Name',
    "name": 'indexName_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'push'
        ]
      }
    },
    "typeOptions": {
      "loadOptions": {
        "routing": {
          "request": {
            "method": 'GET',
            "url": '/1/indexes'
          },
          "output": {
            "postReceive": [
              {
                "type": 'rootProperty',
                "properties": {
                  "property": 'items'
                }
              },
              {
                "type": 'setKeyValue',
                "properties": {
                  "name": '={{ $responseItem.name }}',
                  "value": '={{ $responseItem.name }}'
                }
              }
            ]
          }
        }
      }
    }
  },
  {
    "type": 'boolean',
    "default": false,
    "routing": {
      "request": {
        "qs": {
          "watch": '={{ $value }}'
        }
      }
    },
    "displayName": 'Watch',
    "name": 'watch_boolean',
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'push'
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
          "referenceIndexName": '={{ $value }}'
        }
      }
    },
    "displayName": 'Reference Index Name',
    "name": 'referenceIndexName_string',
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'push'
        ]
      }
    }
  },
  {
    "displayName": 'Push Task Payload',
    "name": 'push_task_payload_object',
    "type": 'multiOptions',
    "description": undefined,
    "required": true,
    "default": [],
    "options": [
      {
        "name": 'Action',
        "value": 'action_options'
      },
      {
        "name": 'Records',
        "value": 'records_json'
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'push'
        ]
      }
    }
  },
  {
    "type": 'options',
    "default": '',
    "description": 'Which indexing operation to perform:\n\n- `addObject`: adds records to an index.\n   Equivalent to the "Add a new record (with auto-generated object ID)" operation.\n- `updateObject`: adds or replaces records in an index.\n   Equivalent to the "Add or replace a record" operation.\n- `partialUpdateObject`: adds or updates attributes within records.\n   Equivalent to the "Add or update attributes" operation with the `createIfNoExists` parameter set to true.\n   (If a record with the specified `objectID` doesn\'t exist in the specified index, this action creates adds the record to the index)\n- `partialUpdateObjectNoCreate`: same as `partialUpdateObject`, but with `createIfNoExists` set to false.\n   (A record isn\'t added to the index if its `objectID` doesn\'t exist)\n- `deleteObject`: delete records from an index.\n  Equivalent to the "Delete a record" operation.\n- `delete`. Delete an index. Equivalent to the "Delete an index" operation.\n- `clear`: delete all records from an index. Equivalent to the "Delete all records from an index operation".\n',
    "options": [
      {
        "name": 'addObject',
        "value": 'addObject'
      },
      {
        "name": 'updateObject',
        "value": 'updateObject'
      },
      {
        "name": 'partialUpdateObject',
        "value": 'partialUpdateObject'
      },
      {
        "name": 'partialUpdateObjectNoCreate',
        "value": 'partialUpdateObjectNoCreate'
      },
      {
        "name": 'deleteObject',
        "value": 'deleteObject'
      },
      {
        "name": 'delete',
        "value": 'delete'
      },
      {
        "name": 'clear',
        "value": 'clear'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'action'
      }
    },
    "displayName": 'Action',
    "name": 'action_options',
    "displayOptions": {
      "show": {
        "push_task_payload_object": [
          'action_options'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'push'
        ]
      }
    },
    "required": true
  },
  {
    "type": 'json',
    "displayName": 'Records',
    "name": 'records_json',
    "default": '[]',
    "description": undefined,
    "required": true,
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ JSON.parse($value) }}',
        "property": 'records'
      }
    },
    "displayOptions": {
      "show": {
        "push_task_payload_object": [
          'records_json'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'push'
        ]
      }
    }
  },
  {
    "type": 'number',
    "default": 10,
    "description": 'Number of items per page.',
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
          'authentications'
        ],
        "operation": [
          'listAuthentications'
        ]
      }
    }
  },
  {
    "type": 'number',
    "default": '',
    "description": 'Page of the API response to retrieve.',
    "typeOptions": {
      "minValue": 1
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
          'authentications'
        ],
        "operation": [
          'listAuthentications'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Type',
    "name": 'type_json',
    "default": '[]',
    "description": undefined,
    "required": false,
    "routing": {
      "request": {
        "qs": {
          "type": '={{ JSON.parse($value) }}'
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'authentications'
        ],
        "operation": [
          'listAuthentications'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Platform',
    "name": 'platform_json',
    "default": '[]',
    "description": undefined,
    "required": false,
    "routing": {
      "request": {
        "qs": {
          "platform": '={{ JSON.parse($value) }}'
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'authentications'
        ],
        "operation": [
          'listAuthentications'
        ]
      }
    }
  },
  {
    "type": 'options',
    "default": 'createdAt',
    "description": 'Property by which to sort the list of authentications.',
    "options": [
      {
        "name": 'name',
        "value": 'name'
      },
      {
        "name": 'type',
        "value": 'type'
      },
      {
        "name": 'platform',
        "value": 'platform'
      },
      {
        "name": 'updatedAt',
        "value": 'updatedAt'
      },
      {
        "name": 'createdAt',
        "value": 'createdAt'
      }
    ],
    "routing": {
      "request": {
        "qs": {
          "sort": '={{ $value }}'
        }
      }
    },
    "displayName": 'Sort',
    "name": 'sort_options',
    "displayOptions": {
      "show": {
        "resource": [
          'authentications'
        ],
        "operation": [
          'listAuthentications'
        ]
      }
    }
  },
  {
    "type": 'options',
    "default": 'desc',
    "description": 'Ascending or descending sort order.',
    "options": [
      {
        "name": 'asc',
        "value": 'asc'
      },
      {
        "name": 'desc',
        "value": 'desc'
      }
    ],
    "routing": {
      "request": {
        "qs": {
          "order": '={{ $value }}'
        }
      }
    },
    "displayName": 'Order',
    "name": 'order_options',
    "displayOptions": {
      "show": {
        "resource": [
          'authentications'
        ],
        "operation": [
          'listAuthentications'
        ]
      }
    }
  },
  {
    "displayName": 'Authentication Create',
    "name": 'authentication_create_object',
    "type": 'multiOptions',
    "description": 'Request body for creating a new authentication resource.',
    "required": true,
    "default": [],
    "options": [
      {
        "name": 'Type',
        "value": 'type_options'
      },
      {
        "name": 'Name',
        "value": 'name_string'
      },
      {
        "name": 'Platform',
        "value": 'platform'
      },
      {
        "name": 'Input',
        "value": 'input'
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'authentications'
        ],
        "operation": [
          'createAuthentication'
        ]
      }
    }
  },
  {
    "type": 'options',
    "default": '',
    "description": 'Type of authentication. This determines the type of credentials required in the `input` object.',
    "options": [
      {
        "name": 'googleServiceAccount',
        "value": 'googleServiceAccount'
      },
      {
        "name": 'basic',
        "value": 'basic'
      },
      {
        "name": 'apiKey',
        "value": 'apiKey'
      },
      {
        "name": 'oauth',
        "value": 'oauth'
      },
      {
        "name": 'algolia',
        "value": 'algolia'
      },
      {
        "name": 'algoliaInsights',
        "value": 'algoliaInsights'
      },
      {
        "name": 'secrets',
        "value": 'secrets'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'type'
      }
    },
    "displayName": 'Type',
    "name": 'type_options',
    "displayOptions": {
      "show": {
        "authentication_create_object": [
          'type_options'
        ],
        "resource": [
          'authentications'
        ],
        "operation": [
          'createAuthentication'
        ]
      }
    },
    "required": true
  },
  {
    "type": 'string',
    "default": '',
    "description": 'Descriptive name for the resource.',
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
        "authentication_create_object": [
          'name_string'
        ],
        "resource": [
          'authentications'
        ],
        "operation": [
          'createAuthentication'
        ]
      }
    },
    "required": true
  },
  {
    "type": 'options',
    "name": 'platform',
    "displayName": 'Platform',
    "default": '',
    "options": [
      {
        "name": 'String',
        "value": 'string'
      },
      {
        "name": 'Null',
        "value": 'null'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "property": 'platform',
        "value": '={{ typeof $parameter.platform_options !== "undefined" ? $parameter.platform_options : typeof $parameter.platform_null !== "undefined" ? JSON.parse($parameter.platform_null) : undefined }}'
      }
    },
    "displayOptions": {
      "show": {
        "authentication_create_object": [
          'platform'
        ],
        "resource": [
          'authentications'
        ],
        "operation": [
          'createAuthentication'
        ]
      }
    }
  },
  {
    "type": 'options',
    "default": '',
    "description": 'Name of an ecommerce platform with which to authenticate.\nThis determines which authentication type you can select.\n',
    "options": [
      {
        "name": 'bigcommerce',
        "value": 'bigcommerce'
      },
      {
        "name": 'commercetools',
        "value": 'commercetools'
      },
      {
        "name": 'shopify',
        "value": 'shopify'
      }
    ],
    "displayName": 'Platform (String)',
    "name": 'platform_options',
    "displayOptions": {
      "show": {
        "authentication_create_object": [
          'platform'
        ],
        "platform": [
          'string'
        ],
        "resource": [
          'authentications'
        ],
        "operation": [
          'createAuthentication'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Platform (Null)',
    "name": 'platform_null',
    "default": 'null',
    "description": undefined,
    "required": false,
    "disabledOptions": {
      "show": {
        "platform": [
          'null'
        ]
      }
    },
    "displayOptions": {
      "show": {
        "authentication_create_object": [
          'platform'
        ],
        "platform": [
          'null'
        ],
        "resource": [
          'authentications'
        ],
        "operation": [
          'createAuthentication'
        ]
      }
    }
  },
  {
    "type": 'options',
    "name": 'input',
    "displayName": 'Input',
    "default": '',
    "options": [
      {
        "name": 'Auth google service account',
        "value": 'auth_google_service_account'
      },
      {
        "name": 'Auth basic',
        "value": 'auth_basic'
      },
      {
        "name": 'Auth aPIKey',
        "value": 'auth_apikey'
      },
      {
        "name": 'Auth oAuth',
        "value": 'auth_oauth'
      },
      {
        "name": 'Auth algolia',
        "value": 'auth_algolia'
      },
      {
        "name": 'Auth algolia insights',
        "value": 'auth_algolia_insights'
      },
      {
        "name": 'Auth secrets',
        "value": 'auth_secrets'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "property": 'input',
        "value": '={{ typeof $parameter.auth_google_service_account_object !== "undefined" ? JSON.parse($parameter.auth_google_service_account_object) : typeof $parameter.auth_basic_object !== "undefined" ? JSON.parse($parameter.auth_basic_object) : typeof $parameter.auth_apikey_object !== "undefined" ? JSON.parse($parameter.auth_apikey_object) : typeof $parameter.auth_oauth_object !== "undefined" ? JSON.parse($parameter.auth_oauth_object) : typeof $parameter.auth_algolia_object !== "undefined" ? JSON.parse($parameter.auth_algolia_object) : typeof $parameter.auth_algolia_insights_object !== "undefined" ? JSON.parse($parameter.auth_algolia_insights_object) : typeof $parameter.auth_secrets_object !== "undefined" ? JSON.parse($parameter.auth_secrets_object) : undefined }}'
      }
    },
    "displayOptions": {
      "show": {
        "authentication_create_object": [
          'input'
        ],
        "resource": [
          'authentications'
        ],
        "operation": [
          'createAuthentication'
        ]
      }
    },
    "required": true
  },
  {
    "type": 'json',
    "description": 'Credentials for authenticating with a Google service account, such as BigQuery.',
    "required": true,
    "default": '{}',
    "displayName": 'Auth Google Service Account',
    "name": 'auth_google_service_account_object',
    "displayOptions": {
      "show": {
        "authentication_create_object": [
          'input'
        ],
        "input": [
          'auth_google_service_account'
        ],
        "resource": [
          'authentications'
        ],
        "operation": [
          'createAuthentication'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Credentials for authenticating with user name and password.',
    "required": true,
    "default": '{}',
    "displayName": 'Auth Basic',
    "name": 'auth_basic_object',
    "displayOptions": {
      "show": {
        "authentication_create_object": [
          'input'
        ],
        "input": [
          'auth_basic'
        ],
        "resource": [
          'authentications'
        ],
        "operation": [
          'createAuthentication'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Credentials for authenticating with an API key.',
    "required": true,
    "default": '{}',
    "displayName": 'Auth APIKey',
    "name": 'auth_apikey_object',
    "displayOptions": {
      "show": {
        "authentication_create_object": [
          'input'
        ],
        "input": [
          'auth_apikey'
        ],
        "resource": [
          'authentications'
        ],
        "operation": [
          'createAuthentication'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Credentials for authenticating with OAuth 2.0.',
    "required": true,
    "default": '{}',
    "displayName": 'Auth OAuth',
    "name": 'auth_oauth_object',
    "displayOptions": {
      "show": {
        "authentication_create_object": [
          'input'
        ],
        "input": [
          'auth_oauth'
        ],
        "resource": [
          'authentications'
        ],
        "operation": [
          'createAuthentication'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Credentials for authenticating with Algolia.',
    "required": true,
    "default": '{}',
    "displayName": 'Auth Algolia',
    "name": 'auth_algolia_object',
    "displayOptions": {
      "show": {
        "authentication_create_object": [
          'input'
        ],
        "input": [
          'auth_algolia'
        ],
        "resource": [
          'authentications'
        ],
        "operation": [
          'createAuthentication'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Credentials for authenticating with the Algolia Insights API.',
    "required": true,
    "default": '{}',
    "displayName": 'Auth Algolia Insights',
    "name": 'auth_algolia_insights_object',
    "displayOptions": {
      "show": {
        "authentication_create_object": [
          'input'
        ],
        "input": [
          'auth_algolia_insights'
        ],
        "resource": [
          'authentications'
        ],
        "operation": [
          'createAuthentication'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'A key:value authentication for your transformations.',
    "required": false,
    "default": '{}',
    "displayName": 'Auth Secrets',
    "name": 'auth_secrets_object',
    "displayOptions": {
      "show": {
        "authentication_create_object": [
          'input'
        ],
        "input": [
          'auth_secrets'
        ],
        "resource": [
          'authentications'
        ],
        "operation": [
          'createAuthentication'
        ]
      }
    }
  },
  {
    "displayName": 'Authentication Search',
    "name": 'authentication_search_object',
    "type": 'multiOptions',
    "description": 'Request body for searching for authentication resources.',
    "required": true,
    "default": [],
    "options": [
      {
        "name": 'Authentication IDs',
        "value": 'authenticationIDs_json'
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'authentications'
        ],
        "operation": [
          'searchAuthentications'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Authentication IDs',
    "name": 'authenticationIDs_json',
    "default": '[]',
    "description": undefined,
    "required": true,
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ JSON.parse($value) }}',
        "property": 'authenticationIDs'
      }
    },
    "displayOptions": {
      "show": {
        "authentication_search_object": [
          'authenticationIDs_json'
        ],
        "resource": [
          'authentications'
        ],
        "operation": [
          'searchAuthentications'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of an authentication resource.',
    "displayName": 'Authentication ID',
    "name": 'authenticationID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'authentications'
        ],
        "operation": [
          'getAuthentication'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of an authentication resource.',
    "displayName": 'Authentication ID',
    "name": 'authenticationID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'authentications'
        ],
        "operation": [
          'updateAuthentication'
        ]
      }
    }
  },
  {
    "displayName": 'Authentication Update',
    "name": 'authentication_update_object',
    "type": 'multiOptions',
    "description": 'Request body for updating an authentication resource.',
    "required": false,
    "default": [],
    "options": [
      {
        "name": 'Type',
        "value": 'type_options'
      },
      {
        "name": 'Name',
        "value": 'name_string'
      },
      {
        "name": 'Input',
        "value": 'input'
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'authentications'
        ],
        "operation": [
          'updateAuthentication'
        ]
      }
    }
  },
  {
    "type": 'options',
    "default": '',
    "description": 'Type of authentication. This determines the type of credentials required in the `input` object.',
    "options": [
      {
        "name": 'googleServiceAccount',
        "value": 'googleServiceAccount'
      },
      {
        "name": 'basic',
        "value": 'basic'
      },
      {
        "name": 'apiKey',
        "value": 'apiKey'
      },
      {
        "name": 'oauth',
        "value": 'oauth'
      },
      {
        "name": 'algolia',
        "value": 'algolia'
      },
      {
        "name": 'algoliaInsights',
        "value": 'algoliaInsights'
      },
      {
        "name": 'secrets',
        "value": 'secrets'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'type'
      }
    },
    "displayName": 'Type',
    "name": 'type_options',
    "displayOptions": {
      "show": {
        "authentication_update_object": [
          'type_options'
        ],
        "resource": [
          'authentications'
        ],
        "operation": [
          'updateAuthentication'
        ]
      }
    }
  },
  {
    "type": 'string',
    "default": '',
    "description": 'Descriptive name for the resource.',
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
        "authentication_update_object": [
          'name_string'
        ],
        "resource": [
          'authentications'
        ],
        "operation": [
          'updateAuthentication'
        ]
      }
    }
  },
  {
    "type": 'options',
    "name": 'input',
    "displayName": 'Input',
    "default": '',
    "options": [
      {
        "name": 'Auth google service account partial',
        "value": 'auth_google_service_account_partial'
      },
      {
        "name": 'Auth basic partial',
        "value": 'auth_basic_partial'
      },
      {
        "name": 'Auth aPIKey partial',
        "value": 'auth_apikey_partial'
      },
      {
        "name": 'Auth oAuth partial',
        "value": 'auth_oauth_partial'
      },
      {
        "name": 'Auth algolia partial',
        "value": 'auth_algolia_partial'
      },
      {
        "name": 'Auth algolia insights partial',
        "value": 'auth_algolia_insights_partial'
      },
      {
        "name": 'Auth secrets',
        "value": 'auth_secrets'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "property": 'input',
        "value": '={{ typeof $parameter.auth_google_service_account_partial_object !== "undefined" ? JSON.parse($parameter.auth_google_service_account_partial_object) : typeof $parameter.auth_basic_partial_object !== "undefined" ? JSON.parse($parameter.auth_basic_partial_object) : typeof $parameter.auth_apikey_partial_object !== "undefined" ? JSON.parse($parameter.auth_apikey_partial_object) : typeof $parameter.auth_oauth_partial_object !== "undefined" ? JSON.parse($parameter.auth_oauth_partial_object) : typeof $parameter.auth_algolia_partial_object !== "undefined" ? JSON.parse($parameter.auth_algolia_partial_object) : typeof $parameter.auth_algolia_insights_partial_object !== "undefined" ? JSON.parse($parameter.auth_algolia_insights_partial_object) : typeof $parameter.auth_secrets_object !== "undefined" ? JSON.parse($parameter.auth_secrets_object) : undefined }}'
      }
    },
    "displayOptions": {
      "show": {
        "authentication_update_object": [
          'input'
        ],
        "resource": [
          'authentications'
        ],
        "operation": [
          'updateAuthentication'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Credentials for authenticating with a Google service account, such as BigQuery.',
    "required": false,
    "default": '{}',
    "displayName": 'Auth Google Service Account Partial',
    "name": 'auth_google_service_account_partial_object',
    "displayOptions": {
      "show": {
        "authentication_update_object": [
          'input'
        ],
        "input": [
          'auth_google_service_account_partial'
        ],
        "resource": [
          'authentications'
        ],
        "operation": [
          'updateAuthentication'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Credentials for authenticating with user name and password.',
    "required": false,
    "default": '{}',
    "displayName": 'Auth Basic Partial',
    "name": 'auth_basic_partial_object',
    "displayOptions": {
      "show": {
        "authentication_update_object": [
          'input'
        ],
        "input": [
          'auth_basic_partial'
        ],
        "resource": [
          'authentications'
        ],
        "operation": [
          'updateAuthentication'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Credentials for authenticating with an API key.',
    "required": false,
    "default": '{}',
    "displayName": 'Auth APIKey Partial',
    "name": 'auth_apikey_partial_object',
    "displayOptions": {
      "show": {
        "authentication_update_object": [
          'input'
        ],
        "input": [
          'auth_apikey_partial'
        ],
        "resource": [
          'authentications'
        ],
        "operation": [
          'updateAuthentication'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Credentials for authenticating with OAuth 2.0.',
    "required": false,
    "default": '{}',
    "displayName": 'Auth OAuth Partial',
    "name": 'auth_oauth_partial_object',
    "displayOptions": {
      "show": {
        "authentication_update_object": [
          'input'
        ],
        "input": [
          'auth_oauth_partial'
        ],
        "resource": [
          'authentications'
        ],
        "operation": [
          'updateAuthentication'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Credentials for authenticating with Algolia.',
    "required": false,
    "default": '{}',
    "displayName": 'Auth Algolia Partial',
    "name": 'auth_algolia_partial_object',
    "displayOptions": {
      "show": {
        "authentication_update_object": [
          'input'
        ],
        "input": [
          'auth_algolia_partial'
        ],
        "resource": [
          'authentications'
        ],
        "operation": [
          'updateAuthentication'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Credentials for authenticating with the Algolia Insights API.',
    "required": false,
    "default": '{}',
    "displayName": 'Auth Algolia Insights Partial',
    "name": 'auth_algolia_insights_partial_object',
    "displayOptions": {
      "show": {
        "authentication_update_object": [
          'input'
        ],
        "input": [
          'auth_algolia_insights_partial'
        ],
        "resource": [
          'authentications'
        ],
        "operation": [
          'updateAuthentication'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'A key:value authentication for your transformations.',
    "required": false,
    "default": '{}',
    "displayName": 'Auth Secrets',
    "name": 'auth_secrets_object',
    "displayOptions": {
      "show": {
        "authentication_update_object": [
          'input'
        ],
        "input": [
          'auth_secrets'
        ],
        "resource": [
          'authentications'
        ],
        "operation": [
          'updateAuthentication'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of an authentication resource.',
    "displayName": 'Authentication ID',
    "name": 'authenticationID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'authentications'
        ],
        "operation": [
          'deleteAuthentication'
        ]
      }
    }
  },
  {
    "type": 'number',
    "default": 10,
    "description": 'Number of items per page.',
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
          'destinations'
        ],
        "operation": [
          'listDestinations'
        ]
      }
    }
  },
  {
    "type": 'number',
    "default": '',
    "description": 'Page of the API response to retrieve.',
    "typeOptions": {
      "minValue": 1
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
          'destinations'
        ],
        "operation": [
          'listDestinations'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Type',
    "name": 'type_json',
    "default": '[]',
    "description": undefined,
    "required": false,
    "routing": {
      "request": {
        "qs": {
          "type": '={{ JSON.parse($value) }}'
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'destinations'
        ],
        "operation": [
          'listDestinations'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Authentication ID',
    "name": 'authenticationID_json',
    "default": '[]',
    "description": undefined,
    "required": false,
    "routing": {
      "request": {
        "qs": {
          "authenticationID": '={{ JSON.parse($value) }}'
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'destinations'
        ],
        "operation": [
          'listDestinations'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of a transformation.',
    "routing": {
      "request": {
        "qs": {
          "transformationID": '={{ $value }}'
        }
      }
    },
    "displayName": 'Transformation ID',
    "name": 'transformationID_string',
    "displayOptions": {
      "show": {
        "resource": [
          'destinations'
        ],
        "operation": [
          'listDestinations'
        ]
      }
    }
  },
  {
    "type": 'options',
    "default": 'createdAt',
    "description": 'Property by which to sort the destinations.',
    "options": [
      {
        "name": 'name',
        "value": 'name'
      },
      {
        "name": 'type',
        "value": 'type'
      },
      {
        "name": 'updatedAt',
        "value": 'updatedAt'
      },
      {
        "name": 'createdAt',
        "value": 'createdAt'
      }
    ],
    "routing": {
      "request": {
        "qs": {
          "sort": '={{ $value }}'
        }
      }
    },
    "displayName": 'Sort',
    "name": 'sort_options',
    "displayOptions": {
      "show": {
        "resource": [
          'destinations'
        ],
        "operation": [
          'listDestinations'
        ]
      }
    }
  },
  {
    "type": 'options',
    "default": 'desc',
    "description": 'Ascending or descending sort order.',
    "options": [
      {
        "name": 'asc',
        "value": 'asc'
      },
      {
        "name": 'desc',
        "value": 'desc'
      }
    ],
    "routing": {
      "request": {
        "qs": {
          "order": '={{ $value }}'
        }
      }
    },
    "displayName": 'Order',
    "name": 'order_options',
    "displayOptions": {
      "show": {
        "resource": [
          'destinations'
        ],
        "operation": [
          'listDestinations'
        ]
      }
    }
  },
  {
    "displayName": 'Destination Create',
    "name": 'destination_create_object',
    "type": 'multiOptions',
    "description": 'API request body for creating a new destination.',
    "required": true,
    "default": [],
    "options": [
      {
        "name": 'Type',
        "value": 'type_options'
      },
      {
        "name": 'Name',
        "value": 'name_string'
      },
      {
        "name": 'Destination Input',
        "value": 'destination_input_object'
      },
      {
        "name": 'Authentication ID',
        "value": 'authenticationID_string'
      },
      {
        "name": 'Transformation IDs',
        "value": 'transformationIDs_json'
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'destinations'
        ],
        "operation": [
          'createDestination'
        ]
      }
    }
  },
  {
    "type": 'options',
    "default": '',
    "description": 'Destination type.\n\n- `search`.\n  Data is stored in an Algolia index.\n\n- `insights`.\n  Data is recorded as user events in the Insights API.\n',
    "options": [
      {
        "name": 'search',
        "value": 'search'
      },
      {
        "name": 'insights',
        "value": 'insights'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'type'
      }
    },
    "displayName": 'Type',
    "name": 'type_options',
    "displayOptions": {
      "show": {
        "destination_create_object": [
          'type_options'
        ],
        "resource": [
          'destinations'
        ],
        "operation": [
          'createDestination'
        ]
      }
    },
    "required": true
  },
  {
    "type": 'string',
    "default": '',
    "description": 'Descriptive name for the resource.',
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
        "destination_create_object": [
          'name_string'
        ],
        "resource": [
          'destinations'
        ],
        "operation": [
          'createDestination'
        ]
      }
    },
    "required": true
  },
  {
    "type": 'json',
    "description": undefined,
    "required": true,
    "default": '{}',
    "routing": {
      "send": {
        "type": 'body',
        "property": 'input',
        "value": '={{ JSON.parse($value) }}'
      }
    },
    "displayName": 'Destination Input',
    "name": 'destination_input_object',
    "displayOptions": {
      "show": {
        "destination_create_object": [
          'destination_input_object'
        ],
        "resource": [
          'destinations'
        ],
        "operation": [
          'createDestination'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of an authentication resource.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'authenticationID'
      }
    },
    "displayName": 'Authentication ID',
    "name": 'authenticationID_string',
    "displayOptions": {
      "show": {
        "destination_create_object": [
          'authenticationID_string'
        ],
        "resource": [
          'destinations'
        ],
        "operation": [
          'createDestination'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Transformation IDs',
    "name": 'transformationIDs_json',
    "default": '[]',
    "description": undefined,
    "required": false,
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ JSON.parse($value) }}',
        "property": 'transformationIDs'
      }
    },
    "displayOptions": {
      "show": {
        "destination_create_object": [
          'transformationIDs_json'
        ],
        "resource": [
          'destinations'
        ],
        "operation": [
          'createDestination'
        ]
      }
    }
  },
  {
    "displayName": 'Destination Search',
    "name": 'destination_search_object',
    "type": 'multiOptions',
    "description": 'API request body for searching destinations.',
    "required": true,
    "default": [],
    "options": [
      {
        "name": 'Destination IDs',
        "value": 'destinationIDs_json'
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'destinations'
        ],
        "operation": [
          'searchDestinations'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Destination IDs',
    "name": 'destinationIDs_json',
    "default": '[]',
    "description": undefined,
    "required": true,
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ JSON.parse($value) }}',
        "property": 'destinationIDs'
      }
    },
    "displayOptions": {
      "show": {
        "destination_search_object": [
          'destinationIDs_json'
        ],
        "resource": [
          'destinations'
        ],
        "operation": [
          'searchDestinations'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of a destination resource.',
    "displayName": 'Destination ID',
    "name": 'destinationID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'destinations'
        ],
        "operation": [
          'getDestination'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of a destination resource.',
    "displayName": 'Destination ID',
    "name": 'destinationID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'destinations'
        ],
        "operation": [
          'updateDestination'
        ]
      }
    }
  },
  {
    "displayName": 'Destination Update',
    "name": 'destination_update_object',
    "type": 'multiOptions',
    "description": 'API request body for updating a destination.',
    "required": false,
    "default": [],
    "options": [
      {
        "name": 'Type',
        "value": 'type_options'
      },
      {
        "name": 'Name',
        "value": 'name_string'
      },
      {
        "name": 'Destination Input',
        "value": 'destination_input_object'
      },
      {
        "name": 'Authentication ID',
        "value": 'authenticationID_string'
      },
      {
        "name": 'Transformation IDs',
        "value": 'transformationIDs_json'
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'destinations'
        ],
        "operation": [
          'updateDestination'
        ]
      }
    }
  },
  {
    "type": 'options',
    "default": '',
    "description": 'Destination type.\n\n- `search`.\n  Data is stored in an Algolia index.\n\n- `insights`.\n  Data is recorded as user events in the Insights API.\n',
    "options": [
      {
        "name": 'search',
        "value": 'search'
      },
      {
        "name": 'insights',
        "value": 'insights'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'type'
      }
    },
    "displayName": 'Type',
    "name": 'type_options',
    "displayOptions": {
      "show": {
        "destination_update_object": [
          'type_options'
        ],
        "resource": [
          'destinations'
        ],
        "operation": [
          'updateDestination'
        ]
      }
    }
  },
  {
    "type": 'string',
    "default": '',
    "description": 'Descriptive name for the resource.',
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
        "destination_update_object": [
          'name_string'
        ],
        "resource": [
          'destinations'
        ],
        "operation": [
          'updateDestination'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": undefined,
    "required": true,
    "default": '{}',
    "routing": {
      "send": {
        "type": 'body',
        "property": 'input',
        "value": '={{ JSON.parse($value) }}'
      }
    },
    "displayName": 'Destination Input',
    "name": 'destination_input_object',
    "displayOptions": {
      "show": {
        "destination_update_object": [
          'destination_input_object'
        ],
        "resource": [
          'destinations'
        ],
        "operation": [
          'updateDestination'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of an authentication resource.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'authenticationID'
      }
    },
    "displayName": 'Authentication ID',
    "name": 'authenticationID_string',
    "displayOptions": {
      "show": {
        "destination_update_object": [
          'authenticationID_string'
        ],
        "resource": [
          'destinations'
        ],
        "operation": [
          'updateDestination'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Transformation IDs',
    "name": 'transformationIDs_json',
    "default": '[]',
    "description": undefined,
    "required": false,
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ JSON.parse($value) }}',
        "property": 'transformationIDs'
      }
    },
    "displayOptions": {
      "show": {
        "destination_update_object": [
          'transformationIDs_json'
        ],
        "resource": [
          'destinations'
        ],
        "operation": [
          'updateDestination'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of a destination resource.',
    "displayName": 'Destination ID',
    "name": 'destinationID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'destinations'
        ],
        "operation": [
          'deleteDestination'
        ]
      }
    }
  },
  {
    "type": 'number',
    "default": 10,
    "description": 'Number of items per page.',
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
          'sources'
        ],
        "operation": [
          'listSources'
        ]
      }
    }
  },
  {
    "type": 'number',
    "default": '',
    "description": 'Page of the API response to retrieve.',
    "typeOptions": {
      "minValue": 1
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
          'sources'
        ],
        "operation": [
          'listSources'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Type',
    "name": 'type_json',
    "default": '[]',
    "description": undefined,
    "required": false,
    "routing": {
      "request": {
        "qs": {
          "type": '={{ JSON.parse($value) }}'
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'sources'
        ],
        "operation": [
          'listSources'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Authentication ID',
    "name": 'authenticationID_json',
    "default": '[]',
    "description": undefined,
    "required": false,
    "routing": {
      "request": {
        "qs": {
          "authenticationID": '={{ JSON.parse($value) }}'
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'sources'
        ],
        "operation": [
          'listSources'
        ]
      }
    }
  },
  {
    "type": 'options',
    "default": 'createdAt',
    "description": 'Property by which to sort the list of sources.',
    "options": [
      {
        "name": 'name',
        "value": 'name'
      },
      {
        "name": 'type',
        "value": 'type'
      },
      {
        "name": 'updatedAt',
        "value": 'updatedAt'
      },
      {
        "name": 'createdAt',
        "value": 'createdAt'
      }
    ],
    "routing": {
      "request": {
        "qs": {
          "sort": '={{ $value }}'
        }
      }
    },
    "displayName": 'Sort',
    "name": 'sort_options',
    "displayOptions": {
      "show": {
        "resource": [
          'sources'
        ],
        "operation": [
          'listSources'
        ]
      }
    }
  },
  {
    "type": 'options',
    "default": 'desc',
    "description": 'Ascending or descending sort order.',
    "options": [
      {
        "name": 'asc',
        "value": 'asc'
      },
      {
        "name": 'desc',
        "value": 'desc'
      }
    ],
    "routing": {
      "request": {
        "qs": {
          "order": '={{ $value }}'
        }
      }
    },
    "displayName": 'Order',
    "name": 'order_options',
    "displayOptions": {
      "show": {
        "resource": [
          'sources'
        ],
        "operation": [
          'listSources'
        ]
      }
    }
  },
  {
    "displayName": 'Source Create',
    "name": 'source_create_object',
    "type": 'multiOptions',
    "description": undefined,
    "required": true,
    "default": [],
    "options": [
      {
        "name": 'Type',
        "value": 'type_options'
      },
      {
        "name": 'Name',
        "value": 'name_string'
      },
      {
        "name": 'Input',
        "value": 'input'
      },
      {
        "name": 'Authentication ID',
        "value": 'authenticationID_string'
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'sources'
        ],
        "operation": [
          'createSource'
        ]
      }
    }
  },
  {
    "type": 'options',
    "default": '',
    "options": [
      {
        "name": 'bigcommerce',
        "value": 'bigcommerce'
      },
      {
        "name": 'bigquery',
        "value": 'bigquery'
      },
      {
        "name": 'commercetools',
        "value": 'commercetools'
      },
      {
        "name": 'csv',
        "value": 'csv'
      },
      {
        "name": 'docker',
        "value": 'docker'
      },
      {
        "name": 'ga4BigqueryExport',
        "value": 'ga4BigqueryExport'
      },
      {
        "name": 'json',
        "value": 'json'
      },
      {
        "name": 'shopify',
        "value": 'shopify'
      },
      {
        "name": 'push',
        "value": 'push'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'type'
      }
    },
    "displayName": 'Type',
    "name": 'type_options',
    "displayOptions": {
      "show": {
        "source_create_object": [
          'type_options'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'createSource'
        ]
      }
    },
    "required": true
  },
  {
    "type": 'string',
    "default": '',
    "description": 'Descriptive name of the source.',
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
        "source_create_object": [
          'name_string'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'createSource'
        ]
      }
    },
    "required": true
  },
  {
    "type": 'options',
    "name": 'input',
    "displayName": 'Input',
    "default": '',
    "options": [
      {
        "name": 'Source commercetools',
        "value": 'source_commercetools'
      },
      {
        "name": 'Source big commerce',
        "value": 'source_big_commerce'
      },
      {
        "name": 'Source jSON',
        "value": 'source_json'
      },
      {
        "name": 'Source cSV',
        "value": 'source_csv'
      },
      {
        "name": 'Source big query',
        "value": 'source_big_query'
      },
      {
        "name": 'Source gA4Big query export',
        "value": 'source_ga4big_query_export'
      },
      {
        "name": 'Source docker',
        "value": 'source_docker'
      },
      {
        "name": 'Source shopify',
        "value": 'source_shopify'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "property": 'input',
        "value": '={{ typeof $parameter.source_commercetools_object !== "undefined" ? JSON.parse($parameter.source_commercetools_object) : typeof $parameter.source_big_commerce_object !== "undefined" ? JSON.parse($parameter.source_big_commerce_object) : typeof $parameter.source_json_object !== "undefined" ? JSON.parse($parameter.source_json_object) : typeof $parameter.source_csv_object !== "undefined" ? JSON.parse($parameter.source_csv_object) : typeof $parameter.source_big_query_object !== "undefined" ? JSON.parse($parameter.source_big_query_object) : typeof $parameter.source_ga4big_query_export_object !== "undefined" ? JSON.parse($parameter.source_ga4big_query_export_object) : typeof $parameter.source_docker_object !== "undefined" ? JSON.parse($parameter.source_docker_object) : typeof $parameter.source_update_shopify_object !== "undefined" ? JSON.parse($parameter.source_update_shopify_object) : typeof $parameter.source_shopify_base_object !== "undefined" ? JSON.parse($parameter.source_shopify_base_object) : undefined }}'
      }
    },
    "displayOptions": {
      "show": {
        "source_create_object": [
          'input'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'createSource'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Specific configuration attributes of a `commercetools` source.',
    "required": true,
    "default": '{}',
    "displayName": 'Source Commercetools',
    "name": 'source_commercetools_object',
    "displayOptions": {
      "show": {
        "source_create_object": [
          'input'
        ],
        "input": [
          'source_commercetools'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'createSource'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Specific configuration attributes of a `bigcommerce` source.',
    "required": true,
    "default": '{}',
    "displayName": 'Source Big Commerce',
    "name": 'source_big_commerce_object',
    "displayOptions": {
      "show": {
        "source_create_object": [
          'input'
        ],
        "input": [
          'source_big_commerce'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'createSource'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Specific configuration attributes of a `json` source.',
    "required": true,
    "default": '{}',
    "displayName": 'Source JSON',
    "name": 'source_json_object',
    "displayOptions": {
      "show": {
        "source_create_object": [
          'input'
        ],
        "input": [
          'source_json'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'createSource'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Specific configuration attributes of a `csv` source.',
    "required": true,
    "default": '{}',
    "displayName": 'Source CSV',
    "name": 'source_csv_object',
    "displayOptions": {
      "show": {
        "source_create_object": [
          'input'
        ],
        "input": [
          'source_csv'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'createSource'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Specific configuration attributes of a `bigquery` source.',
    "required": true,
    "default": '{}',
    "displayName": 'Source Big Query',
    "name": 'source_big_query_object',
    "displayOptions": {
      "show": {
        "source_create_object": [
          'input'
        ],
        "input": [
          'source_big_query'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'createSource'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Specific configuration attributes of a `ga4BigqueryExport` source.',
    "required": true,
    "default": '{}',
    "displayName": 'Source GA4Big Query Export',
    "name": 'source_ga4big_query_export_object',
    "displayOptions": {
      "show": {
        "source_create_object": [
          'input'
        ],
        "input": [
          'source_ga4big_query_export'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'createSource'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Specific configuration attributes of a `docker` source.',
    "required": true,
    "default": '{}',
    "displayName": 'Source Docker',
    "name": 'source_docker_object',
    "displayOptions": {
      "show": {
        "source_create_object": [
          'input'
        ],
        "input": [
          'source_docker'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'createSource'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Specific configuration attributes of a `shopify` source.',
    "required": false,
    "default": '{}',
    "displayName": 'Source Update Shopify',
    "name": 'source_update_shopify_object',
    "displayOptions": {
      "show": {
        "source_create_object": [
          'input'
        ],
        "input": [
          'source_shopify'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'createSource'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": undefined,
    "required": true,
    "default": '{}',
    "displayName": 'Source Shopify Base',
    "name": 'source_shopify_base_object',
    "displayOptions": {
      "show": {
        "source_create_object": [
          'input'
        ],
        "input": [
          'source_shopify'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'createSource'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of an authentication resource.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'authenticationID'
      }
    },
    "displayName": 'Authentication ID',
    "name": 'authenticationID_string',
    "displayOptions": {
      "show": {
        "source_create_object": [
          'authenticationID_string'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'createSource'
        ]
      }
    }
  },
  {
    "displayName": 'Source Create',
    "name": 'source_create_object',
    "type": 'multiOptions',
    "description": undefined,
    "required": true,
    "default": [],
    "options": [
      {
        "name": 'Type',
        "value": 'type_options'
      },
      {
        "name": 'Name',
        "value": 'name_string'
      },
      {
        "name": 'Input',
        "value": 'input'
      },
      {
        "name": 'Authentication ID',
        "value": 'authenticationID_string'
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'sources'
        ],
        "operation": [
          'validateSource'
        ]
      }
    }
  },
  {
    "type": 'options',
    "default": '',
    "options": [
      {
        "name": 'bigcommerce',
        "value": 'bigcommerce'
      },
      {
        "name": 'bigquery',
        "value": 'bigquery'
      },
      {
        "name": 'commercetools',
        "value": 'commercetools'
      },
      {
        "name": 'csv',
        "value": 'csv'
      },
      {
        "name": 'docker',
        "value": 'docker'
      },
      {
        "name": 'ga4BigqueryExport',
        "value": 'ga4BigqueryExport'
      },
      {
        "name": 'json',
        "value": 'json'
      },
      {
        "name": 'shopify',
        "value": 'shopify'
      },
      {
        "name": 'push',
        "value": 'push'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'type'
      }
    },
    "displayName": 'Type',
    "name": 'type_options',
    "displayOptions": {
      "show": {
        "source_create_object": [
          'type_options'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'validateSource'
        ]
      }
    },
    "required": true
  },
  {
    "type": 'string',
    "default": '',
    "description": 'Descriptive name of the source.',
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
        "source_create_object": [
          'name_string'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'validateSource'
        ]
      }
    },
    "required": true
  },
  {
    "type": 'options',
    "name": 'input',
    "displayName": 'Input',
    "default": '',
    "options": [
      {
        "name": 'Source commercetools',
        "value": 'source_commercetools'
      },
      {
        "name": 'Source big commerce',
        "value": 'source_big_commerce'
      },
      {
        "name": 'Source jSON',
        "value": 'source_json'
      },
      {
        "name": 'Source cSV',
        "value": 'source_csv'
      },
      {
        "name": 'Source big query',
        "value": 'source_big_query'
      },
      {
        "name": 'Source gA4Big query export',
        "value": 'source_ga4big_query_export'
      },
      {
        "name": 'Source docker',
        "value": 'source_docker'
      },
      {
        "name": 'Source shopify',
        "value": 'source_shopify'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "property": 'input',
        "value": '={{ typeof $parameter.source_commercetools_object !== "undefined" ? JSON.parse($parameter.source_commercetools_object) : typeof $parameter.source_big_commerce_object !== "undefined" ? JSON.parse($parameter.source_big_commerce_object) : typeof $parameter.source_json_object !== "undefined" ? JSON.parse($parameter.source_json_object) : typeof $parameter.source_csv_object !== "undefined" ? JSON.parse($parameter.source_csv_object) : typeof $parameter.source_big_query_object !== "undefined" ? JSON.parse($parameter.source_big_query_object) : typeof $parameter.source_ga4big_query_export_object !== "undefined" ? JSON.parse($parameter.source_ga4big_query_export_object) : typeof $parameter.source_docker_object !== "undefined" ? JSON.parse($parameter.source_docker_object) : typeof $parameter.source_update_shopify_object !== "undefined" ? JSON.parse($parameter.source_update_shopify_object) : typeof $parameter.source_shopify_base_object !== "undefined" ? JSON.parse($parameter.source_shopify_base_object) : undefined }}'
      }
    },
    "displayOptions": {
      "show": {
        "source_create_object": [
          'input'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'validateSource'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Specific configuration attributes of a `commercetools` source.',
    "required": true,
    "default": '{}',
    "displayName": 'Source Commercetools',
    "name": 'source_commercetools_object',
    "displayOptions": {
      "show": {
        "source_create_object": [
          'input'
        ],
        "input": [
          'source_commercetools'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'validateSource'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Specific configuration attributes of a `bigcommerce` source.',
    "required": true,
    "default": '{}',
    "displayName": 'Source Big Commerce',
    "name": 'source_big_commerce_object',
    "displayOptions": {
      "show": {
        "source_create_object": [
          'input'
        ],
        "input": [
          'source_big_commerce'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'validateSource'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Specific configuration attributes of a `json` source.',
    "required": true,
    "default": '{}',
    "displayName": 'Source JSON',
    "name": 'source_json_object',
    "displayOptions": {
      "show": {
        "source_create_object": [
          'input'
        ],
        "input": [
          'source_json'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'validateSource'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Specific configuration attributes of a `csv` source.',
    "required": true,
    "default": '{}',
    "displayName": 'Source CSV',
    "name": 'source_csv_object',
    "displayOptions": {
      "show": {
        "source_create_object": [
          'input'
        ],
        "input": [
          'source_csv'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'validateSource'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Specific configuration attributes of a `bigquery` source.',
    "required": true,
    "default": '{}',
    "displayName": 'Source Big Query',
    "name": 'source_big_query_object',
    "displayOptions": {
      "show": {
        "source_create_object": [
          'input'
        ],
        "input": [
          'source_big_query'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'validateSource'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Specific configuration attributes of a `ga4BigqueryExport` source.',
    "required": true,
    "default": '{}',
    "displayName": 'Source GA4Big Query Export',
    "name": 'source_ga4big_query_export_object',
    "displayOptions": {
      "show": {
        "source_create_object": [
          'input'
        ],
        "input": [
          'source_ga4big_query_export'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'validateSource'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Specific configuration attributes of a `docker` source.',
    "required": true,
    "default": '{}',
    "displayName": 'Source Docker',
    "name": 'source_docker_object',
    "displayOptions": {
      "show": {
        "source_create_object": [
          'input'
        ],
        "input": [
          'source_docker'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'validateSource'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Specific configuration attributes of a `shopify` source.',
    "required": false,
    "default": '{}',
    "displayName": 'Source Update Shopify',
    "name": 'source_update_shopify_object',
    "displayOptions": {
      "show": {
        "source_create_object": [
          'input'
        ],
        "input": [
          'source_shopify'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'validateSource'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": undefined,
    "required": true,
    "default": '{}',
    "displayName": 'Source Shopify Base',
    "name": 'source_shopify_base_object',
    "displayOptions": {
      "show": {
        "source_create_object": [
          'input'
        ],
        "input": [
          'source_shopify'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'validateSource'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of an authentication resource.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'authenticationID'
      }
    },
    "displayName": 'Authentication ID',
    "name": 'authenticationID_string',
    "displayOptions": {
      "show": {
        "source_create_object": [
          'authenticationID_string'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'validateSource'
        ]
      }
    }
  },
  {
    "displayName": 'Source Search',
    "name": 'source_search_object',
    "type": 'multiOptions',
    "description": undefined,
    "required": true,
    "default": [],
    "options": [
      {
        "name": 'Source IDs',
        "value": 'sourceIDs_json'
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'sources'
        ],
        "operation": [
          'searchSources'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Source IDs',
    "name": 'sourceIDs_json',
    "default": '[]',
    "description": undefined,
    "required": true,
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ JSON.parse($value) }}',
        "property": 'sourceIDs'
      }
    },
    "displayOptions": {
      "show": {
        "source_search_object": [
          'sourceIDs_json'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'searchSources'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally uniqud identifier (UUID) of a source.',
    "displayName": 'Source ID',
    "name": 'sourceID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'sources'
        ],
        "operation": [
          'getSource'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally uniqud identifier (UUID) of a source.',
    "displayName": 'Source ID',
    "name": 'sourceID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'sources'
        ],
        "operation": [
          'updateSource'
        ]
      }
    }
  },
  {
    "displayName": 'Source Update',
    "name": 'source_update_object',
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
        "name": 'Input',
        "value": 'input'
      },
      {
        "name": 'Authentication ID',
        "value": 'authenticationID_string'
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'sources'
        ],
        "operation": [
          'updateSource'
        ]
      }
    }
  },
  {
    "type": 'string',
    "default": '',
    "description": 'Descriptive name of the source.',
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
        "source_update_object": [
          'name_string'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'updateSource'
        ]
      }
    }
  },
  {
    "type": 'options',
    "name": 'input',
    "displayName": 'Input',
    "default": '',
    "options": [
      {
        "name": 'Source update commercetools',
        "value": 'source_update_commercetools'
      },
      {
        "name": 'Source jSON',
        "value": 'source_json'
      },
      {
        "name": 'Source cSV',
        "value": 'source_csv'
      },
      {
        "name": 'Source big query',
        "value": 'source_big_query'
      },
      {
        "name": 'Source gA4Big query export',
        "value": 'source_ga4big_query_export'
      },
      {
        "name": 'Source update docker',
        "value": 'source_update_docker'
      },
      {
        "name": 'Source update shopify',
        "value": 'source_update_shopify'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "property": 'input',
        "value": '={{ typeof $parameter.source_update_commercetools_object !== "undefined" ? JSON.parse($parameter.source_update_commercetools_object) : typeof $parameter.source_json_object !== "undefined" ? JSON.parse($parameter.source_json_object) : typeof $parameter.source_csv_object !== "undefined" ? JSON.parse($parameter.source_csv_object) : typeof $parameter.source_big_query_object !== "undefined" ? JSON.parse($parameter.source_big_query_object) : typeof $parameter.source_ga4big_query_export_object !== "undefined" ? JSON.parse($parameter.source_ga4big_query_export_object) : typeof $parameter.source_update_docker_object !== "undefined" ? JSON.parse($parameter.source_update_docker_object) : typeof $parameter.source_update_shopify_object !== "undefined" ? JSON.parse($parameter.source_update_shopify_object) : undefined }}'
      }
    },
    "displayOptions": {
      "show": {
        "source_update_object": [
          'input'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'updateSource'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Specific configuration attributes of a `commercetools` source.',
    "required": false,
    "default": '{}',
    "displayName": 'Source Update Commercetools',
    "name": 'source_update_commercetools_object',
    "displayOptions": {
      "show": {
        "source_update_object": [
          'input'
        ],
        "input": [
          'source_update_commercetools'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'updateSource'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Specific configuration attributes of a `json` source.',
    "required": true,
    "default": '{}',
    "displayName": 'Source JSON',
    "name": 'source_json_object',
    "displayOptions": {
      "show": {
        "source_update_object": [
          'input'
        ],
        "input": [
          'source_json'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'updateSource'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Specific configuration attributes of a `csv` source.',
    "required": true,
    "default": '{}',
    "displayName": 'Source CSV',
    "name": 'source_csv_object',
    "displayOptions": {
      "show": {
        "source_update_object": [
          'input'
        ],
        "input": [
          'source_csv'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'updateSource'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Specific configuration attributes of a `bigquery` source.',
    "required": true,
    "default": '{}',
    "displayName": 'Source Big Query',
    "name": 'source_big_query_object',
    "displayOptions": {
      "show": {
        "source_update_object": [
          'input'
        ],
        "input": [
          'source_big_query'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'updateSource'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Specific configuration attributes of a `ga4BigqueryExport` source.',
    "required": true,
    "default": '{}',
    "displayName": 'Source GA4Big Query Export',
    "name": 'source_ga4big_query_export_object',
    "displayOptions": {
      "show": {
        "source_update_object": [
          'input'
        ],
        "input": [
          'source_ga4big_query_export'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'updateSource'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Specific configuration attributes of a `docker` source.',
    "required": true,
    "default": '{}',
    "displayName": 'Source Update Docker',
    "name": 'source_update_docker_object',
    "displayOptions": {
      "show": {
        "source_update_object": [
          'input'
        ],
        "input": [
          'source_update_docker'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'updateSource'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Specific configuration attributes of a `shopify` source.',
    "required": false,
    "default": '{}',
    "displayName": 'Source Update Shopify',
    "name": 'source_update_shopify_object',
    "displayOptions": {
      "show": {
        "source_update_object": [
          'input'
        ],
        "input": [
          'source_update_shopify'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'updateSource'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of an authentication resource.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'authenticationID'
      }
    },
    "displayName": 'Authentication ID',
    "name": 'authenticationID_string',
    "displayOptions": {
      "show": {
        "source_update_object": [
          'authenticationID_string'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'updateSource'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally uniqud identifier (UUID) of a source.',
    "displayName": 'Source ID',
    "name": 'sourceID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'sources'
        ],
        "operation": [
          'deleteSource'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally uniqud identifier (UUID) of a source.',
    "displayName": 'Source ID',
    "name": 'sourceID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'sources'
        ],
        "operation": [
          'validateSourceBeforeUpdate'
        ]
      }
    }
  },
  {
    "displayName": 'Source Update',
    "name": 'source_update_object',
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
        "name": 'Input',
        "value": 'input'
      },
      {
        "name": 'Authentication ID',
        "value": 'authenticationID_string'
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'sources'
        ],
        "operation": [
          'validateSourceBeforeUpdate'
        ]
      }
    }
  },
  {
    "type": 'string',
    "default": '',
    "description": 'Descriptive name of the source.',
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
        "source_update_object": [
          'name_string'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'validateSourceBeforeUpdate'
        ]
      }
    }
  },
  {
    "type": 'options',
    "name": 'input',
    "displayName": 'Input',
    "default": '',
    "options": [
      {
        "name": 'Source update commercetools',
        "value": 'source_update_commercetools'
      },
      {
        "name": 'Source jSON',
        "value": 'source_json'
      },
      {
        "name": 'Source cSV',
        "value": 'source_csv'
      },
      {
        "name": 'Source big query',
        "value": 'source_big_query'
      },
      {
        "name": 'Source gA4Big query export',
        "value": 'source_ga4big_query_export'
      },
      {
        "name": 'Source update docker',
        "value": 'source_update_docker'
      },
      {
        "name": 'Source update shopify',
        "value": 'source_update_shopify'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "property": 'input',
        "value": '={{ typeof $parameter.source_update_commercetools_object !== "undefined" ? JSON.parse($parameter.source_update_commercetools_object) : typeof $parameter.source_json_object !== "undefined" ? JSON.parse($parameter.source_json_object) : typeof $parameter.source_csv_object !== "undefined" ? JSON.parse($parameter.source_csv_object) : typeof $parameter.source_big_query_object !== "undefined" ? JSON.parse($parameter.source_big_query_object) : typeof $parameter.source_ga4big_query_export_object !== "undefined" ? JSON.parse($parameter.source_ga4big_query_export_object) : typeof $parameter.source_update_docker_object !== "undefined" ? JSON.parse($parameter.source_update_docker_object) : typeof $parameter.source_update_shopify_object !== "undefined" ? JSON.parse($parameter.source_update_shopify_object) : undefined }}'
      }
    },
    "displayOptions": {
      "show": {
        "source_update_object": [
          'input'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'validateSourceBeforeUpdate'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Specific configuration attributes of a `commercetools` source.',
    "required": false,
    "default": '{}',
    "displayName": 'Source Update Commercetools',
    "name": 'source_update_commercetools_object',
    "displayOptions": {
      "show": {
        "source_update_object": [
          'input'
        ],
        "input": [
          'source_update_commercetools'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'validateSourceBeforeUpdate'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Specific configuration attributes of a `json` source.',
    "required": true,
    "default": '{}',
    "displayName": 'Source JSON',
    "name": 'source_json_object',
    "displayOptions": {
      "show": {
        "source_update_object": [
          'input'
        ],
        "input": [
          'source_json'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'validateSourceBeforeUpdate'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Specific configuration attributes of a `csv` source.',
    "required": true,
    "default": '{}',
    "displayName": 'Source CSV',
    "name": 'source_csv_object',
    "displayOptions": {
      "show": {
        "source_update_object": [
          'input'
        ],
        "input": [
          'source_csv'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'validateSourceBeforeUpdate'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Specific configuration attributes of a `bigquery` source.',
    "required": true,
    "default": '{}',
    "displayName": 'Source Big Query',
    "name": 'source_big_query_object',
    "displayOptions": {
      "show": {
        "source_update_object": [
          'input'
        ],
        "input": [
          'source_big_query'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'validateSourceBeforeUpdate'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Specific configuration attributes of a `ga4BigqueryExport` source.',
    "required": true,
    "default": '{}',
    "displayName": 'Source GA4Big Query Export',
    "name": 'source_ga4big_query_export_object',
    "displayOptions": {
      "show": {
        "source_update_object": [
          'input'
        ],
        "input": [
          'source_ga4big_query_export'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'validateSourceBeforeUpdate'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Specific configuration attributes of a `docker` source.',
    "required": true,
    "default": '{}',
    "displayName": 'Source Update Docker',
    "name": 'source_update_docker_object',
    "displayOptions": {
      "show": {
        "source_update_object": [
          'input'
        ],
        "input": [
          'source_update_docker'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'validateSourceBeforeUpdate'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Specific configuration attributes of a `shopify` source.',
    "required": false,
    "default": '{}',
    "displayName": 'Source Update Shopify',
    "name": 'source_update_shopify_object',
    "displayOptions": {
      "show": {
        "source_update_object": [
          'input'
        ],
        "input": [
          'source_update_shopify'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'validateSourceBeforeUpdate'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of an authentication resource.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'authenticationID'
      }
    },
    "displayName": 'Authentication ID',
    "name": 'authenticationID_string',
    "displayOptions": {
      "show": {
        "source_update_object": [
          'authenticationID_string'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'validateSourceBeforeUpdate'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally uniqud identifier (UUID) of a source.',
    "displayName": 'Source ID',
    "name": 'sourceID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'sources'
        ],
        "operation": [
          'triggerDockerSourceDiscover'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally uniqud identifier (UUID) of a source.',
    "displayName": 'Source ID',
    "name": 'sourceID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'sources'
        ],
        "operation": [
          'runSource'
        ]
      }
    }
  },
  {
    "displayName": 'Run Source Payload',
    "name": 'run_source_payload_object',
    "type": 'multiOptions',
    "description": undefined,
    "required": false,
    "default": [],
    "options": [
      {
        "name": 'Index To Include',
        "value": 'indexToInclude_json'
      },
      {
        "name": 'Index To Exclude',
        "value": 'indexToExclude_json'
      },
      {
        "name": 'Entity IDs',
        "value": 'entityIDs_json'
      },
      {
        "name": 'Entity Type',
        "value": 'entityType_options'
      },
      {
        "name": 'Run Metadata',
        "value": 'run_metadata_object'
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'sources'
        ],
        "operation": [
          'runSource'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Index To Include',
    "name": 'indexToInclude_json',
    "default": '[]',
    "description": 'List of index names to include in reindex/update.',
    "required": false,
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ JSON.parse($value) }}',
        "property": 'indexToInclude'
      }
    },
    "displayOptions": {
      "show": {
        "run_source_payload_object": [
          'indexToInclude_json'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'runSource'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Index To Exclude',
    "name": 'indexToExclude_json',
    "default": '[]',
    "description": 'List of index names to exclude in reindex/update.',
    "required": false,
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ JSON.parse($value) }}',
        "property": 'indexToExclude'
      }
    },
    "displayOptions": {
      "show": {
        "run_source_payload_object": [
          'indexToExclude_json'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'runSource'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Entity IDs',
    "name": 'entityIDs_json',
    "default": '[]',
    "description": 'List of entityIDs to update.',
    "required": false,
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ JSON.parse($value) }}',
        "property": 'entityIDs'
      }
    },
    "displayOptions": {
      "show": {
        "run_source_payload_object": [
          'entityIDs_json'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'runSource'
        ]
      }
    }
  },
  {
    "type": 'options',
    "default": '',
    "description": 'Type of entity to update.',
    "options": [
      {
        "name": 'product',
        "value": 'product'
      },
      {
        "name": 'collection',
        "value": 'collection'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'entityType'
      }
    },
    "displayName": 'Entity Type',
    "name": 'entityType_options',
    "displayOptions": {
      "show": {
        "run_source_payload_object": [
          'entityType_options'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'runSource'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Additional information that will be passed to the created runs.',
    "required": false,
    "default": '{}',
    "routing": {
      "send": {
        "type": 'body',
        "property": 'runMetadata',
        "value": '={{ JSON.parse($value) }}'
      }
    },
    "displayName": 'Run Metadata',
    "name": 'run_metadata_object',
    "displayOptions": {
      "show": {
        "run_source_payload_object": [
          'run_metadata_object'
        ],
        "resource": [
          'sources'
        ],
        "operation": [
          'runSource'
        ]
      }
    }
  },
  {
    "type": 'number',
    "default": 10,
    "description": 'Number of items per page.',
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
          'tasks'
        ],
        "operation": [
          'listTasks'
        ]
      }
    }
  },
  {
    "type": 'number',
    "default": '',
    "description": 'Page of the API response to retrieve.',
    "typeOptions": {
      "minValue": 1
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
          'tasks'
        ],
        "operation": [
          'listTasks'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Action',
    "name": 'action_json',
    "default": '[]',
    "description": 'Actions to perform on the Algolia index.',
    "required": false,
    "routing": {
      "request": {
        "qs": {
          "action": '={{ JSON.parse($value) }}'
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'listTasks'
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
          "enabled": '={{ $value }}'
        }
      }
    },
    "displayName": 'Enabled',
    "name": 'enabled_boolean',
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'listTasks'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Source ID',
    "name": 'sourceID_json',
    "default": '[]',
    "description": undefined,
    "required": false,
    "routing": {
      "request": {
        "qs": {
          "sourceID": '={{ JSON.parse($value) }}'
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'listTasks'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Source Type',
    "name": 'sourceType_json',
    "default": '[]',
    "description": undefined,
    "required": false,
    "routing": {
      "request": {
        "qs": {
          "sourceType": '={{ JSON.parse($value) }}'
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'listTasks'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Destination ID',
    "name": 'destinationID_json',
    "default": '[]',
    "description": undefined,
    "required": false,
    "routing": {
      "request": {
        "qs": {
          "destinationID": '={{ JSON.parse($value) }}'
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'listTasks'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Trigger Type',
    "name": 'triggerType_json',
    "default": '[]',
    "description": undefined,
    "required": false,
    "routing": {
      "request": {
        "qs": {
          "triggerType": '={{ JSON.parse($value) }}'
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'listTasks'
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
          "withEmailNotifications": '={{ $value }}'
        }
      }
    },
    "displayName": 'With Email Notifications',
    "name": 'withEmailNotifications_boolean',
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'listTasks'
        ]
      }
    }
  },
  {
    "type": 'options',
    "default": 'createdAt',
    "description": 'Property by which to sort the list of tasks.',
    "options": [
      {
        "name": 'enabled',
        "value": 'enabled'
      },
      {
        "name": 'triggerType',
        "value": 'triggerType'
      },
      {
        "name": 'action',
        "value": 'action'
      },
      {
        "name": 'updatedAt',
        "value": 'updatedAt'
      },
      {
        "name": 'createdAt',
        "value": 'createdAt'
      }
    ],
    "routing": {
      "request": {
        "qs": {
          "sort": '={{ $value }}'
        }
      }
    },
    "displayName": 'Sort',
    "name": 'sort_options',
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'listTasks'
        ]
      }
    }
  },
  {
    "type": 'options',
    "default": 'desc',
    "description": 'Ascending or descending sort order.',
    "options": [
      {
        "name": 'asc',
        "value": 'asc'
      },
      {
        "name": 'desc',
        "value": 'desc'
      }
    ],
    "routing": {
      "request": {
        "qs": {
          "order": '={{ $value }}'
        }
      }
    },
    "displayName": 'Order',
    "name": 'order_options',
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'listTasks'
        ]
      }
    }
  },
  {
    "displayName": 'Task Create',
    "name": 'task_create_object',
    "type": 'multiOptions',
    "description": 'API request body for creating a task.',
    "required": true,
    "default": [],
    "options": [
      {
        "name": 'Source ID',
        "value": 'sourceID_string'
      },
      {
        "name": 'Destination ID',
        "value": 'destinationID_string'
      },
      {
        "name": 'Action',
        "value": 'action_options'
      },
      {
        "name": 'Subscription Action',
        "value": 'subscriptionAction_options'
      },
      {
        "name": 'Cron',
        "value": 'cron_string'
      },
      {
        "name": 'Enabled',
        "value": 'enabled_boolean'
      },
      {
        "name": 'Failure Threshold',
        "value": 'failureThreshold_number'
      },
      {
        "name": 'Input',
        "value": 'input'
      },
      {
        "name": 'Cursor',
        "value": 'cursor_string'
      },
      {
        "name": 'Notifications',
        "value": 'notifications_object'
      },
      {
        "name": 'Policies',
        "value": 'policies_object'
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'createTask'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally uniqud identifier (UUID) of a source.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'sourceID'
      }
    },
    "displayName": 'Source ID',
    "name": 'sourceID_string',
    "displayOptions": {
      "show": {
        "task_create_object": [
          'sourceID_string'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'createTask'
        ]
      }
    },
    "required": true
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of a destination resource.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'destinationID'
      }
    },
    "displayName": 'Destination ID',
    "name": 'destinationID_string',
    "displayOptions": {
      "show": {
        "task_create_object": [
          'destinationID_string'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'createTask'
        ]
      }
    },
    "required": true
  },
  {
    "type": 'options',
    "default": '',
    "description": 'Action to perform on the Algolia index.',
    "options": [
      {
        "name": 'replace',
        "value": 'replace'
      },
      {
        "name": 'save',
        "value": 'save'
      },
      {
        "name": 'partial',
        "value": 'partial'
      },
      {
        "name": 'partialNoCreate',
        "value": 'partialNoCreate'
      },
      {
        "name": 'append',
        "value": 'append'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'action'
      }
    },
    "displayName": 'Action',
    "name": 'action_options',
    "displayOptions": {
      "show": {
        "task_create_object": [
          'action_options'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'createTask'
        ]
      }
    },
    "required": true
  },
  {
    "type": 'options',
    "default": '',
    "description": 'Action to perform on the Algolia index.',
    "options": [
      {
        "name": 'replace',
        "value": 'replace'
      },
      {
        "name": 'save',
        "value": 'save'
      },
      {
        "name": 'partial',
        "value": 'partial'
      },
      {
        "name": 'partialNoCreate',
        "value": 'partialNoCreate'
      },
      {
        "name": 'append',
        "value": 'append'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'subscriptionAction'
      }
    },
    "displayName": 'Subscription Action',
    "name": 'subscriptionAction_options',
    "displayOptions": {
      "show": {
        "task_create_object": [
          'subscriptionAction_options'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'createTask'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '* * 1 * *',
    "default": '',
    "description": 'Cron expression for the task\'s schedule.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'cron'
      }
    },
    "displayName": 'Cron',
    "name": 'cron_string',
    "displayOptions": {
      "show": {
        "task_create_object": [
          'cron_string'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'createTask'
        ]
      }
    }
  },
  {
    "type": 'boolean',
    "default": false,
    "description": 'Whether the task is enabled.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'enabled'
      }
    },
    "displayName": 'Enabled',
    "name": 'enabled_boolean',
    "displayOptions": {
      "show": {
        "task_create_object": [
          'enabled_boolean'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'createTask'
        ]
      }
    }
  },
  {
    "type": 'number',
    "default": '',
    "description": 'Maximum accepted percentage of failures for a task run to finish successfully.',
    "typeOptions": {
      "minValue": 0,
      "maxValue": 100
    },
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'failureThreshold'
      }
    },
    "displayName": 'Failure Threshold',
    "name": 'failureThreshold_number',
    "displayOptions": {
      "show": {
        "task_create_object": [
          'failureThreshold_number'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'createTask'
        ]
      }
    }
  },
  {
    "type": 'options',
    "name": 'input',
    "displayName": 'Input',
    "default": '',
    "options": [
      {
        "name": 'Streaming input',
        "value": 'streaming_input'
      },
      {
        "name": 'Docker streams input',
        "value": 'docker_streams_input'
      },
      {
        "name": 'Shopify input',
        "value": 'shopify_input'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "property": 'input',
        "value": '={{ typeof $parameter.streaming_input_object !== "undefined" ? JSON.parse($parameter.streaming_input_object) : typeof $parameter.docker_streams_input_object !== "undefined" ? JSON.parse($parameter.docker_streams_input_object) : typeof $parameter.shopify_input_object !== "undefined" ? JSON.parse($parameter.shopify_input_object) : undefined }}'
      }
    },
    "displayOptions": {
      "show": {
        "task_create_object": [
          'input'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'createTask'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Input for a `streaming` task whose source is of type `ga4BigqueryExport` and for which extracted data is continuously streamed.',
    "required": true,
    "default": '{}',
    "displayName": 'Streaming Input',
    "name": 'streaming_input_object',
    "displayOptions": {
      "show": {
        "task_create_object": [
          'input'
        ],
        "input": [
          'streaming_input'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'createTask'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'The selected streams of an airbyte connector.',
    "required": true,
    "default": '{}',
    "displayName": 'Docker Streams Input',
    "name": 'docker_streams_input_object',
    "displayOptions": {
      "show": {
        "task_create_object": [
          'input'
        ],
        "input": [
          'docker_streams_input'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'createTask'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Represents the required elements of the task input when using a `shopify` source.',
    "required": true,
    "default": '{}',
    "displayName": 'Shopify Input',
    "name": 'shopify_input_object',
    "displayOptions": {
      "show": {
        "task_create_object": [
          'input'
        ],
        "input": [
          'shopify_input'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'createTask'
        ]
      }
    }
  },
  {
    "type": 'string',
    "default": '',
    "description": 'Date of the last cursor in RFC 3339 format.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'cursor'
      }
    },
    "displayName": 'Cursor',
    "name": 'cursor_string',
    "displayOptions": {
      "show": {
        "task_create_object": [
          'cursor_string'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'createTask'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Notifications settings for a task.',
    "required": true,
    "default": '{}',
    "routing": {
      "send": {
        "type": 'body',
        "property": 'notifications',
        "value": '={{ JSON.parse($value) }}'
      }
    },
    "displayName": 'Notifications',
    "name": 'notifications_object',
    "displayOptions": {
      "show": {
        "task_create_object": [
          'notifications_object'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'createTask'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Set of rules for a task.',
    "required": false,
    "default": '{}',
    "routing": {
      "send": {
        "type": 'body',
        "property": 'policies',
        "value": '={{ JSON.parse($value) }}'
      }
    },
    "displayName": 'Policies',
    "name": 'policies_object',
    "displayOptions": {
      "show": {
        "task_create_object": [
          'policies_object'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'createTask'
        ]
      }
    }
  },
  {
    "displayName": 'Task Search',
    "name": 'task_search_object',
    "type": 'multiOptions',
    "description": undefined,
    "required": true,
    "default": [],
    "options": [
      {
        "name": 'Task IDs',
        "value": 'taskIDs_json'
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'searchTasks'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Task IDs',
    "name": 'taskIDs_json',
    "default": '[]',
    "description": undefined,
    "required": true,
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ JSON.parse($value) }}',
        "property": 'taskIDs'
      }
    },
    "displayOptions": {
      "show": {
        "task_search_object": [
          'taskIDs_json'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'searchTasks'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of a task.',
    "displayName": 'Task ID',
    "name": 'taskID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'getTask'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of a task.',
    "displayName": 'Task ID',
    "name": 'taskID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'replaceTask'
        ]
      }
    }
  },
  {
    "displayName": 'Task Replace',
    "name": 'task_replace_object',
    "type": 'multiOptions',
    "description": 'API request body for updating a task.',
    "required": true,
    "default": [],
    "options": [
      {
        "name": 'Destination ID',
        "value": 'destinationID_string'
      },
      {
        "name": 'Action',
        "value": 'action_options'
      },
      {
        "name": 'Subscription Action',
        "value": 'subscriptionAction_options'
      },
      {
        "name": 'Cron',
        "value": 'cron_string'
      },
      {
        "name": 'Enabled',
        "value": 'enabled_boolean'
      },
      {
        "name": 'Failure Threshold',
        "value": 'failureThreshold_number'
      },
      {
        "name": 'Input',
        "value": 'input'
      },
      {
        "name": 'Cursor',
        "value": 'cursor_string'
      },
      {
        "name": 'Notifications',
        "value": 'notifications_object'
      },
      {
        "name": 'Policies',
        "value": 'policies_object'
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'replaceTask'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of a destination resource.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'destinationID'
      }
    },
    "displayName": 'Destination ID',
    "name": 'destinationID_string',
    "displayOptions": {
      "show": {
        "task_replace_object": [
          'destinationID_string'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'replaceTask'
        ]
      }
    },
    "required": true
  },
  {
    "type": 'options',
    "default": '',
    "description": 'Action to perform on the Algolia index.',
    "options": [
      {
        "name": 'replace',
        "value": 'replace'
      },
      {
        "name": 'save',
        "value": 'save'
      },
      {
        "name": 'partial',
        "value": 'partial'
      },
      {
        "name": 'partialNoCreate',
        "value": 'partialNoCreate'
      },
      {
        "name": 'append',
        "value": 'append'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'action'
      }
    },
    "displayName": 'Action',
    "name": 'action_options',
    "displayOptions": {
      "show": {
        "task_replace_object": [
          'action_options'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'replaceTask'
        ]
      }
    },
    "required": true
  },
  {
    "type": 'options',
    "default": '',
    "description": 'Action to perform on the Algolia index.',
    "options": [
      {
        "name": 'replace',
        "value": 'replace'
      },
      {
        "name": 'save',
        "value": 'save'
      },
      {
        "name": 'partial',
        "value": 'partial'
      },
      {
        "name": 'partialNoCreate',
        "value": 'partialNoCreate'
      },
      {
        "name": 'append',
        "value": 'append'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'subscriptionAction'
      }
    },
    "displayName": 'Subscription Action',
    "name": 'subscriptionAction_options',
    "displayOptions": {
      "show": {
        "task_replace_object": [
          'subscriptionAction_options'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'replaceTask'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '* * 1 * *',
    "default": '',
    "description": 'Cron expression for the task\'s schedule.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'cron'
      }
    },
    "displayName": 'Cron',
    "name": 'cron_string',
    "displayOptions": {
      "show": {
        "task_replace_object": [
          'cron_string'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'replaceTask'
        ]
      }
    }
  },
  {
    "type": 'boolean',
    "default": false,
    "description": 'Whether the task is enabled.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'enabled'
      }
    },
    "displayName": 'Enabled',
    "name": 'enabled_boolean',
    "displayOptions": {
      "show": {
        "task_replace_object": [
          'enabled_boolean'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'replaceTask'
        ]
      }
    }
  },
  {
    "type": 'number',
    "default": '',
    "description": 'Maximum accepted percentage of failures for a task run to finish successfully.',
    "typeOptions": {
      "minValue": 0,
      "maxValue": 100
    },
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'failureThreshold'
      }
    },
    "displayName": 'Failure Threshold',
    "name": 'failureThreshold_number',
    "displayOptions": {
      "show": {
        "task_replace_object": [
          'failureThreshold_number'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'replaceTask'
        ]
      }
    }
  },
  {
    "type": 'options',
    "name": 'input',
    "displayName": 'Input',
    "default": '',
    "options": [
      {
        "name": 'Streaming input',
        "value": 'streaming_input'
      },
      {
        "name": 'Docker streams input',
        "value": 'docker_streams_input'
      },
      {
        "name": 'Shopify input',
        "value": 'shopify_input'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "property": 'input',
        "value": '={{ typeof $parameter.streaming_input_object !== "undefined" ? JSON.parse($parameter.streaming_input_object) : typeof $parameter.docker_streams_input_object !== "undefined" ? JSON.parse($parameter.docker_streams_input_object) : typeof $parameter.shopify_input_object !== "undefined" ? JSON.parse($parameter.shopify_input_object) : undefined }}'
      }
    },
    "displayOptions": {
      "show": {
        "task_replace_object": [
          'input'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'replaceTask'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Input for a `streaming` task whose source is of type `ga4BigqueryExport` and for which extracted data is continuously streamed.',
    "required": true,
    "default": '{}',
    "displayName": 'Streaming Input',
    "name": 'streaming_input_object',
    "displayOptions": {
      "show": {
        "task_replace_object": [
          'input'
        ],
        "input": [
          'streaming_input'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'replaceTask'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'The selected streams of an airbyte connector.',
    "required": true,
    "default": '{}',
    "displayName": 'Docker Streams Input',
    "name": 'docker_streams_input_object',
    "displayOptions": {
      "show": {
        "task_replace_object": [
          'input'
        ],
        "input": [
          'docker_streams_input'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'replaceTask'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Represents the required elements of the task input when using a `shopify` source.',
    "required": true,
    "default": '{}',
    "displayName": 'Shopify Input',
    "name": 'shopify_input_object',
    "displayOptions": {
      "show": {
        "task_replace_object": [
          'input'
        ],
        "input": [
          'shopify_input'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'replaceTask'
        ]
      }
    }
  },
  {
    "type": 'string',
    "default": '',
    "description": 'Date of the last cursor in RFC 3339 format.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'cursor'
      }
    },
    "displayName": 'Cursor',
    "name": 'cursor_string',
    "displayOptions": {
      "show": {
        "task_replace_object": [
          'cursor_string'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'replaceTask'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Notifications settings for a task.',
    "required": true,
    "default": '{}',
    "routing": {
      "send": {
        "type": 'body',
        "property": 'notifications',
        "value": '={{ JSON.parse($value) }}'
      }
    },
    "displayName": 'Notifications',
    "name": 'notifications_object',
    "displayOptions": {
      "show": {
        "task_replace_object": [
          'notifications_object'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'replaceTask'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Set of rules for a task.',
    "required": false,
    "default": '{}',
    "routing": {
      "send": {
        "type": 'body',
        "property": 'policies',
        "value": '={{ JSON.parse($value) }}'
      }
    },
    "displayName": 'Policies',
    "name": 'policies_object',
    "displayOptions": {
      "show": {
        "task_replace_object": [
          'policies_object'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'replaceTask'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of a task.',
    "displayName": 'Task ID',
    "name": 'taskID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'updateTask'
        ]
      }
    }
  },
  {
    "displayName": 'Task Update',
    "name": 'task_update_object',
    "type": 'multiOptions',
    "description": 'API request body for partially updating a task.',
    "required": false,
    "default": [],
    "options": [
      {
        "name": 'Destination ID',
        "value": 'destinationID_string'
      },
      {
        "name": 'Cron',
        "value": 'cron_string'
      },
      {
        "name": 'Input',
        "value": 'input'
      },
      {
        "name": 'Enabled',
        "value": 'enabled_boolean'
      },
      {
        "name": 'Subscription Action',
        "value": 'subscriptionAction_options'
      },
      {
        "name": 'Failure Threshold',
        "value": 'failureThreshold_number'
      },
      {
        "name": 'Notifications',
        "value": 'notifications_object'
      },
      {
        "name": 'Policies',
        "value": 'policies_object'
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'updateTask'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of a destination resource.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'destinationID'
      }
    },
    "displayName": 'Destination ID',
    "name": 'destinationID_string',
    "displayOptions": {
      "show": {
        "task_update_object": [
          'destinationID_string'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'updateTask'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '* * 1 * *',
    "default": '',
    "description": 'Cron expression for the task\'s schedule.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'cron'
      }
    },
    "displayName": 'Cron',
    "name": 'cron_string',
    "displayOptions": {
      "show": {
        "task_update_object": [
          'cron_string'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'updateTask'
        ]
      }
    }
  },
  {
    "type": 'options',
    "name": 'input',
    "displayName": 'Input',
    "default": '',
    "options": [
      {
        "name": 'Streaming input',
        "value": 'streaming_input'
      },
      {
        "name": 'Docker streams input',
        "value": 'docker_streams_input'
      },
      {
        "name": 'Shopify input',
        "value": 'shopify_input'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "property": 'input',
        "value": '={{ typeof $parameter.streaming_input_object !== "undefined" ? JSON.parse($parameter.streaming_input_object) : typeof $parameter.docker_streams_input_object !== "undefined" ? JSON.parse($parameter.docker_streams_input_object) : typeof $parameter.shopify_input_object !== "undefined" ? JSON.parse($parameter.shopify_input_object) : undefined }}'
      }
    },
    "displayOptions": {
      "show": {
        "task_update_object": [
          'input'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'updateTask'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Input for a `streaming` task whose source is of type `ga4BigqueryExport` and for which extracted data is continuously streamed.',
    "required": true,
    "default": '{}',
    "displayName": 'Streaming Input',
    "name": 'streaming_input_object',
    "displayOptions": {
      "show": {
        "task_update_object": [
          'input'
        ],
        "input": [
          'streaming_input'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'updateTask'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'The selected streams of an airbyte connector.',
    "required": true,
    "default": '{}',
    "displayName": 'Docker Streams Input',
    "name": 'docker_streams_input_object',
    "displayOptions": {
      "show": {
        "task_update_object": [
          'input'
        ],
        "input": [
          'docker_streams_input'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'updateTask'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Represents the required elements of the task input when using a `shopify` source.',
    "required": true,
    "default": '{}',
    "displayName": 'Shopify Input',
    "name": 'shopify_input_object',
    "displayOptions": {
      "show": {
        "task_update_object": [
          'input'
        ],
        "input": [
          'shopify_input'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'updateTask'
        ]
      }
    }
  },
  {
    "type": 'boolean',
    "default": false,
    "description": 'Whether the task is enabled.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'enabled'
      }
    },
    "displayName": 'Enabled',
    "name": 'enabled_boolean',
    "displayOptions": {
      "show": {
        "task_update_object": [
          'enabled_boolean'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'updateTask'
        ]
      }
    }
  },
  {
    "type": 'options',
    "default": '',
    "description": 'Action to perform on the Algolia index.',
    "options": [
      {
        "name": 'replace',
        "value": 'replace'
      },
      {
        "name": 'save',
        "value": 'save'
      },
      {
        "name": 'partial',
        "value": 'partial'
      },
      {
        "name": 'partialNoCreate',
        "value": 'partialNoCreate'
      },
      {
        "name": 'append',
        "value": 'append'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'subscriptionAction'
      }
    },
    "displayName": 'Subscription Action',
    "name": 'subscriptionAction_options',
    "displayOptions": {
      "show": {
        "task_update_object": [
          'subscriptionAction_options'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'updateTask'
        ]
      }
    }
  },
  {
    "type": 'number',
    "default": '',
    "description": 'Maximum accepted percentage of failures for a task run to finish successfully.',
    "typeOptions": {
      "minValue": 0,
      "maxValue": 100
    },
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'failureThreshold'
      }
    },
    "displayName": 'Failure Threshold',
    "name": 'failureThreshold_number',
    "displayOptions": {
      "show": {
        "task_update_object": [
          'failureThreshold_number'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'updateTask'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Notifications settings for a task.',
    "required": true,
    "default": '{}',
    "routing": {
      "send": {
        "type": 'body',
        "property": 'notifications',
        "value": '={{ JSON.parse($value) }}'
      }
    },
    "displayName": 'Notifications',
    "name": 'notifications_object',
    "displayOptions": {
      "show": {
        "task_update_object": [
          'notifications_object'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'updateTask'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Set of rules for a task.',
    "required": false,
    "default": '{}',
    "routing": {
      "send": {
        "type": 'body',
        "property": 'policies',
        "value": '={{ JSON.parse($value) }}'
      }
    },
    "displayName": 'Policies',
    "name": 'policies_object',
    "displayOptions": {
      "show": {
        "task_update_object": [
          'policies_object'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'updateTask'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of a task.',
    "displayName": 'Task ID',
    "name": 'taskID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'deleteTask'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of a task.',
    "displayName": 'Task ID',
    "name": 'taskID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'runTask'
        ]
      }
    }
  },
  {
    "displayName": 'Run Task Payload',
    "name": 'run_task_payload_object',
    "type": 'multiOptions',
    "description": undefined,
    "required": false,
    "default": [],
    "options": [
      {
        "name": 'Run Metadata',
        "value": 'run_metadata_object'
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'runTask'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Additional information that will be passed to the created run.',
    "required": false,
    "default": '{}',
    "routing": {
      "send": {
        "type": 'body',
        "property": 'runMetadata',
        "value": '={{ JSON.parse($value) }}'
      }
    },
    "displayName": 'Run Metadata',
    "name": 'run_metadata_object',
    "displayOptions": {
      "show": {
        "run_task_payload_object": [
          'run_metadata_object'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'runTask'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of a task.',
    "displayName": 'Task ID',
    "name": 'taskID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'pushTask'
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
          "watch": '={{ $value }}'
        }
      }
    },
    "displayName": 'Watch',
    "name": 'watch_boolean',
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'pushTask'
        ]
      }
    }
  },
  {
    "displayName": 'Push Task Payload',
    "name": 'push_task_payload_object',
    "type": 'multiOptions',
    "description": undefined,
    "required": true,
    "default": [],
    "options": [
      {
        "name": 'Action',
        "value": 'action_options'
      },
      {
        "name": 'Records',
        "value": 'records_json'
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'pushTask'
        ]
      }
    }
  },
  {
    "type": 'options',
    "default": '',
    "description": 'Which indexing operation to perform:\n\n- `addObject`: adds records to an index.\n   Equivalent to the "Add a new record (with auto-generated object ID)" operation.\n- `updateObject`: adds or replaces records in an index.\n   Equivalent to the "Add or replace a record" operation.\n- `partialUpdateObject`: adds or updates attributes within records.\n   Equivalent to the "Add or update attributes" operation with the `createIfNoExists` parameter set to true.\n   (If a record with the specified `objectID` doesn\'t exist in the specified index, this action creates adds the record to the index)\n- `partialUpdateObjectNoCreate`: same as `partialUpdateObject`, but with `createIfNoExists` set to false.\n   (A record isn\'t added to the index if its `objectID` doesn\'t exist)\n- `deleteObject`: delete records from an index.\n  Equivalent to the "Delete a record" operation.\n- `delete`. Delete an index. Equivalent to the "Delete an index" operation.\n- `clear`: delete all records from an index. Equivalent to the "Delete all records from an index operation".\n',
    "options": [
      {
        "name": 'addObject',
        "value": 'addObject'
      },
      {
        "name": 'updateObject',
        "value": 'updateObject'
      },
      {
        "name": 'partialUpdateObject',
        "value": 'partialUpdateObject'
      },
      {
        "name": 'partialUpdateObjectNoCreate',
        "value": 'partialUpdateObjectNoCreate'
      },
      {
        "name": 'deleteObject',
        "value": 'deleteObject'
      },
      {
        "name": 'delete',
        "value": 'delete'
      },
      {
        "name": 'clear',
        "value": 'clear'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'action'
      }
    },
    "displayName": 'Action',
    "name": 'action_options',
    "displayOptions": {
      "show": {
        "push_task_payload_object": [
          'action_options'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'pushTask'
        ]
      }
    },
    "required": true
  },
  {
    "type": 'json',
    "displayName": 'Records',
    "name": 'records_json',
    "default": '[]',
    "description": undefined,
    "required": true,
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ JSON.parse($value) }}',
        "property": 'records'
      }
    },
    "displayOptions": {
      "show": {
        "push_task_payload_object": [
          'records_json'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'pushTask'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of a task.',
    "displayName": 'Task ID',
    "name": 'taskID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'enableTask'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of a task.',
    "displayName": 'Task ID',
    "name": 'taskID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'disableTask'
        ]
      }
    }
  },
  {
    "type": 'number',
    "default": 10,
    "description": 'Number of items per page.',
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
          'tasks'
        ],
        "operation": [
          'listTasksV1'
        ]
      }
    }
  },
  {
    "type": 'number',
    "default": '',
    "description": 'Page of the API response to retrieve.',
    "typeOptions": {
      "minValue": 1
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
          'tasks'
        ],
        "operation": [
          'listTasksV1'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Action',
    "name": 'action_json',
    "default": '[]',
    "description": 'Actions to perform on the Algolia index.',
    "required": false,
    "routing": {
      "request": {
        "qs": {
          "action": '={{ JSON.parse($value) }}'
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'listTasksV1'
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
          "enabled": '={{ $value }}'
        }
      }
    },
    "displayName": 'Enabled',
    "name": 'enabled_boolean',
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'listTasksV1'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Source ID',
    "name": 'sourceID_json',
    "default": '[]',
    "description": undefined,
    "required": false,
    "routing": {
      "request": {
        "qs": {
          "sourceID": '={{ JSON.parse($value) }}'
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'listTasksV1'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Destination ID',
    "name": 'destinationID_json',
    "default": '[]',
    "description": undefined,
    "required": false,
    "routing": {
      "request": {
        "qs": {
          "destinationID": '={{ JSON.parse($value) }}'
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'listTasksV1'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Trigger Type',
    "name": 'triggerType_json',
    "default": '[]',
    "description": undefined,
    "required": false,
    "routing": {
      "request": {
        "qs": {
          "triggerType": '={{ JSON.parse($value) }}'
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'listTasksV1'
        ]
      }
    }
  },
  {
    "type": 'options',
    "default": 'createdAt',
    "description": 'Property by which to sort the list of tasks.',
    "options": [
      {
        "name": 'enabled',
        "value": 'enabled'
      },
      {
        "name": 'triggerType',
        "value": 'triggerType'
      },
      {
        "name": 'action',
        "value": 'action'
      },
      {
        "name": 'updatedAt',
        "value": 'updatedAt'
      },
      {
        "name": 'createdAt',
        "value": 'createdAt'
      }
    ],
    "routing": {
      "request": {
        "qs": {
          "sort": '={{ $value }}'
        }
      }
    },
    "displayName": 'Sort',
    "name": 'sort_options',
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'listTasksV1'
        ]
      }
    }
  },
  {
    "type": 'options',
    "default": 'desc',
    "description": 'Ascending or descending sort order.',
    "options": [
      {
        "name": 'asc',
        "value": 'asc'
      },
      {
        "name": 'desc',
        "value": 'desc'
      }
    ],
    "routing": {
      "request": {
        "qs": {
          "order": '={{ $value }}'
        }
      }
    },
    "displayName": 'Order',
    "name": 'order_options',
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'listTasksV1'
        ]
      }
    }
  },
  {
    "displayName": 'Task Create V1',
    "name": 'task_create_v1_object',
    "type": 'multiOptions',
    "description": 'API request body for creating a task using the V1 shape, please use methods and types that don\'t contain the V1 suffix.',
    "required": true,
    "default": [],
    "options": [
      {
        "name": 'Source ID',
        "value": 'sourceID_string'
      },
      {
        "name": 'Destination ID',
        "value": 'destinationID_string'
      },
      {
        "name": 'Trigger',
        "value": 'trigger'
      },
      {
        "name": 'Action',
        "value": 'action_options'
      },
      {
        "name": 'Enabled',
        "value": 'enabled_boolean'
      },
      {
        "name": 'Failure Threshold',
        "value": 'failureThreshold_number'
      },
      {
        "name": 'Input',
        "value": 'input'
      },
      {
        "name": 'Cursor',
        "value": 'cursor_string'
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'createTaskV1'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally uniqud identifier (UUID) of a source.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'sourceID'
      }
    },
    "displayName": 'Source ID',
    "name": 'sourceID_string',
    "displayOptions": {
      "show": {
        "task_create_v1_object": [
          'sourceID_string'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'createTaskV1'
        ]
      }
    },
    "required": true
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of a destination resource.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'destinationID'
      }
    },
    "displayName": 'Destination ID',
    "name": 'destinationID_string',
    "displayOptions": {
      "show": {
        "task_create_v1_object": [
          'destinationID_string'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'createTaskV1'
        ]
      }
    },
    "required": true
  },
  {
    "type": 'options',
    "name": 'trigger',
    "displayName": 'Trigger',
    "default": '',
    "options": [
      {
        "name": 'On demand trigger input',
        "value": 'on_demand_trigger_input'
      },
      {
        "name": 'Schedule trigger input',
        "value": 'schedule_trigger_input'
      },
      {
        "name": 'Subscription trigger',
        "value": 'subscription_trigger'
      },
      {
        "name": 'Streaming trigger',
        "value": 'streaming_trigger'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "property": 'trigger',
        "value": '={{ typeof $parameter.on_demand_trigger_input_object !== "undefined" ? JSON.parse($parameter.on_demand_trigger_input_object) : typeof $parameter.schedule_trigger_input_object !== "undefined" ? JSON.parse($parameter.schedule_trigger_input_object) : typeof $parameter.subscription_trigger_object !== "undefined" ? JSON.parse($parameter.subscription_trigger_object) : typeof $parameter.streaming_trigger_object !== "undefined" ? JSON.parse($parameter.streaming_trigger_object) : undefined }}'
      }
    },
    "displayOptions": {
      "show": {
        "task_create_v1_object": [
          'trigger'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'createTaskV1'
        ]
      }
    },
    "required": true
  },
  {
    "type": 'json',
    "description": 'Trigger information for manually-triggered tasks.',
    "required": true,
    "default": '{}',
    "displayName": 'On Demand Trigger Input',
    "name": 'on_demand_trigger_input_object',
    "displayOptions": {
      "show": {
        "task_create_v1_object": [
          'trigger'
        ],
        "trigger": [
          'on_demand_trigger_input'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'createTaskV1'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Trigger input for scheduled tasks.',
    "required": true,
    "default": '{}',
    "displayName": 'Schedule Trigger Input',
    "name": 'schedule_trigger_input_object',
    "displayOptions": {
      "show": {
        "task_create_v1_object": [
          'trigger'
        ],
        "trigger": [
          'schedule_trigger_input'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'createTaskV1'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Trigger input for subscription tasks.',
    "required": true,
    "default": '{}',
    "displayName": 'Subscription Trigger',
    "name": 'subscription_trigger_object',
    "displayOptions": {
      "show": {
        "task_create_v1_object": [
          'trigger'
        ],
        "trigger": [
          'subscription_trigger'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'createTaskV1'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Trigger input for continuously running tasks.',
    "required": true,
    "default": '{}',
    "displayName": 'Streaming Trigger',
    "name": 'streaming_trigger_object',
    "displayOptions": {
      "show": {
        "task_create_v1_object": [
          'trigger'
        ],
        "trigger": [
          'streaming_trigger'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'createTaskV1'
        ]
      }
    }
  },
  {
    "type": 'options',
    "default": '',
    "description": 'Action to perform on the Algolia index.',
    "options": [
      {
        "name": 'replace',
        "value": 'replace'
      },
      {
        "name": 'save',
        "value": 'save'
      },
      {
        "name": 'partial',
        "value": 'partial'
      },
      {
        "name": 'partialNoCreate',
        "value": 'partialNoCreate'
      },
      {
        "name": 'append',
        "value": 'append'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'action'
      }
    },
    "displayName": 'Action',
    "name": 'action_options',
    "displayOptions": {
      "show": {
        "task_create_v1_object": [
          'action_options'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'createTaskV1'
        ]
      }
    },
    "required": true
  },
  {
    "type": 'boolean',
    "default": false,
    "description": 'Whether the task is enabled.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'enabled'
      }
    },
    "displayName": 'Enabled',
    "name": 'enabled_boolean',
    "displayOptions": {
      "show": {
        "task_create_v1_object": [
          'enabled_boolean'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'createTaskV1'
        ]
      }
    }
  },
  {
    "type": 'number',
    "default": '',
    "description": 'Maximum accepted percentage of failures for a task run to finish successfully.',
    "typeOptions": {
      "minValue": 0,
      "maxValue": 100
    },
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'failureThreshold'
      }
    },
    "displayName": 'Failure Threshold',
    "name": 'failureThreshold_number',
    "displayOptions": {
      "show": {
        "task_create_v1_object": [
          'failureThreshold_number'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'createTaskV1'
        ]
      }
    }
  },
  {
    "type": 'options',
    "name": 'input',
    "displayName": 'Input',
    "default": '',
    "options": [
      {
        "name": 'Streaming input',
        "value": 'streaming_input'
      },
      {
        "name": 'Docker streams input',
        "value": 'docker_streams_input'
      },
      {
        "name": 'Shopify input',
        "value": 'shopify_input'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "property": 'input',
        "value": '={{ typeof $parameter.streaming_input_object !== "undefined" ? JSON.parse($parameter.streaming_input_object) : typeof $parameter.docker_streams_input_object !== "undefined" ? JSON.parse($parameter.docker_streams_input_object) : typeof $parameter.shopify_input_object !== "undefined" ? JSON.parse($parameter.shopify_input_object) : undefined }}'
      }
    },
    "displayOptions": {
      "show": {
        "task_create_v1_object": [
          'input'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'createTaskV1'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Input for a `streaming` task whose source is of type `ga4BigqueryExport` and for which extracted data is continuously streamed.',
    "required": true,
    "default": '{}',
    "displayName": 'Streaming Input',
    "name": 'streaming_input_object',
    "displayOptions": {
      "show": {
        "task_create_v1_object": [
          'input'
        ],
        "input": [
          'streaming_input'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'createTaskV1'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'The selected streams of an airbyte connector.',
    "required": true,
    "default": '{}',
    "displayName": 'Docker Streams Input',
    "name": 'docker_streams_input_object',
    "displayOptions": {
      "show": {
        "task_create_v1_object": [
          'input'
        ],
        "input": [
          'docker_streams_input'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'createTaskV1'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Represents the required elements of the task input when using a `shopify` source.',
    "required": true,
    "default": '{}',
    "displayName": 'Shopify Input',
    "name": 'shopify_input_object',
    "displayOptions": {
      "show": {
        "task_create_v1_object": [
          'input'
        ],
        "input": [
          'shopify_input'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'createTaskV1'
        ]
      }
    }
  },
  {
    "type": 'string',
    "default": '',
    "description": 'Date of the last cursor in RFC 3339 format.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'cursor'
      }
    },
    "displayName": 'Cursor',
    "name": 'cursor_string',
    "displayOptions": {
      "show": {
        "task_create_v1_object": [
          'cursor_string'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'createTaskV1'
        ]
      }
    }
  },
  {
    "displayName": 'Task Search',
    "name": 'task_search_object',
    "type": 'multiOptions',
    "description": undefined,
    "required": true,
    "default": [],
    "options": [
      {
        "name": 'Task IDs',
        "value": 'taskIDs_json'
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'searchTasksV1'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Task IDs',
    "name": 'taskIDs_json',
    "default": '[]',
    "description": undefined,
    "required": true,
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ JSON.parse($value) }}',
        "property": 'taskIDs'
      }
    },
    "displayOptions": {
      "show": {
        "task_search_object": [
          'taskIDs_json'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'searchTasksV1'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of a task.',
    "displayName": 'Task ID',
    "name": 'taskID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'getTaskV1'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of a task.',
    "displayName": 'Task ID',
    "name": 'taskID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'updateTaskV1'
        ]
      }
    }
  },
  {
    "displayName": 'Task Update V1',
    "name": 'task_update_v1_object',
    "type": 'multiOptions',
    "description": 'API request body for updating a task using the V1 shape, please use methods and types that don\'t contain the V1 suffix.',
    "required": false,
    "default": [],
    "options": [
      {
        "name": 'Destination ID',
        "value": 'destinationID_string'
      },
      {
        "name": 'Trigger Update Input',
        "value": 'trigger_update_input_object'
      },
      {
        "name": 'Input',
        "value": 'input'
      },
      {
        "name": 'Enabled',
        "value": 'enabled_boolean'
      },
      {
        "name": 'Failure Threshold',
        "value": 'failureThreshold_number'
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'updateTaskV1'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of a destination resource.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'destinationID'
      }
    },
    "displayName": 'Destination ID',
    "name": 'destinationID_string',
    "displayOptions": {
      "show": {
        "task_update_v1_object": [
          'destinationID_string'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'updateTaskV1'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Trigger for a task update.',
    "required": true,
    "default": '{}',
    "routing": {
      "send": {
        "type": 'body',
        "property": 'trigger',
        "value": '={{ JSON.parse($value) }}'
      }
    },
    "displayName": 'Trigger Update Input',
    "name": 'trigger_update_input_object',
    "displayOptions": {
      "show": {
        "task_update_v1_object": [
          'trigger_update_input_object'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'updateTaskV1'
        ]
      }
    }
  },
  {
    "type": 'options',
    "name": 'input',
    "displayName": 'Input',
    "default": '',
    "options": [
      {
        "name": 'Streaming input',
        "value": 'streaming_input'
      },
      {
        "name": 'Docker streams input',
        "value": 'docker_streams_input'
      },
      {
        "name": 'Shopify input',
        "value": 'shopify_input'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "property": 'input',
        "value": '={{ typeof $parameter.streaming_input_object !== "undefined" ? JSON.parse($parameter.streaming_input_object) : typeof $parameter.docker_streams_input_object !== "undefined" ? JSON.parse($parameter.docker_streams_input_object) : typeof $parameter.shopify_input_object !== "undefined" ? JSON.parse($parameter.shopify_input_object) : undefined }}'
      }
    },
    "displayOptions": {
      "show": {
        "task_update_v1_object": [
          'input'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'updateTaskV1'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Input for a `streaming` task whose source is of type `ga4BigqueryExport` and for which extracted data is continuously streamed.',
    "required": true,
    "default": '{}',
    "displayName": 'Streaming Input',
    "name": 'streaming_input_object',
    "displayOptions": {
      "show": {
        "task_update_v1_object": [
          'input'
        ],
        "input": [
          'streaming_input'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'updateTaskV1'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'The selected streams of an airbyte connector.',
    "required": true,
    "default": '{}',
    "displayName": 'Docker Streams Input',
    "name": 'docker_streams_input_object',
    "displayOptions": {
      "show": {
        "task_update_v1_object": [
          'input'
        ],
        "input": [
          'docker_streams_input'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'updateTaskV1'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Represents the required elements of the task input when using a `shopify` source.',
    "required": true,
    "default": '{}',
    "displayName": 'Shopify Input',
    "name": 'shopify_input_object',
    "displayOptions": {
      "show": {
        "task_update_v1_object": [
          'input'
        ],
        "input": [
          'shopify_input'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'updateTaskV1'
        ]
      }
    }
  },
  {
    "type": 'boolean',
    "default": false,
    "description": 'Whether the task is enabled.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'enabled'
      }
    },
    "displayName": 'Enabled',
    "name": 'enabled_boolean',
    "displayOptions": {
      "show": {
        "task_update_v1_object": [
          'enabled_boolean'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'updateTaskV1'
        ]
      }
    }
  },
  {
    "type": 'number',
    "default": '',
    "description": 'Maximum accepted percentage of failures for a task run to finish successfully.',
    "typeOptions": {
      "minValue": 0,
      "maxValue": 100
    },
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'failureThreshold'
      }
    },
    "displayName": 'Failure Threshold',
    "name": 'failureThreshold_number',
    "displayOptions": {
      "show": {
        "task_update_v1_object": [
          'failureThreshold_number'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'updateTaskV1'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of a task.',
    "displayName": 'Task ID',
    "name": 'taskID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'deleteTaskV1'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of a task.',
    "displayName": 'Task ID',
    "name": 'taskID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'runTaskV1'
        ]
      }
    }
  },
  {
    "displayName": 'Run Task Payload',
    "name": 'run_task_payload_object',
    "type": 'multiOptions',
    "description": undefined,
    "required": false,
    "default": [],
    "options": [
      {
        "name": 'Run Metadata',
        "value": 'run_metadata_object'
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'runTaskV1'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Additional information that will be passed to the created run.',
    "required": false,
    "default": '{}',
    "routing": {
      "send": {
        "type": 'body',
        "property": 'runMetadata',
        "value": '={{ JSON.parse($value) }}'
      }
    },
    "displayName": 'Run Metadata',
    "name": 'run_metadata_object',
    "displayOptions": {
      "show": {
        "run_task_payload_object": [
          'run_metadata_object'
        ],
        "resource": [
          'tasks'
        ],
        "operation": [
          'runTaskV1'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of a task.',
    "displayName": 'Task ID',
    "name": 'taskID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'enableTaskV1'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of a task.',
    "displayName": 'Task ID',
    "name": 'taskID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'tasks'
        ],
        "operation": [
          'disableTaskV1'
        ]
      }
    }
  },
  {
    "type": 'number',
    "default": 10,
    "description": 'Number of items per page.',
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
          'transformations'
        ],
        "operation": [
          'listTransformations'
        ]
      }
    }
  },
  {
    "type": 'number',
    "default": '',
    "description": 'Page of the API response to retrieve.',
    "typeOptions": {
      "minValue": 1
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
          'transformations'
        ],
        "operation": [
          'listTransformations'
        ]
      }
    }
  },
  {
    "type": 'options',
    "default": 'createdAt',
    "description": 'Property by which to sort the list of transformations.',
    "options": [
      {
        "name": 'name',
        "value": 'name'
      },
      {
        "name": 'updatedAt',
        "value": 'updatedAt'
      },
      {
        "name": 'createdAt',
        "value": 'createdAt'
      }
    ],
    "routing": {
      "request": {
        "qs": {
          "sort": '={{ $value }}'
        }
      }
    },
    "displayName": 'Sort',
    "name": 'sort_options',
    "displayOptions": {
      "show": {
        "resource": [
          'transformations'
        ],
        "operation": [
          'listTransformations'
        ]
      }
    }
  },
  {
    "type": 'options',
    "default": 'desc',
    "description": 'Ascending or descending sort order.',
    "options": [
      {
        "name": 'asc',
        "value": 'asc'
      },
      {
        "name": 'desc',
        "value": 'desc'
      }
    ],
    "routing": {
      "request": {
        "qs": {
          "order": '={{ $value }}'
        }
      }
    },
    "displayName": 'Order',
    "name": 'order_options',
    "displayOptions": {
      "show": {
        "resource": [
          'transformations'
        ],
        "operation": [
          'listTransformations'
        ]
      }
    }
  },
  {
    "type": 'options',
    "default": '',
    "description": 'The type of transformation, which can be either \'code\' or \'noCode\'.',
    "options": [
      {
        "name": 'code',
        "value": 'code'
      },
      {
        "name": 'noCode',
        "value": 'noCode'
      }
    ],
    "routing": {
      "request": {
        "qs": {
          "type": '={{ $value }}'
        }
      }
    },
    "displayName": 'Type',
    "name": 'type_options',
    "displayOptions": {
      "show": {
        "resource": [
          'transformations'
        ],
        "operation": [
          'listTransformations'
        ]
      }
    }
  },
  {
    "displayName": 'Transformation Create',
    "name": 'transformation_create_object',
    "type": 'multiOptions',
    "description": 'API request body for creating a transformation.',
    "required": true,
    "default": [],
    "options": [
      {
        "name": 'Code',
        "value": 'code_string'
      },
      {
        "name": 'Name',
        "value": 'name_string'
      },
      {
        "name": 'Type',
        "value": 'type_options'
      },
      {
        "name": 'Input',
        "value": 'input'
      },
      {
        "name": 'Description',
        "value": 'description_string'
      },
      {
        "name": 'Authentication IDs',
        "value": 'authenticationIDs_json'
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'transformations'
        ],
        "operation": [
          'createTransformation'
        ]
      }
    }
  },
  {
    "type": 'string',
    "default": '',
    "description": 'It is deprecated. Use the `input` field with proper `type` instead to specify the transformation code.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'code'
      }
    },
    "displayName": 'Code',
    "name": 'code_string',
    "displayOptions": {
      "show": {
        "transformation_create_object": [
          'code_string'
        ],
        "resource": [
          'transformations'
        ],
        "operation": [
          'createTransformation'
        ]
      }
    }
  },
  {
    "type": 'string',
    "default": '',
    "description": 'The uniquely identified name of your transformation.',
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
        "transformation_create_object": [
          'name_string'
        ],
        "resource": [
          'transformations'
        ],
        "operation": [
          'createTransformation'
        ]
      }
    },
    "required": true
  },
  {
    "type": 'options',
    "default": '',
    "description": 'The type of transformation, which can be either \'code\' or \'noCode\'.',
    "options": [
      {
        "name": 'code',
        "value": 'code'
      },
      {
        "name": 'noCode',
        "value": 'noCode'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'type'
      }
    },
    "displayName": 'Type',
    "name": 'type_options',
    "displayOptions": {
      "show": {
        "transformation_create_object": [
          'type_options'
        ],
        "resource": [
          'transformations'
        ],
        "operation": [
          'createTransformation'
        ]
      }
    }
  },
  {
    "type": 'options',
    "name": 'input',
    "displayName": 'Input',
    "default": '',
    "options": [
      {
        "name": 'Transformation code',
        "value": 'transformation_code'
      },
      {
        "name": 'Transformation no code',
        "value": 'transformation_no_code'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "property": 'input',
        "value": '={{ typeof $parameter.transformation_code_object !== "undefined" ? JSON.parse($parameter.transformation_code_object) : typeof $parameter.transformation_no_code_object !== "undefined" ? JSON.parse($parameter.transformation_no_code_object) : undefined }}'
      }
    },
    "displayOptions": {
      "show": {
        "transformation_create_object": [
          'input'
        ],
        "resource": [
          'transformations'
        ],
        "operation": [
          'createTransformation'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Input for a transformation that contains the source code of the transformation.',
    "required": true,
    "default": '{}',
    "displayName": 'Transformation Code',
    "name": 'transformation_code_object',
    "displayOptions": {
      "show": {
        "transformation_create_object": [
          'input'
        ],
        "input": [
          'transformation_code'
        ],
        "resource": [
          'transformations'
        ],
        "operation": [
          'createTransformation'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Input for a no-code transformation that contains a series of steps.',
    "required": true,
    "default": '{}',
    "displayName": 'Transformation No Code',
    "name": 'transformation_no_code_object',
    "displayOptions": {
      "show": {
        "transformation_create_object": [
          'input'
        ],
        "input": [
          'transformation_no_code'
        ],
        "resource": [
          'transformations'
        ],
        "operation": [
          'createTransformation'
        ]
      }
    }
  },
  {
    "type": 'string',
    "default": '',
    "description": 'A descriptive name for your transformation of what it does.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'description'
      }
    },
    "displayName": 'Description',
    "name": 'description_string',
    "displayOptions": {
      "show": {
        "transformation_create_object": [
          'description_string'
        ],
        "resource": [
          'transformations'
        ],
        "operation": [
          'createTransformation'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Authentication IDs',
    "name": 'authenticationIDs_json',
    "default": '[]',
    "description": 'The authentications associated with the current transformation.',
    "required": false,
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ JSON.parse($value) }}',
        "property": 'authenticationIDs'
      }
    },
    "displayOptions": {
      "show": {
        "transformation_create_object": [
          'authenticationIDs_json'
        ],
        "resource": [
          'transformations'
        ],
        "operation": [
          'createTransformation'
        ]
      }
    }
  },
  {
    "displayName": 'Transformation Try',
    "name": 'transformation_try_object',
    "type": 'multiOptions',
    "description": undefined,
    "required": true,
    "default": [],
    "options": [
      {
        "name": 'Code',
        "value": 'code_string'
      },
      {
        "name": 'Type',
        "value": 'type_options'
      },
      {
        "name": 'Input',
        "value": 'input'
      },
      {
        "name": 'Sample Record',
        "value": 'sample_record_object'
      },
      {
        "name": 'Authentications',
        "value": 'authentications_json'
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'transformations'
        ],
        "operation": [
          'tryTransformation'
        ]
      }
    }
  },
  {
    "type": 'string',
    "default": '',
    "description": 'It is deprecated. Use the `input` field with proper `type` instead to specify the transformation code.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'code'
      }
    },
    "displayName": 'Code',
    "name": 'code_string',
    "displayOptions": {
      "show": {
        "transformation_try_object": [
          'code_string'
        ],
        "resource": [
          'transformations'
        ],
        "operation": [
          'tryTransformation'
        ]
      }
    }
  },
  {
    "type": 'options',
    "default": '',
    "description": 'The type of transformation, which can be either \'code\' or \'noCode\'.',
    "options": [
      {
        "name": 'code',
        "value": 'code'
      },
      {
        "name": 'noCode',
        "value": 'noCode'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'type'
      }
    },
    "displayName": 'Type',
    "name": 'type_options',
    "displayOptions": {
      "show": {
        "transformation_try_object": [
          'type_options'
        ],
        "resource": [
          'transformations'
        ],
        "operation": [
          'tryTransformation'
        ]
      }
    }
  },
  {
    "type": 'options',
    "name": 'input',
    "displayName": 'Input',
    "default": '',
    "options": [
      {
        "name": 'Transformation code',
        "value": 'transformation_code'
      },
      {
        "name": 'Transformation no code',
        "value": 'transformation_no_code'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "property": 'input',
        "value": '={{ typeof $parameter.transformation_code_object !== "undefined" ? JSON.parse($parameter.transformation_code_object) : typeof $parameter.transformation_no_code_object !== "undefined" ? JSON.parse($parameter.transformation_no_code_object) : undefined }}'
      }
    },
    "displayOptions": {
      "show": {
        "transformation_try_object": [
          'input'
        ],
        "resource": [
          'transformations'
        ],
        "operation": [
          'tryTransformation'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Input for a transformation that contains the source code of the transformation.',
    "required": true,
    "default": '{}',
    "displayName": 'Transformation Code',
    "name": 'transformation_code_object',
    "displayOptions": {
      "show": {
        "transformation_try_object": [
          'input'
        ],
        "input": [
          'transformation_code'
        ],
        "resource": [
          'transformations'
        ],
        "operation": [
          'tryTransformation'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Input for a no-code transformation that contains a series of steps.',
    "required": true,
    "default": '{}',
    "displayName": 'Transformation No Code',
    "name": 'transformation_no_code_object',
    "displayOptions": {
      "show": {
        "transformation_try_object": [
          'input'
        ],
        "input": [
          'transformation_no_code'
        ],
        "resource": [
          'transformations'
        ],
        "operation": [
          'tryTransformation'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'The record to apply the given code to.',
    "required": true,
    "default": '{}',
    "routing": {
      "send": {
        "type": 'body',
        "property": 'sampleRecord',
        "value": '={{ JSON.parse($value) }}'
      }
    },
    "displayName": 'Sample Record',
    "name": 'sample_record_object',
    "displayOptions": {
      "show": {
        "transformation_try_object": [
          'sample_record_object'
        ],
        "resource": [
          'transformations'
        ],
        "operation": [
          'tryTransformation'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Authentications',
    "name": 'authentications_json',
    "default": '[]',
    "description": undefined,
    "required": false,
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ JSON.parse($value) }}',
        "property": 'authentications'
      }
    },
    "displayOptions": {
      "show": {
        "transformation_try_object": [
          'authentications_json'
        ],
        "resource": [
          'transformations'
        ],
        "operation": [
          'tryTransformation'
        ]
      }
    }
  },
  {
    "displayName": 'Transformation Search',
    "name": 'transformation_search_object',
    "type": 'multiOptions',
    "description": undefined,
    "required": true,
    "default": [],
    "options": [
      {
        "name": 'Transformation IDs',
        "value": 'transformationIDs_json'
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'transformations'
        ],
        "operation": [
          'searchTransformations'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Transformation IDs',
    "name": 'transformationIDs_json',
    "default": '[]',
    "description": undefined,
    "required": true,
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ JSON.parse($value) }}',
        "property": 'transformationIDs'
      }
    },
    "displayOptions": {
      "show": {
        "transformation_search_object": [
          'transformationIDs_json'
        ],
        "resource": [
          'transformations'
        ],
        "operation": [
          'searchTransformations'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of a transformation.',
    "displayName": 'Transformation ID',
    "name": 'transformationID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'transformations'
        ],
        "operation": [
          'getTransformation'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of a transformation.',
    "displayName": 'Transformation ID',
    "name": 'transformationID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'transformations'
        ],
        "operation": [
          'updateTransformation'
        ]
      }
    }
  },
  {
    "displayName": 'Transformation Create',
    "name": 'transformation_create_object',
    "type": 'multiOptions',
    "description": 'API request body for creating a transformation.',
    "required": true,
    "default": [],
    "options": [
      {
        "name": 'Code',
        "value": 'code_string'
      },
      {
        "name": 'Name',
        "value": 'name_string'
      },
      {
        "name": 'Type',
        "value": 'type_options'
      },
      {
        "name": 'Input',
        "value": 'input'
      },
      {
        "name": 'Description',
        "value": 'description_string'
      },
      {
        "name": 'Authentication IDs',
        "value": 'authenticationIDs_json'
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'transformations'
        ],
        "operation": [
          'updateTransformation'
        ]
      }
    }
  },
  {
    "type": 'string',
    "default": '',
    "description": 'It is deprecated. Use the `input` field with proper `type` instead to specify the transformation code.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'code'
      }
    },
    "displayName": 'Code',
    "name": 'code_string',
    "displayOptions": {
      "show": {
        "transformation_create_object": [
          'code_string'
        ],
        "resource": [
          'transformations'
        ],
        "operation": [
          'updateTransformation'
        ]
      }
    }
  },
  {
    "type": 'string',
    "default": '',
    "description": 'The uniquely identified name of your transformation.',
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
        "transformation_create_object": [
          'name_string'
        ],
        "resource": [
          'transformations'
        ],
        "operation": [
          'updateTransformation'
        ]
      }
    },
    "required": true
  },
  {
    "type": 'options',
    "default": '',
    "description": 'The type of transformation, which can be either \'code\' or \'noCode\'.',
    "options": [
      {
        "name": 'code',
        "value": 'code'
      },
      {
        "name": 'noCode',
        "value": 'noCode'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'type'
      }
    },
    "displayName": 'Type',
    "name": 'type_options',
    "displayOptions": {
      "show": {
        "transformation_create_object": [
          'type_options'
        ],
        "resource": [
          'transformations'
        ],
        "operation": [
          'updateTransformation'
        ]
      }
    }
  },
  {
    "type": 'options',
    "name": 'input',
    "displayName": 'Input',
    "default": '',
    "options": [
      {
        "name": 'Transformation code',
        "value": 'transformation_code'
      },
      {
        "name": 'Transformation no code',
        "value": 'transformation_no_code'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "property": 'input',
        "value": '={{ typeof $parameter.transformation_code_object !== "undefined" ? JSON.parse($parameter.transformation_code_object) : typeof $parameter.transformation_no_code_object !== "undefined" ? JSON.parse($parameter.transformation_no_code_object) : undefined }}'
      }
    },
    "displayOptions": {
      "show": {
        "transformation_create_object": [
          'input'
        ],
        "resource": [
          'transformations'
        ],
        "operation": [
          'updateTransformation'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Input for a transformation that contains the source code of the transformation.',
    "required": true,
    "default": '{}',
    "displayName": 'Transformation Code',
    "name": 'transformation_code_object',
    "displayOptions": {
      "show": {
        "transformation_create_object": [
          'input'
        ],
        "input": [
          'transformation_code'
        ],
        "resource": [
          'transformations'
        ],
        "operation": [
          'updateTransformation'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Input for a no-code transformation that contains a series of steps.',
    "required": true,
    "default": '{}',
    "displayName": 'Transformation No Code',
    "name": 'transformation_no_code_object',
    "displayOptions": {
      "show": {
        "transformation_create_object": [
          'input'
        ],
        "input": [
          'transformation_no_code'
        ],
        "resource": [
          'transformations'
        ],
        "operation": [
          'updateTransformation'
        ]
      }
    }
  },
  {
    "type": 'string',
    "default": '',
    "description": 'A descriptive name for your transformation of what it does.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'description'
      }
    },
    "displayName": 'Description',
    "name": 'description_string',
    "displayOptions": {
      "show": {
        "transformation_create_object": [
          'description_string'
        ],
        "resource": [
          'transformations'
        ],
        "operation": [
          'updateTransformation'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Authentication IDs',
    "name": 'authenticationIDs_json',
    "default": '[]',
    "description": 'The authentications associated with the current transformation.',
    "required": false,
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ JSON.parse($value) }}',
        "property": 'authenticationIDs'
      }
    },
    "displayOptions": {
      "show": {
        "transformation_create_object": [
          'authenticationIDs_json'
        ],
        "resource": [
          'transformations'
        ],
        "operation": [
          'updateTransformation'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of a transformation.',
    "displayName": 'Transformation ID',
    "name": 'transformationID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'transformations'
        ],
        "operation": [
          'deleteTransformation'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of a transformation.',
    "displayName": 'Transformation ID',
    "name": 'transformationID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'transformations'
        ],
        "operation": [
          'tryTransformationBeforeUpdate'
        ]
      }
    }
  },
  {
    "displayName": 'Transformation Try',
    "name": 'transformation_try_object',
    "type": 'multiOptions',
    "description": undefined,
    "required": true,
    "default": [],
    "options": [
      {
        "name": 'Code',
        "value": 'code_string'
      },
      {
        "name": 'Type',
        "value": 'type_options'
      },
      {
        "name": 'Input',
        "value": 'input'
      },
      {
        "name": 'Sample Record',
        "value": 'sample_record_object'
      },
      {
        "name": 'Authentications',
        "value": 'authentications_json'
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'transformations'
        ],
        "operation": [
          'tryTransformationBeforeUpdate'
        ]
      }
    }
  },
  {
    "type": 'string',
    "default": '',
    "description": 'It is deprecated. Use the `input` field with proper `type` instead to specify the transformation code.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'code'
      }
    },
    "displayName": 'Code',
    "name": 'code_string',
    "displayOptions": {
      "show": {
        "transformation_try_object": [
          'code_string'
        ],
        "resource": [
          'transformations'
        ],
        "operation": [
          'tryTransformationBeforeUpdate'
        ]
      }
    }
  },
  {
    "type": 'options',
    "default": '',
    "description": 'The type of transformation, which can be either \'code\' or \'noCode\'.',
    "options": [
      {
        "name": 'code',
        "value": 'code'
      },
      {
        "name": 'noCode',
        "value": 'noCode'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'type'
      }
    },
    "displayName": 'Type',
    "name": 'type_options',
    "displayOptions": {
      "show": {
        "transformation_try_object": [
          'type_options'
        ],
        "resource": [
          'transformations'
        ],
        "operation": [
          'tryTransformationBeforeUpdate'
        ]
      }
    }
  },
  {
    "type": 'options',
    "name": 'input',
    "displayName": 'Input',
    "default": '',
    "options": [
      {
        "name": 'Transformation code',
        "value": 'transformation_code'
      },
      {
        "name": 'Transformation no code',
        "value": 'transformation_no_code'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "property": 'input',
        "value": '={{ typeof $parameter.transformation_code_object !== "undefined" ? JSON.parse($parameter.transformation_code_object) : typeof $parameter.transformation_no_code_object !== "undefined" ? JSON.parse($parameter.transformation_no_code_object) : undefined }}'
      }
    },
    "displayOptions": {
      "show": {
        "transformation_try_object": [
          'input'
        ],
        "resource": [
          'transformations'
        ],
        "operation": [
          'tryTransformationBeforeUpdate'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Input for a transformation that contains the source code of the transformation.',
    "required": true,
    "default": '{}',
    "displayName": 'Transformation Code',
    "name": 'transformation_code_object',
    "displayOptions": {
      "show": {
        "transformation_try_object": [
          'input'
        ],
        "input": [
          'transformation_code'
        ],
        "resource": [
          'transformations'
        ],
        "operation": [
          'tryTransformationBeforeUpdate'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'Input for a no-code transformation that contains a series of steps.',
    "required": true,
    "default": '{}',
    "displayName": 'Transformation No Code',
    "name": 'transformation_no_code_object',
    "displayOptions": {
      "show": {
        "transformation_try_object": [
          'input'
        ],
        "input": [
          'transformation_no_code'
        ],
        "resource": [
          'transformations'
        ],
        "operation": [
          'tryTransformationBeforeUpdate'
        ]
      }
    }
  },
  {
    "type": 'json',
    "description": 'The record to apply the given code to.',
    "required": true,
    "default": '{}',
    "routing": {
      "send": {
        "type": 'body',
        "property": 'sampleRecord',
        "value": '={{ JSON.parse($value) }}'
      }
    },
    "displayName": 'Sample Record',
    "name": 'sample_record_object',
    "displayOptions": {
      "show": {
        "transformation_try_object": [
          'sample_record_object'
        ],
        "resource": [
          'transformations'
        ],
        "operation": [
          'tryTransformationBeforeUpdate'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Authentications',
    "name": 'authentications_json',
    "default": '[]',
    "description": undefined,
    "required": false,
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ JSON.parse($value) }}',
        "property": 'authentications'
      }
    },
    "displayOptions": {
      "show": {
        "transformation_try_object": [
          'authentications_json'
        ],
        "resource": [
          'transformations'
        ],
        "operation": [
          'tryTransformationBeforeUpdate'
        ]
      }
    }
  },
  {
    "type": 'number',
    "default": 10,
    "description": 'Number of items per page.',
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
          'observability'
        ],
        "operation": [
          'listRuns'
        ]
      }
    }
  },
  {
    "type": 'number',
    "default": '',
    "description": 'Page of the API response to retrieve.',
    "typeOptions": {
      "minValue": 1
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
          'observability'
        ],
        "operation": [
          'listRuns'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Status',
    "name": 'status_json',
    "default": '[]',
    "description": undefined,
    "required": false,
    "routing": {
      "request": {
        "qs": {
          "status": '={{ JSON.parse($value) }}'
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'observability'
        ],
        "operation": [
          'listRuns'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Type',
    "name": 'type_json',
    "default": '[]',
    "description": undefined,
    "required": false,
    "routing": {
      "request": {
        "qs": {
          "type": '={{ JSON.parse($value) }}'
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'observability'
        ],
        "operation": [
          'listRuns'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of a task.',
    "routing": {
      "request": {
        "qs": {
          "taskID": '={{ $value }}'
        }
      }
    },
    "displayName": 'Task ID',
    "name": 'taskID_string',
    "displayOptions": {
      "show": {
        "resource": [
          'observability'
        ],
        "operation": [
          'listRuns'
        ]
      }
    }
  },
  {
    "type": 'options',
    "default": 'createdAt',
    "description": 'Property by which to sort the list of task runs.',
    "options": [
      {
        "name": 'status',
        "value": 'status'
      },
      {
        "name": 'updatedAt',
        "value": 'updatedAt'
      },
      {
        "name": 'createdAt',
        "value": 'createdAt'
      }
    ],
    "routing": {
      "request": {
        "qs": {
          "sort": '={{ $value }}'
        }
      }
    },
    "displayName": 'Sort',
    "name": 'sort_options',
    "displayOptions": {
      "show": {
        "resource": [
          'observability'
        ],
        "operation": [
          'listRuns'
        ]
      }
    }
  },
  {
    "type": 'options',
    "default": 'desc',
    "description": 'Ascending or descending sort order.',
    "options": [
      {
        "name": 'asc',
        "value": 'asc'
      },
      {
        "name": 'desc',
        "value": 'desc'
      }
    ],
    "routing": {
      "request": {
        "qs": {
          "order": '={{ $value }}'
        }
      }
    },
    "displayName": 'Order',
    "name": 'order_options',
    "displayOptions": {
      "show": {
        "resource": [
          'observability'
        ],
        "operation": [
          'listRuns'
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
          "startDate": '={{ $value }}'
        }
      }
    },
    "displayName": 'Start Date',
    "name": 'startDate_string',
    "displayOptions": {
      "show": {
        "resource": [
          'observability'
        ],
        "operation": [
          'listRuns'
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
          "endDate": '={{ $value }}'
        }
      }
    },
    "displayName": 'End Date',
    "name": 'endDate_string',
    "displayOptions": {
      "show": {
        "resource": [
          'observability'
        ],
        "operation": [
          'listRuns'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of a task run.',
    "displayName": 'Run ID',
    "name": 'runID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'observability'
        ],
        "operation": [
          'getRun'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of a task run.',
    "displayName": 'Run ID',
    "name": 'runID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'observability'
        ],
        "operation": [
          'listEvents'
        ]
      }
    }
  },
  {
    "type": 'number',
    "default": 10,
    "description": 'Number of items per page.',
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
          'observability'
        ],
        "operation": [
          'listEvents'
        ]
      }
    }
  },
  {
    "type": 'number',
    "default": '',
    "description": 'Page of the API response to retrieve.',
    "typeOptions": {
      "minValue": 1
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
          'observability'
        ],
        "operation": [
          'listEvents'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Status',
    "name": 'status_json',
    "default": '[]',
    "description": undefined,
    "required": false,
    "routing": {
      "request": {
        "qs": {
          "status": '={{ JSON.parse($value) }}'
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'observability'
        ],
        "operation": [
          'listEvents'
        ]
      }
    }
  },
  {
    "type": 'json',
    "displayName": 'Type',
    "name": 'type_json',
    "default": '[]',
    "description": undefined,
    "required": false,
    "routing": {
      "request": {
        "qs": {
          "type": '={{ JSON.parse($value) }}'
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'observability'
        ],
        "operation": [
          'listEvents'
        ]
      }
    }
  },
  {
    "type": 'options',
    "default": '',
    "description": 'Property by which to sort the list of task run events.',
    "options": [
      {
        "name": 'status',
        "value": 'status'
      },
      {
        "name": 'type',
        "value": 'type'
      },
      {
        "name": 'publishedAt',
        "value": 'publishedAt'
      }
    ],
    "routing": {
      "request": {
        "qs": {
          "sort": '={{ $value }}'
        }
      }
    },
    "displayName": 'Sort',
    "name": 'sort_options',
    "displayOptions": {
      "show": {
        "resource": [
          'observability'
        ],
        "operation": [
          'listEvents'
        ]
      }
    }
  },
  {
    "type": 'options',
    "default": 'desc',
    "description": 'Ascending or descending sort order.',
    "options": [
      {
        "name": 'asc',
        "value": 'asc'
      },
      {
        "name": 'desc',
        "value": 'desc'
      }
    ],
    "routing": {
      "request": {
        "qs": {
          "order": '={{ $value }}'
        }
      }
    },
    "displayName": 'Order',
    "name": 'order_options',
    "displayOptions": {
      "show": {
        "resource": [
          'observability'
        ],
        "operation": [
          'listEvents'
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
          "startDate": '={{ $value }}'
        }
      }
    },
    "displayName": 'Start Date',
    "name": 'startDate_string',
    "displayOptions": {
      "show": {
        "resource": [
          'observability'
        ],
        "operation": [
          'listEvents'
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
          "endDate": '={{ $value }}'
        }
      }
    },
    "displayName": 'End Date',
    "name": 'endDate_string',
    "displayOptions": {
      "show": {
        "resource": [
          'observability'
        ],
        "operation": [
          'listEvents'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of a task run.',
    "displayName": 'Run ID',
    "name": 'runID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'observability'
        ],
        "operation": [
          'getEvent'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    "default": '',
    "description": 'Universally unique identifier (UUID) of an event.',
    "displayName": 'Event ID',
    "name": 'eventID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'observability'
        ],
        "operation": [
          'getEvent'
        ]
      }
    }
  }
];

export default properties;
