import { INodeType, INodeTypeDescription, NodeConnectionTypes } from 'n8n-workflow';

import {
	DefaultOperationParser,
	DefaultResourceParser,
	N8NPropertiesBuilder,
	N8NPropertiesBuilderConfig,
	OperationContext,
} from '@algolia/n8n-openapi-node';
import { OpenAPIV3 } from 'openapi-types';
import pkg from '../../package.json';
import doc from './specs/test-openapi.json';

export class CustomOperationParser extends DefaultOperationParser {
	shouldSkip(operation: OpenAPIV3.OperationObject, context: OperationContext): boolean {
		const isValidApi = context.pattern.startsWith('/1/');
		if (!isValidApi) {
			return true;
		}
		return false;
	}

	description(operation: OpenAPIV3.OperationObject, context: OperationContext): string {
		return operation.description?.split('\n')[0] ?? '';
	}
}

export class CustomResourceParser extends DefaultResourceParser {
	description(tag: OpenAPIV3.TagObject): string {
		return tag.description?.split('\n')[0] ?? '';
	}
}

const config: N8NPropertiesBuilderConfig = {
	operation: new CustomOperationParser(),
	resource: new CustomResourceParser(),
};
const parser = new N8NPropertiesBuilder(doc, config);

const properties = parser.build();

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
