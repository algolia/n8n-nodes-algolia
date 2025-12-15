import { generateN8NNodes } from '@algolia/n8n-openapi-node';
import fs from 'fs/promises';
import { INodeProperties } from 'n8n-workflow';
import path from 'path';
import { groupPropertiesByResourceAndOperation } from './grouper';
import { writeGeneratedFiles } from './writer';

const SPECS_PATH = 'nodes/Algolia/specs/';

const processJsonFile = async (specsPath: string, file: string): Promise<void> => {
  const fileName = path.parse(file).name;
  const filePath = path.join(specsPath, file);
  const outputDir = path.join(specsPath, fileName);

  const properties = (await generateN8NNodes(filePath)) as INodeProperties[];
  const grouped = groupPropertiesByResourceAndOperation(properties);

  await writeGeneratedFiles(outputDir, grouped);
  console.log(`Generated: ${outputDir}/`);
};

const generateProperties = async (): Promise<void> => {
  try {
    const files = await fs.readdir(SPECS_PATH);
    const jsonFiles = files.filter((file) => file.endsWith('.json'));

    if (jsonFiles.length === 0) {
      console.log('No JSON files found in specs directory.');
      return;
    }

    await Promise.all(jsonFiles.map((file) => processJsonFile(SPECS_PATH, file)));
    console.log('Properties generation complete.');
  } catch (error) {
    console.error('Error generating properties:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  generateProperties();
}

export { generateProperties };
