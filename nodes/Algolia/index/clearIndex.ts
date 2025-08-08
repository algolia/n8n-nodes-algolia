import { Operation } from '@/helpers';

import { indexName } from '../shared/indexName.field';

export const clearIndex = new Operation({
	name: 'Clear Index',
	action: 'Clear an index',
	value: 'clearIndex',
	description: 'Clear all records from an index without affecting its settings, synonyms, or rules',
	routing: {
		request: {
			method: 'POST',
			url: '=/1/indexes/{{ $parameter.indexName }}/clear',
			json: true,
		},
	},
})
	.addField(indexName);
