import { Operation } from '@/helpers';

import { indexName } from '../shared/indexName.field';
import { objectId } from '../shared/objectId.field';

export const deleteObject = new Operation({
	name: 'Delete Object',
	action: 'Delete an object',
	value: 'deleteObject',
	description: 'Delete a single object from an index using its object ID',
	routing: {
		request: {
			method: 'DELETE',
			url: '=/1/indexes/{{ $parameter.indexName }}/{{ $parameter.objectId }}',
		},
	},
}).addField(indexName, objectId);
