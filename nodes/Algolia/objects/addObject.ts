import { Operation } from '@/helpers';

import { indexName } from '../shared/indexName.field';
import { object } from '../shared/object.field';

export const addObject = new Operation({
	name: 'Add Object',
	action: 'Add an object',
	value: 'addObject',
	description: 'Add an object to the index, automatically assigning it an object ID',
	routing: {
		request: {
			method: 'POST',
			url: '=/1/indexes/{{ $parameter.indexName }}',
			json: true,
			body: '={{ $parameter.object === "keypair" ? $parameter.keypair.list.smartJoin("name", "value") : JSON.parse($parameter.json) }}',
		},
	},
})
	.addField(indexName)
	.addField(...object);
