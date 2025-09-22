import { Operation } from '@/helpers';
import type { INodeProperties } from 'n8n-workflow';

import { indexName } from '../shared/indexName.field';

const actions: INodeProperties = {
  displayName: 'Action to Perform on Each Object',
  name: 'action',
  type: 'options',
  default: 'addObject',
  options: [
    {
      name: 'Add Object',
      value: 'addObject',
      description: 'Add an object to the index, automatically assigning it an object ID',
      action: 'Add an object to the index automatically assigning it an object id',
    },
    {
      name: 'Delete Object',
      value: 'deleteObject',
      description:
        'Delete a record. You must set the objectID attribute to indicate the record to delete.',
      action:
        'Delete a record you must set the object id attribute to indicate the record to delete',
    },
    {
      name: 'Partial Update',
      value: 'partialUpdateObject',
      description:
        'You must set the objectID attribute to indicate the record to update. Otherwise, the record is created if the objectID doesn’t exist.',
      action:
        'You must set the object id attribute to indicate the record to update otherwise the record is created if the object id doesn t exist',
    },
    {
      name: 'Partial Update (No Create)',
      value: 'partialUpdateObjectNoCreate',
      description:
        'Same as Partial Update, except that the record isn’t created if the objectID doesn’t exist',
      action:
        'Same as partial update except that the record isn t created if the object id doesn t exist',
    },
    {
      name: 'Update',
      value: 'updateObject',
      description:
        'Add or replace an object. You must set the objectID attribute to indicate the record to update.',
      action:
        'Add or replace an object you must set the object id attribute to indicate the record to update',
    },
  ],
};

const arrayOfObjects: INodeProperties = {
  displayName: 'Array of Objects',
  name: 'arrayOfObjects',
  type: 'json',
  default: '',
  description:
    'Array of objects to add, update, or delete. Use Aggregate node before this node to easily get the entire list of objects. Each object should have an objectID when using Update or Delete Object actions. I.e. [{ "objectID": "123", "name": "John Doe" }]',
  required: true,
  validateType: 'array',
};

export const batchOperation = new Operation({
  name: 'Batch Operation',
  action: 'Batch operations',
  value: 'batchOperation',
  description: 'Adds, updates, or deletes records in one index with a single API request',
  routing: {
    request: {
      method: 'POST',
      url: '=/1/indexes/{{ $parameter.indexName }}/batch',
      json: true,
      body: {
        requests:
          '={{ $parameter.arrayOfObjects.map(item => ({ action: $parameter.action, body: item })) }}',
      },
    },
  },
})
  .addField(indexName)
  .addField(actions)
  .addField(arrayOfObjects);
