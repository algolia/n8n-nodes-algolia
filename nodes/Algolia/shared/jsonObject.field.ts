import type { INodeProperties } from 'n8n-workflow';

export const jsonObject = (
	selectorFieldName = 'objectData',
	description = 'JSON object containing the data'
): INodeProperties => ({
	displayName: 'JSON',
	name: 'json',
	type: 'json',
	default: '',
	typeOptions: {
		rows: 5,
	},
	displayOptions: {
		show: {
			[selectorFieldName]: ['json'],
		},
	},
	description,
});
