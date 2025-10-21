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
        name: 'authentications',
        value: 'authentications',
        description: 'Authentication resources describe how to connect to a source or destination',
      },
      {
        name: 'destinations',
        value: 'destinations',
        description:
          'Destinations are Algolia products or features where your data should be used, such as a search index or events',
      },
      {
        name: 'observability',
        value: 'observability',
        description: 'Check the status and details of your task runs',
      },
      {
        name: 'sources',
        value: 'sources',
        description:
          'Sources are third-party platforms or services from where you want to ingest your data',
      },
      {
        name: 'tasks',
        value: 'tasks',
        description:
          'Tasks contain information how your data should be read from a source and stored in a destination',
      },
      {
        name: 'transformations',
        value: 'transformations',
        description:
          'Transformations allows you to transform a record before it gets indexed in Algolia',
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
        name: 'Push records by indexName',
        value: 'push',
        action: 'Push records by indexName',
        description:
          'Pushes records through the Pipeline, directly to an index. You can make the call synchronous by providing the `watch` parameter, for asynchronous calls, you can use the observability endpoints and/or debugger dashboard to see the status of your task.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/push/{{ $parameter.indexName_string }}',
          },
        },
      },
      {
        name: 'List tasks',
        value: 'listTasks',
        action: 'List tasks',
        description: 'Retrieves a list of tasks.',
        routing: {
          request: {
            method: 'GET',
            url: '=/2/tasks',
          },
        },
      },
      {
        name: 'Create a task',
        value: 'createTask',
        action: 'Create a task',
        description: 'Creates a new task.',
        routing: {
          request: {
            method: 'POST',
            url: '=/2/tasks',
          },
        },
      },
      {
        name: 'Search for tasks',
        value: 'searchTasks',
        action: 'Search for tasks',
        description: 'Searches for tasks.',
        routing: {
          request: {
            method: 'POST',
            url: '=/2/tasks/search',
          },
          output: {
            postReceive: [
              async function (items) {
                const simple = this.getNodeParameter('simplify', 0);
                if (!simple) return items;
                return items.map((item) => {
                  const json = item.json || {};
                  const simplified = new Map();
                  [
                    'action',
                    'createdAt',
                    'cron',
                    'cursor',
                    'destinationID',
                    'enabled',
                    'failureThreshold',
                    'input',
                    'lastRun',
                    'nextRun',
                  ].forEach((f) => {
                    if (json[f] !== undefined) simplified.set(f, json[f]);
                  });
                  return { json: Object.fromEntries(simplified) };
                });
              },
            ],
          },
        },
        inputSchema: {
          simplifiedOutput: [
            'action',
            'createdAt',
            'cron',
            'cursor',
            'destinationID',
            'enabled',
            'failureThreshold',
            'input',
            'lastRun',
            'nextRun',
          ],
        },
      },
      {
        name: 'Retrieve a task',
        value: 'getTask',
        action: 'Retrieve a task',
        description: 'Retrieves a task by its ID.',
        routing: {
          request: {
            method: 'GET',
            url: '=/2/tasks/{{ $parameter.taskID_string }}',
          },
          output: {
            postReceive: [
              async function (items) {
                const simple = this.getNodeParameter('simplify', 0);
                if (!simple) return items;
                return items.map((item) => {
                  const json = item.json || {};
                  const simplified = new Map();
                  [
                    'createdAt',
                    'destinationID',
                    'enabled',
                    'sourceID',
                    'taskID',
                    'updatedAt',
                  ].forEach((f) => {
                    if (json[f] !== undefined) simplified.set(f, json[f]);
                  });
                  return { json: Object.fromEntries(simplified) };
                });
              },
            ],
          },
        },
        inputSchema: {
          simplifiedOutput: [
            'createdAt',
            'destinationID',
            'enabled',
            'sourceID',
            'taskID',
            'updatedAt',
          ],
        },
      },
      {
        name: 'Fully update a task',
        value: 'replaceTask',
        action: 'Fully update a task',
        description:
          'Fully updates a task by its ID, use partialUpdateTask if you only want to update a subset of fields.',
        routing: {
          request: {
            method: 'PUT',
            url: '=/2/tasks/{{ $parameter.taskID_string }}',
          },
        },
      },
      {
        name: 'Partially update a task',
        value: 'updateTask',
        action: 'Partially update a task',
        description: 'Partially updates a task by its ID.',
        routing: {
          request: {
            method: 'PATCH',
            url: '=/2/tasks/{{ $parameter.taskID_string }}',
          },
        },
      },
      {
        name: 'Delete a task',
        value: 'deleteTask',
        action: 'Delete a task',
        description: 'Deletes a task by its ID.',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/2/tasks/{{ $parameter.taskID_string }}',
          },
        },
      },
      {
        name: 'Run a task',
        value: 'runTask',
        action: 'Run a task',
        description:
          'Runs a task. You can check the status of task runs with the observability endpoints.',
        routing: {
          request: {
            method: 'POST',
            url: '=/2/tasks/{{ $parameter.taskID_string }}/run',
          },
        },
      },
      {
        name: 'Push records by task ID',
        value: 'pushTask',
        action: 'Push records by task ID',
        description:
          'Pushes records through the pipeline, directly to an index. You can make the call synchronous by providing the `watch` parameter, for asynchronous calls, you can use the observability endpoints or the debugger dashboard to see the status of your task.',
        routing: {
          request: {
            method: 'POST',
            url: '=/2/tasks/{{ $parameter.taskID_string }}/push',
          },
        },
      },
      {
        name: 'Enable a task',
        value: 'enableTask',
        action: 'Enable a task',
        description: 'Enables a task.',
        routing: {
          request: {
            method: 'PUT',
            url: '=/2/tasks/{{ $parameter.taskID_string }}/enable',
          },
        },
      },
      {
        name: 'Disable a task',
        value: 'disableTask',
        action: 'Disable a task',
        description: 'Disables a task.',
        routing: {
          request: {
            method: 'PUT',
            url: '=/2/tasks/{{ $parameter.taskID_string }}/disable',
          },
        },
      },
      {
        name: 'List tasks V1',
        value: 'listTasksV1',
        action: 'List tasks V1',
        description:
          'Retrieves a list of tasks using the v1 endpoint, please use `getTasks` instead.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/tasks',
          },
        },
      },
      {
        name: 'Create a task V1',
        value: 'createTaskV1',
        action: 'Create a task V1',
        description: 'Creates a new task using the v1 endpoint, please use `createTask` instead.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/tasks',
          },
        },
      },
      {
        name: 'Search for tasks V1',
        value: 'searchTasksV1',
        action: 'Search for tasks V1',
        description: 'Searches for tasks using the v1 endpoint, please use `searchTasks` instead.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/tasks/search',
          },
          output: {
            postReceive: [
              async function (items) {
                const simple = this.getNodeParameter('simplify', 0);
                if (!simple) return items;
                return items.map((item) => {
                  const json = item.json || {};
                  const simplified = new Map();
                  [
                    'action',
                    'createdAt',
                    'cursor',
                    'destinationID',
                    'enabled',
                    'failureThreshold',
                    'input',
                    'notifications',
                    'policies',
                    'sourceID',
                  ].forEach((f) => {
                    if (json[f] !== undefined) simplified.set(f, json[f]);
                  });
                  return { json: Object.fromEntries(simplified) };
                });
              },
            ],
          },
        },
        inputSchema: {
          simplifiedOutput: [
            'action',
            'createdAt',
            'cursor',
            'destinationID',
            'enabled',
            'failureThreshold',
            'input',
            'notifications',
            'policies',
            'sourceID',
          ],
        },
      },
      {
        name: 'Retrieve a task V1',
        value: 'getTaskV1',
        action: 'Retrieve a task V1',
        description:
          'Retrieves a task by its ID using the v1 endpoint, please use `getTask` instead.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/tasks/{{ $parameter.taskID_string }}',
          },
          output: {
            postReceive: [
              async function (items) {
                const simple = this.getNodeParameter('simplify', 0);
                if (!simple) return items;
                return items.map((item) => {
                  const json = item.json || {};
                  const simplified = new Map();
                  [
                    'createdAt',
                    'destinationID',
                    'enabled',
                    'sourceID',
                    'taskID',
                    'trigger',
                    'updatedAt',
                  ].forEach((f) => {
                    if (json[f] !== undefined) simplified.set(f, json[f]);
                  });
                  return { json: Object.fromEntries(simplified) };
                });
              },
            ],
          },
        },
        inputSchema: {
          simplifiedOutput: [
            'createdAt',
            'destinationID',
            'enabled',
            'sourceID',
            'taskID',
            'trigger',
            'updatedAt',
          ],
        },
      },
      {
        name: 'Update a task V1',
        value: 'updateTaskV1',
        action: 'Update a task V1',
        description:
          'Updates a task by its ID using the v1 endpoint, please use `updateTask` instead.',
        routing: {
          request: {
            method: 'PATCH',
            url: '=/1/tasks/{{ $parameter.taskID_string }}',
          },
        },
      },
      {
        name: 'Delete a task',
        value: 'deleteTaskV1',
        action: 'Delete a task',
        description:
          'Deletes a task by its ID using the v1 endpoint, please use `deleteTask` instead.',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/1/tasks/{{ $parameter.taskID_string }}',
          },
        },
      },
      {
        name: 'Run a task V1',
        value: 'runTaskV1',
        action: 'Run a task V1',
        description:
          'Runs a task using the v1 endpoint, please use `runTask` instead. You can check the status of task runs with the observability endpoints.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/tasks/{{ $parameter.taskID_string }}/run',
          },
        },
      },
      {
        name: 'Enable a task V1',
        value: 'enableTaskV1',
        action: 'Enable a task V1',
        description: 'Enables a task using the v1 endpoint, please use `enableTask` instead.',
        routing: {
          request: {
            method: 'PUT',
            url: '=/1/tasks/{{ $parameter.taskID_string }}/enable',
          },
        },
      },
      {
        name: 'Disable a task V1',
        value: 'disableTaskV1',
        action: 'Disable a task V1',
        description: 'Disables a task using the v1 endpoint, please use `disableTask` instead.',
        routing: {
          request: {
            method: 'PUT',
            url: '=/1/tasks/{{ $parameter.taskID_string }}/disable',
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
    displayName: 'Simplify',
    name: 'simplify',
    type: 'boolean',
    default: false,
    description: 'Whether to return a simplified version of the response instead of the raw data',
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['searchTasks', 'getTask', 'searchTasksV1', 'getTaskV1'],
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
        name: 'List authentication resources',
        value: 'listAuthentications',
        action: 'List authentication resources',
        description: 'Retrieves a list of all authentication resources.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/authentications',
          },
        },
      },
      {
        name: 'Create an authentication resource',
        value: 'createAuthentication',
        action: 'Create an authentication resource',
        description: 'Creates a new authentication resource.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/authentications',
          },
        },
      },
      {
        name: 'Search for authentication resources',
        value: 'searchAuthentications',
        action: 'Search for authentication resources',
        description: 'Searches for authentication resources.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/authentications/search',
          },
        },
      },
      {
        name: 'Retrieve an authentication resource',
        value: 'getAuthentication',
        action: 'Retrieve an authentication resource',
        description: 'Retrieves an authentication resource by its ID.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/authentications/{{ $parameter.authenticationID_string }}',
          },
        },
      },
      {
        name: 'Update an authentication resource',
        value: 'updateAuthentication',
        action: 'Update an authentication resource',
        description: 'Updates an authentication resource.',
        routing: {
          request: {
            method: 'PATCH',
            url: '=/1/authentications/{{ $parameter.authenticationID_string }}',
          },
        },
      },
      {
        name: 'Delete an authentication resource',
        value: 'deleteAuthentication',
        action: 'Delete an authentication resource',
        description:
          "Deletes an authentication resource. You can't delete authentication resources that are used by a source or a destination.",
        routing: {
          request: {
            method: 'DELETE',
            url: '=/1/authentications/{{ $parameter.authenticationID_string }}',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['authentications'],
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
        name: 'List destinations',
        value: 'listDestinations',
        action: 'List destinations',
        description: 'Retrieves a list of destinations.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/destinations',
          },
        },
      },
      {
        name: 'Create a destination',
        value: 'createDestination',
        action: 'Create a destination',
        description: 'Creates a new destination.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/destinations',
          },
        },
      },
      {
        name: 'Search for destinations',
        value: 'searchDestinations',
        action: 'Search for destinations',
        description: 'Searches for destinations.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/destinations/search',
          },
        },
      },
      {
        name: 'Retrieve a destination',
        value: 'getDestination',
        action: 'Retrieve a destination',
        description: 'Retrieves a destination by its ID.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/destinations/{{ $parameter.destinationID_string }}',
          },
        },
      },
      {
        name: 'Update a destination',
        value: 'updateDestination',
        action: 'Update a destination',
        description: 'Updates the destination by its ID.',
        routing: {
          request: {
            method: 'PATCH',
            url: '=/1/destinations/{{ $parameter.destinationID_string }}',
          },
        },
      },
      {
        name: 'Delete a destination',
        value: 'deleteDestination',
        action: 'Delete a destination',
        description:
          "Deletes a destination by its ID. You can't delete destinations that are referenced in tasks.",
        routing: {
          request: {
            method: 'DELETE',
            url: '=/1/destinations/{{ $parameter.destinationID_string }}',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['destinations'],
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
        name: 'List sources',
        value: 'listSources',
        action: 'List sources',
        description: 'Retrieves a list of sources.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/sources',
          },
        },
      },
      {
        name: 'Create a source',
        value: 'createSource',
        action: 'Create a source',
        description: 'Creates a new source.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/sources',
          },
        },
      },
      {
        name: 'Validate a source payload',
        value: 'validateSource',
        action: 'Validate a source payload',
        description:
          'Validates a source payload to ensure it can be created and that the data source can be reached by Algolia.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/sources/validate',
          },
        },
      },
      {
        name: 'Search for sources',
        value: 'searchSources',
        action: 'Search for sources',
        description: 'Searches for sources.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/sources/search',
          },
        },
      },
      {
        name: 'Retrieve a source',
        value: 'getSource',
        action: 'Retrieve a source',
        description: 'Retrieve a source by its ID.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/sources/{{ $parameter.sourceID_string }}',
          },
        },
      },
      {
        name: 'Update a source',
        value: 'updateSource',
        action: 'Update a source',
        description: 'Updates a source by its ID.',
        routing: {
          request: {
            method: 'PATCH',
            url: '=/1/sources/{{ $parameter.sourceID_string }}',
          },
        },
      },
      {
        name: 'Delete a source',
        value: 'deleteSource',
        action: 'Delete a source',
        description:
          "Deletes a source by its ID. You can't delete sources that are referenced in tasks.",
        routing: {
          request: {
            method: 'DELETE',
            url: '=/1/sources/{{ $parameter.sourceID_string }}',
          },
        },
      },
      {
        name: 'Validate an update of a source payload',
        value: 'validateSourceBeforeUpdate',
        action: 'Validate an update of a source payload',
        description:
          'Validates an update of a source payload to ensure it can be created and that the data source can be reached by Algolia.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/sources/{{ $parameter.sourceID_string }}/validate',
          },
        },
      },
      {
        name: 'Trigger a stream-listing request',
        value: 'triggerDockerSourceDiscover',
        action: 'Trigger a stream-listing request',
        description: 'Triggers a stream-listing request for a source.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/sources/{{ $parameter.sourceID_string }}/discover',
          },
        },
      },
      {
        name: 'Run all tasks linked to a source',
        value: 'runSource',
        action: 'Run all tasks linked to a source',
        description:
          'Runs all tasks linked to a source, only available for Shopify, BigCommerce and commercetools sources. Creates one run per task.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/sources/{{ $parameter.sourceID_string }}/run',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['sources'],
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
        name: 'List transformations',
        value: 'listTransformations',
        action: 'List transformations',
        description: 'Retrieves a list of transformations.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/transformations',
          },
        },
      },
      {
        name: 'Create a transformation',
        value: 'createTransformation',
        action: 'Create a transformation',
        description: 'Creates a new transformation.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/transformations',
          },
        },
      },
      {
        name: 'Try a transformation before creating it',
        value: 'tryTransformation',
        action: 'Try a transformation before creating it',
        description: 'Try a transformation before creating it.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/transformations/try',
          },
        },
      },
      {
        name: 'Search for transformations',
        value: 'searchTransformations',
        action: 'Search for transformations',
        description: 'Searches for transformations.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/transformations/search',
          },
        },
      },
      {
        name: 'Retrieve a transformation',
        value: 'getTransformation',
        action: 'Retrieve a transformation',
        description: 'Retrieves a transformation by its ID.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/transformations/{{ $parameter.transformationID_string }}',
          },
        },
      },
      {
        name: 'Update a transformation',
        value: 'updateTransformation',
        action: 'Update a transformation',
        description: 'Updates a transformation by its ID.',
        routing: {
          request: {
            method: 'PUT',
            url: '=/1/transformations/{{ $parameter.transformationID_string }}',
          },
        },
      },
      {
        name: 'Delete a transformation',
        value: 'deleteTransformation',
        action: 'Delete a transformation',
        description: 'Deletes a transformation by its ID.',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/1/transformations/{{ $parameter.transformationID_string }}',
          },
        },
      },
      {
        name: 'Try a transformation before updating it',
        value: 'tryTransformationBeforeUpdate',
        action: 'Try a transformation before updating it',
        description: 'Try a transformation before updating it.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/transformations/{{ $parameter.transformationID_string }}/try',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['transformations'],
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
        name: 'List task runs',
        value: 'listRuns',
        action: 'List task runs',
        description: 'Retrieve a list of task runs.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/runs',
          },
        },
      },
      {
        name: 'Retrieve a task run',
        value: 'getRun',
        action: 'Retrieve a task run',
        description: 'Retrieve a single task run by its ID.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/runs/{{ $parameter.runID_string }}',
          },
          output: {
            postReceive: [
              async function (items) {
                const simple = this.getNodeParameter('simplify', 0);
                if (!simple) return items;
                return items.map((item) => {
                  const json = item.json || {};
                  const simplified = new Map();
                  ['appID', 'createdAt', 'runID', 'status', 'taskID', 'type'].forEach((f) => {
                    if (json[f] !== undefined) simplified.set(f, json[f]);
                  });
                  return { json: Object.fromEntries(simplified) };
                });
              },
            ],
          },
        },
        inputSchema: {
          simplifiedOutput: ['appID', 'createdAt', 'runID', 'status', 'taskID', 'type'],
        },
      },
      {
        name: 'List task run events',
        value: 'listEvents',
        action: 'List task run events',
        description: 'Retrieves a list of events for a task run, identified by its ID.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/runs/{{ $parameter.runID_string }}/events',
          },
        },
      },
      {
        name: 'Retrieve a task run event',
        value: 'getEvent',
        action: 'Retrieve a task run event',
        description: 'Retrieves a single task run event by its ID.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/runs/{{ $parameter.runID_string }}/events/{{ $parameter.eventID_string }}',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['observability'],
      },
    },
  },
  {
    displayName: 'Simplify',
    name: 'simplify',
    type: 'boolean',
    default: false,
    description: 'Whether to return a simplified version of the response instead of the raw data',
    displayOptions: {
      show: {
        resource: ['observability'],
        operation: ['getRun'],
      },
    },
  },
  {
    type: 'options',
    placeholder: 'ALGOLIA_INDEX_NAME',
    default: '',
    displayName: 'Index Name',
    name: 'indexName_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['push'],
      },
    },
    typeOptions: {
      loadOptions: {
        routing: {
          request: {
            method: 'GET',
            url: '/1/indexes',
          },
          output: {
            postReceive: [
              {
                type: 'rootProperty',
                properties: {
                  property: 'items',
                },
              },
              {
                type: 'setKeyValue',
                properties: {
                  name: '={{ $responseItem.name }}',
                  value: '={{ $responseItem.name }}',
                },
              },
            ],
          },
        },
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    routing: {
      request: {
        qs: {
          watch: '={{ $value }}',
        },
      },
    },
    displayName: 'Watch',
    name: 'watch_boolean',
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['push'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    routing: {
      request: {
        qs: {
          referenceIndexName: '={{ $value }}',
        },
      },
    },
    displayName: 'Reference Index Name',
    name: 'referenceIndexName_string',
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['push'],
      },
    },
  },
  {
    displayName: 'Push Task Payload',
    name: 'push_task_payload_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Action',
        value: 'action_options',
      },
      {
        name: 'Records',
        value: 'records_json',
      },
    ],
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['push'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description:
      'Which indexing operation to perform:\n\n- `addObject`: adds records to an index.\n   Equivalent to the "Add a new record (with auto-generated object ID)" operation.\n- `updateObject`: adds or replaces records in an index.\n   Equivalent to the "Add or replace a record" operation.\n- `partialUpdateObject`: adds or updates attributes within records.\n   Equivalent to the "Add or update attributes" operation with the `createIfNoExists` parameter set to true.\n   (If a record with the specified `objectID` doesn\'t exist in the specified index, this action creates adds the record to the index)\n- `partialUpdateObjectNoCreate`: same as `partialUpdateObject`, but with `createIfNoExists` set to false.\n   (A record isn\'t added to the index if its `objectID` doesn\'t exist)\n- `deleteObject`: delete records from an index.\n  Equivalent to the "Delete a record" operation.\n- `delete`. Delete an index. Equivalent to the "Delete an index" operation.\n- `clear`: delete all records from an index. Equivalent to the "Delete all records from an index operation".\n',
    options: [
      {
        name: 'addObject',
        value: 'addObject',
      },
      {
        name: 'updateObject',
        value: 'updateObject',
      },
      {
        name: 'partialUpdateObject',
        value: 'partialUpdateObject',
      },
      {
        name: 'partialUpdateObjectNoCreate',
        value: 'partialUpdateObjectNoCreate',
      },
      {
        name: 'deleteObject',
        value: 'deleteObject',
      },
      {
        name: 'delete',
        value: 'delete',
      },
      {
        name: 'clear',
        value: 'clear',
      },
    ],
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'action',
      },
    },
    displayName: 'Action',
    name: 'action_options',
    displayOptions: {
      show: {
        push_task_payload_object: ['action_options'],
        resource: ['tasks'],
        operation: ['push'],
      },
    },
    required: true,
  },
  {
    type: 'json',
    displayName: 'Records',
    name: 'records_json',
    default: '[]',
    description: undefined,
    required: true,
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'records',
      },
    },
    displayOptions: {
      show: {
        push_task_payload_object: ['records_json'],
        resource: ['tasks'],
        operation: ['push'],
      },
    },
  },
  {
    type: 'number',
    default: 10,
    description: 'Number of items per page.',
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
        resource: ['authentications'],
        operation: ['listAuthentications'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description: 'Page of the API response to retrieve.',
    typeOptions: {
      minValue: 1,
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
        resource: ['authentications'],
        operation: ['listAuthentications'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Type',
    name: 'type_json',
    default: '[]',
    description: undefined,
    required: false,
    routing: {
      request: {
        qs: {
          type: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['authentications'],
        operation: ['listAuthentications'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Platform',
    name: 'platform_json',
    default: '[]',
    description: undefined,
    required: false,
    routing: {
      request: {
        qs: {
          platform: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['authentications'],
        operation: ['listAuthentications'],
      },
    },
  },
  {
    type: 'options',
    default: 'createdAt',
    description: 'Property by which to sort the list of authentications.',
    options: [
      {
        name: 'name',
        value: 'name',
      },
      {
        name: 'type',
        value: 'type',
      },
      {
        name: 'platform',
        value: 'platform',
      },
      {
        name: 'updatedAt',
        value: 'updatedAt',
      },
      {
        name: 'createdAt',
        value: 'createdAt',
      },
    ],
    routing: {
      request: {
        qs: {
          sort: '={{ $value }}',
        },
      },
    },
    displayName: 'Sort',
    name: 'sort_options',
    displayOptions: {
      show: {
        resource: ['authentications'],
        operation: ['listAuthentications'],
      },
    },
  },
  {
    type: 'options',
    default: 'desc',
    description: 'Ascending or descending sort order.',
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
          order: '={{ $value }}',
        },
      },
    },
    displayName: 'Order',
    name: 'order_options',
    displayOptions: {
      show: {
        resource: ['authentications'],
        operation: ['listAuthentications'],
      },
    },
  },
  {
    displayName: 'Authentication Create',
    name: 'authentication_create_object',
    type: 'multiOptions',
    description: 'Request body for creating a new authentication resource.',
    required: true,
    default: [],
    options: [
      {
        name: 'Type',
        value: 'type_options',
      },
      {
        name: 'Name',
        value: 'name_string',
      },
      {
        name: 'Platform',
        value: 'platform',
      },
      {
        name: 'Input',
        value: 'input',
      },
    ],
    displayOptions: {
      show: {
        resource: ['authentications'],
        operation: ['createAuthentication'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description:
      'Type of authentication. This determines the type of credentials required in the `input` object.',
    options: [
      {
        name: 'googleServiceAccount',
        value: 'googleServiceAccount',
      },
      {
        name: 'basic',
        value: 'basic',
      },
      {
        name: 'apiKey',
        value: 'apiKey',
      },
      {
        name: 'oauth',
        value: 'oauth',
      },
      {
        name: 'algolia',
        value: 'algolia',
      },
      {
        name: 'algoliaInsights',
        value: 'algoliaInsights',
      },
      {
        name: 'secrets',
        value: 'secrets',
      },
    ],
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'type',
      },
    },
    displayName: 'Type',
    name: 'type_options',
    displayOptions: {
      show: {
        authentication_create_object: ['type_options'],
        resource: ['authentications'],
        operation: ['createAuthentication'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    default: '',
    description: 'Descriptive name for the resource.',
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
        authentication_create_object: ['name_string'],
        resource: ['authentications'],
        operation: ['createAuthentication'],
      },
    },
    required: true,
  },
  {
    type: 'options',
    name: 'platform',
    displayName: 'Platform',
    default: '',
    options: [
      {
        name: 'String',
        value: 'string',
      },
      {
        name: 'Null',
        value: 'null',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'platform',
        value:
          '={{ typeof $parameter.platform_options !== "undefined" ? $parameter.platform_options : typeof $parameter.platform_null !== "undefined" ? JSON.parse($parameter.platform_null) : undefined }}',
      },
    },
    displayOptions: {
      show: {
        authentication_create_object: ['platform'],
        resource: ['authentications'],
        operation: ['createAuthentication'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description:
      'Name of an ecommerce platform with which to authenticate.\nThis determines which authentication type you can select.\n',
    options: [
      {
        name: 'bigcommerce',
        value: 'bigcommerce',
      },
      {
        name: 'commercetools',
        value: 'commercetools',
      },
      {
        name: 'shopify',
        value: 'shopify',
      },
    ],
    displayName: 'Platform (String)',
    name: 'platform_options',
    displayOptions: {
      show: {
        authentication_create_object: ['platform'],
        platform: ['string'],
        resource: ['authentications'],
        operation: ['createAuthentication'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Platform (Null)',
    name: 'platform_null',
    default: 'null',
    description: undefined,
    required: false,
    disabledOptions: {
      show: {
        platform: ['null'],
      },
    },
    displayOptions: {
      show: {
        authentication_create_object: ['platform'],
        platform: ['null'],
        resource: ['authentications'],
        operation: ['createAuthentication'],
      },
    },
  },
  {
    type: 'options',
    name: 'input',
    displayName: 'Input',
    default: '',
    options: [
      {
        name: 'Auth google service account',
        value: 'auth_google_service_account',
      },
      {
        name: 'Auth basic',
        value: 'auth_basic',
      },
      {
        name: 'Auth aPIKey',
        value: 'auth_apikey',
      },
      {
        name: 'Auth oAuth',
        value: 'auth_oauth',
      },
      {
        name: 'Auth algolia',
        value: 'auth_algolia',
      },
      {
        name: 'Auth algolia insights',
        value: 'auth_algolia_insights',
      },
      {
        name: 'Auth secrets',
        value: 'auth_secrets',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'input',
        value:
          '={{ typeof $parameter.auth_google_service_account_object !== "undefined" ? { "clientEmail": typeof $parameter.clientEmail_string_input !== "undefined" ? $parameter.clientEmail_string_input : undefined, "privateKey": typeof $parameter.privateKey_string_input !== "undefined" ? $parameter.privateKey_string_input : undefined } : typeof $parameter.clientEmail_string_input !== "undefined" ? $parameter.clientEmail_string_input : typeof $parameter.privateKey_string_input !== "undefined" ? $parameter.privateKey_string_input : typeof $parameter.auth_basic_object !== "undefined" ? { "username": typeof $parameter.username_string_input !== "undefined" ? $parameter.username_string_input : undefined, "password": typeof $parameter.password_string_input !== "undefined" ? $parameter.password_string_input : undefined } : typeof $parameter.username_string_input !== "undefined" ? $parameter.username_string_input : typeof $parameter.password_string_input !== "undefined" ? $parameter.password_string_input : typeof $parameter.auth_apikey_object !== "undefined" ? { "key": typeof $parameter.key_string_input !== "undefined" ? $parameter.key_string_input : undefined } : typeof $parameter.key_string_input !== "undefined" ? $parameter.key_string_input : typeof $parameter.auth_oauth_object !== "undefined" ? { "url": typeof $parameter.url_string_input !== "undefined" ? $parameter.url_string_input : undefined, "client_id": typeof $parameter.client_id_string_input !== "undefined" ? $parameter.client_id_string_input : undefined, "client_secret": typeof $parameter.client_secret_string_input !== "undefined" ? $parameter.client_secret_string_input : undefined, "scope": typeof $parameter.scope_string_input !== "undefined" ? $parameter.scope_string_input : undefined } : typeof $parameter.url_string_input !== "undefined" ? $parameter.url_string_input : typeof $parameter.client_id_string_input !== "undefined" ? $parameter.client_id_string_input : typeof $parameter.client_secret_string_input !== "undefined" ? $parameter.client_secret_string_input : typeof $parameter.scope_string_input !== "undefined" ? $parameter.scope_string_input : typeof $parameter.auth_algolia_object !== "undefined" ? { "appID": typeof $parameter.appID_string_input !== "undefined" ? $parameter.appID_string_input : undefined, "apiKey": typeof $parameter.apiKey_string_input !== "undefined" ? $parameter.apiKey_string_input : undefined } : typeof $parameter.appID_string_input !== "undefined" ? $parameter.appID_string_input : typeof $parameter.apiKey_string_input !== "undefined" ? $parameter.apiKey_string_input : typeof $parameter.auth_algolia_insights_object !== "undefined" ? { "appID": typeof $parameter.appID_string_input !== "undefined" ? $parameter.appID_string_input : undefined, "apiKey": typeof $parameter.apiKey_string_input !== "undefined" ? $parameter.apiKey_string_input : undefined } : typeof $parameter.appID_string_input !== "undefined" ? $parameter.appID_string_input : typeof $parameter.apiKey_string_input !== "undefined" ? $parameter.apiKey_string_input : typeof $parameter.auth_secrets_object !== "undefined" ? JSON.parse($parameter.auth_secrets_object) : undefined }}',
      },
    },
    displayOptions: {
      show: {
        authentication_create_object: ['input'],
        resource: ['authentications'],
        operation: ['createAuthentication'],
      },
    },
    required: true,
  },
  {
    displayName: 'Auth Google Service Account',
    name: 'auth_google_service_account_object',
    type: 'multiOptions',
    description: 'Credentials for authenticating with a Google service account, such as BigQuery.',
    required: true,
    default: [],
    options: [
      {
        name: 'Client Email',
        value: 'clientEmail_string_input',
      },
      {
        name: 'Private Key',
        value: 'privateKey_string_input',
      },
    ],
    displayOptions: {
      show: {
        authentication_create_object: ['input'],
        input: ['auth_google_service_account'],
        resource: ['authentications'],
        operation: ['createAuthentication'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'service-account-name@project-id.iam.gserviceaccount.com',
    default: '',
    description: 'Email address of the Google service account.',
    displayName: 'Client Email',
    name: 'clientEmail_string_input',
    displayOptions: {
      show: {
        authentication_create_object: ['input'],
        auth_google_service_account_object: ['clientEmail_string_input'],
        input: ['auth_google_service_account'],
        resource: ['authentications'],
        operation: ['createAuthentication'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    default: '',
    description:
      'Private key of the Google service account. This field is `null` in the API response.',
    displayName: 'Private Key',
    name: 'privateKey_string_input',
    displayOptions: {
      show: {
        authentication_create_object: ['input'],
        auth_google_service_account_object: ['privateKey_string_input'],
        input: ['auth_google_service_account'],
        resource: ['authentications'],
        operation: ['createAuthentication'],
      },
    },
    required: true,
  },
  {
    displayName: 'Auth Basic',
    name: 'auth_basic_object',
    type: 'multiOptions',
    description: 'Credentials for authenticating with user name and password.',
    required: true,
    default: [],
    options: [
      {
        name: 'Username',
        value: 'username_string_input',
      },
      {
        name: 'Password',
        value: 'password_string_input',
      },
    ],
    displayOptions: {
      show: {
        authentication_create_object: ['input'],
        input: ['auth_basic'],
        resource: ['authentications'],
        operation: ['createAuthentication'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Username.',
    displayName: 'Username',
    name: 'username_string_input',
    displayOptions: {
      show: {
        authentication_create_object: ['input'],
        auth_basic_object: ['username_string_input'],
        input: ['auth_basic'],
        resource: ['authentications'],
        operation: ['createAuthentication'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    default: '',
    description: 'Password. This field is `null` in the API response.',
    displayName: 'Password',
    name: 'password_string_input',
    displayOptions: {
      show: {
        authentication_create_object: ['input'],
        auth_basic_object: ['password_string_input'],
        input: ['auth_basic'],
        resource: ['authentications'],
        operation: ['createAuthentication'],
      },
    },
    required: true,
  },
  {
    displayName: 'Auth APIKey',
    name: 'auth_apikey_object',
    type: 'multiOptions',
    description: 'Credentials for authenticating with an API key.',
    required: true,
    default: [],
    options: [
      {
        name: 'Key',
        value: 'key_string_input',
      },
    ],
    displayOptions: {
      show: {
        authentication_create_object: ['input'],
        input: ['auth_apikey'],
        resource: ['authentications'],
        operation: ['createAuthentication'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'API key. This field is `null` in the API response.',
    displayName: 'Key',
    name: 'key_string_input',
    displayOptions: {
      show: {
        authentication_create_object: ['input'],
        auth_apikey_object: ['key_string_input'],
        input: ['auth_apikey'],
        resource: ['authentications'],
        operation: ['createAuthentication'],
      },
    },
    required: true,
  },
  {
    displayName: 'Auth OAuth',
    name: 'auth_oauth_object',
    type: 'multiOptions',
    description: 'Credentials for authenticating with OAuth 2.0.',
    required: true,
    default: [],
    options: [
      {
        name: 'Url',
        value: 'url_string_input',
      },
      {
        name: 'Client Id',
        value: 'client_id_string_input',
      },
      {
        name: 'Client Secret',
        value: 'client_secret_string_input',
      },
      {
        name: 'Scope',
        value: 'scope_string_input',
      },
    ],
    displayOptions: {
      show: {
        authentication_create_object: ['input'],
        input: ['auth_oauth'],
        resource: ['authentications'],
        operation: ['createAuthentication'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'URL for the OAuth endpoint.',
    displayName: 'Url',
    name: 'url_string_input',
    displayOptions: {
      show: {
        authentication_create_object: ['input'],
        auth_oauth_object: ['url_string_input'],
        input: ['auth_oauth'],
        resource: ['authentications'],
        operation: ['createAuthentication'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    default: '',
    description: 'Client ID.',
    displayName: 'Client Id',
    name: 'client_id_string_input',
    displayOptions: {
      show: {
        authentication_create_object: ['input'],
        auth_oauth_object: ['client_id_string_input'],
        input: ['auth_oauth'],
        resource: ['authentications'],
        operation: ['createAuthentication'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    default: '',
    description: 'Client secret. This field is `null` in the API response.',
    displayName: 'Client Secret',
    name: 'client_secret_string_input',
    displayOptions: {
      show: {
        authentication_create_object: ['input'],
        auth_oauth_object: ['client_secret_string_input'],
        input: ['auth_oauth'],
        resource: ['authentications'],
        operation: ['createAuthentication'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    default: '',
    description: 'OAuth scope.',
    displayName: 'Scope',
    name: 'scope_string_input',
    displayOptions: {
      show: {
        authentication_create_object: ['input'],
        auth_oauth_object: ['scope_string_input'],
        input: ['auth_oauth'],
        resource: ['authentications'],
        operation: ['createAuthentication'],
      },
    },
  },
  {
    displayName: 'Auth Algolia',
    name: 'auth_algolia_object',
    type: 'multiOptions',
    description: 'Credentials for authenticating with Algolia.',
    required: true,
    default: [],
    options: [
      {
        name: 'App ID',
        value: 'appID_string_input',
      },
      {
        name: 'Api Key',
        value: 'apiKey_string_input',
      },
    ],
    displayOptions: {
      show: {
        authentication_create_object: ['input'],
        input: ['auth_algolia'],
        resource: ['authentications'],
        operation: ['createAuthentication'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Algolia application ID.',
    displayName: 'App ID',
    name: 'appID_string_input',
    displayOptions: {
      show: {
        authentication_create_object: ['input'],
        auth_algolia_object: ['appID_string_input'],
        input: ['auth_algolia'],
        resource: ['authentications'],
        operation: ['createAuthentication'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    default: '',
    description:
      'Algolia API key with the ACL: `addObject`, `deleteObject`, `settings`, `editSettings`, `listIndexes`, `deleteIndex`.\nThis field is `null` in the API response.\n',
    displayName: 'Api Key',
    name: 'apiKey_string_input',
    displayOptions: {
      show: {
        authentication_create_object: ['input'],
        auth_algolia_object: ['apiKey_string_input'],
        input: ['auth_algolia'],
        resource: ['authentications'],
        operation: ['createAuthentication'],
      },
    },
    required: true,
  },
  {
    displayName: 'Auth Algolia Insights',
    name: 'auth_algolia_insights_object',
    type: 'multiOptions',
    description: 'Credentials for authenticating with the Algolia Insights API.',
    required: true,
    default: [],
    options: [
      {
        name: 'App ID',
        value: 'appID_string_input',
      },
      {
        name: 'Api Key',
        value: 'apiKey_string_input',
      },
    ],
    displayOptions: {
      show: {
        authentication_create_object: ['input'],
        input: ['auth_algolia_insights'],
        resource: ['authentications'],
        operation: ['createAuthentication'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Algolia application ID.',
    displayName: 'App ID',
    name: 'appID_string_input',
    displayOptions: {
      show: {
        authentication_create_object: ['input'],
        auth_algolia_insights_object: ['appID_string_input'],
        input: ['auth_algolia_insights'],
        resource: ['authentications'],
        operation: ['createAuthentication'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    default: '',
    description:
      'Algolia API key with the ACL: `search`.\nThis field is `null` in the API response.\n',
    displayName: 'Api Key',
    name: 'apiKey_string_input',
    displayOptions: {
      show: {
        authentication_create_object: ['input'],
        auth_algolia_insights_object: ['apiKey_string_input'],
        input: ['auth_algolia_insights'],
        resource: ['authentications'],
        operation: ['createAuthentication'],
      },
    },
    required: true,
  },
  {
    type: 'json',
    displayName: 'Auth Secrets',
    name: 'auth_secrets_object',
    description: 'A key:value authentication for your transformations.',
    required: false,
    default: '{}',
    displayOptions: {
      show: {
        authentication_create_object: ['input'],
        input: ['auth_secrets'],
        resource: ['authentications'],
        operation: ['createAuthentication'],
      },
    },
  },
  {
    displayName: 'Authentication Search',
    name: 'authentication_search_object',
    type: 'multiOptions',
    description: 'Request body for searching for authentication resources.',
    required: true,
    default: [],
    options: [
      {
        name: 'Authentication IDs',
        value: 'authenticationIDs_json',
      },
    ],
    displayOptions: {
      show: {
        resource: ['authentications'],
        operation: ['searchAuthentications'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Authentication IDs',
    name: 'authenticationIDs_json',
    default: '[]',
    description: undefined,
    required: true,
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'authenticationIDs',
      },
    },
    displayOptions: {
      show: {
        authentication_search_object: ['authenticationIDs_json'],
        resource: ['authentications'],
        operation: ['searchAuthentications'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of an authentication resource.',
    displayName: 'Authentication ID',
    name: 'authenticationID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['authentications'],
        operation: ['getAuthentication'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of an authentication resource.',
    displayName: 'Authentication ID',
    name: 'authenticationID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['authentications'],
        operation: ['updateAuthentication'],
      },
    },
  },
  {
    displayName: 'Authentication Update',
    name: 'authentication_update_object',
    type: 'multiOptions',
    description: 'Request body for updating an authentication resource.',
    required: false,
    default: [],
    options: [
      {
        name: 'Type',
        value: 'type_options',
      },
      {
        name: 'Name',
        value: 'name_string',
      },
      {
        name: 'Platform',
        value: 'platform',
      },
      {
        name: 'Input',
        value: 'input',
      },
    ],
    displayOptions: {
      show: {
        resource: ['authentications'],
        operation: ['updateAuthentication'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description:
      'Type of authentication. This determines the type of credentials required in the `input` object.',
    options: [
      {
        name: 'googleServiceAccount',
        value: 'googleServiceAccount',
      },
      {
        name: 'basic',
        value: 'basic',
      },
      {
        name: 'apiKey',
        value: 'apiKey',
      },
      {
        name: 'oauth',
        value: 'oauth',
      },
      {
        name: 'algolia',
        value: 'algolia',
      },
      {
        name: 'algoliaInsights',
        value: 'algoliaInsights',
      },
      {
        name: 'secrets',
        value: 'secrets',
      },
    ],
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'type',
      },
    },
    displayName: 'Type',
    name: 'type_options',
    displayOptions: {
      show: {
        authentication_update_object: ['type_options'],
        resource: ['authentications'],
        operation: ['updateAuthentication'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Descriptive name for the resource.',
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
        authentication_update_object: ['name_string'],
        resource: ['authentications'],
        operation: ['updateAuthentication'],
      },
    },
  },
  {
    type: 'options',
    name: 'platform',
    displayName: 'Platform',
    default: '',
    options: [
      {
        name: 'String',
        value: 'string',
      },
      {
        name: 'Null',
        value: 'null',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'platform',
        value:
          '={{ typeof $parameter.platform_options !== "undefined" ? $parameter.platform_options : typeof $parameter.platform_null !== "undefined" ? JSON.parse($parameter.platform_null) : undefined }}',
      },
    },
    displayOptions: {
      show: {
        authentication_update_object: ['platform'],
        resource: ['authentications'],
        operation: ['updateAuthentication'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description:
      'Name of an ecommerce platform with which to authenticate.\nThis determines which authentication type you can select.\n',
    options: [
      {
        name: 'bigcommerce',
        value: 'bigcommerce',
      },
      {
        name: 'commercetools',
        value: 'commercetools',
      },
      {
        name: 'shopify',
        value: 'shopify',
      },
    ],
    displayName: 'Platform (String)',
    name: 'platform_options',
    displayOptions: {
      show: {
        authentication_update_object: ['platform'],
        platform: ['string'],
        resource: ['authentications'],
        operation: ['updateAuthentication'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Platform (Null)',
    name: 'platform_null',
    default: 'null',
    description: undefined,
    required: false,
    disabledOptions: {
      show: {
        platform: ['null'],
      },
    },
    displayOptions: {
      show: {
        authentication_update_object: ['platform'],
        platform: ['null'],
        resource: ['authentications'],
        operation: ['updateAuthentication'],
      },
    },
  },
  {
    type: 'options',
    name: 'input',
    displayName: 'Input',
    default: '',
    options: [
      {
        name: 'Auth google service account partial',
        value: 'auth_google_service_account_partial',
      },
      {
        name: 'Auth basic partial',
        value: 'auth_basic_partial',
      },
      {
        name: 'Auth aPIKey partial',
        value: 'auth_apikey_partial',
      },
      {
        name: 'Auth oAuth partial',
        value: 'auth_oauth_partial',
      },
      {
        name: 'Auth algolia partial',
        value: 'auth_algolia_partial',
      },
      {
        name: 'Auth algolia insights partial',
        value: 'auth_algolia_insights_partial',
      },
      {
        name: 'Auth secrets',
        value: 'auth_secrets',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'input',
        value:
          '={{ typeof $parameter.auth_google_service_account_partial_object !== "undefined" ? { "clientEmail": typeof $parameter.clientEmail_string_input !== "undefined" ? $parameter.clientEmail_string_input : undefined, "privateKey": typeof $parameter.privateKey_string_input !== "undefined" ? $parameter.privateKey_string_input : undefined } : typeof $parameter.clientEmail_string_input !== "undefined" ? $parameter.clientEmail_string_input : typeof $parameter.privateKey_string_input !== "undefined" ? $parameter.privateKey_string_input : typeof $parameter.auth_basic_partial_object !== "undefined" ? { "username": typeof $parameter.username_string_input !== "undefined" ? $parameter.username_string_input : undefined, "password": typeof $parameter.password_string_input !== "undefined" ? $parameter.password_string_input : undefined } : typeof $parameter.username_string_input !== "undefined" ? $parameter.username_string_input : typeof $parameter.password_string_input !== "undefined" ? $parameter.password_string_input : typeof $parameter.auth_apikey_partial_object !== "undefined" ? { "key": typeof $parameter.key_string_input !== "undefined" ? $parameter.key_string_input : undefined } : typeof $parameter.key_string_input !== "undefined" ? $parameter.key_string_input : typeof $parameter.auth_oauth_partial_object !== "undefined" ? { "url": typeof $parameter.url_string_input !== "undefined" ? $parameter.url_string_input : undefined, "client_id": typeof $parameter.client_id_string_input !== "undefined" ? $parameter.client_id_string_input : undefined, "client_secret": typeof $parameter.client_secret_string_input !== "undefined" ? $parameter.client_secret_string_input : undefined, "scope": typeof $parameter.scope_string_input !== "undefined" ? $parameter.scope_string_input : undefined } : typeof $parameter.url_string_input !== "undefined" ? $parameter.url_string_input : typeof $parameter.client_id_string_input !== "undefined" ? $parameter.client_id_string_input : typeof $parameter.client_secret_string_input !== "undefined" ? $parameter.client_secret_string_input : typeof $parameter.scope_string_input !== "undefined" ? $parameter.scope_string_input : typeof $parameter.auth_algolia_partial_object !== "undefined" ? { "appID": typeof $parameter.appID_string_input !== "undefined" ? $parameter.appID_string_input : undefined, "apiKey": typeof $parameter.apiKey_string_input !== "undefined" ? $parameter.apiKey_string_input : undefined } : typeof $parameter.appID_string_input !== "undefined" ? $parameter.appID_string_input : typeof $parameter.apiKey_string_input !== "undefined" ? $parameter.apiKey_string_input : typeof $parameter.auth_algolia_insights_partial_object !== "undefined" ? { "appID": typeof $parameter.appID_string_input !== "undefined" ? $parameter.appID_string_input : undefined, "apiKey": typeof $parameter.apiKey_string_input !== "undefined" ? $parameter.apiKey_string_input : undefined } : typeof $parameter.appID_string_input !== "undefined" ? $parameter.appID_string_input : typeof $parameter.apiKey_string_input !== "undefined" ? $parameter.apiKey_string_input : typeof $parameter.auth_secrets_object !== "undefined" ? JSON.parse($parameter.auth_secrets_object) : undefined }}',
      },
    },
    displayOptions: {
      show: {
        authentication_update_object: ['input'],
        resource: ['authentications'],
        operation: ['updateAuthentication'],
      },
    },
  },
  {
    displayName: 'Auth Google Service Account Partial',
    name: 'auth_google_service_account_partial_object',
    type: 'multiOptions',
    description: 'Credentials for authenticating with a Google service account, such as BigQuery.',
    required: false,
    default: [],
    options: [
      {
        name: 'Client Email',
        value: 'clientEmail_string_input',
      },
      {
        name: 'Private Key',
        value: 'privateKey_string_input',
      },
    ],
    displayOptions: {
      show: {
        authentication_update_object: ['input'],
        input: ['auth_google_service_account_partial'],
        resource: ['authentications'],
        operation: ['updateAuthentication'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'service-account-name@project-id.iam.gserviceaccount.com',
    default: '',
    description: 'Email address of the Google service account.',
    displayName: 'Client Email',
    name: 'clientEmail_string_input',
    displayOptions: {
      show: {
        authentication_update_object: ['input'],
        auth_google_service_account_partial_object: ['clientEmail_string_input'],
        input: ['auth_google_service_account_partial'],
        resource: ['authentications'],
        operation: ['updateAuthentication'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description:
      'Private key of the Google service account. This field is `null` in the API response.',
    displayName: 'Private Key',
    name: 'privateKey_string_input',
    displayOptions: {
      show: {
        authentication_update_object: ['input'],
        auth_google_service_account_partial_object: ['privateKey_string_input'],
        input: ['auth_google_service_account_partial'],
        resource: ['authentications'],
        operation: ['updateAuthentication'],
      },
    },
  },
  {
    displayName: 'Auth Basic Partial',
    name: 'auth_basic_partial_object',
    type: 'multiOptions',
    description: 'Credentials for authenticating with user name and password.',
    required: false,
    default: [],
    options: [
      {
        name: 'Username',
        value: 'username_string_input',
      },
      {
        name: 'Password',
        value: 'password_string_input',
      },
    ],
    displayOptions: {
      show: {
        authentication_update_object: ['input'],
        input: ['auth_basic_partial'],
        resource: ['authentications'],
        operation: ['updateAuthentication'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Username.',
    displayName: 'Username',
    name: 'username_string_input',
    displayOptions: {
      show: {
        authentication_update_object: ['input'],
        auth_basic_partial_object: ['username_string_input'],
        input: ['auth_basic_partial'],
        resource: ['authentications'],
        operation: ['updateAuthentication'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Password. This field is `null` in the API response.',
    displayName: 'Password',
    name: 'password_string_input',
    displayOptions: {
      show: {
        authentication_update_object: ['input'],
        auth_basic_partial_object: ['password_string_input'],
        input: ['auth_basic_partial'],
        resource: ['authentications'],
        operation: ['updateAuthentication'],
      },
    },
  },
  {
    displayName: 'Auth APIKey Partial',
    name: 'auth_apikey_partial_object',
    type: 'multiOptions',
    description: 'Credentials for authenticating with an API key.',
    required: false,
    default: [],
    options: [
      {
        name: 'Key',
        value: 'key_string_input',
      },
    ],
    displayOptions: {
      show: {
        authentication_update_object: ['input'],
        input: ['auth_apikey_partial'],
        resource: ['authentications'],
        operation: ['updateAuthentication'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'API key. This field is `null` in the API response.',
    displayName: 'Key',
    name: 'key_string_input',
    displayOptions: {
      show: {
        authentication_update_object: ['input'],
        auth_apikey_partial_object: ['key_string_input'],
        input: ['auth_apikey_partial'],
        resource: ['authentications'],
        operation: ['updateAuthentication'],
      },
    },
  },
  {
    displayName: 'Auth OAuth Partial',
    name: 'auth_oauth_partial_object',
    type: 'multiOptions',
    description: 'Credentials for authenticating with OAuth 2.0.',
    required: false,
    default: [],
    options: [
      {
        name: 'Url',
        value: 'url_string_input',
      },
      {
        name: 'Client Id',
        value: 'client_id_string_input',
      },
      {
        name: 'Client Secret',
        value: 'client_secret_string_input',
      },
      {
        name: 'Scope',
        value: 'scope_string_input',
      },
    ],
    displayOptions: {
      show: {
        authentication_update_object: ['input'],
        input: ['auth_oauth_partial'],
        resource: ['authentications'],
        operation: ['updateAuthentication'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'URL for the OAuth endpoint.',
    displayName: 'Url',
    name: 'url_string_input',
    displayOptions: {
      show: {
        authentication_update_object: ['input'],
        auth_oauth_partial_object: ['url_string_input'],
        input: ['auth_oauth_partial'],
        resource: ['authentications'],
        operation: ['updateAuthentication'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Client ID.',
    displayName: 'Client Id',
    name: 'client_id_string_input',
    displayOptions: {
      show: {
        authentication_update_object: ['input'],
        auth_oauth_partial_object: ['client_id_string_input'],
        input: ['auth_oauth_partial'],
        resource: ['authentications'],
        operation: ['updateAuthentication'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Client secret. This field is `null` in the API response.',
    displayName: 'Client Secret',
    name: 'client_secret_string_input',
    displayOptions: {
      show: {
        authentication_update_object: ['input'],
        auth_oauth_partial_object: ['client_secret_string_input'],
        input: ['auth_oauth_partial'],
        resource: ['authentications'],
        operation: ['updateAuthentication'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'OAuth scope.',
    displayName: 'Scope',
    name: 'scope_string_input',
    displayOptions: {
      show: {
        authentication_update_object: ['input'],
        auth_oauth_partial_object: ['scope_string_input'],
        input: ['auth_oauth_partial'],
        resource: ['authentications'],
        operation: ['updateAuthentication'],
      },
    },
  },
  {
    displayName: 'Auth Algolia Partial',
    name: 'auth_algolia_partial_object',
    type: 'multiOptions',
    description: 'Credentials for authenticating with Algolia.',
    required: false,
    default: [],
    options: [
      {
        name: 'App ID',
        value: 'appID_string_input',
      },
      {
        name: 'Api Key',
        value: 'apiKey_string_input',
      },
    ],
    displayOptions: {
      show: {
        authentication_update_object: ['input'],
        input: ['auth_algolia_partial'],
        resource: ['authentications'],
        operation: ['updateAuthentication'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Algolia application ID.',
    displayName: 'App ID',
    name: 'appID_string_input',
    displayOptions: {
      show: {
        authentication_update_object: ['input'],
        auth_algolia_partial_object: ['appID_string_input'],
        input: ['auth_algolia_partial'],
        resource: ['authentications'],
        operation: ['updateAuthentication'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description:
      'Algolia API key with the ACL: `addObject`, `deleteObject`, `settings`, `editSettings`, `listIndexes`, `deleteIndex`.\nThis field is `null` in the API response.\n',
    displayName: 'Api Key',
    name: 'apiKey_string_input',
    displayOptions: {
      show: {
        authentication_update_object: ['input'],
        auth_algolia_partial_object: ['apiKey_string_input'],
        input: ['auth_algolia_partial'],
        resource: ['authentications'],
        operation: ['updateAuthentication'],
      },
    },
  },
  {
    displayName: 'Auth Algolia Insights Partial',
    name: 'auth_algolia_insights_partial_object',
    type: 'multiOptions',
    description: 'Credentials for authenticating with the Algolia Insights API.',
    required: false,
    default: [],
    options: [
      {
        name: 'App ID',
        value: 'appID_string_input',
      },
      {
        name: 'Api Key',
        value: 'apiKey_string_input',
      },
    ],
    displayOptions: {
      show: {
        authentication_update_object: ['input'],
        input: ['auth_algolia_insights_partial'],
        resource: ['authentications'],
        operation: ['updateAuthentication'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Algolia application ID.',
    displayName: 'App ID',
    name: 'appID_string_input',
    displayOptions: {
      show: {
        authentication_update_object: ['input'],
        auth_algolia_insights_partial_object: ['appID_string_input'],
        input: ['auth_algolia_insights_partial'],
        resource: ['authentications'],
        operation: ['updateAuthentication'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description:
      'Algolia API key with the ACL: `search`.\nThis field is `null` in the API response.\n',
    displayName: 'Api Key',
    name: 'apiKey_string_input',
    displayOptions: {
      show: {
        authentication_update_object: ['input'],
        auth_algolia_insights_partial_object: ['apiKey_string_input'],
        input: ['auth_algolia_insights_partial'],
        resource: ['authentications'],
        operation: ['updateAuthentication'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Auth Secrets',
    name: 'auth_secrets_object',
    description: 'A key:value authentication for your transformations.',
    required: false,
    default: '{}',
    displayOptions: {
      show: {
        authentication_update_object: ['input'],
        input: ['auth_secrets'],
        resource: ['authentications'],
        operation: ['updateAuthentication'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of an authentication resource.',
    displayName: 'Authentication ID',
    name: 'authenticationID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['authentications'],
        operation: ['deleteAuthentication'],
      },
    },
  },
  {
    type: 'number',
    default: 10,
    description: 'Number of items per page.',
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
        resource: ['destinations'],
        operation: ['listDestinations'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description: 'Page of the API response to retrieve.',
    typeOptions: {
      minValue: 1,
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
        resource: ['destinations'],
        operation: ['listDestinations'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Type',
    name: 'type_json',
    default: '[]',
    description: undefined,
    required: false,
    routing: {
      request: {
        qs: {
          type: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['destinations'],
        operation: ['listDestinations'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Authentication ID',
    name: 'authenticationID_json',
    default: '[]',
    description: undefined,
    required: false,
    routing: {
      request: {
        qs: {
          authenticationID: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['destinations'],
        operation: ['listDestinations'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of a transformation.',
    routing: {
      request: {
        qs: {
          transformationID: '={{ $value }}',
        },
      },
    },
    displayName: 'Transformation ID',
    name: 'transformationID_string',
    displayOptions: {
      show: {
        resource: ['destinations'],
        operation: ['listDestinations'],
      },
    },
  },
  {
    type: 'options',
    default: 'createdAt',
    description: 'Property by which to sort the destinations.',
    options: [
      {
        name: 'name',
        value: 'name',
      },
      {
        name: 'type',
        value: 'type',
      },
      {
        name: 'updatedAt',
        value: 'updatedAt',
      },
      {
        name: 'createdAt',
        value: 'createdAt',
      },
    ],
    routing: {
      request: {
        qs: {
          sort: '={{ $value }}',
        },
      },
    },
    displayName: 'Sort',
    name: 'sort_options',
    displayOptions: {
      show: {
        resource: ['destinations'],
        operation: ['listDestinations'],
      },
    },
  },
  {
    type: 'options',
    default: 'desc',
    description: 'Ascending or descending sort order.',
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
          order: '={{ $value }}',
        },
      },
    },
    displayName: 'Order',
    name: 'order_options',
    displayOptions: {
      show: {
        resource: ['destinations'],
        operation: ['listDestinations'],
      },
    },
  },
  {
    displayName: 'Destination Create',
    name: 'destination_create_object',
    type: 'multiOptions',
    description: 'API request body for creating a new destination.',
    required: true,
    default: [],
    options: [
      {
        name: 'Type',
        value: 'type_options',
      },
      {
        name: 'Name',
        value: 'name_string',
      },
      {
        name: 'Destination Input',
        value: 'destination_input_object',
      },
      {
        name: 'Authentication ID',
        value: 'authenticationID_string',
      },
      {
        name: 'Transformation IDs',
        value: 'transformationIDs_json',
      },
    ],
    displayOptions: {
      show: {
        resource: ['destinations'],
        operation: ['createDestination'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description:
      'Destination type.\n\n- `search`.\n  Data is stored in an Algolia index.\n\n- `insights`.\n  Data is recorded as user events in the Insights API.\n',
    options: [
      {
        name: 'search',
        value: 'search',
      },
      {
        name: 'insights',
        value: 'insights',
      },
    ],
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'type',
      },
    },
    displayName: 'Type',
    name: 'type_options',
    displayOptions: {
      show: {
        destination_create_object: ['type_options'],
        resource: ['destinations'],
        operation: ['createDestination'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    default: '',
    description: 'Descriptive name for the resource.',
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
        destination_create_object: ['name_string'],
        resource: ['destinations'],
        operation: ['createDestination'],
      },
    },
    required: true,
  },
  {
    displayName: 'Destination Input',
    name: 'destination_input_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Index Name',
        value: 'indexName_string_input',
      },
      {
        name: 'Record Type',
        value: 'recordType_options_input',
      },
      {
        name: 'Attributes To Exclude',
        value: 'attributesToExclude_json_input',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'input',
        value:
          '={{ { "indexName": typeof $parameter.indexName_string_input !== "undefined" ? $parameter.indexName_string_input : undefined, "recordType": typeof $parameter.recordType_options_input !== "undefined" ? $parameter.recordType_options_input : undefined, "attributesToExclude": typeof $parameter.attributesToExclude_json_input !== "undefined" ? JSON.parse($parameter.attributesToExclude_json_input) : undefined } }}',
      },
    },
    displayOptions: {
      show: {
        destination_create_object: ['destination_input_object'],
        resource: ['destinations'],
        operation: ['createDestination'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Algolia index name (case-sensitive).',
    displayName: 'Index Name',
    name: 'indexName_string_input',
    displayOptions: {
      show: {
        destination_create_object: ['destination_input_object'],
        destination_input_object: ['indexName_string_input'],
        resource: ['destinations'],
        operation: ['createDestination'],
      },
    },
    required: true,
  },
  {
    type: 'options',
    default: '',
    description: 'Record type for ecommerce sources.',
    options: [
      {
        name: 'product',
        value: 'product',
      },
      {
        name: 'variant',
        value: 'variant',
      },
      {
        name: 'collection',
        value: 'collection',
      },
    ],
    displayName: 'Record Type',
    name: 'recordType_options_input',
    displayOptions: {
      show: {
        destination_create_object: ['destination_input_object'],
        destination_input_object: ['recordType_options_input'],
        resource: ['destinations'],
        operation: ['createDestination'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Attributes To Exclude',
    name: 'attributesToExclude_json_input',
    default: '[]',
    description:
      'Attributes from your source to exclude from Algolia records.\n\nNot all your data attributes will be useful for searching.\nKeeping your Algolia records small increases indexing and search performance.\n\n- Exclude nested attributes with `.` notation. For example, `foo.bar` indexes the `foo` attribute and all its children **except** the `bar` attribute.\n- Exclude attributes from arrays with `[i]`, where `i` is the index of the array element.\n  For example, `foo.[0].bar` only excludes the `bar` attribute from the first element of the `foo` array, but indexes the complete `foo` attribute for all other elements.\n  Use `*` as wildcard: `foo.[*].bar` excludes `bar` from all elements of the `foo` array.\n',
    required: false,
    displayOptions: {
      show: {
        destination_create_object: ['destination_input_object'],
        destination_input_object: ['attributesToExclude_json_input'],
        resource: ['destinations'],
        operation: ['createDestination'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of an authentication resource.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'authenticationID',
      },
    },
    displayName: 'Authentication ID',
    name: 'authenticationID_string',
    displayOptions: {
      show: {
        destination_create_object: ['authenticationID_string'],
        resource: ['destinations'],
        operation: ['createDestination'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Transformation IDs',
    name: 'transformationIDs_json',
    default: '[]',
    description: undefined,
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'transformationIDs',
      },
    },
    displayOptions: {
      show: {
        destination_create_object: ['transformationIDs_json'],
        resource: ['destinations'],
        operation: ['createDestination'],
      },
    },
  },
  {
    displayName: 'Destination Search',
    name: 'destination_search_object',
    type: 'multiOptions',
    description: 'API request body for searching destinations.',
    required: true,
    default: [],
    options: [
      {
        name: 'Destination IDs',
        value: 'destinationIDs_json',
      },
    ],
    displayOptions: {
      show: {
        resource: ['destinations'],
        operation: ['searchDestinations'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Destination IDs',
    name: 'destinationIDs_json',
    default: '[]',
    description: undefined,
    required: true,
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'destinationIDs',
      },
    },
    displayOptions: {
      show: {
        destination_search_object: ['destinationIDs_json'],
        resource: ['destinations'],
        operation: ['searchDestinations'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of a destination resource.',
    displayName: 'Destination ID',
    name: 'destinationID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['destinations'],
        operation: ['getDestination'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of a destination resource.',
    displayName: 'Destination ID',
    name: 'destinationID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['destinations'],
        operation: ['updateDestination'],
      },
    },
  },
  {
    displayName: 'Destination Update',
    name: 'destination_update_object',
    type: 'multiOptions',
    description: 'API request body for updating a destination.',
    required: false,
    default: [],
    options: [
      {
        name: 'Type',
        value: 'type_options',
      },
      {
        name: 'Name',
        value: 'name_string',
      },
      {
        name: 'Destination Input',
        value: 'destination_input_object',
      },
      {
        name: 'Authentication ID',
        value: 'authenticationID_string',
      },
      {
        name: 'Transformation IDs',
        value: 'transformationIDs_json',
      },
    ],
    displayOptions: {
      show: {
        resource: ['destinations'],
        operation: ['updateDestination'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description:
      'Destination type.\n\n- `search`.\n  Data is stored in an Algolia index.\n\n- `insights`.\n  Data is recorded as user events in the Insights API.\n',
    options: [
      {
        name: 'search',
        value: 'search',
      },
      {
        name: 'insights',
        value: 'insights',
      },
    ],
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'type',
      },
    },
    displayName: 'Type',
    name: 'type_options',
    displayOptions: {
      show: {
        destination_update_object: ['type_options'],
        resource: ['destinations'],
        operation: ['updateDestination'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Descriptive name for the resource.',
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
        destination_update_object: ['name_string'],
        resource: ['destinations'],
        operation: ['updateDestination'],
      },
    },
  },
  {
    displayName: 'Destination Input',
    name: 'destination_input_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Index Name',
        value: 'indexName_string_input',
      },
      {
        name: 'Record Type',
        value: 'recordType_options_input',
      },
      {
        name: 'Attributes To Exclude',
        value: 'attributesToExclude_json_input',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'input',
        value:
          '={{ { "indexName": typeof $parameter.indexName_string_input !== "undefined" ? $parameter.indexName_string_input : undefined, "recordType": typeof $parameter.recordType_options_input !== "undefined" ? $parameter.recordType_options_input : undefined, "attributesToExclude": typeof $parameter.attributesToExclude_json_input !== "undefined" ? JSON.parse($parameter.attributesToExclude_json_input) : undefined } }}',
      },
    },
    displayOptions: {
      show: {
        destination_update_object: ['destination_input_object'],
        resource: ['destinations'],
        operation: ['updateDestination'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Algolia index name (case-sensitive).',
    displayName: 'Index Name',
    name: 'indexName_string_input',
    displayOptions: {
      show: {
        destination_update_object: ['destination_input_object'],
        destination_input_object: ['indexName_string_input'],
        resource: ['destinations'],
        operation: ['updateDestination'],
      },
    },
    required: true,
  },
  {
    type: 'options',
    default: '',
    description: 'Record type for ecommerce sources.',
    options: [
      {
        name: 'product',
        value: 'product',
      },
      {
        name: 'variant',
        value: 'variant',
      },
      {
        name: 'collection',
        value: 'collection',
      },
    ],
    displayName: 'Record Type',
    name: 'recordType_options_input',
    displayOptions: {
      show: {
        destination_update_object: ['destination_input_object'],
        destination_input_object: ['recordType_options_input'],
        resource: ['destinations'],
        operation: ['updateDestination'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Attributes To Exclude',
    name: 'attributesToExclude_json_input',
    default: '[]',
    description:
      'Attributes from your source to exclude from Algolia records.\n\nNot all your data attributes will be useful for searching.\nKeeping your Algolia records small increases indexing and search performance.\n\n- Exclude nested attributes with `.` notation. For example, `foo.bar` indexes the `foo` attribute and all its children **except** the `bar` attribute.\n- Exclude attributes from arrays with `[i]`, where `i` is the index of the array element.\n  For example, `foo.[0].bar` only excludes the `bar` attribute from the first element of the `foo` array, but indexes the complete `foo` attribute for all other elements.\n  Use `*` as wildcard: `foo.[*].bar` excludes `bar` from all elements of the `foo` array.\n',
    required: false,
    displayOptions: {
      show: {
        destination_update_object: ['destination_input_object'],
        destination_input_object: ['attributesToExclude_json_input'],
        resource: ['destinations'],
        operation: ['updateDestination'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of an authentication resource.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'authenticationID',
      },
    },
    displayName: 'Authentication ID',
    name: 'authenticationID_string',
    displayOptions: {
      show: {
        destination_update_object: ['authenticationID_string'],
        resource: ['destinations'],
        operation: ['updateDestination'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Transformation IDs',
    name: 'transformationIDs_json',
    default: '[]',
    description: undefined,
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'transformationIDs',
      },
    },
    displayOptions: {
      show: {
        destination_update_object: ['transformationIDs_json'],
        resource: ['destinations'],
        operation: ['updateDestination'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of a destination resource.',
    displayName: 'Destination ID',
    name: 'destinationID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['destinations'],
        operation: ['deleteDestination'],
      },
    },
  },
  {
    type: 'number',
    default: 10,
    description: 'Number of items per page.',
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
        resource: ['sources'],
        operation: ['listSources'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description: 'Page of the API response to retrieve.',
    typeOptions: {
      minValue: 1,
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
        resource: ['sources'],
        operation: ['listSources'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Type',
    name: 'type_json',
    default: '[]',
    description: undefined,
    required: false,
    routing: {
      request: {
        qs: {
          type: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['sources'],
        operation: ['listSources'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Authentication ID',
    name: 'authenticationID_json',
    default: '[]',
    description: undefined,
    required: false,
    routing: {
      request: {
        qs: {
          authenticationID: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['sources'],
        operation: ['listSources'],
      },
    },
  },
  {
    type: 'options',
    default: 'createdAt',
    description: 'Property by which to sort the list of sources.',
    options: [
      {
        name: 'name',
        value: 'name',
      },
      {
        name: 'type',
        value: 'type',
      },
      {
        name: 'updatedAt',
        value: 'updatedAt',
      },
      {
        name: 'createdAt',
        value: 'createdAt',
      },
    ],
    routing: {
      request: {
        qs: {
          sort: '={{ $value }}',
        },
      },
    },
    displayName: 'Sort',
    name: 'sort_options',
    displayOptions: {
      show: {
        resource: ['sources'],
        operation: ['listSources'],
      },
    },
  },
  {
    type: 'options',
    default: 'desc',
    description: 'Ascending or descending sort order.',
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
          order: '={{ $value }}',
        },
      },
    },
    displayName: 'Order',
    name: 'order_options',
    displayOptions: {
      show: {
        resource: ['sources'],
        operation: ['listSources'],
      },
    },
  },
  {
    displayName: 'Source Create',
    name: 'source_create_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Type',
        value: 'type_options',
      },
      {
        name: 'Name',
        value: 'name_string',
      },
      {
        name: 'Input',
        value: 'input',
      },
      {
        name: 'Authentication ID',
        value: 'authenticationID_string',
      },
    ],
    displayOptions: {
      show: {
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    options: [
      {
        name: 'bigcommerce',
        value: 'bigcommerce',
      },
      {
        name: 'bigquery',
        value: 'bigquery',
      },
      {
        name: 'commercetools',
        value: 'commercetools',
      },
      {
        name: 'csv',
        value: 'csv',
      },
      {
        name: 'docker',
        value: 'docker',
      },
      {
        name: 'ga4BigqueryExport',
        value: 'ga4BigqueryExport',
      },
      {
        name: 'json',
        value: 'json',
      },
      {
        name: 'shopify',
        value: 'shopify',
      },
      {
        name: 'push',
        value: 'push',
      },
    ],
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'type',
      },
    },
    displayName: 'Type',
    name: 'type_options',
    displayOptions: {
      show: {
        source_create_object: ['type_options'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    default: '',
    description: 'Descriptive name of the source.',
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
        source_create_object: ['name_string'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
    required: true,
  },
  {
    type: 'options',
    name: 'input',
    displayName: 'Input',
    default: '',
    options: [
      {
        name: 'Source commercetools',
        value: 'source_commercetools',
      },
      {
        name: 'Source big commerce',
        value: 'source_big_commerce',
      },
      {
        name: 'Source jSON',
        value: 'source_json',
      },
      {
        name: 'Source cSV',
        value: 'source_csv',
      },
      {
        name: 'Source big query',
        value: 'source_big_query',
      },
      {
        name: 'Source gA4Big query export',
        value: 'source_ga4big_query_export',
      },
      {
        name: 'Source docker',
        value: 'source_docker',
      },
      {
        name: 'Source shopify',
        value: 'source_shopify',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'input',
        value:
          '={{ typeof $parameter.source_commercetools_object !== "undefined" ? { "storeKeys": typeof $parameter.storeKeys_json_input !== "undefined" ? JSON.parse($parameter.storeKeys_json_input) : undefined, "locales": typeof $parameter.locales_json_input !== "undefined" ? JSON.parse($parameter.locales_json_input) : undefined, "url": typeof $parameter.url_string_input !== "undefined" ? $parameter.url_string_input : undefined, "projectKey": typeof $parameter.projectKey_string_input !== "undefined" ? $parameter.projectKey_string_input : undefined, "fallbackIsInStockValue": typeof $parameter.fallbackIsInStockValue_boolean_input !== "undefined" ? $parameter.fallbackIsInStockValue_boolean_input : undefined, "productQueryPredicate": typeof $parameter.productQueryPredicate_string_input !== "undefined" ? $parameter.productQueryPredicate_string_input : undefined, "customFields": { "inventory": typeof $parameter.inventory_json_customFields_input !== "undefined" ? JSON.parse($parameter.inventory_json_customFields_input) : typeof $parameter.inventory_null_customFields_input !== "undefined" ? JSON.parse($parameter.inventory_null_customFields_input) : undefined, "price": typeof $parameter.price_json_customFields_input !== "undefined" ? JSON.parse($parameter.price_json_customFields_input) : typeof $parameter.price_null_customFields_input !== "undefined" ? JSON.parse($parameter.price_null_customFields_input) : undefined, "category": typeof $parameter.category_json_customFields_input !== "undefined" ? JSON.parse($parameter.category_json_customFields_input) : typeof $parameter.category_null_customFields_input !== "undefined" ? JSON.parse($parameter.category_null_customFields_input) : undefined } } : typeof $parameter.storeKeys_json_input !== "undefined" ? JSON.parse($parameter.storeKeys_json_input) : typeof $parameter.locales_json_input !== "undefined" ? JSON.parse($parameter.locales_json_input) : typeof $parameter.url_string_input !== "undefined" ? $parameter.url_string_input : typeof $parameter.projectKey_string_input !== "undefined" ? $parameter.projectKey_string_input : typeof $parameter.fallbackIsInStockValue_boolean_input !== "undefined" ? $parameter.fallbackIsInStockValue_boolean_input : typeof $parameter.productQueryPredicate_string_input !== "undefined" ? $parameter.productQueryPredicate_string_input : typeof $parameter.commercetools_custom_fields_object_input !== "undefined" ? $parameter.commercetools_custom_fields_object_input : typeof $parameter.inventory_customFields_input !== "undefined" ? $parameter.inventory_customFields_input : typeof $parameter.inventory_json_customFields_input !== "undefined" ? JSON.parse($parameter.inventory_json_customFields_input) : typeof $parameter.inventory_null_customFields_input !== "undefined" ? JSON.parse($parameter.inventory_null_customFields_input) : typeof $parameter.price_customFields_input !== "undefined" ? $parameter.price_customFields_input : typeof $parameter.price_json_customFields_input !== "undefined" ? JSON.parse($parameter.price_json_customFields_input) : typeof $parameter.price_null_customFields_input !== "undefined" ? JSON.parse($parameter.price_null_customFields_input) : typeof $parameter.category_customFields_input !== "undefined" ? $parameter.category_customFields_input : typeof $parameter.category_json_customFields_input !== "undefined" ? JSON.parse($parameter.category_json_customFields_input) : typeof $parameter.category_null_customFields_input !== "undefined" ? JSON.parse($parameter.category_null_customFields_input) : typeof $parameter.source_big_commerce_object !== "undefined" ? { "storeHash": typeof $parameter.storeHash_string_input !== "undefined" ? $parameter.storeHash_string_input : undefined, "channel": { "id": typeof $parameter.id_number_channel_input !== "undefined" ? $parameter.id_number_channel_input : undefined, "currencies": typeof $parameter.currencies_json_channel_input !== "undefined" ? JSON.parse($parameter.currencies_json_channel_input) : undefined }, "customFields": typeof $parameter.customFields_json_input !== "undefined" ? JSON.parse($parameter.customFields_json_input) : undefined, "productMetafields": typeof $parameter.productMetafields_json_input !== "undefined" ? JSON.parse($parameter.productMetafields_json_input) : undefined, "variantMetafields": typeof $parameter.variantMetafields_json_input !== "undefined" ? JSON.parse($parameter.variantMetafields_json_input) : undefined } : typeof $parameter.storeHash_string_input !== "undefined" ? $parameter.storeHash_string_input : typeof $parameter.big_commerce_channel_object_input !== "undefined" ? $parameter.big_commerce_channel_object_input : typeof $parameter.id_number_channel_input !== "undefined" ? $parameter.id_number_channel_input : typeof $parameter.currencies_json_channel_input !== "undefined" ? JSON.parse($parameter.currencies_json_channel_input) : typeof $parameter.customFields_json_input !== "undefined" ? JSON.parse($parameter.customFields_json_input) : typeof $parameter.productMetafields_json_input !== "undefined" ? JSON.parse($parameter.productMetafields_json_input) : typeof $parameter.variantMetafields_json_input !== "undefined" ? JSON.parse($parameter.variantMetafields_json_input) : typeof $parameter.source_json_object !== "undefined" ? { "url": typeof $parameter.url_string_input !== "undefined" ? $parameter.url_string_input : undefined, "uniqueIDColumn": typeof $parameter.uniqueIDColumn_string_input !== "undefined" ? $parameter.uniqueIDColumn_string_input : undefined, "method": typeof $parameter.method_options_input !== "undefined" ? $parameter.method_options_input : undefined } : typeof $parameter.url_string_input !== "undefined" ? $parameter.url_string_input : typeof $parameter.uniqueIDColumn_string_input !== "undefined" ? $parameter.uniqueIDColumn_string_input : typeof $parameter.method_options_input !== "undefined" ? $parameter.method_options_input : typeof $parameter.source_csv_object !== "undefined" ? { "url": typeof $parameter.url_string_input !== "undefined" ? $parameter.url_string_input : undefined, "uniqueIDColumn": typeof $parameter.uniqueIDColumn_string_input !== "undefined" ? $parameter.uniqueIDColumn_string_input : undefined, "mapping": typeof $parameter.mapping_object_input !== "undefined" ? JSON.parse($parameter.mapping_object_input) : undefined, "method": typeof $parameter.method_options_input !== "undefined" ? $parameter.method_options_input : undefined, "delimiter": typeof $parameter.delimiter_string_input !== "undefined" ? $parameter.delimiter_string_input : undefined } : typeof $parameter.url_string_input !== "undefined" ? $parameter.url_string_input : typeof $parameter.uniqueIDColumn_string_input !== "undefined" ? $parameter.uniqueIDColumn_string_input : typeof $parameter.mapping_object_input !== "undefined" ? JSON.parse($parameter.mapping_object_input) : typeof $parameter.method_options_input !== "undefined" ? $parameter.method_options_input : typeof $parameter.delimiter_string_input !== "undefined" ? $parameter.delimiter_string_input : typeof $parameter.source_big_query_object !== "undefined" ? { "projectID": typeof $parameter.projectID_string_input !== "undefined" ? $parameter.projectID_string_input : undefined, "datasetID": typeof $parameter.datasetID_string_input !== "undefined" ? $parameter.datasetID_string_input : undefined, "dataType": typeof $parameter.dataType_options_input !== "undefined" ? $parameter.dataType_options_input : undefined, "table": typeof $parameter.table_string_input !== "undefined" ? $parameter.table_string_input : undefined, "tablePrefix": typeof $parameter.tablePrefix_string_input !== "undefined" ? $parameter.tablePrefix_string_input : undefined, "customSQLRequest": typeof $parameter.customSQLRequest_string_input !== "undefined" ? $parameter.customSQLRequest_string_input : undefined, "uniqueIDColumn": typeof $parameter.uniqueIDColumn_string_input !== "undefined" ? $parameter.uniqueIDColumn_string_input : undefined } : typeof $parameter.projectID_string_input !== "undefined" ? $parameter.projectID_string_input : typeof $parameter.datasetID_string_input !== "undefined" ? $parameter.datasetID_string_input : typeof $parameter.dataType_options_input !== "undefined" ? $parameter.dataType_options_input : typeof $parameter.table_string_input !== "undefined" ? $parameter.table_string_input : typeof $parameter.tablePrefix_string_input !== "undefined" ? $parameter.tablePrefix_string_input : typeof $parameter.customSQLRequest_string_input !== "undefined" ? $parameter.customSQLRequest_string_input : typeof $parameter.uniqueIDColumn_string_input !== "undefined" ? $parameter.uniqueIDColumn_string_input : typeof $parameter.source_ga4big_query_export_object !== "undefined" ? { "projectID": typeof $parameter.projectID_string_input !== "undefined" ? $parameter.projectID_string_input : undefined, "datasetID": typeof $parameter.datasetID_string_input !== "undefined" ? $parameter.datasetID_string_input : undefined, "tablePrefix": typeof $parameter.tablePrefix_string_input !== "undefined" ? $parameter.tablePrefix_string_input : undefined } : typeof $parameter.projectID_string_input !== "undefined" ? $parameter.projectID_string_input : typeof $parameter.datasetID_string_input !== "undefined" ? $parameter.datasetID_string_input : typeof $parameter.tablePrefix_string_input !== "undefined" ? $parameter.tablePrefix_string_input : typeof $parameter.source_docker_object !== "undefined" ? { "image": typeof $parameter.image_string_input !== "undefined" ? $parameter.image_string_input : undefined, "configuration": typeof $parameter.configuration_object_input !== "undefined" ? JSON.parse($parameter.configuration_object_input) : undefined } : typeof $parameter.image_string_input !== "undefined" ? $parameter.image_string_input : typeof $parameter.configuration_object_input !== "undefined" ? JSON.parse($parameter.configuration_object_input) : typeof $parameter.source_shopify !== "undefined" ? $parameter.source_shopify : typeof $parameter.feature_flags_object_input !== "undefined" ? JSON.parse($parameter.feature_flags_object_input) : typeof $parameter.shopURL_string_input !== "undefined" ? $parameter.shopURL_string_input : undefined }}',
      },
    },
    displayOptions: {
      show: {
        source_create_object: ['input'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    displayName: 'Source Commercetools',
    name: 'source_commercetools_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Store Keys',
        value: 'storeKeys_json_input',
      },
      {
        name: 'Locales',
        value: 'locales_json_input',
      },
      {
        name: 'Url',
        value: 'url_string_input',
      },
      {
        name: 'Project Key',
        value: 'projectKey_string_input',
      },
      {
        name: 'Fallback Is In Stock Value',
        value: 'fallbackIsInStockValue_boolean_input',
      },
      {
        name: 'Product Query Predicate',
        value: 'productQueryPredicate_string_input',
      },
      {
        name: 'Commercetools Custom Fields',
        value: 'commercetools_custom_fields_object_input',
      },
    ],
    displayOptions: {
      show: {
        source_create_object: ['input'],
        input: ['source_commercetools'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Store Keys',
    name: 'storeKeys_json_input',
    default: '[]',
    description: undefined,
    required: false,
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_commercetools_object: ['storeKeys_json_input'],
        input: ['source_commercetools'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Locales',
    name: 'locales_json_input',
    default: '[]',
    description: 'Locales for your commercetools stores.',
    required: false,
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_commercetools_object: ['locales_json_input'],
        input: ['source_commercetools'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    displayName: 'Url',
    name: 'url_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_commercetools_object: ['url_string_input'],
        input: ['source_commercetools'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    default: '',
    displayName: 'Project Key',
    name: 'projectKey_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_commercetools_object: ['projectKey_string_input'],
        input: ['source_commercetools'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
    required: true,
  },
  {
    type: 'boolean',
    default: true,
    description:
      "Whether a fallback value is stored in the Algolia record if there's no inventory information about the product.\n",
    displayName: 'Fallback Is In Stock Value',
    name: 'fallbackIsInStockValue_boolean_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_commercetools_object: ['fallbackIsInStockValue_boolean_input'],
        input: ['source_commercetools'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description:
      'Predicate to filter out specific products when indexing. For more information, see [Query Predicate](https://docs.commercetools.com/api/predicates/query).\n',
    displayName: 'Product Query Predicate',
    name: 'productQueryPredicate_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_commercetools_object: ['productQueryPredicate_string_input'],
        input: ['source_commercetools'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    displayName: 'Commercetools Custom Fields',
    name: 'commercetools_custom_fields_object_input',
    type: 'multiOptions',
    description:
      'Custom fields from commercetools to add to the records.\n\nFor more information, see [Using Custom Types and Custom Fields](https://docs.commercetools.com/tutorials/custom-types).\n',
    required: false,
    default: [],
    options: [
      {
        name: 'Inventory',
        value: 'inventory_customFields',
      },
      {
        name: 'Price',
        value: 'price_customFields',
      },
      {
        name: 'Category',
        value: 'category_customFields',
      },
    ],
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_commercetools_object: ['commercetools_custom_fields_object_input'],
        input: ['source_commercetools'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    type: 'options',
    name: 'inventory_customFields_input',
    displayName: 'Inventory',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'Null',
        value: 'null',
      },
    ],
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_commercetools_object: ['commercetools_custom_fields_object_input'],
        commercetools_custom_fields_object_input: ['inventory_customFields'],
        input: ['source_commercetools'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Inventory (Array)',
    name: 'inventory_json_customFields_input',
    default: '[]',
    description: 'Inventory custom fields.',
    required: false,
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_commercetools_object: ['commercetools_custom_fields_object_input'],
        commercetools_custom_fields_object_input: ['inventory_customFields'],
        inventory_customFields_input: ['array'],
        input: ['source_commercetools'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Inventory (Null)',
    name: 'inventory_null_customFields_input',
    default: 'null',
    description: undefined,
    required: false,
    disabledOptions: {
      show: {
        inventory: ['null'],
      },
    },
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_commercetools_object: ['commercetools_custom_fields_object_input'],
        commercetools_custom_fields_object_input: ['inventory_customFields'],
        inventory_customFields_input: ['null'],
        input: ['source_commercetools'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    type: 'options',
    name: 'price_customFields_input',
    displayName: 'Price',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'Null',
        value: 'null',
      },
    ],
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_commercetools_object: ['commercetools_custom_fields_object_input'],
        commercetools_custom_fields_object_input: ['price_customFields'],
        input: ['source_commercetools'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Price (Array)',
    name: 'price_json_customFields_input',
    default: '[]',
    description: 'Price custom fields.',
    required: false,
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_commercetools_object: ['commercetools_custom_fields_object_input'],
        commercetools_custom_fields_object_input: ['price_customFields'],
        price_customFields_input: ['array'],
        input: ['source_commercetools'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Price (Null)',
    name: 'price_null_customFields_input',
    default: 'null',
    description: undefined,
    required: false,
    disabledOptions: {
      show: {
        price: ['null'],
      },
    },
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_commercetools_object: ['commercetools_custom_fields_object_input'],
        commercetools_custom_fields_object_input: ['price_customFields'],
        price_customFields_input: ['null'],
        input: ['source_commercetools'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    type: 'options',
    name: 'category_customFields_input',
    displayName: 'Category',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'Null',
        value: 'null',
      },
    ],
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_commercetools_object: ['commercetools_custom_fields_object_input'],
        commercetools_custom_fields_object_input: ['category_customFields'],
        input: ['source_commercetools'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Category (Array)',
    name: 'category_json_customFields_input',
    default: '[]',
    description: 'Category custom fields.',
    required: false,
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_commercetools_object: ['commercetools_custom_fields_object_input'],
        commercetools_custom_fields_object_input: ['category_customFields'],
        category_customFields_input: ['array'],
        input: ['source_commercetools'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Category (Null)',
    name: 'category_null_customFields_input',
    default: 'null',
    description: undefined,
    required: false,
    disabledOptions: {
      show: {
        category: ['null'],
      },
    },
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_commercetools_object: ['commercetools_custom_fields_object_input'],
        commercetools_custom_fields_object_input: ['category_customFields'],
        category_customFields_input: ['null'],
        input: ['source_commercetools'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    displayName: 'Source Big Commerce',
    name: 'source_big_commerce_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Store Hash',
        value: 'storeHash_string_input',
      },
      {
        name: 'Big Commerce Channel',
        value: 'big_commerce_channel_object_input',
      },
      {
        name: 'Custom Fields',
        value: 'customFields_json_input',
      },
      {
        name: 'Product Metafields',
        value: 'productMetafields_json_input',
      },
      {
        name: 'Variant Metafields',
        value: 'variantMetafields_json_input',
      },
    ],
    displayOptions: {
      show: {
        source_create_object: ['input'],
        input: ['source_big_commerce'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Store hash identifying your BigCommerce store.',
    displayName: 'Store Hash',
    name: 'storeHash_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_big_commerce_object: ['storeHash_string_input'],
        input: ['source_big_commerce'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
    required: true,
  },
  {
    displayName: 'Big Commerce Channel',
    name: 'big_commerce_channel_object_input',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Id',
        value: 'id_number_channel',
      },
      {
        name: 'Currencies',
        value: 'currencies_json_channel',
      },
    ],
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_big_commerce_object: ['big_commerce_channel_object_input'],
        input: ['source_big_commerce'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description: 'ID of the BigCommerce channel.',
    displayName: 'Id',
    name: 'id_number_channel_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_big_commerce_object: ['big_commerce_channel_object_input'],
        big_commerce_channel_object_input: ['id_number_channel'],
        input: ['source_big_commerce'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
    required: true,
  },
  {
    type: 'json',
    displayName: 'Currencies',
    name: 'currencies_json_channel_input',
    default: '[]',
    description: 'Currencies for the given channel.',
    required: false,
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_big_commerce_object: ['big_commerce_channel_object_input'],
        big_commerce_channel_object_input: ['currencies_json_channel'],
        input: ['source_big_commerce'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Custom Fields',
    name: 'customFields_json_input',
    default: '[]',
    description: undefined,
    required: false,
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_big_commerce_object: ['customFields_json_input'],
        input: ['source_big_commerce'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Product Metafields',
    name: 'productMetafields_json_input',
    default: '[]',
    description: undefined,
    required: false,
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_big_commerce_object: ['productMetafields_json_input'],
        input: ['source_big_commerce'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Variant Metafields',
    name: 'variantMetafields_json_input',
    default: '[]',
    description: undefined,
    required: false,
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_big_commerce_object: ['variantMetafields_json_input'],
        input: ['source_big_commerce'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    displayName: 'Source JSON',
    name: 'source_json_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Url',
        value: 'url_string_input',
      },
      {
        name: 'Unique IDColumn',
        value: 'uniqueIDColumn_string_input',
      },
      {
        name: 'Method',
        value: 'method_options_input',
      },
    ],
    displayOptions: {
      show: {
        source_create_object: ['input'],
        input: ['source_json'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'URL of the file.',
    displayName: 'Url',
    name: 'url_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_json_object: ['url_string_input'],
        input: ['source_json'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    default: '',
    description:
      'Name of a column that contains a unique ID which will be used as `objectID` in Algolia.',
    displayName: 'Unique IDColumn',
    name: 'uniqueIDColumn_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_json_object: ['uniqueIDColumn_string_input'],
        input: ['source_json'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description: 'HTTP method to be used for retrieving your data.',
    options: [
      {
        name: 'GET',
        value: 'GET',
      },
      {
        name: 'POST',
        value: 'POST',
      },
    ],
    displayName: 'Method',
    name: 'method_options_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_json_object: ['method_options_input'],
        input: ['source_json'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    displayName: 'Source CSV',
    name: 'source_csv_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Url',
        value: 'url_string_input',
      },
      {
        name: 'Unique IDColumn',
        value: 'uniqueIDColumn_string_input',
      },
      {
        name: 'Mapping',
        value: 'mapping_object_input',
      },
      {
        name: 'Method',
        value: 'method_options_input',
      },
      {
        name: 'Delimiter',
        value: 'delimiter_string_input',
      },
    ],
    displayOptions: {
      show: {
        source_create_object: ['input'],
        input: ['source_csv'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'URL of the file.',
    displayName: 'Url',
    name: 'url_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_csv_object: ['url_string_input'],
        input: ['source_csv'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    default: '',
    description:
      'Name of a column that contains a unique ID which will be used as `objectID` in Algolia.',
    displayName: 'Unique IDColumn',
    name: 'uniqueIDColumn_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_csv_object: ['uniqueIDColumn_string_input'],
        input: ['source_csv'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Mapping',
    name: 'mapping_object_input',
    description: 'Key-value pairs of column names and their expected types.\n',
    required: false,
    default: '{}',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_csv_object: ['mapping_object_input'],
        input: ['source_csv'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description: 'HTTP method to be used for retrieving your data.',
    options: [
      {
        name: 'GET',
        value: 'GET',
      },
      {
        name: 'POST',
        value: 'POST',
      },
    ],
    displayName: 'Method',
    name: 'method_options_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_csv_object: ['method_options_input'],
        input: ['source_csv'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    type: 'string',
    default: ',',
    description:
      'The character used to split the value on each line, default to a comma (\r, \n, 0xFFFD, and space are forbidden).',
    displayName: 'Delimiter',
    name: 'delimiter_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_csv_object: ['delimiter_string_input'],
        input: ['source_csv'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    displayName: 'Source Big Query',
    name: 'source_big_query_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Project ID',
        value: 'projectID_string_input',
      },
      {
        name: 'Dataset ID',
        value: 'datasetID_string_input',
      },
      {
        name: 'Data Type',
        value: 'dataType_options_input',
      },
      {
        name: 'Table',
        value: 'table_string_input',
      },
      {
        name: 'Table Prefix',
        value: 'tablePrefix_string_input',
      },
      {
        name: 'Custom SQLRequest',
        value: 'customSQLRequest_string_input',
      },
      {
        name: 'Unique IDColumn',
        value: 'uniqueIDColumn_string_input',
      },
    ],
    displayOptions: {
      show: {
        source_create_object: ['input'],
        input: ['source_big_query'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Project ID of the BigQuery source.',
    displayName: 'Project ID',
    name: 'projectID_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_big_query_object: ['projectID_string_input'],
        input: ['source_big_query'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    default: '',
    description: 'Dataset ID of the BigQuery source.',
    displayName: 'Dataset ID',
    name: 'datasetID_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_big_query_object: ['datasetID_string_input'],
        input: ['source_big_query'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
    required: true,
  },
  {
    type: 'options',
    default: '',
    options: [
      {
        name: 'ga4',
        value: 'ga4',
      },
      {
        name: 'ga360',
        value: 'ga360',
      },
    ],
    displayName: 'Data Type',
    name: 'dataType_options_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_big_query_object: ['dataType_options_input'],
        input: ['source_big_query'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Table name for the BigQuery export.',
    displayName: 'Table',
    name: 'table_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_big_query_object: ['table_string_input'],
        input: ['source_big_query'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Table prefix for a Google Analytics 4 data export to BigQuery.',
    displayName: 'Table Prefix',
    name: 'tablePrefix_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_big_query_object: ['tablePrefix_string_input'],
        input: ['source_big_query'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Custom SQL request to extract data from the BigQuery table.',
    displayName: 'Custom SQLRequest',
    name: 'customSQLRequest_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_big_query_object: ['customSQLRequest_string_input'],
        input: ['source_big_query'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description:
      'Name of a column that contains a unique ID which will be used as `objectID` in Algolia.',
    displayName: 'Unique IDColumn',
    name: 'uniqueIDColumn_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_big_query_object: ['uniqueIDColumn_string_input'],
        input: ['source_big_query'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    displayName: 'Source GA4Big Query Export',
    name: 'source_ga4big_query_export_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Project ID',
        value: 'projectID_string_input',
      },
      {
        name: 'Dataset ID',
        value: 'datasetID_string_input',
      },
      {
        name: 'Table Prefix',
        value: 'tablePrefix_string_input',
      },
    ],
    displayOptions: {
      show: {
        source_create_object: ['input'],
        input: ['source_ga4big_query_export'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'GCP project ID that the BigQuery export writes to.',
    displayName: 'Project ID',
    name: 'projectID_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_ga4big_query_export_object: ['projectID_string_input'],
        input: ['source_ga4big_query_export'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    default: '',
    description: 'BigQuery dataset ID that the BigQuery export writes to.',
    displayName: 'Dataset ID',
    name: 'datasetID_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_ga4big_query_export_object: ['datasetID_string_input'],
        input: ['source_ga4big_query_export'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    placeholder: 'events_intraday_',
    default: '',
    description: 'Prefix of the tables that the BigQuery Export writes to.',
    displayName: 'Table Prefix',
    name: 'tablePrefix_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_ga4big_query_export_object: ['tablePrefix_string_input'],
        input: ['source_ga4big_query_export'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
    required: true,
  },
  {
    displayName: 'Source Docker',
    name: 'source_docker_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Image',
        value: 'image_string_input',
      },
      {
        name: 'Configuration',
        value: 'configuration_object_input',
      },
    ],
    displayOptions: {
      show: {
        source_create_object: ['input'],
        input: ['source_docker'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'zendesk',
    default: '',
    description: 'Name of the connector.',
    displayName: 'Image',
    name: 'image_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_docker_object: ['image_string_input'],
        input: ['source_docker'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
    required: true,
  },
  {
    type: 'json',
    displayName: 'Configuration',
    name: 'configuration_object_input',
    description: 'Configuration of the spec.',
    required: true,
    default: '{}',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_docker_object: ['configuration_object_input'],
        input: ['source_docker'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    type: 'multiOptions',
    name: 'source_shopify',
    displayName: 'Source Shopify',
    description: undefined,
    default: [],
    options: [
      {
        name: 'Feature Flags',
        value: 'feature_flags_object_input',
      },
      {
        name: 'Shop URL',
        value: 'shopurl_string_input',
      },
    ],
    displayOptions: {
      show: {
        source_create_object: ['input'],
        input: ['source_shopify'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Feature Flags',
    name: 'feature_flags_object_input',
    description: 'Feature flags for the Shopify source.',
    required: false,
    default: '{}',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_shopify: ['feature_flags_object_input'],
        input: ['source_shopify'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'URL of the Shopify store.',
    displayName: 'Shop URL',
    name: 'shopURL_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_shopify: ['shopurl_string_input'],
        input: ['source_shopify'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of an authentication resource.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'authenticationID',
      },
    },
    displayName: 'Authentication ID',
    name: 'authenticationID_string',
    displayOptions: {
      show: {
        source_create_object: ['authenticationID_string'],
        resource: ['sources'],
        operation: ['createSource'],
      },
    },
  },
  {
    displayName: 'Source Create',
    name: 'source_create_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Type',
        value: 'type_options',
      },
      {
        name: 'Name',
        value: 'name_string',
      },
      {
        name: 'Input',
        value: 'input',
      },
      {
        name: 'Authentication ID',
        value: 'authenticationID_string',
      },
    ],
    displayOptions: {
      show: {
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    options: [
      {
        name: 'bigcommerce',
        value: 'bigcommerce',
      },
      {
        name: 'bigquery',
        value: 'bigquery',
      },
      {
        name: 'commercetools',
        value: 'commercetools',
      },
      {
        name: 'csv',
        value: 'csv',
      },
      {
        name: 'docker',
        value: 'docker',
      },
      {
        name: 'ga4BigqueryExport',
        value: 'ga4BigqueryExport',
      },
      {
        name: 'json',
        value: 'json',
      },
      {
        name: 'shopify',
        value: 'shopify',
      },
      {
        name: 'push',
        value: 'push',
      },
    ],
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'type',
      },
    },
    displayName: 'Type',
    name: 'type_options',
    displayOptions: {
      show: {
        source_create_object: ['type_options'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    default: '',
    description: 'Descriptive name of the source.',
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
        source_create_object: ['name_string'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
    required: true,
  },
  {
    type: 'options',
    name: 'input',
    displayName: 'Input',
    default: '',
    options: [
      {
        name: 'Source commercetools',
        value: 'source_commercetools',
      },
      {
        name: 'Source big commerce',
        value: 'source_big_commerce',
      },
      {
        name: 'Source jSON',
        value: 'source_json',
      },
      {
        name: 'Source cSV',
        value: 'source_csv',
      },
      {
        name: 'Source big query',
        value: 'source_big_query',
      },
      {
        name: 'Source gA4Big query export',
        value: 'source_ga4big_query_export',
      },
      {
        name: 'Source docker',
        value: 'source_docker',
      },
      {
        name: 'Source shopify',
        value: 'source_shopify',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'input',
        value:
          '={{ typeof $parameter.source_commercetools_object !== "undefined" ? { "storeKeys": typeof $parameter.storeKeys_json_input !== "undefined" ? JSON.parse($parameter.storeKeys_json_input) : undefined, "locales": typeof $parameter.locales_json_input !== "undefined" ? JSON.parse($parameter.locales_json_input) : undefined, "url": typeof $parameter.url_string_input !== "undefined" ? $parameter.url_string_input : undefined, "projectKey": typeof $parameter.projectKey_string_input !== "undefined" ? $parameter.projectKey_string_input : undefined, "fallbackIsInStockValue": typeof $parameter.fallbackIsInStockValue_boolean_input !== "undefined" ? $parameter.fallbackIsInStockValue_boolean_input : undefined, "productQueryPredicate": typeof $parameter.productQueryPredicate_string_input !== "undefined" ? $parameter.productQueryPredicate_string_input : undefined, "customFields": { "inventory": typeof $parameter.inventory_json_customFields_input !== "undefined" ? JSON.parse($parameter.inventory_json_customFields_input) : typeof $parameter.inventory_null_customFields_input !== "undefined" ? JSON.parse($parameter.inventory_null_customFields_input) : undefined, "price": typeof $parameter.price_json_customFields_input !== "undefined" ? JSON.parse($parameter.price_json_customFields_input) : typeof $parameter.price_null_customFields_input !== "undefined" ? JSON.parse($parameter.price_null_customFields_input) : undefined, "category": typeof $parameter.category_json_customFields_input !== "undefined" ? JSON.parse($parameter.category_json_customFields_input) : typeof $parameter.category_null_customFields_input !== "undefined" ? JSON.parse($parameter.category_null_customFields_input) : undefined } } : typeof $parameter.storeKeys_json_input !== "undefined" ? JSON.parse($parameter.storeKeys_json_input) : typeof $parameter.locales_json_input !== "undefined" ? JSON.parse($parameter.locales_json_input) : typeof $parameter.url_string_input !== "undefined" ? $parameter.url_string_input : typeof $parameter.projectKey_string_input !== "undefined" ? $parameter.projectKey_string_input : typeof $parameter.fallbackIsInStockValue_boolean_input !== "undefined" ? $parameter.fallbackIsInStockValue_boolean_input : typeof $parameter.productQueryPredicate_string_input !== "undefined" ? $parameter.productQueryPredicate_string_input : typeof $parameter.commercetools_custom_fields_object_input !== "undefined" ? $parameter.commercetools_custom_fields_object_input : typeof $parameter.inventory_customFields_input !== "undefined" ? $parameter.inventory_customFields_input : typeof $parameter.inventory_json_customFields_input !== "undefined" ? JSON.parse($parameter.inventory_json_customFields_input) : typeof $parameter.inventory_null_customFields_input !== "undefined" ? JSON.parse($parameter.inventory_null_customFields_input) : typeof $parameter.price_customFields_input !== "undefined" ? $parameter.price_customFields_input : typeof $parameter.price_json_customFields_input !== "undefined" ? JSON.parse($parameter.price_json_customFields_input) : typeof $parameter.price_null_customFields_input !== "undefined" ? JSON.parse($parameter.price_null_customFields_input) : typeof $parameter.category_customFields_input !== "undefined" ? $parameter.category_customFields_input : typeof $parameter.category_json_customFields_input !== "undefined" ? JSON.parse($parameter.category_json_customFields_input) : typeof $parameter.category_null_customFields_input !== "undefined" ? JSON.parse($parameter.category_null_customFields_input) : typeof $parameter.source_big_commerce_object !== "undefined" ? { "storeHash": typeof $parameter.storeHash_string_input !== "undefined" ? $parameter.storeHash_string_input : undefined, "channel": { "id": typeof $parameter.id_number_channel_input !== "undefined" ? $parameter.id_number_channel_input : undefined, "currencies": typeof $parameter.currencies_json_channel_input !== "undefined" ? JSON.parse($parameter.currencies_json_channel_input) : undefined }, "customFields": typeof $parameter.customFields_json_input !== "undefined" ? JSON.parse($parameter.customFields_json_input) : undefined, "productMetafields": typeof $parameter.productMetafields_json_input !== "undefined" ? JSON.parse($parameter.productMetafields_json_input) : undefined, "variantMetafields": typeof $parameter.variantMetafields_json_input !== "undefined" ? JSON.parse($parameter.variantMetafields_json_input) : undefined } : typeof $parameter.storeHash_string_input !== "undefined" ? $parameter.storeHash_string_input : typeof $parameter.big_commerce_channel_object_input !== "undefined" ? $parameter.big_commerce_channel_object_input : typeof $parameter.id_number_channel_input !== "undefined" ? $parameter.id_number_channel_input : typeof $parameter.currencies_json_channel_input !== "undefined" ? JSON.parse($parameter.currencies_json_channel_input) : typeof $parameter.customFields_json_input !== "undefined" ? JSON.parse($parameter.customFields_json_input) : typeof $parameter.productMetafields_json_input !== "undefined" ? JSON.parse($parameter.productMetafields_json_input) : typeof $parameter.variantMetafields_json_input !== "undefined" ? JSON.parse($parameter.variantMetafields_json_input) : typeof $parameter.source_json_object !== "undefined" ? { "url": typeof $parameter.url_string_input !== "undefined" ? $parameter.url_string_input : undefined, "uniqueIDColumn": typeof $parameter.uniqueIDColumn_string_input !== "undefined" ? $parameter.uniqueIDColumn_string_input : undefined, "method": typeof $parameter.method_options_input !== "undefined" ? $parameter.method_options_input : undefined } : typeof $parameter.url_string_input !== "undefined" ? $parameter.url_string_input : typeof $parameter.uniqueIDColumn_string_input !== "undefined" ? $parameter.uniqueIDColumn_string_input : typeof $parameter.method_options_input !== "undefined" ? $parameter.method_options_input : typeof $parameter.source_csv_object !== "undefined" ? { "url": typeof $parameter.url_string_input !== "undefined" ? $parameter.url_string_input : undefined, "uniqueIDColumn": typeof $parameter.uniqueIDColumn_string_input !== "undefined" ? $parameter.uniqueIDColumn_string_input : undefined, "mapping": typeof $parameter.mapping_object_input !== "undefined" ? JSON.parse($parameter.mapping_object_input) : undefined, "method": typeof $parameter.method_options_input !== "undefined" ? $parameter.method_options_input : undefined, "delimiter": typeof $parameter.delimiter_string_input !== "undefined" ? $parameter.delimiter_string_input : undefined } : typeof $parameter.url_string_input !== "undefined" ? $parameter.url_string_input : typeof $parameter.uniqueIDColumn_string_input !== "undefined" ? $parameter.uniqueIDColumn_string_input : typeof $parameter.mapping_object_input !== "undefined" ? JSON.parse($parameter.mapping_object_input) : typeof $parameter.method_options_input !== "undefined" ? $parameter.method_options_input : typeof $parameter.delimiter_string_input !== "undefined" ? $parameter.delimiter_string_input : typeof $parameter.source_big_query_object !== "undefined" ? { "projectID": typeof $parameter.projectID_string_input !== "undefined" ? $parameter.projectID_string_input : undefined, "datasetID": typeof $parameter.datasetID_string_input !== "undefined" ? $parameter.datasetID_string_input : undefined, "dataType": typeof $parameter.dataType_options_input !== "undefined" ? $parameter.dataType_options_input : undefined, "table": typeof $parameter.table_string_input !== "undefined" ? $parameter.table_string_input : undefined, "tablePrefix": typeof $parameter.tablePrefix_string_input !== "undefined" ? $parameter.tablePrefix_string_input : undefined, "customSQLRequest": typeof $parameter.customSQLRequest_string_input !== "undefined" ? $parameter.customSQLRequest_string_input : undefined, "uniqueIDColumn": typeof $parameter.uniqueIDColumn_string_input !== "undefined" ? $parameter.uniqueIDColumn_string_input : undefined } : typeof $parameter.projectID_string_input !== "undefined" ? $parameter.projectID_string_input : typeof $parameter.datasetID_string_input !== "undefined" ? $parameter.datasetID_string_input : typeof $parameter.dataType_options_input !== "undefined" ? $parameter.dataType_options_input : typeof $parameter.table_string_input !== "undefined" ? $parameter.table_string_input : typeof $parameter.tablePrefix_string_input !== "undefined" ? $parameter.tablePrefix_string_input : typeof $parameter.customSQLRequest_string_input !== "undefined" ? $parameter.customSQLRequest_string_input : typeof $parameter.uniqueIDColumn_string_input !== "undefined" ? $parameter.uniqueIDColumn_string_input : typeof $parameter.source_ga4big_query_export_object !== "undefined" ? { "projectID": typeof $parameter.projectID_string_input !== "undefined" ? $parameter.projectID_string_input : undefined, "datasetID": typeof $parameter.datasetID_string_input !== "undefined" ? $parameter.datasetID_string_input : undefined, "tablePrefix": typeof $parameter.tablePrefix_string_input !== "undefined" ? $parameter.tablePrefix_string_input : undefined } : typeof $parameter.projectID_string_input !== "undefined" ? $parameter.projectID_string_input : typeof $parameter.datasetID_string_input !== "undefined" ? $parameter.datasetID_string_input : typeof $parameter.tablePrefix_string_input !== "undefined" ? $parameter.tablePrefix_string_input : typeof $parameter.source_docker_object !== "undefined" ? { "image": typeof $parameter.image_string_input !== "undefined" ? $parameter.image_string_input : undefined, "configuration": typeof $parameter.configuration_object_input !== "undefined" ? JSON.parse($parameter.configuration_object_input) : undefined } : typeof $parameter.image_string_input !== "undefined" ? $parameter.image_string_input : typeof $parameter.configuration_object_input !== "undefined" ? JSON.parse($parameter.configuration_object_input) : typeof $parameter.source_shopify !== "undefined" ? $parameter.source_shopify : typeof $parameter.feature_flags_object_input !== "undefined" ? JSON.parse($parameter.feature_flags_object_input) : typeof $parameter.shopURL_string_input !== "undefined" ? $parameter.shopURL_string_input : undefined }}',
      },
    },
    displayOptions: {
      show: {
        source_create_object: ['input'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    displayName: 'Source Commercetools',
    name: 'source_commercetools_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Store Keys',
        value: 'storeKeys_json_input',
      },
      {
        name: 'Locales',
        value: 'locales_json_input',
      },
      {
        name: 'Url',
        value: 'url_string_input',
      },
      {
        name: 'Project Key',
        value: 'projectKey_string_input',
      },
      {
        name: 'Fallback Is In Stock Value',
        value: 'fallbackIsInStockValue_boolean_input',
      },
      {
        name: 'Product Query Predicate',
        value: 'productQueryPredicate_string_input',
      },
      {
        name: 'Commercetools Custom Fields',
        value: 'commercetools_custom_fields_object_input',
      },
    ],
    displayOptions: {
      show: {
        source_create_object: ['input'],
        input: ['source_commercetools'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Store Keys',
    name: 'storeKeys_json_input',
    default: '[]',
    description: undefined,
    required: false,
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_commercetools_object: ['storeKeys_json_input'],
        input: ['source_commercetools'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Locales',
    name: 'locales_json_input',
    default: '[]',
    description: 'Locales for your commercetools stores.',
    required: false,
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_commercetools_object: ['locales_json_input'],
        input: ['source_commercetools'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    displayName: 'Url',
    name: 'url_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_commercetools_object: ['url_string_input'],
        input: ['source_commercetools'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    default: '',
    displayName: 'Project Key',
    name: 'projectKey_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_commercetools_object: ['projectKey_string_input'],
        input: ['source_commercetools'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
    required: true,
  },
  {
    type: 'boolean',
    default: true,
    description:
      "Whether a fallback value is stored in the Algolia record if there's no inventory information about the product.\n",
    displayName: 'Fallback Is In Stock Value',
    name: 'fallbackIsInStockValue_boolean_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_commercetools_object: ['fallbackIsInStockValue_boolean_input'],
        input: ['source_commercetools'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description:
      'Predicate to filter out specific products when indexing. For more information, see [Query Predicate](https://docs.commercetools.com/api/predicates/query).\n',
    displayName: 'Product Query Predicate',
    name: 'productQueryPredicate_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_commercetools_object: ['productQueryPredicate_string_input'],
        input: ['source_commercetools'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    displayName: 'Commercetools Custom Fields',
    name: 'commercetools_custom_fields_object_input',
    type: 'multiOptions',
    description:
      'Custom fields from commercetools to add to the records.\n\nFor more information, see [Using Custom Types and Custom Fields](https://docs.commercetools.com/tutorials/custom-types).\n',
    required: false,
    default: [],
    options: [
      {
        name: 'Inventory',
        value: 'inventory_customFields',
      },
      {
        name: 'Price',
        value: 'price_customFields',
      },
      {
        name: 'Category',
        value: 'category_customFields',
      },
    ],
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_commercetools_object: ['commercetools_custom_fields_object_input'],
        input: ['source_commercetools'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    type: 'options',
    name: 'inventory_customFields_input',
    displayName: 'Inventory',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'Null',
        value: 'null',
      },
    ],
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_commercetools_object: ['commercetools_custom_fields_object_input'],
        commercetools_custom_fields_object_input: ['inventory_customFields'],
        input: ['source_commercetools'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Inventory (Array)',
    name: 'inventory_json_customFields_input',
    default: '[]',
    description: 'Inventory custom fields.',
    required: false,
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_commercetools_object: ['commercetools_custom_fields_object_input'],
        commercetools_custom_fields_object_input: ['inventory_customFields'],
        inventory_customFields_input: ['array'],
        input: ['source_commercetools'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Inventory (Null)',
    name: 'inventory_null_customFields_input',
    default: 'null',
    description: undefined,
    required: false,
    disabledOptions: {
      show: {
        inventory: ['null'],
      },
    },
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_commercetools_object: ['commercetools_custom_fields_object_input'],
        commercetools_custom_fields_object_input: ['inventory_customFields'],
        inventory_customFields_input: ['null'],
        input: ['source_commercetools'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    type: 'options',
    name: 'price_customFields_input',
    displayName: 'Price',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'Null',
        value: 'null',
      },
    ],
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_commercetools_object: ['commercetools_custom_fields_object_input'],
        commercetools_custom_fields_object_input: ['price_customFields'],
        input: ['source_commercetools'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Price (Array)',
    name: 'price_json_customFields_input',
    default: '[]',
    description: 'Price custom fields.',
    required: false,
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_commercetools_object: ['commercetools_custom_fields_object_input'],
        commercetools_custom_fields_object_input: ['price_customFields'],
        price_customFields_input: ['array'],
        input: ['source_commercetools'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Price (Null)',
    name: 'price_null_customFields_input',
    default: 'null',
    description: undefined,
    required: false,
    disabledOptions: {
      show: {
        price: ['null'],
      },
    },
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_commercetools_object: ['commercetools_custom_fields_object_input'],
        commercetools_custom_fields_object_input: ['price_customFields'],
        price_customFields_input: ['null'],
        input: ['source_commercetools'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    type: 'options',
    name: 'category_customFields_input',
    displayName: 'Category',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'Null',
        value: 'null',
      },
    ],
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_commercetools_object: ['commercetools_custom_fields_object_input'],
        commercetools_custom_fields_object_input: ['category_customFields'],
        input: ['source_commercetools'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Category (Array)',
    name: 'category_json_customFields_input',
    default: '[]',
    description: 'Category custom fields.',
    required: false,
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_commercetools_object: ['commercetools_custom_fields_object_input'],
        commercetools_custom_fields_object_input: ['category_customFields'],
        category_customFields_input: ['array'],
        input: ['source_commercetools'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Category (Null)',
    name: 'category_null_customFields_input',
    default: 'null',
    description: undefined,
    required: false,
    disabledOptions: {
      show: {
        category: ['null'],
      },
    },
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_commercetools_object: ['commercetools_custom_fields_object_input'],
        commercetools_custom_fields_object_input: ['category_customFields'],
        category_customFields_input: ['null'],
        input: ['source_commercetools'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    displayName: 'Source Big Commerce',
    name: 'source_big_commerce_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Store Hash',
        value: 'storeHash_string_input',
      },
      {
        name: 'Big Commerce Channel',
        value: 'big_commerce_channel_object_input',
      },
      {
        name: 'Custom Fields',
        value: 'customFields_json_input',
      },
      {
        name: 'Product Metafields',
        value: 'productMetafields_json_input',
      },
      {
        name: 'Variant Metafields',
        value: 'variantMetafields_json_input',
      },
    ],
    displayOptions: {
      show: {
        source_create_object: ['input'],
        input: ['source_big_commerce'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Store hash identifying your BigCommerce store.',
    displayName: 'Store Hash',
    name: 'storeHash_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_big_commerce_object: ['storeHash_string_input'],
        input: ['source_big_commerce'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
    required: true,
  },
  {
    displayName: 'Big Commerce Channel',
    name: 'big_commerce_channel_object_input',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Id',
        value: 'id_number_channel',
      },
      {
        name: 'Currencies',
        value: 'currencies_json_channel',
      },
    ],
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_big_commerce_object: ['big_commerce_channel_object_input'],
        input: ['source_big_commerce'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description: 'ID of the BigCommerce channel.',
    displayName: 'Id',
    name: 'id_number_channel_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_big_commerce_object: ['big_commerce_channel_object_input'],
        big_commerce_channel_object_input: ['id_number_channel'],
        input: ['source_big_commerce'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
    required: true,
  },
  {
    type: 'json',
    displayName: 'Currencies',
    name: 'currencies_json_channel_input',
    default: '[]',
    description: 'Currencies for the given channel.',
    required: false,
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_big_commerce_object: ['big_commerce_channel_object_input'],
        big_commerce_channel_object_input: ['currencies_json_channel'],
        input: ['source_big_commerce'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Custom Fields',
    name: 'customFields_json_input',
    default: '[]',
    description: undefined,
    required: false,
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_big_commerce_object: ['customFields_json_input'],
        input: ['source_big_commerce'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Product Metafields',
    name: 'productMetafields_json_input',
    default: '[]',
    description: undefined,
    required: false,
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_big_commerce_object: ['productMetafields_json_input'],
        input: ['source_big_commerce'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Variant Metafields',
    name: 'variantMetafields_json_input',
    default: '[]',
    description: undefined,
    required: false,
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_big_commerce_object: ['variantMetafields_json_input'],
        input: ['source_big_commerce'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    displayName: 'Source JSON',
    name: 'source_json_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Url',
        value: 'url_string_input',
      },
      {
        name: 'Unique IDColumn',
        value: 'uniqueIDColumn_string_input',
      },
      {
        name: 'Method',
        value: 'method_options_input',
      },
    ],
    displayOptions: {
      show: {
        source_create_object: ['input'],
        input: ['source_json'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'URL of the file.',
    displayName: 'Url',
    name: 'url_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_json_object: ['url_string_input'],
        input: ['source_json'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    default: '',
    description:
      'Name of a column that contains a unique ID which will be used as `objectID` in Algolia.',
    displayName: 'Unique IDColumn',
    name: 'uniqueIDColumn_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_json_object: ['uniqueIDColumn_string_input'],
        input: ['source_json'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description: 'HTTP method to be used for retrieving your data.',
    options: [
      {
        name: 'GET',
        value: 'GET',
      },
      {
        name: 'POST',
        value: 'POST',
      },
    ],
    displayName: 'Method',
    name: 'method_options_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_json_object: ['method_options_input'],
        input: ['source_json'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    displayName: 'Source CSV',
    name: 'source_csv_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Url',
        value: 'url_string_input',
      },
      {
        name: 'Unique IDColumn',
        value: 'uniqueIDColumn_string_input',
      },
      {
        name: 'Mapping',
        value: 'mapping_object_input',
      },
      {
        name: 'Method',
        value: 'method_options_input',
      },
      {
        name: 'Delimiter',
        value: 'delimiter_string_input',
      },
    ],
    displayOptions: {
      show: {
        source_create_object: ['input'],
        input: ['source_csv'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'URL of the file.',
    displayName: 'Url',
    name: 'url_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_csv_object: ['url_string_input'],
        input: ['source_csv'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    default: '',
    description:
      'Name of a column that contains a unique ID which will be used as `objectID` in Algolia.',
    displayName: 'Unique IDColumn',
    name: 'uniqueIDColumn_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_csv_object: ['uniqueIDColumn_string_input'],
        input: ['source_csv'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Mapping',
    name: 'mapping_object_input',
    description: 'Key-value pairs of column names and their expected types.\n',
    required: false,
    default: '{}',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_csv_object: ['mapping_object_input'],
        input: ['source_csv'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description: 'HTTP method to be used for retrieving your data.',
    options: [
      {
        name: 'GET',
        value: 'GET',
      },
      {
        name: 'POST',
        value: 'POST',
      },
    ],
    displayName: 'Method',
    name: 'method_options_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_csv_object: ['method_options_input'],
        input: ['source_csv'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    type: 'string',
    default: ',',
    description:
      'The character used to split the value on each line, default to a comma (\r, \n, 0xFFFD, and space are forbidden).',
    displayName: 'Delimiter',
    name: 'delimiter_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_csv_object: ['delimiter_string_input'],
        input: ['source_csv'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    displayName: 'Source Big Query',
    name: 'source_big_query_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Project ID',
        value: 'projectID_string_input',
      },
      {
        name: 'Dataset ID',
        value: 'datasetID_string_input',
      },
      {
        name: 'Data Type',
        value: 'dataType_options_input',
      },
      {
        name: 'Table',
        value: 'table_string_input',
      },
      {
        name: 'Table Prefix',
        value: 'tablePrefix_string_input',
      },
      {
        name: 'Custom SQLRequest',
        value: 'customSQLRequest_string_input',
      },
      {
        name: 'Unique IDColumn',
        value: 'uniqueIDColumn_string_input',
      },
    ],
    displayOptions: {
      show: {
        source_create_object: ['input'],
        input: ['source_big_query'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Project ID of the BigQuery source.',
    displayName: 'Project ID',
    name: 'projectID_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_big_query_object: ['projectID_string_input'],
        input: ['source_big_query'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    default: '',
    description: 'Dataset ID of the BigQuery source.',
    displayName: 'Dataset ID',
    name: 'datasetID_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_big_query_object: ['datasetID_string_input'],
        input: ['source_big_query'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
    required: true,
  },
  {
    type: 'options',
    default: '',
    options: [
      {
        name: 'ga4',
        value: 'ga4',
      },
      {
        name: 'ga360',
        value: 'ga360',
      },
    ],
    displayName: 'Data Type',
    name: 'dataType_options_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_big_query_object: ['dataType_options_input'],
        input: ['source_big_query'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Table name for the BigQuery export.',
    displayName: 'Table',
    name: 'table_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_big_query_object: ['table_string_input'],
        input: ['source_big_query'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Table prefix for a Google Analytics 4 data export to BigQuery.',
    displayName: 'Table Prefix',
    name: 'tablePrefix_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_big_query_object: ['tablePrefix_string_input'],
        input: ['source_big_query'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Custom SQL request to extract data from the BigQuery table.',
    displayName: 'Custom SQLRequest',
    name: 'customSQLRequest_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_big_query_object: ['customSQLRequest_string_input'],
        input: ['source_big_query'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description:
      'Name of a column that contains a unique ID which will be used as `objectID` in Algolia.',
    displayName: 'Unique IDColumn',
    name: 'uniqueIDColumn_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_big_query_object: ['uniqueIDColumn_string_input'],
        input: ['source_big_query'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    displayName: 'Source GA4Big Query Export',
    name: 'source_ga4big_query_export_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Project ID',
        value: 'projectID_string_input',
      },
      {
        name: 'Dataset ID',
        value: 'datasetID_string_input',
      },
      {
        name: 'Table Prefix',
        value: 'tablePrefix_string_input',
      },
    ],
    displayOptions: {
      show: {
        source_create_object: ['input'],
        input: ['source_ga4big_query_export'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'GCP project ID that the BigQuery export writes to.',
    displayName: 'Project ID',
    name: 'projectID_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_ga4big_query_export_object: ['projectID_string_input'],
        input: ['source_ga4big_query_export'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    default: '',
    description: 'BigQuery dataset ID that the BigQuery export writes to.',
    displayName: 'Dataset ID',
    name: 'datasetID_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_ga4big_query_export_object: ['datasetID_string_input'],
        input: ['source_ga4big_query_export'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    placeholder: 'events_intraday_',
    default: '',
    description: 'Prefix of the tables that the BigQuery Export writes to.',
    displayName: 'Table Prefix',
    name: 'tablePrefix_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_ga4big_query_export_object: ['tablePrefix_string_input'],
        input: ['source_ga4big_query_export'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
    required: true,
  },
  {
    displayName: 'Source Docker',
    name: 'source_docker_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Image',
        value: 'image_string_input',
      },
      {
        name: 'Configuration',
        value: 'configuration_object_input',
      },
    ],
    displayOptions: {
      show: {
        source_create_object: ['input'],
        input: ['source_docker'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'zendesk',
    default: '',
    description: 'Name of the connector.',
    displayName: 'Image',
    name: 'image_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_docker_object: ['image_string_input'],
        input: ['source_docker'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
    required: true,
  },
  {
    type: 'json',
    displayName: 'Configuration',
    name: 'configuration_object_input',
    description: 'Configuration of the spec.',
    required: true,
    default: '{}',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_docker_object: ['configuration_object_input'],
        input: ['source_docker'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    type: 'multiOptions',
    name: 'source_shopify',
    displayName: 'Source Shopify',
    description: undefined,
    default: [],
    options: [
      {
        name: 'Feature Flags',
        value: 'feature_flags_object_input',
      },
      {
        name: 'Shop URL',
        value: 'shopurl_string_input',
      },
    ],
    displayOptions: {
      show: {
        source_create_object: ['input'],
        input: ['source_shopify'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Feature Flags',
    name: 'feature_flags_object_input',
    description: 'Feature flags for the Shopify source.',
    required: false,
    default: '{}',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_shopify: ['feature_flags_object_input'],
        input: ['source_shopify'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'URL of the Shopify store.',
    displayName: 'Shop URL',
    name: 'shopURL_string_input',
    displayOptions: {
      show: {
        source_create_object: ['input'],
        source_shopify: ['shopurl_string_input'],
        input: ['source_shopify'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of an authentication resource.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'authenticationID',
      },
    },
    displayName: 'Authentication ID',
    name: 'authenticationID_string',
    displayOptions: {
      show: {
        source_create_object: ['authenticationID_string'],
        resource: ['sources'],
        operation: ['validateSource'],
      },
    },
  },
  {
    displayName: 'Source Search',
    name: 'source_search_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Source IDs',
        value: 'sourceIDs_json',
      },
    ],
    displayOptions: {
      show: {
        resource: ['sources'],
        operation: ['searchSources'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Source IDs',
    name: 'sourceIDs_json',
    default: '[]',
    description: undefined,
    required: true,
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'sourceIDs',
      },
    },
    displayOptions: {
      show: {
        source_search_object: ['sourceIDs_json'],
        resource: ['sources'],
        operation: ['searchSources'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally uniqud identifier (UUID) of a source.',
    displayName: 'Source ID',
    name: 'sourceID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['sources'],
        operation: ['getSource'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally uniqud identifier (UUID) of a source.',
    displayName: 'Source ID',
    name: 'sourceID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    displayName: 'Source Update',
    name: 'source_update_object',
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
        name: 'Input',
        value: 'input',
      },
      {
        name: 'Authentication ID',
        value: 'authenticationID_string',
      },
    ],
    displayOptions: {
      show: {
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Descriptive name of the source.',
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
        source_update_object: ['name_string'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    type: 'options',
    name: 'input',
    displayName: 'Input',
    default: '',
    options: [
      {
        name: 'Source update commercetools',
        value: 'source_update_commercetools',
      },
      {
        name: 'Source jSON',
        value: 'source_json',
      },
      {
        name: 'Source cSV',
        value: 'source_csv',
      },
      {
        name: 'Source big query',
        value: 'source_big_query',
      },
      {
        name: 'Source gA4Big query export',
        value: 'source_ga4big_query_export',
      },
      {
        name: 'Source update docker',
        value: 'source_update_docker',
      },
      {
        name: 'Source update shopify',
        value: 'source_update_shopify',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'input',
        value:
          '={{ typeof $parameter.source_update_commercetools_object !== "undefined" ? { "storeKeys": typeof $parameter.storeKeys_json_input !== "undefined" ? JSON.parse($parameter.storeKeys_json_input) : undefined, "locales": typeof $parameter.locales_json_input !== "undefined" ? JSON.parse($parameter.locales_json_input) : undefined, "url": typeof $parameter.url_string_input !== "undefined" ? $parameter.url_string_input : undefined, "fallbackIsInStockValue": typeof $parameter.fallbackIsInStockValue_boolean_input !== "undefined" ? $parameter.fallbackIsInStockValue_boolean_input : undefined, "productQueryPredicate": typeof $parameter.productQueryPredicate_string_input !== "undefined" ? $parameter.productQueryPredicate_string_input : undefined, "customFields": { "inventory": typeof $parameter.inventory_json_customFields_input !== "undefined" ? JSON.parse($parameter.inventory_json_customFields_input) : typeof $parameter.inventory_null_customFields_input !== "undefined" ? JSON.parse($parameter.inventory_null_customFields_input) : undefined, "price": typeof $parameter.price_json_customFields_input !== "undefined" ? JSON.parse($parameter.price_json_customFields_input) : typeof $parameter.price_null_customFields_input !== "undefined" ? JSON.parse($parameter.price_null_customFields_input) : undefined, "category": typeof $parameter.category_json_customFields_input !== "undefined" ? JSON.parse($parameter.category_json_customFields_input) : typeof $parameter.category_null_customFields_input !== "undefined" ? JSON.parse($parameter.category_null_customFields_input) : undefined } } : typeof $parameter.storeKeys_json_input !== "undefined" ? JSON.parse($parameter.storeKeys_json_input) : typeof $parameter.locales_json_input !== "undefined" ? JSON.parse($parameter.locales_json_input) : typeof $parameter.url_string_input !== "undefined" ? $parameter.url_string_input : typeof $parameter.fallbackIsInStockValue_boolean_input !== "undefined" ? $parameter.fallbackIsInStockValue_boolean_input : typeof $parameter.productQueryPredicate_string_input !== "undefined" ? $parameter.productQueryPredicate_string_input : typeof $parameter.commercetools_custom_fields_object_input !== "undefined" ? $parameter.commercetools_custom_fields_object_input : typeof $parameter.inventory_customFields_input !== "undefined" ? $parameter.inventory_customFields_input : typeof $parameter.inventory_json_customFields_input !== "undefined" ? JSON.parse($parameter.inventory_json_customFields_input) : typeof $parameter.inventory_null_customFields_input !== "undefined" ? JSON.parse($parameter.inventory_null_customFields_input) : typeof $parameter.price_customFields_input !== "undefined" ? $parameter.price_customFields_input : typeof $parameter.price_json_customFields_input !== "undefined" ? JSON.parse($parameter.price_json_customFields_input) : typeof $parameter.price_null_customFields_input !== "undefined" ? JSON.parse($parameter.price_null_customFields_input) : typeof $parameter.category_customFields_input !== "undefined" ? $parameter.category_customFields_input : typeof $parameter.category_json_customFields_input !== "undefined" ? JSON.parse($parameter.category_json_customFields_input) : typeof $parameter.category_null_customFields_input !== "undefined" ? JSON.parse($parameter.category_null_customFields_input) : typeof $parameter.source_json_object !== "undefined" ? { "url": typeof $parameter.url_string_input !== "undefined" ? $parameter.url_string_input : undefined, "uniqueIDColumn": typeof $parameter.uniqueIDColumn_string_input !== "undefined" ? $parameter.uniqueIDColumn_string_input : undefined, "method": typeof $parameter.method_options_input !== "undefined" ? $parameter.method_options_input : undefined } : typeof $parameter.url_string_input !== "undefined" ? $parameter.url_string_input : typeof $parameter.uniqueIDColumn_string_input !== "undefined" ? $parameter.uniqueIDColumn_string_input : typeof $parameter.method_options_input !== "undefined" ? $parameter.method_options_input : typeof $parameter.source_csv_object !== "undefined" ? { "url": typeof $parameter.url_string_input !== "undefined" ? $parameter.url_string_input : undefined, "uniqueIDColumn": typeof $parameter.uniqueIDColumn_string_input !== "undefined" ? $parameter.uniqueIDColumn_string_input : undefined, "mapping": typeof $parameter.mapping_object_input !== "undefined" ? JSON.parse($parameter.mapping_object_input) : undefined, "method": typeof $parameter.method_options_input !== "undefined" ? $parameter.method_options_input : undefined, "delimiter": typeof $parameter.delimiter_string_input !== "undefined" ? $parameter.delimiter_string_input : undefined } : typeof $parameter.url_string_input !== "undefined" ? $parameter.url_string_input : typeof $parameter.uniqueIDColumn_string_input !== "undefined" ? $parameter.uniqueIDColumn_string_input : typeof $parameter.mapping_object_input !== "undefined" ? JSON.parse($parameter.mapping_object_input) : typeof $parameter.method_options_input !== "undefined" ? $parameter.method_options_input : typeof $parameter.delimiter_string_input !== "undefined" ? $parameter.delimiter_string_input : typeof $parameter.source_big_query_object !== "undefined" ? { "projectID": typeof $parameter.projectID_string_input !== "undefined" ? $parameter.projectID_string_input : undefined, "datasetID": typeof $parameter.datasetID_string_input !== "undefined" ? $parameter.datasetID_string_input : undefined, "dataType": typeof $parameter.dataType_options_input !== "undefined" ? $parameter.dataType_options_input : undefined, "table": typeof $parameter.table_string_input !== "undefined" ? $parameter.table_string_input : undefined, "tablePrefix": typeof $parameter.tablePrefix_string_input !== "undefined" ? $parameter.tablePrefix_string_input : undefined, "customSQLRequest": typeof $parameter.customSQLRequest_string_input !== "undefined" ? $parameter.customSQLRequest_string_input : undefined, "uniqueIDColumn": typeof $parameter.uniqueIDColumn_string_input !== "undefined" ? $parameter.uniqueIDColumn_string_input : undefined } : typeof $parameter.projectID_string_input !== "undefined" ? $parameter.projectID_string_input : typeof $parameter.datasetID_string_input !== "undefined" ? $parameter.datasetID_string_input : typeof $parameter.dataType_options_input !== "undefined" ? $parameter.dataType_options_input : typeof $parameter.table_string_input !== "undefined" ? $parameter.table_string_input : typeof $parameter.tablePrefix_string_input !== "undefined" ? $parameter.tablePrefix_string_input : typeof $parameter.customSQLRequest_string_input !== "undefined" ? $parameter.customSQLRequest_string_input : typeof $parameter.uniqueIDColumn_string_input !== "undefined" ? $parameter.uniqueIDColumn_string_input : typeof $parameter.source_ga4big_query_export_object !== "undefined" ? { "projectID": typeof $parameter.projectID_string_input !== "undefined" ? $parameter.projectID_string_input : undefined, "datasetID": typeof $parameter.datasetID_string_input !== "undefined" ? $parameter.datasetID_string_input : undefined, "tablePrefix": typeof $parameter.tablePrefix_string_input !== "undefined" ? $parameter.tablePrefix_string_input : undefined } : typeof $parameter.projectID_string_input !== "undefined" ? $parameter.projectID_string_input : typeof $parameter.datasetID_string_input !== "undefined" ? $parameter.datasetID_string_input : typeof $parameter.tablePrefix_string_input !== "undefined" ? $parameter.tablePrefix_string_input : typeof $parameter.source_update_docker_object !== "undefined" ? { "configuration": typeof $parameter.configuration_object_input !== "undefined" ? JSON.parse($parameter.configuration_object_input) : undefined } : typeof $parameter.configuration_object_input !== "undefined" ? JSON.parse($parameter.configuration_object_input) : typeof $parameter.source_update_shopify_object !== "undefined" ? { "featureFlags": typeof $parameter.feature_flags_object_input !== "undefined" ? JSON.parse($parameter.feature_flags_object_input) : undefined } : typeof $parameter.feature_flags_object_input !== "undefined" ? JSON.parse($parameter.feature_flags_object_input) : undefined }}',
      },
    },
    displayOptions: {
      show: {
        source_update_object: ['input'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    displayName: 'Source Update Commercetools',
    name: 'source_update_commercetools_object',
    type: 'multiOptions',
    description: undefined,
    required: false,
    default: [],
    options: [
      {
        name: 'Store Keys',
        value: 'storeKeys_json_input',
      },
      {
        name: 'Locales',
        value: 'locales_json_input',
      },
      {
        name: 'Url',
        value: 'url_string_input',
      },
      {
        name: 'Fallback Is In Stock Value',
        value: 'fallbackIsInStockValue_boolean_input',
      },
      {
        name: 'Product Query Predicate',
        value: 'productQueryPredicate_string_input',
      },
      {
        name: 'Commercetools Custom Fields',
        value: 'commercetools_custom_fields_object_input',
      },
    ],
    displayOptions: {
      show: {
        source_update_object: ['input'],
        input: ['source_update_commercetools'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Store Keys',
    name: 'storeKeys_json_input',
    default: '[]',
    description: undefined,
    required: false,
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_update_commercetools_object: ['storeKeys_json_input'],
        input: ['source_update_commercetools'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Locales',
    name: 'locales_json_input',
    default: '[]',
    description: 'Locales for your commercetools stores.',
    required: false,
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_update_commercetools_object: ['locales_json_input'],
        input: ['source_update_commercetools'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    displayName: 'Url',
    name: 'url_string_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_update_commercetools_object: ['url_string_input'],
        input: ['source_update_commercetools'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      "Whether a fallback value is stored in the Algolia record if there's no inventory information about the product.\n",
    displayName: 'Fallback Is In Stock Value',
    name: 'fallbackIsInStockValue_boolean_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_update_commercetools_object: ['fallbackIsInStockValue_boolean_input'],
        input: ['source_update_commercetools'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description:
      'Predicate to filter out specific products when indexing. For more information, see [Query Predicate](https://docs.commercetools.com/api/predicates/query).\n',
    displayName: 'Product Query Predicate',
    name: 'productQueryPredicate_string_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_update_commercetools_object: ['productQueryPredicate_string_input'],
        input: ['source_update_commercetools'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    displayName: 'Commercetools Custom Fields',
    name: 'commercetools_custom_fields_object_input',
    type: 'multiOptions',
    description:
      'Custom fields from commercetools to add to the records.\n\nFor more information, see [Using Custom Types and Custom Fields](https://docs.commercetools.com/tutorials/custom-types).\n',
    required: false,
    default: [],
    options: [
      {
        name: 'Inventory',
        value: 'inventory_customFields',
      },
      {
        name: 'Price',
        value: 'price_customFields',
      },
      {
        name: 'Category',
        value: 'category_customFields',
      },
    ],
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_update_commercetools_object: ['commercetools_custom_fields_object_input'],
        input: ['source_update_commercetools'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    type: 'options',
    name: 'inventory_customFields_input',
    displayName: 'Inventory',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'Null',
        value: 'null',
      },
    ],
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_update_commercetools_object: ['commercetools_custom_fields_object_input'],
        commercetools_custom_fields_object_input: ['inventory_customFields'],
        input: ['source_update_commercetools'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Inventory (Array)',
    name: 'inventory_json_customFields_input',
    default: '[]',
    description: 'Inventory custom fields.',
    required: false,
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_update_commercetools_object: ['commercetools_custom_fields_object_input'],
        commercetools_custom_fields_object_input: ['inventory_customFields'],
        inventory_customFields_input: ['array'],
        input: ['source_update_commercetools'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Inventory (Null)',
    name: 'inventory_null_customFields_input',
    default: 'null',
    description: undefined,
    required: false,
    disabledOptions: {
      show: {
        inventory: ['null'],
      },
    },
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_update_commercetools_object: ['commercetools_custom_fields_object_input'],
        commercetools_custom_fields_object_input: ['inventory_customFields'],
        inventory_customFields_input: ['null'],
        input: ['source_update_commercetools'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    type: 'options',
    name: 'price_customFields_input',
    displayName: 'Price',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'Null',
        value: 'null',
      },
    ],
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_update_commercetools_object: ['commercetools_custom_fields_object_input'],
        commercetools_custom_fields_object_input: ['price_customFields'],
        input: ['source_update_commercetools'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Price (Array)',
    name: 'price_json_customFields_input',
    default: '[]',
    description: 'Price custom fields.',
    required: false,
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_update_commercetools_object: ['commercetools_custom_fields_object_input'],
        commercetools_custom_fields_object_input: ['price_customFields'],
        price_customFields_input: ['array'],
        input: ['source_update_commercetools'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Price (Null)',
    name: 'price_null_customFields_input',
    default: 'null',
    description: undefined,
    required: false,
    disabledOptions: {
      show: {
        price: ['null'],
      },
    },
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_update_commercetools_object: ['commercetools_custom_fields_object_input'],
        commercetools_custom_fields_object_input: ['price_customFields'],
        price_customFields_input: ['null'],
        input: ['source_update_commercetools'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    type: 'options',
    name: 'category_customFields_input',
    displayName: 'Category',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'Null',
        value: 'null',
      },
    ],
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_update_commercetools_object: ['commercetools_custom_fields_object_input'],
        commercetools_custom_fields_object_input: ['category_customFields'],
        input: ['source_update_commercetools'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Category (Array)',
    name: 'category_json_customFields_input',
    default: '[]',
    description: 'Category custom fields.',
    required: false,
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_update_commercetools_object: ['commercetools_custom_fields_object_input'],
        commercetools_custom_fields_object_input: ['category_customFields'],
        category_customFields_input: ['array'],
        input: ['source_update_commercetools'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Category (Null)',
    name: 'category_null_customFields_input',
    default: 'null',
    description: undefined,
    required: false,
    disabledOptions: {
      show: {
        category: ['null'],
      },
    },
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_update_commercetools_object: ['commercetools_custom_fields_object_input'],
        commercetools_custom_fields_object_input: ['category_customFields'],
        category_customFields_input: ['null'],
        input: ['source_update_commercetools'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    displayName: 'Source JSON',
    name: 'source_json_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Url',
        value: 'url_string_input',
      },
      {
        name: 'Unique IDColumn',
        value: 'uniqueIDColumn_string_input',
      },
      {
        name: 'Method',
        value: 'method_options_input',
      },
    ],
    displayOptions: {
      show: {
        source_update_object: ['input'],
        input: ['source_json'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'URL of the file.',
    displayName: 'Url',
    name: 'url_string_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_json_object: ['url_string_input'],
        input: ['source_json'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    default: '',
    description:
      'Name of a column that contains a unique ID which will be used as `objectID` in Algolia.',
    displayName: 'Unique IDColumn',
    name: 'uniqueIDColumn_string_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_json_object: ['uniqueIDColumn_string_input'],
        input: ['source_json'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description: 'HTTP method to be used for retrieving your data.',
    options: [
      {
        name: 'GET',
        value: 'GET',
      },
      {
        name: 'POST',
        value: 'POST',
      },
    ],
    displayName: 'Method',
    name: 'method_options_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_json_object: ['method_options_input'],
        input: ['source_json'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    displayName: 'Source CSV',
    name: 'source_csv_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Url',
        value: 'url_string_input',
      },
      {
        name: 'Unique IDColumn',
        value: 'uniqueIDColumn_string_input',
      },
      {
        name: 'Mapping',
        value: 'mapping_object_input',
      },
      {
        name: 'Method',
        value: 'method_options_input',
      },
      {
        name: 'Delimiter',
        value: 'delimiter_string_input',
      },
    ],
    displayOptions: {
      show: {
        source_update_object: ['input'],
        input: ['source_csv'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'URL of the file.',
    displayName: 'Url',
    name: 'url_string_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_csv_object: ['url_string_input'],
        input: ['source_csv'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    default: '',
    description:
      'Name of a column that contains a unique ID which will be used as `objectID` in Algolia.',
    displayName: 'Unique IDColumn',
    name: 'uniqueIDColumn_string_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_csv_object: ['uniqueIDColumn_string_input'],
        input: ['source_csv'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Mapping',
    name: 'mapping_object_input',
    description: 'Key-value pairs of column names and their expected types.\n',
    required: false,
    default: '{}',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_csv_object: ['mapping_object_input'],
        input: ['source_csv'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description: 'HTTP method to be used for retrieving your data.',
    options: [
      {
        name: 'GET',
        value: 'GET',
      },
      {
        name: 'POST',
        value: 'POST',
      },
    ],
    displayName: 'Method',
    name: 'method_options_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_csv_object: ['method_options_input'],
        input: ['source_csv'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    type: 'string',
    default: ',',
    description:
      'The character used to split the value on each line, default to a comma (\r, \n, 0xFFFD, and space are forbidden).',
    displayName: 'Delimiter',
    name: 'delimiter_string_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_csv_object: ['delimiter_string_input'],
        input: ['source_csv'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    displayName: 'Source Big Query',
    name: 'source_big_query_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Project ID',
        value: 'projectID_string_input',
      },
      {
        name: 'Dataset ID',
        value: 'datasetID_string_input',
      },
      {
        name: 'Data Type',
        value: 'dataType_options_input',
      },
      {
        name: 'Table',
        value: 'table_string_input',
      },
      {
        name: 'Table Prefix',
        value: 'tablePrefix_string_input',
      },
      {
        name: 'Custom SQLRequest',
        value: 'customSQLRequest_string_input',
      },
      {
        name: 'Unique IDColumn',
        value: 'uniqueIDColumn_string_input',
      },
    ],
    displayOptions: {
      show: {
        source_update_object: ['input'],
        input: ['source_big_query'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Project ID of the BigQuery source.',
    displayName: 'Project ID',
    name: 'projectID_string_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_big_query_object: ['projectID_string_input'],
        input: ['source_big_query'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    default: '',
    description: 'Dataset ID of the BigQuery source.',
    displayName: 'Dataset ID',
    name: 'datasetID_string_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_big_query_object: ['datasetID_string_input'],
        input: ['source_big_query'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
    required: true,
  },
  {
    type: 'options',
    default: '',
    options: [
      {
        name: 'ga4',
        value: 'ga4',
      },
      {
        name: 'ga360',
        value: 'ga360',
      },
    ],
    displayName: 'Data Type',
    name: 'dataType_options_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_big_query_object: ['dataType_options_input'],
        input: ['source_big_query'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Table name for the BigQuery export.',
    displayName: 'Table',
    name: 'table_string_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_big_query_object: ['table_string_input'],
        input: ['source_big_query'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Table prefix for a Google Analytics 4 data export to BigQuery.',
    displayName: 'Table Prefix',
    name: 'tablePrefix_string_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_big_query_object: ['tablePrefix_string_input'],
        input: ['source_big_query'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Custom SQL request to extract data from the BigQuery table.',
    displayName: 'Custom SQLRequest',
    name: 'customSQLRequest_string_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_big_query_object: ['customSQLRequest_string_input'],
        input: ['source_big_query'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description:
      'Name of a column that contains a unique ID which will be used as `objectID` in Algolia.',
    displayName: 'Unique IDColumn',
    name: 'uniqueIDColumn_string_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_big_query_object: ['uniqueIDColumn_string_input'],
        input: ['source_big_query'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    displayName: 'Source GA4Big Query Export',
    name: 'source_ga4big_query_export_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Project ID',
        value: 'projectID_string_input',
      },
      {
        name: 'Dataset ID',
        value: 'datasetID_string_input',
      },
      {
        name: 'Table Prefix',
        value: 'tablePrefix_string_input',
      },
    ],
    displayOptions: {
      show: {
        source_update_object: ['input'],
        input: ['source_ga4big_query_export'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'GCP project ID that the BigQuery export writes to.',
    displayName: 'Project ID',
    name: 'projectID_string_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_ga4big_query_export_object: ['projectID_string_input'],
        input: ['source_ga4big_query_export'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    default: '',
    description: 'BigQuery dataset ID that the BigQuery export writes to.',
    displayName: 'Dataset ID',
    name: 'datasetID_string_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_ga4big_query_export_object: ['datasetID_string_input'],
        input: ['source_ga4big_query_export'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    placeholder: 'events_intraday_',
    default: '',
    description: 'Prefix of the tables that the BigQuery Export writes to.',
    displayName: 'Table Prefix',
    name: 'tablePrefix_string_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_ga4big_query_export_object: ['tablePrefix_string_input'],
        input: ['source_ga4big_query_export'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
    required: true,
  },
  {
    displayName: 'Source Update Docker',
    name: 'source_update_docker_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Configuration',
        value: 'configuration_object_input',
      },
    ],
    displayOptions: {
      show: {
        source_update_object: ['input'],
        input: ['source_update_docker'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Configuration',
    name: 'configuration_object_input',
    description: 'Configuration of the spec.',
    required: true,
    default: '{}',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_update_docker_object: ['configuration_object_input'],
        input: ['source_update_docker'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    displayName: 'Source Update Shopify',
    name: 'source_update_shopify_object',
    type: 'multiOptions',
    description: undefined,
    required: false,
    default: [],
    options: [
      {
        name: 'Feature Flags',
        value: 'feature_flags_object_input',
      },
    ],
    displayOptions: {
      show: {
        source_update_object: ['input'],
        input: ['source_update_shopify'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Feature Flags',
    name: 'feature_flags_object_input',
    description: 'Feature flags for the Shopify source.',
    required: false,
    default: '{}',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_update_shopify_object: ['feature_flags_object_input'],
        input: ['source_update_shopify'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of an authentication resource.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'authenticationID',
      },
    },
    displayName: 'Authentication ID',
    name: 'authenticationID_string',
    displayOptions: {
      show: {
        source_update_object: ['authenticationID_string'],
        resource: ['sources'],
        operation: ['updateSource'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally uniqud identifier (UUID) of a source.',
    displayName: 'Source ID',
    name: 'sourceID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['sources'],
        operation: ['deleteSource'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally uniqud identifier (UUID) of a source.',
    displayName: 'Source ID',
    name: 'sourceID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    displayName: 'Source Update',
    name: 'source_update_object',
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
        name: 'Input',
        value: 'input',
      },
      {
        name: 'Authentication ID',
        value: 'authenticationID_string',
      },
    ],
    displayOptions: {
      show: {
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Descriptive name of the source.',
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
        source_update_object: ['name_string'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    type: 'options',
    name: 'input',
    displayName: 'Input',
    default: '',
    options: [
      {
        name: 'Source update commercetools',
        value: 'source_update_commercetools',
      },
      {
        name: 'Source jSON',
        value: 'source_json',
      },
      {
        name: 'Source cSV',
        value: 'source_csv',
      },
      {
        name: 'Source big query',
        value: 'source_big_query',
      },
      {
        name: 'Source gA4Big query export',
        value: 'source_ga4big_query_export',
      },
      {
        name: 'Source update docker',
        value: 'source_update_docker',
      },
      {
        name: 'Source update shopify',
        value: 'source_update_shopify',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'input',
        value:
          '={{ typeof $parameter.source_update_commercetools_object !== "undefined" ? { "storeKeys": typeof $parameter.storeKeys_json_input !== "undefined" ? JSON.parse($parameter.storeKeys_json_input) : undefined, "locales": typeof $parameter.locales_json_input !== "undefined" ? JSON.parse($parameter.locales_json_input) : undefined, "url": typeof $parameter.url_string_input !== "undefined" ? $parameter.url_string_input : undefined, "fallbackIsInStockValue": typeof $parameter.fallbackIsInStockValue_boolean_input !== "undefined" ? $parameter.fallbackIsInStockValue_boolean_input : undefined, "productQueryPredicate": typeof $parameter.productQueryPredicate_string_input !== "undefined" ? $parameter.productQueryPredicate_string_input : undefined, "customFields": { "inventory": typeof $parameter.inventory_json_customFields_input !== "undefined" ? JSON.parse($parameter.inventory_json_customFields_input) : typeof $parameter.inventory_null_customFields_input !== "undefined" ? JSON.parse($parameter.inventory_null_customFields_input) : undefined, "price": typeof $parameter.price_json_customFields_input !== "undefined" ? JSON.parse($parameter.price_json_customFields_input) : typeof $parameter.price_null_customFields_input !== "undefined" ? JSON.parse($parameter.price_null_customFields_input) : undefined, "category": typeof $parameter.category_json_customFields_input !== "undefined" ? JSON.parse($parameter.category_json_customFields_input) : typeof $parameter.category_null_customFields_input !== "undefined" ? JSON.parse($parameter.category_null_customFields_input) : undefined } } : typeof $parameter.storeKeys_json_input !== "undefined" ? JSON.parse($parameter.storeKeys_json_input) : typeof $parameter.locales_json_input !== "undefined" ? JSON.parse($parameter.locales_json_input) : typeof $parameter.url_string_input !== "undefined" ? $parameter.url_string_input : typeof $parameter.fallbackIsInStockValue_boolean_input !== "undefined" ? $parameter.fallbackIsInStockValue_boolean_input : typeof $parameter.productQueryPredicate_string_input !== "undefined" ? $parameter.productQueryPredicate_string_input : typeof $parameter.commercetools_custom_fields_object_input !== "undefined" ? $parameter.commercetools_custom_fields_object_input : typeof $parameter.inventory_customFields_input !== "undefined" ? $parameter.inventory_customFields_input : typeof $parameter.inventory_json_customFields_input !== "undefined" ? JSON.parse($parameter.inventory_json_customFields_input) : typeof $parameter.inventory_null_customFields_input !== "undefined" ? JSON.parse($parameter.inventory_null_customFields_input) : typeof $parameter.price_customFields_input !== "undefined" ? $parameter.price_customFields_input : typeof $parameter.price_json_customFields_input !== "undefined" ? JSON.parse($parameter.price_json_customFields_input) : typeof $parameter.price_null_customFields_input !== "undefined" ? JSON.parse($parameter.price_null_customFields_input) : typeof $parameter.category_customFields_input !== "undefined" ? $parameter.category_customFields_input : typeof $parameter.category_json_customFields_input !== "undefined" ? JSON.parse($parameter.category_json_customFields_input) : typeof $parameter.category_null_customFields_input !== "undefined" ? JSON.parse($parameter.category_null_customFields_input) : typeof $parameter.source_json_object !== "undefined" ? { "url": typeof $parameter.url_string_input !== "undefined" ? $parameter.url_string_input : undefined, "uniqueIDColumn": typeof $parameter.uniqueIDColumn_string_input !== "undefined" ? $parameter.uniqueIDColumn_string_input : undefined, "method": typeof $parameter.method_options_input !== "undefined" ? $parameter.method_options_input : undefined } : typeof $parameter.url_string_input !== "undefined" ? $parameter.url_string_input : typeof $parameter.uniqueIDColumn_string_input !== "undefined" ? $parameter.uniqueIDColumn_string_input : typeof $parameter.method_options_input !== "undefined" ? $parameter.method_options_input : typeof $parameter.source_csv_object !== "undefined" ? { "url": typeof $parameter.url_string_input !== "undefined" ? $parameter.url_string_input : undefined, "uniqueIDColumn": typeof $parameter.uniqueIDColumn_string_input !== "undefined" ? $parameter.uniqueIDColumn_string_input : undefined, "mapping": typeof $parameter.mapping_object_input !== "undefined" ? JSON.parse($parameter.mapping_object_input) : undefined, "method": typeof $parameter.method_options_input !== "undefined" ? $parameter.method_options_input : undefined, "delimiter": typeof $parameter.delimiter_string_input !== "undefined" ? $parameter.delimiter_string_input : undefined } : typeof $parameter.url_string_input !== "undefined" ? $parameter.url_string_input : typeof $parameter.uniqueIDColumn_string_input !== "undefined" ? $parameter.uniqueIDColumn_string_input : typeof $parameter.mapping_object_input !== "undefined" ? JSON.parse($parameter.mapping_object_input) : typeof $parameter.method_options_input !== "undefined" ? $parameter.method_options_input : typeof $parameter.delimiter_string_input !== "undefined" ? $parameter.delimiter_string_input : typeof $parameter.source_big_query_object !== "undefined" ? { "projectID": typeof $parameter.projectID_string_input !== "undefined" ? $parameter.projectID_string_input : undefined, "datasetID": typeof $parameter.datasetID_string_input !== "undefined" ? $parameter.datasetID_string_input : undefined, "dataType": typeof $parameter.dataType_options_input !== "undefined" ? $parameter.dataType_options_input : undefined, "table": typeof $parameter.table_string_input !== "undefined" ? $parameter.table_string_input : undefined, "tablePrefix": typeof $parameter.tablePrefix_string_input !== "undefined" ? $parameter.tablePrefix_string_input : undefined, "customSQLRequest": typeof $parameter.customSQLRequest_string_input !== "undefined" ? $parameter.customSQLRequest_string_input : undefined, "uniqueIDColumn": typeof $parameter.uniqueIDColumn_string_input !== "undefined" ? $parameter.uniqueIDColumn_string_input : undefined } : typeof $parameter.projectID_string_input !== "undefined" ? $parameter.projectID_string_input : typeof $parameter.datasetID_string_input !== "undefined" ? $parameter.datasetID_string_input : typeof $parameter.dataType_options_input !== "undefined" ? $parameter.dataType_options_input : typeof $parameter.table_string_input !== "undefined" ? $parameter.table_string_input : typeof $parameter.tablePrefix_string_input !== "undefined" ? $parameter.tablePrefix_string_input : typeof $parameter.customSQLRequest_string_input !== "undefined" ? $parameter.customSQLRequest_string_input : typeof $parameter.uniqueIDColumn_string_input !== "undefined" ? $parameter.uniqueIDColumn_string_input : typeof $parameter.source_ga4big_query_export_object !== "undefined" ? { "projectID": typeof $parameter.projectID_string_input !== "undefined" ? $parameter.projectID_string_input : undefined, "datasetID": typeof $parameter.datasetID_string_input !== "undefined" ? $parameter.datasetID_string_input : undefined, "tablePrefix": typeof $parameter.tablePrefix_string_input !== "undefined" ? $parameter.tablePrefix_string_input : undefined } : typeof $parameter.projectID_string_input !== "undefined" ? $parameter.projectID_string_input : typeof $parameter.datasetID_string_input !== "undefined" ? $parameter.datasetID_string_input : typeof $parameter.tablePrefix_string_input !== "undefined" ? $parameter.tablePrefix_string_input : typeof $parameter.source_update_docker_object !== "undefined" ? { "configuration": typeof $parameter.configuration_object_input !== "undefined" ? JSON.parse($parameter.configuration_object_input) : undefined } : typeof $parameter.configuration_object_input !== "undefined" ? JSON.parse($parameter.configuration_object_input) : typeof $parameter.source_update_shopify_object !== "undefined" ? { "featureFlags": typeof $parameter.feature_flags_object_input !== "undefined" ? JSON.parse($parameter.feature_flags_object_input) : undefined } : typeof $parameter.feature_flags_object_input !== "undefined" ? JSON.parse($parameter.feature_flags_object_input) : undefined }}',
      },
    },
    displayOptions: {
      show: {
        source_update_object: ['input'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    displayName: 'Source Update Commercetools',
    name: 'source_update_commercetools_object',
    type: 'multiOptions',
    description: undefined,
    required: false,
    default: [],
    options: [
      {
        name: 'Store Keys',
        value: 'storeKeys_json_input',
      },
      {
        name: 'Locales',
        value: 'locales_json_input',
      },
      {
        name: 'Url',
        value: 'url_string_input',
      },
      {
        name: 'Fallback Is In Stock Value',
        value: 'fallbackIsInStockValue_boolean_input',
      },
      {
        name: 'Product Query Predicate',
        value: 'productQueryPredicate_string_input',
      },
      {
        name: 'Commercetools Custom Fields',
        value: 'commercetools_custom_fields_object_input',
      },
    ],
    displayOptions: {
      show: {
        source_update_object: ['input'],
        input: ['source_update_commercetools'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Store Keys',
    name: 'storeKeys_json_input',
    default: '[]',
    description: undefined,
    required: false,
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_update_commercetools_object: ['storeKeys_json_input'],
        input: ['source_update_commercetools'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Locales',
    name: 'locales_json_input',
    default: '[]',
    description: 'Locales for your commercetools stores.',
    required: false,
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_update_commercetools_object: ['locales_json_input'],
        input: ['source_update_commercetools'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    displayName: 'Url',
    name: 'url_string_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_update_commercetools_object: ['url_string_input'],
        input: ['source_update_commercetools'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      "Whether a fallback value is stored in the Algolia record if there's no inventory information about the product.\n",
    displayName: 'Fallback Is In Stock Value',
    name: 'fallbackIsInStockValue_boolean_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_update_commercetools_object: ['fallbackIsInStockValue_boolean_input'],
        input: ['source_update_commercetools'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description:
      'Predicate to filter out specific products when indexing. For more information, see [Query Predicate](https://docs.commercetools.com/api/predicates/query).\n',
    displayName: 'Product Query Predicate',
    name: 'productQueryPredicate_string_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_update_commercetools_object: ['productQueryPredicate_string_input'],
        input: ['source_update_commercetools'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    displayName: 'Commercetools Custom Fields',
    name: 'commercetools_custom_fields_object_input',
    type: 'multiOptions',
    description:
      'Custom fields from commercetools to add to the records.\n\nFor more information, see [Using Custom Types and Custom Fields](https://docs.commercetools.com/tutorials/custom-types).\n',
    required: false,
    default: [],
    options: [
      {
        name: 'Inventory',
        value: 'inventory_customFields',
      },
      {
        name: 'Price',
        value: 'price_customFields',
      },
      {
        name: 'Category',
        value: 'category_customFields',
      },
    ],
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_update_commercetools_object: ['commercetools_custom_fields_object_input'],
        input: ['source_update_commercetools'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    type: 'options',
    name: 'inventory_customFields_input',
    displayName: 'Inventory',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'Null',
        value: 'null',
      },
    ],
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_update_commercetools_object: ['commercetools_custom_fields_object_input'],
        commercetools_custom_fields_object_input: ['inventory_customFields'],
        input: ['source_update_commercetools'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Inventory (Array)',
    name: 'inventory_json_customFields_input',
    default: '[]',
    description: 'Inventory custom fields.',
    required: false,
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_update_commercetools_object: ['commercetools_custom_fields_object_input'],
        commercetools_custom_fields_object_input: ['inventory_customFields'],
        inventory_customFields_input: ['array'],
        input: ['source_update_commercetools'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Inventory (Null)',
    name: 'inventory_null_customFields_input',
    default: 'null',
    description: undefined,
    required: false,
    disabledOptions: {
      show: {
        inventory: ['null'],
      },
    },
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_update_commercetools_object: ['commercetools_custom_fields_object_input'],
        commercetools_custom_fields_object_input: ['inventory_customFields'],
        inventory_customFields_input: ['null'],
        input: ['source_update_commercetools'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    type: 'options',
    name: 'price_customFields_input',
    displayName: 'Price',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'Null',
        value: 'null',
      },
    ],
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_update_commercetools_object: ['commercetools_custom_fields_object_input'],
        commercetools_custom_fields_object_input: ['price_customFields'],
        input: ['source_update_commercetools'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Price (Array)',
    name: 'price_json_customFields_input',
    default: '[]',
    description: 'Price custom fields.',
    required: false,
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_update_commercetools_object: ['commercetools_custom_fields_object_input'],
        commercetools_custom_fields_object_input: ['price_customFields'],
        price_customFields_input: ['array'],
        input: ['source_update_commercetools'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Price (Null)',
    name: 'price_null_customFields_input',
    default: 'null',
    description: undefined,
    required: false,
    disabledOptions: {
      show: {
        price: ['null'],
      },
    },
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_update_commercetools_object: ['commercetools_custom_fields_object_input'],
        commercetools_custom_fields_object_input: ['price_customFields'],
        price_customFields_input: ['null'],
        input: ['source_update_commercetools'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    type: 'options',
    name: 'category_customFields_input',
    displayName: 'Category',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'Null',
        value: 'null',
      },
    ],
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_update_commercetools_object: ['commercetools_custom_fields_object_input'],
        commercetools_custom_fields_object_input: ['category_customFields'],
        input: ['source_update_commercetools'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Category (Array)',
    name: 'category_json_customFields_input',
    default: '[]',
    description: 'Category custom fields.',
    required: false,
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_update_commercetools_object: ['commercetools_custom_fields_object_input'],
        commercetools_custom_fields_object_input: ['category_customFields'],
        category_customFields_input: ['array'],
        input: ['source_update_commercetools'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Category (Null)',
    name: 'category_null_customFields_input',
    default: 'null',
    description: undefined,
    required: false,
    disabledOptions: {
      show: {
        category: ['null'],
      },
    },
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_update_commercetools_object: ['commercetools_custom_fields_object_input'],
        commercetools_custom_fields_object_input: ['category_customFields'],
        category_customFields_input: ['null'],
        input: ['source_update_commercetools'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    displayName: 'Source JSON',
    name: 'source_json_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Url',
        value: 'url_string_input',
      },
      {
        name: 'Unique IDColumn',
        value: 'uniqueIDColumn_string_input',
      },
      {
        name: 'Method',
        value: 'method_options_input',
      },
    ],
    displayOptions: {
      show: {
        source_update_object: ['input'],
        input: ['source_json'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'URL of the file.',
    displayName: 'Url',
    name: 'url_string_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_json_object: ['url_string_input'],
        input: ['source_json'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    default: '',
    description:
      'Name of a column that contains a unique ID which will be used as `objectID` in Algolia.',
    displayName: 'Unique IDColumn',
    name: 'uniqueIDColumn_string_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_json_object: ['uniqueIDColumn_string_input'],
        input: ['source_json'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description: 'HTTP method to be used for retrieving your data.',
    options: [
      {
        name: 'GET',
        value: 'GET',
      },
      {
        name: 'POST',
        value: 'POST',
      },
    ],
    displayName: 'Method',
    name: 'method_options_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_json_object: ['method_options_input'],
        input: ['source_json'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    displayName: 'Source CSV',
    name: 'source_csv_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Url',
        value: 'url_string_input',
      },
      {
        name: 'Unique IDColumn',
        value: 'uniqueIDColumn_string_input',
      },
      {
        name: 'Mapping',
        value: 'mapping_object_input',
      },
      {
        name: 'Method',
        value: 'method_options_input',
      },
      {
        name: 'Delimiter',
        value: 'delimiter_string_input',
      },
    ],
    displayOptions: {
      show: {
        source_update_object: ['input'],
        input: ['source_csv'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'URL of the file.',
    displayName: 'Url',
    name: 'url_string_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_csv_object: ['url_string_input'],
        input: ['source_csv'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    default: '',
    description:
      'Name of a column that contains a unique ID which will be used as `objectID` in Algolia.',
    displayName: 'Unique IDColumn',
    name: 'uniqueIDColumn_string_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_csv_object: ['uniqueIDColumn_string_input'],
        input: ['source_csv'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Mapping',
    name: 'mapping_object_input',
    description: 'Key-value pairs of column names and their expected types.\n',
    required: false,
    default: '{}',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_csv_object: ['mapping_object_input'],
        input: ['source_csv'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description: 'HTTP method to be used for retrieving your data.',
    options: [
      {
        name: 'GET',
        value: 'GET',
      },
      {
        name: 'POST',
        value: 'POST',
      },
    ],
    displayName: 'Method',
    name: 'method_options_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_csv_object: ['method_options_input'],
        input: ['source_csv'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    type: 'string',
    default: ',',
    description:
      'The character used to split the value on each line, default to a comma (\r, \n, 0xFFFD, and space are forbidden).',
    displayName: 'Delimiter',
    name: 'delimiter_string_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_csv_object: ['delimiter_string_input'],
        input: ['source_csv'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    displayName: 'Source Big Query',
    name: 'source_big_query_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Project ID',
        value: 'projectID_string_input',
      },
      {
        name: 'Dataset ID',
        value: 'datasetID_string_input',
      },
      {
        name: 'Data Type',
        value: 'dataType_options_input',
      },
      {
        name: 'Table',
        value: 'table_string_input',
      },
      {
        name: 'Table Prefix',
        value: 'tablePrefix_string_input',
      },
      {
        name: 'Custom SQLRequest',
        value: 'customSQLRequest_string_input',
      },
      {
        name: 'Unique IDColumn',
        value: 'uniqueIDColumn_string_input',
      },
    ],
    displayOptions: {
      show: {
        source_update_object: ['input'],
        input: ['source_big_query'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Project ID of the BigQuery source.',
    displayName: 'Project ID',
    name: 'projectID_string_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_big_query_object: ['projectID_string_input'],
        input: ['source_big_query'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    default: '',
    description: 'Dataset ID of the BigQuery source.',
    displayName: 'Dataset ID',
    name: 'datasetID_string_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_big_query_object: ['datasetID_string_input'],
        input: ['source_big_query'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
    required: true,
  },
  {
    type: 'options',
    default: '',
    options: [
      {
        name: 'ga4',
        value: 'ga4',
      },
      {
        name: 'ga360',
        value: 'ga360',
      },
    ],
    displayName: 'Data Type',
    name: 'dataType_options_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_big_query_object: ['dataType_options_input'],
        input: ['source_big_query'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Table name for the BigQuery export.',
    displayName: 'Table',
    name: 'table_string_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_big_query_object: ['table_string_input'],
        input: ['source_big_query'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Table prefix for a Google Analytics 4 data export to BigQuery.',
    displayName: 'Table Prefix',
    name: 'tablePrefix_string_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_big_query_object: ['tablePrefix_string_input'],
        input: ['source_big_query'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Custom SQL request to extract data from the BigQuery table.',
    displayName: 'Custom SQLRequest',
    name: 'customSQLRequest_string_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_big_query_object: ['customSQLRequest_string_input'],
        input: ['source_big_query'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description:
      'Name of a column that contains a unique ID which will be used as `objectID` in Algolia.',
    displayName: 'Unique IDColumn',
    name: 'uniqueIDColumn_string_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_big_query_object: ['uniqueIDColumn_string_input'],
        input: ['source_big_query'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    displayName: 'Source GA4Big Query Export',
    name: 'source_ga4big_query_export_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Project ID',
        value: 'projectID_string_input',
      },
      {
        name: 'Dataset ID',
        value: 'datasetID_string_input',
      },
      {
        name: 'Table Prefix',
        value: 'tablePrefix_string_input',
      },
    ],
    displayOptions: {
      show: {
        source_update_object: ['input'],
        input: ['source_ga4big_query_export'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'GCP project ID that the BigQuery export writes to.',
    displayName: 'Project ID',
    name: 'projectID_string_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_ga4big_query_export_object: ['projectID_string_input'],
        input: ['source_ga4big_query_export'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    default: '',
    description: 'BigQuery dataset ID that the BigQuery export writes to.',
    displayName: 'Dataset ID',
    name: 'datasetID_string_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_ga4big_query_export_object: ['datasetID_string_input'],
        input: ['source_ga4big_query_export'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    placeholder: 'events_intraday_',
    default: '',
    description: 'Prefix of the tables that the BigQuery Export writes to.',
    displayName: 'Table Prefix',
    name: 'tablePrefix_string_input',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_ga4big_query_export_object: ['tablePrefix_string_input'],
        input: ['source_ga4big_query_export'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
    required: true,
  },
  {
    displayName: 'Source Update Docker',
    name: 'source_update_docker_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Configuration',
        value: 'configuration_object_input',
      },
    ],
    displayOptions: {
      show: {
        source_update_object: ['input'],
        input: ['source_update_docker'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Configuration',
    name: 'configuration_object_input',
    description: 'Configuration of the spec.',
    required: true,
    default: '{}',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_update_docker_object: ['configuration_object_input'],
        input: ['source_update_docker'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    displayName: 'Source Update Shopify',
    name: 'source_update_shopify_object',
    type: 'multiOptions',
    description: undefined,
    required: false,
    default: [],
    options: [
      {
        name: 'Feature Flags',
        value: 'feature_flags_object_input',
      },
    ],
    displayOptions: {
      show: {
        source_update_object: ['input'],
        input: ['source_update_shopify'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Feature Flags',
    name: 'feature_flags_object_input',
    description: 'Feature flags for the Shopify source.',
    required: false,
    default: '{}',
    displayOptions: {
      show: {
        source_update_object: ['input'],
        source_update_shopify_object: ['feature_flags_object_input'],
        input: ['source_update_shopify'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of an authentication resource.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'authenticationID',
      },
    },
    displayName: 'Authentication ID',
    name: 'authenticationID_string',
    displayOptions: {
      show: {
        source_update_object: ['authenticationID_string'],
        resource: ['sources'],
        operation: ['validateSourceBeforeUpdate'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally uniqud identifier (UUID) of a source.',
    displayName: 'Source ID',
    name: 'sourceID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['sources'],
        operation: ['triggerDockerSourceDiscover'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally uniqud identifier (UUID) of a source.',
    displayName: 'Source ID',
    name: 'sourceID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['sources'],
        operation: ['runSource'],
      },
    },
  },
  {
    displayName: 'Run Source Payload',
    name: 'run_source_payload_object',
    type: 'multiOptions',
    description: undefined,
    required: false,
    default: [],
    options: [
      {
        name: 'Index To Include',
        value: 'indexToInclude_json',
      },
      {
        name: 'Index To Exclude',
        value: 'indexToExclude_json',
      },
      {
        name: 'Entity IDs',
        value: 'entityIDs_json',
      },
      {
        name: 'Entity Type',
        value: 'entityType_options',
      },
      {
        name: 'Run Metadata',
        value: 'run_metadata_object',
      },
    ],
    displayOptions: {
      show: {
        resource: ['sources'],
        operation: ['runSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Index To Include',
    name: 'indexToInclude_json',
    default: '[]',
    description: 'List of index names to include in reindex/update.',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'indexToInclude',
      },
    },
    displayOptions: {
      show: {
        run_source_payload_object: ['indexToInclude_json'],
        resource: ['sources'],
        operation: ['runSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Index To Exclude',
    name: 'indexToExclude_json',
    default: '[]',
    description: 'List of index names to exclude in reindex/update.',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'indexToExclude',
      },
    },
    displayOptions: {
      show: {
        run_source_payload_object: ['indexToExclude_json'],
        resource: ['sources'],
        operation: ['runSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Entity IDs',
    name: 'entityIDs_json',
    default: '[]',
    description: 'List of entityIDs to update.',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'entityIDs',
      },
    },
    displayOptions: {
      show: {
        run_source_payload_object: ['entityIDs_json'],
        resource: ['sources'],
        operation: ['runSource'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description: 'Type of entity to update.',
    options: [
      {
        name: 'product',
        value: 'product',
      },
      {
        name: 'collection',
        value: 'collection',
      },
    ],
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'entityType',
      },
    },
    displayName: 'Entity Type',
    name: 'entityType_options',
    displayOptions: {
      show: {
        run_source_payload_object: ['entityType_options'],
        resource: ['sources'],
        operation: ['runSource'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Run Metadata',
    name: 'run_metadata_object',
    description: 'Additional information that will be passed to the created runs.',
    required: false,
    default: '{}',
    routing: {
      send: {
        type: 'body',
        property: 'runMetadata',
        value: '={{ $value }}',
      },
    },
    displayOptions: {
      show: {
        run_source_payload_object: ['run_metadata_object'],
        resource: ['sources'],
        operation: ['runSource'],
      },
    },
  },
  {
    type: 'number',
    default: 10,
    description: 'Number of items per page.',
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
        resource: ['tasks'],
        operation: ['listTasks'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description: 'Page of the API response to retrieve.',
    typeOptions: {
      minValue: 1,
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
        resource: ['tasks'],
        operation: ['listTasks'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Action',
    name: 'action_json',
    default: '[]',
    description: 'Actions to perform on the Algolia index.',
    required: false,
    routing: {
      request: {
        qs: {
          action: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['listTasks'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    routing: {
      request: {
        qs: {
          enabled: '={{ $value }}',
        },
      },
    },
    displayName: 'Enabled',
    name: 'enabled_boolean',
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['listTasks'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Source ID',
    name: 'sourceID_json',
    default: '[]',
    description: undefined,
    required: false,
    routing: {
      request: {
        qs: {
          sourceID: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['listTasks'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Source Type',
    name: 'sourceType_json',
    default: '[]',
    description: undefined,
    required: false,
    routing: {
      request: {
        qs: {
          sourceType: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['listTasks'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Destination ID',
    name: 'destinationID_json',
    default: '[]',
    description: undefined,
    required: false,
    routing: {
      request: {
        qs: {
          destinationID: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['listTasks'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Trigger Type',
    name: 'triggerType_json',
    default: '[]',
    description: undefined,
    required: false,
    routing: {
      request: {
        qs: {
          triggerType: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['listTasks'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    routing: {
      request: {
        qs: {
          withEmailNotifications: '={{ $value }}',
        },
      },
    },
    displayName: 'With Email Notifications',
    name: 'withEmailNotifications_boolean',
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['listTasks'],
      },
    },
  },
  {
    type: 'options',
    default: 'createdAt',
    description: 'Property by which to sort the list of tasks.',
    options: [
      {
        name: 'enabled',
        value: 'enabled',
      },
      {
        name: 'triggerType',
        value: 'triggerType',
      },
      {
        name: 'action',
        value: 'action',
      },
      {
        name: 'updatedAt',
        value: 'updatedAt',
      },
      {
        name: 'createdAt',
        value: 'createdAt',
      },
    ],
    routing: {
      request: {
        qs: {
          sort: '={{ $value }}',
        },
      },
    },
    displayName: 'Sort',
    name: 'sort_options',
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['listTasks'],
      },
    },
  },
  {
    type: 'options',
    default: 'desc',
    description: 'Ascending or descending sort order.',
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
          order: '={{ $value }}',
        },
      },
    },
    displayName: 'Order',
    name: 'order_options',
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['listTasks'],
      },
    },
  },
  {
    displayName: 'Task Create',
    name: 'task_create_object',
    type: 'multiOptions',
    description: 'API request body for creating a task.',
    required: true,
    default: [],
    options: [
      {
        name: 'Source ID',
        value: 'sourceID_string',
      },
      {
        name: 'Destination ID',
        value: 'destinationID_string',
      },
      {
        name: 'Action',
        value: 'action_options',
      },
      {
        name: 'Subscription Action',
        value: 'subscriptionAction_options',
      },
      {
        name: 'Cron',
        value: 'cron_string',
      },
      {
        name: 'Enabled',
        value: 'enabled_boolean',
      },
      {
        name: 'Failure Threshold',
        value: 'failureThreshold_number',
      },
      {
        name: 'Input',
        value: 'input',
      },
      {
        name: 'Cursor',
        value: 'cursor_string',
      },
      {
        name: 'Notifications',
        value: 'notifications_object',
      },
      {
        name: 'Policies',
        value: 'policies_object',
      },
    ],
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['createTask'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally uniqud identifier (UUID) of a source.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'sourceID',
      },
    },
    displayName: 'Source ID',
    name: 'sourceID_string',
    displayOptions: {
      show: {
        task_create_object: ['sourceID_string'],
        resource: ['tasks'],
        operation: ['createTask'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of a destination resource.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'destinationID',
      },
    },
    displayName: 'Destination ID',
    name: 'destinationID_string',
    displayOptions: {
      show: {
        task_create_object: ['destinationID_string'],
        resource: ['tasks'],
        operation: ['createTask'],
      },
    },
    required: true,
  },
  {
    type: 'options',
    default: '',
    description: 'Action to perform on the Algolia index.',
    options: [
      {
        name: 'replace',
        value: 'replace',
      },
      {
        name: 'save',
        value: 'save',
      },
      {
        name: 'partial',
        value: 'partial',
      },
      {
        name: 'partialNoCreate',
        value: 'partialNoCreate',
      },
      {
        name: 'append',
        value: 'append',
      },
    ],
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'action',
      },
    },
    displayName: 'Action',
    name: 'action_options',
    displayOptions: {
      show: {
        task_create_object: ['action_options'],
        resource: ['tasks'],
        operation: ['createTask'],
      },
    },
    required: true,
  },
  {
    type: 'options',
    default: '',
    description: 'Action to perform on the Algolia index.',
    options: [
      {
        name: 'replace',
        value: 'replace',
      },
      {
        name: 'save',
        value: 'save',
      },
      {
        name: 'partial',
        value: 'partial',
      },
      {
        name: 'partialNoCreate',
        value: 'partialNoCreate',
      },
      {
        name: 'append',
        value: 'append',
      },
    ],
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'subscriptionAction',
      },
    },
    displayName: 'Subscription Action',
    name: 'subscriptionAction_options',
    displayOptions: {
      show: {
        task_create_object: ['subscriptionAction_options'],
        resource: ['tasks'],
        operation: ['createTask'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '* * 1 * *',
    default: '',
    description: "Cron expression for the task's schedule.",
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'cron',
      },
    },
    displayName: 'Cron',
    name: 'cron_string',
    displayOptions: {
      show: {
        task_create_object: ['cron_string'],
        resource: ['tasks'],
        operation: ['createTask'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description: 'Whether the task is enabled.',
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
        task_create_object: ['enabled_boolean'],
        resource: ['tasks'],
        operation: ['createTask'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description: 'Maximum accepted percentage of failures for a task run to finish successfully.',
    typeOptions: {
      minValue: 0,
      maxValue: 100,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'failureThreshold',
      },
    },
    displayName: 'Failure Threshold',
    name: 'failureThreshold_number',
    displayOptions: {
      show: {
        task_create_object: ['failureThreshold_number'],
        resource: ['tasks'],
        operation: ['createTask'],
      },
    },
  },
  {
    type: 'options',
    name: 'input',
    displayName: 'Input',
    default: '',
    options: [
      {
        name: 'Streaming input',
        value: 'streaming_input',
      },
      {
        name: 'Docker streams input',
        value: 'docker_streams_input',
      },
      {
        name: 'Shopify input',
        value: 'shopify_input',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'input',
        value:
          '={{ typeof $parameter.streaming_input_object !== "undefined" ? { "mapping": { "format": typeof $parameter.format_options_mapping_input !== "undefined" ? $parameter.format_options_mapping_input : undefined, "actions": typeof $parameter.actions_json_mapping_input !== "undefined" ? JSON.parse($parameter.actions_json_mapping_input) : undefined } } : typeof $parameter.mapping_input_object_input !== "undefined" ? $parameter.mapping_input_object_input : typeof $parameter.format_options_mapping_input !== "undefined" ? $parameter.format_options_mapping_input : typeof $parameter.actions_json_mapping_input !== "undefined" ? JSON.parse($parameter.actions_json_mapping_input) : typeof $parameter.docker_streams_input_object !== "undefined" ? { "streams": typeof $parameter.streams_json_input !== "undefined" ? JSON.parse($parameter.streams_json_input) : undefined } : typeof $parameter.streams_json_input !== "undefined" ? JSON.parse($parameter.streams_json_input) : typeof $parameter.shopify_input_object !== "undefined" ? { "metafields": typeof $parameter.metafields_json_input !== "undefined" ? JSON.parse($parameter.metafields_json_input) : undefined, "market": { "countries": typeof $parameter.countries_json_market_input !== "undefined" ? JSON.parse($parameter.countries_json_market_input) : undefined, "currencies": typeof $parameter.currencies_json_market_input !== "undefined" ? JSON.parse($parameter.currencies_json_market_input) : undefined, "locales": typeof $parameter.locales_json_market_input !== "undefined" ? JSON.parse($parameter.locales_json_market_input) : undefined } } : typeof $parameter.metafields_json_input !== "undefined" ? JSON.parse($parameter.metafields_json_input) : typeof $parameter.shopify_market_object_input !== "undefined" ? $parameter.shopify_market_object_input : typeof $parameter.countries_json_market_input !== "undefined" ? JSON.parse($parameter.countries_json_market_input) : typeof $parameter.currencies_json_market_input !== "undefined" ? JSON.parse($parameter.currencies_json_market_input) : typeof $parameter.locales_json_market_input !== "undefined" ? JSON.parse($parameter.locales_json_market_input) : undefined }}',
      },
    },
    displayOptions: {
      show: {
        task_create_object: ['input'],
        resource: ['tasks'],
        operation: ['createTask'],
      },
    },
  },
  {
    displayName: 'Streaming Input',
    name: 'streaming_input_object',
    type: 'multiOptions',
    description:
      'Input for a `streaming` task whose source is of type `ga4BigqueryExport` and for which extracted data is continuously streamed.',
    required: true,
    default: [],
    options: [
      {
        name: 'Mapping Input',
        value: 'mapping_input_object_input',
      },
    ],
    displayOptions: {
      show: {
        task_create_object: ['input'],
        input: ['streaming_input'],
        resource: ['tasks'],
        operation: ['createTask'],
      },
    },
  },
  {
    displayName: 'Mapping Input',
    name: 'mapping_input_object_input',
    type: 'multiOptions',
    description: 'Transformations to apply to the source, serialized as a JSON string.',
    required: true,
    default: [],
    options: [
      {
        name: 'Format',
        value: 'format_options_mapping',
      },
      {
        name: 'Actions',
        value: 'actions_json_mapping',
      },
    ],
    displayOptions: {
      show: {
        task_create_object: ['input'],
        streaming_input_object: ['mapping_input_object_input'],
        input: ['streaming_input'],
        resource: ['tasks'],
        operation: ['createTask'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description: 'Mapping format schema.',
    options: [
      {
        name: 'mappingkit/v1',
        value: 'mappingkit/v1',
      },
    ],
    displayName: 'Format',
    name: 'format_options_mapping_input',
    displayOptions: {
      show: {
        task_create_object: ['input'],
        streaming_input_object: ['mapping_input_object_input'],
        mapping_input_object_input: ['format_options_mapping'],
        input: ['streaming_input'],
        resource: ['tasks'],
        operation: ['createTask'],
      },
    },
    required: true,
  },
  {
    type: 'json',
    displayName: 'Actions',
    name: 'actions_json_mapping_input',
    default: '[]',
    description: undefined,
    required: true,
    displayOptions: {
      show: {
        task_create_object: ['input'],
        streaming_input_object: ['mapping_input_object_input'],
        mapping_input_object_input: ['actions_json_mapping'],
        input: ['streaming_input'],
        resource: ['tasks'],
        operation: ['createTask'],
      },
    },
  },
  {
    displayName: 'Docker Streams Input',
    name: 'docker_streams_input_object',
    type: 'multiOptions',
    description: 'The selected streams of an airbyte connector.',
    required: true,
    default: [],
    options: [
      {
        name: 'Streams',
        value: 'streams_json_input',
      },
    ],
    displayOptions: {
      show: {
        task_create_object: ['input'],
        input: ['docker_streams_input'],
        resource: ['tasks'],
        operation: ['createTask'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Streams',
    name: 'streams_json_input',
    default: '[]',
    description: undefined,
    required: true,
    displayOptions: {
      show: {
        task_create_object: ['input'],
        docker_streams_input_object: ['streams_json_input'],
        input: ['docker_streams_input'],
        resource: ['tasks'],
        operation: ['createTask'],
      },
    },
  },
  {
    displayName: 'Shopify Input',
    name: 'shopify_input_object',
    type: 'multiOptions',
    description:
      'Represents the required elements of the task input when using a `shopify` source.',
    required: true,
    default: [],
    options: [
      {
        name: 'Metafields',
        value: 'metafields_json_input',
      },
      {
        name: 'Shopify Market',
        value: 'shopify_market_object_input',
      },
    ],
    displayOptions: {
      show: {
        task_create_object: ['input'],
        input: ['shopify_input'],
        resource: ['tasks'],
        operation: ['createTask'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Metafields',
    name: 'metafields_json_input',
    default: '[]',
    description: undefined,
    required: true,
    displayOptions: {
      show: {
        task_create_object: ['input'],
        shopify_input_object: ['metafields_json_input'],
        input: ['shopify_input'],
        resource: ['tasks'],
        operation: ['createTask'],
      },
    },
  },
  {
    displayName: 'Shopify Market',
    name: 'shopify_market_object_input',
    type: 'multiOptions',
    description: 'Represents a market in Shopify.',
    required: true,
    default: [],
    options: [
      {
        name: 'Countries',
        value: 'countries_json_market',
      },
      {
        name: 'Currencies',
        value: 'currencies_json_market',
      },
      {
        name: 'Locales',
        value: 'locales_json_market',
      },
    ],
    displayOptions: {
      show: {
        task_create_object: ['input'],
        shopify_input_object: ['shopify_market_object_input'],
        input: ['shopify_input'],
        resource: ['tasks'],
        operation: ['createTask'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Countries',
    name: 'countries_json_market_input',
    default: '[]',
    description: undefined,
    required: true,
    displayOptions: {
      show: {
        task_create_object: ['input'],
        shopify_input_object: ['shopify_market_object_input'],
        shopify_market_object_input: ['countries_json_market'],
        input: ['shopify_input'],
        resource: ['tasks'],
        operation: ['createTask'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Currencies',
    name: 'currencies_json_market_input',
    default: '[]',
    description: undefined,
    required: true,
    displayOptions: {
      show: {
        task_create_object: ['input'],
        shopify_input_object: ['shopify_market_object_input'],
        shopify_market_object_input: ['currencies_json_market'],
        input: ['shopify_input'],
        resource: ['tasks'],
        operation: ['createTask'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Locales',
    name: 'locales_json_market_input',
    default: '[]',
    description: undefined,
    required: true,
    displayOptions: {
      show: {
        task_create_object: ['input'],
        shopify_input_object: ['shopify_market_object_input'],
        shopify_market_object_input: ['locales_json_market'],
        input: ['shopify_input'],
        resource: ['tasks'],
        operation: ['createTask'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Date of the last cursor in RFC 3339 format.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'cursor',
      },
    },
    displayName: 'Cursor',
    name: 'cursor_string',
    displayOptions: {
      show: {
        task_create_object: ['cursor_string'],
        resource: ['tasks'],
        operation: ['createTask'],
      },
    },
  },
  {
    displayName: 'Notifications',
    name: 'notifications_object',
    type: 'multiOptions',
    description: 'Notifications settings for a task.',
    required: true,
    default: [],
    options: [
      {
        name: 'Email Notifications',
        value: 'email_notifications_object_notifications',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'notifications',
        value:
          '={{ { "email": { "enabled": typeof $parameter.enabled_boolean_email_notifications !== "undefined" ? $parameter.enabled_boolean_email_notifications : undefined } } }}',
      },
    },
    displayOptions: {
      show: {
        task_create_object: ['notifications_object'],
        resource: ['tasks'],
        operation: ['createTask'],
      },
    },
  },
  {
    displayName: 'Email Notifications',
    name: 'email_notifications_object_notifications',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Enabled',
        value: 'enabled_boolean_email',
      },
    ],
    displayOptions: {
      show: {
        task_create_object: ['notifications_object'],
        notifications_object: ['email_notifications_object_notifications'],
        resource: ['tasks'],
        operation: ['createTask'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      "Whether to send email notifications, note that this doesn't prevent the task from being blocked.",
    displayName: 'Enabled',
    name: 'enabled_boolean_email_notifications',
    displayOptions: {
      show: {
        task_create_object: ['notifications_object'],
        notifications_object: ['email_notifications_object_notifications'],
        email_notifications_object_notifications: ['enabled_boolean_email'],
        resource: ['tasks'],
        operation: ['createTask'],
      },
    },
  },
  {
    displayName: 'Policies',
    name: 'policies_object',
    type: 'multiOptions',
    description: 'Set of rules for a task.',
    required: false,
    default: [],
    options: [
      {
        name: 'Critical Threshold',
        value: 'criticalThreshold_number_policies',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'policies',
        value:
          '={{ { "criticalThreshold": typeof $parameter.criticalThreshold_number_policies !== "undefined" ? $parameter.criticalThreshold_number_policies : undefined } }}',
      },
    },
    displayOptions: {
      show: {
        task_create_object: ['policies_object'],
        resource: ['tasks'],
        operation: ['createTask'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description:
      'The number of critical failures in a row before blocking the task and sending a notification.',
    typeOptions: {
      minValue: 1,
      maxValue: 10,
    },
    displayName: 'Critical Threshold',
    name: 'criticalThreshold_number_policies',
    displayOptions: {
      show: {
        task_create_object: ['policies_object'],
        policies_object: ['criticalThreshold_number_policies'],
        resource: ['tasks'],
        operation: ['createTask'],
      },
    },
  },
  {
    displayName: 'Task Search',
    name: 'task_search_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Task IDs',
        value: 'taskIDs_json',
      },
    ],
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['searchTasks'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Task IDs',
    name: 'taskIDs_json',
    default: '[]',
    description: undefined,
    required: true,
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'taskIDs',
      },
    },
    displayOptions: {
      show: {
        task_search_object: ['taskIDs_json'],
        resource: ['tasks'],
        operation: ['searchTasks'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of a task.',
    displayName: 'Task ID',
    name: 'taskID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['getTask'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of a task.',
    displayName: 'Task ID',
    name: 'taskID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['replaceTask'],
      },
    },
  },
  {
    displayName: 'Task Replace',
    name: 'task_replace_object',
    type: 'multiOptions',
    description: 'API request body for updating a task.',
    required: true,
    default: [],
    options: [
      {
        name: 'Destination ID',
        value: 'destinationID_string',
      },
      {
        name: 'Action',
        value: 'action_options',
      },
      {
        name: 'Subscription Action',
        value: 'subscriptionAction_options',
      },
      {
        name: 'Cron',
        value: 'cron_string',
      },
      {
        name: 'Enabled',
        value: 'enabled_boolean',
      },
      {
        name: 'Failure Threshold',
        value: 'failureThreshold_number',
      },
      {
        name: 'Input',
        value: 'input',
      },
      {
        name: 'Cursor',
        value: 'cursor_string',
      },
      {
        name: 'Notifications',
        value: 'notifications_object',
      },
      {
        name: 'Policies',
        value: 'policies_object',
      },
    ],
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['replaceTask'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of a destination resource.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'destinationID',
      },
    },
    displayName: 'Destination ID',
    name: 'destinationID_string',
    displayOptions: {
      show: {
        task_replace_object: ['destinationID_string'],
        resource: ['tasks'],
        operation: ['replaceTask'],
      },
    },
    required: true,
  },
  {
    type: 'options',
    default: '',
    description: 'Action to perform on the Algolia index.',
    options: [
      {
        name: 'replace',
        value: 'replace',
      },
      {
        name: 'save',
        value: 'save',
      },
      {
        name: 'partial',
        value: 'partial',
      },
      {
        name: 'partialNoCreate',
        value: 'partialNoCreate',
      },
      {
        name: 'append',
        value: 'append',
      },
    ],
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'action',
      },
    },
    displayName: 'Action',
    name: 'action_options',
    displayOptions: {
      show: {
        task_replace_object: ['action_options'],
        resource: ['tasks'],
        operation: ['replaceTask'],
      },
    },
    required: true,
  },
  {
    type: 'options',
    default: '',
    description: 'Action to perform on the Algolia index.',
    options: [
      {
        name: 'replace',
        value: 'replace',
      },
      {
        name: 'save',
        value: 'save',
      },
      {
        name: 'partial',
        value: 'partial',
      },
      {
        name: 'partialNoCreate',
        value: 'partialNoCreate',
      },
      {
        name: 'append',
        value: 'append',
      },
    ],
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'subscriptionAction',
      },
    },
    displayName: 'Subscription Action',
    name: 'subscriptionAction_options',
    displayOptions: {
      show: {
        task_replace_object: ['subscriptionAction_options'],
        resource: ['tasks'],
        operation: ['replaceTask'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '* * 1 * *',
    default: '',
    description: "Cron expression for the task's schedule.",
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'cron',
      },
    },
    displayName: 'Cron',
    name: 'cron_string',
    displayOptions: {
      show: {
        task_replace_object: ['cron_string'],
        resource: ['tasks'],
        operation: ['replaceTask'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description: 'Whether the task is enabled.',
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
        task_replace_object: ['enabled_boolean'],
        resource: ['tasks'],
        operation: ['replaceTask'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description: 'Maximum accepted percentage of failures for a task run to finish successfully.',
    typeOptions: {
      minValue: 0,
      maxValue: 100,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'failureThreshold',
      },
    },
    displayName: 'Failure Threshold',
    name: 'failureThreshold_number',
    displayOptions: {
      show: {
        task_replace_object: ['failureThreshold_number'],
        resource: ['tasks'],
        operation: ['replaceTask'],
      },
    },
  },
  {
    type: 'options',
    name: 'input',
    displayName: 'Input',
    default: '',
    options: [
      {
        name: 'Streaming input',
        value: 'streaming_input',
      },
      {
        name: 'Docker streams input',
        value: 'docker_streams_input',
      },
      {
        name: 'Shopify input',
        value: 'shopify_input',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'input',
        value:
          '={{ typeof $parameter.streaming_input_object !== "undefined" ? { "mapping": { "format": typeof $parameter.format_options_mapping_input !== "undefined" ? $parameter.format_options_mapping_input : undefined, "actions": typeof $parameter.actions_json_mapping_input !== "undefined" ? JSON.parse($parameter.actions_json_mapping_input) : undefined } } : typeof $parameter.mapping_input_object_input !== "undefined" ? $parameter.mapping_input_object_input : typeof $parameter.format_options_mapping_input !== "undefined" ? $parameter.format_options_mapping_input : typeof $parameter.actions_json_mapping_input !== "undefined" ? JSON.parse($parameter.actions_json_mapping_input) : typeof $parameter.docker_streams_input_object !== "undefined" ? { "streams": typeof $parameter.streams_json_input !== "undefined" ? JSON.parse($parameter.streams_json_input) : undefined } : typeof $parameter.streams_json_input !== "undefined" ? JSON.parse($parameter.streams_json_input) : typeof $parameter.shopify_input_object !== "undefined" ? { "metafields": typeof $parameter.metafields_json_input !== "undefined" ? JSON.parse($parameter.metafields_json_input) : undefined, "market": { "countries": typeof $parameter.countries_json_market_input !== "undefined" ? JSON.parse($parameter.countries_json_market_input) : undefined, "currencies": typeof $parameter.currencies_json_market_input !== "undefined" ? JSON.parse($parameter.currencies_json_market_input) : undefined, "locales": typeof $parameter.locales_json_market_input !== "undefined" ? JSON.parse($parameter.locales_json_market_input) : undefined } } : typeof $parameter.metafields_json_input !== "undefined" ? JSON.parse($parameter.metafields_json_input) : typeof $parameter.shopify_market_object_input !== "undefined" ? $parameter.shopify_market_object_input : typeof $parameter.countries_json_market_input !== "undefined" ? JSON.parse($parameter.countries_json_market_input) : typeof $parameter.currencies_json_market_input !== "undefined" ? JSON.parse($parameter.currencies_json_market_input) : typeof $parameter.locales_json_market_input !== "undefined" ? JSON.parse($parameter.locales_json_market_input) : undefined }}',
      },
    },
    displayOptions: {
      show: {
        task_replace_object: ['input'],
        resource: ['tasks'],
        operation: ['replaceTask'],
      },
    },
  },
  {
    displayName: 'Streaming Input',
    name: 'streaming_input_object',
    type: 'multiOptions',
    description:
      'Input for a `streaming` task whose source is of type `ga4BigqueryExport` and for which extracted data is continuously streamed.',
    required: true,
    default: [],
    options: [
      {
        name: 'Mapping Input',
        value: 'mapping_input_object_input',
      },
    ],
    displayOptions: {
      show: {
        task_replace_object: ['input'],
        input: ['streaming_input'],
        resource: ['tasks'],
        operation: ['replaceTask'],
      },
    },
  },
  {
    displayName: 'Mapping Input',
    name: 'mapping_input_object_input',
    type: 'multiOptions',
    description: 'Transformations to apply to the source, serialized as a JSON string.',
    required: true,
    default: [],
    options: [
      {
        name: 'Format',
        value: 'format_options_mapping',
      },
      {
        name: 'Actions',
        value: 'actions_json_mapping',
      },
    ],
    displayOptions: {
      show: {
        task_replace_object: ['input'],
        streaming_input_object: ['mapping_input_object_input'],
        input: ['streaming_input'],
        resource: ['tasks'],
        operation: ['replaceTask'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description: 'Mapping format schema.',
    options: [
      {
        name: 'mappingkit/v1',
        value: 'mappingkit/v1',
      },
    ],
    displayName: 'Format',
    name: 'format_options_mapping_input',
    displayOptions: {
      show: {
        task_replace_object: ['input'],
        streaming_input_object: ['mapping_input_object_input'],
        mapping_input_object_input: ['format_options_mapping'],
        input: ['streaming_input'],
        resource: ['tasks'],
        operation: ['replaceTask'],
      },
    },
    required: true,
  },
  {
    type: 'json',
    displayName: 'Actions',
    name: 'actions_json_mapping_input',
    default: '[]',
    description: undefined,
    required: true,
    displayOptions: {
      show: {
        task_replace_object: ['input'],
        streaming_input_object: ['mapping_input_object_input'],
        mapping_input_object_input: ['actions_json_mapping'],
        input: ['streaming_input'],
        resource: ['tasks'],
        operation: ['replaceTask'],
      },
    },
  },
  {
    displayName: 'Docker Streams Input',
    name: 'docker_streams_input_object',
    type: 'multiOptions',
    description: 'The selected streams of an airbyte connector.',
    required: true,
    default: [],
    options: [
      {
        name: 'Streams',
        value: 'streams_json_input',
      },
    ],
    displayOptions: {
      show: {
        task_replace_object: ['input'],
        input: ['docker_streams_input'],
        resource: ['tasks'],
        operation: ['replaceTask'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Streams',
    name: 'streams_json_input',
    default: '[]',
    description: undefined,
    required: true,
    displayOptions: {
      show: {
        task_replace_object: ['input'],
        docker_streams_input_object: ['streams_json_input'],
        input: ['docker_streams_input'],
        resource: ['tasks'],
        operation: ['replaceTask'],
      },
    },
  },
  {
    displayName: 'Shopify Input',
    name: 'shopify_input_object',
    type: 'multiOptions',
    description:
      'Represents the required elements of the task input when using a `shopify` source.',
    required: true,
    default: [],
    options: [
      {
        name: 'Metafields',
        value: 'metafields_json_input',
      },
      {
        name: 'Shopify Market',
        value: 'shopify_market_object_input',
      },
    ],
    displayOptions: {
      show: {
        task_replace_object: ['input'],
        input: ['shopify_input'],
        resource: ['tasks'],
        operation: ['replaceTask'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Metafields',
    name: 'metafields_json_input',
    default: '[]',
    description: undefined,
    required: true,
    displayOptions: {
      show: {
        task_replace_object: ['input'],
        shopify_input_object: ['metafields_json_input'],
        input: ['shopify_input'],
        resource: ['tasks'],
        operation: ['replaceTask'],
      },
    },
  },
  {
    displayName: 'Shopify Market',
    name: 'shopify_market_object_input',
    type: 'multiOptions',
    description: 'Represents a market in Shopify.',
    required: true,
    default: [],
    options: [
      {
        name: 'Countries',
        value: 'countries_json_market',
      },
      {
        name: 'Currencies',
        value: 'currencies_json_market',
      },
      {
        name: 'Locales',
        value: 'locales_json_market',
      },
    ],
    displayOptions: {
      show: {
        task_replace_object: ['input'],
        shopify_input_object: ['shopify_market_object_input'],
        input: ['shopify_input'],
        resource: ['tasks'],
        operation: ['replaceTask'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Countries',
    name: 'countries_json_market_input',
    default: '[]',
    description: undefined,
    required: true,
    displayOptions: {
      show: {
        task_replace_object: ['input'],
        shopify_input_object: ['shopify_market_object_input'],
        shopify_market_object_input: ['countries_json_market'],
        input: ['shopify_input'],
        resource: ['tasks'],
        operation: ['replaceTask'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Currencies',
    name: 'currencies_json_market_input',
    default: '[]',
    description: undefined,
    required: true,
    displayOptions: {
      show: {
        task_replace_object: ['input'],
        shopify_input_object: ['shopify_market_object_input'],
        shopify_market_object_input: ['currencies_json_market'],
        input: ['shopify_input'],
        resource: ['tasks'],
        operation: ['replaceTask'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Locales',
    name: 'locales_json_market_input',
    default: '[]',
    description: undefined,
    required: true,
    displayOptions: {
      show: {
        task_replace_object: ['input'],
        shopify_input_object: ['shopify_market_object_input'],
        shopify_market_object_input: ['locales_json_market'],
        input: ['shopify_input'],
        resource: ['tasks'],
        operation: ['replaceTask'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Date of the last cursor in RFC 3339 format.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'cursor',
      },
    },
    displayName: 'Cursor',
    name: 'cursor_string',
    displayOptions: {
      show: {
        task_replace_object: ['cursor_string'],
        resource: ['tasks'],
        operation: ['replaceTask'],
      },
    },
  },
  {
    displayName: 'Notifications',
    name: 'notifications_object',
    type: 'multiOptions',
    description: 'Notifications settings for a task.',
    required: true,
    default: [],
    options: [
      {
        name: 'Email Notifications',
        value: 'email_notifications_object_notifications',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'notifications',
        value:
          '={{ { "email": { "enabled": typeof $parameter.enabled_boolean_email_notifications !== "undefined" ? $parameter.enabled_boolean_email_notifications : undefined } } }}',
      },
    },
    displayOptions: {
      show: {
        task_replace_object: ['notifications_object'],
        resource: ['tasks'],
        operation: ['replaceTask'],
      },
    },
  },
  {
    displayName: 'Email Notifications',
    name: 'email_notifications_object_notifications',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Enabled',
        value: 'enabled_boolean_email',
      },
    ],
    displayOptions: {
      show: {
        task_replace_object: ['notifications_object'],
        notifications_object: ['email_notifications_object_notifications'],
        resource: ['tasks'],
        operation: ['replaceTask'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      "Whether to send email notifications, note that this doesn't prevent the task from being blocked.",
    displayName: 'Enabled',
    name: 'enabled_boolean_email_notifications',
    displayOptions: {
      show: {
        task_replace_object: ['notifications_object'],
        notifications_object: ['email_notifications_object_notifications'],
        email_notifications_object_notifications: ['enabled_boolean_email'],
        resource: ['tasks'],
        operation: ['replaceTask'],
      },
    },
  },
  {
    displayName: 'Policies',
    name: 'policies_object',
    type: 'multiOptions',
    description: 'Set of rules for a task.',
    required: false,
    default: [],
    options: [
      {
        name: 'Critical Threshold',
        value: 'criticalThreshold_number_policies',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'policies',
        value:
          '={{ { "criticalThreshold": typeof $parameter.criticalThreshold_number_policies !== "undefined" ? $parameter.criticalThreshold_number_policies : undefined } }}',
      },
    },
    displayOptions: {
      show: {
        task_replace_object: ['policies_object'],
        resource: ['tasks'],
        operation: ['replaceTask'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description:
      'The number of critical failures in a row before blocking the task and sending a notification.',
    typeOptions: {
      minValue: 1,
      maxValue: 10,
    },
    displayName: 'Critical Threshold',
    name: 'criticalThreshold_number_policies',
    displayOptions: {
      show: {
        task_replace_object: ['policies_object'],
        policies_object: ['criticalThreshold_number_policies'],
        resource: ['tasks'],
        operation: ['replaceTask'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of a task.',
    displayName: 'Task ID',
    name: 'taskID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['updateTask'],
      },
    },
  },
  {
    displayName: 'Task Update',
    name: 'task_update_object',
    type: 'multiOptions',
    description: 'API request body for partially updating a task.',
    required: false,
    default: [],
    options: [
      {
        name: 'Destination ID',
        value: 'destinationID_string',
      },
      {
        name: 'Cron',
        value: 'cron_string',
      },
      {
        name: 'Input',
        value: 'input',
      },
      {
        name: 'Enabled',
        value: 'enabled_boolean',
      },
      {
        name: 'Subscription Action',
        value: 'subscriptionAction_options',
      },
      {
        name: 'Failure Threshold',
        value: 'failureThreshold_number',
      },
      {
        name: 'Notifications',
        value: 'notifications_object',
      },
      {
        name: 'Policies',
        value: 'policies_object',
      },
    ],
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['updateTask'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of a destination resource.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'destinationID',
      },
    },
    displayName: 'Destination ID',
    name: 'destinationID_string',
    displayOptions: {
      show: {
        task_update_object: ['destinationID_string'],
        resource: ['tasks'],
        operation: ['updateTask'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '* * 1 * *',
    default: '',
    description: "Cron expression for the task's schedule.",
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'cron',
      },
    },
    displayName: 'Cron',
    name: 'cron_string',
    displayOptions: {
      show: {
        task_update_object: ['cron_string'],
        resource: ['tasks'],
        operation: ['updateTask'],
      },
    },
  },
  {
    type: 'options',
    name: 'input',
    displayName: 'Input',
    default: '',
    options: [
      {
        name: 'Streaming input',
        value: 'streaming_input',
      },
      {
        name: 'Docker streams input',
        value: 'docker_streams_input',
      },
      {
        name: 'Shopify input',
        value: 'shopify_input',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'input',
        value:
          '={{ typeof $parameter.streaming_input_object !== "undefined" ? { "mapping": { "format": typeof $parameter.format_options_mapping_input !== "undefined" ? $parameter.format_options_mapping_input : undefined, "actions": typeof $parameter.actions_json_mapping_input !== "undefined" ? JSON.parse($parameter.actions_json_mapping_input) : undefined } } : typeof $parameter.mapping_input_object_input !== "undefined" ? $parameter.mapping_input_object_input : typeof $parameter.format_options_mapping_input !== "undefined" ? $parameter.format_options_mapping_input : typeof $parameter.actions_json_mapping_input !== "undefined" ? JSON.parse($parameter.actions_json_mapping_input) : typeof $parameter.docker_streams_input_object !== "undefined" ? { "streams": typeof $parameter.streams_json_input !== "undefined" ? JSON.parse($parameter.streams_json_input) : undefined } : typeof $parameter.streams_json_input !== "undefined" ? JSON.parse($parameter.streams_json_input) : typeof $parameter.shopify_input_object !== "undefined" ? { "metafields": typeof $parameter.metafields_json_input !== "undefined" ? JSON.parse($parameter.metafields_json_input) : undefined, "market": { "countries": typeof $parameter.countries_json_market_input !== "undefined" ? JSON.parse($parameter.countries_json_market_input) : undefined, "currencies": typeof $parameter.currencies_json_market_input !== "undefined" ? JSON.parse($parameter.currencies_json_market_input) : undefined, "locales": typeof $parameter.locales_json_market_input !== "undefined" ? JSON.parse($parameter.locales_json_market_input) : undefined } } : typeof $parameter.metafields_json_input !== "undefined" ? JSON.parse($parameter.metafields_json_input) : typeof $parameter.shopify_market_object_input !== "undefined" ? $parameter.shopify_market_object_input : typeof $parameter.countries_json_market_input !== "undefined" ? JSON.parse($parameter.countries_json_market_input) : typeof $parameter.currencies_json_market_input !== "undefined" ? JSON.parse($parameter.currencies_json_market_input) : typeof $parameter.locales_json_market_input !== "undefined" ? JSON.parse($parameter.locales_json_market_input) : undefined }}',
      },
    },
    displayOptions: {
      show: {
        task_update_object: ['input'],
        resource: ['tasks'],
        operation: ['updateTask'],
      },
    },
  },
  {
    displayName: 'Streaming Input',
    name: 'streaming_input_object',
    type: 'multiOptions',
    description:
      'Input for a `streaming` task whose source is of type `ga4BigqueryExport` and for which extracted data is continuously streamed.',
    required: true,
    default: [],
    options: [
      {
        name: 'Mapping Input',
        value: 'mapping_input_object_input',
      },
    ],
    displayOptions: {
      show: {
        task_update_object: ['input'],
        input: ['streaming_input'],
        resource: ['tasks'],
        operation: ['updateTask'],
      },
    },
  },
  {
    displayName: 'Mapping Input',
    name: 'mapping_input_object_input',
    type: 'multiOptions',
    description: 'Transformations to apply to the source, serialized as a JSON string.',
    required: true,
    default: [],
    options: [
      {
        name: 'Format',
        value: 'format_options_mapping',
      },
      {
        name: 'Actions',
        value: 'actions_json_mapping',
      },
    ],
    displayOptions: {
      show: {
        task_update_object: ['input'],
        streaming_input_object: ['mapping_input_object_input'],
        input: ['streaming_input'],
        resource: ['tasks'],
        operation: ['updateTask'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description: 'Mapping format schema.',
    options: [
      {
        name: 'mappingkit/v1',
        value: 'mappingkit/v1',
      },
    ],
    displayName: 'Format',
    name: 'format_options_mapping_input',
    displayOptions: {
      show: {
        task_update_object: ['input'],
        streaming_input_object: ['mapping_input_object_input'],
        mapping_input_object_input: ['format_options_mapping'],
        input: ['streaming_input'],
        resource: ['tasks'],
        operation: ['updateTask'],
      },
    },
    required: true,
  },
  {
    type: 'json',
    displayName: 'Actions',
    name: 'actions_json_mapping_input',
    default: '[]',
    description: undefined,
    required: true,
    displayOptions: {
      show: {
        task_update_object: ['input'],
        streaming_input_object: ['mapping_input_object_input'],
        mapping_input_object_input: ['actions_json_mapping'],
        input: ['streaming_input'],
        resource: ['tasks'],
        operation: ['updateTask'],
      },
    },
  },
  {
    displayName: 'Docker Streams Input',
    name: 'docker_streams_input_object',
    type: 'multiOptions',
    description: 'The selected streams of an airbyte connector.',
    required: true,
    default: [],
    options: [
      {
        name: 'Streams',
        value: 'streams_json_input',
      },
    ],
    displayOptions: {
      show: {
        task_update_object: ['input'],
        input: ['docker_streams_input'],
        resource: ['tasks'],
        operation: ['updateTask'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Streams',
    name: 'streams_json_input',
    default: '[]',
    description: undefined,
    required: true,
    displayOptions: {
      show: {
        task_update_object: ['input'],
        docker_streams_input_object: ['streams_json_input'],
        input: ['docker_streams_input'],
        resource: ['tasks'],
        operation: ['updateTask'],
      },
    },
  },
  {
    displayName: 'Shopify Input',
    name: 'shopify_input_object',
    type: 'multiOptions',
    description:
      'Represents the required elements of the task input when using a `shopify` source.',
    required: true,
    default: [],
    options: [
      {
        name: 'Metafields',
        value: 'metafields_json_input',
      },
      {
        name: 'Shopify Market',
        value: 'shopify_market_object_input',
      },
    ],
    displayOptions: {
      show: {
        task_update_object: ['input'],
        input: ['shopify_input'],
        resource: ['tasks'],
        operation: ['updateTask'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Metafields',
    name: 'metafields_json_input',
    default: '[]',
    description: undefined,
    required: true,
    displayOptions: {
      show: {
        task_update_object: ['input'],
        shopify_input_object: ['metafields_json_input'],
        input: ['shopify_input'],
        resource: ['tasks'],
        operation: ['updateTask'],
      },
    },
  },
  {
    displayName: 'Shopify Market',
    name: 'shopify_market_object_input',
    type: 'multiOptions',
    description: 'Represents a market in Shopify.',
    required: true,
    default: [],
    options: [
      {
        name: 'Countries',
        value: 'countries_json_market',
      },
      {
        name: 'Currencies',
        value: 'currencies_json_market',
      },
      {
        name: 'Locales',
        value: 'locales_json_market',
      },
    ],
    displayOptions: {
      show: {
        task_update_object: ['input'],
        shopify_input_object: ['shopify_market_object_input'],
        input: ['shopify_input'],
        resource: ['tasks'],
        operation: ['updateTask'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Countries',
    name: 'countries_json_market_input',
    default: '[]',
    description: undefined,
    required: true,
    displayOptions: {
      show: {
        task_update_object: ['input'],
        shopify_input_object: ['shopify_market_object_input'],
        shopify_market_object_input: ['countries_json_market'],
        input: ['shopify_input'],
        resource: ['tasks'],
        operation: ['updateTask'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Currencies',
    name: 'currencies_json_market_input',
    default: '[]',
    description: undefined,
    required: true,
    displayOptions: {
      show: {
        task_update_object: ['input'],
        shopify_input_object: ['shopify_market_object_input'],
        shopify_market_object_input: ['currencies_json_market'],
        input: ['shopify_input'],
        resource: ['tasks'],
        operation: ['updateTask'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Locales',
    name: 'locales_json_market_input',
    default: '[]',
    description: undefined,
    required: true,
    displayOptions: {
      show: {
        task_update_object: ['input'],
        shopify_input_object: ['shopify_market_object_input'],
        shopify_market_object_input: ['locales_json_market'],
        input: ['shopify_input'],
        resource: ['tasks'],
        operation: ['updateTask'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description: 'Whether the task is enabled.',
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
        task_update_object: ['enabled_boolean'],
        resource: ['tasks'],
        operation: ['updateTask'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description: 'Action to perform on the Algolia index.',
    options: [
      {
        name: 'replace',
        value: 'replace',
      },
      {
        name: 'save',
        value: 'save',
      },
      {
        name: 'partial',
        value: 'partial',
      },
      {
        name: 'partialNoCreate',
        value: 'partialNoCreate',
      },
      {
        name: 'append',
        value: 'append',
      },
    ],
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'subscriptionAction',
      },
    },
    displayName: 'Subscription Action',
    name: 'subscriptionAction_options',
    displayOptions: {
      show: {
        task_update_object: ['subscriptionAction_options'],
        resource: ['tasks'],
        operation: ['updateTask'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description: 'Maximum accepted percentage of failures for a task run to finish successfully.',
    typeOptions: {
      minValue: 0,
      maxValue: 100,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'failureThreshold',
      },
    },
    displayName: 'Failure Threshold',
    name: 'failureThreshold_number',
    displayOptions: {
      show: {
        task_update_object: ['failureThreshold_number'],
        resource: ['tasks'],
        operation: ['updateTask'],
      },
    },
  },
  {
    displayName: 'Notifications',
    name: 'notifications_object',
    type: 'multiOptions',
    description: 'Notifications settings for a task.',
    required: true,
    default: [],
    options: [
      {
        name: 'Email Notifications',
        value: 'email_notifications_object_notifications',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'notifications',
        value:
          '={{ { "email": { "enabled": typeof $parameter.enabled_boolean_email_notifications !== "undefined" ? $parameter.enabled_boolean_email_notifications : undefined } } }}',
      },
    },
    displayOptions: {
      show: {
        task_update_object: ['notifications_object'],
        resource: ['tasks'],
        operation: ['updateTask'],
      },
    },
  },
  {
    displayName: 'Email Notifications',
    name: 'email_notifications_object_notifications',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Enabled',
        value: 'enabled_boolean_email',
      },
    ],
    displayOptions: {
      show: {
        task_update_object: ['notifications_object'],
        notifications_object: ['email_notifications_object_notifications'],
        resource: ['tasks'],
        operation: ['updateTask'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      "Whether to send email notifications, note that this doesn't prevent the task from being blocked.",
    displayName: 'Enabled',
    name: 'enabled_boolean_email_notifications',
    displayOptions: {
      show: {
        task_update_object: ['notifications_object'],
        notifications_object: ['email_notifications_object_notifications'],
        email_notifications_object_notifications: ['enabled_boolean_email'],
        resource: ['tasks'],
        operation: ['updateTask'],
      },
    },
  },
  {
    displayName: 'Policies',
    name: 'policies_object',
    type: 'multiOptions',
    description: 'Set of rules for a task.',
    required: false,
    default: [],
    options: [
      {
        name: 'Critical Threshold',
        value: 'criticalThreshold_number_policies',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'policies',
        value:
          '={{ { "criticalThreshold": typeof $parameter.criticalThreshold_number_policies !== "undefined" ? $parameter.criticalThreshold_number_policies : undefined } }}',
      },
    },
    displayOptions: {
      show: {
        task_update_object: ['policies_object'],
        resource: ['tasks'],
        operation: ['updateTask'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description:
      'The number of critical failures in a row before blocking the task and sending a notification.',
    typeOptions: {
      minValue: 1,
      maxValue: 10,
    },
    displayName: 'Critical Threshold',
    name: 'criticalThreshold_number_policies',
    displayOptions: {
      show: {
        task_update_object: ['policies_object'],
        policies_object: ['criticalThreshold_number_policies'],
        resource: ['tasks'],
        operation: ['updateTask'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of a task.',
    displayName: 'Task ID',
    name: 'taskID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['deleteTask'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of a task.',
    displayName: 'Task ID',
    name: 'taskID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['runTask'],
      },
    },
  },
  {
    displayName: 'Run Task Payload',
    name: 'run_task_payload_object',
    type: 'multiOptions',
    description: undefined,
    required: false,
    default: [],
    options: [
      {
        name: 'Run Metadata',
        value: 'run_metadata_object',
      },
    ],
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['runTask'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Run Metadata',
    name: 'run_metadata_object',
    description: 'Additional information that will be passed to the created run.',
    required: false,
    default: '{}',
    routing: {
      send: {
        type: 'body',
        property: 'runMetadata',
        value: '={{ $value }}',
      },
    },
    displayOptions: {
      show: {
        run_task_payload_object: ['run_metadata_object'],
        resource: ['tasks'],
        operation: ['runTask'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of a task.',
    displayName: 'Task ID',
    name: 'taskID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['pushTask'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    routing: {
      request: {
        qs: {
          watch: '={{ $value }}',
        },
      },
    },
    displayName: 'Watch',
    name: 'watch_boolean',
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['pushTask'],
      },
    },
  },
  {
    displayName: 'Push Task Payload',
    name: 'push_task_payload_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Action',
        value: 'action_options',
      },
      {
        name: 'Records',
        value: 'records_json',
      },
    ],
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['pushTask'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description:
      'Which indexing operation to perform:\n\n- `addObject`: adds records to an index.\n   Equivalent to the "Add a new record (with auto-generated object ID)" operation.\n- `updateObject`: adds or replaces records in an index.\n   Equivalent to the "Add or replace a record" operation.\n- `partialUpdateObject`: adds or updates attributes within records.\n   Equivalent to the "Add or update attributes" operation with the `createIfNoExists` parameter set to true.\n   (If a record with the specified `objectID` doesn\'t exist in the specified index, this action creates adds the record to the index)\n- `partialUpdateObjectNoCreate`: same as `partialUpdateObject`, but with `createIfNoExists` set to false.\n   (A record isn\'t added to the index if its `objectID` doesn\'t exist)\n- `deleteObject`: delete records from an index.\n  Equivalent to the "Delete a record" operation.\n- `delete`. Delete an index. Equivalent to the "Delete an index" operation.\n- `clear`: delete all records from an index. Equivalent to the "Delete all records from an index operation".\n',
    options: [
      {
        name: 'addObject',
        value: 'addObject',
      },
      {
        name: 'updateObject',
        value: 'updateObject',
      },
      {
        name: 'partialUpdateObject',
        value: 'partialUpdateObject',
      },
      {
        name: 'partialUpdateObjectNoCreate',
        value: 'partialUpdateObjectNoCreate',
      },
      {
        name: 'deleteObject',
        value: 'deleteObject',
      },
      {
        name: 'delete',
        value: 'delete',
      },
      {
        name: 'clear',
        value: 'clear',
      },
    ],
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'action',
      },
    },
    displayName: 'Action',
    name: 'action_options',
    displayOptions: {
      show: {
        push_task_payload_object: ['action_options'],
        resource: ['tasks'],
        operation: ['pushTask'],
      },
    },
    required: true,
  },
  {
    type: 'json',
    displayName: 'Records',
    name: 'records_json',
    default: '[]',
    description: undefined,
    required: true,
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'records',
      },
    },
    displayOptions: {
      show: {
        push_task_payload_object: ['records_json'],
        resource: ['tasks'],
        operation: ['pushTask'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of a task.',
    displayName: 'Task ID',
    name: 'taskID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['enableTask'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of a task.',
    displayName: 'Task ID',
    name: 'taskID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['disableTask'],
      },
    },
  },
  {
    type: 'number',
    default: 10,
    description: 'Number of items per page.',
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
        resource: ['tasks'],
        operation: ['listTasksV1'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description: 'Page of the API response to retrieve.',
    typeOptions: {
      minValue: 1,
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
        resource: ['tasks'],
        operation: ['listTasksV1'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Action',
    name: 'action_json',
    default: '[]',
    description: 'Actions to perform on the Algolia index.',
    required: false,
    routing: {
      request: {
        qs: {
          action: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['listTasksV1'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    routing: {
      request: {
        qs: {
          enabled: '={{ $value }}',
        },
      },
    },
    displayName: 'Enabled',
    name: 'enabled_boolean',
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['listTasksV1'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Source ID',
    name: 'sourceID_json',
    default: '[]',
    description: undefined,
    required: false,
    routing: {
      request: {
        qs: {
          sourceID: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['listTasksV1'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Destination ID',
    name: 'destinationID_json',
    default: '[]',
    description: undefined,
    required: false,
    routing: {
      request: {
        qs: {
          destinationID: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['listTasksV1'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Trigger Type',
    name: 'triggerType_json',
    default: '[]',
    description: undefined,
    required: false,
    routing: {
      request: {
        qs: {
          triggerType: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['listTasksV1'],
      },
    },
  },
  {
    type: 'options',
    default: 'createdAt',
    description: 'Property by which to sort the list of tasks.',
    options: [
      {
        name: 'enabled',
        value: 'enabled',
      },
      {
        name: 'triggerType',
        value: 'triggerType',
      },
      {
        name: 'action',
        value: 'action',
      },
      {
        name: 'updatedAt',
        value: 'updatedAt',
      },
      {
        name: 'createdAt',
        value: 'createdAt',
      },
    ],
    routing: {
      request: {
        qs: {
          sort: '={{ $value }}',
        },
      },
    },
    displayName: 'Sort',
    name: 'sort_options',
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['listTasksV1'],
      },
    },
  },
  {
    type: 'options',
    default: 'desc',
    description: 'Ascending or descending sort order.',
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
          order: '={{ $value }}',
        },
      },
    },
    displayName: 'Order',
    name: 'order_options',
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['listTasksV1'],
      },
    },
  },
  {
    displayName: 'Task Create V1',
    name: 'task_create_v1_object',
    type: 'multiOptions',
    description:
      "API request body for creating a task using the V1 shape, please use methods and types that don't contain the V1 suffix.",
    required: true,
    default: [],
    options: [
      {
        name: 'Source ID',
        value: 'sourceID_string',
      },
      {
        name: 'Destination ID',
        value: 'destinationID_string',
      },
      {
        name: 'Trigger',
        value: 'trigger',
      },
      {
        name: 'Action',
        value: 'action_options',
      },
      {
        name: 'Enabled',
        value: 'enabled_boolean',
      },
      {
        name: 'Failure Threshold',
        value: 'failureThreshold_number',
      },
      {
        name: 'Input',
        value: 'input',
      },
      {
        name: 'Cursor',
        value: 'cursor_string',
      },
    ],
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['createTaskV1'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally uniqud identifier (UUID) of a source.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'sourceID',
      },
    },
    displayName: 'Source ID',
    name: 'sourceID_string',
    displayOptions: {
      show: {
        task_create_v1_object: ['sourceID_string'],
        resource: ['tasks'],
        operation: ['createTaskV1'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of a destination resource.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'destinationID',
      },
    },
    displayName: 'Destination ID',
    name: 'destinationID_string',
    displayOptions: {
      show: {
        task_create_v1_object: ['destinationID_string'],
        resource: ['tasks'],
        operation: ['createTaskV1'],
      },
    },
    required: true,
  },
  {
    type: 'options',
    name: 'trigger',
    displayName: 'Trigger',
    default: '',
    options: [
      {
        name: 'On demand trigger input',
        value: 'on_demand_trigger_input',
      },
      {
        name: 'Schedule trigger input',
        value: 'schedule_trigger_input',
      },
      {
        name: 'Subscription trigger',
        value: 'subscription_trigger',
      },
      {
        name: 'Streaming trigger',
        value: 'streaming_trigger',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'trigger',
        value:
          '={{ typeof $parameter.on_demand_trigger_input_object !== "undefined" ? { "type": typeof $parameter.type_options_trigger !== "undefined" ? $parameter.type_options_trigger : undefined } : typeof $parameter.type_options_trigger !== "undefined" ? $parameter.type_options_trigger : typeof $parameter.schedule_trigger_input_object !== "undefined" ? { "type": typeof $parameter.type_options_trigger !== "undefined" ? $parameter.type_options_trigger : undefined, "cron": typeof $parameter.cron_string_trigger !== "undefined" ? $parameter.cron_string_trigger : undefined } : typeof $parameter.type_options_trigger !== "undefined" ? $parameter.type_options_trigger : typeof $parameter.cron_string_trigger !== "undefined" ? $parameter.cron_string_trigger : typeof $parameter.subscription_trigger_object !== "undefined" ? { "type": typeof $parameter.type_options_trigger !== "undefined" ? $parameter.type_options_trigger : undefined } : typeof $parameter.type_options_trigger !== "undefined" ? $parameter.type_options_trigger : typeof $parameter.streaming_trigger_object !== "undefined" ? { "type": typeof $parameter.type_options_trigger !== "undefined" ? $parameter.type_options_trigger : undefined } : typeof $parameter.type_options_trigger !== "undefined" ? $parameter.type_options_trigger : undefined }}',
      },
    },
    displayOptions: {
      show: {
        task_create_v1_object: ['trigger'],
        resource: ['tasks'],
        operation: ['createTaskV1'],
      },
    },
    required: true,
  },
  {
    displayName: 'On Demand Trigger Input',
    name: 'on_demand_trigger_input_object',
    type: 'multiOptions',
    description: 'Trigger information for manually-triggered tasks.',
    required: true,
    default: [],
    options: [
      {
        name: 'Type',
        value: 'type_options_trigger',
      },
    ],
    displayOptions: {
      show: {
        task_create_v1_object: ['trigger'],
        trigger: ['on_demand_trigger_input'],
        resource: ['tasks'],
        operation: ['createTaskV1'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description: 'Task is run manually, with the `/run` endpoint.',
    options: [
      {
        name: 'onDemand',
        value: 'onDemand',
      },
    ],
    displayName: 'Type',
    name: 'type_options_trigger',
    displayOptions: {
      show: {
        task_create_v1_object: ['trigger'],
        on_demand_trigger_input_object: ['type_options_trigger'],
        trigger: ['on_demand_trigger_input'],
        resource: ['tasks'],
        operation: ['createTaskV1'],
      },
    },
    required: true,
  },
  {
    displayName: 'Schedule Trigger Input',
    name: 'schedule_trigger_input_object',
    type: 'multiOptions',
    description: 'Trigger input for scheduled tasks.',
    required: true,
    default: [],
    options: [
      {
        name: 'Type',
        value: 'type_options_trigger',
      },
      {
        name: 'Cron',
        value: 'cron_string_trigger',
      },
    ],
    displayOptions: {
      show: {
        task_create_v1_object: ['trigger'],
        trigger: ['schedule_trigger_input'],
        resource: ['tasks'],
        operation: ['createTaskV1'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description: 'Task runs on a schedule.',
    options: [
      {
        name: 'schedule',
        value: 'schedule',
      },
    ],
    displayName: 'Type',
    name: 'type_options_trigger',
    displayOptions: {
      show: {
        task_create_v1_object: ['trigger'],
        schedule_trigger_input_object: ['type_options_trigger'],
        trigger: ['schedule_trigger_input'],
        resource: ['tasks'],
        operation: ['createTaskV1'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    placeholder: '* * 1 * *',
    default: '',
    description: "Cron expression for the task's schedule.",
    displayName: 'Cron',
    name: 'cron_string_trigger',
    displayOptions: {
      show: {
        task_create_v1_object: ['trigger'],
        schedule_trigger_input_object: ['cron_string_trigger'],
        trigger: ['schedule_trigger_input'],
        resource: ['tasks'],
        operation: ['createTaskV1'],
      },
    },
    required: true,
  },
  {
    displayName: 'Subscription Trigger',
    name: 'subscription_trigger_object',
    type: 'multiOptions',
    description: 'Trigger input for subscription tasks.',
    required: true,
    default: [],
    options: [
      {
        name: 'Type',
        value: 'type_options_trigger',
      },
    ],
    displayOptions: {
      show: {
        task_create_v1_object: ['trigger'],
        trigger: ['subscription_trigger'],
        resource: ['tasks'],
        operation: ['createTaskV1'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description: 'Task runs after receiving subscribed event.',
    options: [
      {
        name: 'subscription',
        value: 'subscription',
      },
    ],
    displayName: 'Type',
    name: 'type_options_trigger',
    displayOptions: {
      show: {
        task_create_v1_object: ['trigger'],
        subscription_trigger_object: ['type_options_trigger'],
        trigger: ['subscription_trigger'],
        resource: ['tasks'],
        operation: ['createTaskV1'],
      },
    },
    required: true,
  },
  {
    displayName: 'Streaming Trigger',
    name: 'streaming_trigger_object',
    type: 'multiOptions',
    description: 'Trigger input for continuously running tasks.',
    required: true,
    default: [],
    options: [
      {
        name: 'Type',
        value: 'type_options_trigger',
      },
    ],
    displayOptions: {
      show: {
        task_create_v1_object: ['trigger'],
        trigger: ['streaming_trigger'],
        resource: ['tasks'],
        operation: ['createTaskV1'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description: 'Task runs continuously.',
    options: [
      {
        name: 'streaming',
        value: 'streaming',
      },
    ],
    displayName: 'Type',
    name: 'type_options_trigger',
    displayOptions: {
      show: {
        task_create_v1_object: ['trigger'],
        streaming_trigger_object: ['type_options_trigger'],
        trigger: ['streaming_trigger'],
        resource: ['tasks'],
        operation: ['createTaskV1'],
      },
    },
    required: true,
  },
  {
    type: 'options',
    default: '',
    description: 'Action to perform on the Algolia index.',
    options: [
      {
        name: 'replace',
        value: 'replace',
      },
      {
        name: 'save',
        value: 'save',
      },
      {
        name: 'partial',
        value: 'partial',
      },
      {
        name: 'partialNoCreate',
        value: 'partialNoCreate',
      },
      {
        name: 'append',
        value: 'append',
      },
    ],
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'action',
      },
    },
    displayName: 'Action',
    name: 'action_options',
    displayOptions: {
      show: {
        task_create_v1_object: ['action_options'],
        resource: ['tasks'],
        operation: ['createTaskV1'],
      },
    },
    required: true,
  },
  {
    type: 'boolean',
    default: false,
    description: 'Whether the task is enabled.',
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
        task_create_v1_object: ['enabled_boolean'],
        resource: ['tasks'],
        operation: ['createTaskV1'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description: 'Maximum accepted percentage of failures for a task run to finish successfully.',
    typeOptions: {
      minValue: 0,
      maxValue: 100,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'failureThreshold',
      },
    },
    displayName: 'Failure Threshold',
    name: 'failureThreshold_number',
    displayOptions: {
      show: {
        task_create_v1_object: ['failureThreshold_number'],
        resource: ['tasks'],
        operation: ['createTaskV1'],
      },
    },
  },
  {
    type: 'options',
    name: 'input',
    displayName: 'Input',
    default: '',
    options: [
      {
        name: 'Streaming input',
        value: 'streaming_input',
      },
      {
        name: 'Docker streams input',
        value: 'docker_streams_input',
      },
      {
        name: 'Shopify input',
        value: 'shopify_input',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'input',
        value:
          '={{ typeof $parameter.streaming_input_object !== "undefined" ? { "mapping": { "format": typeof $parameter.format_options_mapping_input !== "undefined" ? $parameter.format_options_mapping_input : undefined, "actions": typeof $parameter.actions_json_mapping_input !== "undefined" ? JSON.parse($parameter.actions_json_mapping_input) : undefined } } : typeof $parameter.mapping_input_object_input !== "undefined" ? $parameter.mapping_input_object_input : typeof $parameter.format_options_mapping_input !== "undefined" ? $parameter.format_options_mapping_input : typeof $parameter.actions_json_mapping_input !== "undefined" ? JSON.parse($parameter.actions_json_mapping_input) : typeof $parameter.docker_streams_input_object !== "undefined" ? { "streams": typeof $parameter.streams_json_input !== "undefined" ? JSON.parse($parameter.streams_json_input) : undefined } : typeof $parameter.streams_json_input !== "undefined" ? JSON.parse($parameter.streams_json_input) : typeof $parameter.shopify_input_object !== "undefined" ? { "metafields": typeof $parameter.metafields_json_input !== "undefined" ? JSON.parse($parameter.metafields_json_input) : undefined, "market": { "countries": typeof $parameter.countries_json_market_input !== "undefined" ? JSON.parse($parameter.countries_json_market_input) : undefined, "currencies": typeof $parameter.currencies_json_market_input !== "undefined" ? JSON.parse($parameter.currencies_json_market_input) : undefined, "locales": typeof $parameter.locales_json_market_input !== "undefined" ? JSON.parse($parameter.locales_json_market_input) : undefined } } : typeof $parameter.metafields_json_input !== "undefined" ? JSON.parse($parameter.metafields_json_input) : typeof $parameter.shopify_market_object_input !== "undefined" ? $parameter.shopify_market_object_input : typeof $parameter.countries_json_market_input !== "undefined" ? JSON.parse($parameter.countries_json_market_input) : typeof $parameter.currencies_json_market_input !== "undefined" ? JSON.parse($parameter.currencies_json_market_input) : typeof $parameter.locales_json_market_input !== "undefined" ? JSON.parse($parameter.locales_json_market_input) : undefined }}',
      },
    },
    displayOptions: {
      show: {
        task_create_v1_object: ['input'],
        resource: ['tasks'],
        operation: ['createTaskV1'],
      },
    },
  },
  {
    displayName: 'Streaming Input',
    name: 'streaming_input_object',
    type: 'multiOptions',
    description:
      'Input for a `streaming` task whose source is of type `ga4BigqueryExport` and for which extracted data is continuously streamed.',
    required: true,
    default: [],
    options: [
      {
        name: 'Mapping Input',
        value: 'mapping_input_object_input',
      },
    ],
    displayOptions: {
      show: {
        task_create_v1_object: ['input'],
        input: ['streaming_input'],
        resource: ['tasks'],
        operation: ['createTaskV1'],
      },
    },
  },
  {
    displayName: 'Mapping Input',
    name: 'mapping_input_object_input',
    type: 'multiOptions',
    description: 'Transformations to apply to the source, serialized as a JSON string.',
    required: true,
    default: [],
    options: [
      {
        name: 'Format',
        value: 'format_options_mapping',
      },
      {
        name: 'Actions',
        value: 'actions_json_mapping',
      },
    ],
    displayOptions: {
      show: {
        task_create_v1_object: ['input'],
        streaming_input_object: ['mapping_input_object_input'],
        input: ['streaming_input'],
        resource: ['tasks'],
        operation: ['createTaskV1'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description: 'Mapping format schema.',
    options: [
      {
        name: 'mappingkit/v1',
        value: 'mappingkit/v1',
      },
    ],
    displayName: 'Format',
    name: 'format_options_mapping_input',
    displayOptions: {
      show: {
        task_create_v1_object: ['input'],
        streaming_input_object: ['mapping_input_object_input'],
        mapping_input_object_input: ['format_options_mapping'],
        input: ['streaming_input'],
        resource: ['tasks'],
        operation: ['createTaskV1'],
      },
    },
    required: true,
  },
  {
    type: 'json',
    displayName: 'Actions',
    name: 'actions_json_mapping_input',
    default: '[]',
    description: undefined,
    required: true,
    displayOptions: {
      show: {
        task_create_v1_object: ['input'],
        streaming_input_object: ['mapping_input_object_input'],
        mapping_input_object_input: ['actions_json_mapping'],
        input: ['streaming_input'],
        resource: ['tasks'],
        operation: ['createTaskV1'],
      },
    },
  },
  {
    displayName: 'Docker Streams Input',
    name: 'docker_streams_input_object',
    type: 'multiOptions',
    description: 'The selected streams of an airbyte connector.',
    required: true,
    default: [],
    options: [
      {
        name: 'Streams',
        value: 'streams_json_input',
      },
    ],
    displayOptions: {
      show: {
        task_create_v1_object: ['input'],
        input: ['docker_streams_input'],
        resource: ['tasks'],
        operation: ['createTaskV1'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Streams',
    name: 'streams_json_input',
    default: '[]',
    description: undefined,
    required: true,
    displayOptions: {
      show: {
        task_create_v1_object: ['input'],
        docker_streams_input_object: ['streams_json_input'],
        input: ['docker_streams_input'],
        resource: ['tasks'],
        operation: ['createTaskV1'],
      },
    },
  },
  {
    displayName: 'Shopify Input',
    name: 'shopify_input_object',
    type: 'multiOptions',
    description:
      'Represents the required elements of the task input when using a `shopify` source.',
    required: true,
    default: [],
    options: [
      {
        name: 'Metafields',
        value: 'metafields_json_input',
      },
      {
        name: 'Shopify Market',
        value: 'shopify_market_object_input',
      },
    ],
    displayOptions: {
      show: {
        task_create_v1_object: ['input'],
        input: ['shopify_input'],
        resource: ['tasks'],
        operation: ['createTaskV1'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Metafields',
    name: 'metafields_json_input',
    default: '[]',
    description: undefined,
    required: true,
    displayOptions: {
      show: {
        task_create_v1_object: ['input'],
        shopify_input_object: ['metafields_json_input'],
        input: ['shopify_input'],
        resource: ['tasks'],
        operation: ['createTaskV1'],
      },
    },
  },
  {
    displayName: 'Shopify Market',
    name: 'shopify_market_object_input',
    type: 'multiOptions',
    description: 'Represents a market in Shopify.',
    required: true,
    default: [],
    options: [
      {
        name: 'Countries',
        value: 'countries_json_market',
      },
      {
        name: 'Currencies',
        value: 'currencies_json_market',
      },
      {
        name: 'Locales',
        value: 'locales_json_market',
      },
    ],
    displayOptions: {
      show: {
        task_create_v1_object: ['input'],
        shopify_input_object: ['shopify_market_object_input'],
        input: ['shopify_input'],
        resource: ['tasks'],
        operation: ['createTaskV1'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Countries',
    name: 'countries_json_market_input',
    default: '[]',
    description: undefined,
    required: true,
    displayOptions: {
      show: {
        task_create_v1_object: ['input'],
        shopify_input_object: ['shopify_market_object_input'],
        shopify_market_object_input: ['countries_json_market'],
        input: ['shopify_input'],
        resource: ['tasks'],
        operation: ['createTaskV1'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Currencies',
    name: 'currencies_json_market_input',
    default: '[]',
    description: undefined,
    required: true,
    displayOptions: {
      show: {
        task_create_v1_object: ['input'],
        shopify_input_object: ['shopify_market_object_input'],
        shopify_market_object_input: ['currencies_json_market'],
        input: ['shopify_input'],
        resource: ['tasks'],
        operation: ['createTaskV1'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Locales',
    name: 'locales_json_market_input',
    default: '[]',
    description: undefined,
    required: true,
    displayOptions: {
      show: {
        task_create_v1_object: ['input'],
        shopify_input_object: ['shopify_market_object_input'],
        shopify_market_object_input: ['locales_json_market'],
        input: ['shopify_input'],
        resource: ['tasks'],
        operation: ['createTaskV1'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Date of the last cursor in RFC 3339 format.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'cursor',
      },
    },
    displayName: 'Cursor',
    name: 'cursor_string',
    displayOptions: {
      show: {
        task_create_v1_object: ['cursor_string'],
        resource: ['tasks'],
        operation: ['createTaskV1'],
      },
    },
  },
  {
    displayName: 'Task Search',
    name: 'task_search_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Task IDs',
        value: 'taskIDs_json',
      },
    ],
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['searchTasksV1'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Task IDs',
    name: 'taskIDs_json',
    default: '[]',
    description: undefined,
    required: true,
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'taskIDs',
      },
    },
    displayOptions: {
      show: {
        task_search_object: ['taskIDs_json'],
        resource: ['tasks'],
        operation: ['searchTasksV1'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of a task.',
    displayName: 'Task ID',
    name: 'taskID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['getTaskV1'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of a task.',
    displayName: 'Task ID',
    name: 'taskID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['updateTaskV1'],
      },
    },
  },
  {
    displayName: 'Task Update V1',
    name: 'task_update_v1_object',
    type: 'multiOptions',
    description:
      "API request body for updating a task using the V1 shape, please use methods and types that don't contain the V1 suffix.",
    required: false,
    default: [],
    options: [
      {
        name: 'Destination ID',
        value: 'destinationID_string',
      },
      {
        name: 'Trigger Update Input',
        value: 'trigger_update_input_object',
      },
      {
        name: 'Input',
        value: 'input',
      },
      {
        name: 'Enabled',
        value: 'enabled_boolean',
      },
      {
        name: 'Failure Threshold',
        value: 'failureThreshold_number',
      },
    ],
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['updateTaskV1'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of a destination resource.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'destinationID',
      },
    },
    displayName: 'Destination ID',
    name: 'destinationID_string',
    displayOptions: {
      show: {
        task_update_v1_object: ['destinationID_string'],
        resource: ['tasks'],
        operation: ['updateTaskV1'],
      },
    },
  },
  {
    displayName: 'Trigger Update Input',
    name: 'trigger_update_input_object',
    type: 'multiOptions',
    description: 'Trigger for a task update.',
    required: true,
    default: [],
    options: [
      {
        name: 'Cron',
        value: 'cron_string_trigger',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'trigger',
        value:
          '={{ { "cron": typeof $parameter.cron_string_trigger !== "undefined" ? $parameter.cron_string_trigger : undefined } }}',
      },
    },
    displayOptions: {
      show: {
        task_update_v1_object: ['trigger_update_input_object'],
        resource: ['tasks'],
        operation: ['updateTaskV1'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '* * 1 * *',
    default: '',
    description: "Cron expression for the task's schedule.",
    displayName: 'Cron',
    name: 'cron_string_trigger',
    displayOptions: {
      show: {
        task_update_v1_object: ['trigger_update_input_object'],
        trigger_update_input_object: ['cron_string_trigger'],
        resource: ['tasks'],
        operation: ['updateTaskV1'],
      },
    },
    required: true,
  },
  {
    type: 'options',
    name: 'input',
    displayName: 'Input',
    default: '',
    options: [
      {
        name: 'Streaming input',
        value: 'streaming_input',
      },
      {
        name: 'Docker streams input',
        value: 'docker_streams_input',
      },
      {
        name: 'Shopify input',
        value: 'shopify_input',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'input',
        value:
          '={{ typeof $parameter.streaming_input_object !== "undefined" ? { "mapping": { "format": typeof $parameter.format_options_mapping_input !== "undefined" ? $parameter.format_options_mapping_input : undefined, "actions": typeof $parameter.actions_json_mapping_input !== "undefined" ? JSON.parse($parameter.actions_json_mapping_input) : undefined } } : typeof $parameter.mapping_input_object_input !== "undefined" ? $parameter.mapping_input_object_input : typeof $parameter.format_options_mapping_input !== "undefined" ? $parameter.format_options_mapping_input : typeof $parameter.actions_json_mapping_input !== "undefined" ? JSON.parse($parameter.actions_json_mapping_input) : typeof $parameter.docker_streams_input_object !== "undefined" ? { "streams": typeof $parameter.streams_json_input !== "undefined" ? JSON.parse($parameter.streams_json_input) : undefined } : typeof $parameter.streams_json_input !== "undefined" ? JSON.parse($parameter.streams_json_input) : typeof $parameter.shopify_input_object !== "undefined" ? { "metafields": typeof $parameter.metafields_json_input !== "undefined" ? JSON.parse($parameter.metafields_json_input) : undefined, "market": { "countries": typeof $parameter.countries_json_market_input !== "undefined" ? JSON.parse($parameter.countries_json_market_input) : undefined, "currencies": typeof $parameter.currencies_json_market_input !== "undefined" ? JSON.parse($parameter.currencies_json_market_input) : undefined, "locales": typeof $parameter.locales_json_market_input !== "undefined" ? JSON.parse($parameter.locales_json_market_input) : undefined } } : typeof $parameter.metafields_json_input !== "undefined" ? JSON.parse($parameter.metafields_json_input) : typeof $parameter.shopify_market_object_input !== "undefined" ? $parameter.shopify_market_object_input : typeof $parameter.countries_json_market_input !== "undefined" ? JSON.parse($parameter.countries_json_market_input) : typeof $parameter.currencies_json_market_input !== "undefined" ? JSON.parse($parameter.currencies_json_market_input) : typeof $parameter.locales_json_market_input !== "undefined" ? JSON.parse($parameter.locales_json_market_input) : undefined }}',
      },
    },
    displayOptions: {
      show: {
        task_update_v1_object: ['input'],
        resource: ['tasks'],
        operation: ['updateTaskV1'],
      },
    },
  },
  {
    displayName: 'Streaming Input',
    name: 'streaming_input_object',
    type: 'multiOptions',
    description:
      'Input for a `streaming` task whose source is of type `ga4BigqueryExport` and for which extracted data is continuously streamed.',
    required: true,
    default: [],
    options: [
      {
        name: 'Mapping Input',
        value: 'mapping_input_object_input',
      },
    ],
    displayOptions: {
      show: {
        task_update_v1_object: ['input'],
        input: ['streaming_input'],
        resource: ['tasks'],
        operation: ['updateTaskV1'],
      },
    },
  },
  {
    displayName: 'Mapping Input',
    name: 'mapping_input_object_input',
    type: 'multiOptions',
    description: 'Transformations to apply to the source, serialized as a JSON string.',
    required: true,
    default: [],
    options: [
      {
        name: 'Format',
        value: 'format_options_mapping',
      },
      {
        name: 'Actions',
        value: 'actions_json_mapping',
      },
    ],
    displayOptions: {
      show: {
        task_update_v1_object: ['input'],
        streaming_input_object: ['mapping_input_object_input'],
        input: ['streaming_input'],
        resource: ['tasks'],
        operation: ['updateTaskV1'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description: 'Mapping format schema.',
    options: [
      {
        name: 'mappingkit/v1',
        value: 'mappingkit/v1',
      },
    ],
    displayName: 'Format',
    name: 'format_options_mapping_input',
    displayOptions: {
      show: {
        task_update_v1_object: ['input'],
        streaming_input_object: ['mapping_input_object_input'],
        mapping_input_object_input: ['format_options_mapping'],
        input: ['streaming_input'],
        resource: ['tasks'],
        operation: ['updateTaskV1'],
      },
    },
    required: true,
  },
  {
    type: 'json',
    displayName: 'Actions',
    name: 'actions_json_mapping_input',
    default: '[]',
    description: undefined,
    required: true,
    displayOptions: {
      show: {
        task_update_v1_object: ['input'],
        streaming_input_object: ['mapping_input_object_input'],
        mapping_input_object_input: ['actions_json_mapping'],
        input: ['streaming_input'],
        resource: ['tasks'],
        operation: ['updateTaskV1'],
      },
    },
  },
  {
    displayName: 'Docker Streams Input',
    name: 'docker_streams_input_object',
    type: 'multiOptions',
    description: 'The selected streams of an airbyte connector.',
    required: true,
    default: [],
    options: [
      {
        name: 'Streams',
        value: 'streams_json_input',
      },
    ],
    displayOptions: {
      show: {
        task_update_v1_object: ['input'],
        input: ['docker_streams_input'],
        resource: ['tasks'],
        operation: ['updateTaskV1'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Streams',
    name: 'streams_json_input',
    default: '[]',
    description: undefined,
    required: true,
    displayOptions: {
      show: {
        task_update_v1_object: ['input'],
        docker_streams_input_object: ['streams_json_input'],
        input: ['docker_streams_input'],
        resource: ['tasks'],
        operation: ['updateTaskV1'],
      },
    },
  },
  {
    displayName: 'Shopify Input',
    name: 'shopify_input_object',
    type: 'multiOptions',
    description:
      'Represents the required elements of the task input when using a `shopify` source.',
    required: true,
    default: [],
    options: [
      {
        name: 'Metafields',
        value: 'metafields_json_input',
      },
      {
        name: 'Shopify Market',
        value: 'shopify_market_object_input',
      },
    ],
    displayOptions: {
      show: {
        task_update_v1_object: ['input'],
        input: ['shopify_input'],
        resource: ['tasks'],
        operation: ['updateTaskV1'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Metafields',
    name: 'metafields_json_input',
    default: '[]',
    description: undefined,
    required: true,
    displayOptions: {
      show: {
        task_update_v1_object: ['input'],
        shopify_input_object: ['metafields_json_input'],
        input: ['shopify_input'],
        resource: ['tasks'],
        operation: ['updateTaskV1'],
      },
    },
  },
  {
    displayName: 'Shopify Market',
    name: 'shopify_market_object_input',
    type: 'multiOptions',
    description: 'Represents a market in Shopify.',
    required: true,
    default: [],
    options: [
      {
        name: 'Countries',
        value: 'countries_json_market',
      },
      {
        name: 'Currencies',
        value: 'currencies_json_market',
      },
      {
        name: 'Locales',
        value: 'locales_json_market',
      },
    ],
    displayOptions: {
      show: {
        task_update_v1_object: ['input'],
        shopify_input_object: ['shopify_market_object_input'],
        input: ['shopify_input'],
        resource: ['tasks'],
        operation: ['updateTaskV1'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Countries',
    name: 'countries_json_market_input',
    default: '[]',
    description: undefined,
    required: true,
    displayOptions: {
      show: {
        task_update_v1_object: ['input'],
        shopify_input_object: ['shopify_market_object_input'],
        shopify_market_object_input: ['countries_json_market'],
        input: ['shopify_input'],
        resource: ['tasks'],
        operation: ['updateTaskV1'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Currencies',
    name: 'currencies_json_market_input',
    default: '[]',
    description: undefined,
    required: true,
    displayOptions: {
      show: {
        task_update_v1_object: ['input'],
        shopify_input_object: ['shopify_market_object_input'],
        shopify_market_object_input: ['currencies_json_market'],
        input: ['shopify_input'],
        resource: ['tasks'],
        operation: ['updateTaskV1'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Locales',
    name: 'locales_json_market_input',
    default: '[]',
    description: undefined,
    required: true,
    displayOptions: {
      show: {
        task_update_v1_object: ['input'],
        shopify_input_object: ['shopify_market_object_input'],
        shopify_market_object_input: ['locales_json_market'],
        input: ['shopify_input'],
        resource: ['tasks'],
        operation: ['updateTaskV1'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description: 'Whether the task is enabled.',
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
        task_update_v1_object: ['enabled_boolean'],
        resource: ['tasks'],
        operation: ['updateTaskV1'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description: 'Maximum accepted percentage of failures for a task run to finish successfully.',
    typeOptions: {
      minValue: 0,
      maxValue: 100,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'failureThreshold',
      },
    },
    displayName: 'Failure Threshold',
    name: 'failureThreshold_number',
    displayOptions: {
      show: {
        task_update_v1_object: ['failureThreshold_number'],
        resource: ['tasks'],
        operation: ['updateTaskV1'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of a task.',
    displayName: 'Task ID',
    name: 'taskID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['deleteTaskV1'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of a task.',
    displayName: 'Task ID',
    name: 'taskID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['runTaskV1'],
      },
    },
  },
  {
    displayName: 'Run Task Payload',
    name: 'run_task_payload_object',
    type: 'multiOptions',
    description: undefined,
    required: false,
    default: [],
    options: [
      {
        name: 'Run Metadata',
        value: 'run_metadata_object',
      },
    ],
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['runTaskV1'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Run Metadata',
    name: 'run_metadata_object',
    description: 'Additional information that will be passed to the created run.',
    required: false,
    default: '{}',
    routing: {
      send: {
        type: 'body',
        property: 'runMetadata',
        value: '={{ $value }}',
      },
    },
    displayOptions: {
      show: {
        run_task_payload_object: ['run_metadata_object'],
        resource: ['tasks'],
        operation: ['runTaskV1'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of a task.',
    displayName: 'Task ID',
    name: 'taskID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['enableTaskV1'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of a task.',
    displayName: 'Task ID',
    name: 'taskID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['tasks'],
        operation: ['disableTaskV1'],
      },
    },
  },
  {
    type: 'number',
    default: 10,
    description: 'Number of items per page.',
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
        resource: ['transformations'],
        operation: ['listTransformations'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description: 'Page of the API response to retrieve.',
    typeOptions: {
      minValue: 1,
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
        resource: ['transformations'],
        operation: ['listTransformations'],
      },
    },
  },
  {
    type: 'options',
    default: 'createdAt',
    description: 'Property by which to sort the list of transformations.',
    options: [
      {
        name: 'name',
        value: 'name',
      },
      {
        name: 'updatedAt',
        value: 'updatedAt',
      },
      {
        name: 'createdAt',
        value: 'createdAt',
      },
    ],
    routing: {
      request: {
        qs: {
          sort: '={{ $value }}',
        },
      },
    },
    displayName: 'Sort',
    name: 'sort_options',
    displayOptions: {
      show: {
        resource: ['transformations'],
        operation: ['listTransformations'],
      },
    },
  },
  {
    type: 'options',
    default: 'desc',
    description: 'Ascending or descending sort order.',
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
          order: '={{ $value }}',
        },
      },
    },
    displayName: 'Order',
    name: 'order_options',
    displayOptions: {
      show: {
        resource: ['transformations'],
        operation: ['listTransformations'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description: "The type of transformation, which can be either 'code' or 'noCode'.",
    options: [
      {
        name: 'code',
        value: 'code',
      },
      {
        name: 'noCode',
        value: 'noCode',
      },
    ],
    routing: {
      request: {
        qs: {
          type: '={{ $value }}',
        },
      },
    },
    displayName: 'Type',
    name: 'type_options',
    displayOptions: {
      show: {
        resource: ['transformations'],
        operation: ['listTransformations'],
      },
    },
  },
  {
    displayName: 'Transformation Create',
    name: 'transformation_create_object',
    type: 'multiOptions',
    description: 'API request body for creating a transformation.',
    required: true,
    default: [],
    options: [
      {
        name: 'Code',
        value: 'code_string',
      },
      {
        name: 'Name',
        value: 'name_string',
      },
      {
        name: 'Type',
        value: 'type_options',
      },
      {
        name: 'Input',
        value: 'input',
      },
      {
        name: 'Description',
        value: 'description_string',
      },
      {
        name: 'Authentication IDs',
        value: 'authenticationIDs_json',
      },
    ],
    displayOptions: {
      show: {
        resource: ['transformations'],
        operation: ['createTransformation'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description:
      'It is deprecated. Use the `input` field with proper `type` instead to specify the transformation code.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'code',
      },
    },
    displayName: 'Code',
    name: 'code_string',
    displayOptions: {
      show: {
        transformation_create_object: ['code_string'],
        resource: ['transformations'],
        operation: ['createTransformation'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'The uniquely identified name of your transformation.',
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
        transformation_create_object: ['name_string'],
        resource: ['transformations'],
        operation: ['createTransformation'],
      },
    },
    required: true,
  },
  {
    type: 'options',
    default: '',
    description: "The type of transformation, which can be either 'code' or 'noCode'.",
    options: [
      {
        name: 'code',
        value: 'code',
      },
      {
        name: 'noCode',
        value: 'noCode',
      },
    ],
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'type',
      },
    },
    displayName: 'Type',
    name: 'type_options',
    displayOptions: {
      show: {
        transformation_create_object: ['type_options'],
        resource: ['transformations'],
        operation: ['createTransformation'],
      },
    },
  },
  {
    type: 'options',
    name: 'input',
    displayName: 'Input',
    default: '',
    options: [
      {
        name: 'Transformation code',
        value: 'transformation_code',
      },
      {
        name: 'Transformation no code',
        value: 'transformation_no_code',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'input',
        value:
          '={{ typeof $parameter.transformation_code_object !== "undefined" ? { "code": typeof $parameter.code_string_input !== "undefined" ? $parameter.code_string_input : undefined } : typeof $parameter.code_string_input !== "undefined" ? $parameter.code_string_input : typeof $parameter.transformation_no_code_object !== "undefined" ? { "steps": typeof $parameter.steps_json_input !== "undefined" ? JSON.parse($parameter.steps_json_input) : undefined } : typeof $parameter.steps_json_input !== "undefined" ? JSON.parse($parameter.steps_json_input) : undefined }}',
      },
    },
    displayOptions: {
      show: {
        transformation_create_object: ['input'],
        resource: ['transformations'],
        operation: ['createTransformation'],
      },
    },
  },
  {
    displayName: 'Transformation Code',
    name: 'transformation_code_object',
    type: 'multiOptions',
    description: 'Input for a transformation that contains the source code of the transformation.',
    required: true,
    default: [],
    options: [
      {
        name: 'Code',
        value: 'code_string_input',
      },
    ],
    displayOptions: {
      show: {
        transformation_create_object: ['input'],
        input: ['transformation_code'],
        resource: ['transformations'],
        operation: ['createTransformation'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'The source code of the transformation.',
    displayName: 'Code',
    name: 'code_string_input',
    displayOptions: {
      show: {
        transformation_create_object: ['input'],
        transformation_code_object: ['code_string_input'],
        input: ['transformation_code'],
        resource: ['transformations'],
        operation: ['createTransformation'],
      },
    },
    required: true,
  },
  {
    displayName: 'Transformation No Code',
    name: 'transformation_no_code_object',
    type: 'multiOptions',
    description: 'Input for a no-code transformation that contains a series of steps.',
    required: true,
    default: [],
    options: [
      {
        name: 'Steps',
        value: 'steps_json_input',
      },
    ],
    displayOptions: {
      show: {
        transformation_create_object: ['input'],
        input: ['transformation_no_code'],
        resource: ['transformations'],
        operation: ['createTransformation'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Steps',
    name: 'steps_json_input',
    default: '[]',
    description: undefined,
    required: true,
    displayOptions: {
      show: {
        transformation_create_object: ['input'],
        transformation_no_code_object: ['steps_json_input'],
        input: ['transformation_no_code'],
        resource: ['transformations'],
        operation: ['createTransformation'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'A descriptive name for your transformation of what it does.',
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
        transformation_create_object: ['description_string'],
        resource: ['transformations'],
        operation: ['createTransformation'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Authentication IDs',
    name: 'authenticationIDs_json',
    default: '[]',
    description: 'The authentications associated with the current transformation.',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'authenticationIDs',
      },
    },
    displayOptions: {
      show: {
        transformation_create_object: ['authenticationIDs_json'],
        resource: ['transformations'],
        operation: ['createTransformation'],
      },
    },
  },
  {
    displayName: 'Transformation Try',
    name: 'transformation_try_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Code',
        value: 'code_string',
      },
      {
        name: 'Type',
        value: 'type_options',
      },
      {
        name: 'Input',
        value: 'input',
      },
      {
        name: 'Sample Record',
        value: 'sample_record_object',
      },
      {
        name: 'Authentications',
        value: 'authentications_json',
      },
    ],
    displayOptions: {
      show: {
        resource: ['transformations'],
        operation: ['tryTransformation'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description:
      'It is deprecated. Use the `input` field with proper `type` instead to specify the transformation code.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'code',
      },
    },
    displayName: 'Code',
    name: 'code_string',
    displayOptions: {
      show: {
        transformation_try_object: ['code_string'],
        resource: ['transformations'],
        operation: ['tryTransformation'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description: "The type of transformation, which can be either 'code' or 'noCode'.",
    options: [
      {
        name: 'code',
        value: 'code',
      },
      {
        name: 'noCode',
        value: 'noCode',
      },
    ],
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'type',
      },
    },
    displayName: 'Type',
    name: 'type_options',
    displayOptions: {
      show: {
        transformation_try_object: ['type_options'],
        resource: ['transformations'],
        operation: ['tryTransformation'],
      },
    },
  },
  {
    type: 'options',
    name: 'input',
    displayName: 'Input',
    default: '',
    options: [
      {
        name: 'Transformation code',
        value: 'transformation_code',
      },
      {
        name: 'Transformation no code',
        value: 'transformation_no_code',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'input',
        value:
          '={{ typeof $parameter.transformation_code_object !== "undefined" ? { "code": typeof $parameter.code_string_input !== "undefined" ? $parameter.code_string_input : undefined } : typeof $parameter.code_string_input !== "undefined" ? $parameter.code_string_input : typeof $parameter.transformation_no_code_object !== "undefined" ? { "steps": typeof $parameter.steps_json_input !== "undefined" ? JSON.parse($parameter.steps_json_input) : undefined } : typeof $parameter.steps_json_input !== "undefined" ? JSON.parse($parameter.steps_json_input) : undefined }}',
      },
    },
    displayOptions: {
      show: {
        transformation_try_object: ['input'],
        resource: ['transformations'],
        operation: ['tryTransformation'],
      },
    },
  },
  {
    displayName: 'Transformation Code',
    name: 'transformation_code_object',
    type: 'multiOptions',
    description: 'Input for a transformation that contains the source code of the transformation.',
    required: true,
    default: [],
    options: [
      {
        name: 'Code',
        value: 'code_string_input',
      },
    ],
    displayOptions: {
      show: {
        transformation_try_object: ['input'],
        input: ['transformation_code'],
        resource: ['transformations'],
        operation: ['tryTransformation'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'The source code of the transformation.',
    displayName: 'Code',
    name: 'code_string_input',
    displayOptions: {
      show: {
        transformation_try_object: ['input'],
        transformation_code_object: ['code_string_input'],
        input: ['transformation_code'],
        resource: ['transformations'],
        operation: ['tryTransformation'],
      },
    },
    required: true,
  },
  {
    displayName: 'Transformation No Code',
    name: 'transformation_no_code_object',
    type: 'multiOptions',
    description: 'Input for a no-code transformation that contains a series of steps.',
    required: true,
    default: [],
    options: [
      {
        name: 'Steps',
        value: 'steps_json_input',
      },
    ],
    displayOptions: {
      show: {
        transformation_try_object: ['input'],
        input: ['transformation_no_code'],
        resource: ['transformations'],
        operation: ['tryTransformation'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Steps',
    name: 'steps_json_input',
    default: '[]',
    description: undefined,
    required: true,
    displayOptions: {
      show: {
        transformation_try_object: ['input'],
        transformation_no_code_object: ['steps_json_input'],
        input: ['transformation_no_code'],
        resource: ['transformations'],
        operation: ['tryTransformation'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Sample Record',
    name: 'sample_record_object',
    description: 'The record to apply the given code to.',
    required: true,
    default: '{}',
    routing: {
      send: {
        type: 'body',
        property: 'sampleRecord',
        value: '={{ $value }}',
      },
    },
    displayOptions: {
      show: {
        transformation_try_object: ['sample_record_object'],
        resource: ['transformations'],
        operation: ['tryTransformation'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Authentications',
    name: 'authentications_json',
    default: '[]',
    description: undefined,
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'authentications',
      },
    },
    displayOptions: {
      show: {
        transformation_try_object: ['authentications_json'],
        resource: ['transformations'],
        operation: ['tryTransformation'],
      },
    },
  },
  {
    displayName: 'Transformation Search',
    name: 'transformation_search_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Transformation IDs',
        value: 'transformationIDs_json',
      },
    ],
    displayOptions: {
      show: {
        resource: ['transformations'],
        operation: ['searchTransformations'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Transformation IDs',
    name: 'transformationIDs_json',
    default: '[]',
    description: undefined,
    required: true,
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'transformationIDs',
      },
    },
    displayOptions: {
      show: {
        transformation_search_object: ['transformationIDs_json'],
        resource: ['transformations'],
        operation: ['searchTransformations'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of a transformation.',
    displayName: 'Transformation ID',
    name: 'transformationID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['transformations'],
        operation: ['getTransformation'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of a transformation.',
    displayName: 'Transformation ID',
    name: 'transformationID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['transformations'],
        operation: ['updateTransformation'],
      },
    },
  },
  {
    displayName: 'Transformation Create',
    name: 'transformation_create_object',
    type: 'multiOptions',
    description: 'API request body for creating a transformation.',
    required: true,
    default: [],
    options: [
      {
        name: 'Code',
        value: 'code_string',
      },
      {
        name: 'Name',
        value: 'name_string',
      },
      {
        name: 'Type',
        value: 'type_options',
      },
      {
        name: 'Input',
        value: 'input',
      },
      {
        name: 'Description',
        value: 'description_string',
      },
      {
        name: 'Authentication IDs',
        value: 'authenticationIDs_json',
      },
    ],
    displayOptions: {
      show: {
        resource: ['transformations'],
        operation: ['updateTransformation'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description:
      'It is deprecated. Use the `input` field with proper `type` instead to specify the transformation code.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'code',
      },
    },
    displayName: 'Code',
    name: 'code_string',
    displayOptions: {
      show: {
        transformation_create_object: ['code_string'],
        resource: ['transformations'],
        operation: ['updateTransformation'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'The uniquely identified name of your transformation.',
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
        transformation_create_object: ['name_string'],
        resource: ['transformations'],
        operation: ['updateTransformation'],
      },
    },
    required: true,
  },
  {
    type: 'options',
    default: '',
    description: "The type of transformation, which can be either 'code' or 'noCode'.",
    options: [
      {
        name: 'code',
        value: 'code',
      },
      {
        name: 'noCode',
        value: 'noCode',
      },
    ],
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'type',
      },
    },
    displayName: 'Type',
    name: 'type_options',
    displayOptions: {
      show: {
        transformation_create_object: ['type_options'],
        resource: ['transformations'],
        operation: ['updateTransformation'],
      },
    },
  },
  {
    type: 'options',
    name: 'input',
    displayName: 'Input',
    default: '',
    options: [
      {
        name: 'Transformation code',
        value: 'transformation_code',
      },
      {
        name: 'Transformation no code',
        value: 'transformation_no_code',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'input',
        value:
          '={{ typeof $parameter.transformation_code_object !== "undefined" ? { "code": typeof $parameter.code_string_input !== "undefined" ? $parameter.code_string_input : undefined } : typeof $parameter.code_string_input !== "undefined" ? $parameter.code_string_input : typeof $parameter.transformation_no_code_object !== "undefined" ? { "steps": typeof $parameter.steps_json_input !== "undefined" ? JSON.parse($parameter.steps_json_input) : undefined } : typeof $parameter.steps_json_input !== "undefined" ? JSON.parse($parameter.steps_json_input) : undefined }}',
      },
    },
    displayOptions: {
      show: {
        transformation_create_object: ['input'],
        resource: ['transformations'],
        operation: ['updateTransformation'],
      },
    },
  },
  {
    displayName: 'Transformation Code',
    name: 'transformation_code_object',
    type: 'multiOptions',
    description: 'Input for a transformation that contains the source code of the transformation.',
    required: true,
    default: [],
    options: [
      {
        name: 'Code',
        value: 'code_string_input',
      },
    ],
    displayOptions: {
      show: {
        transformation_create_object: ['input'],
        input: ['transformation_code'],
        resource: ['transformations'],
        operation: ['updateTransformation'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'The source code of the transformation.',
    displayName: 'Code',
    name: 'code_string_input',
    displayOptions: {
      show: {
        transformation_create_object: ['input'],
        transformation_code_object: ['code_string_input'],
        input: ['transformation_code'],
        resource: ['transformations'],
        operation: ['updateTransformation'],
      },
    },
    required: true,
  },
  {
    displayName: 'Transformation No Code',
    name: 'transformation_no_code_object',
    type: 'multiOptions',
    description: 'Input for a no-code transformation that contains a series of steps.',
    required: true,
    default: [],
    options: [
      {
        name: 'Steps',
        value: 'steps_json_input',
      },
    ],
    displayOptions: {
      show: {
        transformation_create_object: ['input'],
        input: ['transformation_no_code'],
        resource: ['transformations'],
        operation: ['updateTransformation'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Steps',
    name: 'steps_json_input',
    default: '[]',
    description: undefined,
    required: true,
    displayOptions: {
      show: {
        transformation_create_object: ['input'],
        transformation_no_code_object: ['steps_json_input'],
        input: ['transformation_no_code'],
        resource: ['transformations'],
        operation: ['updateTransformation'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'A descriptive name for your transformation of what it does.',
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
        transformation_create_object: ['description_string'],
        resource: ['transformations'],
        operation: ['updateTransformation'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Authentication IDs',
    name: 'authenticationIDs_json',
    default: '[]',
    description: 'The authentications associated with the current transformation.',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'authenticationIDs',
      },
    },
    displayOptions: {
      show: {
        transformation_create_object: ['authenticationIDs_json'],
        resource: ['transformations'],
        operation: ['updateTransformation'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of a transformation.',
    displayName: 'Transformation ID',
    name: 'transformationID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['transformations'],
        operation: ['deleteTransformation'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of a transformation.',
    displayName: 'Transformation ID',
    name: 'transformationID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['transformations'],
        operation: ['tryTransformationBeforeUpdate'],
      },
    },
  },
  {
    displayName: 'Transformation Try',
    name: 'transformation_try_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Code',
        value: 'code_string',
      },
      {
        name: 'Type',
        value: 'type_options',
      },
      {
        name: 'Input',
        value: 'input',
      },
      {
        name: 'Sample Record',
        value: 'sample_record_object',
      },
      {
        name: 'Authentications',
        value: 'authentications_json',
      },
    ],
    displayOptions: {
      show: {
        resource: ['transformations'],
        operation: ['tryTransformationBeforeUpdate'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description:
      'It is deprecated. Use the `input` field with proper `type` instead to specify the transformation code.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'code',
      },
    },
    displayName: 'Code',
    name: 'code_string',
    displayOptions: {
      show: {
        transformation_try_object: ['code_string'],
        resource: ['transformations'],
        operation: ['tryTransformationBeforeUpdate'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description: "The type of transformation, which can be either 'code' or 'noCode'.",
    options: [
      {
        name: 'code',
        value: 'code',
      },
      {
        name: 'noCode',
        value: 'noCode',
      },
    ],
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'type',
      },
    },
    displayName: 'Type',
    name: 'type_options',
    displayOptions: {
      show: {
        transformation_try_object: ['type_options'],
        resource: ['transformations'],
        operation: ['tryTransformationBeforeUpdate'],
      },
    },
  },
  {
    type: 'options',
    name: 'input',
    displayName: 'Input',
    default: '',
    options: [
      {
        name: 'Transformation code',
        value: 'transformation_code',
      },
      {
        name: 'Transformation no code',
        value: 'transformation_no_code',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'input',
        value:
          '={{ typeof $parameter.transformation_code_object !== "undefined" ? { "code": typeof $parameter.code_string_input !== "undefined" ? $parameter.code_string_input : undefined } : typeof $parameter.code_string_input !== "undefined" ? $parameter.code_string_input : typeof $parameter.transformation_no_code_object !== "undefined" ? { "steps": typeof $parameter.steps_json_input !== "undefined" ? JSON.parse($parameter.steps_json_input) : undefined } : typeof $parameter.steps_json_input !== "undefined" ? JSON.parse($parameter.steps_json_input) : undefined }}',
      },
    },
    displayOptions: {
      show: {
        transformation_try_object: ['input'],
        resource: ['transformations'],
        operation: ['tryTransformationBeforeUpdate'],
      },
    },
  },
  {
    displayName: 'Transformation Code',
    name: 'transformation_code_object',
    type: 'multiOptions',
    description: 'Input for a transformation that contains the source code of the transformation.',
    required: true,
    default: [],
    options: [
      {
        name: 'Code',
        value: 'code_string_input',
      },
    ],
    displayOptions: {
      show: {
        transformation_try_object: ['input'],
        input: ['transformation_code'],
        resource: ['transformations'],
        operation: ['tryTransformationBeforeUpdate'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'The source code of the transformation.',
    displayName: 'Code',
    name: 'code_string_input',
    displayOptions: {
      show: {
        transformation_try_object: ['input'],
        transformation_code_object: ['code_string_input'],
        input: ['transformation_code'],
        resource: ['transformations'],
        operation: ['tryTransformationBeforeUpdate'],
      },
    },
    required: true,
  },
  {
    displayName: 'Transformation No Code',
    name: 'transformation_no_code_object',
    type: 'multiOptions',
    description: 'Input for a no-code transformation that contains a series of steps.',
    required: true,
    default: [],
    options: [
      {
        name: 'Steps',
        value: 'steps_json_input',
      },
    ],
    displayOptions: {
      show: {
        transformation_try_object: ['input'],
        input: ['transformation_no_code'],
        resource: ['transformations'],
        operation: ['tryTransformationBeforeUpdate'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Steps',
    name: 'steps_json_input',
    default: '[]',
    description: undefined,
    required: true,
    displayOptions: {
      show: {
        transformation_try_object: ['input'],
        transformation_no_code_object: ['steps_json_input'],
        input: ['transformation_no_code'],
        resource: ['transformations'],
        operation: ['tryTransformationBeforeUpdate'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Sample Record',
    name: 'sample_record_object',
    description: 'The record to apply the given code to.',
    required: true,
    default: '{}',
    routing: {
      send: {
        type: 'body',
        property: 'sampleRecord',
        value: '={{ $value }}',
      },
    },
    displayOptions: {
      show: {
        transformation_try_object: ['sample_record_object'],
        resource: ['transformations'],
        operation: ['tryTransformationBeforeUpdate'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Authentications',
    name: 'authentications_json',
    default: '[]',
    description: undefined,
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'authentications',
      },
    },
    displayOptions: {
      show: {
        transformation_try_object: ['authentications_json'],
        resource: ['transformations'],
        operation: ['tryTransformationBeforeUpdate'],
      },
    },
  },
  {
    type: 'number',
    default: 10,
    description: 'Number of items per page.',
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
        resource: ['observability'],
        operation: ['listRuns'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description: 'Page of the API response to retrieve.',
    typeOptions: {
      minValue: 1,
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
        resource: ['observability'],
        operation: ['listRuns'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Status',
    name: 'status_json',
    default: '[]',
    description: undefined,
    required: false,
    routing: {
      request: {
        qs: {
          status: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['observability'],
        operation: ['listRuns'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Type',
    name: 'type_json',
    default: '[]',
    description: undefined,
    required: false,
    routing: {
      request: {
        qs: {
          type: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['observability'],
        operation: ['listRuns'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of a task.',
    routing: {
      request: {
        qs: {
          taskID: '={{ $value }}',
        },
      },
    },
    displayName: 'Task ID',
    name: 'taskID_string',
    displayOptions: {
      show: {
        resource: ['observability'],
        operation: ['listRuns'],
      },
    },
  },
  {
    type: 'options',
    default: 'createdAt',
    description: 'Property by which to sort the list of task runs.',
    options: [
      {
        name: 'status',
        value: 'status',
      },
      {
        name: 'updatedAt',
        value: 'updatedAt',
      },
      {
        name: 'createdAt',
        value: 'createdAt',
      },
    ],
    routing: {
      request: {
        qs: {
          sort: '={{ $value }}',
        },
      },
    },
    displayName: 'Sort',
    name: 'sort_options',
    displayOptions: {
      show: {
        resource: ['observability'],
        operation: ['listRuns'],
      },
    },
  },
  {
    type: 'options',
    default: 'desc',
    description: 'Ascending or descending sort order.',
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
          order: '={{ $value }}',
        },
      },
    },
    displayName: 'Order',
    name: 'order_options',
    displayOptions: {
      show: {
        resource: ['observability'],
        operation: ['listRuns'],
      },
    },
  },
  {
    type: 'string',
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
        resource: ['observability'],
        operation: ['listRuns'],
      },
    },
  },
  {
    type: 'string',
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
        resource: ['observability'],
        operation: ['listRuns'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of a task run.',
    displayName: 'Run ID',
    name: 'runID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['observability'],
        operation: ['getRun'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of a task run.',
    displayName: 'Run ID',
    name: 'runID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['observability'],
        operation: ['listEvents'],
      },
    },
  },
  {
    type: 'number',
    default: 10,
    description: 'Number of items per page.',
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
        resource: ['observability'],
        operation: ['listEvents'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description: 'Page of the API response to retrieve.',
    typeOptions: {
      minValue: 1,
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
        resource: ['observability'],
        operation: ['listEvents'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Status',
    name: 'status_json',
    default: '[]',
    description: undefined,
    required: false,
    routing: {
      request: {
        qs: {
          status: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['observability'],
        operation: ['listEvents'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Type',
    name: 'type_json',
    default: '[]',
    description: undefined,
    required: false,
    routing: {
      request: {
        qs: {
          type: '={{ $value }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['observability'],
        operation: ['listEvents'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description: 'Property by which to sort the list of task run events.',
    options: [
      {
        name: 'status',
        value: 'status',
      },
      {
        name: 'type',
        value: 'type',
      },
      {
        name: 'publishedAt',
        value: 'publishedAt',
      },
    ],
    routing: {
      request: {
        qs: {
          sort: '={{ $value }}',
        },
      },
    },
    displayName: 'Sort',
    name: 'sort_options',
    displayOptions: {
      show: {
        resource: ['observability'],
        operation: ['listEvents'],
      },
    },
  },
  {
    type: 'options',
    default: 'desc',
    description: 'Ascending or descending sort order.',
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
          order: '={{ $value }}',
        },
      },
    },
    displayName: 'Order',
    name: 'order_options',
    displayOptions: {
      show: {
        resource: ['observability'],
        operation: ['listEvents'],
      },
    },
  },
  {
    type: 'string',
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
        resource: ['observability'],
        operation: ['listEvents'],
      },
    },
  },
  {
    type: 'string',
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
        resource: ['observability'],
        operation: ['listEvents'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of a task run.',
    displayName: 'Run ID',
    name: 'runID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['observability'],
        operation: ['getEvent'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
    default: '',
    description: 'Universally unique identifier (UUID) of an event.',
    displayName: 'Event ID',
    name: 'eventID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['observability'],
        operation: ['getEvent'],
      },
    },
  },
];

export default properties;
