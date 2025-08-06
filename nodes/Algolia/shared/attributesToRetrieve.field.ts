import type { INodeProperties } from 'n8n-workflow';

export const attributesToRetrieve: INodeProperties = {
	displayName: 'attributesToRetrieve',
	name: 'attributesToRetrieve',
	type: 'string',
	default: [],
	typeOptions: {
		multipleValues: true,
		multipleValueButtonText: 'Add attribute',
	},
	routing: {
		request: {
			body: {
				attributesToRetrieve: '={{ $value }}',
			},
		},
	},
};
