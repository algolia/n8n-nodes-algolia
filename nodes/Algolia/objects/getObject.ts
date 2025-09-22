import { Operation } from '@/helpers';

import { attributesToRetrieveQuery } from '../shared/attributesToRetrieve.query.field';
import { indexName } from '../shared/indexName.field';
import { objectId } from '../shared/objectId.field';

export const getObject = new Operation({
  name: 'Get Object',
  action: 'Get an object',
  value: 'getObject',
  description: 'Retrieve a single object from an index using its object ID',
  routing: {
    request: {
      method: 'GET',
      url: '=/1/indexes/{{ $parameter.indexName }}/{{ $parameter.objectId }}',
    },
  },
})
  .addField(indexName, objectId)
  .addAdditionalField(attributesToRetrieveQuery);
