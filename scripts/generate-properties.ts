import { generateN8NNodes } from '@algolia/n8n-openapi-node';
import fs from 'fs/promises';
import { IDisplayOptions, INodeProperties } from 'n8n-workflow';
import path from 'path';
import { indexName } from './nodes/overrides/indexName';
import { attachPostReceive, simplifyFields } from './nodes/overrides/simplify';
import { objectToJavaScript } from './nodes/utils';

interface OperationToSimplify {
  displayOptions: IDisplayOptions;
  value: string;
}

const processOperation = (
  property: INodeProperties,
): { properties: INodeProperties[]; simplifyOperations: OperationToSimplify[] } => {
  const simplifyOperations: OperationToSimplify[] = [];

  property.options?.forEach((option) => {
    if (
      'inputSchema' in option &&
      option.inputSchema?.simplifiedOutput &&
      property.displayOptions
    ) {
      attachPostReceive(option);
      simplifyOperations.push({
        displayOptions: property.displayOptions,
        value: String(option.value),
      });
    }
  });

  return {
    properties: [
      property,
      ...(simplifyOperations.length > 0 ? [simplifyFields(simplifyOperations)] : []),
    ],
    simplifyOperations,
  };
};

const processProperties = async (properties: INodeProperties[]): Promise<INodeProperties[]> => {
  const overriddenProperties: INodeProperties[] = [];

  for (const property of properties) {
    if (property.name === 'indexName_string') {
      overriddenProperties.push(indexName(property) as INodeProperties);
      continue;
    }

    if (property.name === 'operation') {
      const { properties: operationProperties } = processOperation(property);
      overriddenProperties.push(...operationProperties);
      continue;
    }

    overriddenProperties.push(property);
  }

  return overriddenProperties;
};

const generateNodeContent = (
  properties: INodeProperties[],
): string => `import { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = ${objectToJavaScript(properties)};

export default properties;
`;

const processJsonFile = async (specsPath: string, file: string): Promise<void> => {
  const fileName = path.parse(file).name;
  const filePath = path.join(specsPath, file);

  try {
    const properties = await generateN8NNodes(filePath);
    const overriddenProperties = await processProperties(properties);
    const nodeContent = generateNodeContent(overriddenProperties);
    const outputPath = path.join(specsPath, `${fileName}.ts`);
    await fs.writeFile(outputPath, nodeContent);
  } catch (error) {
    console.error('Error processing file:', error);
    throw error;
  }
};

const generateProperties = async (): Promise<void> => {
  const specsPath = 'nodes/Algolia/specs/';

  try {
    const files = await fs.readdir(specsPath);
    const jsonFiles = files.filter((file) => file.endsWith('.json'));

    if (jsonFiles.length === 0) {
      return;
    }

    await Promise.all(jsonFiles.map((file) => processJsonFile(specsPath, file)));
  } catch (error) {
    console.error('Error generating properties:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  generateProperties();
}
