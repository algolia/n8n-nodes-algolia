import { generateN8NNodes } from '@algolia/n8n-openapi-node';
import fs from 'fs/promises';
import { IDisplayOptions } from 'n8n-workflow';
import path from 'path';
import { indexName } from './overrides/indexName';
import { attachPostReceive, simplifyFields } from './overrides/simplify';
import { objectToJavaScript } from './utils';

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
        const operationsToSimplify: Array<{ displayOptions: IDisplayOptions; value: string }> = [];
        const overriddenProperties = properties.map((property) => {
          if (property.name === 'indexName_string') {
            return indexName(property);
          }
          if (property.name === 'operation') {
            property.options?.forEach((option) => {
              if ('inputSchema' in option && option.inputSchema?.simplifiedOutput) {
                attachPostReceive(option);
                operationsToSimplify.push({
                  displayOptions: property.displayOptions,
                  value: option.value,
                });
              }
            });
          }
          return property;
        });

        if (operationsToSimplify.length > 0) {
          overriddenProperties.push(simplifyFields(operationsToSimplify));
        }

        const nodeContent = `import { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = ${objectToJavaScript(overriddenProperties)};

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
