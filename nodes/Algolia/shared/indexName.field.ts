import type { INodeProperties } from 'n8n-workflow';

export const indexName: INodeProperties = {
	displayName: 'Index Name',
	name: 'indexName',
	type: 'options',
	required: true,
	default: '',
	typeOptions: {
		loadOptions: {
			routing: {
				request: {
					method: 'GET',
					url: '/1/indexes',
				},
				output: {
					postReceive: [
						{
							type: 'rootProperty',
							properties: {
								property: 'items',
							},
						},
						{
							type: 'setKeyValue',
							properties: {
								name: '={{ $responseItem.name }}',
								value: '={{ $responseItem.name }}',
							},
						},
					],
				},
			},
		},
	},
};
