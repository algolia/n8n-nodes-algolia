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
        name: 'Advanced',
        value: 'Advanced',
        description: 'Query your logs',
      },
      {
        name: 'Api Keys',
        value: 'Api Keys',
        description: 'Manage your API keys',
      },
      {
        name: 'Clusters',
        value: 'Clusters',
        description: 'Multi-cluster operations',
      },
      {
        name: 'Dictionaries',
        value: 'Dictionaries',
        description: 'Manage your dictionaries',
      },
      {
        name: 'Indices',
        value: 'Indices',
        description: 'Manage your indices and index settings',
      },
      {
        name: 'Records',
        value: 'Records',
        description: 'Add, update, and delete records from your indices',
      },
      {
        name: 'Rules',
        value: 'Rules',
        description: 'Create, update, delete, and search for rules',
      },
      {
        name: 'Search',
        value: 'Search',
        description: 'Search one or more indices for matching records or facet values',
      },
      {
        name: 'Synonyms',
        value: 'Synonyms',
        description: 'Create, update, delete, and search for synonyms',
      },
      {
        name: 'Vaults',
        value: 'Vaults',
        description:
          'Algolia Vault lets you restrict access to your clusters to specific IP addresses and provides disk-level encryption at rest',
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
        name: 'Search an index',
        value: 'searchSingleIndex',
        action: 'Search an index',
        description: 'Searches a single index and returns matching search results as hits.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/query',
          },
          output: {
            postReceive: [
              async function (items) {
                const simple = this.getNodeParameter('simplify', 0);
                if (!simple) return items;
                return items.map((item) => {
                  const json = item.json || {};
                  const simplified = new Map();
                  ['hits', 'params', 'query'].forEach((f) => {
                    if (json[f] !== undefined) simplified.set(f, json[f]);
                  });
                  return { json: Object.fromEntries(simplified) };
                });
              },
            ],
          },
        },
        inputSchema: {
          simplifiedOutput: ['hits', 'params', 'query'],
        },
      },
      {
        name: 'Search multiple indices',
        value: 'search',
        action: 'Search multiple indices',
        description: 'Sends multiple search requests to one or more indices.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/indexes/*/queries',
          },
        },
      },
      {
        name: 'Search for facet values',
        value: 'searchForFacetValues',
        action: 'Search for facet values',
        description: 'Searches for values of a specified facet attribute.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/facets/{{ $parameter.facetName_string }}/query',
          },
        },
      },
      {
        name: 'Browse for records',
        value: 'browse',
        action: 'Browse for records',
        description: 'Retrieves records from an index, up to 1,000 per request.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/browse',
          },
          output: {
            postReceive: [
              async function (items) {
                const simple = this.getNodeParameter('simplify', 0);
                if (!simple) return items;
                return items.map((item) => {
                  const json = item.json || {};
                  const simplified = new Map();
                  ['hits', 'params', 'query'].forEach((f) => {
                    if (json[f] !== undefined) simplified.set(f, json[f]);
                  });
                  return { json: Object.fromEntries(simplified) };
                });
              },
            ],
          },
        },
        inputSchema: {
          simplifiedOutput: ['hits', 'params', 'query'],
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['Search'],
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
        resource: ['Search'],
        operation: ['searchSingleIndex', 'browse'],
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
        name: 'Add a new record (with auto-generated object ID)',
        value: 'saveObject',
        action: 'Add a new record (with auto-generated object ID)',
        description: 'Adds a record to an index or replaces it.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/indexes/{{ $parameter.indexName_string }}',
          },
        },
      },
      {
        name: 'Retrieve a record',
        value: 'getObject',
        action: 'Retrieve a record',
        description: 'Retrieves one record by its object ID.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/{{ $parameter.objectID_string }}',
          },
        },
      },
      {
        name: 'Add or replace a record',
        value: 'addOrUpdateObject',
        action: 'Add or replace a record',
        description:
          'If a record with the specified object ID exists, the existing record is replaced.',
        routing: {
          request: {
            method: 'PUT',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/{{ $parameter.objectID_string }}',
          },
        },
      },
      {
        name: 'Delete a record',
        value: 'deleteObject',
        action: 'Delete a record',
        description: 'Deletes a record by its object ID.',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/{{ $parameter.objectID_string }}',
          },
        },
      },
      {
        name: 'Delete records matching a filter',
        value: 'deleteBy',
        action: 'Delete records matching a filter',
        description: "This operation doesn't accept empty filters.",
        routing: {
          request: {
            method: 'POST',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/deleteByQuery',
          },
        },
      },
      {
        name: 'Delete all records from an index',
        value: 'clearObjects',
        action: 'Delete all records from an index',
        description:
          'Deletes only the records from an index while keeping settings, synonyms, and rules.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/clear',
          },
        },
      },
      {
        name: 'Add or update attributes',
        value: 'partialUpdateObject',
        action: 'Add or update attributes',
        description: 'Adds new attributes to a record, or updates existing ones.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/{{ $parameter.objectID_string }}/partial',
          },
        },
      },
      {
        name: 'Batch indexing operations on one index',
        value: 'batch',
        action: 'Batch indexing operations on one index',
        description: 'Adds, updates, or deletes records in one index with a single API request.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/batch',
          },
        },
      },
      {
        name: 'Batch indexing operations on multiple indices',
        value: 'multipleBatch',
        action: 'Batch indexing operations on multiple indices',
        description:
          'Adds, updates, or deletes records in multiple indices with a single API request.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/indexes/*/batch',
          },
        },
      },
      {
        name: 'Retrieve records',
        value: 'getObjects',
        action: 'Retrieve records',
        description: 'Retrieves one or more records, potentially from different indices.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/indexes/*/objects',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['Records'],
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
        name: 'Delete an index',
        value: 'deleteIndex',
        action: 'Delete an index',
        description: 'Deletes an index and all its settings.',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/1/indexes/{{ $parameter.indexName_string }}',
          },
        },
      },
      {
        name: 'Retrieve index settings',
        value: 'getSettings',
        action: 'Retrieve index settings',
        description: 'Retrieves an object with non-null index settings.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/settings',
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
                    'advancedSyntax',
                    'advancedSyntaxFeatures',
                    'allowCompressionOfIntegerArray',
                    'allowTyposOnNumericTokens',
                    'alternativesAsExact',
                    'attributeCriteriaComputedByMinProximity',
                    'attributeForDistinct',
                    'attributesForFaceting',
                    'attributesToHighlight',
                    'attributesToRetrieve',
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
            'advancedSyntax',
            'advancedSyntaxFeatures',
            'allowCompressionOfIntegerArray',
            'allowTyposOnNumericTokens',
            'alternativesAsExact',
            'attributeCriteriaComputedByMinProximity',
            'attributeForDistinct',
            'attributesForFaceting',
            'attributesToHighlight',
            'attributesToRetrieve',
          ],
        },
      },
      {
        name: 'Update index settings',
        value: 'setSettings',
        action: 'Update index settings',
        description: 'Update the specified index settings.',
        routing: {
          request: {
            method: 'PUT',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/settings',
          },
        },
      },
      {
        name: 'Check task status',
        value: 'getTask',
        action: 'Check task status',
        description: 'Checks the status of a given task.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/task/{{ $parameter.taskID_number }}',
          },
        },
      },
      {
        name: 'Copy or move an index',
        value: 'operationIndex',
        action: 'Copy or move an index',
        description: 'Copies or moves (renames) an index within the same Algolia application.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/operation',
          },
        },
      },
      {
        name: 'List indices',
        value: 'listIndices',
        action: 'List indices',
        description: 'Lists all indices in the current Algolia application.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/indexes',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['Indices'],
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
        resource: ['Indices'],
        operation: ['getSettings'],
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
        name: 'Retrieve a synonym',
        value: 'getSynonym',
        action: 'Retrieve a synonym',
        description: 'Retrieves a synonym by its ID.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/synonyms/{{ $parameter.objectID_string }}',
          },
        },
      },
      {
        name: 'Create or replace a synonym',
        value: 'saveSynonym',
        action: 'Create or replace a synonym',
        description:
          "If a synonym with the specified object ID doesn't exist, Algolia adds a new one.",
        routing: {
          request: {
            method: 'PUT',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/synonyms/{{ $parameter.objectID_string }}',
          },
        },
      },
      {
        name: 'Delete a synonym',
        value: 'deleteSynonym',
        action: 'Delete a synonym',
        description: 'Deletes a synonym by its ID.',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/synonyms/{{ $parameter.objectID_string }}',
          },
        },
      },
      {
        name: 'Create or replace synonyms',
        value: 'saveSynonyms',
        action: 'Create or replace synonyms',
        description: "If a synonym with the `objectID` doesn't exist, Algolia adds a new one.",
        routing: {
          request: {
            method: 'POST',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/synonyms/batch',
          },
        },
      },
      {
        name: 'Delete all synonyms',
        value: 'clearSynonyms',
        action: 'Delete all synonyms',
        description: 'Deletes all synonyms from the index.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/synonyms/clear',
          },
        },
      },
      {
        name: 'Search for synonyms',
        value: 'searchSynonyms',
        action: 'Search for synonyms',
        description: 'Searches for synonyms in your index.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/synonyms/search',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['Synonyms'],
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
        name: 'List API keys',
        value: 'listApiKeys',
        action: 'List API keys',
        description:
          'Lists all API keys associated with your Algolia application, including their permissions and restrictions.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/keys',
          },
        },
      },
      {
        name: 'Create an API key',
        value: 'addApiKey',
        action: 'Create an API key',
        description: 'Creates a new API key with specific permissions and restrictions.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/keys',
          },
        },
      },
      {
        name: 'Retrieve API key permissions',
        value: 'getApiKey',
        action: 'Retrieve API key permissions',
        description: 'Gets the permissions and restrictions of an API key.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/keys/{{ $parameter.key_string }}',
          },
        },
      },
      {
        name: 'Update an API key',
        value: 'updateApiKey',
        action: 'Update an API key',
        description: 'Replaces the permissions of an existing API key.',
        routing: {
          request: {
            method: 'PUT',
            url: '=/1/keys/{{ $parameter.key_string }}',
          },
        },
      },
      {
        name: 'Delete an API key',
        value: 'deleteApiKey',
        action: 'Delete an API key',
        description: 'Deletes the API key.',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/1/keys/{{ $parameter.key_string }}',
          },
        },
      },
      {
        name: 'Restore an API key',
        value: 'restoreApiKey',
        action: 'Restore an API key',
        description: 'Restores a deleted API key.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/keys/{{ $parameter.key_string }}/restore',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['Api Keys'],
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
        name: 'Retrieve a rule',
        value: 'getRule',
        action: 'Retrieve a rule',
        description: 'Retrieves a rule by its ID.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/rules/{{ $parameter.objectID_string }}',
          },
        },
      },
      {
        name: 'Create or replace a rule',
        value: 'saveRule',
        action: 'Create or replace a rule',
        description: "If a rule with the specified object ID doesn't exist, it's created.",
        routing: {
          request: {
            method: 'PUT',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/rules/{{ $parameter.objectID_string }}',
          },
        },
      },
      {
        name: 'Delete a rule',
        value: 'deleteRule',
        action: 'Delete a rule',
        description: 'Deletes a rule by its ID.',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/rules/{{ $parameter.objectID_string }}',
          },
        },
      },
      {
        name: 'Create or update rules',
        value: 'saveRules',
        action: 'Create or update rules',
        description: 'Create or update multiple rules.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/rules/batch',
          },
        },
      },
      {
        name: 'Delete all rules',
        value: 'clearRules',
        action: 'Delete all rules',
        description: 'Deletes all rules from the index.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/rules/clear',
          },
        },
      },
      {
        name: 'Search for rules',
        value: 'searchRules',
        action: 'Search for rules',
        description: 'Searches for rules in your index.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/rules/search',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['Rules'],
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
        name: 'Add or delete dictionary entries',
        value: 'batchDictionaryEntries',
        action: 'Add or delete dictionary entries',
        description:
          'Adds or deletes multiple entries from your plurals, segmentation, or stop word dictionaries.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/dictionaries/{{ $parameter.dictionaryName_options }}/batch',
          },
        },
      },
      {
        name: 'Search dictionary entries',
        value: 'searchDictionaryEntries',
        action: 'Search dictionary entries',
        description: 'Searches for standard and custom dictionary entries.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/dictionaries/{{ $parameter.dictionaryName_options }}/search',
          },
        },
      },
      {
        name: 'Retrieve dictionary settings',
        value: 'getDictionarySettings',
        action: 'Retrieve dictionary settings',
        description:
          'Retrieves the languages for which standard dictionary entries are turned off.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/dictionaries/*/settings',
          },
        },
      },
      {
        name: 'Update dictionary settings',
        value: 'setDictionarySettings',
        action: 'Update dictionary settings',
        description: 'Turns standard stop word dictionary entries on or off for a given language.',
        routing: {
          request: {
            method: 'PUT',
            url: '=/1/dictionaries/*/settings',
          },
        },
      },
      {
        name: 'List available languages',
        value: 'getDictionaryLanguages',
        action: 'List available languages',
        description:
          'Lists supported languages with their supported dictionary types and number of custom entries.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/dictionaries/*/languages',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['Dictionaries'],
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
        name: 'Assign or move a user ID',
        value: 'assignUserId',
        action: 'Assign or move a user ID',
        description: 'Assigns or moves a user ID to a cluster.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/clusters/mapping',
          },
        },
      },
      {
        name: 'List user IDs',
        value: 'listUserIds',
        action: 'List user IDs',
        description: 'Lists the userIDs assigned to a multi-cluster application.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/clusters/mapping',
          },
        },
      },
      {
        name: 'Assign multiple userIDs',
        value: 'batchAssignUserIds',
        action: 'Assign multiple userIDs',
        description: 'Assigns multiple user IDs to a cluster.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/clusters/mapping/batch',
          },
        },
      },
      {
        name: 'Get top user IDs',
        value: 'getTopUserIds',
        action: 'Get top user IDs',
        description: 'Get the IDs of the 10 users with the highest number of records per cluster.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/clusters/mapping/top',
          },
        },
      },
      {
        name: 'Retrieve user ID',
        value: 'getUserId',
        action: 'Retrieve user ID',
        description: 'Returns the user ID data stored in the mapping.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/clusters/mapping/{{ $parameter.userID_string }}',
          },
        },
      },
      {
        name: 'Delete user ID',
        value: 'removeUserId',
        action: 'Delete user ID',
        description: 'Deletes a user ID and its associated data from the clusters.',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/1/clusters/mapping/{{ $parameter.userID_string }}',
          },
        },
      },
      {
        name: 'List clusters',
        value: 'listClusters',
        action: 'List clusters',
        description: 'Lists the available clusters in a multi-cluster setup.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/clusters',
          },
        },
      },
      {
        name: 'Search for user IDs',
        value: 'searchUserIds',
        action: 'Search for user IDs',
        description: 'Since it can take a few seconds to get the data from the different clusters,',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/clusters/mapping/search',
          },
        },
      },
      {
        name: 'Get migration and user mapping status',
        value: 'hasPendingMappings',
        action: 'Get migration and user mapping status',
        description:
          'To determine when the time-consuming process of creating a large batch of users or migrating users from one cluster to another is complete, this operation retrieves the status of the process.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/clusters/mapping/pending',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['Clusters'],
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
        name: 'List allowed sources',
        value: 'getSources',
        action: 'List allowed sources',
        description: 'Retrieves all allowed IP addresses with access to your application.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/security/sources',
          },
        },
      },
      {
        name: 'Replace allowed sources',
        value: 'replaceSources',
        action: 'Replace allowed sources',
        description: 'Replaces the list of allowed sources.',
        routing: {
          request: {
            method: 'PUT',
            url: '=/1/security/sources',
          },
        },
      },
      {
        name: 'Add a source',
        value: 'appendSource',
        action: 'Add a source',
        description: 'Adds a source to the list of allowed sources.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/security/sources/append',
          },
        },
      },
      {
        name: 'Delete a source',
        value: 'deleteSource',
        action: 'Delete a source',
        description: 'Deletes a source from the list of allowed sources.',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/1/security/sources/{{ $parameter.source_string }}',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['Vaults'],
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
        name: 'Retrieve log entries',
        value: 'getLogs',
        action: 'Retrieve log entries',
        description:
          'The request must be authenticated by an API key with the [`logs` ACL](https://www.algolia.com/doc/guides/security/api-keys/#access-control-list-acl).',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/logs',
          },
        },
      },
      {
        name: 'Check application task status',
        value: 'getAppTask',
        action: 'Check application task status',
        description: 'Checks the status of a given application task.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/task/{{ $parameter.taskID_number }}',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['Advanced'],
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
        resource: ['Search'],
        operation: ['searchSingleIndex'],
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
    type: 'options',
    name: 'searchParams',
    displayName: 'Search Params',
    default: '',
    options: [
      {
        name: 'Search parameters as query string',
        value: 'search_parameters_as_query_string',
      },
      {
        name: 'Search parameters as object',
        value: 'search_parameters_as_object',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: undefined,
        value: '={{ undefined }}',
      },
    },
    displayOptions: {
      show: {
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'hitsPerPage=2&getRankingInfo=1',
    default: '',
    description: 'Search parameters as a URL-encoded query string.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'params',
      },
    },
    displayName: 'Params',
    name: 'params_string',
    displayOptions: {
      show: {
        searchParams: ['search_parameters_as_query_string'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'multiOptions',
    name: 'search_parameters_as_object',
    displayName: 'Search Parameters As Object',
    description: 'Each parameter value, including the `query` must not be larger than 512 bytes.',
    default: [],
    options: [
      {
        name: 'Query',
        value: 'query_string',
      },
      {
        name: 'Similar Query',
        value: 'similarquery_string',
      },
      {
        name: 'Filters',
        value: 'filters_string',
      },
      {
        name: 'Facet Filters',
        value: 'facetfilters',
      },
      {
        name: 'Optional Filters',
        value: 'optionalfilters',
      },
      {
        name: 'Numeric Filters',
        value: 'numericfilters',
      },
      {
        name: 'Tag Filters',
        value: 'tagfilters',
      },
      {
        name: 'Sum Or Filters Scores',
        value: 'sumorfiltersscores_boolean',
      },
      {
        name: 'Restrict Searchable Attributes',
        value: 'restrictsearchableattributes_json',
      },
      {
        name: 'Facets',
        value: 'facets_json',
      },
      {
        name: 'Faceting After Distinct',
        value: 'facetingafterdistinct_boolean',
      },
      {
        name: 'Page',
        value: 'page_number',
      },
      {
        name: 'Offset',
        value: 'offset_number',
      },
      {
        name: 'Length',
        value: 'length_number',
      },
      {
        name: 'Around Lat Lng',
        value: 'aroundlatlng_string',
      },
      {
        name: 'Around Lat Lng Via IP',
        value: 'aroundlatlngviaip_boolean',
      },
      {
        name: 'Around Radius',
        value: 'aroundradius',
      },
      {
        name: 'Around Precision',
        value: 'aroundprecision',
      },
      {
        name: 'Minimum Around Radius',
        value: 'minimumaroundradius_number',
      },
      {
        name: 'Inside Bounding Box',
        value: 'insideboundingbox',
      },
      {
        name: 'Inside Polygon',
        value: 'insidepolygon_json',
      },
      {
        name: 'Natural Languages',
        value: 'naturallanguages_json',
      },
      {
        name: 'Rule Contexts',
        value: 'rulecontexts_json',
      },
      {
        name: 'Personalization Impact',
        value: 'personalizationimpact_number',
      },
      {
        name: 'User Token',
        value: 'usertoken_string',
      },
      {
        name: 'Get Ranking Info',
        value: 'getrankinginfo_boolean',
      },
      {
        name: 'Synonyms',
        value: 'synonyms_boolean',
      },
      {
        name: 'Click Analytics',
        value: 'clickanalytics_boolean',
      },
      {
        name: 'Analytics',
        value: 'analytics_boolean',
      },
      {
        name: 'Analytics Tags',
        value: 'analyticstags_json',
      },
      {
        name: 'Percentile Computation',
        value: 'percentilecomputation_boolean',
      },
      {
        name: 'Enable ABTest',
        value: 'enableabtest_boolean',
      },
      {
        name: 'Attributes To Retrieve',
        value: 'attributestoretrieve_json',
      },
      {
        name: 'Ranking',
        value: 'ranking_json',
      },
      {
        name: 'Relevancy Strictness',
        value: 'relevancystrictness_number',
      },
      {
        name: 'Attributes To Highlight',
        value: 'attributestohighlight_json',
      },
      {
        name: 'Attributes To Snippet',
        value: 'attributestosnippet_json',
      },
      {
        name: 'Highlight Pre Tag',
        value: 'highlightpretag_string',
      },
      {
        name: 'Highlight Post Tag',
        value: 'highlightposttag_string',
      },
      {
        name: 'Snippet Ellipsis Text',
        value: 'snippetellipsistext_string',
      },
      {
        name: 'Restrict Highlight And Snippet Arrays',
        value: 'restricthighlightandsnippetarrays_boolean',
      },
      {
        name: 'Hits Per Page',
        value: 'hitsperpage_number',
      },
      {
        name: 'Min Word Sizefor1Typo',
        value: 'minwordsizefor1typo_number',
      },
      {
        name: 'Min Word Sizefor2Typos',
        value: 'minwordsizefor2typos_number',
      },
      {
        name: 'Typo Tolerance',
        value: 'typotolerance',
      },
      {
        name: 'Allow Typos On Numeric Tokens',
        value: 'allowtyposonnumerictokens_boolean',
      },
      {
        name: 'Disable Typo Tolerance On Attributes',
        value: 'disabletypotoleranceonattributes_json',
      },
      {
        name: 'Ignore Plurals',
        value: 'ignoreplurals',
      },
      {
        name: 'Remove Stop Words',
        value: 'removestopwords',
      },
      {
        name: 'Query Languages',
        value: 'querylanguages_json',
      },
      {
        name: 'Decompound Query',
        value: 'decompoundquery_boolean',
      },
      {
        name: 'Enable Rules',
        value: 'enablerules_boolean',
      },
      {
        name: 'Enable Personalization',
        value: 'enablepersonalization_boolean',
      },
      {
        name: 'Query Type',
        value: 'querytype_options',
      },
      {
        name: 'Remove Words If No Results',
        value: 'removewordsifnoresults_options',
      },
      {
        name: 'Mode',
        value: 'mode_options',
      },
      {
        name: 'Semantic Search',
        value: 'semantic_search_object',
      },
      {
        name: 'Advanced Syntax',
        value: 'advancedsyntax_boolean',
      },
      {
        name: 'Optional Words',
        value: 'optionalwords',
      },
      {
        name: 'Disable Exact On Attributes',
        value: 'disableexactonattributes_json',
      },
      {
        name: 'Exact On Single Word Query',
        value: 'exactonsinglewordquery_options',
      },
      {
        name: 'Alternatives As Exact',
        value: 'alternativesasexact_json',
      },
      {
        name: 'Advanced Syntax Features',
        value: 'advancedsyntaxfeatures_json',
      },
      {
        name: 'Distinct',
        value: 'distinct',
      },
      {
        name: 'Replace Synonyms In Highlight',
        value: 'replacesynonymsinhighlight_boolean',
      },
      {
        name: 'Min Proximity',
        value: 'minproximity_number',
      },
      {
        name: 'Response Fields',
        value: 'responsefields_json',
      },
      {
        name: 'Max Values Per Facet',
        value: 'maxvaluesperfacet_number',
      },
      {
        name: 'Sort Facet Values By',
        value: 'sortfacetvaluesby_string',
      },
      {
        name: 'Attribute Criteria Computed By Min Proximity',
        value: 'attributecriteriacomputedbyminproximity_boolean',
      },
      {
        name: 'Rendering Content',
        value: 'rendering_content_object',
      },
      {
        name: 'Enable Re Ranking',
        value: 'enablereranking_boolean',
      },
      {
        name: 'Re Ranking Apply Filter',
        value: 'rerankingapplyfilter',
      },
    ],
    displayOptions: {
      show: {
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Search query.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'query',
      },
    },
    displayName: 'Query',
    name: 'query_string',
    displayOptions: {
      show: {
        search_parameters_as_object: ['query_string'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'comedy drama crime Macy Buscemi',
    default: '',
    description:
      'Keywords to be used instead of the search query to conduct a more broader search\nUsing the `similarQuery` parameter changes other settings\n- `queryType` is set to `prefixNone`.\n- `removeStopWords` is set to true.\n- `words` is set as the first ranking criterion.\n- All remaining words are treated as `optionalWords`\nSince the `similarQuery` is supposed to do a broad search, they usually return many results.\nCombine it with `filters` to narrow down the list of results.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'similarQuery',
      },
    },
    displayName: 'Similar Query',
    name: 'similarQuery_string',
    displayOptions: {
      show: {
        search_parameters_as_object: ['similarquery_string'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '(category:Book OR category:Ebook) AND _tags:published',
    default: '',
    description:
      "Filter expression to only include items that match the filter criteria in the response.\n\nYou can use these filter expressions:\n\n- **Numeric filters.** `<facet> <op> <number>`, where `<op>` is one of `<`, `<=`, `=`, `!=`, `>`, `>=`.\n- **Ranges.** `<facet>:<lower> TO <upper>` where `<lower>` and `<upper>` are the lower and upper limits of the range (inclusive).\n- **Facet filters.** `<facet>:<value>` where `<facet>` is a facet attribute (case-sensitive) and `<value>` a facet value.\n- **Tag filters.** `_tags:<value>` or just `<value>` (case-sensitive).\n- **Boolean filters.** `<facet>: true | false`.\n\nYou can combine filters with `AND`, `OR`, and `NOT` operators with the following restrictions:\n\n- You can only combine filters of the same type with `OR`.\n  **Not supported:** `facet:value OR num > 3`.\n- You can't use `NOT` with combinations of filters.\n  **Not supported:** `NOT(facet:value OR facet:value)`\n- You can't combine conjunctions (`AND`) with `OR`.\n  **Not supported:** `facet:value OR (facet:value AND facet:value)`\n\nUse quotes around your filters, if the facet attribute name or facet value has spaces, keywords (`OR`, `AND`, `NOT`), or quotes.\nIf a facet attribute is an array, the filter matches if it matches at least one element of the array.\n\nFor more information, see [Filters](https://www.algolia.com/doc/guides/managing-results/refine-results/filtering).\n",
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'filters',
      },
    },
    displayName: 'Filters',
    name: 'filters_string',
    displayOptions: {
      show: {
        search_parameters_as_object: ['filters_string'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'options',
    name: 'facetFilters',
    displayName: 'Facet Filters',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'String',
        value: 'string',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'facetFilters',
        value:
          '={{ typeof $parameter.facetFilters_json !== "undefined" ? JSON.parse($parameter.facetFilters_json) : typeof $parameter.facetFilters_string !== "undefined" ? $parameter.facetFilters_string : undefined }}',
      },
    },
    displayOptions: {
      show: {
        search_parameters_as_object: ['facetfilters'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Facet Filters (Array)',
    name: 'facetFilters_json',
    default: '[]',
    description: undefined,
    required: false,
    displayOptions: {
      show: {
        facetFilters: ['array'],
        search_parameters_as_object: ['facetfilters'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    displayName: 'Facet Filters (String)',
    name: 'facetFilters_string',
    displayOptions: {
      show: {
        facetFilters: ['string'],
        search_parameters_as_object: ['facetfilters'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'options',
    name: 'optionalFilters',
    displayName: 'Optional Filters',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'String',
        value: 'string',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'optionalFilters',
        value:
          '={{ typeof $parameter.optionalFilters_json !== "undefined" ? JSON.parse($parameter.optionalFilters_json) : typeof $parameter.optionalFilters_string !== "undefined" ? $parameter.optionalFilters_string : undefined }}',
      },
    },
    displayOptions: {
      show: {
        search_parameters_as_object: ['optionalfilters'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Optional Filters (Array)',
    name: 'optionalFilters_json',
    default: '[]',
    description: undefined,
    required: false,
    displayOptions: {
      show: {
        optionalFilters: ['array'],
        search_parameters_as_object: ['optionalfilters'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    displayName: 'Optional Filters (String)',
    name: 'optionalFilters_string',
    displayOptions: {
      show: {
        optionalFilters: ['string'],
        search_parameters_as_object: ['optionalfilters'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'options',
    name: 'numericFilters',
    displayName: 'Numeric Filters',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'String',
        value: 'string',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'numericFilters',
        value:
          '={{ typeof $parameter.numericFilters_json !== "undefined" ? JSON.parse($parameter.numericFilters_json) : typeof $parameter.numericFilters_string !== "undefined" ? $parameter.numericFilters_string : undefined }}',
      },
    },
    displayOptions: {
      show: {
        search_parameters_as_object: ['numericfilters'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Numeric Filters (Array)',
    name: 'numericFilters_json',
    default: '[]',
    description: undefined,
    required: false,
    displayOptions: {
      show: {
        numericFilters: ['array'],
        search_parameters_as_object: ['numericfilters'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    displayName: 'Numeric Filters (String)',
    name: 'numericFilters_string',
    displayOptions: {
      show: {
        numericFilters: ['string'],
        search_parameters_as_object: ['numericfilters'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'options',
    name: 'tagFilters',
    displayName: 'Tag Filters',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'String',
        value: 'string',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'tagFilters',
        value:
          '={{ typeof $parameter.tagFilters_json !== "undefined" ? JSON.parse($parameter.tagFilters_json) : typeof $parameter.tagFilters_string !== "undefined" ? $parameter.tagFilters_string : undefined }}',
      },
    },
    displayOptions: {
      show: {
        search_parameters_as_object: ['tagfilters'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Tag Filters (Array)',
    name: 'tagFilters_json',
    default: '[]',
    description: undefined,
    required: false,
    displayOptions: {
      show: {
        tagFilters: ['array'],
        search_parameters_as_object: ['tagfilters'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    displayName: 'Tag Filters (String)',
    name: 'tagFilters_string',
    displayOptions: {
      show: {
        tagFilters: ['string'],
        search_parameters_as_object: ['tagfilters'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      'Whether to sum all filter scores\nIf true, all filter scores are summed.\nOtherwise, the maximum filter score is kept.\nFor more information, see [filter scores](https://www.algolia.com/doc/guides/managing-results/refine-results/filtering/in-depth/filter-scoring/#accumulating-scores-with-sumorfiltersscores).\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'sumOrFiltersScores',
      },
    },
    displayName: 'Sum Or Filters Scores',
    name: 'sumOrFiltersScores_boolean',
    displayOptions: {
      show: {
        search_parameters_as_object: ['sumorfiltersscores_boolean'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Restrict Searchable Attributes',
    name: 'restrictSearchableAttributes_json',
    default: '[]',
    description:
      'Restricts a search to a subset of your searchable attributes.\nAttribute names are case-sensitive.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'restrictSearchableAttributes',
      },
    },
    displayOptions: {
      show: {
        search_parameters_as_object: ['restrictsearchableattributes_json'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Facets',
    name: 'facets_json',
    default: '[]',
    description:
      'Facets for which to retrieve facet values that match the search criteria and the number of matching facet values\nTo retrieve all facets, use the wildcard character `*`.\nFor more information, see [facets](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/#contextual-facet-values-and-counts).\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'facets',
      },
    },
    displayOptions: {
      show: {
        search_parameters_as_object: ['facets_json'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      "Whether faceting should be applied after deduplication with `distinct`\nThis leads to accurate facet counts when using faceting in combination with `distinct`.\nIt's usually better to use `afterDistinct` modifiers in the `attributesForFaceting` setting,\nas `facetingAfterDistinct` only computes correct facet counts if all records have the same facet values for the `attributeForDistinct`.\n",
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'facetingAfterDistinct',
      },
    },
    displayName: 'Faceting After Distinct',
    name: 'facetingAfterDistinct_boolean',
    displayOptions: {
      show: {
        search_parameters_as_object: ['facetingafterdistinct_boolean'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description: 'Page of search results to retrieve.',
    typeOptions: {
      minValue: 0,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'page',
      },
    },
    displayName: 'Page',
    name: 'page_number',
    displayOptions: {
      show: {
        search_parameters_as_object: ['page_number'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description: 'Position of the first hit to retrieve.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'offset',
      },
    },
    displayName: 'Offset',
    name: 'offset_number',
    displayOptions: {
      show: {
        search_parameters_as_object: ['offset_number'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description: 'Number of hits to retrieve (used in combination with `offset`).',
    typeOptions: {
      minValue: 0,
      maxValue: 1000,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'length',
      },
    },
    displayName: 'Length',
    name: 'length_number',
    displayOptions: {
      show: {
        search_parameters_as_object: ['length_number'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '40.71,-74.01',
    default: '',
    description:
      'Coordinates for the center of a circle, expressed as a comma-separated string of latitude and longitude.\n\nOnly records included within a circle around this central location are included in the results.\nThe radius of the circle is determined by the `aroundRadius` and `minimumAroundRadius` settings.\nThis parameter is ignored if you also specify `insidePolygon` or `insideBoundingBox`.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'aroundLatLng',
      },
    },
    displayName: 'Around Lat Lng',
    name: 'aroundLatLng_string',
    displayOptions: {
      show: {
        search_parameters_as_object: ['aroundlatlng_string'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description: "Whether to obtain the coordinates from the request's IP address.",
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'aroundLatLngViaIP',
      },
    },
    displayName: 'Around Lat Lng Via IP',
    name: 'aroundLatLngViaIP_boolean',
    displayOptions: {
      show: {
        search_parameters_as_object: ['aroundlatlngviaip_boolean'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'options',
    name: 'aroundRadius',
    displayName: 'Around Radius',
    default: '',
    options: [
      {
        name: 'Integer',
        value: 'integer',
      },
      {
        name: 'All',
        value: 'all',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'aroundRadius',
        value:
          '={{ typeof $parameter.aroundRadius_number !== "undefined" ? $parameter.aroundRadius_number : typeof $parameter.aroundRadius_options !== "undefined" ? $parameter.aroundRadius_options : undefined }}',
      },
    },
    displayOptions: {
      show: {
        search_parameters_as_object: ['aroundradius'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description: 'Maximum search radius around a central location in meters.',
    typeOptions: {
      minValue: 1,
    },
    displayName: 'Around Radius (Integer)',
    name: 'aroundRadius_number',
    displayOptions: {
      show: {
        aroundRadius: ['integer'],
        search_parameters_as_object: ['aroundradius'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description: "Return all records with a valid `_geoloc` attribute. Don't filter by distance.",
    options: [
      {
        name: 'all',
        value: 'all',
      },
    ],
    displayName: 'Around Radius (All)',
    name: 'aroundRadius_options',
    displayOptions: {
      show: {
        aroundRadius: ['all'],
        search_parameters_as_object: ['aroundradius'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'options',
    name: 'aroundPrecision',
    displayName: 'Around Precision',
    default: '',
    options: [
      {
        name: 'Integer',
        value: 'integer',
      },
      {
        name: 'Range objects',
        value: 'range_objects',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'aroundPrecision',
        value:
          '={{ typeof $parameter.aroundPrecision_number !== "undefined" ? $parameter.aroundPrecision_number : typeof $parameter.aroundPrecision_json !== "undefined" ? JSON.parse($parameter.aroundPrecision_json) : undefined }}',
      },
    },
    displayOptions: {
      show: {
        search_parameters_as_object: ['aroundprecision'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'number',
    default: 10,
    description:
      'Distance in meters to group results by similar distances.\n\nFor example, if you set `aroundPrecision` to 100, records wihin 100 meters to the central coordinate are considered to have the same distance,\nas are records between 100 and 199 meters.\n',
    displayName: 'Around Precision (Integer)',
    name: 'aroundPrecision_number',
    displayOptions: {
      show: {
        aroundPrecision: ['integer'],
        search_parameters_as_object: ['aroundprecision'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Around Precision (Range Objects)',
    name: 'aroundPrecision_json',
    default: '[]',
    description: undefined,
    required: false,
    displayOptions: {
      show: {
        aroundPrecision: ['range_objects'],
        search_parameters_as_object: ['aroundprecision'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description:
      "Minimum radius (in meters) for a search around a location when `aroundRadius` isn't set.",
    typeOptions: {
      minValue: 1,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'minimumAroundRadius',
      },
    },
    displayName: 'Minimum Around Radius',
    name: 'minimumAroundRadius_number',
    displayOptions: {
      show: {
        search_parameters_as_object: ['minimumaroundradius_number'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'options',
    name: 'insideBoundingBox',
    displayName: 'Inside Bounding Box',
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
      {
        name: 'Inside bounding box array',
        value: 'inside_bounding_box_array',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'insideBoundingBox',
        value:
          '={{ typeof $parameter.insideBoundingBox_string !== "undefined" ? $parameter.insideBoundingBox_string : typeof $parameter.insideBoundingBox_null !== "undefined" ? JSON.parse($parameter.insideBoundingBox_null) : typeof $parameter.insideBoundingBox_json !== "undefined" ? JSON.parse($parameter.insideBoundingBox_json) : undefined }}',
      },
    },
    displayOptions: {
      show: {
        search_parameters_as_object: ['insideboundingbox'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    displayName: 'Inside Bounding Box (String)',
    name: 'insideBoundingBox_string',
    displayOptions: {
      show: {
        insideBoundingBox: ['string'],
        search_parameters_as_object: ['insideboundingbox'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Inside Bounding Box (Null)',
    name: 'insideBoundingBox_null',
    default: 'null',
    description: undefined,
    required: false,
    disabledOptions: {
      show: {
        insideBoundingBox: ['null'],
      },
    },
    displayOptions: {
      show: {
        insideBoundingBox: ['null'],
        search_parameters_as_object: ['insideboundingbox'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Inside Bounding Box (Inside Bounding Box Array)',
    name: 'insideBoundingBox_json',
    default: '[]',
    description:
      'Coordinates for a rectangular area in which to search.\n\nEach bounding box is defined by the two opposite points of its diagonal, and expressed as latitude and longitude pair:\n`[p1 lat, p1 long, p2 lat, p2 long]`.\nProvide multiple bounding boxes as nested arrays.\nFor more information, see [rectangular area](https://www.algolia.com/doc/guides/managing-results/refine-results/geolocation/#filtering-inside-rectangular-or-polygonal-areas).\n',
    required: false,
    displayOptions: {
      show: {
        insideBoundingBox: ['inside_bounding_box_array'],
        search_parameters_as_object: ['insideboundingbox'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Inside Polygon',
    name: 'insidePolygon_json',
    default: '[]',
    description:
      'Coordinates of a polygon in which to search.\n\nPolygons are defined by 3 to 10,000 points. Each point is represented by its latitude and longitude.\nProvide multiple polygons as nested arrays.\nFor more information, see [filtering inside polygons](https://www.algolia.com/doc/guides/managing-results/refine-results/geolocation/#filtering-inside-rectangular-or-polygonal-areas).\nThis parameter is ignored if you also specify `insideBoundingBox`.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'insidePolygon',
      },
    },
    displayOptions: {
      show: {
        search_parameters_as_object: ['insidepolygon_json'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Natural Languages',
    name: 'naturalLanguages_json',
    default: '[]',
    description:
      'ISO language codes that adjust settings that are useful for processing natural language queries (as opposed to keyword searches)\n- Sets `removeStopWords` and `ignorePlurals` to the list of provided languages.\n- Sets `removeWordsIfNoResults` to `allOptional`.\n- Adds a `natural_language` attribute to `ruleContexts` and `analyticsTags`.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'naturalLanguages',
      },
    },
    displayOptions: {
      show: {
        search_parameters_as_object: ['naturallanguages_json'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Rule Contexts',
    name: 'ruleContexts_json',
    default: '[]',
    description:
      'Assigns a rule context to the search query\n[Rule contexts](https://www.algolia.com/doc/guides/managing-results/rules/rules-overview/how-to/customize-search-results-by-platform/#whats-a-context) are strings that you can use to trigger matching rules.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'ruleContexts',
      },
    },
    displayOptions: {
      show: {
        search_parameters_as_object: ['rulecontexts_json'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'number',
    default: 100,
    description:
      'Impact that Personalization should have on this search\nThe higher this value is, the more Personalization determines the ranking compared to other factors.\nFor more information, see [Understanding Personalization impact](https://www.algolia.com/doc/guides/personalization/personalizing-results/in-depth/configuring-personalization/#understanding-personalization-impact).\n',
    typeOptions: {
      minValue: 0,
      maxValue: 100,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'personalizationImpact',
      },
    },
    displayName: 'Personalization Impact',
    name: 'personalizationImpact_number',
    displayOptions: {
      show: {
        search_parameters_as_object: ['personalizationimpact_number'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'test-user-123',
    default: '',
    description:
      'Unique pseudonymous or anonymous user identifier.\n\nThis helps with analytics and click and conversion events.\nFor more information, see [user token](https://www.algolia.com/doc/guides/sending-events/concepts/usertoken).\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'userToken',
      },
    },
    displayName: 'User Token',
    name: 'userToken_string',
    displayOptions: {
      show: {
        search_parameters_as_object: ['usertoken_string'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description: 'Whether the search response should include detailed ranking information.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'getRankingInfo',
      },
    },
    displayName: 'Get Ranking Info',
    name: 'getRankingInfo_boolean',
    displayOptions: {
      show: {
        search_parameters_as_object: ['getrankinginfo_boolean'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description: "Whether to take into account an index's synonyms for this search.",
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'synonyms',
      },
    },
    displayName: 'Synonyms',
    name: 'synonyms_boolean',
    displayOptions: {
      show: {
        search_parameters_as_object: ['synonyms_boolean'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      'Whether to include a `queryID` attribute in the response\nThe query ID is a unique identifier for a search query and is required for tracking [click and conversion events](https://www.algolia.com/doc/guides/sending-events/getting-started).\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'clickAnalytics',
      },
    },
    displayName: 'Click Analytics',
    name: 'clickAnalytics_boolean',
    displayOptions: {
      show: {
        search_parameters_as_object: ['clickanalytics_boolean'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description: 'Whether this search will be included in Analytics.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'analytics',
      },
    },
    displayName: 'Analytics',
    name: 'analytics_boolean',
    displayOptions: {
      show: {
        search_parameters_as_object: ['analytics_boolean'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Analytics Tags',
    name: 'analyticsTags_json',
    default: '[]',
    description:
      'Tags to apply to the query for [segmenting analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments).',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'analyticsTags',
      },
    },
    displayOptions: {
      show: {
        search_parameters_as_object: ['analyticstags_json'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description: 'Whether to include this search when calculating processing-time percentiles.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'percentileComputation',
      },
    },
    displayName: 'Percentile Computation',
    name: 'percentileComputation_boolean',
    displayOptions: {
      show: {
        search_parameters_as_object: ['percentilecomputation_boolean'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description: 'Whether to enable A/B testing for this search.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'enableABTest',
      },
    },
    displayName: 'Enable ABTest',
    name: 'enableABTest_boolean',
    displayOptions: {
      show: {
        search_parameters_as_object: ['enableabtest_boolean'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Attributes To Retrieve',
    name: 'attributesToRetrieve_json',
    default: '[]',
    description:
      'Attributes to include in the API response\nTo reduce the size of your response, you can retrieve only some of the attributes.\nAttribute names are case-sensitive\n- `*` retrieves all attributes, except attributes included in the `customRanking` and `unretrievableAttributes` settings.\n- To retrieve all attributes except a specific one, prefix the attribute with a dash and combine it with the `*`: `["*", "-ATTRIBUTE"]`.\n- The `objectID` attribute is always included.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'attributesToRetrieve',
      },
    },
    displayOptions: {
      show: {
        search_parameters_as_object: ['attributestoretrieve_json'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Ranking',
    name: 'ranking_json',
    default: '[]',
    description:
      'Determines the order in which Algolia returns your results.\n\nBy default, each entry corresponds to a [ranking criteria](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria).\nThe tie-breaking algorithm sequentially applies each criterion in the order they\'re specified.\nIf you configure a replica index for [sorting by an attribute](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/how-to/sort-by-attribute),\nyou put the sorting attribute at the top of the list.\n\n**Modifiers**\n\n- `asc("ATTRIBUTE")`.\n  Sort the index by the values of an attribute, in ascending order.\n- `desc("ATTRIBUTE")`.\n  Sort the index by the values of an attribute, in descending order.\n\nBefore you modify the default setting,\nyou should test your changes in the dashboard,\nand by [A/B testing](https://www.algolia.com/doc/guides/ab-testing/what-is-ab-testing).\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'ranking',
      },
    },
    displayOptions: {
      show: {
        search_parameters_as_object: ['ranking_json'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '90',
    default: 100,
    description:
      "Relevancy threshold below which less relevant results aren't included in the results\nYou can only set `relevancyStrictness` on [virtual replica indices](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/in-depth/replicas/#what-are-virtual-replicas).\nUse this setting to strike a balance between the relevance and number of returned results.\n",
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'relevancyStrictness',
      },
    },
    displayName: 'Relevancy Strictness',
    name: 'relevancyStrictness_number',
    displayOptions: {
      show: {
        search_parameters_as_object: ['relevancystrictness_number'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Attributes To Highlight',
    name: 'attributesToHighlight_json',
    default: '[]',
    description:
      'Attributes to highlight\nBy default, all searchable attributes are highlighted.\nUse `*` to highlight all attributes or use an empty array `[]` to turn off highlighting.\nAttribute names are case-sensitive\nWith highlighting, strings that match the search query are surrounded by HTML tags defined by `highlightPreTag` and `highlightPostTag`.\nYou can use this to visually highlight matching parts of a search query in your UI\nFor more information, see [Highlighting and snippeting](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/highlighting-snippeting/js).\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'attributesToHighlight',
      },
    },
    displayOptions: {
      show: {
        search_parameters_as_object: ['attributestohighlight_json'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Attributes To Snippet',
    name: 'attributesToSnippet_json',
    default: '[]',
    description:
      'Attributes for which to enable snippets.\nAttribute names are case-sensitive\nSnippets provide additional context to matched words.\nIf you enable snippets, they include 10 words, including the matched word.\nThe matched word will also be wrapped by HTML tags for highlighting.\nYou can adjust the number of words with the following notation: `ATTRIBUTE:NUMBER`,\nwhere `NUMBER` is the number of words to be extracted.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'attributesToSnippet',
      },
    },
    displayOptions: {
      show: {
        search_parameters_as_object: ['attributestosnippet_json'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'string',
    default: '<em>',
    description:
      'HTML tag to insert before the highlighted parts in all highlighted results and snippets.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'highlightPreTag',
      },
    },
    displayName: 'Highlight Pre Tag',
    name: 'highlightPreTag_string',
    displayOptions: {
      show: {
        search_parameters_as_object: ['highlightpretag_string'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'string',
    default: '</em>',
    description:
      'HTML tag to insert after the highlighted parts in all highlighted results and snippets.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'highlightPostTag',
      },
    },
    displayName: 'Highlight Post Tag',
    name: 'highlightPostTag_string',
    displayOptions: {
      show: {
        search_parameters_as_object: ['highlightposttag_string'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'string',
    default: '…',
    description: 'String used as an ellipsis indicator when a snippet is truncated.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'snippetEllipsisText',
      },
    },
    displayName: 'Snippet Ellipsis Text',
    name: 'snippetEllipsisText_string',
    displayOptions: {
      show: {
        search_parameters_as_object: ['snippetellipsistext_string'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      'Whether to restrict highlighting and snippeting to items that at least partially matched the search query.\nBy default, all items are highlighted and snippeted.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'restrictHighlightAndSnippetArrays',
      },
    },
    displayName: 'Restrict Highlight And Snippet Arrays',
    name: 'restrictHighlightAndSnippetArrays_boolean',
    displayOptions: {
      show: {
        search_parameters_as_object: ['restricthighlightandsnippetarrays_boolean'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'number',
    default: 20,
    description: 'Number of hits per page.',
    typeOptions: {
      minValue: 1,
      maxValue: 1000,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'hitsPerPage',
      },
    },
    displayName: 'Hits Per Page',
    name: 'hitsPerPage_number',
    displayOptions: {
      show: {
        search_parameters_as_object: ['hitsperpage_number'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'number',
    default: 4,
    description:
      'Minimum number of characters a word in the search query must contain to accept matches with [one typo](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/in-depth/configuring-typo-tolerance/#configuring-word-length-for-typos).',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'minWordSizefor1Typo',
      },
    },
    displayName: 'Min Word Sizefor1Typo',
    name: 'minWordSizefor1Typo_number',
    displayOptions: {
      show: {
        search_parameters_as_object: ['minwordsizefor1typo_number'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'number',
    default: 8,
    description:
      'Minimum number of characters a word in the search query must contain to accept matches with [two typos](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/in-depth/configuring-typo-tolerance/#configuring-word-length-for-typos).',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'minWordSizefor2Typos',
      },
    },
    displayName: 'Min Word Sizefor2Typos',
    name: 'minWordSizefor2Typos_number',
    displayOptions: {
      show: {
        search_parameters_as_object: ['minwordsizefor2typos_number'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'options',
    name: 'typoTolerance',
    displayName: 'Typo Tolerance',
    default: '',
    options: [
      {
        name: 'Boolean',
        value: 'boolean',
      },
      {
        name: 'Typo tolerance',
        value: 'typo_tolerance',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'typoTolerance',
        value:
          '={{ typeof $parameter.typoTolerance_boolean !== "undefined" ? $parameter.typoTolerance_boolean : typeof $parameter.typoTolerance_options !== "undefined" ? $parameter.typoTolerance_options : undefined }}',
      },
    },
    displayOptions: {
      show: {
        search_parameters_as_object: ['typotolerance'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description:
      'Whether typo tolerance is active. If true, matches with typos are included in the search results and rank after exact matches.',
    displayName: 'Typo Tolerance (Boolean)',
    name: 'typoTolerance_boolean',
    displayOptions: {
      show: {
        typoTolerance: ['boolean'],
        search_parameters_as_object: ['typotolerance'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description:
      '- `min`. Return matches with the lowest number of typos.\n  For example, if you have matches without typos, only include those.\n  But if there are no matches without typos (with 1 typo), include matches with 1 typo (2 typos).\n- `strict`. Return matches with the two lowest numbers of typos.\n  With `strict`, the Typo ranking criterion is applied first in the `ranking` setting.\n',
    options: [
      {
        name: 'min',
        value: 'min',
      },
      {
        name: 'strict',
        value: 'strict',
      },
      {
        name: 'true',
        value: 'true',
      },
      {
        name: 'false',
        value: 'false',
      },
    ],
    displayName: 'Typo Tolerance (Typo Tolerance)',
    name: 'typoTolerance_options',
    displayOptions: {
      show: {
        typoTolerance: ['typo_tolerance'],
        search_parameters_as_object: ['typotolerance'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description:
      'Whether to allow typos on numbers in the search query\nTurn off this setting to reduce the number of irrelevant matches\nwhen searching in large sets of similar numbers.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'allowTyposOnNumericTokens',
      },
    },
    displayName: 'Allow Typos On Numeric Tokens',
    name: 'allowTyposOnNumericTokens_boolean',
    displayOptions: {
      show: {
        search_parameters_as_object: ['allowtyposonnumerictokens_boolean'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Disable Typo Tolerance On Attributes',
    name: 'disableTypoToleranceOnAttributes_json',
    default: '[]',
    description:
      'Attributes for which you want to turn off [typo tolerance](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance).\nAttribute names are case-sensitive\nReturning only exact matches can help when\n- [Searching in hyphenated attributes](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/how-to/how-to-search-in-hyphenated-attributes).\n- Reducing the number of matches when you have too many.\n  This can happen with attributes that are long blocks of text, such as product descriptions\nConsider alternatives such as `disableTypoToleranceOnWords` or adding synonyms if your attributes have intentional unusual spellings that might look like typos.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'disableTypoToleranceOnAttributes',
      },
    },
    displayOptions: {
      show: {
        search_parameters_as_object: ['disabletypotoleranceonattributes_json'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'options',
    name: 'ignorePlurals',
    displayName: 'Ignore Plurals',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'Boolean string',
        value: 'boolean_string',
      },
      {
        name: 'Boolean',
        value: 'boolean',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'ignorePlurals',
        value:
          '={{ typeof $parameter.ignorePlurals_json !== "undefined" ? JSON.parse($parameter.ignorePlurals_json) : typeof $parameter.ignorePlurals_options !== "undefined" ? $parameter.ignorePlurals_options : typeof $parameter.ignorePlurals_boolean !== "undefined" ? $parameter.ignorePlurals_boolean : undefined }}',
      },
    },
    displayOptions: {
      show: {
        search_parameters_as_object: ['ignoreplurals'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Ignore Plurals (Array)',
    name: 'ignorePlurals_json',
    default: '[]',
    description:
      'ISO code for languages for which this feature should be active.\nThis overrides languages you set with `queryLanguages`.\n',
    required: false,
    displayOptions: {
      show: {
        ignorePlurals: ['array'],
        search_parameters_as_object: ['ignoreplurals'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    options: [
      {
        name: 'true',
        value: 'true',
      },
      {
        name: 'false',
        value: 'false',
      },
    ],
    displayName: 'Ignore Plurals (Boolean String)',
    name: 'ignorePlurals_options',
    displayOptions: {
      show: {
        ignorePlurals: ['boolean_string'],
        search_parameters_as_object: ['ignoreplurals'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      "If true, `ignorePlurals` is active for all languages included in `queryLanguages`, or for all supported languages, if `queryLanguges` is empty.\nIf false, singulars, plurals, and other declensions won't be considered equivalent.\n",
    displayName: 'Ignore Plurals (Boolean)',
    name: 'ignorePlurals_boolean',
    displayOptions: {
      show: {
        ignorePlurals: ['boolean'],
        search_parameters_as_object: ['ignoreplurals'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'options',
    name: 'removeStopWords',
    displayName: 'Remove Stop Words',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'Boolean',
        value: 'boolean',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'removeStopWords',
        value:
          '={{ typeof $parameter.removeStopWords_json !== "undefined" ? JSON.parse($parameter.removeStopWords_json) : typeof $parameter.removeStopWords_boolean !== "undefined" ? $parameter.removeStopWords_boolean : undefined }}',
      },
    },
    displayOptions: {
      show: {
        search_parameters_as_object: ['removestopwords'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Remove Stop Words (Array)',
    name: 'removeStopWords_json',
    default: '[]',
    description:
      'ISO code for languages for which stop words should be removed. This overrides languages you set in `queryLanguges`.',
    required: false,
    displayOptions: {
      show: {
        removeStopWords: ['array'],
        search_parameters_as_object: ['removestopwords'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      'If true, stop words are removed for all languages you included in `queryLanguages`, or for all supported languages, if `queryLanguages` is empty.\nIf false, stop words are not removed.\n',
    displayName: 'Remove Stop Words (Boolean)',
    name: 'removeStopWords_boolean',
    displayOptions: {
      show: {
        removeStopWords: ['boolean'],
        search_parameters_as_object: ['removestopwords'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Query Languages',
    name: 'queryLanguages_json',
    default: '[]',
    description:
      "Languages for language-specific query processing steps such as plurals, stop-word removal, and word-detection dictionaries \nThis setting sets a default list of languages used by the `removeStopWords` and `ignorePlurals` settings.\nThis setting also sets a dictionary for word detection in the logogram-based [CJK](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/normalization/#normalization-for-logogram-based-languages-cjk) languages.\nTo support this, you must place the CJK language **first** \n**You should always specify a query language.**\nIf you don't specify an indexing language, the search engine uses all [supported languages](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/supported-languages),\nor the languages you specified with the `ignorePlurals` or `removeStopWords` parameters.\nThis can lead to unexpected search results.\nFor more information, see [Language-specific configuration](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations).\n",
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'queryLanguages',
      },
    },
    displayOptions: {
      show: {
        search_parameters_as_object: ['querylanguages_json'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description:
      "Whether to split compound words in the query into their building blocks\nFor more information, see [Word segmentation](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations/#splitting-compound-words).\nWord segmentation is supported for these languages: German, Dutch, Finnish, Swedish, and Norwegian.\nDecompounding doesn't work for words with [non-spacing mark Unicode characters](https://www.charactercodes.net/category/non-spacing_mark).\nFor example, `Gartenstühle` won't be decompounded if the `ü` consists of `u` (U+0075) and `◌̈` (U+0308).\n",
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'decompoundQuery',
      },
    },
    displayName: 'Decompound Query',
    name: 'decompoundQuery_boolean',
    displayOptions: {
      show: {
        search_parameters_as_object: ['decompoundquery_boolean'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description: 'Whether to enable rules.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'enableRules',
      },
    },
    displayName: 'Enable Rules',
    name: 'enableRules_boolean',
    displayOptions: {
      show: {
        search_parameters_as_object: ['enablerules_boolean'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description: 'Whether to enable Personalization.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'enablePersonalization',
      },
    },
    displayName: 'Enable Personalization',
    name: 'enablePersonalization_boolean',
    displayOptions: {
      show: {
        search_parameters_as_object: ['enablepersonalization_boolean'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'options',
    default: 'prefixLast',
    description:
      'Determines if and how query words are interpreted as prefixes.\n\nBy default, only the last query word is treated as a prefix (`prefixLast`).\nTo turn off prefix search, use `prefixNone`.\nAvoid `prefixAll`, which treats all query words as prefixes.\nThis might lead to counterintuitive results and makes your search slower.\n\nFor more information, see [Prefix searching](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/prefix-searching).\n',
    options: [
      {
        name: 'prefixLast',
        value: 'prefixLast',
      },
      {
        name: 'prefixAll',
        value: 'prefixAll',
      },
      {
        name: 'prefixNone',
        value: 'prefixNone',
      },
    ],
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'queryType',
      },
    },
    displayName: 'Query Type',
    name: 'queryType_options',
    displayOptions: {
      show: {
        search_parameters_as_object: ['querytype_options'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'options',
    placeholder: 'firstWords',
    default: 'none',
    description:
      "Strategy for removing words from the query when it doesn't return any results.\nThis helps to avoid returning empty search results.\n\n- `none`.\n  No words are removed when a query doesn't return results.\n\n- `lastWords`.\n  Treat the last (then second to last, then third to last) word as optional,\n  until there are results or at most 5 words have been removed.\n\n- `firstWords`.\n  Treat the first (then second, then third) word as optional,\n  until there are results or at most 5 words have been removed.\n\n- `allOptional`.\n  Treat all words as optional.\n\nFor more information, see [Remove words to improve results](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/empty-or-insufficient-results/in-depth/why-use-remove-words-if-no-results).\n",
    options: [
      {
        name: 'none',
        value: 'none',
      },
      {
        name: 'lastWords',
        value: 'lastWords',
      },
      {
        name: 'firstWords',
        value: 'firstWords',
      },
      {
        name: 'allOptional',
        value: 'allOptional',
      },
    ],
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'removeWordsIfNoResults',
      },
    },
    displayName: 'Remove Words If No Results',
    name: 'removeWordsIfNoResults_options',
    displayOptions: {
      show: {
        search_parameters_as_object: ['removewordsifnoresults_options'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'options',
    default: 'keywordSearch',
    description:
      'Search mode the index will use to query for results.\n\nThis setting only applies to indices, for which Algolia enabled NeuralSearch for you.\n',
    options: [
      {
        name: 'neuralSearch',
        value: 'neuralSearch',
      },
      {
        name: 'keywordSearch',
        value: 'keywordSearch',
      },
    ],
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'mode',
      },
    },
    displayName: 'Mode',
    name: 'mode_options',
    displayOptions: {
      show: {
        search_parameters_as_object: ['mode_options'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'json',
    description:
      'Settings for the semantic search part of NeuralSearch.\nOnly used when `mode` is `neuralSearch`.\n',
    required: false,
    default: '{}',
    routing: {
      send: {
        type: 'body',
        property: 'semanticSearch',
        value: '={{ JSON.parse($value) }}',
      },
    },
    displayName: 'Semantic Search',
    name: 'semantic_search_object',
    displayOptions: {
      show: {
        search_parameters_as_object: ['semantic_search_object'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      'Whether to support phrase matching and excluding words from search queries\nUse the `advancedSyntaxFeatures` parameter to control which feature is supported.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'advancedSyntax',
      },
    },
    displayName: 'Advanced Syntax',
    name: 'advancedSyntax_boolean',
    displayOptions: {
      show: {
        search_parameters_as_object: ['advancedsyntax_boolean'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'options',
    name: 'optionalWords',
    displayName: 'Optional Words',
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
      {
        name: 'Optional words array',
        value: 'optional_words_array',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'optionalWords',
        value:
          '={{ typeof $parameter.optionalWords_string !== "undefined" ? $parameter.optionalWords_string : typeof $parameter.optionalWords_null !== "undefined" ? JSON.parse($parameter.optionalWords_null) : typeof $parameter.optionalWords_json !== "undefined" ? JSON.parse($parameter.optionalWords_json) : undefined }}',
      },
    },
    displayOptions: {
      show: {
        search_parameters_as_object: ['optionalwords'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    displayName: 'Optional Words (String)',
    name: 'optionalWords_string',
    displayOptions: {
      show: {
        optionalWords: ['string'],
        search_parameters_as_object: ['optionalwords'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Optional Words (Null)',
    name: 'optionalWords_null',
    default: 'null',
    description: undefined,
    required: false,
    disabledOptions: {
      show: {
        optionalWords: ['null'],
      },
    },
    displayOptions: {
      show: {
        optionalWords: ['null'],
        search_parameters_as_object: ['optionalwords'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Optional Words (Optional Words Array)',
    name: 'optionalWords_json',
    default: '[]',
    description:
      'List of [optional words](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/empty-or-insufficient-results/#creating-a-list-of-optional-words).',
    required: false,
    displayOptions: {
      show: {
        optionalWords: ['optional_words_array'],
        search_parameters_as_object: ['optionalwords'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Disable Exact On Attributes',
    name: 'disableExactOnAttributes_json',
    default: '[]',
    description:
      'Searchable attributes for which you want to [turn off the Exact ranking criterion](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/adjust-exact-settings/#turn-off-exact-for-some-attributes).\nAttribute names are case-sensitive\nThis can be useful for attributes with long values, where the likelihood of an exact match is high,\nsuch as product descriptions.\nTurning off the Exact ranking criterion for these attributes favors exact matching on other attributes.\nThis reduces the impact of individual attributes with a lot of content on ranking.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'disableExactOnAttributes',
      },
    },
    displayOptions: {
      show: {
        search_parameters_as_object: ['disableexactonattributes_json'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'options',
    default: 'attribute',
    description:
      'Determines how the [Exact ranking criterion](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/adjust-exact-settings/#turn-off-exact-for-some-attributes) is computed when the search query has only one word.\n\n- `attribute`.\n  The Exact ranking criterion is 1 if the query word and attribute value are the same.\n  For example, a search for "road" will match the value "road", but not "road trip".\n\n- `none`.\n  The Exact ranking criterion is ignored on single-word searches.\n\n- `word`.\n  The Exact ranking criterion is 1 if the query word is found in the attribute value.\n  The query word must have at least 3 characters and must not be a stop word.\n  Only exact matches will be highlighted,\n  partial and prefix matches won\'t.\n',
    options: [
      {
        name: 'attribute',
        value: 'attribute',
      },
      {
        name: 'none',
        value: 'none',
      },
      {
        name: 'word',
        value: 'word',
      },
    ],
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'exactOnSingleWordQuery',
      },
    },
    displayName: 'Exact On Single Word Query',
    name: 'exactOnSingleWordQuery_options',
    displayOptions: {
      show: {
        search_parameters_as_object: ['exactonsinglewordquery_options'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Alternatives As Exact',
    name: 'alternativesAsExact_json',
    default: '[]',
    description:
      'Determine which plurals and synonyms should be considered an exact matches\nBy default, Algolia treats singular and plural forms of a word, and single-word synonyms, as [exact](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/#exact) matches when searching.\nFor example\n- "swimsuit" and "swimsuits" are treated the same\n- "swimsuit" and "swimwear" are treated the same (if they are [synonyms](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/adding-synonyms/#regular-synonyms))\n- `ignorePlurals`.\n  Plurals and similar declensions added by the `ignorePlurals` setting are considered exact matches\n- `singleWordSynonym`.\n  Single-word synonyms, such as "NY" = "NYC", are considered exact matches\n- `multiWordsSynonym`.\n  Multi-word synonyms, such as "NY" = "New York", are considered exact matches.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'alternativesAsExact',
      },
    },
    displayOptions: {
      show: {
        search_parameters_as_object: ['alternativesasexact_json'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Advanced Syntax Features',
    name: 'advancedSyntaxFeatures_json',
    default: '[]',
    description:
      'Advanced search syntax features you want to support\n- `exactPhrase`.\n  Phrases in quotes must match exactly.\n  For example, `sparkly blue "iPhone case"` only returns records with the exact string "iPhone case"\n- `excludeWords`.\n  Query words prefixed with a `-` must not occur in a record.\n  For example, `search -engine` matches records that contain "search" but not "engine"\nThis setting only has an effect if `advancedSyntax` is true.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'advancedSyntaxFeatures',
      },
    },
    displayOptions: {
      show: {
        search_parameters_as_object: ['advancedsyntaxfeatures_json'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'options',
    name: 'distinct',
    displayName: 'Distinct',
    default: '',
    options: [
      {
        name: 'Boolean',
        value: 'boolean',
      },
      {
        name: 'Integer',
        value: 'integer',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'distinct',
        value:
          '={{ typeof $parameter.distinct_boolean !== "undefined" ? $parameter.distinct_boolean : typeof $parameter.distinct_number !== "undefined" ? $parameter.distinct_number : undefined }}',
      },
    },
    displayOptions: {
      show: {
        search_parameters_as_object: ['distinct'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      'Whether deduplication is turned on. If true, only one member of a group is shown in the search results.',
    displayName: 'Distinct (Boolean)',
    name: 'distinct_boolean',
    displayOptions: {
      show: {
        distinct: ['boolean'],
        search_parameters_as_object: ['distinct'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description:
      "Number of members of a group of records to include in the search results.\n\n- Don't use `distinct > 1` for records that might be [promoted by rules](https://www.algolia.com/doc/guides/managing-results/rules/merchandising-and-promoting/how-to/promote-hits).\n  The number of hits won't be correct and faceting won't work as expected.\n- With `distinct > 1`, the `hitsPerPage` parameter controls the number of returned groups.\n  For example, with `hitsPerPage: 10` and `distinct: 2`, up to 20 records are returned.\n  Likewise, the `nbHits` response attribute contains the number of returned groups.\n",
    typeOptions: {
      minValue: 0,
      maxValue: 4,
    },
    displayName: 'Distinct (Integer)',
    name: 'distinct_number',
    displayOptions: {
      show: {
        distinct: ['integer'],
        search_parameters_as_object: ['distinct'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      'Whether to replace a highlighted word with the matched synonym\nBy default, the original words are highlighted even if a synonym matches.\nFor example, with `home` as a synonym for `house` and a search for `home`,\nrecords matching either "home" or "house" are included in the search results,\nand either "home" or "house" are highlighted\nWith `replaceSynonymsInHighlight` set to `true`, a search for `home` still matches the same records,\nbut all occurrences of "house" are replaced by "home" in the highlighted response.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'replaceSynonymsInHighlight',
      },
    },
    displayName: 'Replace Synonyms In Highlight',
    name: 'replaceSynonymsInHighlight_boolean',
    displayOptions: {
      show: {
        search_parameters_as_object: ['replacesynonymsinhighlight_boolean'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'number',
    default: 1,
    description:
      'Minimum proximity score for two matching words\nThis adjusts the [Proximity ranking criterion](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/#proximity)\nby equally scoring matches that are farther apart\nFor example, if `minProximity` is 2, neighboring matches and matches with one word between them would have the same score.\n',
    typeOptions: {
      minValue: 1,
      maxValue: 7,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'minProximity',
      },
    },
    displayName: 'Min Proximity',
    name: 'minProximity_number',
    displayOptions: {
      show: {
        search_parameters_as_object: ['minproximity_number'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Response Fields',
    name: 'responseFields_json',
    default: '[]',
    description:
      "Properties to include in the API response of search and browse requests\nBy default, all response properties are included.\nTo reduce the response size, you can select which properties should be included\nAn empty list may lead to an empty API response (except properties you can't exclude)\nYou can't exclude these properties:\n`message`, `warning`, `cursor`, `abTestVariantID`,\nor any property added by setting `getRankingInfo` to true\nYour search depends on the `hits` field. If you omit this field, searches won't return any results.\nYour UI might also depend on other properties, for example, for pagination.\nBefore restricting the response size, check the impact on your search experience.\n",
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'responseFields',
      },
    },
    displayOptions: {
      show: {
        search_parameters_as_object: ['responsefields_json'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'number',
    default: 100,
    description: 'Maximum number of facet values to return for each facet.',
    typeOptions: {
      maxValue: 1000,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'maxValuesPerFacet',
      },
    },
    displayName: 'Max Values Per Facet',
    name: 'maxValuesPerFacet_number',
    displayOptions: {
      show: {
        search_parameters_as_object: ['maxvaluesperfacet_number'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'string',
    default: 'count',
    description:
      "Order in which to retrieve facet values\n- `count`.\n  Facet values are retrieved by decreasing count.\n  The count is the number of matching records containing this facet value\n- `alpha`.\n  Retrieve facet values alphabetically\nThis setting doesn't influence how facet values are displayed in your UI (see `renderingContent`).\nFor more information, see [facet value display](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/facet-display/js).\n",
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'sortFacetValuesBy',
      },
    },
    displayName: 'Sort Facet Values By',
    name: 'sortFacetValuesBy_string',
    displayOptions: {
      show: {
        search_parameters_as_object: ['sortfacetvaluesby_string'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      'Whether the best matching attribute should be determined by minimum proximity\nThis setting only affects ranking if the Attribute ranking criterion comes before Proximity in the `ranking` setting.\nIf true, the best matching attribute is selected based on the minimum proximity of multiple matches.\nOtherwise, the best matching attribute is determined by the order in the `searchableAttributes` setting.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'attributeCriteriaComputedByMinProximity',
      },
    },
    displayName: 'Attribute Criteria Computed By Min Proximity',
    name: 'attributeCriteriaComputedByMinProximity_boolean',
    displayOptions: {
      show: {
        search_parameters_as_object: ['attributecriteriacomputedbyminproximity_boolean'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'json',
    description:
      'Extra data that can be used in the search UI.\n\nYou can use this to control aspects of your search UI, such as the order of facet names and values\nwithout changing your frontend code.\n',
    required: false,
    default: '{}',
    routing: {
      send: {
        type: 'body',
        property: 'renderingContent',
        value: '={{ JSON.parse($value) }}',
      },
    },
    displayName: 'Rendering Content',
    name: 'rendering_content_object',
    displayOptions: {
      show: {
        search_parameters_as_object: ['rendering_content_object'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description:
      'Whether this search will use [Dynamic Re-Ranking](https://www.algolia.com/doc/guides/algolia-ai/re-ranking)\nThis setting only has an effect if you activated Dynamic Re-Ranking for this index in the Algolia dashboard.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'enableReRanking',
      },
    },
    displayName: 'Enable Re Ranking',
    name: 'enableReRanking_boolean',
    displayOptions: {
      show: {
        search_parameters_as_object: ['enablereranking_boolean'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'options',
    name: 'reRankingApplyFilter',
    displayName: 'Re Ranking Apply Filter',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
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
        property: 'reRankingApplyFilter',
        value:
          '={{ typeof $parameter.reRankingApplyFilter_json !== "undefined" ? JSON.parse($parameter.reRankingApplyFilter_json) : typeof $parameter.reRankingApplyFilter_string !== "undefined" ? $parameter.reRankingApplyFilter_string : typeof $parameter.reRankingApplyFilter_null !== "undefined" ? JSON.parse($parameter.reRankingApplyFilter_null) : undefined }}',
      },
    },
    displayOptions: {
      show: {
        search_parameters_as_object: ['rerankingapplyfilter'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Re Ranking Apply Filter (Array)',
    name: 'reRankingApplyFilter_json',
    default: '[]',
    description: undefined,
    required: false,
    displayOptions: {
      show: {
        reRankingApplyFilter: ['array'],
        search_parameters_as_object: ['rerankingapplyfilter'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    displayName: 'Re Ranking Apply Filter (String)',
    name: 'reRankingApplyFilter_string',
    displayOptions: {
      show: {
        reRankingApplyFilter: ['string'],
        search_parameters_as_object: ['rerankingapplyfilter'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Re Ranking Apply Filter (Null)',
    name: 'reRankingApplyFilter_null',
    default: 'null',
    description: undefined,
    required: false,
    disabledOptions: {
      show: {
        reRankingApplyFilter: ['null'],
      },
    },
    displayOptions: {
      show: {
        reRankingApplyFilter: ['null'],
        search_parameters_as_object: ['rerankingapplyfilter'],
        searchParams: ['search_parameters_as_object'],
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
  {
    displayName: 'Search Method Params',
    name: 'search_method_params_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Requests',
        value: 'requests_json',
      },
      {
        name: 'Strategy',
        value: 'strategy_options',
      },
    ],
    displayOptions: {
      show: {
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Requests',
    name: 'requests_json',
    default: '[]',
    description: undefined,
    required: true,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'requests',
      },
    },
    displayOptions: {
      show: {
        search_method_params_object: ['requests_json'],
        resource: ['Search'],
        operation: ['search'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description:
      'Strategy for multiple search queries:\n\n- `none`. Run all queries.\n- `stopIfEnoughMatches`. Run the queries one by one, stopping as soon as a query matches at least the `hitsPerPage` number of results.\n',
    options: [
      {
        name: 'none',
        value: 'none',
      },
      {
        name: 'stopIfEnoughMatches',
        value: 'stopIfEnoughMatches',
      },
    ],
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'strategy',
      },
    },
    displayName: 'Strategy',
    name: 'strategy_options',
    displayOptions: {
      show: {
        search_method_params_object: ['strategy_options'],
        resource: ['Search'],
        operation: ['search'],
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
        resource: ['Search'],
        operation: ['searchForFacetValues'],
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
    type: 'string',
    default: '',
    displayName: 'Facet Name',
    name: 'facetName_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    displayName: 'Search For Facet Values Request',
    name: 'search_for_facet_values_request_object',
    type: 'multiOptions',
    description: undefined,
    required: false,
    default: [],
    options: [
      {
        name: 'Params',
        value: 'params_string',
      },
      {
        name: 'Facet Query',
        value: 'facetQuery_string',
      },
      {
        name: 'Max Facet Hits',
        value: 'maxFacetHits_number',
      },
    ],
    displayOptions: {
      show: {
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'hitsPerPage=2&getRankingInfo=1',
    default: '',
    description: 'Search parameters as a URL-encoded query string.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'params',
      },
    },
    displayName: 'Params',
    name: 'params_string',
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['params_string'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'george',
    default: '',
    description: "Text to search inside the facet's values.",
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'facetQuery',
      },
    },
    displayName: 'Facet Query',
    name: 'facetQuery_string',
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['facetQuery_string'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'number',
    default: 10,
    description:
      'Maximum number of facet values to return when [searching for facet values](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/#search-for-facet-values).',
    typeOptions: {
      maxValue: 100,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'maxFacetHits',
      },
    },
    displayName: 'Max Facet Hits',
    name: 'maxFacetHits_number',
    displayOptions: {
      show: {
        search_for_facet_values_request_object: ['maxFacetHits_number'],
        resource: ['Search'],
        operation: ['searchForFacetValues'],
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
        resource: ['Search'],
        operation: ['browse'],
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
    type: 'options',
    name: 'browseParams',
    displayName: 'Browse Params',
    default: '',
    options: [
      {
        name: 'Search parameters as query string',
        value: 'search_parameters_as_query_string',
      },
      {
        name: 'Browse params object',
        value: 'browse_params_object',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: undefined,
        value: '={{ undefined }}',
      },
    },
    displayOptions: {
      show: {
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'hitsPerPage=2&getRankingInfo=1',
    default: '',
    description: 'Search parameters as a URL-encoded query string.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'params',
      },
    },
    displayName: 'Params',
    name: 'params_string',
    displayOptions: {
      show: {
        browseParams: ['search_parameters_as_query_string'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'multiOptions',
    name: 'browse_params_object',
    displayName: 'Browse Params Object',
    description: undefined,
    default: [],
    options: [
      {
        name: 'Query',
        value: 'query_string',
      },
      {
        name: 'Similar Query',
        value: 'similarquery_string',
      },
      {
        name: 'Filters',
        value: 'filters_string',
      },
      {
        name: 'Facet Filters',
        value: 'facetfilters',
      },
      {
        name: 'Optional Filters',
        value: 'optionalfilters',
      },
      {
        name: 'Numeric Filters',
        value: 'numericfilters',
      },
      {
        name: 'Tag Filters',
        value: 'tagfilters',
      },
      {
        name: 'Sum Or Filters Scores',
        value: 'sumorfiltersscores_boolean',
      },
      {
        name: 'Restrict Searchable Attributes',
        value: 'restrictsearchableattributes_json',
      },
      {
        name: 'Facets',
        value: 'facets_json',
      },
      {
        name: 'Faceting After Distinct',
        value: 'facetingafterdistinct_boolean',
      },
      {
        name: 'Page',
        value: 'page_number',
      },
      {
        name: 'Offset',
        value: 'offset_number',
      },
      {
        name: 'Length',
        value: 'length_number',
      },
      {
        name: 'Around Lat Lng',
        value: 'aroundlatlng_string',
      },
      {
        name: 'Around Lat Lng Via IP',
        value: 'aroundlatlngviaip_boolean',
      },
      {
        name: 'Around Radius',
        value: 'aroundradius',
      },
      {
        name: 'Around Precision',
        value: 'aroundprecision',
      },
      {
        name: 'Minimum Around Radius',
        value: 'minimumaroundradius_number',
      },
      {
        name: 'Inside Bounding Box',
        value: 'insideboundingbox',
      },
      {
        name: 'Inside Polygon',
        value: 'insidepolygon_json',
      },
      {
        name: 'Natural Languages',
        value: 'naturallanguages_json',
      },
      {
        name: 'Rule Contexts',
        value: 'rulecontexts_json',
      },
      {
        name: 'Personalization Impact',
        value: 'personalizationimpact_number',
      },
      {
        name: 'User Token',
        value: 'usertoken_string',
      },
      {
        name: 'Get Ranking Info',
        value: 'getrankinginfo_boolean',
      },
      {
        name: 'Synonyms',
        value: 'synonyms_boolean',
      },
      {
        name: 'Click Analytics',
        value: 'clickanalytics_boolean',
      },
      {
        name: 'Analytics',
        value: 'analytics_boolean',
      },
      {
        name: 'Analytics Tags',
        value: 'analyticstags_json',
      },
      {
        name: 'Percentile Computation',
        value: 'percentilecomputation_boolean',
      },
      {
        name: 'Enable ABTest',
        value: 'enableabtest_boolean',
      },
      {
        name: 'Attributes To Retrieve',
        value: 'attributestoretrieve_json',
      },
      {
        name: 'Ranking',
        value: 'ranking_json',
      },
      {
        name: 'Relevancy Strictness',
        value: 'relevancystrictness_number',
      },
      {
        name: 'Attributes To Highlight',
        value: 'attributestohighlight_json',
      },
      {
        name: 'Attributes To Snippet',
        value: 'attributestosnippet_json',
      },
      {
        name: 'Highlight Pre Tag',
        value: 'highlightpretag_string',
      },
      {
        name: 'Highlight Post Tag',
        value: 'highlightposttag_string',
      },
      {
        name: 'Snippet Ellipsis Text',
        value: 'snippetellipsistext_string',
      },
      {
        name: 'Restrict Highlight And Snippet Arrays',
        value: 'restricthighlightandsnippetarrays_boolean',
      },
      {
        name: 'Hits Per Page',
        value: 'hitsperpage_number',
      },
      {
        name: 'Min Word Sizefor1Typo',
        value: 'minwordsizefor1typo_number',
      },
      {
        name: 'Min Word Sizefor2Typos',
        value: 'minwordsizefor2typos_number',
      },
      {
        name: 'Typo Tolerance',
        value: 'typotolerance',
      },
      {
        name: 'Allow Typos On Numeric Tokens',
        value: 'allowtyposonnumerictokens_boolean',
      },
      {
        name: 'Disable Typo Tolerance On Attributes',
        value: 'disabletypotoleranceonattributes_json',
      },
      {
        name: 'Ignore Plurals',
        value: 'ignoreplurals',
      },
      {
        name: 'Remove Stop Words',
        value: 'removestopwords',
      },
      {
        name: 'Query Languages',
        value: 'querylanguages_json',
      },
      {
        name: 'Decompound Query',
        value: 'decompoundquery_boolean',
      },
      {
        name: 'Enable Rules',
        value: 'enablerules_boolean',
      },
      {
        name: 'Enable Personalization',
        value: 'enablepersonalization_boolean',
      },
      {
        name: 'Query Type',
        value: 'querytype_options',
      },
      {
        name: 'Remove Words If No Results',
        value: 'removewordsifnoresults_options',
      },
      {
        name: 'Mode',
        value: 'mode_options',
      },
      {
        name: 'Semantic Search',
        value: 'semantic_search_object',
      },
      {
        name: 'Advanced Syntax',
        value: 'advancedsyntax_boolean',
      },
      {
        name: 'Optional Words',
        value: 'optionalwords',
      },
      {
        name: 'Disable Exact On Attributes',
        value: 'disableexactonattributes_json',
      },
      {
        name: 'Exact On Single Word Query',
        value: 'exactonsinglewordquery_options',
      },
      {
        name: 'Alternatives As Exact',
        value: 'alternativesasexact_json',
      },
      {
        name: 'Advanced Syntax Features',
        value: 'advancedsyntaxfeatures_json',
      },
      {
        name: 'Distinct',
        value: 'distinct',
      },
      {
        name: 'Replace Synonyms In Highlight',
        value: 'replacesynonymsinhighlight_boolean',
      },
      {
        name: 'Min Proximity',
        value: 'minproximity_number',
      },
      {
        name: 'Response Fields',
        value: 'responsefields_json',
      },
      {
        name: 'Max Values Per Facet',
        value: 'maxvaluesperfacet_number',
      },
      {
        name: 'Sort Facet Values By',
        value: 'sortfacetvaluesby_string',
      },
      {
        name: 'Attribute Criteria Computed By Min Proximity',
        value: 'attributecriteriacomputedbyminproximity_boolean',
      },
      {
        name: 'Rendering Content',
        value: 'rendering_content_object',
      },
      {
        name: 'Enable Re Ranking',
        value: 'enablereranking_boolean',
      },
      {
        name: 'Re Ranking Apply Filter',
        value: 'rerankingapplyfilter',
      },
      {
        name: 'Cursor',
        value: 'cursor_string',
      },
    ],
    displayOptions: {
      show: {
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Search query.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'query',
      },
    },
    displayName: 'Query',
    name: 'query_string',
    displayOptions: {
      show: {
        browse_params_object: ['query_string'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'comedy drama crime Macy Buscemi',
    default: '',
    description:
      'Keywords to be used instead of the search query to conduct a more broader search\nUsing the `similarQuery` parameter changes other settings\n- `queryType` is set to `prefixNone`.\n- `removeStopWords` is set to true.\n- `words` is set as the first ranking criterion.\n- All remaining words are treated as `optionalWords`\nSince the `similarQuery` is supposed to do a broad search, they usually return many results.\nCombine it with `filters` to narrow down the list of results.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'similarQuery',
      },
    },
    displayName: 'Similar Query',
    name: 'similarQuery_string',
    displayOptions: {
      show: {
        browse_params_object: ['similarquery_string'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '(category:Book OR category:Ebook) AND _tags:published',
    default: '',
    description:
      "Filter expression to only include items that match the filter criteria in the response.\n\nYou can use these filter expressions:\n\n- **Numeric filters.** `<facet> <op> <number>`, where `<op>` is one of `<`, `<=`, `=`, `!=`, `>`, `>=`.\n- **Ranges.** `<facet>:<lower> TO <upper>` where `<lower>` and `<upper>` are the lower and upper limits of the range (inclusive).\n- **Facet filters.** `<facet>:<value>` where `<facet>` is a facet attribute (case-sensitive) and `<value>` a facet value.\n- **Tag filters.** `_tags:<value>` or just `<value>` (case-sensitive).\n- **Boolean filters.** `<facet>: true | false`.\n\nYou can combine filters with `AND`, `OR`, and `NOT` operators with the following restrictions:\n\n- You can only combine filters of the same type with `OR`.\n  **Not supported:** `facet:value OR num > 3`.\n- You can't use `NOT` with combinations of filters.\n  **Not supported:** `NOT(facet:value OR facet:value)`\n- You can't combine conjunctions (`AND`) with `OR`.\n  **Not supported:** `facet:value OR (facet:value AND facet:value)`\n\nUse quotes around your filters, if the facet attribute name or facet value has spaces, keywords (`OR`, `AND`, `NOT`), or quotes.\nIf a facet attribute is an array, the filter matches if it matches at least one element of the array.\n\nFor more information, see [Filters](https://www.algolia.com/doc/guides/managing-results/refine-results/filtering).\n",
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'filters',
      },
    },
    displayName: 'Filters',
    name: 'filters_string',
    displayOptions: {
      show: {
        browse_params_object: ['filters_string'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'options',
    name: 'facetFilters',
    displayName: 'Facet Filters',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'String',
        value: 'string',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'facetFilters',
        value:
          '={{ typeof $parameter.facetFilters_json !== "undefined" ? JSON.parse($parameter.facetFilters_json) : typeof $parameter.facetFilters_string !== "undefined" ? $parameter.facetFilters_string : undefined }}',
      },
    },
    displayOptions: {
      show: {
        browse_params_object: ['facetfilters'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Facet Filters (Array)',
    name: 'facetFilters_json',
    default: '[]',
    description: undefined,
    required: false,
    displayOptions: {
      show: {
        facetFilters: ['array'],
        browse_params_object: ['facetfilters'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    displayName: 'Facet Filters (String)',
    name: 'facetFilters_string',
    displayOptions: {
      show: {
        facetFilters: ['string'],
        browse_params_object: ['facetfilters'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'options',
    name: 'optionalFilters',
    displayName: 'Optional Filters',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'String',
        value: 'string',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'optionalFilters',
        value:
          '={{ typeof $parameter.optionalFilters_json !== "undefined" ? JSON.parse($parameter.optionalFilters_json) : typeof $parameter.optionalFilters_string !== "undefined" ? $parameter.optionalFilters_string : undefined }}',
      },
    },
    displayOptions: {
      show: {
        browse_params_object: ['optionalfilters'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Optional Filters (Array)',
    name: 'optionalFilters_json',
    default: '[]',
    description: undefined,
    required: false,
    displayOptions: {
      show: {
        optionalFilters: ['array'],
        browse_params_object: ['optionalfilters'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    displayName: 'Optional Filters (String)',
    name: 'optionalFilters_string',
    displayOptions: {
      show: {
        optionalFilters: ['string'],
        browse_params_object: ['optionalfilters'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'options',
    name: 'numericFilters',
    displayName: 'Numeric Filters',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'String',
        value: 'string',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'numericFilters',
        value:
          '={{ typeof $parameter.numericFilters_json !== "undefined" ? JSON.parse($parameter.numericFilters_json) : typeof $parameter.numericFilters_string !== "undefined" ? $parameter.numericFilters_string : undefined }}',
      },
    },
    displayOptions: {
      show: {
        browse_params_object: ['numericfilters'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Numeric Filters (Array)',
    name: 'numericFilters_json',
    default: '[]',
    description: undefined,
    required: false,
    displayOptions: {
      show: {
        numericFilters: ['array'],
        browse_params_object: ['numericfilters'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    displayName: 'Numeric Filters (String)',
    name: 'numericFilters_string',
    displayOptions: {
      show: {
        numericFilters: ['string'],
        browse_params_object: ['numericfilters'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'options',
    name: 'tagFilters',
    displayName: 'Tag Filters',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'String',
        value: 'string',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'tagFilters',
        value:
          '={{ typeof $parameter.tagFilters_json !== "undefined" ? JSON.parse($parameter.tagFilters_json) : typeof $parameter.tagFilters_string !== "undefined" ? $parameter.tagFilters_string : undefined }}',
      },
    },
    displayOptions: {
      show: {
        browse_params_object: ['tagfilters'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Tag Filters (Array)',
    name: 'tagFilters_json',
    default: '[]',
    description: undefined,
    required: false,
    displayOptions: {
      show: {
        tagFilters: ['array'],
        browse_params_object: ['tagfilters'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    displayName: 'Tag Filters (String)',
    name: 'tagFilters_string',
    displayOptions: {
      show: {
        tagFilters: ['string'],
        browse_params_object: ['tagfilters'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      'Whether to sum all filter scores\nIf true, all filter scores are summed.\nOtherwise, the maximum filter score is kept.\nFor more information, see [filter scores](https://www.algolia.com/doc/guides/managing-results/refine-results/filtering/in-depth/filter-scoring/#accumulating-scores-with-sumorfiltersscores).\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'sumOrFiltersScores',
      },
    },
    displayName: 'Sum Or Filters Scores',
    name: 'sumOrFiltersScores_boolean',
    displayOptions: {
      show: {
        browse_params_object: ['sumorfiltersscores_boolean'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Restrict Searchable Attributes',
    name: 'restrictSearchableAttributes_json',
    default: '[]',
    description:
      'Restricts a search to a subset of your searchable attributes.\nAttribute names are case-sensitive.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'restrictSearchableAttributes',
      },
    },
    displayOptions: {
      show: {
        browse_params_object: ['restrictsearchableattributes_json'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Facets',
    name: 'facets_json',
    default: '[]',
    description:
      'Facets for which to retrieve facet values that match the search criteria and the number of matching facet values\nTo retrieve all facets, use the wildcard character `*`.\nFor more information, see [facets](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/#contextual-facet-values-and-counts).\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'facets',
      },
    },
    displayOptions: {
      show: {
        browse_params_object: ['facets_json'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      "Whether faceting should be applied after deduplication with `distinct`\nThis leads to accurate facet counts when using faceting in combination with `distinct`.\nIt's usually better to use `afterDistinct` modifiers in the `attributesForFaceting` setting,\nas `facetingAfterDistinct` only computes correct facet counts if all records have the same facet values for the `attributeForDistinct`.\n",
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'facetingAfterDistinct',
      },
    },
    displayName: 'Faceting After Distinct',
    name: 'facetingAfterDistinct_boolean',
    displayOptions: {
      show: {
        browse_params_object: ['facetingafterdistinct_boolean'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description: 'Page of search results to retrieve.',
    typeOptions: {
      minValue: 0,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'page',
      },
    },
    displayName: 'Page',
    name: 'page_number',
    displayOptions: {
      show: {
        browse_params_object: ['page_number'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description: 'Position of the first hit to retrieve.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'offset',
      },
    },
    displayName: 'Offset',
    name: 'offset_number',
    displayOptions: {
      show: {
        browse_params_object: ['offset_number'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description: 'Number of hits to retrieve (used in combination with `offset`).',
    typeOptions: {
      minValue: 0,
      maxValue: 1000,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'length',
      },
    },
    displayName: 'Length',
    name: 'length_number',
    displayOptions: {
      show: {
        browse_params_object: ['length_number'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '40.71,-74.01',
    default: '',
    description:
      'Coordinates for the center of a circle, expressed as a comma-separated string of latitude and longitude.\n\nOnly records included within a circle around this central location are included in the results.\nThe radius of the circle is determined by the `aroundRadius` and `minimumAroundRadius` settings.\nThis parameter is ignored if you also specify `insidePolygon` or `insideBoundingBox`.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'aroundLatLng',
      },
    },
    displayName: 'Around Lat Lng',
    name: 'aroundLatLng_string',
    displayOptions: {
      show: {
        browse_params_object: ['aroundlatlng_string'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description: "Whether to obtain the coordinates from the request's IP address.",
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'aroundLatLngViaIP',
      },
    },
    displayName: 'Around Lat Lng Via IP',
    name: 'aroundLatLngViaIP_boolean',
    displayOptions: {
      show: {
        browse_params_object: ['aroundlatlngviaip_boolean'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'options',
    name: 'aroundRadius',
    displayName: 'Around Radius',
    default: '',
    options: [
      {
        name: 'Integer',
        value: 'integer',
      },
      {
        name: 'All',
        value: 'all',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'aroundRadius',
        value:
          '={{ typeof $parameter.aroundRadius_number !== "undefined" ? $parameter.aroundRadius_number : typeof $parameter.aroundRadius_options !== "undefined" ? $parameter.aroundRadius_options : undefined }}',
      },
    },
    displayOptions: {
      show: {
        browse_params_object: ['aroundradius'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description: 'Maximum search radius around a central location in meters.',
    typeOptions: {
      minValue: 1,
    },
    displayName: 'Around Radius (Integer)',
    name: 'aroundRadius_number',
    displayOptions: {
      show: {
        aroundRadius: ['integer'],
        browse_params_object: ['aroundradius'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description: "Return all records with a valid `_geoloc` attribute. Don't filter by distance.",
    options: [
      {
        name: 'all',
        value: 'all',
      },
    ],
    displayName: 'Around Radius (All)',
    name: 'aroundRadius_options',
    displayOptions: {
      show: {
        aroundRadius: ['all'],
        browse_params_object: ['aroundradius'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'options',
    name: 'aroundPrecision',
    displayName: 'Around Precision',
    default: '',
    options: [
      {
        name: 'Integer',
        value: 'integer',
      },
      {
        name: 'Range objects',
        value: 'range_objects',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'aroundPrecision',
        value:
          '={{ typeof $parameter.aroundPrecision_number !== "undefined" ? $parameter.aroundPrecision_number : typeof $parameter.aroundPrecision_json !== "undefined" ? JSON.parse($parameter.aroundPrecision_json) : undefined }}',
      },
    },
    displayOptions: {
      show: {
        browse_params_object: ['aroundprecision'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'number',
    default: 10,
    description:
      'Distance in meters to group results by similar distances.\n\nFor example, if you set `aroundPrecision` to 100, records wihin 100 meters to the central coordinate are considered to have the same distance,\nas are records between 100 and 199 meters.\n',
    displayName: 'Around Precision (Integer)',
    name: 'aroundPrecision_number',
    displayOptions: {
      show: {
        aroundPrecision: ['integer'],
        browse_params_object: ['aroundprecision'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Around Precision (Range Objects)',
    name: 'aroundPrecision_json',
    default: '[]',
    description: undefined,
    required: false,
    displayOptions: {
      show: {
        aroundPrecision: ['range_objects'],
        browse_params_object: ['aroundprecision'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description:
      "Minimum radius (in meters) for a search around a location when `aroundRadius` isn't set.",
    typeOptions: {
      minValue: 1,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'minimumAroundRadius',
      },
    },
    displayName: 'Minimum Around Radius',
    name: 'minimumAroundRadius_number',
    displayOptions: {
      show: {
        browse_params_object: ['minimumaroundradius_number'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'options',
    name: 'insideBoundingBox',
    displayName: 'Inside Bounding Box',
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
      {
        name: 'Inside bounding box array',
        value: 'inside_bounding_box_array',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'insideBoundingBox',
        value:
          '={{ typeof $parameter.insideBoundingBox_string !== "undefined" ? $parameter.insideBoundingBox_string : typeof $parameter.insideBoundingBox_null !== "undefined" ? JSON.parse($parameter.insideBoundingBox_null) : typeof $parameter.insideBoundingBox_json !== "undefined" ? JSON.parse($parameter.insideBoundingBox_json) : undefined }}',
      },
    },
    displayOptions: {
      show: {
        browse_params_object: ['insideboundingbox'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    displayName: 'Inside Bounding Box (String)',
    name: 'insideBoundingBox_string',
    displayOptions: {
      show: {
        insideBoundingBox: ['string'],
        browse_params_object: ['insideboundingbox'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Inside Bounding Box (Null)',
    name: 'insideBoundingBox_null',
    default: 'null',
    description: undefined,
    required: false,
    disabledOptions: {
      show: {
        insideBoundingBox: ['null'],
      },
    },
    displayOptions: {
      show: {
        insideBoundingBox: ['null'],
        browse_params_object: ['insideboundingbox'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Inside Bounding Box (Inside Bounding Box Array)',
    name: 'insideBoundingBox_json',
    default: '[]',
    description:
      'Coordinates for a rectangular area in which to search.\n\nEach bounding box is defined by the two opposite points of its diagonal, and expressed as latitude and longitude pair:\n`[p1 lat, p1 long, p2 lat, p2 long]`.\nProvide multiple bounding boxes as nested arrays.\nFor more information, see [rectangular area](https://www.algolia.com/doc/guides/managing-results/refine-results/geolocation/#filtering-inside-rectangular-or-polygonal-areas).\n',
    required: false,
    displayOptions: {
      show: {
        insideBoundingBox: ['inside_bounding_box_array'],
        browse_params_object: ['insideboundingbox'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Inside Polygon',
    name: 'insidePolygon_json',
    default: '[]',
    description:
      'Coordinates of a polygon in which to search.\n\nPolygons are defined by 3 to 10,000 points. Each point is represented by its latitude and longitude.\nProvide multiple polygons as nested arrays.\nFor more information, see [filtering inside polygons](https://www.algolia.com/doc/guides/managing-results/refine-results/geolocation/#filtering-inside-rectangular-or-polygonal-areas).\nThis parameter is ignored if you also specify `insideBoundingBox`.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'insidePolygon',
      },
    },
    displayOptions: {
      show: {
        browse_params_object: ['insidepolygon_json'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Natural Languages',
    name: 'naturalLanguages_json',
    default: '[]',
    description:
      'ISO language codes that adjust settings that are useful for processing natural language queries (as opposed to keyword searches)\n- Sets `removeStopWords` and `ignorePlurals` to the list of provided languages.\n- Sets `removeWordsIfNoResults` to `allOptional`.\n- Adds a `natural_language` attribute to `ruleContexts` and `analyticsTags`.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'naturalLanguages',
      },
    },
    displayOptions: {
      show: {
        browse_params_object: ['naturallanguages_json'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Rule Contexts',
    name: 'ruleContexts_json',
    default: '[]',
    description:
      'Assigns a rule context to the search query\n[Rule contexts](https://www.algolia.com/doc/guides/managing-results/rules/rules-overview/how-to/customize-search-results-by-platform/#whats-a-context) are strings that you can use to trigger matching rules.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'ruleContexts',
      },
    },
    displayOptions: {
      show: {
        browse_params_object: ['rulecontexts_json'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'number',
    default: 100,
    description:
      'Impact that Personalization should have on this search\nThe higher this value is, the more Personalization determines the ranking compared to other factors.\nFor more information, see [Understanding Personalization impact](https://www.algolia.com/doc/guides/personalization/personalizing-results/in-depth/configuring-personalization/#understanding-personalization-impact).\n',
    typeOptions: {
      minValue: 0,
      maxValue: 100,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'personalizationImpact',
      },
    },
    displayName: 'Personalization Impact',
    name: 'personalizationImpact_number',
    displayOptions: {
      show: {
        browse_params_object: ['personalizationimpact_number'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'test-user-123',
    default: '',
    description:
      'Unique pseudonymous or anonymous user identifier.\n\nThis helps with analytics and click and conversion events.\nFor more information, see [user token](https://www.algolia.com/doc/guides/sending-events/concepts/usertoken).\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'userToken',
      },
    },
    displayName: 'User Token',
    name: 'userToken_string',
    displayOptions: {
      show: {
        browse_params_object: ['usertoken_string'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description: 'Whether the search response should include detailed ranking information.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'getRankingInfo',
      },
    },
    displayName: 'Get Ranking Info',
    name: 'getRankingInfo_boolean',
    displayOptions: {
      show: {
        browse_params_object: ['getrankinginfo_boolean'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description: "Whether to take into account an index's synonyms for this search.",
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'synonyms',
      },
    },
    displayName: 'Synonyms',
    name: 'synonyms_boolean',
    displayOptions: {
      show: {
        browse_params_object: ['synonyms_boolean'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      'Whether to include a `queryID` attribute in the response\nThe query ID is a unique identifier for a search query and is required for tracking [click and conversion events](https://www.algolia.com/doc/guides/sending-events/getting-started).\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'clickAnalytics',
      },
    },
    displayName: 'Click Analytics',
    name: 'clickAnalytics_boolean',
    displayOptions: {
      show: {
        browse_params_object: ['clickanalytics_boolean'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description: 'Whether this search will be included in Analytics.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'analytics',
      },
    },
    displayName: 'Analytics',
    name: 'analytics_boolean',
    displayOptions: {
      show: {
        browse_params_object: ['analytics_boolean'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Analytics Tags',
    name: 'analyticsTags_json',
    default: '[]',
    description:
      'Tags to apply to the query for [segmenting analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments).',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'analyticsTags',
      },
    },
    displayOptions: {
      show: {
        browse_params_object: ['analyticstags_json'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description: 'Whether to include this search when calculating processing-time percentiles.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'percentileComputation',
      },
    },
    displayName: 'Percentile Computation',
    name: 'percentileComputation_boolean',
    displayOptions: {
      show: {
        browse_params_object: ['percentilecomputation_boolean'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description: 'Whether to enable A/B testing for this search.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'enableABTest',
      },
    },
    displayName: 'Enable ABTest',
    name: 'enableABTest_boolean',
    displayOptions: {
      show: {
        browse_params_object: ['enableabtest_boolean'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Attributes To Retrieve',
    name: 'attributesToRetrieve_json',
    default: '[]',
    description:
      'Attributes to include in the API response\nTo reduce the size of your response, you can retrieve only some of the attributes.\nAttribute names are case-sensitive\n- `*` retrieves all attributes, except attributes included in the `customRanking` and `unretrievableAttributes` settings.\n- To retrieve all attributes except a specific one, prefix the attribute with a dash and combine it with the `*`: `["*", "-ATTRIBUTE"]`.\n- The `objectID` attribute is always included.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'attributesToRetrieve',
      },
    },
    displayOptions: {
      show: {
        browse_params_object: ['attributestoretrieve_json'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Ranking',
    name: 'ranking_json',
    default: '[]',
    description:
      'Determines the order in which Algolia returns your results.\n\nBy default, each entry corresponds to a [ranking criteria](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria).\nThe tie-breaking algorithm sequentially applies each criterion in the order they\'re specified.\nIf you configure a replica index for [sorting by an attribute](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/how-to/sort-by-attribute),\nyou put the sorting attribute at the top of the list.\n\n**Modifiers**\n\n- `asc("ATTRIBUTE")`.\n  Sort the index by the values of an attribute, in ascending order.\n- `desc("ATTRIBUTE")`.\n  Sort the index by the values of an attribute, in descending order.\n\nBefore you modify the default setting,\nyou should test your changes in the dashboard,\nand by [A/B testing](https://www.algolia.com/doc/guides/ab-testing/what-is-ab-testing).\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'ranking',
      },
    },
    displayOptions: {
      show: {
        browse_params_object: ['ranking_json'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '90',
    default: 100,
    description:
      "Relevancy threshold below which less relevant results aren't included in the results\nYou can only set `relevancyStrictness` on [virtual replica indices](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/in-depth/replicas/#what-are-virtual-replicas).\nUse this setting to strike a balance between the relevance and number of returned results.\n",
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'relevancyStrictness',
      },
    },
    displayName: 'Relevancy Strictness',
    name: 'relevancyStrictness_number',
    displayOptions: {
      show: {
        browse_params_object: ['relevancystrictness_number'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Attributes To Highlight',
    name: 'attributesToHighlight_json',
    default: '[]',
    description:
      'Attributes to highlight\nBy default, all searchable attributes are highlighted.\nUse `*` to highlight all attributes or use an empty array `[]` to turn off highlighting.\nAttribute names are case-sensitive\nWith highlighting, strings that match the search query are surrounded by HTML tags defined by `highlightPreTag` and `highlightPostTag`.\nYou can use this to visually highlight matching parts of a search query in your UI\nFor more information, see [Highlighting and snippeting](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/highlighting-snippeting/js).\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'attributesToHighlight',
      },
    },
    displayOptions: {
      show: {
        browse_params_object: ['attributestohighlight_json'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Attributes To Snippet',
    name: 'attributesToSnippet_json',
    default: '[]',
    description:
      'Attributes for which to enable snippets.\nAttribute names are case-sensitive\nSnippets provide additional context to matched words.\nIf you enable snippets, they include 10 words, including the matched word.\nThe matched word will also be wrapped by HTML tags for highlighting.\nYou can adjust the number of words with the following notation: `ATTRIBUTE:NUMBER`,\nwhere `NUMBER` is the number of words to be extracted.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'attributesToSnippet',
      },
    },
    displayOptions: {
      show: {
        browse_params_object: ['attributestosnippet_json'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'string',
    default: '<em>',
    description:
      'HTML tag to insert before the highlighted parts in all highlighted results and snippets.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'highlightPreTag',
      },
    },
    displayName: 'Highlight Pre Tag',
    name: 'highlightPreTag_string',
    displayOptions: {
      show: {
        browse_params_object: ['highlightpretag_string'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'string',
    default: '</em>',
    description:
      'HTML tag to insert after the highlighted parts in all highlighted results and snippets.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'highlightPostTag',
      },
    },
    displayName: 'Highlight Post Tag',
    name: 'highlightPostTag_string',
    displayOptions: {
      show: {
        browse_params_object: ['highlightposttag_string'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'string',
    default: '…',
    description: 'String used as an ellipsis indicator when a snippet is truncated.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'snippetEllipsisText',
      },
    },
    displayName: 'Snippet Ellipsis Text',
    name: 'snippetEllipsisText_string',
    displayOptions: {
      show: {
        browse_params_object: ['snippetellipsistext_string'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      'Whether to restrict highlighting and snippeting to items that at least partially matched the search query.\nBy default, all items are highlighted and snippeted.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'restrictHighlightAndSnippetArrays',
      },
    },
    displayName: 'Restrict Highlight And Snippet Arrays',
    name: 'restrictHighlightAndSnippetArrays_boolean',
    displayOptions: {
      show: {
        browse_params_object: ['restricthighlightandsnippetarrays_boolean'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'number',
    default: 20,
    description: 'Number of hits per page.',
    typeOptions: {
      minValue: 1,
      maxValue: 1000,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'hitsPerPage',
      },
    },
    displayName: 'Hits Per Page',
    name: 'hitsPerPage_number',
    displayOptions: {
      show: {
        browse_params_object: ['hitsperpage_number'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'number',
    default: 4,
    description:
      'Minimum number of characters a word in the search query must contain to accept matches with [one typo](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/in-depth/configuring-typo-tolerance/#configuring-word-length-for-typos).',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'minWordSizefor1Typo',
      },
    },
    displayName: 'Min Word Sizefor1Typo',
    name: 'minWordSizefor1Typo_number',
    displayOptions: {
      show: {
        browse_params_object: ['minwordsizefor1typo_number'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'number',
    default: 8,
    description:
      'Minimum number of characters a word in the search query must contain to accept matches with [two typos](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/in-depth/configuring-typo-tolerance/#configuring-word-length-for-typos).',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'minWordSizefor2Typos',
      },
    },
    displayName: 'Min Word Sizefor2Typos',
    name: 'minWordSizefor2Typos_number',
    displayOptions: {
      show: {
        browse_params_object: ['minwordsizefor2typos_number'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'options',
    name: 'typoTolerance',
    displayName: 'Typo Tolerance',
    default: '',
    options: [
      {
        name: 'Boolean',
        value: 'boolean',
      },
      {
        name: 'Typo tolerance',
        value: 'typo_tolerance',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'typoTolerance',
        value:
          '={{ typeof $parameter.typoTolerance_boolean !== "undefined" ? $parameter.typoTolerance_boolean : typeof $parameter.typoTolerance_options !== "undefined" ? $parameter.typoTolerance_options : undefined }}',
      },
    },
    displayOptions: {
      show: {
        browse_params_object: ['typotolerance'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description:
      'Whether typo tolerance is active. If true, matches with typos are included in the search results and rank after exact matches.',
    displayName: 'Typo Tolerance (Boolean)',
    name: 'typoTolerance_boolean',
    displayOptions: {
      show: {
        typoTolerance: ['boolean'],
        browse_params_object: ['typotolerance'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description:
      '- `min`. Return matches with the lowest number of typos.\n  For example, if you have matches without typos, only include those.\n  But if there are no matches without typos (with 1 typo), include matches with 1 typo (2 typos).\n- `strict`. Return matches with the two lowest numbers of typos.\n  With `strict`, the Typo ranking criterion is applied first in the `ranking` setting.\n',
    options: [
      {
        name: 'min',
        value: 'min',
      },
      {
        name: 'strict',
        value: 'strict',
      },
      {
        name: 'true',
        value: 'true',
      },
      {
        name: 'false',
        value: 'false',
      },
    ],
    displayName: 'Typo Tolerance (Typo Tolerance)',
    name: 'typoTolerance_options',
    displayOptions: {
      show: {
        typoTolerance: ['typo_tolerance'],
        browse_params_object: ['typotolerance'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description:
      'Whether to allow typos on numbers in the search query\nTurn off this setting to reduce the number of irrelevant matches\nwhen searching in large sets of similar numbers.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'allowTyposOnNumericTokens',
      },
    },
    displayName: 'Allow Typos On Numeric Tokens',
    name: 'allowTyposOnNumericTokens_boolean',
    displayOptions: {
      show: {
        browse_params_object: ['allowtyposonnumerictokens_boolean'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Disable Typo Tolerance On Attributes',
    name: 'disableTypoToleranceOnAttributes_json',
    default: '[]',
    description:
      'Attributes for which you want to turn off [typo tolerance](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance).\nAttribute names are case-sensitive\nReturning only exact matches can help when\n- [Searching in hyphenated attributes](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/how-to/how-to-search-in-hyphenated-attributes).\n- Reducing the number of matches when you have too many.\n  This can happen with attributes that are long blocks of text, such as product descriptions\nConsider alternatives such as `disableTypoToleranceOnWords` or adding synonyms if your attributes have intentional unusual spellings that might look like typos.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'disableTypoToleranceOnAttributes',
      },
    },
    displayOptions: {
      show: {
        browse_params_object: ['disabletypotoleranceonattributes_json'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'options',
    name: 'ignorePlurals',
    displayName: 'Ignore Plurals',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'Boolean string',
        value: 'boolean_string',
      },
      {
        name: 'Boolean',
        value: 'boolean',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'ignorePlurals',
        value:
          '={{ typeof $parameter.ignorePlurals_json !== "undefined" ? JSON.parse($parameter.ignorePlurals_json) : typeof $parameter.ignorePlurals_options !== "undefined" ? $parameter.ignorePlurals_options : typeof $parameter.ignorePlurals_boolean !== "undefined" ? $parameter.ignorePlurals_boolean : undefined }}',
      },
    },
    displayOptions: {
      show: {
        browse_params_object: ['ignoreplurals'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Ignore Plurals (Array)',
    name: 'ignorePlurals_json',
    default: '[]',
    description:
      'ISO code for languages for which this feature should be active.\nThis overrides languages you set with `queryLanguages`.\n',
    required: false,
    displayOptions: {
      show: {
        ignorePlurals: ['array'],
        browse_params_object: ['ignoreplurals'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    options: [
      {
        name: 'true',
        value: 'true',
      },
      {
        name: 'false',
        value: 'false',
      },
    ],
    displayName: 'Ignore Plurals (Boolean String)',
    name: 'ignorePlurals_options',
    displayOptions: {
      show: {
        ignorePlurals: ['boolean_string'],
        browse_params_object: ['ignoreplurals'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      "If true, `ignorePlurals` is active for all languages included in `queryLanguages`, or for all supported languages, if `queryLanguges` is empty.\nIf false, singulars, plurals, and other declensions won't be considered equivalent.\n",
    displayName: 'Ignore Plurals (Boolean)',
    name: 'ignorePlurals_boolean',
    displayOptions: {
      show: {
        ignorePlurals: ['boolean'],
        browse_params_object: ['ignoreplurals'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'options',
    name: 'removeStopWords',
    displayName: 'Remove Stop Words',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'Boolean',
        value: 'boolean',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'removeStopWords',
        value:
          '={{ typeof $parameter.removeStopWords_json !== "undefined" ? JSON.parse($parameter.removeStopWords_json) : typeof $parameter.removeStopWords_boolean !== "undefined" ? $parameter.removeStopWords_boolean : undefined }}',
      },
    },
    displayOptions: {
      show: {
        browse_params_object: ['removestopwords'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Remove Stop Words (Array)',
    name: 'removeStopWords_json',
    default: '[]',
    description:
      'ISO code for languages for which stop words should be removed. This overrides languages you set in `queryLanguges`.',
    required: false,
    displayOptions: {
      show: {
        removeStopWords: ['array'],
        browse_params_object: ['removestopwords'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      'If true, stop words are removed for all languages you included in `queryLanguages`, or for all supported languages, if `queryLanguages` is empty.\nIf false, stop words are not removed.\n',
    displayName: 'Remove Stop Words (Boolean)',
    name: 'removeStopWords_boolean',
    displayOptions: {
      show: {
        removeStopWords: ['boolean'],
        browse_params_object: ['removestopwords'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Query Languages',
    name: 'queryLanguages_json',
    default: '[]',
    description:
      "Languages for language-specific query processing steps such as plurals, stop-word removal, and word-detection dictionaries \nThis setting sets a default list of languages used by the `removeStopWords` and `ignorePlurals` settings.\nThis setting also sets a dictionary for word detection in the logogram-based [CJK](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/normalization/#normalization-for-logogram-based-languages-cjk) languages.\nTo support this, you must place the CJK language **first** \n**You should always specify a query language.**\nIf you don't specify an indexing language, the search engine uses all [supported languages](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/supported-languages),\nor the languages you specified with the `ignorePlurals` or `removeStopWords` parameters.\nThis can lead to unexpected search results.\nFor more information, see [Language-specific configuration](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations).\n",
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'queryLanguages',
      },
    },
    displayOptions: {
      show: {
        browse_params_object: ['querylanguages_json'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description:
      "Whether to split compound words in the query into their building blocks\nFor more information, see [Word segmentation](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations/#splitting-compound-words).\nWord segmentation is supported for these languages: German, Dutch, Finnish, Swedish, and Norwegian.\nDecompounding doesn't work for words with [non-spacing mark Unicode characters](https://www.charactercodes.net/category/non-spacing_mark).\nFor example, `Gartenstühle` won't be decompounded if the `ü` consists of `u` (U+0075) and `◌̈` (U+0308).\n",
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'decompoundQuery',
      },
    },
    displayName: 'Decompound Query',
    name: 'decompoundQuery_boolean',
    displayOptions: {
      show: {
        browse_params_object: ['decompoundquery_boolean'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description: 'Whether to enable rules.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'enableRules',
      },
    },
    displayName: 'Enable Rules',
    name: 'enableRules_boolean',
    displayOptions: {
      show: {
        browse_params_object: ['enablerules_boolean'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description: 'Whether to enable Personalization.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'enablePersonalization',
      },
    },
    displayName: 'Enable Personalization',
    name: 'enablePersonalization_boolean',
    displayOptions: {
      show: {
        browse_params_object: ['enablepersonalization_boolean'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'options',
    default: 'prefixLast',
    description:
      'Determines if and how query words are interpreted as prefixes.\n\nBy default, only the last query word is treated as a prefix (`prefixLast`).\nTo turn off prefix search, use `prefixNone`.\nAvoid `prefixAll`, which treats all query words as prefixes.\nThis might lead to counterintuitive results and makes your search slower.\n\nFor more information, see [Prefix searching](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/prefix-searching).\n',
    options: [
      {
        name: 'prefixLast',
        value: 'prefixLast',
      },
      {
        name: 'prefixAll',
        value: 'prefixAll',
      },
      {
        name: 'prefixNone',
        value: 'prefixNone',
      },
    ],
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'queryType',
      },
    },
    displayName: 'Query Type',
    name: 'queryType_options',
    displayOptions: {
      show: {
        browse_params_object: ['querytype_options'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'options',
    placeholder: 'firstWords',
    default: 'none',
    description:
      "Strategy for removing words from the query when it doesn't return any results.\nThis helps to avoid returning empty search results.\n\n- `none`.\n  No words are removed when a query doesn't return results.\n\n- `lastWords`.\n  Treat the last (then second to last, then third to last) word as optional,\n  until there are results or at most 5 words have been removed.\n\n- `firstWords`.\n  Treat the first (then second, then third) word as optional,\n  until there are results or at most 5 words have been removed.\n\n- `allOptional`.\n  Treat all words as optional.\n\nFor more information, see [Remove words to improve results](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/empty-or-insufficient-results/in-depth/why-use-remove-words-if-no-results).\n",
    options: [
      {
        name: 'none',
        value: 'none',
      },
      {
        name: 'lastWords',
        value: 'lastWords',
      },
      {
        name: 'firstWords',
        value: 'firstWords',
      },
      {
        name: 'allOptional',
        value: 'allOptional',
      },
    ],
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'removeWordsIfNoResults',
      },
    },
    displayName: 'Remove Words If No Results',
    name: 'removeWordsIfNoResults_options',
    displayOptions: {
      show: {
        browse_params_object: ['removewordsifnoresults_options'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'options',
    default: 'keywordSearch',
    description:
      'Search mode the index will use to query for results.\n\nThis setting only applies to indices, for which Algolia enabled NeuralSearch for you.\n',
    options: [
      {
        name: 'neuralSearch',
        value: 'neuralSearch',
      },
      {
        name: 'keywordSearch',
        value: 'keywordSearch',
      },
    ],
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'mode',
      },
    },
    displayName: 'Mode',
    name: 'mode_options',
    displayOptions: {
      show: {
        browse_params_object: ['mode_options'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'json',
    description:
      'Settings for the semantic search part of NeuralSearch.\nOnly used when `mode` is `neuralSearch`.\n',
    required: false,
    default: '{}',
    routing: {
      send: {
        type: 'body',
        property: 'semanticSearch',
        value: '={{ JSON.parse($value) }}',
      },
    },
    displayName: 'Semantic Search',
    name: 'semantic_search_object',
    displayOptions: {
      show: {
        browse_params_object: ['semantic_search_object'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      'Whether to support phrase matching and excluding words from search queries\nUse the `advancedSyntaxFeatures` parameter to control which feature is supported.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'advancedSyntax',
      },
    },
    displayName: 'Advanced Syntax',
    name: 'advancedSyntax_boolean',
    displayOptions: {
      show: {
        browse_params_object: ['advancedsyntax_boolean'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'options',
    name: 'optionalWords',
    displayName: 'Optional Words',
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
      {
        name: 'Optional words array',
        value: 'optional_words_array',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'optionalWords',
        value:
          '={{ typeof $parameter.optionalWords_string !== "undefined" ? $parameter.optionalWords_string : typeof $parameter.optionalWords_null !== "undefined" ? JSON.parse($parameter.optionalWords_null) : typeof $parameter.optionalWords_json !== "undefined" ? JSON.parse($parameter.optionalWords_json) : undefined }}',
      },
    },
    displayOptions: {
      show: {
        browse_params_object: ['optionalwords'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    displayName: 'Optional Words (String)',
    name: 'optionalWords_string',
    displayOptions: {
      show: {
        optionalWords: ['string'],
        browse_params_object: ['optionalwords'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Optional Words (Null)',
    name: 'optionalWords_null',
    default: 'null',
    description: undefined,
    required: false,
    disabledOptions: {
      show: {
        optionalWords: ['null'],
      },
    },
    displayOptions: {
      show: {
        optionalWords: ['null'],
        browse_params_object: ['optionalwords'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Optional Words (Optional Words Array)',
    name: 'optionalWords_json',
    default: '[]',
    description:
      'List of [optional words](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/empty-or-insufficient-results/#creating-a-list-of-optional-words).',
    required: false,
    displayOptions: {
      show: {
        optionalWords: ['optional_words_array'],
        browse_params_object: ['optionalwords'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Disable Exact On Attributes',
    name: 'disableExactOnAttributes_json',
    default: '[]',
    description:
      'Searchable attributes for which you want to [turn off the Exact ranking criterion](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/adjust-exact-settings/#turn-off-exact-for-some-attributes).\nAttribute names are case-sensitive\nThis can be useful for attributes with long values, where the likelihood of an exact match is high,\nsuch as product descriptions.\nTurning off the Exact ranking criterion for these attributes favors exact matching on other attributes.\nThis reduces the impact of individual attributes with a lot of content on ranking.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'disableExactOnAttributes',
      },
    },
    displayOptions: {
      show: {
        browse_params_object: ['disableexactonattributes_json'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'options',
    default: 'attribute',
    description:
      'Determines how the [Exact ranking criterion](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/adjust-exact-settings/#turn-off-exact-for-some-attributes) is computed when the search query has only one word.\n\n- `attribute`.\n  The Exact ranking criterion is 1 if the query word and attribute value are the same.\n  For example, a search for "road" will match the value "road", but not "road trip".\n\n- `none`.\n  The Exact ranking criterion is ignored on single-word searches.\n\n- `word`.\n  The Exact ranking criterion is 1 if the query word is found in the attribute value.\n  The query word must have at least 3 characters and must not be a stop word.\n  Only exact matches will be highlighted,\n  partial and prefix matches won\'t.\n',
    options: [
      {
        name: 'attribute',
        value: 'attribute',
      },
      {
        name: 'none',
        value: 'none',
      },
      {
        name: 'word',
        value: 'word',
      },
    ],
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'exactOnSingleWordQuery',
      },
    },
    displayName: 'Exact On Single Word Query',
    name: 'exactOnSingleWordQuery_options',
    displayOptions: {
      show: {
        browse_params_object: ['exactonsinglewordquery_options'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Alternatives As Exact',
    name: 'alternativesAsExact_json',
    default: '[]',
    description:
      'Determine which plurals and synonyms should be considered an exact matches\nBy default, Algolia treats singular and plural forms of a word, and single-word synonyms, as [exact](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/#exact) matches when searching.\nFor example\n- "swimsuit" and "swimsuits" are treated the same\n- "swimsuit" and "swimwear" are treated the same (if they are [synonyms](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/adding-synonyms/#regular-synonyms))\n- `ignorePlurals`.\n  Plurals and similar declensions added by the `ignorePlurals` setting are considered exact matches\n- `singleWordSynonym`.\n  Single-word synonyms, such as "NY" = "NYC", are considered exact matches\n- `multiWordsSynonym`.\n  Multi-word synonyms, such as "NY" = "New York", are considered exact matches.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'alternativesAsExact',
      },
    },
    displayOptions: {
      show: {
        browse_params_object: ['alternativesasexact_json'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Advanced Syntax Features',
    name: 'advancedSyntaxFeatures_json',
    default: '[]',
    description:
      'Advanced search syntax features you want to support\n- `exactPhrase`.\n  Phrases in quotes must match exactly.\n  For example, `sparkly blue "iPhone case"` only returns records with the exact string "iPhone case"\n- `excludeWords`.\n  Query words prefixed with a `-` must not occur in a record.\n  For example, `search -engine` matches records that contain "search" but not "engine"\nThis setting only has an effect if `advancedSyntax` is true.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'advancedSyntaxFeatures',
      },
    },
    displayOptions: {
      show: {
        browse_params_object: ['advancedsyntaxfeatures_json'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'options',
    name: 'distinct',
    displayName: 'Distinct',
    default: '',
    options: [
      {
        name: 'Boolean',
        value: 'boolean',
      },
      {
        name: 'Integer',
        value: 'integer',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'distinct',
        value:
          '={{ typeof $parameter.distinct_boolean !== "undefined" ? $parameter.distinct_boolean : typeof $parameter.distinct_number !== "undefined" ? $parameter.distinct_number : undefined }}',
      },
    },
    displayOptions: {
      show: {
        browse_params_object: ['distinct'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      'Whether deduplication is turned on. If true, only one member of a group is shown in the search results.',
    displayName: 'Distinct (Boolean)',
    name: 'distinct_boolean',
    displayOptions: {
      show: {
        distinct: ['boolean'],
        browse_params_object: ['distinct'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description:
      "Number of members of a group of records to include in the search results.\n\n- Don't use `distinct > 1` for records that might be [promoted by rules](https://www.algolia.com/doc/guides/managing-results/rules/merchandising-and-promoting/how-to/promote-hits).\n  The number of hits won't be correct and faceting won't work as expected.\n- With `distinct > 1`, the `hitsPerPage` parameter controls the number of returned groups.\n  For example, with `hitsPerPage: 10` and `distinct: 2`, up to 20 records are returned.\n  Likewise, the `nbHits` response attribute contains the number of returned groups.\n",
    typeOptions: {
      minValue: 0,
      maxValue: 4,
    },
    displayName: 'Distinct (Integer)',
    name: 'distinct_number',
    displayOptions: {
      show: {
        distinct: ['integer'],
        browse_params_object: ['distinct'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      'Whether to replace a highlighted word with the matched synonym\nBy default, the original words are highlighted even if a synonym matches.\nFor example, with `home` as a synonym for `house` and a search for `home`,\nrecords matching either "home" or "house" are included in the search results,\nand either "home" or "house" are highlighted\nWith `replaceSynonymsInHighlight` set to `true`, a search for `home` still matches the same records,\nbut all occurrences of "house" are replaced by "home" in the highlighted response.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'replaceSynonymsInHighlight',
      },
    },
    displayName: 'Replace Synonyms In Highlight',
    name: 'replaceSynonymsInHighlight_boolean',
    displayOptions: {
      show: {
        browse_params_object: ['replacesynonymsinhighlight_boolean'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'number',
    default: 1,
    description:
      'Minimum proximity score for two matching words\nThis adjusts the [Proximity ranking criterion](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/#proximity)\nby equally scoring matches that are farther apart\nFor example, if `minProximity` is 2, neighboring matches and matches with one word between them would have the same score.\n',
    typeOptions: {
      minValue: 1,
      maxValue: 7,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'minProximity',
      },
    },
    displayName: 'Min Proximity',
    name: 'minProximity_number',
    displayOptions: {
      show: {
        browse_params_object: ['minproximity_number'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Response Fields',
    name: 'responseFields_json',
    default: '[]',
    description:
      "Properties to include in the API response of search and browse requests\nBy default, all response properties are included.\nTo reduce the response size, you can select which properties should be included\nAn empty list may lead to an empty API response (except properties you can't exclude)\nYou can't exclude these properties:\n`message`, `warning`, `cursor`, `abTestVariantID`,\nor any property added by setting `getRankingInfo` to true\nYour search depends on the `hits` field. If you omit this field, searches won't return any results.\nYour UI might also depend on other properties, for example, for pagination.\nBefore restricting the response size, check the impact on your search experience.\n",
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'responseFields',
      },
    },
    displayOptions: {
      show: {
        browse_params_object: ['responsefields_json'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'number',
    default: 100,
    description: 'Maximum number of facet values to return for each facet.',
    typeOptions: {
      maxValue: 1000,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'maxValuesPerFacet',
      },
    },
    displayName: 'Max Values Per Facet',
    name: 'maxValuesPerFacet_number',
    displayOptions: {
      show: {
        browse_params_object: ['maxvaluesperfacet_number'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'string',
    default: 'count',
    description:
      "Order in which to retrieve facet values\n- `count`.\n  Facet values are retrieved by decreasing count.\n  The count is the number of matching records containing this facet value\n- `alpha`.\n  Retrieve facet values alphabetically\nThis setting doesn't influence how facet values are displayed in your UI (see `renderingContent`).\nFor more information, see [facet value display](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/facet-display/js).\n",
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'sortFacetValuesBy',
      },
    },
    displayName: 'Sort Facet Values By',
    name: 'sortFacetValuesBy_string',
    displayOptions: {
      show: {
        browse_params_object: ['sortfacetvaluesby_string'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      'Whether the best matching attribute should be determined by minimum proximity\nThis setting only affects ranking if the Attribute ranking criterion comes before Proximity in the `ranking` setting.\nIf true, the best matching attribute is selected based on the minimum proximity of multiple matches.\nOtherwise, the best matching attribute is determined by the order in the `searchableAttributes` setting.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'attributeCriteriaComputedByMinProximity',
      },
    },
    displayName: 'Attribute Criteria Computed By Min Proximity',
    name: 'attributeCriteriaComputedByMinProximity_boolean',
    displayOptions: {
      show: {
        browse_params_object: ['attributecriteriacomputedbyminproximity_boolean'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'json',
    description:
      'Extra data that can be used in the search UI.\n\nYou can use this to control aspects of your search UI, such as the order of facet names and values\nwithout changing your frontend code.\n',
    required: false,
    default: '{}',
    routing: {
      send: {
        type: 'body',
        property: 'renderingContent',
        value: '={{ JSON.parse($value) }}',
      },
    },
    displayName: 'Rendering Content',
    name: 'rendering_content_object',
    displayOptions: {
      show: {
        browse_params_object: ['rendering_content_object'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description:
      'Whether this search will use [Dynamic Re-Ranking](https://www.algolia.com/doc/guides/algolia-ai/re-ranking)\nThis setting only has an effect if you activated Dynamic Re-Ranking for this index in the Algolia dashboard.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'enableReRanking',
      },
    },
    displayName: 'Enable Re Ranking',
    name: 'enableReRanking_boolean',
    displayOptions: {
      show: {
        browse_params_object: ['enablereranking_boolean'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'options',
    name: 'reRankingApplyFilter',
    displayName: 'Re Ranking Apply Filter',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
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
        property: 'reRankingApplyFilter',
        value:
          '={{ typeof $parameter.reRankingApplyFilter_json !== "undefined" ? JSON.parse($parameter.reRankingApplyFilter_json) : typeof $parameter.reRankingApplyFilter_string !== "undefined" ? $parameter.reRankingApplyFilter_string : typeof $parameter.reRankingApplyFilter_null !== "undefined" ? JSON.parse($parameter.reRankingApplyFilter_null) : undefined }}',
      },
    },
    displayOptions: {
      show: {
        browse_params_object: ['rerankingapplyfilter'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Re Ranking Apply Filter (Array)',
    name: 'reRankingApplyFilter_json',
    default: '[]',
    description: undefined,
    required: false,
    displayOptions: {
      show: {
        reRankingApplyFilter: ['array'],
        browse_params_object: ['rerankingapplyfilter'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    displayName: 'Re Ranking Apply Filter (String)',
    name: 'reRankingApplyFilter_string',
    displayOptions: {
      show: {
        reRankingApplyFilter: ['string'],
        browse_params_object: ['rerankingapplyfilter'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Re Ranking Apply Filter (Null)',
    name: 'reRankingApplyFilter_null',
    default: 'null',
    description: undefined,
    required: false,
    disabledOptions: {
      show: {
        reRankingApplyFilter: ['null'],
      },
    },
    displayOptions: {
      show: {
        reRankingApplyFilter: ['null'],
        browse_params_object: ['rerankingapplyfilter'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'jMDY3M2MwM2QwMWUxMmQwYWI0ZTN',
    default: '',
    description:
      'Cursor to get the next page of the response.\n\nThe parameter must match the value returned in the response of a previous request.\nThe last page of the response does not return a `cursor` attribute.\n',
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
        browse_params_object: ['cursor_string'],
        browseParams: ['browse_params_object'],
        resource: ['Search'],
        operation: ['browse'],
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
        resource: ['Records'],
        operation: ['saveObject'],
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
    type: 'json',
    description: undefined,
    required: false,
    default: '{}',
    routing: {
      request: {
        body: '={{ JSON.parse($value) }}',
      },
    },
    displayName: 'Body',
    name: 'body_object',
    displayOptions: {
      show: {
        resource: ['Records'],
        operation: ['saveObject'],
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
        resource: ['Indices'],
        operation: ['deleteIndex'],
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
    type: 'options',
    placeholder: 'ALGOLIA_INDEX_NAME',
    default: '',
    displayName: 'Index Name',
    name: 'indexName_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Records'],
        operation: ['getObject'],
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
    type: 'string',
    placeholder: 'test-record-123',
    default: '',
    description: 'Unique record identifier.',
    displayName: 'Object ID',
    name: 'objectID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Records'],
        operation: ['getObject'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Attributes To Retrieve',
    name: 'attributesToRetrieve_json',
    default: '[]',
    description: undefined,
    required: false,
    routing: {
      request: {
        qs: {
          attributesToRetrieve: '={{ JSON.parse($value) }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Records'],
        operation: ['getObject'],
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
        resource: ['Records'],
        operation: ['addOrUpdateObject'],
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
    type: 'string',
    placeholder: 'test-record-123',
    default: '',
    description: 'Unique record identifier.',
    displayName: 'Object ID',
    name: 'objectID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Records'],
        operation: ['addOrUpdateObject'],
      },
    },
  },
  {
    type: 'json',
    description: undefined,
    required: false,
    default: '{}',
    routing: {
      request: {
        body: '={{ JSON.parse($value) }}',
      },
    },
    displayName: 'Body',
    name: 'body_object',
    displayOptions: {
      show: {
        resource: ['Records'],
        operation: ['addOrUpdateObject'],
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
        resource: ['Records'],
        operation: ['deleteObject'],
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
    type: 'string',
    placeholder: 'test-record-123',
    default: '',
    description: 'Unique record identifier.',
    displayName: 'Object ID',
    name: 'objectID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Records'],
        operation: ['deleteObject'],
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
        resource: ['Records'],
        operation: ['deleteBy'],
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
    displayName: 'Delete By Params',
    name: 'delete_by_params_object',
    type: 'multiOptions',
    description: undefined,
    required: false,
    default: [],
    options: [
      {
        name: 'Facet Filters',
        value: 'facetFilters',
      },
      {
        name: 'Filters',
        value: 'filters_string',
      },
      {
        name: 'Numeric Filters',
        value: 'numericFilters',
      },
      {
        name: 'Tag Filters',
        value: 'tagFilters',
      },
      {
        name: 'Around Lat Lng',
        value: 'aroundLatLng_string',
      },
      {
        name: 'Around Radius',
        value: 'aroundRadius',
      },
      {
        name: 'Inside Bounding Box',
        value: 'insideBoundingBox',
      },
      {
        name: 'Inside Polygon',
        value: 'insidePolygon_json',
      },
    ],
    displayOptions: {
      show: {
        resource: ['Records'],
        operation: ['deleteBy'],
      },
    },
  },
  {
    type: 'options',
    name: 'facetFilters',
    displayName: 'Facet Filters',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'String',
        value: 'string',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'facetFilters',
        value:
          '={{ typeof $parameter.facetFilters_json !== "undefined" ? JSON.parse($parameter.facetFilters_json) : typeof $parameter.facetFilters_string !== "undefined" ? $parameter.facetFilters_string : undefined }}',
      },
    },
    displayOptions: {
      show: {
        delete_by_params_object: ['facetFilters'],
        resource: ['Records'],
        operation: ['deleteBy'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Facet Filters (Array)',
    name: 'facetFilters_json',
    default: '[]',
    description: undefined,
    required: false,
    displayOptions: {
      show: {
        delete_by_params_object: ['facetFilters'],
        facetFilters: ['array'],
        resource: ['Records'],
        operation: ['deleteBy'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    displayName: 'Facet Filters (String)',
    name: 'facetFilters_string',
    displayOptions: {
      show: {
        delete_by_params_object: ['facetFilters'],
        facetFilters: ['string'],
        resource: ['Records'],
        operation: ['deleteBy'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '(category:Book OR category:Ebook) AND _tags:published',
    default: '',
    description:
      "Filter expression to only include items that match the filter criteria in the response.\n\nYou can use these filter expressions:\n\n- **Numeric filters.** `<facet> <op> <number>`, where `<op>` is one of `<`, `<=`, `=`, `!=`, `>`, `>=`.\n- **Ranges.** `<facet>:<lower> TO <upper>` where `<lower>` and `<upper>` are the lower and upper limits of the range (inclusive).\n- **Facet filters.** `<facet>:<value>` where `<facet>` is a facet attribute (case-sensitive) and `<value>` a facet value.\n- **Tag filters.** `_tags:<value>` or just `<value>` (case-sensitive).\n- **Boolean filters.** `<facet>: true | false`.\n\nYou can combine filters with `AND`, `OR`, and `NOT` operators with the following restrictions:\n\n- You can only combine filters of the same type with `OR`.\n  **Not supported:** `facet:value OR num > 3`.\n- You can't use `NOT` with combinations of filters.\n  **Not supported:** `NOT(facet:value OR facet:value)`\n- You can't combine conjunctions (`AND`) with `OR`.\n  **Not supported:** `facet:value OR (facet:value AND facet:value)`\n\nUse quotes around your filters, if the facet attribute name or facet value has spaces, keywords (`OR`, `AND`, `NOT`), or quotes.\nIf a facet attribute is an array, the filter matches if it matches at least one element of the array.\n\nFor more information, see [Filters](https://www.algolia.com/doc/guides/managing-results/refine-results/filtering).\n",
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'filters',
      },
    },
    displayName: 'Filters',
    name: 'filters_string',
    displayOptions: {
      show: {
        delete_by_params_object: ['filters_string'],
        resource: ['Records'],
        operation: ['deleteBy'],
      },
    },
  },
  {
    type: 'options',
    name: 'numericFilters',
    displayName: 'Numeric Filters',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'String',
        value: 'string',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'numericFilters',
        value:
          '={{ typeof $parameter.numericFilters_json !== "undefined" ? JSON.parse($parameter.numericFilters_json) : typeof $parameter.numericFilters_string !== "undefined" ? $parameter.numericFilters_string : undefined }}',
      },
    },
    displayOptions: {
      show: {
        delete_by_params_object: ['numericFilters'],
        resource: ['Records'],
        operation: ['deleteBy'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Numeric Filters (Array)',
    name: 'numericFilters_json',
    default: '[]',
    description: undefined,
    required: false,
    displayOptions: {
      show: {
        delete_by_params_object: ['numericFilters'],
        numericFilters: ['array'],
        resource: ['Records'],
        operation: ['deleteBy'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    displayName: 'Numeric Filters (String)',
    name: 'numericFilters_string',
    displayOptions: {
      show: {
        delete_by_params_object: ['numericFilters'],
        numericFilters: ['string'],
        resource: ['Records'],
        operation: ['deleteBy'],
      },
    },
  },
  {
    type: 'options',
    name: 'tagFilters',
    displayName: 'Tag Filters',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'String',
        value: 'string',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'tagFilters',
        value:
          '={{ typeof $parameter.tagFilters_json !== "undefined" ? JSON.parse($parameter.tagFilters_json) : typeof $parameter.tagFilters_string !== "undefined" ? $parameter.tagFilters_string : undefined }}',
      },
    },
    displayOptions: {
      show: {
        delete_by_params_object: ['tagFilters'],
        resource: ['Records'],
        operation: ['deleteBy'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Tag Filters (Array)',
    name: 'tagFilters_json',
    default: '[]',
    description: undefined,
    required: false,
    displayOptions: {
      show: {
        delete_by_params_object: ['tagFilters'],
        tagFilters: ['array'],
        resource: ['Records'],
        operation: ['deleteBy'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    displayName: 'Tag Filters (String)',
    name: 'tagFilters_string',
    displayOptions: {
      show: {
        delete_by_params_object: ['tagFilters'],
        tagFilters: ['string'],
        resource: ['Records'],
        operation: ['deleteBy'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '40.71,-74.01',
    default: '',
    description:
      'Coordinates for the center of a circle, expressed as a comma-separated string of latitude and longitude.\n\nOnly records included within a circle around this central location are included in the results.\nThe radius of the circle is determined by the `aroundRadius` and `minimumAroundRadius` settings.\nThis parameter is ignored if you also specify `insidePolygon` or `insideBoundingBox`.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'aroundLatLng',
      },
    },
    displayName: 'Around Lat Lng',
    name: 'aroundLatLng_string',
    displayOptions: {
      show: {
        delete_by_params_object: ['aroundLatLng_string'],
        resource: ['Records'],
        operation: ['deleteBy'],
      },
    },
  },
  {
    type: 'options',
    name: 'aroundRadius',
    displayName: 'Around Radius',
    default: '',
    options: [
      {
        name: 'Integer',
        value: 'integer',
      },
      {
        name: 'All',
        value: 'all',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'aroundRadius',
        value:
          '={{ typeof $parameter.aroundRadius_number !== "undefined" ? $parameter.aroundRadius_number : typeof $parameter.aroundRadius_options !== "undefined" ? $parameter.aroundRadius_options : undefined }}',
      },
    },
    displayOptions: {
      show: {
        delete_by_params_object: ['aroundRadius'],
        resource: ['Records'],
        operation: ['deleteBy'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description: 'Maximum search radius around a central location in meters.',
    typeOptions: {
      minValue: 1,
    },
    displayName: 'Around Radius (Integer)',
    name: 'aroundRadius_number',
    displayOptions: {
      show: {
        delete_by_params_object: ['aroundRadius'],
        aroundRadius: ['integer'],
        resource: ['Records'],
        operation: ['deleteBy'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description: "Return all records with a valid `_geoloc` attribute. Don't filter by distance.",
    options: [
      {
        name: 'all',
        value: 'all',
      },
    ],
    displayName: 'Around Radius (All)',
    name: 'aroundRadius_options',
    displayOptions: {
      show: {
        delete_by_params_object: ['aroundRadius'],
        aroundRadius: ['all'],
        resource: ['Records'],
        operation: ['deleteBy'],
      },
    },
  },
  {
    type: 'options',
    name: 'insideBoundingBox',
    displayName: 'Inside Bounding Box',
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
      {
        name: 'Inside bounding box array',
        value: 'inside_bounding_box_array',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'insideBoundingBox',
        value:
          '={{ typeof $parameter.insideBoundingBox_string !== "undefined" ? $parameter.insideBoundingBox_string : typeof $parameter.insideBoundingBox_null !== "undefined" ? JSON.parse($parameter.insideBoundingBox_null) : typeof $parameter.insideBoundingBox_json !== "undefined" ? JSON.parse($parameter.insideBoundingBox_json) : undefined }}',
      },
    },
    displayOptions: {
      show: {
        delete_by_params_object: ['insideBoundingBox'],
        resource: ['Records'],
        operation: ['deleteBy'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    displayName: 'Inside Bounding Box (String)',
    name: 'insideBoundingBox_string',
    displayOptions: {
      show: {
        delete_by_params_object: ['insideBoundingBox'],
        insideBoundingBox: ['string'],
        resource: ['Records'],
        operation: ['deleteBy'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Inside Bounding Box (Null)',
    name: 'insideBoundingBox_null',
    default: 'null',
    description: undefined,
    required: false,
    disabledOptions: {
      show: {
        insideBoundingBox: ['null'],
      },
    },
    displayOptions: {
      show: {
        delete_by_params_object: ['insideBoundingBox'],
        insideBoundingBox: ['null'],
        resource: ['Records'],
        operation: ['deleteBy'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Inside Bounding Box (Inside Bounding Box Array)',
    name: 'insideBoundingBox_json',
    default: '[]',
    description:
      'Coordinates for a rectangular area in which to search.\n\nEach bounding box is defined by the two opposite points of its diagonal, and expressed as latitude and longitude pair:\n`[p1 lat, p1 long, p2 lat, p2 long]`.\nProvide multiple bounding boxes as nested arrays.\nFor more information, see [rectangular area](https://www.algolia.com/doc/guides/managing-results/refine-results/geolocation/#filtering-inside-rectangular-or-polygonal-areas).\n',
    required: false,
    displayOptions: {
      show: {
        delete_by_params_object: ['insideBoundingBox'],
        insideBoundingBox: ['inside_bounding_box_array'],
        resource: ['Records'],
        operation: ['deleteBy'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Inside Polygon',
    name: 'insidePolygon_json',
    default: '[]',
    description:
      'Coordinates of a polygon in which to search.\n\nPolygons are defined by 3 to 10,000 points. Each point is represented by its latitude and longitude.\nProvide multiple polygons as nested arrays.\nFor more information, see [filtering inside polygons](https://www.algolia.com/doc/guides/managing-results/refine-results/geolocation/#filtering-inside-rectangular-or-polygonal-areas).\nThis parameter is ignored if you also specify `insideBoundingBox`.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'insidePolygon',
      },
    },
    displayOptions: {
      show: {
        delete_by_params_object: ['insidePolygon_json'],
        resource: ['Records'],
        operation: ['deleteBy'],
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
        resource: ['Records'],
        operation: ['clearObjects'],
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
    type: 'options',
    placeholder: 'ALGOLIA_INDEX_NAME',
    default: '',
    displayName: 'Index Name',
    name: 'indexName_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Records'],
        operation: ['partialUpdateObject'],
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
    type: 'string',
    placeholder: 'test-record-123',
    default: '',
    description: 'Unique record identifier.',
    displayName: 'Object ID',
    name: 'objectID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Records'],
        operation: ['partialUpdateObject'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    routing: {
      request: {
        qs: {
          createIfNotExists: '={{ $value }}',
        },
      },
    },
    displayName: 'Create If Not Exists',
    name: 'createIfNotExists_boolean',
    displayOptions: {
      show: {
        resource: ['Records'],
        operation: ['partialUpdateObject'],
      },
    },
  },
  {
    type: 'json',
    description: 'Attributes to update.',
    required: false,
    default: '{}',
    routing: {
      request: {
        body: '={{ JSON.parse($value) }}',
      },
    },
    displayName: 'Body',
    name: 'body_object',
    displayOptions: {
      show: {
        resource: ['Records'],
        operation: ['partialUpdateObject'],
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
        resource: ['Records'],
        operation: ['batch'],
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
    displayName: 'Batch Write Params',
    name: 'batch_write_params_object',
    type: 'multiOptions',
    description: 'Batch parameters.',
    required: true,
    default: [],
    options: [
      {
        name: 'Requests',
        value: 'requests_json',
      },
    ],
    displayOptions: {
      show: {
        resource: ['Records'],
        operation: ['batch'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Requests',
    name: 'requests_json',
    default: '[]',
    description: undefined,
    required: true,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'requests',
      },
    },
    displayOptions: {
      show: {
        batch_write_params_object: ['requests_json'],
        resource: ['Records'],
        operation: ['batch'],
      },
    },
  },
  {
    displayName: 'Batch Params',
    name: 'batch_params_object',
    type: 'multiOptions',
    description: 'Batch parameters.',
    required: true,
    default: [],
    options: [
      {
        name: 'Requests',
        value: 'requests_json',
      },
    ],
    displayOptions: {
      show: {
        resource: ['Records'],
        operation: ['multipleBatch'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Requests',
    name: 'requests_json',
    default: '[]',
    description: undefined,
    required: true,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'requests',
      },
    },
    displayOptions: {
      show: {
        batch_params_object: ['requests_json'],
        resource: ['Records'],
        operation: ['multipleBatch'],
      },
    },
  },
  {
    displayName: 'Get Objects Params',
    name: 'get_objects_params_object',
    type: 'multiOptions',
    description: 'Request parameters.',
    required: true,
    default: [],
    options: [
      {
        name: 'Requests',
        value: 'requests_json',
      },
    ],
    displayOptions: {
      show: {
        resource: ['Records'],
        operation: ['getObjects'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Requests',
    name: 'requests_json',
    default: '[]',
    description: undefined,
    required: true,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'requests',
      },
    },
    displayOptions: {
      show: {
        get_objects_params_object: ['requests_json'],
        resource: ['Records'],
        operation: ['getObjects'],
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
        resource: ['Indices'],
        operation: ['getSettings'],
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
    type: 'number',
    default: 1,
    routing: {
      request: {
        qs: {
          getVersion: '={{ $value }}',
        },
      },
    },
    displayName: 'Get Version',
    name: 'getVersion_number',
    displayOptions: {
      show: {
        resource: ['Indices'],
        operation: ['getSettings'],
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
        resource: ['Indices'],
        operation: ['setSettings'],
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
          forwardToReplicas: '={{ $value }}',
        },
      },
    },
    displayName: 'Forward To Replicas',
    name: 'forwardToReplicas_boolean',
    displayOptions: {
      show: {
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'multiOptions',
    name: 'index_settings',
    displayName: 'Index Settings',
    description: 'Index settings.',
    default: [],
    options: [
      {
        name: 'Attributes For Faceting',
        value: 'attributesforfaceting_json',
      },
      {
        name: 'Replicas',
        value: 'replicas_json',
      },
      {
        name: 'Pagination Limited To',
        value: 'paginationlimitedto_number',
      },
      {
        name: 'Unretrievable Attributes',
        value: 'unretrievableattributes_json',
      },
      {
        name: 'Disable Typo Tolerance On Words',
        value: 'disabletypotoleranceonwords_json',
      },
      {
        name: 'Attributes To Transliterate',
        value: 'attributestotransliterate_json',
      },
      {
        name: 'Camel Case Attributes',
        value: 'camelcaseattributes_json',
      },
      {
        name: 'Decompounded Attributes',
        value: 'decompounded_attributes_object',
      },
      {
        name: 'Index Languages',
        value: 'indexlanguages_json',
      },
      {
        name: 'Disable Prefix On Attributes',
        value: 'disableprefixonattributes_json',
      },
      {
        name: 'Allow Compression Of Integer Array',
        value: 'allowcompressionofintegerarray_boolean',
      },
      {
        name: 'Numeric Attributes For Filtering',
        value: 'numericattributesforfiltering_json',
      },
      {
        name: 'Separators To Index',
        value: 'separatorstoindex_string',
      },
      {
        name: 'Searchable Attributes',
        value: 'searchableattributes_json',
      },
      {
        name: 'Custom Normalization',
        value: 'custom_normalization_object',
      },
      {
        name: 'Attribute For Distinct',
        value: 'attributefordistinct_string',
      },
      {
        name: 'Max Facet Hits',
        value: 'maxfacethits_number',
      },
      {
        name: 'Keep Diacritics On Characters',
        value: 'keepdiacriticsoncharacters_string',
      },
      {
        name: 'Custom Ranking',
        value: 'customranking_json',
      },
      {
        name: 'Attributes To Retrieve',
        value: 'attributestoretrieve_json',
      },
      {
        name: 'Ranking',
        value: 'ranking_json',
      },
      {
        name: 'Relevancy Strictness',
        value: 'relevancystrictness_number',
      },
      {
        name: 'Attributes To Highlight',
        value: 'attributestohighlight_json',
      },
      {
        name: 'Attributes To Snippet',
        value: 'attributestosnippet_json',
      },
      {
        name: 'Highlight Pre Tag',
        value: 'highlightpretag_string',
      },
      {
        name: 'Highlight Post Tag',
        value: 'highlightposttag_string',
      },
      {
        name: 'Snippet Ellipsis Text',
        value: 'snippetellipsistext_string',
      },
      {
        name: 'Restrict Highlight And Snippet Arrays',
        value: 'restricthighlightandsnippetarrays_boolean',
      },
      {
        name: 'Hits Per Page',
        value: 'hitsperpage_number',
      },
      {
        name: 'Min Word Sizefor1Typo',
        value: 'minwordsizefor1typo_number',
      },
      {
        name: 'Min Word Sizefor2Typos',
        value: 'minwordsizefor2typos_number',
      },
      {
        name: 'Typo Tolerance',
        value: 'typotolerance',
      },
      {
        name: 'Allow Typos On Numeric Tokens',
        value: 'allowtyposonnumerictokens_boolean',
      },
      {
        name: 'Disable Typo Tolerance On Attributes',
        value: 'disabletypotoleranceonattributes_json',
      },
      {
        name: 'Ignore Plurals',
        value: 'ignoreplurals',
      },
      {
        name: 'Remove Stop Words',
        value: 'removestopwords',
      },
      {
        name: 'Query Languages',
        value: 'querylanguages_json',
      },
      {
        name: 'Decompound Query',
        value: 'decompoundquery_boolean',
      },
      {
        name: 'Enable Rules',
        value: 'enablerules_boolean',
      },
      {
        name: 'Enable Personalization',
        value: 'enablepersonalization_boolean',
      },
      {
        name: 'Query Type',
        value: 'querytype_options',
      },
      {
        name: 'Remove Words If No Results',
        value: 'removewordsifnoresults_options',
      },
      {
        name: 'Mode',
        value: 'mode_options',
      },
      {
        name: 'Semantic Search',
        value: 'semantic_search_object',
      },
      {
        name: 'Advanced Syntax',
        value: 'advancedsyntax_boolean',
      },
      {
        name: 'Optional Words',
        value: 'optionalwords',
      },
      {
        name: 'Disable Exact On Attributes',
        value: 'disableexactonattributes_json',
      },
      {
        name: 'Exact On Single Word Query',
        value: 'exactonsinglewordquery_options',
      },
      {
        name: 'Alternatives As Exact',
        value: 'alternativesasexact_json',
      },
      {
        name: 'Advanced Syntax Features',
        value: 'advancedsyntaxfeatures_json',
      },
      {
        name: 'Distinct',
        value: 'distinct',
      },
      {
        name: 'Replace Synonyms In Highlight',
        value: 'replacesynonymsinhighlight_boolean',
      },
      {
        name: 'Min Proximity',
        value: 'minproximity_number',
      },
      {
        name: 'Response Fields',
        value: 'responsefields_json',
      },
      {
        name: 'Max Values Per Facet',
        value: 'maxvaluesperfacet_number',
      },
      {
        name: 'Sort Facet Values By',
        value: 'sortfacetvaluesby_string',
      },
      {
        name: 'Attribute Criteria Computed By Min Proximity',
        value: 'attributecriteriacomputedbyminproximity_boolean',
      },
      {
        name: 'Rendering Content',
        value: 'rendering_content_object',
      },
      {
        name: 'Enable Re Ranking',
        value: 'enablereranking_boolean',
      },
      {
        name: 'Re Ranking Apply Filter',
        value: 'rerankingapplyfilter',
      },
    ],
    displayOptions: {
      show: {
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Attributes For Faceting',
    name: 'attributesForFaceting_json',
    default: '[]',
    description:
      'Attributes used for [faceting](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting).\n\nFacets are attributes that let you categorize search results.\nThey can be used for filtering search results.\nBy default, no attribute is used for faceting.\nAttribute names are case-sensitive.\n\n**Modifiers**\n\n- `filterOnly("ATTRIBUTE")`.\n  Allows the attribute to be used as a filter but doesn\'t evaluate the facet values.\n\n- `searchable("ATTRIBUTE")`.\n  Allows searching for facet values.\n\n- `afterDistinct("ATTRIBUTE")`.\n  Evaluates the facet count _after_ deduplication with `distinct`.\n  This ensures accurate facet counts.\n  You can apply this modifier to searchable facets: `afterDistinct(searchable(ATTRIBUTE))`.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'attributesForFaceting',
      },
    },
    displayOptions: {
      show: {
        index_settings: ['attributesforfaceting_json'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Replicas',
    name: 'replicas_json',
    default: '[]',
    description:
      'Creates [replica indices](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/in-depth/replicas).\n\nReplicas are copies of a primary index with the same records but different settings, synonyms, or rules.\nIf you want to offer a different ranking or sorting of your search results, you\'ll use replica indices.\nAll index operations on a primary index are automatically forwarded to its replicas.\nTo add a replica index, you must provide the complete set of replicas to this parameter.\nIf you omit a replica from this list, the replica turns into a regular, standalone index that will no longer be synced with the primary index.\n\n**Modifier**\n\n- `virtual("REPLICA")`.\n  Create a virtual replica,\n  Virtual replicas don\'t increase the number of records and are optimized for [Relevant sorting](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/in-depth/relevant-sort).\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'replicas',
      },
    },
    displayOptions: {
      show: {
        index_settings: ['replicas_json'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '100',
    default: 1000,
    description:
      "Maximum number of search results that can be obtained through pagination.\n\nHigher pagination limits might slow down your search.\nFor pagination limits above 1,000, the sorting of results beyond the 1,000th hit can't be guaranteed.\n",
    typeOptions: {
      maxValue: 20000,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'paginationLimitedTo',
      },
    },
    displayName: 'Pagination Limited To',
    name: 'paginationLimitedTo_number',
    displayOptions: {
      show: {
        index_settings: ['paginationlimitedto_number'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Unretrievable Attributes',
    name: 'unretrievableAttributes_json',
    default: '[]',
    description:
      "Attributes that can't be retrieved at query time.\n\nThis can be useful if you want to use an attribute for ranking or to [restrict access](https://www.algolia.com/doc/guides/security/api-keys/how-to/user-restricted-access-to-data),\nbut don't want to include it in the search results.\nAttribute names are case-sensitive.\n",
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'unretrievableAttributes',
      },
    },
    displayOptions: {
      show: {
        index_settings: ['unretrievableattributes_json'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Disable Typo Tolerance On Words',
    name: 'disableTypoToleranceOnWords_json',
    default: '[]',
    description:
      'Creates a list of [words which require exact matches](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/in-depth/configuring-typo-tolerance/#turn-off-typo-tolerance-for-certain-words).\nThis also turns off [word splitting and concatenation](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/splitting-and-concatenation) for the specified words.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'disableTypoToleranceOnWords',
      },
    },
    displayOptions: {
      show: {
        index_settings: ['disabletypotoleranceonwords_json'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Attributes To Transliterate',
    name: 'attributesToTransliterate_json',
    default: '[]',
    description:
      'Attributes, for which you want to support [Japanese transliteration](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations/#japanese-transliteration-and-type-ahead).\n\nTransliteration supports searching in any of the Japanese writing systems.\nTo support transliteration, you must set the indexing language to Japanese.\nAttribute names are case-sensitive.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'attributesToTransliterate',
      },
    },
    displayOptions: {
      show: {
        index_settings: ['attributestotransliterate_json'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Camel Case Attributes',
    name: 'camelCaseAttributes_json',
    default: '[]',
    description:
      'Attributes for which to split [camel case](https://wikipedia.org/wiki/Camel_case) words.\nAttribute names are case-sensitive.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'camelCaseAttributes',
      },
    },
    displayOptions: {
      show: {
        index_settings: ['camelcaseattributes_json'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'json',
    description:
      'Searchable attributes to which Algolia should apply [word segmentation](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/how-to/customize-segmentation) (decompounding).\nAttribute names are case-sensitive.\n\nCompound words are formed by combining two or more individual words,\nand are particularly prevalent in Germanic languages—for example, "firefighter".\nWith decompounding, the individual components are indexed separately.\n\nYou can specify different lists for different languages.\nDecompounding is supported for these languages:\nDutch (`nl`), German (`de`), Finnish (`fi`), Danish (`da`), Swedish (`sv`), and Norwegian (`no`).\nDecompounding doesn\'t work for words with [non-spacing mark Unicode characters](https://www.charactercodes.net/category/non-spacing_mark).\nFor example, `Gartenstühle` won\'t be decompounded if the `ü` consists of `u` (U+0075) and `◌̈` (U+0308).\n',
    required: false,
    default: '{}',
    routing: {
      send: {
        type: 'body',
        property: 'decompoundedAttributes',
        value: '={{ JSON.parse($value) }}',
      },
    },
    displayName: 'Decompounded Attributes',
    name: 'decompounded_attributes_object',
    displayOptions: {
      show: {
        index_settings: ['decompounded_attributes_object'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Index Languages',
    name: 'indexLanguages_json',
    default: '[]',
    description:
      "Languages for language-specific processing steps, such as word detection and dictionary settings.\n\n**You should always specify an indexing language.**\nIf you don't specify an indexing language, the search engine uses all [supported languages](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/supported-languages),\nor the languages you specified with the `ignorePlurals` or `removeStopWords` parameters.\nThis can lead to unexpected search results.\nFor more information, see [Language-specific configuration](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations).\n",
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'indexLanguages',
      },
    },
    displayOptions: {
      show: {
        index_settings: ['indexlanguages_json'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Disable Prefix On Attributes',
    name: 'disablePrefixOnAttributes_json',
    default: '[]',
    description:
      'Searchable attributes for which you want to turn off [prefix matching](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/#adjusting-prefix-search).\nAttribute names are case-sensitive.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'disablePrefixOnAttributes',
      },
    },
    displayOptions: {
      show: {
        index_settings: ['disableprefixonattributes_json'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      'Whether arrays with exclusively non-negative integers should be compressed for better performance.\nIf true, the compressed arrays may be reordered.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'allowCompressionOfIntegerArray',
      },
    },
    displayName: 'Allow Compression Of Integer Array',
    name: 'allowCompressionOfIntegerArray_boolean',
    displayOptions: {
      show: {
        index_settings: ['allowcompressionofintegerarray_boolean'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Numeric Attributes For Filtering',
    name: 'numericAttributesForFiltering_json',
    default: '[]',
    description:
      'Numeric attributes that can be used as [numerical filters](https://www.algolia.com/doc/guides/managing-results/rules/detecting-intent/how-to/applying-a-custom-filter-for-a-specific-query/#numerical-filters).\nAttribute names are case-sensitive.\n\nBy default, all numeric attributes are available as numerical filters.\nFor faster indexing, reduce the number of numeric attributes.\n\nTo turn off filtering for all numeric attributes, specify an attribute that doesn\'t exist in your index, such as `NO_NUMERIC_FILTERING`.\n\n**Modifier**\n\n- `equalOnly("ATTRIBUTE")`.\n  Support only filtering based on equality comparisons `=` and `!=`.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'numericAttributesForFiltering',
      },
    },
    displayOptions: {
      show: {
        index_settings: ['numericattributesforfiltering_json'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '+#',
    default: '',
    description:
      'Control which non-alphanumeric characters are indexed.\n\nBy default, Algolia ignores [non-alphanumeric characters](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/how-to/how-to-search-in-hyphenated-attributes/#handling-non-alphanumeric-characters) like hyphen (`-`), plus (`+`), and parentheses (`(`,`)`).\nTo include such characters, define them with `separatorsToIndex`.\n\nSeparators are all non-letter characters except spaces and currency characters, such as $€£¥.\n\nWith `separatorsToIndex`, Algolia treats separator characters as separate words.\nFor example, in a search for "Disney+", Algolia considers "Disney" and "+" as two separate words.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'separatorsToIndex',
      },
    },
    displayName: 'Separators To Index',
    name: 'separatorsToIndex_string',
    displayOptions: {
      show: {
        index_settings: ['separatorstoindex_string'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Searchable Attributes',
    name: 'searchableAttributes_json',
    default: '[]',
    description:
      'Attributes used for searching. Attribute names are case-sensitive.\n\nBy default, all attributes are searchable and the [Attribute](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/#attribute) ranking criterion is turned off.\nWith a non-empty list, Algolia only returns results with matches in the selected attributes.\nIn addition, the Attribute ranking criterion is turned on: matches in attributes that are higher in the list of `searchableAttributes` rank first.\nTo make matches in two attributes rank equally, include them in a comma-separated string, such as `"title,alternate_title"`.\nAttributes with the same priority are always unordered.\n\nFor more information, see [Searchable attributes](https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/how-to/setting-searchable-attributes).\n\n**Modifier**\n\n- `unordered("ATTRIBUTE")`.\n  Ignore the position of a match within the attribute.\n\nWithout a modifier, matches at the beginning of an attribute rank higher than matches at the end.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'searchableAttributes',
      },
    },
    displayOptions: {
      show: {
        index_settings: ['searchableattributes_json'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'json',
    description:
      "Characters and their normalized replacements.\nThis overrides Algolia's default [normalization](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/normalization).\n",
    required: false,
    default: '{}',
    routing: {
      send: {
        type: 'body',
        property: 'customNormalization',
        value: '={{ JSON.parse($value) }}',
      },
    },
    displayName: 'Custom Normalization',
    name: 'custom_normalization_object',
    displayOptions: {
      show: {
        index_settings: ['custom_normalization_object'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'url',
    default: '',
    description:
      'Attribute that should be used to establish groups of results.\nAttribute names are case-sensitive.\n\nAll records with the same value for this attribute are considered a group.\nYou can combine `attributeForDistinct` with the `distinct` search parameter to control\nhow many items per group are included in the search results.\n\nIf you want to use the same attribute also for faceting, use the `afterDistinct` modifier of the `attributesForFaceting` setting.\nThis applies faceting _after_ deduplication, which will result in accurate facet counts.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'attributeForDistinct',
      },
    },
    displayName: 'Attribute For Distinct',
    name: 'attributeForDistinct_string',
    displayOptions: {
      show: {
        index_settings: ['attributefordistinct_string'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'number',
    default: 10,
    description:
      'Maximum number of facet values to return when [searching for facet values](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/#search-for-facet-values).',
    typeOptions: {
      maxValue: 100,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'maxFacetHits',
      },
    },
    displayName: 'Max Facet Hits',
    name: 'maxFacetHits_number',
    displayOptions: {
      show: {
        index_settings: ['maxfacethits_number'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'øé',
    default: '',
    description:
      'Characters for which diacritics should be preserved.\n\nBy default, Algolia removes diacritics from letters.\nFor example, `é` becomes `e`. If this causes issues in your search,\nyou can specify characters that should keep their diacritics.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'keepDiacriticsOnCharacters',
      },
    },
    displayName: 'Keep Diacritics On Characters',
    name: 'keepDiacriticsOnCharacters_string',
    displayOptions: {
      show: {
        index_settings: ['keepdiacriticsoncharacters_string'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Custom Ranking',
    name: 'customRanking_json',
    default: '[]',
    description:
      'Attributes to use as [custom ranking](https://www.algolia.com/doc/guides/managing-results/must-do/custom-ranking).\nAttribute names are case-sensitive.\n\nThe custom ranking attributes decide which items are shown first if the other ranking criteria are equal.\n\nRecords with missing values for your selected custom ranking attributes are always sorted last.\nBoolean attributes are sorted based on their alphabetical order.\n\n**Modifiers**\n\n- `asc("ATTRIBUTE")`.\n  Sort the index by the values of an attribute, in ascending order.\n\n- `desc("ATTRIBUTE")`.\n  Sort the index by the values of an attribute, in descending order.\n\nIf you use two or more custom ranking attributes,\n[reduce the precision](https://www.algolia.com/doc/guides/managing-results/must-do/custom-ranking/how-to/controlling-custom-ranking-metrics-precision) of your first attributes,\nor the other attributes will never be applied.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'customRanking',
      },
    },
    displayOptions: {
      show: {
        index_settings: ['customranking_json'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Attributes To Retrieve',
    name: 'attributesToRetrieve_json',
    default: '[]',
    description:
      'Attributes to include in the API response\nTo reduce the size of your response, you can retrieve only some of the attributes.\nAttribute names are case-sensitive\n- `*` retrieves all attributes, except attributes included in the `customRanking` and `unretrievableAttributes` settings.\n- To retrieve all attributes except a specific one, prefix the attribute with a dash and combine it with the `*`: `["*", "-ATTRIBUTE"]`.\n- The `objectID` attribute is always included.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'attributesToRetrieve',
      },
    },
    displayOptions: {
      show: {
        index_settings: ['attributestoretrieve_json'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Ranking',
    name: 'ranking_json',
    default: '[]',
    description:
      'Determines the order in which Algolia returns your results.\n\nBy default, each entry corresponds to a [ranking criteria](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria).\nThe tie-breaking algorithm sequentially applies each criterion in the order they\'re specified.\nIf you configure a replica index for [sorting by an attribute](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/how-to/sort-by-attribute),\nyou put the sorting attribute at the top of the list.\n\n**Modifiers**\n\n- `asc("ATTRIBUTE")`.\n  Sort the index by the values of an attribute, in ascending order.\n- `desc("ATTRIBUTE")`.\n  Sort the index by the values of an attribute, in descending order.\n\nBefore you modify the default setting,\nyou should test your changes in the dashboard,\nand by [A/B testing](https://www.algolia.com/doc/guides/ab-testing/what-is-ab-testing).\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'ranking',
      },
    },
    displayOptions: {
      show: {
        index_settings: ['ranking_json'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '90',
    default: 100,
    description:
      "Relevancy threshold below which less relevant results aren't included in the results\nYou can only set `relevancyStrictness` on [virtual replica indices](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/in-depth/replicas/#what-are-virtual-replicas).\nUse this setting to strike a balance between the relevance and number of returned results.\n",
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'relevancyStrictness',
      },
    },
    displayName: 'Relevancy Strictness',
    name: 'relevancyStrictness_number',
    displayOptions: {
      show: {
        index_settings: ['relevancystrictness_number'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Attributes To Highlight',
    name: 'attributesToHighlight_json',
    default: '[]',
    description:
      'Attributes to highlight\nBy default, all searchable attributes are highlighted.\nUse `*` to highlight all attributes or use an empty array `[]` to turn off highlighting.\nAttribute names are case-sensitive\nWith highlighting, strings that match the search query are surrounded by HTML tags defined by `highlightPreTag` and `highlightPostTag`.\nYou can use this to visually highlight matching parts of a search query in your UI\nFor more information, see [Highlighting and snippeting](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/highlighting-snippeting/js).\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'attributesToHighlight',
      },
    },
    displayOptions: {
      show: {
        index_settings: ['attributestohighlight_json'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Attributes To Snippet',
    name: 'attributesToSnippet_json',
    default: '[]',
    description:
      'Attributes for which to enable snippets.\nAttribute names are case-sensitive\nSnippets provide additional context to matched words.\nIf you enable snippets, they include 10 words, including the matched word.\nThe matched word will also be wrapped by HTML tags for highlighting.\nYou can adjust the number of words with the following notation: `ATTRIBUTE:NUMBER`,\nwhere `NUMBER` is the number of words to be extracted.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'attributesToSnippet',
      },
    },
    displayOptions: {
      show: {
        index_settings: ['attributestosnippet_json'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'string',
    default: '<em>',
    description:
      'HTML tag to insert before the highlighted parts in all highlighted results and snippets.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'highlightPreTag',
      },
    },
    displayName: 'Highlight Pre Tag',
    name: 'highlightPreTag_string',
    displayOptions: {
      show: {
        index_settings: ['highlightpretag_string'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'string',
    default: '</em>',
    description:
      'HTML tag to insert after the highlighted parts in all highlighted results and snippets.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'highlightPostTag',
      },
    },
    displayName: 'Highlight Post Tag',
    name: 'highlightPostTag_string',
    displayOptions: {
      show: {
        index_settings: ['highlightposttag_string'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'string',
    default: '…',
    description: 'String used as an ellipsis indicator when a snippet is truncated.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'snippetEllipsisText',
      },
    },
    displayName: 'Snippet Ellipsis Text',
    name: 'snippetEllipsisText_string',
    displayOptions: {
      show: {
        index_settings: ['snippetellipsistext_string'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      'Whether to restrict highlighting and snippeting to items that at least partially matched the search query.\nBy default, all items are highlighted and snippeted.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'restrictHighlightAndSnippetArrays',
      },
    },
    displayName: 'Restrict Highlight And Snippet Arrays',
    name: 'restrictHighlightAndSnippetArrays_boolean',
    displayOptions: {
      show: {
        index_settings: ['restricthighlightandsnippetarrays_boolean'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'number',
    default: 20,
    description: 'Number of hits per page.',
    typeOptions: {
      minValue: 1,
      maxValue: 1000,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'hitsPerPage',
      },
    },
    displayName: 'Hits Per Page',
    name: 'hitsPerPage_number',
    displayOptions: {
      show: {
        index_settings: ['hitsperpage_number'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'number',
    default: 4,
    description:
      'Minimum number of characters a word in the search query must contain to accept matches with [one typo](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/in-depth/configuring-typo-tolerance/#configuring-word-length-for-typos).',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'minWordSizefor1Typo',
      },
    },
    displayName: 'Min Word Sizefor1Typo',
    name: 'minWordSizefor1Typo_number',
    displayOptions: {
      show: {
        index_settings: ['minwordsizefor1typo_number'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'number',
    default: 8,
    description:
      'Minimum number of characters a word in the search query must contain to accept matches with [two typos](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/in-depth/configuring-typo-tolerance/#configuring-word-length-for-typos).',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'minWordSizefor2Typos',
      },
    },
    displayName: 'Min Word Sizefor2Typos',
    name: 'minWordSizefor2Typos_number',
    displayOptions: {
      show: {
        index_settings: ['minwordsizefor2typos_number'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'options',
    name: 'typoTolerance',
    displayName: 'Typo Tolerance',
    default: '',
    options: [
      {
        name: 'Boolean',
        value: 'boolean',
      },
      {
        name: 'Typo tolerance',
        value: 'typo_tolerance',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'typoTolerance',
        value:
          '={{ typeof $parameter.typoTolerance_boolean !== "undefined" ? $parameter.typoTolerance_boolean : typeof $parameter.typoTolerance_options !== "undefined" ? $parameter.typoTolerance_options : undefined }}',
      },
    },
    displayOptions: {
      show: {
        index_settings: ['typotolerance'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description:
      'Whether typo tolerance is active. If true, matches with typos are included in the search results and rank after exact matches.',
    displayName: 'Typo Tolerance (Boolean)',
    name: 'typoTolerance_boolean',
    displayOptions: {
      show: {
        typoTolerance: ['boolean'],
        index_settings: ['typotolerance'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description:
      '- `min`. Return matches with the lowest number of typos.\n  For example, if you have matches without typos, only include those.\n  But if there are no matches without typos (with 1 typo), include matches with 1 typo (2 typos).\n- `strict`. Return matches with the two lowest numbers of typos.\n  With `strict`, the Typo ranking criterion is applied first in the `ranking` setting.\n',
    options: [
      {
        name: 'min',
        value: 'min',
      },
      {
        name: 'strict',
        value: 'strict',
      },
      {
        name: 'true',
        value: 'true',
      },
      {
        name: 'false',
        value: 'false',
      },
    ],
    displayName: 'Typo Tolerance (Typo Tolerance)',
    name: 'typoTolerance_options',
    displayOptions: {
      show: {
        typoTolerance: ['typo_tolerance'],
        index_settings: ['typotolerance'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description:
      'Whether to allow typos on numbers in the search query\nTurn off this setting to reduce the number of irrelevant matches\nwhen searching in large sets of similar numbers.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'allowTyposOnNumericTokens',
      },
    },
    displayName: 'Allow Typos On Numeric Tokens',
    name: 'allowTyposOnNumericTokens_boolean',
    displayOptions: {
      show: {
        index_settings: ['allowtyposonnumerictokens_boolean'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Disable Typo Tolerance On Attributes',
    name: 'disableTypoToleranceOnAttributes_json',
    default: '[]',
    description:
      'Attributes for which you want to turn off [typo tolerance](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance).\nAttribute names are case-sensitive\nReturning only exact matches can help when\n- [Searching in hyphenated attributes](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/how-to/how-to-search-in-hyphenated-attributes).\n- Reducing the number of matches when you have too many.\n  This can happen with attributes that are long blocks of text, such as product descriptions\nConsider alternatives such as `disableTypoToleranceOnWords` or adding synonyms if your attributes have intentional unusual spellings that might look like typos.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'disableTypoToleranceOnAttributes',
      },
    },
    displayOptions: {
      show: {
        index_settings: ['disabletypotoleranceonattributes_json'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'options',
    name: 'ignorePlurals',
    displayName: 'Ignore Plurals',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'Boolean string',
        value: 'boolean_string',
      },
      {
        name: 'Boolean',
        value: 'boolean',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'ignorePlurals',
        value:
          '={{ typeof $parameter.ignorePlurals_json !== "undefined" ? JSON.parse($parameter.ignorePlurals_json) : typeof $parameter.ignorePlurals_options !== "undefined" ? $parameter.ignorePlurals_options : typeof $parameter.ignorePlurals_boolean !== "undefined" ? $parameter.ignorePlurals_boolean : undefined }}',
      },
    },
    displayOptions: {
      show: {
        index_settings: ['ignoreplurals'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Ignore Plurals (Array)',
    name: 'ignorePlurals_json',
    default: '[]',
    description:
      'ISO code for languages for which this feature should be active.\nThis overrides languages you set with `queryLanguages`.\n',
    required: false,
    displayOptions: {
      show: {
        ignorePlurals: ['array'],
        index_settings: ['ignoreplurals'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    options: [
      {
        name: 'true',
        value: 'true',
      },
      {
        name: 'false',
        value: 'false',
      },
    ],
    displayName: 'Ignore Plurals (Boolean String)',
    name: 'ignorePlurals_options',
    displayOptions: {
      show: {
        ignorePlurals: ['boolean_string'],
        index_settings: ['ignoreplurals'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      "If true, `ignorePlurals` is active for all languages included in `queryLanguages`, or for all supported languages, if `queryLanguges` is empty.\nIf false, singulars, plurals, and other declensions won't be considered equivalent.\n",
    displayName: 'Ignore Plurals (Boolean)',
    name: 'ignorePlurals_boolean',
    displayOptions: {
      show: {
        ignorePlurals: ['boolean'],
        index_settings: ['ignoreplurals'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'options',
    name: 'removeStopWords',
    displayName: 'Remove Stop Words',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
      {
        name: 'Boolean',
        value: 'boolean',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'removeStopWords',
        value:
          '={{ typeof $parameter.removeStopWords_json !== "undefined" ? JSON.parse($parameter.removeStopWords_json) : typeof $parameter.removeStopWords_boolean !== "undefined" ? $parameter.removeStopWords_boolean : undefined }}',
      },
    },
    displayOptions: {
      show: {
        index_settings: ['removestopwords'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Remove Stop Words (Array)',
    name: 'removeStopWords_json',
    default: '[]',
    description:
      'ISO code for languages for which stop words should be removed. This overrides languages you set in `queryLanguges`.',
    required: false,
    displayOptions: {
      show: {
        removeStopWords: ['array'],
        index_settings: ['removestopwords'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      'If true, stop words are removed for all languages you included in `queryLanguages`, or for all supported languages, if `queryLanguages` is empty.\nIf false, stop words are not removed.\n',
    displayName: 'Remove Stop Words (Boolean)',
    name: 'removeStopWords_boolean',
    displayOptions: {
      show: {
        removeStopWords: ['boolean'],
        index_settings: ['removestopwords'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Query Languages',
    name: 'queryLanguages_json',
    default: '[]',
    description:
      "Languages for language-specific query processing steps such as plurals, stop-word removal, and word-detection dictionaries \nThis setting sets a default list of languages used by the `removeStopWords` and `ignorePlurals` settings.\nThis setting also sets a dictionary for word detection in the logogram-based [CJK](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/normalization/#normalization-for-logogram-based-languages-cjk) languages.\nTo support this, you must place the CJK language **first** \n**You should always specify a query language.**\nIf you don't specify an indexing language, the search engine uses all [supported languages](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/supported-languages),\nor the languages you specified with the `ignorePlurals` or `removeStopWords` parameters.\nThis can lead to unexpected search results.\nFor more information, see [Language-specific configuration](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations).\n",
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'queryLanguages',
      },
    },
    displayOptions: {
      show: {
        index_settings: ['querylanguages_json'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description:
      "Whether to split compound words in the query into their building blocks\nFor more information, see [Word segmentation](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations/#splitting-compound-words).\nWord segmentation is supported for these languages: German, Dutch, Finnish, Swedish, and Norwegian.\nDecompounding doesn't work for words with [non-spacing mark Unicode characters](https://www.charactercodes.net/category/non-spacing_mark).\nFor example, `Gartenstühle` won't be decompounded if the `ü` consists of `u` (U+0075) and `◌̈` (U+0308).\n",
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'decompoundQuery',
      },
    },
    displayName: 'Decompound Query',
    name: 'decompoundQuery_boolean',
    displayOptions: {
      show: {
        index_settings: ['decompoundquery_boolean'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description: 'Whether to enable rules.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'enableRules',
      },
    },
    displayName: 'Enable Rules',
    name: 'enableRules_boolean',
    displayOptions: {
      show: {
        index_settings: ['enablerules_boolean'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description: 'Whether to enable Personalization.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'enablePersonalization',
      },
    },
    displayName: 'Enable Personalization',
    name: 'enablePersonalization_boolean',
    displayOptions: {
      show: {
        index_settings: ['enablepersonalization_boolean'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'options',
    default: 'prefixLast',
    description:
      'Determines if and how query words are interpreted as prefixes.\n\nBy default, only the last query word is treated as a prefix (`prefixLast`).\nTo turn off prefix search, use `prefixNone`.\nAvoid `prefixAll`, which treats all query words as prefixes.\nThis might lead to counterintuitive results and makes your search slower.\n\nFor more information, see [Prefix searching](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/prefix-searching).\n',
    options: [
      {
        name: 'prefixLast',
        value: 'prefixLast',
      },
      {
        name: 'prefixAll',
        value: 'prefixAll',
      },
      {
        name: 'prefixNone',
        value: 'prefixNone',
      },
    ],
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'queryType',
      },
    },
    displayName: 'Query Type',
    name: 'queryType_options',
    displayOptions: {
      show: {
        index_settings: ['querytype_options'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'options',
    placeholder: 'firstWords',
    default: 'none',
    description:
      "Strategy for removing words from the query when it doesn't return any results.\nThis helps to avoid returning empty search results.\n\n- `none`.\n  No words are removed when a query doesn't return results.\n\n- `lastWords`.\n  Treat the last (then second to last, then third to last) word as optional,\n  until there are results or at most 5 words have been removed.\n\n- `firstWords`.\n  Treat the first (then second, then third) word as optional,\n  until there are results or at most 5 words have been removed.\n\n- `allOptional`.\n  Treat all words as optional.\n\nFor more information, see [Remove words to improve results](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/empty-or-insufficient-results/in-depth/why-use-remove-words-if-no-results).\n",
    options: [
      {
        name: 'none',
        value: 'none',
      },
      {
        name: 'lastWords',
        value: 'lastWords',
      },
      {
        name: 'firstWords',
        value: 'firstWords',
      },
      {
        name: 'allOptional',
        value: 'allOptional',
      },
    ],
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'removeWordsIfNoResults',
      },
    },
    displayName: 'Remove Words If No Results',
    name: 'removeWordsIfNoResults_options',
    displayOptions: {
      show: {
        index_settings: ['removewordsifnoresults_options'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'options',
    default: 'keywordSearch',
    description:
      'Search mode the index will use to query for results.\n\nThis setting only applies to indices, for which Algolia enabled NeuralSearch for you.\n',
    options: [
      {
        name: 'neuralSearch',
        value: 'neuralSearch',
      },
      {
        name: 'keywordSearch',
        value: 'keywordSearch',
      },
    ],
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'mode',
      },
    },
    displayName: 'Mode',
    name: 'mode_options',
    displayOptions: {
      show: {
        index_settings: ['mode_options'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'json',
    description:
      'Settings for the semantic search part of NeuralSearch.\nOnly used when `mode` is `neuralSearch`.\n',
    required: false,
    default: '{}',
    routing: {
      send: {
        type: 'body',
        property: 'semanticSearch',
        value: '={{ JSON.parse($value) }}',
      },
    },
    displayName: 'Semantic Search',
    name: 'semantic_search_object',
    displayOptions: {
      show: {
        index_settings: ['semantic_search_object'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      'Whether to support phrase matching and excluding words from search queries\nUse the `advancedSyntaxFeatures` parameter to control which feature is supported.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'advancedSyntax',
      },
    },
    displayName: 'Advanced Syntax',
    name: 'advancedSyntax_boolean',
    displayOptions: {
      show: {
        index_settings: ['advancedsyntax_boolean'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'options',
    name: 'optionalWords',
    displayName: 'Optional Words',
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
      {
        name: 'Optional words array',
        value: 'optional_words_array',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'optionalWords',
        value:
          '={{ typeof $parameter.optionalWords_string !== "undefined" ? $parameter.optionalWords_string : typeof $parameter.optionalWords_null !== "undefined" ? JSON.parse($parameter.optionalWords_null) : typeof $parameter.optionalWords_json !== "undefined" ? JSON.parse($parameter.optionalWords_json) : undefined }}',
      },
    },
    displayOptions: {
      show: {
        index_settings: ['optionalwords'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    displayName: 'Optional Words (String)',
    name: 'optionalWords_string',
    displayOptions: {
      show: {
        optionalWords: ['string'],
        index_settings: ['optionalwords'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Optional Words (Null)',
    name: 'optionalWords_null',
    default: 'null',
    description: undefined,
    required: false,
    disabledOptions: {
      show: {
        optionalWords: ['null'],
      },
    },
    displayOptions: {
      show: {
        optionalWords: ['null'],
        index_settings: ['optionalwords'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Optional Words (Optional Words Array)',
    name: 'optionalWords_json',
    default: '[]',
    description:
      'List of [optional words](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/empty-or-insufficient-results/#creating-a-list-of-optional-words).',
    required: false,
    displayOptions: {
      show: {
        optionalWords: ['optional_words_array'],
        index_settings: ['optionalwords'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Disable Exact On Attributes',
    name: 'disableExactOnAttributes_json',
    default: '[]',
    description:
      'Searchable attributes for which you want to [turn off the Exact ranking criterion](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/adjust-exact-settings/#turn-off-exact-for-some-attributes).\nAttribute names are case-sensitive\nThis can be useful for attributes with long values, where the likelihood of an exact match is high,\nsuch as product descriptions.\nTurning off the Exact ranking criterion for these attributes favors exact matching on other attributes.\nThis reduces the impact of individual attributes with a lot of content on ranking.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'disableExactOnAttributes',
      },
    },
    displayOptions: {
      show: {
        index_settings: ['disableexactonattributes_json'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'options',
    default: 'attribute',
    description:
      'Determines how the [Exact ranking criterion](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/adjust-exact-settings/#turn-off-exact-for-some-attributes) is computed when the search query has only one word.\n\n- `attribute`.\n  The Exact ranking criterion is 1 if the query word and attribute value are the same.\n  For example, a search for "road" will match the value "road", but not "road trip".\n\n- `none`.\n  The Exact ranking criterion is ignored on single-word searches.\n\n- `word`.\n  The Exact ranking criterion is 1 if the query word is found in the attribute value.\n  The query word must have at least 3 characters and must not be a stop word.\n  Only exact matches will be highlighted,\n  partial and prefix matches won\'t.\n',
    options: [
      {
        name: 'attribute',
        value: 'attribute',
      },
      {
        name: 'none',
        value: 'none',
      },
      {
        name: 'word',
        value: 'word',
      },
    ],
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'exactOnSingleWordQuery',
      },
    },
    displayName: 'Exact On Single Word Query',
    name: 'exactOnSingleWordQuery_options',
    displayOptions: {
      show: {
        index_settings: ['exactonsinglewordquery_options'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Alternatives As Exact',
    name: 'alternativesAsExact_json',
    default: '[]',
    description:
      'Determine which plurals and synonyms should be considered an exact matches\nBy default, Algolia treats singular and plural forms of a word, and single-word synonyms, as [exact](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/#exact) matches when searching.\nFor example\n- "swimsuit" and "swimsuits" are treated the same\n- "swimsuit" and "swimwear" are treated the same (if they are [synonyms](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/adding-synonyms/#regular-synonyms))\n- `ignorePlurals`.\n  Plurals and similar declensions added by the `ignorePlurals` setting are considered exact matches\n- `singleWordSynonym`.\n  Single-word synonyms, such as "NY" = "NYC", are considered exact matches\n- `multiWordsSynonym`.\n  Multi-word synonyms, such as "NY" = "New York", are considered exact matches.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'alternativesAsExact',
      },
    },
    displayOptions: {
      show: {
        index_settings: ['alternativesasexact_json'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Advanced Syntax Features',
    name: 'advancedSyntaxFeatures_json',
    default: '[]',
    description:
      'Advanced search syntax features you want to support\n- `exactPhrase`.\n  Phrases in quotes must match exactly.\n  For example, `sparkly blue "iPhone case"` only returns records with the exact string "iPhone case"\n- `excludeWords`.\n  Query words prefixed with a `-` must not occur in a record.\n  For example, `search -engine` matches records that contain "search" but not "engine"\nThis setting only has an effect if `advancedSyntax` is true.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'advancedSyntaxFeatures',
      },
    },
    displayOptions: {
      show: {
        index_settings: ['advancedsyntaxfeatures_json'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'options',
    name: 'distinct',
    displayName: 'Distinct',
    default: '',
    options: [
      {
        name: 'Boolean',
        value: 'boolean',
      },
      {
        name: 'Integer',
        value: 'integer',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'distinct',
        value:
          '={{ typeof $parameter.distinct_boolean !== "undefined" ? $parameter.distinct_boolean : typeof $parameter.distinct_number !== "undefined" ? $parameter.distinct_number : undefined }}',
      },
    },
    displayOptions: {
      show: {
        index_settings: ['distinct'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      'Whether deduplication is turned on. If true, only one member of a group is shown in the search results.',
    displayName: 'Distinct (Boolean)',
    name: 'distinct_boolean',
    displayOptions: {
      show: {
        distinct: ['boolean'],
        index_settings: ['distinct'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description:
      "Number of members of a group of records to include in the search results.\n\n- Don't use `distinct > 1` for records that might be [promoted by rules](https://www.algolia.com/doc/guides/managing-results/rules/merchandising-and-promoting/how-to/promote-hits).\n  The number of hits won't be correct and faceting won't work as expected.\n- With `distinct > 1`, the `hitsPerPage` parameter controls the number of returned groups.\n  For example, with `hitsPerPage: 10` and `distinct: 2`, up to 20 records are returned.\n  Likewise, the `nbHits` response attribute contains the number of returned groups.\n",
    typeOptions: {
      minValue: 0,
      maxValue: 4,
    },
    displayName: 'Distinct (Integer)',
    name: 'distinct_number',
    displayOptions: {
      show: {
        distinct: ['integer'],
        index_settings: ['distinct'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      'Whether to replace a highlighted word with the matched synonym\nBy default, the original words are highlighted even if a synonym matches.\nFor example, with `home` as a synonym for `house` and a search for `home`,\nrecords matching either "home" or "house" are included in the search results,\nand either "home" or "house" are highlighted\nWith `replaceSynonymsInHighlight` set to `true`, a search for `home` still matches the same records,\nbut all occurrences of "house" are replaced by "home" in the highlighted response.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'replaceSynonymsInHighlight',
      },
    },
    displayName: 'Replace Synonyms In Highlight',
    name: 'replaceSynonymsInHighlight_boolean',
    displayOptions: {
      show: {
        index_settings: ['replacesynonymsinhighlight_boolean'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'number',
    default: 1,
    description:
      'Minimum proximity score for two matching words\nThis adjusts the [Proximity ranking criterion](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/#proximity)\nby equally scoring matches that are farther apart\nFor example, if `minProximity` is 2, neighboring matches and matches with one word between them would have the same score.\n',
    typeOptions: {
      minValue: 1,
      maxValue: 7,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'minProximity',
      },
    },
    displayName: 'Min Proximity',
    name: 'minProximity_number',
    displayOptions: {
      show: {
        index_settings: ['minproximity_number'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Response Fields',
    name: 'responseFields_json',
    default: '[]',
    description:
      "Properties to include in the API response of search and browse requests\nBy default, all response properties are included.\nTo reduce the response size, you can select which properties should be included\nAn empty list may lead to an empty API response (except properties you can't exclude)\nYou can't exclude these properties:\n`message`, `warning`, `cursor`, `abTestVariantID`,\nor any property added by setting `getRankingInfo` to true\nYour search depends on the `hits` field. If you omit this field, searches won't return any results.\nYour UI might also depend on other properties, for example, for pagination.\nBefore restricting the response size, check the impact on your search experience.\n",
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'responseFields',
      },
    },
    displayOptions: {
      show: {
        index_settings: ['responsefields_json'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'number',
    default: 100,
    description: 'Maximum number of facet values to return for each facet.',
    typeOptions: {
      maxValue: 1000,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'maxValuesPerFacet',
      },
    },
    displayName: 'Max Values Per Facet',
    name: 'maxValuesPerFacet_number',
    displayOptions: {
      show: {
        index_settings: ['maxvaluesperfacet_number'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'string',
    default: 'count',
    description:
      "Order in which to retrieve facet values\n- `count`.\n  Facet values are retrieved by decreasing count.\n  The count is the number of matching records containing this facet value\n- `alpha`.\n  Retrieve facet values alphabetically\nThis setting doesn't influence how facet values are displayed in your UI (see `renderingContent`).\nFor more information, see [facet value display](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/facet-display/js).\n",
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'sortFacetValuesBy',
      },
    },
    displayName: 'Sort Facet Values By',
    name: 'sortFacetValuesBy_string',
    displayOptions: {
      show: {
        index_settings: ['sortfacetvaluesby_string'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      'Whether the best matching attribute should be determined by minimum proximity\nThis setting only affects ranking if the Attribute ranking criterion comes before Proximity in the `ranking` setting.\nIf true, the best matching attribute is selected based on the minimum proximity of multiple matches.\nOtherwise, the best matching attribute is determined by the order in the `searchableAttributes` setting.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'attributeCriteriaComputedByMinProximity',
      },
    },
    displayName: 'Attribute Criteria Computed By Min Proximity',
    name: 'attributeCriteriaComputedByMinProximity_boolean',
    displayOptions: {
      show: {
        index_settings: ['attributecriteriacomputedbyminproximity_boolean'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'json',
    description:
      'Extra data that can be used in the search UI.\n\nYou can use this to control aspects of your search UI, such as the order of facet names and values\nwithout changing your frontend code.\n',
    required: false,
    default: '{}',
    routing: {
      send: {
        type: 'body',
        property: 'renderingContent',
        value: '={{ JSON.parse($value) }}',
      },
    },
    displayName: 'Rendering Content',
    name: 'rendering_content_object',
    displayOptions: {
      show: {
        index_settings: ['rendering_content_object'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description:
      'Whether this search will use [Dynamic Re-Ranking](https://www.algolia.com/doc/guides/algolia-ai/re-ranking)\nThis setting only has an effect if you activated Dynamic Re-Ranking for this index in the Algolia dashboard.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'enableReRanking',
      },
    },
    displayName: 'Enable Re Ranking',
    name: 'enableReRanking_boolean',
    displayOptions: {
      show: {
        index_settings: ['enablereranking_boolean'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'options',
    name: 'reRankingApplyFilter',
    displayName: 'Re Ranking Apply Filter',
    default: '',
    options: [
      {
        name: 'Array',
        value: 'array',
      },
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
        property: 'reRankingApplyFilter',
        value:
          '={{ typeof $parameter.reRankingApplyFilter_json !== "undefined" ? JSON.parse($parameter.reRankingApplyFilter_json) : typeof $parameter.reRankingApplyFilter_string !== "undefined" ? $parameter.reRankingApplyFilter_string : typeof $parameter.reRankingApplyFilter_null !== "undefined" ? JSON.parse($parameter.reRankingApplyFilter_null) : undefined }}',
      },
    },
    displayOptions: {
      show: {
        index_settings: ['rerankingapplyfilter'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Re Ranking Apply Filter (Array)',
    name: 'reRankingApplyFilter_json',
    default: '[]',
    description: undefined,
    required: false,
    displayOptions: {
      show: {
        reRankingApplyFilter: ['array'],
        index_settings: ['rerankingapplyfilter'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    displayName: 'Re Ranking Apply Filter (String)',
    name: 'reRankingApplyFilter_string',
    displayOptions: {
      show: {
        reRankingApplyFilter: ['string'],
        index_settings: ['rerankingapplyfilter'],
        resource: ['Indices'],
        operation: ['setSettings'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Re Ranking Apply Filter (Null)',
    name: 'reRankingApplyFilter_null',
    default: 'null',
    description: undefined,
    required: false,
    disabledOptions: {
      show: {
        reRankingApplyFilter: ['null'],
      },
    },
    displayOptions: {
      show: {
        reRankingApplyFilter: ['null'],
        index_settings: ['rerankingapplyfilter'],
        resource: ['Indices'],
        operation: ['setSettings'],
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
        resource: ['Synonyms'],
        operation: ['getSynonym'],
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
    type: 'string',
    placeholder: 'synonymID',
    default: '',
    displayName: 'Object ID',
    name: 'objectID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Synonyms'],
        operation: ['getSynonym'],
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
        resource: ['Synonyms'],
        operation: ['saveSynonym'],
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
    type: 'string',
    placeholder: 'synonymID',
    default: '',
    displayName: 'Object ID',
    name: 'objectID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Synonyms'],
        operation: ['saveSynonym'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    routing: {
      request: {
        qs: {
          forwardToReplicas: '={{ $value }}',
        },
      },
    },
    displayName: 'Forward To Replicas',
    name: 'forwardToReplicas_boolean',
    displayOptions: {
      show: {
        resource: ['Synonyms'],
        operation: ['saveSynonym'],
      },
    },
  },
  {
    displayName: 'Synonym Hit',
    name: 'synonym_hit_object',
    type: 'multiOptions',
    description: 'Synonym object.',
    required: true,
    default: [],
    options: [
      {
        name: 'Object ID',
        value: 'objectID_string',
      },
      {
        name: 'Type',
        value: 'type_options',
      },
      {
        name: 'Synonyms',
        value: 'synonyms_json',
      },
      {
        name: 'Input',
        value: 'input_string',
      },
      {
        name: 'Word',
        value: 'word_string',
      },
      {
        name: 'Corrections',
        value: 'corrections_json',
      },
      {
        name: 'Placeholder',
        value: 'placeholder_string',
      },
      {
        name: 'Replacements',
        value: 'replacements_json',
      },
    ],
    displayOptions: {
      show: {
        resource: ['Synonyms'],
        operation: ['saveSynonym'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'synonymID',
    default: '',
    description: 'Unique identifier of a synonym object.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'objectID',
      },
    },
    displayName: 'Object ID',
    name: 'objectID_string',
    displayOptions: {
      show: {
        synonym_hit_object: ['objectID_string'],
        resource: ['Synonyms'],
        operation: ['saveSynonym'],
      },
    },
    required: true,
  },
  {
    type: 'options',
    placeholder: 'onewaysynonym',
    default: '',
    description: 'Synonym type.',
    options: [
      {
        name: 'synonym',
        value: 'synonym',
      },
      {
        name: 'onewaysynonym',
        value: 'onewaysynonym',
      },
      {
        name: 'altcorrection1',
        value: 'altcorrection1',
      },
      {
        name: 'altcorrection2',
        value: 'altcorrection2',
      },
      {
        name: 'placeholder',
        value: 'placeholder',
      },
      {
        name: 'oneWaySynonym',
        value: 'oneWaySynonym',
      },
      {
        name: 'altCorrection1',
        value: 'altCorrection1',
      },
      {
        name: 'altCorrection2',
        value: 'altCorrection2',
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
        synonym_hit_object: ['type_options'],
        resource: ['Synonyms'],
        operation: ['saveSynonym'],
      },
    },
    required: true,
  },
  {
    type: 'json',
    displayName: 'Synonyms',
    name: 'synonyms_json',
    default: '[]',
    description: 'Words or phrases considered equivalent.',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'synonyms',
      },
    },
    displayOptions: {
      show: {
        synonym_hit_object: ['synonyms_json'],
        resource: ['Synonyms'],
        operation: ['saveSynonym'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'car',
    default: '',
    description:
      'Word or phrase to appear in query strings (for [`onewaysynonym`s](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/adding-synonyms/in-depth/one-way-synonyms)).',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'input',
      },
    },
    displayName: 'Input',
    name: 'input_string',
    displayOptions: {
      show: {
        synonym_hit_object: ['input_string'],
        resource: ['Synonyms'],
        operation: ['saveSynonym'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'car',
    default: '',
    description:
      'Word or phrase to appear in query strings (for [`altcorrection1` and `altcorrection2`](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/adding-synonyms/in-depth/synonyms-alternative-corrections)).',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'word',
      },
    },
    displayName: 'Word',
    name: 'word_string',
    displayOptions: {
      show: {
        synonym_hit_object: ['word_string'],
        resource: ['Synonyms'],
        operation: ['saveSynonym'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Corrections',
    name: 'corrections_json',
    default: '[]',
    description: 'Words to be matched in records.',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'corrections',
      },
    },
    displayOptions: {
      show: {
        synonym_hit_object: ['corrections_json'],
        resource: ['Synonyms'],
        operation: ['saveSynonym'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '<Street>',
    default: '',
    description:
      '[Placeholder token](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/adding-synonyms/in-depth/synonyms-placeholders) to be put inside records.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'placeholder',
      },
    },
    displayName: 'Placeholder',
    name: 'placeholder_string',
    displayOptions: {
      show: {
        synonym_hit_object: ['placeholder_string'],
        resource: ['Synonyms'],
        operation: ['saveSynonym'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Replacements',
    name: 'replacements_json',
    default: '[]',
    description:
      'Query words that will match the [placeholder token](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/adding-synonyms/in-depth/synonyms-placeholders).',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'replacements',
      },
    },
    displayOptions: {
      show: {
        synonym_hit_object: ['replacements_json'],
        resource: ['Synonyms'],
        operation: ['saveSynonym'],
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
        resource: ['Synonyms'],
        operation: ['deleteSynonym'],
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
    type: 'string',
    placeholder: 'synonymID',
    default: '',
    displayName: 'Object ID',
    name: 'objectID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Synonyms'],
        operation: ['deleteSynonym'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    routing: {
      request: {
        qs: {
          forwardToReplicas: '={{ $value }}',
        },
      },
    },
    displayName: 'Forward To Replicas',
    name: 'forwardToReplicas_boolean',
    displayOptions: {
      show: {
        resource: ['Synonyms'],
        operation: ['deleteSynonym'],
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
        resource: ['Synonyms'],
        operation: ['saveSynonyms'],
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
          forwardToReplicas: '={{ $value }}',
        },
      },
    },
    displayName: 'Forward To Replicas',
    name: 'forwardToReplicas_boolean',
    displayOptions: {
      show: {
        resource: ['Synonyms'],
        operation: ['saveSynonyms'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    routing: {
      request: {
        qs: {
          replaceExistingSynonyms: '={{ $value }}',
        },
      },
    },
    displayName: 'Replace Existing Synonyms',
    name: 'replaceExistingSynonyms_boolean',
    displayOptions: {
      show: {
        resource: ['Synonyms'],
        operation: ['saveSynonyms'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Synonym Hits',
    name: 'synonymHits_json',
    default: '[]',
    description: 'Matching synonyms.',
    required: false,
    routing: {
      request: {
        body: '={{ JSON.parse($value) }}',
      },
    },
    displayOptions: {
      show: {
        resource: ['Synonyms'],
        operation: ['saveSynonyms'],
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
        resource: ['Synonyms'],
        operation: ['clearSynonyms'],
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
          forwardToReplicas: '={{ $value }}',
        },
      },
    },
    displayName: 'Forward To Replicas',
    name: 'forwardToReplicas_boolean',
    displayOptions: {
      show: {
        resource: ['Synonyms'],
        operation: ['clearSynonyms'],
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
        resource: ['Synonyms'],
        operation: ['searchSynonyms'],
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
    displayName: 'Search Synonyms Params',
    name: 'search_synonyms_params_object',
    type: 'multiOptions',
    description: undefined,
    required: false,
    default: [],
    options: [
      {
        name: 'Query',
        value: 'query_string',
      },
      {
        name: 'Type',
        value: 'type_options',
      },
      {
        name: 'Page',
        value: 'page_number',
      },
      {
        name: 'Hits Per Page',
        value: 'hitsPerPage_number',
      },
    ],
    displayOptions: {
      show: {
        resource: ['Synonyms'],
        operation: ['searchSynonyms'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Search query.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'query',
      },
    },
    displayName: 'Query',
    name: 'query_string',
    displayOptions: {
      show: {
        search_synonyms_params_object: ['query_string'],
        resource: ['Synonyms'],
        operation: ['searchSynonyms'],
      },
    },
  },
  {
    type: 'options',
    placeholder: 'onewaysynonym',
    default: '',
    description: 'Synonym type.',
    options: [
      {
        name: 'synonym',
        value: 'synonym',
      },
      {
        name: 'onewaysynonym',
        value: 'onewaysynonym',
      },
      {
        name: 'altcorrection1',
        value: 'altcorrection1',
      },
      {
        name: 'altcorrection2',
        value: 'altcorrection2',
      },
      {
        name: 'placeholder',
        value: 'placeholder',
      },
      {
        name: 'oneWaySynonym',
        value: 'oneWaySynonym',
      },
      {
        name: 'altCorrection1',
        value: 'altCorrection1',
      },
      {
        name: 'altCorrection2',
        value: 'altCorrection2',
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
        search_synonyms_params_object: ['type_options'],
        resource: ['Synonyms'],
        operation: ['searchSynonyms'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description: 'Page of search results to retrieve.',
    typeOptions: {
      minValue: 0,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'page',
      },
    },
    displayName: 'Page',
    name: 'page_number',
    displayOptions: {
      show: {
        search_synonyms_params_object: ['page_number'],
        resource: ['Synonyms'],
        operation: ['searchSynonyms'],
      },
    },
  },
  {
    type: 'number',
    default: 20,
    description: 'Number of hits per page.',
    typeOptions: {
      minValue: 1,
      maxValue: 1000,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'hitsPerPage',
      },
    },
    displayName: 'Hits Per Page',
    name: 'hitsPerPage_number',
    displayOptions: {
      show: {
        search_synonyms_params_object: ['hitsPerPage_number'],
        resource: ['Synonyms'],
        operation: ['searchSynonyms'],
      },
    },
  },
  {
    displayName: 'Api Key',
    name: 'api_key_object',
    type: 'multiOptions',
    description: 'API key object.',
    required: true,
    default: [],
    options: [
      {
        name: 'Acl',
        value: 'acl_json',
      },
      {
        name: 'Description',
        value: 'description_string',
      },
      {
        name: 'Indexes',
        value: 'indexes_json',
      },
      {
        name: 'Max Hits Per Query',
        value: 'maxHitsPerQuery_number',
      },
      {
        name: 'Max Queries Per IPPer Hour',
        value: 'maxQueriesPerIPPerHour_number',
      },
      {
        name: 'Query Parameters',
        value: 'queryParameters_string',
      },
      {
        name: 'Referers',
        value: 'referers_json',
      },
      {
        name: 'Validity',
        value: 'validity_number',
      },
    ],
    displayOptions: {
      show: {
        resource: ['Api Keys'],
        operation: ['addApiKey'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Acl',
    name: 'acl_json',
    default: '[]',
    description:
      "Permissions that determine the type of API requests this key can make.\nThe required ACL is listed in each endpoint's reference.\nFor more information, see [access control list](https://www.algolia.com/doc/guides/security/api-keys/#access-control-list-acl).\n",
    required: true,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'acl',
      },
    },
    displayOptions: {
      show: {
        api_key_object: ['acl_json'],
        resource: ['Api Keys'],
        operation: ['addApiKey'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'Used for indexing by the CLI',
    default: '',
    description: 'Description of an API key to help you identify this API key.',
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
        api_key_object: ['description_string'],
        resource: ['Api Keys'],
        operation: ['addApiKey'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Indexes',
    name: 'indexes_json',
    default: '[]',
    description:
      'Index names or patterns that this API key can access.\nBy default, an API key can access all indices in the same application.\n\nYou can use leading and trailing wildcard characters (`*`):\n\n- `dev_*` matches all indices starting with "dev_".\n- `*_dev` matches all indices ending with "_dev".\n- `*_products_*` matches all indices containing "_products_".\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'indexes',
      },
    },
    displayOptions: {
      show: {
        api_key_object: ['indexes_json'],
        resource: ['Api Keys'],
        operation: ['addApiKey'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description:
      "Maximum number of results this API key can retrieve in one query.\nBy default, there's no limit.\n",
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'maxHitsPerQuery',
      },
    },
    displayName: 'Max Hits Per Query',
    name: 'maxHitsPerQuery_number',
    displayOptions: {
      show: {
        api_key_object: ['maxHitsPerQuery_number'],
        resource: ['Api Keys'],
        operation: ['addApiKey'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description:
      "Maximum number of API requests allowed per IP address or [user token](https://www.algolia.com/doc/guides/sending-events/concepts/usertoken) per hour.\n\nIf this limit is reached, the API returns an error with status code `429`.\nBy default, there's no limit.\n",
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'maxQueriesPerIPPerHour',
      },
    },
    displayName: 'Max Queries Per IPPer Hour',
    name: 'maxQueriesPerIPPerHour_number',
    displayOptions: {
      show: {
        api_key_object: ['maxQueriesPerIPPerHour_number'],
        resource: ['Api Keys'],
        operation: ['addApiKey'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'typoTolerance=strict&restrictSources=192.168.1.0/24',
    default: '',
    description:
      'Query parameters to add when making API requests with this API key.\n\nTo restrict this API key to specific IP addresses, add the `restrictSources` parameter.\nYou can only add a single source, but you can provide a range of IP addresses.\n\nCreating an API key fails if the request is made from an IP address outside the restricted range.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'queryParameters',
      },
    },
    displayName: 'Query Parameters',
    name: 'queryParameters_string',
    displayOptions: {
      show: {
        api_key_object: ['queryParameters_string'],
        resource: ['Api Keys'],
        operation: ['addApiKey'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Referers',
    name: 'referers_json',
    default: '[]',
    description:
      'Allowed HTTP referrers for this API key.\n\nBy default, all referrers are allowed.\nYou can use leading and trailing wildcard characters (`*`):\n\n- `https://algolia.com/*` allows all referrers starting with "https://algolia.com/"\n- `*.algolia.com` allows all referrers ending with ".algolia.com"\n- `*algolia.com*` allows all referrers in the domain "algolia.com".\n\nLike all HTTP headers, referrers can be spoofed. Don\'t rely on them to secure your data.\nFor more information, see [HTTP referrer restrictions](https://www.algolia.com/doc/guides/security/security-best-practices/#http-referrers-restrictions).\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'referers',
      },
    },
    displayOptions: {
      show: {
        api_key_object: ['referers_json'],
        resource: ['Api Keys'],
        operation: ['addApiKey'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '86400',
    default: '',
    description:
      "Duration (in seconds) after which the API key expires.\nBy default, API keys don't expire.\n",
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'validity',
      },
    },
    displayName: 'Validity',
    name: 'validity_number',
    displayOptions: {
      show: {
        api_key_object: ['validity_number'],
        resource: ['Api Keys'],
        operation: ['addApiKey'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'ALGOLIA_API_KEY',
    default: '',
    displayName: 'Key',
    name: 'key_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Api Keys'],
        operation: ['getApiKey'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'ALGOLIA_API_KEY',
    default: '',
    displayName: 'Key',
    name: 'key_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Api Keys'],
        operation: ['updateApiKey'],
      },
    },
  },
  {
    displayName: 'Api Key',
    name: 'api_key_object',
    type: 'multiOptions',
    description: 'API key object.',
    required: true,
    default: [],
    options: [
      {
        name: 'Acl',
        value: 'acl_json',
      },
      {
        name: 'Description',
        value: 'description_string',
      },
      {
        name: 'Indexes',
        value: 'indexes_json',
      },
      {
        name: 'Max Hits Per Query',
        value: 'maxHitsPerQuery_number',
      },
      {
        name: 'Max Queries Per IPPer Hour',
        value: 'maxQueriesPerIPPerHour_number',
      },
      {
        name: 'Query Parameters',
        value: 'queryParameters_string',
      },
      {
        name: 'Referers',
        value: 'referers_json',
      },
      {
        name: 'Validity',
        value: 'validity_number',
      },
    ],
    displayOptions: {
      show: {
        resource: ['Api Keys'],
        operation: ['updateApiKey'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Acl',
    name: 'acl_json',
    default: '[]',
    description:
      "Permissions that determine the type of API requests this key can make.\nThe required ACL is listed in each endpoint's reference.\nFor more information, see [access control list](https://www.algolia.com/doc/guides/security/api-keys/#access-control-list-acl).\n",
    required: true,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'acl',
      },
    },
    displayOptions: {
      show: {
        api_key_object: ['acl_json'],
        resource: ['Api Keys'],
        operation: ['updateApiKey'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'Used for indexing by the CLI',
    default: '',
    description: 'Description of an API key to help you identify this API key.',
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
        api_key_object: ['description_string'],
        resource: ['Api Keys'],
        operation: ['updateApiKey'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Indexes',
    name: 'indexes_json',
    default: '[]',
    description:
      'Index names or patterns that this API key can access.\nBy default, an API key can access all indices in the same application.\n\nYou can use leading and trailing wildcard characters (`*`):\n\n- `dev_*` matches all indices starting with "dev_".\n- `*_dev` matches all indices ending with "_dev".\n- `*_products_*` matches all indices containing "_products_".\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'indexes',
      },
    },
    displayOptions: {
      show: {
        api_key_object: ['indexes_json'],
        resource: ['Api Keys'],
        operation: ['updateApiKey'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description:
      "Maximum number of results this API key can retrieve in one query.\nBy default, there's no limit.\n",
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'maxHitsPerQuery',
      },
    },
    displayName: 'Max Hits Per Query',
    name: 'maxHitsPerQuery_number',
    displayOptions: {
      show: {
        api_key_object: ['maxHitsPerQuery_number'],
        resource: ['Api Keys'],
        operation: ['updateApiKey'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description:
      "Maximum number of API requests allowed per IP address or [user token](https://www.algolia.com/doc/guides/sending-events/concepts/usertoken) per hour.\n\nIf this limit is reached, the API returns an error with status code `429`.\nBy default, there's no limit.\n",
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'maxQueriesPerIPPerHour',
      },
    },
    displayName: 'Max Queries Per IPPer Hour',
    name: 'maxQueriesPerIPPerHour_number',
    displayOptions: {
      show: {
        api_key_object: ['maxQueriesPerIPPerHour_number'],
        resource: ['Api Keys'],
        operation: ['updateApiKey'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'typoTolerance=strict&restrictSources=192.168.1.0/24',
    default: '',
    description:
      'Query parameters to add when making API requests with this API key.\n\nTo restrict this API key to specific IP addresses, add the `restrictSources` parameter.\nYou can only add a single source, but you can provide a range of IP addresses.\n\nCreating an API key fails if the request is made from an IP address outside the restricted range.\n',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'queryParameters',
      },
    },
    displayName: 'Query Parameters',
    name: 'queryParameters_string',
    displayOptions: {
      show: {
        api_key_object: ['queryParameters_string'],
        resource: ['Api Keys'],
        operation: ['updateApiKey'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Referers',
    name: 'referers_json',
    default: '[]',
    description:
      'Allowed HTTP referrers for this API key.\n\nBy default, all referrers are allowed.\nYou can use leading and trailing wildcard characters (`*`):\n\n- `https://algolia.com/*` allows all referrers starting with "https://algolia.com/"\n- `*.algolia.com` allows all referrers ending with ".algolia.com"\n- `*algolia.com*` allows all referrers in the domain "algolia.com".\n\nLike all HTTP headers, referrers can be spoofed. Don\'t rely on them to secure your data.\nFor more information, see [HTTP referrer restrictions](https://www.algolia.com/doc/guides/security/security-best-practices/#http-referrers-restrictions).\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'referers',
      },
    },
    displayOptions: {
      show: {
        api_key_object: ['referers_json'],
        resource: ['Api Keys'],
        operation: ['updateApiKey'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '86400',
    default: '',
    description:
      "Duration (in seconds) after which the API key expires.\nBy default, API keys don't expire.\n",
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'validity',
      },
    },
    displayName: 'Validity',
    name: 'validity_number',
    displayOptions: {
      show: {
        api_key_object: ['validity_number'],
        resource: ['Api Keys'],
        operation: ['updateApiKey'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'ALGOLIA_API_KEY',
    default: '',
    displayName: 'Key',
    name: 'key_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Api Keys'],
        operation: ['deleteApiKey'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'ALGOLIA_API_KEY',
    default: '',
    displayName: 'Key',
    name: 'key_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Api Keys'],
        operation: ['restoreApiKey'],
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
        resource: ['Rules'],
        operation: ['getRule'],
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
    type: 'string',
    default: '',
    description: 'Unique identifier of a rule object.',
    displayName: 'Object ID',
    name: 'objectID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Rules'],
        operation: ['getRule'],
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
        resource: ['Rules'],
        operation: ['saveRule'],
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
    type: 'string',
    default: '',
    description: 'Unique identifier of a rule object.',
    displayName: 'Object ID',
    name: 'objectID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Rules'],
        operation: ['saveRule'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    routing: {
      request: {
        qs: {
          forwardToReplicas: '={{ $value }}',
        },
      },
    },
    displayName: 'Forward To Replicas',
    name: 'forwardToReplicas_boolean',
    displayOptions: {
      show: {
        resource: ['Rules'],
        operation: ['saveRule'],
      },
    },
  },
  {
    displayName: 'Rule',
    name: 'rule_object',
    type: 'multiOptions',
    description: 'Rule object.',
    required: true,
    default: [],
    options: [
      {
        name: 'Object ID',
        value: 'objectID_string',
      },
      {
        name: 'Conditions',
        value: 'conditions_json',
      },
      {
        name: 'Consequence',
        value: 'consequence_object',
      },
      {
        name: 'Description',
        value: 'description_string',
      },
      {
        name: 'Enabled',
        value: 'enabled_boolean',
      },
      {
        name: 'Validity',
        value: 'validity_json',
      },
      {
        name: 'Tags',
        value: 'tags_json',
      },
      {
        name: 'Scope',
        value: 'scope_string',
      },
    ],
    displayOptions: {
      show: {
        resource: ['Rules'],
        operation: ['saveRule'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Unique identifier of a rule object.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'objectID',
      },
    },
    displayName: 'Object ID',
    name: 'objectID_string',
    displayOptions: {
      show: {
        rule_object: ['objectID_string'],
        resource: ['Rules'],
        operation: ['saveRule'],
      },
    },
    required: true,
  },
  {
    type: 'json',
    displayName: 'Conditions',
    name: 'conditions_json',
    default: '[]',
    description:
      "Conditions that trigger a rule.\n\nSome consequences require specific conditions or don't require any condition.\nFor more information, see [Conditions](https://www.algolia.com/doc/guides/managing-results/rules/rules-overview/#conditions).\n",
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'conditions',
      },
    },
    displayOptions: {
      show: {
        rule_object: ['conditions_json'],
        resource: ['Rules'],
        operation: ['saveRule'],
      },
    },
  },
  {
    type: 'json',
    description:
      'Effect of the rule.\n\nFor more information, see [Consequences](https://www.algolia.com/doc/guides/managing-results/rules/rules-overview/#consequences).\n',
    required: true,
    default: '{}',
    routing: {
      send: {
        type: 'body',
        property: 'consequence',
        value: '={{ JSON.parse($value) }}',
      },
    },
    displayName: 'Consequence',
    name: 'consequence_object',
    displayOptions: {
      show: {
        rule_object: ['consequence_object'],
        resource: ['Rules'],
        operation: ['saveRule'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'Display a promotional banner',
    default: '',
    description:
      "Description of the rule's purpose to help you distinguish between different rules.",
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
        rule_object: ['description_string'],
        resource: ['Rules'],
        operation: ['saveRule'],
      },
    },
  },
  {
    type: 'boolean',
    default: true,
    description: 'Whether the rule is active.',
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
        rule_object: ['enabled_boolean'],
        resource: ['Rules'],
        operation: ['saveRule'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Validity',
    name: 'validity_json',
    default: '[]',
    description: 'Time periods when the rule is active.',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'validity',
      },
    },
    displayOptions: {
      show: {
        rule_object: ['validity_json'],
        resource: ['Rules'],
        operation: ['saveRule'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Tags',
    name: 'tags_json',
    default: '[]',
    description: undefined,
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'tags',
      },
    },
    displayOptions: {
      show: {
        rule_object: ['tags_json'],
        resource: ['Rules'],
        operation: ['saveRule'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'scope',
      },
    },
    displayName: 'Scope',
    name: 'scope_string',
    displayOptions: {
      show: {
        rule_object: ['scope_string'],
        resource: ['Rules'],
        operation: ['saveRule'],
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
        resource: ['Rules'],
        operation: ['deleteRule'],
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
    type: 'string',
    default: '',
    description: 'Unique identifier of a rule object.',
    displayName: 'Object ID',
    name: 'objectID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Rules'],
        operation: ['deleteRule'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    routing: {
      request: {
        qs: {
          forwardToReplicas: '={{ $value }}',
        },
      },
    },
    displayName: 'Forward To Replicas',
    name: 'forwardToReplicas_boolean',
    displayOptions: {
      show: {
        resource: ['Rules'],
        operation: ['deleteRule'],
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
        resource: ['Rules'],
        operation: ['saveRules'],
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
          forwardToReplicas: '={{ $value }}',
        },
      },
    },
    displayName: 'Forward To Replicas',
    name: 'forwardToReplicas_boolean',
    displayOptions: {
      show: {
        resource: ['Rules'],
        operation: ['saveRules'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    routing: {
      request: {
        qs: {
          clearExistingRules: '={{ $value }}',
        },
      },
    },
    displayName: 'Clear Existing Rules',
    name: 'clearExistingRules_boolean',
    displayOptions: {
      show: {
        resource: ['Rules'],
        operation: ['saveRules'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Body',
    name: 'body',
    default: '[]',
    description: 'Rules to add or replace.',
    required: false,
    routing: {
      request: {
        body: '={{ JSON.parse($value) }}',
      },
    },
    displayOptions: {
      show: {
        resource: ['Rules'],
        operation: ['saveRules'],
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
        resource: ['Rules'],
        operation: ['clearRules'],
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
          forwardToReplicas: '={{ $value }}',
        },
      },
    },
    displayName: 'Forward To Replicas',
    name: 'forwardToReplicas_boolean',
    displayOptions: {
      show: {
        resource: ['Rules'],
        operation: ['clearRules'],
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
        resource: ['Rules'],
        operation: ['searchRules'],
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
    displayName: 'Search Rules Params',
    name: 'search_rules_params_object',
    type: 'multiOptions',
    description: 'Rules search parameters.',
    required: false,
    default: [],
    options: [
      {
        name: 'Query',
        value: 'query_string',
      },
      {
        name: 'Anchoring',
        value: 'anchoring_options',
      },
      {
        name: 'Context',
        value: 'context_string',
      },
      {
        name: 'Page',
        value: 'page_number',
      },
      {
        name: 'Hits Per Page',
        value: 'hitsPerPage_number',
      },
      {
        name: 'Enabled',
        value: 'enabled',
      },
    ],
    displayOptions: {
      show: {
        resource: ['Rules'],
        operation: ['searchRules'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Search query for rules.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'query',
      },
    },
    displayName: 'Query',
    name: 'query_string',
    displayOptions: {
      show: {
        search_rules_params_object: ['query_string'],
        resource: ['Rules'],
        operation: ['searchRules'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description:
      'Which part of the search query the pattern should match:\n\n- `startsWith`. The pattern must match the beginning of the query.\n- `endsWith`. The pattern must match the end of the query.\n- `is`. The pattern must match the query exactly.\n- `contains`. The pattern must match anywhere in the query.\n\nEmpty queries are only allowed as patterns with `anchoring: is`.\n',
    options: [
      {
        name: 'is',
        value: 'is',
      },
      {
        name: 'startsWith',
        value: 'startsWith',
      },
      {
        name: 'endsWith',
        value: 'endsWith',
      },
      {
        name: 'contains',
        value: 'contains',
      },
    ],
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'anchoring',
      },
    },
    displayName: 'Anchoring',
    name: 'anchoring_options',
    displayOptions: {
      show: {
        search_rules_params_object: ['anchoring_options'],
        resource: ['Rules'],
        operation: ['searchRules'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'mobile',
    default: '',
    description: 'Only return rules that match the context (exact match).',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'context',
      },
    },
    displayName: 'Context',
    name: 'context_string',
    displayOptions: {
      show: {
        search_rules_params_object: ['context_string'],
        resource: ['Rules'],
        operation: ['searchRules'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description:
      'Requested page of the API response.\n\nAlgolia uses `page` and `hitsPerPage` to control how search results are displayed ([paginated](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/pagination/js)).\n\n- `hitsPerPage`: sets the number of search results (_hits_) displayed per page.\n- `page`: specifies the page number of the search results you want to retrieve. Page numbering starts at 0, so the first page is `page=0`, the second is `page=1`, and so on.\n\nFor example, to display 10 results per page starting from the third page, set `hitsPerPage` to 10 and `page` to 2.\n',
    typeOptions: {
      minValue: 0,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'page',
      },
    },
    displayName: 'Page',
    name: 'page_number',
    displayOptions: {
      show: {
        search_rules_params_object: ['page_number'],
        resource: ['Rules'],
        operation: ['searchRules'],
      },
    },
  },
  {
    type: 'number',
    default: 20,
    description:
      'Maximum number of hits per page.\n\nAlgolia uses `page` and `hitsPerPage` to control how search results are displayed ([paginated](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/pagination/js)).\n\n- `hitsPerPage`: sets the number of search results (_hits_) displayed per page.\n- `page`: specifies the page number of the search results you want to retrieve. Page numbering starts at 0, so the first page is `page=0`, the second is `page=1`, and so on.\n\nFor example, to display 10 results per page starting from the third page, set `hitsPerPage` to 10 and `page` to 2.\n',
    typeOptions: {
      minValue: 1,
      maxValue: 1000,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'hitsPerPage',
      },
    },
    displayName: 'Hits Per Page',
    name: 'hitsPerPage_number',
    displayOptions: {
      show: {
        search_rules_params_object: ['hitsPerPage_number'],
        resource: ['Rules'],
        operation: ['searchRules'],
      },
    },
  },
  {
    type: 'options',
    name: 'enabled',
    displayName: 'Enabled',
    default: '',
    options: [
      {
        name: 'Boolean',
        value: 'boolean',
      },
      {
        name: 'Null',
        value: 'null',
      },
    ],
    routing: {
      send: {
        type: 'body',
        property: 'enabled',
        value:
          '={{ typeof $parameter.enabled_boolean !== "undefined" ? $parameter.enabled_boolean : typeof $parameter.enabled_null !== "undefined" ? JSON.parse($parameter.enabled_null) : undefined }}',
      },
    },
    displayOptions: {
      show: {
        search_rules_params_object: ['enabled'],
        resource: ['Rules'],
        operation: ['searchRules'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      'If `true`, return only enabled rules.\nIf `false`, return only inactive rules.\nBy default, _all_ rules are returned.\n',
    displayName: 'Enabled (Boolean)',
    name: 'enabled_boolean',
    displayOptions: {
      show: {
        search_rules_params_object: ['enabled'],
        enabled: ['boolean'],
        resource: ['Rules'],
        operation: ['searchRules'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Enabled (Null)',
    name: 'enabled_null',
    default: 'null',
    description: undefined,
    required: false,
    disabledOptions: {
      show: {
        enabled: ['null'],
      },
    },
    displayOptions: {
      show: {
        search_rules_params_object: ['enabled'],
        enabled: ['null'],
        resource: ['Rules'],
        operation: ['searchRules'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    options: [
      {
        name: 'plurals',
        value: 'plurals',
      },
      {
        name: 'stopwords',
        value: 'stopwords',
      },
      {
        name: 'compounds',
        value: 'compounds',
      },
    ],
    displayName: 'Dictionary Name',
    name: 'dictionaryName_options',
    required: true,
    displayOptions: {
      show: {
        resource: ['Dictionaries'],
        operation: ['batchDictionaryEntries'],
      },
    },
  },
  {
    displayName: 'Batch Dictionary Entries Params',
    name: 'batch_dictionary_entries_params_object',
    type: 'multiOptions',
    description: 'Request body for updating dictionary entries.',
    required: true,
    default: [],
    options: [
      {
        name: 'Clear Existing Dictionary Entries',
        value: 'clearExistingDictionaryEntries_boolean',
      },
      {
        name: 'Requests',
        value: 'requests_json',
      },
    ],
    displayOptions: {
      show: {
        resource: ['Dictionaries'],
        operation: ['batchDictionaryEntries'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    description:
      'Whether to replace all custom entries in the dictionary with the ones sent with this request.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'clearExistingDictionaryEntries',
      },
    },
    displayName: 'Clear Existing Dictionary Entries',
    name: 'clearExistingDictionaryEntries_boolean',
    displayOptions: {
      show: {
        batch_dictionary_entries_params_object: ['clearExistingDictionaryEntries_boolean'],
        resource: ['Dictionaries'],
        operation: ['batchDictionaryEntries'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Requests',
    name: 'requests_json',
    default: '[]',
    description: 'List of additions and deletions to your dictionaries.',
    required: true,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'requests',
      },
    },
    displayOptions: {
      show: {
        batch_dictionary_entries_params_object: ['requests_json'],
        resource: ['Dictionaries'],
        operation: ['batchDictionaryEntries'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    options: [
      {
        name: 'plurals',
        value: 'plurals',
      },
      {
        name: 'stopwords',
        value: 'stopwords',
      },
      {
        name: 'compounds',
        value: 'compounds',
      },
    ],
    displayName: 'Dictionary Name',
    name: 'dictionaryName_options',
    required: true,
    displayOptions: {
      show: {
        resource: ['Dictionaries'],
        operation: ['searchDictionaryEntries'],
      },
    },
  },
  {
    displayName: 'Search Dictionary Entries Params',
    name: 'search_dictionary_entries_params_object',
    type: 'multiOptions',
    description: 'Search parameter.',
    required: true,
    default: [],
    options: [
      {
        name: 'Query',
        value: 'query_string',
      },
      {
        name: 'Page',
        value: 'page_number',
      },
      {
        name: 'Hits Per Page',
        value: 'hitsPerPage_number',
      },
      {
        name: 'Language',
        value: 'language_options',
      },
    ],
    displayOptions: {
      show: {
        resource: ['Dictionaries'],
        operation: ['searchDictionaryEntries'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    description: 'Search query.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'query',
      },
    },
    displayName: 'Query',
    name: 'query_string',
    displayOptions: {
      show: {
        search_dictionary_entries_params_object: ['query_string'],
        resource: ['Dictionaries'],
        operation: ['searchDictionaryEntries'],
      },
    },
    required: true,
  },
  {
    type: 'number',
    default: '',
    description: 'Page of search results to retrieve.',
    typeOptions: {
      minValue: 0,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'page',
      },
    },
    displayName: 'Page',
    name: 'page_number',
    displayOptions: {
      show: {
        search_dictionary_entries_params_object: ['page_number'],
        resource: ['Dictionaries'],
        operation: ['searchDictionaryEntries'],
      },
    },
  },
  {
    type: 'number',
    default: 20,
    description: 'Number of hits per page.',
    typeOptions: {
      minValue: 1,
      maxValue: 1000,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'hitsPerPage',
      },
    },
    displayName: 'Hits Per Page',
    name: 'hitsPerPage_number',
    displayOptions: {
      show: {
        search_dictionary_entries_params_object: ['hitsPerPage_number'],
        resource: ['Dictionaries'],
        operation: ['searchDictionaryEntries'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    description: 'ISO code for a supported language.',
    options: [
      {
        name: 'af',
        value: 'af',
      },
      {
        name: 'ar',
        value: 'ar',
      },
      {
        name: 'az',
        value: 'az',
      },
      {
        name: 'bg',
        value: 'bg',
      },
      {
        name: 'bn',
        value: 'bn',
      },
      {
        name: 'ca',
        value: 'ca',
      },
      {
        name: 'cs',
        value: 'cs',
      },
      {
        name: 'cy',
        value: 'cy',
      },
      {
        name: 'da',
        value: 'da',
      },
      {
        name: 'de',
        value: 'de',
      },
      {
        name: 'el',
        value: 'el',
      },
      {
        name: 'en',
        value: 'en',
      },
      {
        name: 'eo',
        value: 'eo',
      },
      {
        name: 'es',
        value: 'es',
      },
      {
        name: 'et',
        value: 'et',
      },
      {
        name: 'eu',
        value: 'eu',
      },
      {
        name: 'fa',
        value: 'fa',
      },
      {
        name: 'fi',
        value: 'fi',
      },
      {
        name: 'fo',
        value: 'fo',
      },
      {
        name: 'fr',
        value: 'fr',
      },
      {
        name: 'ga',
        value: 'ga',
      },
      {
        name: 'gl',
        value: 'gl',
      },
      {
        name: 'he',
        value: 'he',
      },
      {
        name: 'hi',
        value: 'hi',
      },
      {
        name: 'hu',
        value: 'hu',
      },
      {
        name: 'hy',
        value: 'hy',
      },
      {
        name: 'id',
        value: 'id',
      },
      {
        name: 'is',
        value: 'is',
      },
      {
        name: 'it',
        value: 'it',
      },
      {
        name: 'ja',
        value: 'ja',
      },
      {
        name: 'ka',
        value: 'ka',
      },
      {
        name: 'kk',
        value: 'kk',
      },
      {
        name: 'ko',
        value: 'ko',
      },
      {
        name: 'ku',
        value: 'ku',
      },
      {
        name: 'ky',
        value: 'ky',
      },
      {
        name: 'lt',
        value: 'lt',
      },
      {
        name: 'lv',
        value: 'lv',
      },
      {
        name: 'mi',
        value: 'mi',
      },
      {
        name: 'mn',
        value: 'mn',
      },
      {
        name: 'mr',
        value: 'mr',
      },
      {
        name: 'ms',
        value: 'ms',
      },
      {
        name: 'mt',
        value: 'mt',
      },
      {
        name: 'nb',
        value: 'nb',
      },
      {
        name: 'nl',
        value: 'nl',
      },
      {
        name: 'no',
        value: 'no',
      },
      {
        name: 'ns',
        value: 'ns',
      },
      {
        name: 'pl',
        value: 'pl',
      },
      {
        name: 'ps',
        value: 'ps',
      },
      {
        name: 'pt',
        value: 'pt',
      },
      {
        name: 'pt-br',
        value: 'pt-br',
      },
      {
        name: 'qu',
        value: 'qu',
      },
      {
        name: 'ro',
        value: 'ro',
      },
      {
        name: 'ru',
        value: 'ru',
      },
      {
        name: 'sk',
        value: 'sk',
      },
      {
        name: 'sq',
        value: 'sq',
      },
      {
        name: 'sv',
        value: 'sv',
      },
      {
        name: 'sw',
        value: 'sw',
      },
      {
        name: 'ta',
        value: 'ta',
      },
      {
        name: 'te',
        value: 'te',
      },
      {
        name: 'th',
        value: 'th',
      },
      {
        name: 'tl',
        value: 'tl',
      },
      {
        name: 'tn',
        value: 'tn',
      },
      {
        name: 'tr',
        value: 'tr',
      },
      {
        name: 'tt',
        value: 'tt',
      },
      {
        name: 'uk',
        value: 'uk',
      },
      {
        name: 'ur',
        value: 'ur',
      },
      {
        name: 'uz',
        value: 'uz',
      },
      {
        name: 'zh',
        value: 'zh',
      },
    ],
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'language',
      },
    },
    displayName: 'Language',
    name: 'language_options',
    displayOptions: {
      show: {
        search_dictionary_entries_params_object: ['language_options'],
        resource: ['Dictionaries'],
        operation: ['searchDictionaryEntries'],
      },
    },
  },
  {
    displayName: 'Dictionary Settings Params',
    name: 'dictionary_settings_params_object',
    type: 'multiOptions',
    description: 'Turn on or off the built-in Algolia stop words for a specific language.\n',
    required: true,
    default: [],
    options: [
      {
        name: 'Standard Entries',
        value: 'standard_entries_object',
      },
    ],
    displayOptions: {
      show: {
        resource: ['Dictionaries'],
        operation: ['setDictionarySettings'],
      },
    },
  },
  {
    type: 'json',
    description:
      'Key-value pairs of [supported language ISO codes](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/supported-languages) and boolean values.\n',
    required: true,
    default: '{}',
    routing: {
      send: {
        type: 'body',
        property: 'disableStandardEntries',
        value: '={{ JSON.parse($value) }}',
      },
    },
    displayName: 'Standard Entries',
    name: 'standard_entries_object',
    displayOptions: {
      show: {
        dictionary_settings_params_object: ['standard_entries_object'],
        resource: ['Dictionaries'],
        operation: ['setDictionarySettings'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'user1',
    default: '',
    description: 'Unique identifier of the user who makes the search request.',
    typeOptions: {
      pattern: '^[a-zA-Z0-9 \-*.]+$',
    },
    routing: {
      request: {
        headers: {
          'X-Algolia-User-ID': '={{ $value }}',
        },
      },
    },
    displayName: 'X-Algolia-User-ID',
    name: 'X-Algolia-User-ID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Clusters'],
        operation: ['assignUserId'],
      },
    },
  },
  {
    displayName: 'Assign User Id Params',
    name: 'assign_user_id_params_object',
    type: 'multiOptions',
    description: 'Assign userID parameters.',
    required: true,
    default: [],
    options: [
      {
        name: 'Cluster',
        value: 'cluster_string',
      },
    ],
    displayOptions: {
      show: {
        resource: ['Clusters'],
        operation: ['assignUserId'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'c11-test',
    default: '',
    description: 'Cluster name.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'cluster',
      },
    },
    displayName: 'Cluster',
    name: 'cluster_string',
    displayOptions: {
      show: {
        assign_user_id_params_object: ['cluster_string'],
        resource: ['Clusters'],
        operation: ['assignUserId'],
      },
    },
    required: true,
  },
  {
    type: 'options',
    name: 'page',
    displayName: 'Page',
    default: '',
    options: [
      {
        name: 'Integer',
        value: 'integer',
      },
      {
        name: 'Null',
        value: 'null',
      },
    ],
    routing: {
      request: {
        qs: {
          page: '={{ (() => { const value = typeof $parameter.page_number !== "undefined" ? $parameter.page_number : typeof $parameter.page_null !== "undefined" ? JSON.parse($parameter.page_null) : undefined; if (value !== undefined && value !== null) { return value; } return undefined; })() }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Clusters'],
        operation: ['listUserIds'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    typeOptions: {
      minValue: 0,
    },
    displayName: 'Page (Integer)',
    name: 'page_number',
    displayOptions: {
      show: {
        page: ['integer'],
        resource: ['Clusters'],
        operation: ['listUserIds'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Page (Null)',
    name: 'page_null',
    default: 'null',
    description: undefined,
    required: false,
    disabledOptions: {
      show: {
        page: ['null'],
      },
    },
    displayOptions: {
      show: {
        page: ['null'],
        resource: ['Clusters'],
        operation: ['listUserIds'],
      },
    },
  },
  {
    type: 'number',
    default: 100,
    routing: {
      request: {
        qs: {
          hitsPerPage: '={{ $value }}',
        },
      },
    },
    displayName: 'Hits Per Page',
    name: 'hitsPerPage_number',
    displayOptions: {
      show: {
        resource: ['Clusters'],
        operation: ['listUserIds'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'user1',
    default: '',
    description: 'Unique identifier of the user who makes the search request.',
    typeOptions: {
      pattern: '^[a-zA-Z0-9 \-*.]+$',
    },
    routing: {
      request: {
        headers: {
          'X-Algolia-User-ID': '={{ $value }}',
        },
      },
    },
    displayName: 'X-Algolia-User-ID',
    name: 'X-Algolia-User-ID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Clusters'],
        operation: ['batchAssignUserIds'],
      },
    },
  },
  {
    displayName: 'Batch Assign User Ids Params',
    name: 'batch_assign_user_ids_params_object',
    type: 'multiOptions',
    description: 'Assign userID parameters.',
    required: true,
    default: [],
    options: [
      {
        name: 'Cluster',
        value: 'cluster_string',
      },
      {
        name: 'Users',
        value: 'users_json',
      },
    ],
    displayOptions: {
      show: {
        resource: ['Clusters'],
        operation: ['batchAssignUserIds'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'c11-test',
    default: '',
    description: 'Cluster name.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'cluster',
      },
    },
    displayName: 'Cluster',
    name: 'cluster_string',
    displayOptions: {
      show: {
        batch_assign_user_ids_params_object: ['cluster_string'],
        resource: ['Clusters'],
        operation: ['batchAssignUserIds'],
      },
    },
    required: true,
  },
  {
    type: 'json',
    displayName: 'Users',
    name: 'users_json',
    default: '[]',
    description: 'User IDs to assign.',
    required: true,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'users',
      },
    },
    displayOptions: {
      show: {
        batch_assign_user_ids_params_object: ['users_json'],
        resource: ['Clusters'],
        operation: ['batchAssignUserIds'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'user1',
    default: '',
    description: 'Unique identifier of the user who makes the search request.',
    typeOptions: {
      pattern: '^[a-zA-Z0-9 \-*.]+$',
    },
    displayName: 'User ID',
    name: 'userID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Clusters'],
        operation: ['getUserId'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'user1',
    default: '',
    description: 'Unique identifier of the user who makes the search request.',
    typeOptions: {
      pattern: '^[a-zA-Z0-9 \-*.]+$',
    },
    displayName: 'User ID',
    name: 'userID_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Clusters'],
        operation: ['removeUserId'],
      },
    },
  },
  {
    displayName: 'Search User Ids Params',
    name: 'search_user_ids_params_object',
    type: 'multiOptions',
    description: 'OK',
    required: true,
    default: [],
    options: [
      {
        name: 'Query',
        value: 'query_string',
      },
      {
        name: 'Cluster Name',
        value: 'clusterName_string',
      },
      {
        name: 'Page',
        value: 'page_number',
      },
      {
        name: 'Hits Per Page',
        value: 'hitsPerPage_number',
      },
    ],
    displayOptions: {
      show: {
        resource: ['Clusters'],
        operation: ['searchUserIds'],
      },
    },
  },
  {
    type: 'string',
    default: '',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'query',
      },
    },
    displayName: 'Query',
    name: 'query_string',
    displayOptions: {
      show: {
        search_user_ids_params_object: ['query_string'],
        resource: ['Clusters'],
        operation: ['searchUserIds'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    placeholder: 'c11-test',
    default: '',
    description: 'Cluster name.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'clusterName',
      },
    },
    displayName: 'Cluster Name',
    name: 'clusterName_string',
    displayOptions: {
      show: {
        search_user_ids_params_object: ['clusterName_string'],
        resource: ['Clusters'],
        operation: ['searchUserIds'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    description: 'Page of search results to retrieve.',
    typeOptions: {
      minValue: 0,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'page',
      },
    },
    displayName: 'Page',
    name: 'page_number',
    displayOptions: {
      show: {
        search_user_ids_params_object: ['page_number'],
        resource: ['Clusters'],
        operation: ['searchUserIds'],
      },
    },
  },
  {
    type: 'number',
    default: 20,
    description: 'Number of hits per page.',
    typeOptions: {
      minValue: 1,
      maxValue: 1000,
    },
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'hitsPerPage',
      },
    },
    displayName: 'Hits Per Page',
    name: 'hitsPerPage_number',
    displayOptions: {
      show: {
        search_user_ids_params_object: ['hitsPerPage_number'],
        resource: ['Clusters'],
        operation: ['searchUserIds'],
      },
    },
  },
  {
    type: 'boolean',
    default: false,
    routing: {
      request: {
        qs: {
          getClusters: '={{ $value }}',
        },
      },
    },
    displayName: 'Get Clusters',
    name: 'getClusters_boolean',
    displayOptions: {
      show: {
        resource: ['Clusters'],
        operation: ['hasPendingMappings'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Sources',
    name: 'sources_json',
    default: '[]',
    description: 'Sources.',
    required: false,
    routing: {
      request: {
        body: '={{ JSON.parse($value) }}',
      },
    },
    displayOptions: {
      show: {
        resource: ['Vaults'],
        operation: ['replaceSources'],
      },
    },
  },
  {
    displayName: 'Source',
    name: 'source_object',
    type: 'multiOptions',
    description: 'Source.',
    required: true,
    default: [],
    options: [
      {
        name: 'Source',
        value: 'source_string',
      },
      {
        name: 'Description',
        value: 'description_string',
      },
    ],
    displayOptions: {
      show: {
        resource: ['Vaults'],
        operation: ['appendSource'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '10.0.0.1/32',
    default: '',
    description: 'IP address range of the source.',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'source',
      },
    },
    displayName: 'Source',
    name: 'source_string',
    displayOptions: {
      show: {
        source_object: ['source_string'],
        resource: ['Vaults'],
        operation: ['appendSource'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    placeholder: 'Server subnet',
    default: '',
    description: 'Source description.',
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
        source_object: ['description_string'],
        resource: ['Vaults'],
        operation: ['appendSource'],
      },
    },
  },
  {
    type: 'string',
    placeholder: '10.0.0.1/32',
    default: '',
    displayName: 'Source',
    name: 'source_string',
    required: true,
    displayOptions: {
      show: {
        resource: ['Vaults'],
        operation: ['deleteSource'],
      },
    },
  },
  {
    type: 'number',
    default: '',
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
        resource: ['Advanced'],
        operation: ['getLogs'],
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
          length: '={{ $value }}',
        },
      },
    },
    displayName: 'Length',
    name: 'length_number',
    displayOptions: {
      show: {
        resource: ['Advanced'],
        operation: ['getLogs'],
      },
    },
  },
  {
    type: 'options',
    name: 'indexName',
    displayName: 'Index Name',
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
      request: {
        qs: {
          indexName:
            '={{ (() => { const value = typeof $parameter.indexName_string !== "undefined" ? $parameter.indexName_string : typeof $parameter.indexName_null !== "undefined" ? JSON.parse($parameter.indexName_null) : undefined; if (value !== undefined && value !== null) { return value; } return undefined; })() }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Advanced'],
        operation: ['getLogs'],
      },
    },
  },
  {
    type: 'options',
    default: '',
    displayName: 'Index Name (String)',
    name: 'indexName_string',
    displayOptions: {
      show: {
        indexName: ['string'],
        resource: ['Advanced'],
        operation: ['getLogs'],
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
    type: 'json',
    displayName: 'Index Name (Null)',
    name: 'indexName_null',
    default: 'null',
    description: undefined,
    required: false,
    disabledOptions: {
      show: {
        indexName: ['null'],
      },
    },
    displayOptions: {
      show: {
        indexName: ['null'],
        resource: ['Advanced'],
        operation: ['getLogs'],
      },
    },
  },
  {
    type: 'options',
    default: 'all',
    options: [
      {
        name: 'all',
        value: 'all',
      },
      {
        name: 'query',
        value: 'query',
      },
      {
        name: 'build',
        value: 'build',
      },
      {
        name: 'error',
        value: 'error',
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
        resource: ['Advanced'],
        operation: ['getLogs'],
      },
    },
  },
  {
    type: 'number',
    placeholder: '1506303845001',
    default: '',
    displayName: 'Task ID',
    name: 'taskID_number',
    required: true,
    displayOptions: {
      show: {
        resource: ['Advanced'],
        operation: ['getAppTask'],
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
        resource: ['Indices'],
        operation: ['getTask'],
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
    type: 'number',
    placeholder: '1506303845001',
    default: '',
    displayName: 'Task ID',
    name: 'taskID_number',
    required: true,
    displayOptions: {
      show: {
        resource: ['Indices'],
        operation: ['getTask'],
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
        resource: ['Indices'],
        operation: ['operationIndex'],
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
    displayName: 'Operation Index Params',
    name: 'operation_index_params_object',
    type: 'multiOptions',
    description: undefined,
    required: true,
    default: [],
    options: [
      {
        name: 'Operation',
        value: 'operation_options',
      },
      {
        name: 'Destination',
        value: 'destination_string',
      },
      {
        name: 'Scope',
        value: 'scope_json',
      },
    ],
    displayOptions: {
      show: {
        resource: ['Indices'],
        operation: ['operationIndex'],
      },
    },
  },
  {
    type: 'options',
    placeholder: 'copy',
    default: '',
    description: 'Operation to perform on the index.',
    options: [
      {
        name: 'move',
        value: 'move',
      },
      {
        name: 'copy',
        value: 'copy',
      },
    ],
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'operation',
      },
    },
    displayName: 'Operation',
    name: 'operation_options',
    displayOptions: {
      show: {
        operation_index_params_object: ['operation_options'],
        resource: ['Indices'],
        operation: ['operationIndex'],
      },
    },
    required: true,
  },
  {
    type: 'string',
    placeholder: 'products',
    default: '',
    description: 'Index name (case-sensitive).',
    routing: {
      send: {
        type: 'body',
        value: '={{ $value }}',
        property: 'destination',
      },
    },
    displayName: 'Destination',
    name: 'destination_string',
    displayOptions: {
      show: {
        operation_index_params_object: ['destination_string'],
        resource: ['Indices'],
        operation: ['operationIndex'],
      },
    },
    required: true,
  },
  {
    type: 'json',
    displayName: 'Scope',
    name: 'scope_json',
    default: '[]',
    description:
      '**Only for copying.**\n\nIf you specify a scope, only the selected scopes are copied. Records and the other scopes are left unchanged.\nIf you omit the `scope` parameter, everything is copied: records, settings, synonyms, and rules.\n',
    required: false,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'scope',
      },
    },
    displayOptions: {
      show: {
        operation_index_params_object: ['scope_json'],
        resource: ['Indices'],
        operation: ['operationIndex'],
      },
    },
  },
  {
    type: 'options',
    name: 'page',
    displayName: 'Page',
    default: '',
    options: [
      {
        name: 'Integer',
        value: 'integer',
      },
      {
        name: 'Null',
        value: 'null',
      },
    ],
    routing: {
      request: {
        qs: {
          page: '={{ (() => { const value = typeof $parameter.page_number !== "undefined" ? $parameter.page_number : typeof $parameter.page_null !== "undefined" ? JSON.parse($parameter.page_null) : undefined; if (value !== undefined && value !== null) { return value; } return undefined; })() }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Indices'],
        operation: ['listIndices'],
      },
    },
  },
  {
    type: 'number',
    default: '',
    typeOptions: {
      minValue: 0,
    },
    displayName: 'Page (Integer)',
    name: 'page_number',
    displayOptions: {
      show: {
        page: ['integer'],
        resource: ['Indices'],
        operation: ['listIndices'],
      },
    },
  },
  {
    type: 'json',
    displayName: 'Page (Null)',
    name: 'page_null',
    default: 'null',
    description: undefined,
    required: false,
    disabledOptions: {
      show: {
        page: ['null'],
      },
    },
    displayOptions: {
      show: {
        page: ['null'],
        resource: ['Indices'],
        operation: ['listIndices'],
      },
    },
  },
  {
    type: 'number',
    default: 100,
    routing: {
      request: {
        qs: {
          hitsPerPage: '={{ $value }}',
        },
      },
    },
    displayName: 'Hits Per Page',
    name: 'hitsPerPage_number',
    displayOptions: {
      show: {
        resource: ['Indices'],
        operation: ['listIndices'],
      },
    },
  },
];

export default properties;
