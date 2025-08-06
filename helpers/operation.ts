import type { IDataObject, INodeProperties, INodePropertyOptions } from 'n8n-workflow';

type OperationOutput = {
	definition: INodePropertyOptions;
	fields: INodeProperties[];
};

type AdditionalParams = {
	additionalFieldsLabel: string;
};

export class Operation {
	private fields: INodeProperties[] = [];
	private additionalFields: INodeProperties[] = [];

	/**
	 * This helper creates an operation that can be added to a {@link Resource}.
	 * @param operation An operation's option object as specified by the n8n reference
	 * @param additionalParams
	 * @see https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/#operations-objects
	 */
	constructor(
		private operation: INodePropertyOptions,
		private additionalParams: AdditionalParams = {
			additionalFieldsLabel: 'Additional Fields',
		},
	) {}

	/**
	 * Adds a field to this Operation.
	 * `displayOptions` is automatically applied by the Operation.
	 * @param field The UI element object as specified by the n8n reference
	 * @chainable
	 * @see https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/
	 */
	addField(...field: INodeProperties[]): Operation {
		this.fields.push(...field);
		return this;
	}

	/**
	 * Adds a field to this Operation's additional fields drawer.
	 * @param field The UI element object as specified by the n8n reference
	 * @chainable
	 * @see https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/
	 */
	addAdditionalField(...field: INodeProperties[]): Operation {
		this.additionalFields.push(...field);
		return this;
	}

	/**
	 * Adds a `postReceive` transformation on the routing output and a UI field that give users the ability to receive a simplified version of the data.
	 * @param transformFn The transform method that will return a simplified version of the provided output
	 * @chainable
	 */
	addSimplifiedOutput<TApi extends Record<string, any>>(
		transformFn: (json: TApi) => unknown,
	): Operation {
		if (!this.operation.routing) {
			throw new Error(
				`The operation "${this.operation.name}" needs a routing object in order to transform its output.`,
			);
		}

		if (!this.operation.routing!.output?.postReceive) {
			this.operation.routing!.output = {
				...(this.operation.routing.output || {}),
				postReceive: this.operation.routing.output?.postReceive || [],
			};
		}

		this.operation.routing!.output!.postReceive!.push(async function postReceiveFn(this, items) {
			if (!this.getNodeParameter('simplify', false)) {
				return items;
			}

			return items.map((item) => ({
				...item,
				json: transformFn(item.json as TApi) as IDataObject,
			}));
		});

		if (!this.fields.find(({ name }) => name === 'simplify')) {
			this.addField({
				displayName: 'Simplify',
				name: 'simplify',
				description:
					'Whether to return a simplified version of the response instead of the raw data',
				type: 'boolean',
				default: false,
			});
		}

		return this;
	}

	/**
	 * Returns a description of this Operation, to be used by the Resource and the Description helpers in order to create a compatible n8n Node description.
	 * @internal
	 */
	apply(): OperationOutput {
		const additionalFields: INodeProperties[] =
			this.additionalFields.length > 0
				? [
						{
							displayName: this.additionalParams.additionalFieldsLabel,
							name: 'additionalFields',
							type: 'collection',
							default: {},
							options: this.additionalFields,
						},
				  ]
				: [];

		return {
			definition: this.operation,
			fields: this.fields
				.sort((field1, field2) => {
					if (field1.name === 'simplify' && field2.name !== 'simplify') {
						return 1;
					} else if (field1.name !== 'simplify' && field2.name === 'simplify') {
						return -1;
					}

					return 0;
				})
				.concat(additionalFields)
				.map((field) => ({
					...field,
					displayOptions: {
						show: {
							...(field.displayOptions?.show || {}),
							operation: [this.operation.value],
						},
					},
				})),
		};
	}

	/**
	 * The Operation's identifier
	 */
	get value() {
		return this.operation.value;
	}
}
