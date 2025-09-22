import { Resource } from '@/helpers';

import { addObject } from './addObject';
import { batchOperation } from './batch';
import { deleteObject } from './deleteObject';
import { getObject } from './getObject';
import { partialUpdateObject } from './partialUpdateObject';

export const objects = new Resource({
  name: 'Objects',
  value: 'objects',
})
  .addOperation(addObject)
  .addOperation(getObject)
  .addOperation(partialUpdateObject)
  .addOperation(deleteObject)
  .addOperation(batchOperation);
