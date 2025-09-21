import { generateN8NNodes } from '@algolia/n8n-openapi-node';
import fs from 'fs';
import { indexName } from './overrides/indexName';

const generateProperties = async () => {
	const path = 'nodes/Algolia/specs/';
	const jsonFiles = fs.readdirSync(path).filter((file) => file.endsWith('.json'));

	jsonFiles.forEach(async (file) => {
		const fileName = file.replace('.json', '');
		const properties = await generateN8NNodes(path + file);
		const overridenProperties = properties.map((property) => {
			if (property.name === 'indexName_string') {
				return indexName(property);
			}
			return property;
		});

		const nodeContent = `import { INodeProperties } from 'n8n-workflow';

  const properties: INodeProperties[] = ${JSON.stringify(overridenProperties, null, 2)};

  export default properties;
  `;

		fs.writeFileSync(path + fileName + '.ts', nodeContent);
	});
};

generateProperties();
