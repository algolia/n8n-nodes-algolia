import { Resource } from '@/helpers';

import { addObject } from './addObject';
import { getObject } from './getObject';
import { partialUpdateObject } from './partialUpdateObject';

export const objects = new Resource({
	name: 'Objects',
	value: 'objects',
})
	.addOperation(addObject)
	.addOperation(getObject)
	.addOperation(partialUpdateObject);
