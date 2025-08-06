import { Resource } from '@/helpers';

import { listIndices } from './listIndices';
import { searchIndex } from './searchIndex';

export const index = new Resource({
	name: 'Index',
	value: 'index',
})
	.addOperation(listIndices)
	.addOperation(searchIndex);
