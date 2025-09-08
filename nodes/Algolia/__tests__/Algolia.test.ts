import { N8NPropertiesBuilder, N8NPropertiesBuilderConfig } from '@algolia/n8n-openapi-node';
import { describe, expect, test } from 'vitest';

import { CustomOperationParser, CustomResourceParser } from '../Algolia.node';
import doc from '../specs/test-openapi.json';

const config: N8NPropertiesBuilderConfig = {
	operation: new CustomOperationParser(),
	resource: new CustomResourceParser(),
};
const parser = new N8NPropertiesBuilder(doc, config);

const properties = parser.build();

const toCamelCase = (str: string) => {
	return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
		if (+match === 0) return '';
		return index === 0 ? match.toLowerCase() : match.toUpperCase();
	});
};

describe('Algolia', () => {
	test('should build properties', () => {
		expect(properties).length.greaterThan(0);
	});

	test('should have resources', () => {
		const resources = properties.filter((property) => property.name === 'resource');
		expect(resources.length).toEqual(1);

		const resource = resources[0];
		expect(resource?.displayName).toEqual('Resource');
		expect(resource?.name).toEqual('resource');
		expect(resource?.type).toEqual('options');
		expect(resource?.default).toEqual('');
		expect(resource?.noDataExpression).toEqual(true);

		console.log(resource);
	});

	test('should have correct operations', () => {
		const operations = properties.filter((property) => property.name === 'operation');

		const apiPaths = operations
			.filter((operation) => operation.type === 'notice')
			.map((operation) => operation.displayName.split(' ')[1]);

		const paths: string[] = [];

		Object.entries(doc.paths).forEach(([key, value]) => {
			if (key.startsWith('/1/')) {
				paths.push(key);
				for (let i = 1; i < Object.keys(value).length; i++) {
					paths.push(key);
				}
			}
		});

		expect(paths.length).toEqual(apiPaths.length);

		for (let i = 0; i < paths.length; i++) {
			expect(paths[i]).toEqual(apiPaths[i]);
		}
	});

	test('all API operations should be in the right resource tag', () => {
		const operations = properties.filter((property) => property.name === 'operation');

		const apiOperations = operations.filter((operation) => operation.type !== 'notice');

		const displayOptions = new Map();

		apiOperations.forEach((operation) => {
			const options = new Set();
			operation.options?.forEach((option) => {
				options.add(toCamelCase(option.name));
			});
			displayOptions.set(operation.displayOptions?.show?.resource?.[0], options);
		});

		Object.entries(doc.paths).forEach(([key, value]) => {
			if (key.startsWith('/1/')) {
				const operation = Object.values(value)[0];
				expect(operation.tags).length.greaterThan(0);
				const tag = operation.tags[0];
				const operationId = operation.operationId;
				const options = displayOptions.get(tag);
				expect(options).toContain(operationId);
			}
		});
	});

	test('all API operations should have the right options', () => {
		const generatedFields = properties.filter((property) => property.name !== 'operation');

		Object.entries(doc.paths).forEach(([key, value]) => {
			if (key.startsWith('/1/')) {
				const operation = Object.values(value)[0];
				const requestBody = operation.requestBody;
				const tags = operation.tags;
				const operationId = operation.operationId;
				if (requestBody) {
					const propertiesSchema = requestBody.content['application/json'].schema;
					const properties = propertiesSchema.properties;
					if (properties) {
						Object.values(properties).forEach((property: any) => {
							const ref = property['$ref'];
							if (ref) {
								const propertyName = ref.split('/').pop() as string;
								const property = generatedFields.find(
									(field) =>
										toCamelCase(field.name) === toCamelCase(propertyName) &&
										field.displayOptions?.show?.resource?.[0] === tags[0] &&
										toCamelCase(field.displayOptions?.show?.operation?.[0]?.toString() ?? '') === operationId,
								);
								expect(property).toBeDefined();
							}
						});
					}
				}
			}
		});
	});
});
