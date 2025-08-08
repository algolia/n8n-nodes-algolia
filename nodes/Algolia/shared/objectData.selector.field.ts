import type { INodeProperties } from 'n8n-workflow';

export const objectDataSelector = (fieldName = 'objectData'): INodeProperties => ({
	displayName: 'Object Data',
	name: fieldName,
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
});
