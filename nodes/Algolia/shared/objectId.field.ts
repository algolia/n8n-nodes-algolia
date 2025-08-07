import type { INodeProperties } from 'n8n-workflow';

export const objectId: INodeProperties = {
	displayName: 'Object ID',
	name: 'objectId',
	type: 'string',
	default: '',
	required: true,
	description: 'The unique identifier of the object to retrieve',
	placeholder: 'e.g., myObjectId123',
};
