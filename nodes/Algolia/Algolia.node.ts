import { Description } from '@/helpers';
import type { INodeType } from 'n8n-workflow';
import pkg from '../../package.json';

import { index } from './index';
import { objects } from './objects';

const description = new Description({
	name: 'Algolia',
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
})
	.addResource(index)
	.addResource(objects);

export class Algolia implements INodeType {
	description = description.apply();
}
