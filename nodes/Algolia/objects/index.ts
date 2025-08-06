import { Resource } from '@/helpers';

import { addObject } from './addObject';

export const objects = new Resource({
	name: 'Objects',
	value: 'objects',
}).addOperation(addObject);
