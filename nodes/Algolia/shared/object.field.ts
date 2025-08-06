import type { INodeProperties } from 'n8n-workflow';

const objectTypeSelector: INodeProperties = {
	displayName: 'Object',
	name: 'object',
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

const jsonObject: INodeProperties = {
	displayName: 'JSON',
	name: 'json',
	type: 'json',
	default: '',
	placeholder: `{
"firstname": "John",
"lastname": "Doe",
"age": 25
}`,
	typeOptions: {
		rows: 5,
	},
	displayOptions: {
		show: {
			object: ['json'],
		},
	},
};

const formObject: INodeProperties = {
	displayName: 'Object Fields',
	name: 'keypair',
	type: 'fixedCollection',
	placeholder: 'Add Field',
	default: {},
	typeOptions: {
		multipleValues: true,
	},
	displayOptions: {
		show: {
			object: ['keypair'],
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
				},
				{
					displayName: 'Value',
					name: 'value',
					type: 'string',
					default: '',
				},
			],
		},
	],
};

export const object: INodeProperties[] = [objectTypeSelector, jsonObject, formObject];
