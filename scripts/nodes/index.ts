import { generateN8NNodes } from '@algolia/n8n-openapi-node';
import fs from 'fs/promises';
import path from 'path';
import { indexName } from './overrides/indexName';

const generateProperties = async (): Promise<void> => {
  const specsPath = 'nodes/Algolia/specs/';

  try {
    const files = await fs.readdir(specsPath);
    const jsonFiles = files.filter((file) => file.endsWith('.json'));

    if (jsonFiles.length === 0) {
      return;
    }

    const promises = jsonFiles.map(async (file) => {
      const fileName = path.parse(file).name;
      const filePath = path.join(specsPath, file);

      try {
        const properties = await generateN8NNodes(filePath);
        const overriddenProperties = properties.map((property) => {
          if (property.name === 'indexName_string') {
            return indexName(property);
          }
          return property;
        });

        const nodeContent = `import { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = ${JSON.stringify(overriddenProperties, null, 2)};

export default properties;
`;

        const outputPath = path.join(specsPath, `${fileName}.ts`);
        await fs.writeFile(outputPath, nodeContent);
      } catch (error) {
        throw error;
      }
    });

    await Promise.all(promises);
  } catch (error) {
    console.error('Error generating properties:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  generateProperties();
}
