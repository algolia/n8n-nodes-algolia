import { Resource } from '@/helpers';

import { addObject } from './addObject';
import { deleteObject } from './deleteObject';
import { getObject } from './getObject';

export const objects = new Resource({
	name: 'Objects',
	value: 'objects',
})
	.addOperation(addObject)
	.addOperation(getObject)
	.addOperation(deleteObject);
