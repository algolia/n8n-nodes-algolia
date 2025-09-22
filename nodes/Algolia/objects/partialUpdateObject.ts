import { Operation } from '@/helpers';
import type { INodeProperties } from 'n8n-workflow';

import { indexName } from '../shared/indexName.field';
import { object } from '../shared/object.field';
import { objectId } from '../shared/objectId.field';

const createIfNotExists: INodeProperties = {
  displayName: 'Create if Not Exists',
  name: 'createIfNotExists',
  type: 'boolean',
  default: true,
  description: 'Whether to create the object if it does not exist',
  routing: {
    request: {
      qs: {
        createIfNotExists: '={{ $value }}',
      },
    },
  },
};

export const partialUpdateObject = new Operation({
  name: 'Partial Update Object',
  action: 'Partially update an object',
  value: 'partialUpdateObject',
  description:
    'Update specific attributes of an existing object without replacing the entire object',
  routing: {
    request: {
      method: 'POST',
      url: '=/1/indexes/{{ $parameter.indexName }}/{{ $parameter.objectId }}/partial',
      json: true,
    },
  },
})
  .addField(indexName, objectId)
  .addField(...object('JSON object containing the attributes to update', 'Fields to update'))
  .addAdditionalField(createIfNotExists);
