import { Resource } from '@/helpers';

import { clearIndex } from './clearIndex';
import { listIndices } from './listIndices';
import { searchIndex } from './searchIndex';

export const index = new Resource({
	name: 'Index',
	value: 'index',
})
	.addOperation(listIndices)
	.addOperation(searchIndex)
	.addOperation(clearIndex);
