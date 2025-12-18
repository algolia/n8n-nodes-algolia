import { INodeProperties } from 'n8n-workflow';
import addOrUpdateObjectProperties from './addOrUpdateObject';
import batchProperties from './batch';
import clearObjectsProperties from './clearObjects';
import deleteByProperties from './deleteBy';
import deleteObjectProperties from './deleteObject';
import getObjectProperties from './getObject';
import getObjectsProperties from './getObjects';
import multipleBatchProperties from './multipleBatch';
import partialUpdateObjectProperties from './partialUpdateObject';
import saveObjectProperties from './saveObject';

const operationProperties: INodeProperties[] = [
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
];

const properties: INodeProperties[] = [
  ...operationProperties,
  ...addOrUpdateObjectProperties,
  ...batchProperties,
  ...clearObjectsProperties,
  ...deleteByProperties,
  ...deleteObjectProperties,
  ...getObjectProperties,
  ...getObjectsProperties,
  ...multipleBatchProperties,
  ...partialUpdateObjectProperties,
  ...saveObjectProperties,
];

export default properties;
