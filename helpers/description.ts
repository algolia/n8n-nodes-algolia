import {
	INodeProperties,
	INodePropertyOptions,
	INodeTypeDescription,
	NodeConnectionType,
} from 'n8n-workflow';
import type { RequiredKeys } from './utils';

import { Resource } from './resource';

export class Description {
	private description: INodeTypeDescription;
	private resourcesDescription: INodeProperties;
	private resources: Resource[] = [];

	/**
	 * This helper creates a node description that can be added to an n8n node class.
	 * @param description A node description as specified by the n8n reference
	 * @see https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/#outline-structure-for-a-declarative-style-node
	 */
	constructor(
		description: RequiredKeys<
			INodeTypeDescription,
			'name' | 'displayName' | 'description' | 'defaults'
		>,
	) {
		this.description = {
			version: 1,
			group: [],
			inputs: [NodeConnectionType.Main],
			outputs: [NodeConnectionType.Main],
			properties: [],
			...description,
		};

		this.resourcesDescription = {
			displayName: 'Resource',
			name: 'resource',
			noDataExpression: true,
			default: undefined,
			// TODO: allow customizing resource type
			// https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/#resource-objects
			type: 'options',
			options: [],
		};
	}

	/**
	 * Adds a {@link Resource} to this Description.
	 * @param resource The resource's option object as specified by the n8n reference
	 * @param setDefault Whether to make this Resource selected by default
	 * @chainable
	 * @see https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/#resource-objects
	 */
	addResource(resource: Resource, setDefault = false) {
		this.resources.push(resource);
		if (setDefault) {
			this.resourcesDescription.default = resource.value;
		}
		return this;
	}

	/**
	 * Returns a description that is compatible with n8n.
	 */
	apply(): INodeTypeDescription {
		const resourcesData = this.resources.reduce(
			({ resources, operations, fields }, resource) => {
				const {
					definition,
					operations: resourceOperations,
					fields: resourceFields,
				} = resource.apply();
				return {
					resources: [...resources, definition],
					operations: [...operations, resourceOperations],
					fields: [...fields, ...resourceFields],
				};
			},
			{ resources: [], operations: [], fields: [] } as {
				resources: INodePropertyOptions[];
				operations: INodeProperties[];
				fields: INodeProperties[];
			},
		);

		return {
			...this.description,
			properties: [
				{
					...this.resourcesDescription,
					default: this.resourcesDescription.default || this.resources[0]?.value,
					options: resourcesData.resources,
				},
				...resourcesData.operations,
				...resourcesData.fields,
			],
		};
	}
}
