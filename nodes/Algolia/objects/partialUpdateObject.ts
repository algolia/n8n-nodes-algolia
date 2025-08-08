import { Operation } from '@/helpers';
import type { INodeProperties } from 'n8n-workflow';

import { indexName } from '../shared/indexName.field';
import { objectId } from '../shared/objectId.field';

const partialObjectTypeSelector: INodeProperties = {
	displayName: 'Update Data',
	name: 'updateData',
	type: 'options',
	default: 'json',
	options: [
		{
			name: 'From JSON',
			value: 'json',
		},
		{
			name: 'Using Fields Below',
			value: 'keypair',
		},
	],
};

const partialJsonObject: INodeProperties = {
	displayName: 'JSON',
	name: 'json',
	type: 'json',
	default: '',
	placeholder: `{
"firstname": "Jane",
"age": 30
}`,
	typeOptions: {
		rows: 5,
	},
	displayOptions: {
		show: {
			updateData: ['json'],
		},
	},
	description: 'JSON object containing the attributes to update',
};

const partialFormObject: INodeProperties = {
	displayName: 'Update Fields',
	name: 'keypair',
	type: 'fixedCollection',
	placeholder: 'Add Field',
	default: {},
	typeOptions: {
		multipleValues: true,
	},
	displayOptions: {
		show: {
			updateData: ['keypair'],
		},
	},
	options: [
		{
			displayName: 'Field',
			name: 'list',
			values: [
				{
					displayName: 'Name',
					name: 'name',
					type: 'string',
					default: '',
					description: 'The name of the attribute to update',
				},
				{
					displayName: 'Value',
					name: 'value',
					type: 'string',
					default: '',
					description: 'The new value for the attribute',
				},
			],
		},
	],
};

const createIfNotExists: INodeProperties = {
	displayName: 'Create if Not Exists',
	name: 'createIfNotExists',
	type: 'boolean',
	default: true,
	description: 'Whether to create the object if it does not exist',
};

export const partialUpdateObject = new Operation({
	name: 'Partial Update Object',
	action: 'Partially update an object',
	value: 'partialUpdateObject',
	description: 'Update specific attributes of an existing object without replacing the entire object',
	routing: {
		request: {
			method: 'POST',
			url: '=/1/indexes/{{ $parameter.indexName }}/{{ $parameter.objectId }}/partial',
			json: true,
			body: '={{ $parameter.updateData === "keypair" ? $parameter.keypair.list.filter(attr => attr.name.trim() !== "").smartJoin("name", "value") : JSON.parse($parameter.json) }}',
			qs: {
				createIfNotExists: '={{ $parameter.createIfNotExists }}',
			},
		},
	},
})
	.addField(indexName, objectId, partialObjectTypeSelector)
	.addField(partialJsonObject, partialFormObject)
	.addAdditionalField(createIfNotExists);
