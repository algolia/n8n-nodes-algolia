import { INodeType, INodeTypeDescription, NodeConnectionTypes } from 'n8n-workflow';

import pkg from '../../package.json';
import properties from './specs/search';

export class Algolia implements INodeType {
	description: INodeTypeDescription = {
		name: 'algolia',
		displayName: 'Algolia',
		description: 'Use Algolia in your n8n workflows',
		subtitle: '={{ $parameter.operation.replace(/([a-z])([A-Z])/g, "$1 $2").toTitleCase() }}',
		icon: 'file:algolia.svg',
		defaults: {
			name: 'Algolia',
		},
		credentials: [
			{
				name: 'algoliaApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '=https://{{ $credentials.appId }}.algolia.net',
			headers: {
				'User-Agent': `${pkg.name} (${pkg.version})`,
			},
		},
		version: 1,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		properties,
		group: [],
	};
}
